<?php
/** One reading index and one section menu, placed in document order at each size. */
defined( 'ABSPATH' ) || exit;

add_action( 'enqueue_block_assets', function () {
    wp_enqueue_style( 'bc-practice-reading-navigation', get_theme_file_uri( 'assets/css/reading-navigation.css' ), array( 'bc-practice-framework' ), wp_get_theme()->get( 'Version' ) );
} );

add_action( 'wp_enqueue_scripts', function () {
    if ( is_singular( 'page' ) ) {
        wp_enqueue_script( 'bc-practice-reading-navigation', get_theme_file_uri( 'assets/js/reading-navigation.js' ), array( 'bc-practice-page-navigation' ), wp_get_theme()->get( 'Version' ), array( 'strategy' => 'defer', 'in_footer' => true ) );
    }
} );

function bc_practice_reading_data( $page ) {
    static $cache = array();
    if ( isset( $cache[ $page->ID ] ) ) {
        return $cache[ $page->ID ];
    }
    $root = bc_practice_guide_root( $page->ID );
    if ( ! $root ) {
        $parent = $page->post_parent;
        $root = $parent && 'publish' === get_post_status( $parent ) && (int) $parent !== (int) get_option( 'page_on_front' ) ? $parent : $page->ID;
    }
    $groups = array();
    foreach ( get_pages( array( 'child_of' => $root, 'post_status' => 'publish', 'sort_column' => 'menu_order,post_title,ID' ) ) as $item ) {
        $groups[ $item->post_parent ][] = $item;
    }
    $ancestors = array_map( 'intval', get_post_ancestors( $page ) );
    $items = bc_practice_topic_items( $root, $groups, $page, $ancestors );
    $root_page = get_post( $root );
    $section = '';
    if ( $items && $root_page && 'publish' === $root_page->post_status ) {
        $section = '<ul><li class="bc-section-overview"><a href="' . esc_url( get_permalink( $root ) ) . '"' . ( (int) $root === (int) $page->ID ? ' aria-current="page"' : '' ) . '>' . esc_html( bc_practice_card_title( $root_page ) ) . '</a></li>' . $items . '</ul>';
    }
    $headings = post_password_required( $page ) ? array() : bc_practice_prepared_content( $page->post_content )['headings'];
    if ( count( $headings ) < 2 ) {
        $headings = array();
    }
    $cache[ $page->ID ] = array( 'id' => 'bc-reading-' . $page->ID, 'root' => (int) $root, 'title' => $root_page ? bc_practice_card_title( $root_page ) : '', 'section' => $section, 'headings' => $headings );
    return $cache[ $page->ID ];
}

function bc_practice_reading_is_editor() {
    return defined( 'REST_REQUEST' ) && REST_REQUEST;
}

function bc_practice_render_reading_navigation( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( ! $page ) {
        return bc_practice_empty_preview( 'The page’s headings and published section pages appear here.' );
    }
    $data = bc_practice_reading_data( $page );
    if ( ! $data['headings'] && ! $data['section'] ) {
        return bc_practice_empty_preview( 'Add at least two H2 headings or published pages in the section to show reading navigation.' );
    }
    if ( ! bc_practice_reading_is_editor() ) {
        if ( ! empty( $GLOBALS['bc_practice_reading_layout'][ $page->ID ] ) ) {
            return '';
        }
        $GLOBALS['bc_practice_reading_layout'][ $page->ID ] = true;
    }
    $id = $data['id'];
    $html = '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-reading-navigation' ) ) . ' data-bc-reading-navigation data-section-id="' . esc_attr( $id . '-section-pane' ) . '" data-section-root="' . (int) $data['root'] . '">';
    $html .= '<div class="bc-reading-tools" data-reading-tools hidden><h2 data-reading-single-label hidden>' . esc_html( $data['headings'] ? 'On this page' : 'In this section' ) . '</h2><div class="bc-reading-tabs" role="tablist" aria-label="Page and section navigation" data-reading-tabs>';
    if ( $data['headings'] ) {
        $html .= '<button type="button" id="' . esc_attr( $id . '-page-tab' ) . '" role="tab" aria-controls="' . esc_attr( $id . '-page-pane' ) . '" aria-selected="true" tabindex="0" data-reading-tab="page">On this page</button>';
    }
    if ( $data['section'] ) {
        $html .= '<button type="button" id="' . esc_attr( $id . '-section-tab' ) . '" role="tab" aria-controls="' . esc_attr( $id . '-section-pane' ) . '" aria-selected="' . ( $data['headings'] ? 'false' : 'true' ) . '" tabindex="' . ( $data['headings'] ? '-1' : '0' ) . '" data-reading-tab="section">In this section</button>';
    }
    $html .= '</div></div>';
    if ( $data['headings'] ) {
        $html .= '<div class="bc-reading-page-pane" id="' . esc_attr( $id . '-page-pane' ) . '" data-reading-pane="page"><details class="bc-reading-page-disclosure" open data-reading-page-disclosure><summary>On this page</summary><nav aria-label="On this page" data-bc-reading-index><ul>';
        foreach ( $data['headings'] as $heading ) {
            $html .= '<li><a href="#' . esc_attr( rawurlencode( $heading['id'] ) ) . '">' . esc_html( $heading['text'] ) . '</a></li>';
        }
        $html .= '</ul></nav></details></div>';
    }
    if ( $data['section'] ) {
        $html .= '<a class="bc-section-jump" href="#' . esc_attr( $id . '-section-summary' ) . '" data-reading-section-jump>In this section ' . bc_practice_navigation_chevron() . '</a>';
    }
    return $html . '</div>';
}

function bc_practice_render_section_menu( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( ! $page ) {
        return bc_practice_empty_preview( 'The section menu appears after the article on mobile.' );
    }
    $data = bc_practice_reading_data( $page );
    if ( ! $data['section'] ) {
        return '';
    }
    if ( ! bc_practice_reading_is_editor() ) {
        if ( ! empty( $GLOBALS['bc_practice_section_menu'][ $page->ID ] ) ) {
            return '';
        }
        $GLOBALS['bc_practice_section_menu'][ $page->ID ] = true;
    }
    $id = $data['id'];
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-section-end' ) ) . ' data-reading-section-home><div class="bc-reading-section-pane" id="' . esc_attr( $id . '-section-pane' ) . '" data-reading-pane="section"><details class="bc-section-menu" data-reading-section-disclosure><summary id="' . esc_attr( $id . '-section-summary' ) . '">In this section</summary><nav class="bc-reading-section-links" aria-label="In this section">' . $data['section'] . '</nav></details></div></div>';
}
