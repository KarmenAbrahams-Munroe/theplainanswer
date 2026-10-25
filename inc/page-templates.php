<?php
/** Shared page blocks and progressive navigation enhancements. */
defined( 'ABSPATH' ) || exit;

add_action( 'after_setup_theme', function () {
    add_post_type_support( 'page', 'excerpt' );
} );

function bc_practice_template_blocks() {
    return array_merge( array(
        'breadcrumbs' => array( 'title' => 'Page breadcrumbs', 'icon' => 'admin-links', 'description' => 'Shows this page and its parent pages.' ),
        'page-introduction' => array( 'title' => 'Page introduction', 'icon' => 'editor-paragraph', 'description' => 'Shows the introduction entered in the page Excerpt field.' ),
        'topic-navigation' => array( 'title' => 'Topic navigation', 'icon' => 'menu', 'description' => 'Shows the page hierarchy for this topic.', 'attributes' => array( 'presentation' => array( 'type' => 'string', 'enum' => array( 'sidebar', 'disclosure' ), 'default' => 'sidebar' ) ) ),
        'page-contents' => array( 'title' => 'On this page', 'icon' => 'editor-ul', 'description' => 'Links to the level-two headings in this page.', 'attributes' => array( 'presentation' => array( 'type' => 'string', 'enum' => array( 'inline', 'sticky' ), 'default' => 'inline' ) ) ),
        'child-page-cards' => array( 'title' => 'Child page cards', 'icon' => 'index-card', 'description' => 'Creates linked cards from published child pages, their explicit excerpts and grandchild links.', 'attributes' => array( 'automatic' => array( 'type' => 'boolean', 'default' => false ) ) ),
    ), bc_practice_component_blocks(), bc_practice_framework_blocks() );
}

add_action( 'init', function () {
    $version = wp_get_theme()->get( 'Version' );
    wp_register_script( 'bc-practice-template-blocks', get_theme_file_uri( 'assets/js/template-blocks.js' ), array( 'bc-practice-editor-tools', 'wp-server-side-render' ), $version, true );
    wp_add_inline_script( 'bc-practice-template-blocks', 'window.bcPracticeTemplateBlocks = ' . wp_json_encode( bc_practice_template_blocks() ) . ';', 'before' );
    foreach ( bc_practice_template_blocks() as $slug => $settings ) {
        register_block_type( 'bc-practice/' . $slug, array(
            'api_version' => 3,
            'title' => $settings['title'],
            'description' => $settings['description'],
            'category' => $settings['category'] ?? 'theme',
            'icon' => $settings['icon'],
            'uses_context' => array( 'postId', 'postType' ),
            'attributes' => $settings['attributes'] ?? array(),
            'supports' => array( 'html' => false ),
            'editor_script' => 'bc-practice-template-blocks',
            'render_callback' => 'bc_practice_render_' . str_replace( '-', '_', $slug ),
        ) );
    }
} );

add_action( 'wp_enqueue_scripts', function () {
    if ( is_singular( 'page' ) ) {
        wp_enqueue_script( 'bc-practice-page-navigation', get_theme_file_uri( 'assets/js/page-navigation.js' ), array(), wp_get_theme()->get( 'Version' ), array( 'strategy' => 'defer', 'in_footer' => true ) );
    }
} );

add_action( 'enqueue_block_assets', function () {
    wp_enqueue_style( 'bc-practice-page-templates', get_theme_file_uri( 'assets/css/page-templates.css' ), array( 'bc-practice-blocks' ), wp_get_theme()->get( 'Version' ) );
} );

function bc_practice_context_page( $block ) {
    $id = isset( $block->context['postId'] ) ? absint( $block->context['postId'] ) : get_the_ID();
    $page = get_post( $id );
    $page = apply_filters( 'bc_practice_context_page', $page, $block );
    return $page && 'page' === $page->post_type ? $page : null;
}

function bc_practice_empty_preview( $message ) {
    return defined( 'REST_REQUEST' ) && REST_REQUEST ? '<p class="bc-editor-placeholder">' . esc_html( $message ) . '</p>' : '';
}

function bc_practice_render_breadcrumbs( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( ! $page ) {
        return bc_practice_empty_preview( 'Breadcrumbs will show the page and its parents.' );
    }
    if ( (int) get_option( 'page_on_front' ) === (int) $page->ID ) {
        return '';
    }
    $items = '<li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'bc-practice' ) . '</a></li>';
    foreach ( array_reverse( get_post_ancestors( $page ) ) as $id ) {
        if ( (int) $id === (int) get_option( 'page_on_front' ) || 'publish' !== get_post_status( $id ) ) {
            continue;
        }
        $items .= '<li><a href="' . esc_url( get_permalink( $id ) ) . '">' . esc_html( get_the_title( $id ) ) . '</a></li>';
    }
    $items .= '<li><span aria-current="page">' . esc_html( get_the_title( $page ) ) . '</span></li>';
    return '<nav ' . get_block_wrapper_attributes( array( 'class' => 'bc-breadcrumbs' ) ) . ' aria-label="' . esc_attr__( 'Breadcrumbs', 'bc-practice' ) . '"><ol>' . $items . '</ol></nav>';
}

function bc_practice_render_page_introduction( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( $page && post_password_required( $page ) ) {
        return '';
    }
    if ( ! $page || '' === trim( $page->post_excerpt ) ) {
        return bc_practice_empty_preview( 'Add a short introduction in the page Excerpt field.' );
    }
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-page-introduction' ) ) . '>' . wpautop( esc_html( $page->post_excerpt ) ) . '</div>';
}

/** Render links and separate disclosure buttons; all branches work without JS. */
function bc_practice_topic_items( $parent, $groups, $page, $ancestors, $depth = 0 ) {
    if ( $depth >= 20 || empty( $groups[ $parent ] ) ) {
        return '';
    }
    $html = '';
    foreach ( $groups[ $parent ] as $item ) {
        $current = (int) $item->ID === (int) $page->ID;
        $open = $current || in_array( (int) $item->ID, $ancestors, true );
        $children = bc_practice_topic_items( $item->ID, $groups, $page, $ancestors, $depth + 1 );
        $title = bc_practice_card_title( $item );
        $html .= '<li><div class="bc-topic-row"><a href="' . esc_url( get_permalink( $item ) ) . '"' . ( $current ? ' aria-current="page"' : '' ) . '>' . esc_html( $title ) . '</a>';
        if ( $children ) {
            $id = wp_unique_id( 'bc-topic-branch-' );
            $html .= '<button class="bc-topic-branch-toggle" type="button" hidden aria-expanded="true" aria-controls="' . esc_attr( $id ) . '" data-bc-branch-toggle data-bc-open="' . ( $open ? 'true' : 'false' ) . '" data-show-label="' . esc_attr( sprintf( __( 'Show pages in %s', 'bc-practice' ), $title ) ) . '" data-hide-label="' . esc_attr( sprintf( __( 'Hide pages in %s', 'bc-practice' ), $title ) ) . '" aria-label="' . esc_attr( sprintf( __( 'Hide pages in %s', 'bc-practice' ), $title ) ) . '">' . bc_practice_navigation_chevron() . '</button>';
        }
        $html .= '</div>';
        if ( $children ) {
            $html .= '<ul id="' . esc_attr( $id ) . '" data-bc-branch-panel>' . $children . '</ul>';
        }
        $html .= '</li>';
    }
    return $html;
}

function bc_practice_navigation_chevron() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
}

function bc_practice_render_topic_navigation( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( $page && ! empty( $GLOBALS['bc_practice_reading_layout'][ $page->ID ] ) && ! ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
        return '';
    }
    if ( ! $page ) {
        return bc_practice_empty_preview( 'Topic navigation will use the page Parent setting.' );
    }
    $ancestors = array_values( array_filter( array_map( 'intval', get_post_ancestors( $page ) ), function ( $id ) { return 'publish' === get_post_status( $id ); } ) );
    $topic_ancestors = array_values( array_filter( $ancestors, function ( $id ) { return (int) $id !== (int) get_option( 'page_on_front' ); } ) );
    $root = bc_practice_guide_root( $page->ID ) ?: ( $topic_ancestors ? end( $topic_ancestors ) : $page->ID );
    $pages = get_pages( array( 'child_of' => $root, 'sort_column' => 'menu_order,post_title,ID', 'post_status' => 'publish' ) );
    $groups = array();
    foreach ( $pages as $item ) {
        $groups[ $item->post_parent ][] = $item;
    }
    $children = bc_practice_topic_items( $root, $groups, $page, $ancestors );
    if ( ! $children ) {
        return bc_practice_empty_preview( 'Add child pages to show topic navigation.' );
    }
    $current = (int) $root === (int) $page->ID ? ' aria-current="page"' : '';
    $root_title = bc_practice_card_title( get_post( $root ) );
    $root_link = '<a href="' . esc_url( get_permalink( $root ) ) . '"' . $current . '>' . esc_html( $root_title ) . '</a>';
    $list = '<ul><li class="bc-topic-root"><div class="bc-topic-row">' . $root_link . '</div><ul>' . $children . '</ul></li></ul>';
    $label = sprintf( __( 'In %s', 'bc-practice' ), $root_title );
    if ( 'disclosure' === ( $attributes['presentation'] ?? 'sidebar' ) ) {
        return '<details ' . get_block_wrapper_attributes( array( 'class' => 'bc-topic-disclosure' ) ) . '><summary>' . esc_html( sprintf( __( 'Browse %s', 'bc-practice' ), $root_title ) ) . '</summary><nav class="bc-topic-navigation" data-bc-topic-navigation aria-label="' . esc_attr( $label ) . '">' . $list . '</nav></details>';
    }
    $panel_id = wp_unique_id( 'bc-topic-panel-' );
    $button = '<button class="bc-navigation-toggle bc-topic-toggle" type="button" hidden aria-expanded="true" aria-controls="' . esc_attr( $panel_id ) . '" data-bc-topic-toggle data-show-label="' . esc_attr__( 'Show topic navigation', 'bc-practice' ) . '" data-mobile-label="' . esc_attr( sprintf( __( 'Browse %s', 'bc-practice' ), $root_title ) ) . '" data-hide-label="' . esc_attr__( 'Hide topic navigation', 'bc-practice' ) . '"><span>' . esc_html__( 'Hide topic navigation', 'bc-practice' ) . '</span>' . bc_practice_navigation_chevron() . '</button>';
    return '<nav ' . get_block_wrapper_attributes( array( 'class' => 'bc-topic-navigation' ) ) . ' data-bc-topic-navigation data-bc-topic-root="' . esc_attr( $root ) . '" aria-label="' . esc_attr( $label ) . '">' . $button . '<div id="' . esc_attr( $panel_id ) . '" data-bc-topic-panel><h2>' . esc_html__( 'In this topic', 'bc-practice' ) . '</h2>' . $list . '</div></nav>';
}

function bc_practice_card_title( $page ) {
    $title = trim( get_the_title( $page ) );
    return '' !== $title ? $title : __( 'Untitled page', 'bc-practice' );
}

/** Render exactly two levels below the current page, using published pages. */
function bc_practice_render_child_page_cards( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( ! $page ) {
        return bc_practice_empty_preview( 'Save this page to preview its child page cards.' );
    }
    $editor = defined( 'REST_REQUEST' ) && REST_REQUEST;
    if ( ! $editor ) {
        if ( empty( $attributes['automatic'] ) && ! empty( $GLOBALS['bc_practice_automatic_cards'][ $page->ID ] ) ) {
            return '';
        }
        if ( ! empty( $attributes['automatic'] ) ) {
            $GLOBALS['bc_practice_automatic_cards'][ $page->ID ] = true;
        }
    }
    $query_args = array(
        'post_type' => 'page',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => array( 'menu_order' => 'ASC', 'title' => 'ASC', 'ID' => 'ASC' ),
        'no_found_rows' => true,
        'ignore_sticky_posts' => true,
        'update_post_meta_cache' => false,
        'update_post_term_cache' => false,
        'suppress_filters' => false,
    );
    $children = get_posts( array_merge( $query_args, array( 'post_parent' => $page->ID, 'post__not_in' => array( $page->ID ) ) ) );
    if ( ! $children ) {
        return bc_practice_empty_preview( 'Publish child pages with this page selected as their Parent to populate these cards.' );
    }
    $child_ids = wp_list_pluck( $children, 'ID' );
    $grandchildren = get_posts( array_merge( $query_args, array( 'post_parent__in' => $child_ids, 'post__not_in' => array_merge( array( $page->ID ), $child_ids ) ) ) );
    $groups = array_fill_keys( $child_ids, array() );
    foreach ( $grandchildren as $grandchild ) {
        if ( isset( $groups[ $grandchild->post_parent ] ) ) {
            $groups[ $grandchild->post_parent ][] = $grandchild;
        }
    }
    $cards = '';
    foreach ( $children as $child ) {
        $heading_id = wp_unique_id( 'bc-child-page-' . $child->ID . '-' );
        $arrow = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h16m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
        $cards .= '<section class="bc-topic-card bc-navigation-card" aria-labelledby="' . esc_attr( $heading_id ) . '"><div class="bc-topic-card-summary"><h2 id="' . esc_attr( $heading_id ) . '"><a class="bc-auto-topic-heading" href="' . esc_url( get_permalink( $child ) ) . '"><span>' . esc_html( bc_practice_card_title( $child ) ) . '</span>' . $arrow . '</a></h2>';
        $excerpt = empty( $child->post_password ) ? trim( wp_strip_all_tags( $child->post_excerpt, true ) ) : '';
        if ( '' !== $excerpt ) {
            $cards .= '<p class="bc-topic-card-excerpt">' . esc_html( $excerpt ) . '</p>';
        }
        $cards .= '</div>';
        if ( $groups[ $child->ID ] ) {
            $cards .= '<ul class="bc-grandchild-links">';
            foreach ( $groups[ $child->ID ] as $grandchild ) {
                $cards .= '<li><a href="' . esc_url( get_permalink( $grandchild ) ) . '">' . esc_html( bc_practice_card_title( $grandchild ) ) . '</a></li>';
            }
            $cards .= '</ul>';
        }
        $cards .= '</section>';
    }
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-child-page-cards bc-navigation-cards-frame' ) ) . '><div class="bc-navigation-cards">' . $cards . '</div></div>';
}

/** Resolve registered patterns and published synced blocks with cycle guards. */
function bc_practice_expand_content_blocks( $blocks, $seen = array(), $depth = 0 ) {
    if ( $depth > 20 ) {
        return array();
    }
    $expanded = array();
    foreach ( $blocks as $item ) {
        if ( 'core/pattern' === $item['blockName'] ) {
            $slug = $item['attrs']['slug'] ?? '';
            $key = is_string( $slug ) ? 'pattern:' . $slug : '';
            $registry = WP_Block_Patterns_Registry::get_instance();
            if ( ! $key || isset( $seen[ $key ] ) || ! $registry->is_registered( $slug ) ) {
                continue;
            }
            $pattern = $registry->get_registered( $slug );
            $next_seen = $seen;
            $next_seen[ $key ] = true;
            $expanded = array_merge( $expanded, bc_practice_expand_content_blocks( parse_blocks( $pattern['content'] ), $next_seen, $depth + 1 ) );
            continue;
        }
        if ( 'core/block' === $item['blockName'] && ! empty( $item['attrs']['ref'] ) ) {
            // Preserve WordPress's per-instance overrides and their binding context.
            // These references render natively and are omitted from the heading map.
            if ( isset( $item['attrs']['content'] ) || isset( $item['attrs']['overrides'] ) ) {
                $expanded[] = $item;
                continue;
            }
            $ref = absint( $item['attrs']['ref'] );
            $pattern = get_post( $ref );
            if ( isset( $seen[ $ref ] ) || ! $pattern || 'wp_block' !== $pattern->post_type || 'publish' !== $pattern->post_status || ! empty( $pattern->post_password ) ) {
                continue;
            }
            $next_seen = $seen;
            $next_seen[ $ref ] = true;
            $expanded = array_merge( $expanded, bc_practice_expand_content_blocks( parse_blocks( $pattern->post_content ), $next_seen, $depth + 1 ) );
            continue;
        }
        if ( ! empty( $item['innerBlocks'] ) ) {
            $nested = array();
            $slots = array();
            $index = 0;
            foreach ( $item['innerContent'] as $slot ) {
                if ( null !== $slot ) {
                    $slots[] = $slot;
                    continue;
                }
                $replacement = bc_practice_expand_content_blocks( array( $item['innerBlocks'][ $index++ ] ), $seen, $depth + 1 );
                foreach ( $replacement as $child ) {
                    $nested[] = $child;
                    $slots[] = null;
                }
            }
            $item['innerBlocks'] = $nested;
            $item['innerContent'] = $slots;
        }
        $expanded[] = $item;
    }
    return $expanded;
}

/** Create a deterministic heading map without changing saved page content. */
function bc_practice_prepared_content( $content ) {
    $blocks = bc_practice_expand_content_blocks( parse_blocks( $content ) );
    $content = serialize_blocks( $blocks );
    static $cache = array();
    $key = md5( $content );
    if ( isset( $cache[ $key ] ) ) {
        return $cache[ $key ];
    }
    $used = array();
    $scanner = new WP_HTML_Tag_Processor( $content );
    while ( $scanner->next_tag() ) {
        $id = $scanner->get_attribute( 'id' );
        if ( is_string( $id ) && '' !== $id ) {
            $used[ $id ] = true;
        }
    }
    $headings = array();
    $seen = array();
    $walk = function ( $blocks, $in_details = false ) use ( &$walk, &$used, &$headings, &$seen ) {
        foreach ( $blocks as &$item ) {
            $details = $in_details || 'core/details' === $item['blockName'];
            if ( ! empty( $item['innerBlocks'] ) ) {
                $item['innerBlocks'] = $walk( $item['innerBlocks'], $details );
            }
            $classes = preg_split( '/\s+/', trim( $item['attrs']['className'] ?? '' ) );
            if ( $details || 'core/heading' !== $item['blockName'] || 2 !== (int) ( $item['attrs']['level'] ?? 2 ) || in_array( 'bc-toc-exclude', $classes, true ) || ! empty( $item['attrs']['metadata']['bindings'] ) ) {
                continue;
            }
            $text = trim( html_entity_decode( wp_strip_all_tags( $item['innerHTML'] ), ENT_QUOTES, 'UTF-8' ) );
            if ( '' === $text ) {
                continue;
            }
            $tag = new WP_HTML_Tag_Processor( $item['innerHTML'] );
            if ( ! $tag->next_tag( 'H2' ) ) {
                continue;
            }
            $anchor = $tag->get_attribute( 'id' );
            if ( ! is_string( $anchor ) || '' === $anchor ) {
                $anchor = $item['attrs']['anchor'] ?? '';
            }
            if ( '' === $anchor ) {
                $base = 'section-' . ( sanitize_title( $text ) ?: 'heading' );
                $anchor = $base;
                $number = 2;
                while ( isset( $used[ $anchor ] ) ) {
                    $anchor = $base . '-' . $number++;
                }
            }
            $used[ $anchor ] = true;
            $tag->set_attribute( 'id', $anchor );
            $item['attrs']['anchor'] = $anchor;
            $item['innerHTML'] = $tag->get_updated_html();
            $item['innerContent'] = array( $item['innerHTML'] );
            // Existing duplicate author IDs are left intact; list each target once.
            if ( ! isset( $seen[ $anchor ] ) ) {
                $headings[] = array( 'id' => $anchor, 'text' => $text );
                $seen[ $anchor ] = true;
            }
        }
        unset( $item );
        return $blocks;
    };
    $result = array( 'content' => serialize_blocks( $walk( $blocks ) ), 'headings' => $headings );
    $cache[ $key ] = $result;
    return $result;
}

function bc_practice_render_page_contents( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( $page && ! empty( $GLOBALS['bc_practice_reading_layout'][ $page->ID ] ) && ! ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
        return '';
    }
    if ( ! $page ) {
        return bc_practice_empty_preview( 'On this page will list this page’s Heading 2 sections.' );
    }
    if ( post_password_required( $page ) ) {
        return '';
    }
    $prepared = bc_practice_prepared_content( $page->post_content );
    if ( count( $prepared['headings'] ) < 2 ) {
        return bc_practice_empty_preview( 'Add at least two Heading 2 sections to show On this page.' );
    }
    $items = '';
    foreach ( $prepared['headings'] as $heading ) {
        $items .= '<li><a href="#' . esc_attr( rawurlencode( $heading['id'] ) ) . '">' . esc_html( $heading['text'] ) . '</a></li>';
    }
    $presentation = 'sticky' === ( $attributes['presentation'] ?? 'inline' ) ? 'sticky' : 'inline';
    $panel_id = wp_unique_id( 'bc-contents-panel-' );
    $button = '<button class="bc-navigation-toggle bc-contents-toggle" type="button" hidden aria-expanded="true" aria-controls="' . esc_attr( $panel_id ) . '" data-bc-contents-toggle><span>' . esc_html__( 'On this page', 'bc-practice' ) . '</span>' . bc_practice_navigation_chevron() . '</button>';
    return '<nav ' . get_block_wrapper_attributes( array( 'class' => 'bc-page-contents bc-page-contents-' . $presentation ) ) . ' data-bc-page-contents aria-label="' . esc_attr__( 'On this page', 'bc-practice' ) . '"><h2>' . esc_html__( 'On this page', 'bc-practice' ) . '</h2>' . $button . '<div id="' . esc_attr( $panel_id ) . '" data-bc-contents-panel><ul>' . $items . '</ul></div></nav>';
}

add_filter( 'the_content', function ( $content ) {
    if ( 'page' === get_post_type() && ! post_password_required() ) {
        return bc_practice_prepared_content( $content )['content'];
    }
    return $content;
}, 8 );
