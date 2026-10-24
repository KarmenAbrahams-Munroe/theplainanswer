<?php
/** Page-driven, progressively enhanced global navigation. */
defined( 'ABSPATH' ) || exit;

function bc_practice_mega_attributes() {
    return array(
        'sections' => array( 'type' => 'array', 'default' => array( array( 'label' => 'Browse topics', 'rootId' => 0, 'type' => 'tree' ) ) ),
        'navigationLabel' => array( 'type' => 'string', 'default' => 'Main navigation' ),
        'topicsLabel' => array( 'type' => 'string', 'default' => 'All topics' ),
        'supportLabel' => array( 'type' => 'string', 'default' => '' ),
        'supportUrl' => array( 'type' => 'string', 'default' => '' ),
    );
}

add_action( 'init', function () {
    $version = wp_get_theme()->get( 'Version' );
    register_block_pattern_category( 'bc-navigation', array( 'label' => __( 'B.C. navigation', 'bc-practice' ) ) );
    wp_register_script( 'bc-practice-mega-editor', get_theme_file_uri( 'assets/js/mega-menu-editor.js' ), array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-api-fetch', 'wp-server-side-render', 'wp-html-entities' ), $version, true );
    wp_add_inline_script( 'bc-practice-mega-editor', 'window.bcPracticeMegaAttributes = ' . wp_json_encode( bc_practice_mega_attributes() ) . ';', 'before' );
    register_block_type( 'bc-practice/mega-menu', array(
        'api_version' => 3,
        'title' => 'Mega menu',
        'description' => 'A global drill-down menu populated from published page hierarchies.',
        'category' => 'theme',
        'icon' => 'menu-alt3',
        'attributes' => bc_practice_mega_attributes(),
        'supports' => array( 'html' => false, 'align' => array( 'full', 'wide' ) ),
        'editor_script' => 'bc-practice-mega-editor',
        'render_callback' => 'bc_practice_render_mega_menu',
    ) );
} );

add_action( 'enqueue_block_assets', function () {
    wp_enqueue_style( 'bc-practice-mega-menu', get_theme_file_uri( 'assets/css/mega-menu.css' ), array( 'bc-practice-blocks' ), wp_get_theme()->get( 'Version' ) );
} );

// A header also appears on archives, search results and error pages.
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_script( 'bc-practice-mega-menu', get_theme_file_uri( 'assets/js/mega-menu.js' ), array(), wp_get_theme()->get( 'Version' ), array( 'strategy' => 'defer', 'in_footer' => true ) );
} );

/** One public-page query per render request; no persistent hierarchy cache. */
function bc_practice_mega_pages() {
    static $pages = null;
    if ( null === $pages ) {
        $pages = get_posts( array(
            'post_type' => 'page', 'post_status' => 'publish', 'posts_per_page' => -1,
            'orderby' => array( 'menu_order' => 'ASC', 'title' => 'ASC', 'ID' => 'ASC' ),
            'no_found_rows' => true, 'ignore_sticky_posts' => true,
            'update_post_meta_cache' => false, 'update_post_term_cache' => false,
            'suppress_filters' => false,
        ) );
    }
    return $pages;
}

function bc_practice_mega_summary( $page ) {
    // Do not expose a protected page's excerpt, even to signed-in previews.
    return ! empty( $page->post_password ) ? '' : bc_practice_mega_plain_text( wp_trim_words( wp_strip_all_tags( $page->post_excerpt ), 35 ) );
}

function bc_practice_mega_plain_text( $text ) {
    return trim( html_entity_decode( wp_strip_all_tags( $text ), ENT_QUOTES | ENT_HTML5, 'UTF-8' ) );
}

function bc_practice_mega_nodes( $parent, $groups, $seen = array(), $depth = 0 ) {
    if ( $depth >= 20 || empty( $groups[ $parent ] ) ) {
        return array();
    }
    $nodes = array();
    foreach ( $groups[ $parent ] as $page ) {
        if ( isset( $seen[ $page->ID ] ) ) {
            continue;
        }
        $next = $seen;
        $next[ $page->ID ] = true;
        if ( (int) $page->ID === (int) get_option( 'page_on_front' ) ) {
            $nodes = array_merge( $nodes, bc_practice_mega_nodes( $page->ID, $groups, $next, $depth + 1 ) );
            continue;
        }
        $nodes[] = array(
            'id' => (int) $page->ID,
            'title' => bc_practice_mega_plain_text( bc_practice_card_title( $page ) ),
            'url' => esc_url_raw( get_permalink( $page ) ),
            'summary' => bc_practice_mega_summary( $page ),
            'children' => bc_practice_mega_nodes( $page->ID, $groups, $next, $depth + 1 ),
        );
    }
    return $nodes;
}

/** Treat saved block attributes as data, including blocks edited as code. */
function bc_practice_mega_sections( $attributes ) {
    $by_id = array();
    $groups = array();
    foreach ( bc_practice_mega_pages() as $page ) {
        $by_id[ $page->ID ] = $page;
        $groups[ $page->post_parent ][] = $page;
    }
    $settings = $attributes['sections'] ?? bc_practice_mega_attributes()['sections']['default'];
    $settings = is_array( $settings ) ? array_slice( $settings, 0, 20 ) : array();
    $separate_roots = array();
    foreach ( $settings as $setting ) {
        if ( is_array( $setting ) && 'link' !== ( $setting['type'] ?? 'tree' ) && ! empty( $setting['rootId'] ) && is_scalar( $setting['rootId'] ) ) {
            $separate_roots[] = absint( $setting['rootId'] );
        }
    }
    $sections = array();
    foreach ( $settings as $setting ) {
        if ( ! is_array( $setting ) ) {
            continue;
        }
        $label = isset( $setting['label'] ) && is_scalar( $setting['label'] ) ? sanitize_text_field( $setting['label'] ) : '';
        if ( 'link' === ( $setting['type'] ?? 'tree' ) ) {
            $url = isset( $setting['url'] ) && is_string( $setting['url'] ) ? esc_url_raw( $setting['url'] ) : '';
            if ( $label && $url ) {
                $sections[] = array( 'label' => $label, 'title' => $label, 'url' => $url, 'children' => array(), 'id' => 0, 'summary' => '' );
            }
            continue;
        }
        $root_id = isset( $setting['rootId'] ) && is_scalar( $setting['rootId'] ) ? absint( $setting['rootId'] ) : 0;
        if ( $root_id && ! isset( $by_id[ $root_id ] ) ) {
            continue; // A removed, draft or private root never falls back to the entire site.
        }
        $root = $root_id ? $by_id[ $root_id ] : null;
        $children = bc_practice_mega_nodes( $root_id, $groups, $root_id ? array( $root_id => true ) : array() );
        if ( ! $root_id ) {
            // Utility sections have their own top-level entry, so do not duplicate them as topics.
            $children = array_values( array_filter( $children, function ( $node ) use ( $separate_roots ) { return ! in_array( $node['id'], $separate_roots, true ); } ) );
        }
        $title = $root ? bc_practice_mega_plain_text( bc_practice_card_title( $root ) ) : ( $attributes['topicsLabel'] ?? 'All topics' );
        if ( ! $children && ! $root ) {
            continue;
        }
        $sections[] = array(
            'label' => $label ?: $title, 'title' => $title, 'id' => $root_id,
            'url' => $root ? esc_url_raw( get_permalink( $root ) ) : '',
            'summary' => $root ? bc_practice_mega_summary( $root ) : '', 'children' => $children,
        );
    }
    return $sections;
}

function bc_practice_mega_fallback_nodes( $nodes, $current ) {
    $html = '<ul>';
    foreach ( $nodes as $node ) {
        $html .= '<li><a href="' . esc_url( $node['url'] ) . '"' . ( $node['id'] && $node['id'] === $current ? ' aria-current="page"' : '' ) . '>' . esc_html( $node['title'] ) . '</a>';
        if ( $node['children'] ) {
            $html .= bc_practice_mega_fallback_nodes( $node['children'], $current );
        }
        $html .= '</li>';
    }
    return $html . '</ul>';
}

function bc_practice_render_mega_menu( $attributes ) {
    $sections = bc_practice_mega_sections( $attributes );
    if ( ! $sections ) {
        return bc_practice_empty_preview( 'Choose published parent pages in Mega menu settings. Publish child pages to create expandable sections.' );
    }
    $label = trim( $attributes['navigationLabel'] ?? '' ) ?: __( 'Main navigation', 'bc-practice' );
    $current = is_singular( 'page' ) ? (int) get_queried_object_id() : 0;
    $fallback = '<details class="bc-mega-fallback" data-bc-mega-fallback><summary>' . esc_html__( 'Menu', 'bc-practice' ) . '</summary><div class="bc-mega-fallback-content">';
    foreach ( $sections as $section ) {
        $fallback .= '<section><h2>';
        $fallback .= $section['url'] ? '<a href="' . esc_url( $section['url'] ) . '"' . ( $section['id'] && $section['id'] === $current ? ' aria-current="page"' : '' ) . '>' . esc_html( $section['label'] ) . '</a>' : esc_html( $section['label'] );
        $fallback .= '</h2>' . ( $section['children'] ? bc_practice_mega_fallback_nodes( $section['children'], $current ) : '' ) . '</section>';
    }
    $fallback .= '</div></details>';
    $support_url = esc_url_raw( $attributes['supportUrl'] ?? '' );
    $support_label = sanitize_text_field( $attributes['supportLabel'] ?? '' );
    $data = array(
        'sections' => $sections, 'current' => $current,
        'support' => $support_url && $support_label ? array( 'url' => $support_url, 'label' => $support_label ) : null,
        'strings' => array(
            'menu' => __( 'Menu', 'bc-practice' ), 'close' => __( 'Close menu', 'bc-practice' ),
            'backTo' => __( 'Back to %s', 'bc-practice' ), 'main' => __( 'Main menu', 'bc-practice' ),
            'viewAll' => __( 'View all in %s', 'bc-practice' ), 'chooseTopic' => __( 'Choose a topic to see its subtopics.', 'bc-practice' ),
            'chooseSubtopic' => __( 'Choose a subtopic to see its pages.', 'bc-practice' ),
        ),
    );
    if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
        // Preview the real hierarchy without interactive controls inside the editor.
        $bar = '';
        foreach ( $sections as $section ) {
            $bar .= '<span>' . esc_html( $section['label'] ) . ( $section['children'] ? ' ' . bc_practice_navigation_chevron() : '' ) . '</span>';
        }
        $preview = '<div class="bc-mega-editor-bar">' . $bar . '</div><p class="bc-mega-editor-note">' . esc_html__( 'Page hierarchies update automatically. Preview the site to try the drill-down menu. Use Block settings to add or change sections.', 'bc-practice' ) . '</p>';
        return '<div class="bc-mega-editor-preview">' . $preview . $fallback . '</div>';
    }
    return '<nav ' . get_block_wrapper_attributes( array( 'class' => 'bc-mega' ) ) . ' aria-label="' . esc_attr( $label ) . '" data-bc-mega>' . $fallback . '<div data-bc-mega-app hidden></div><script type="application/json" data-bc-mega-data>' . wp_json_encode( $data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . '</script></nav>';
}
