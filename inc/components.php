<?php
/** Reusable content components and their local assets. */
defined( 'ABSPATH' ) || exit;

function bc_practice_component_icons() {
    return array(
        'info' => array( 'label' => __( 'Information', 'bc-practice' ), 'paths' => '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>' ),
        'warning' => array( 'label' => __( 'Warning', 'bc-practice' ), 'paths' => '<path d="M12 3 2 21h20L12 3Zm0 6v5m0 3v1"/>' ),
        'check' => array( 'label' => __( 'Check mark', 'bc-practice' ), 'paths' => '<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>' ),
        'error' => array( 'label' => __( 'Error', 'bc-practice' ), 'paths' => '<circle cx="12" cy="12" r="9"/><path d="m8 8 8 8m0-8-8 8"/>' ),
        'document' => array( 'label' => __( 'Document', 'bc-practice' ), 'paths' => '<path d="M5 2h9l5 5v15H5V2Zm9 0v6h5M8 12h8m-8 4h8"/>' ),
        'clock' => array( 'label' => __( 'Clock', 'bc-practice' ), 'paths' => '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>' ),
        'contact' => array( 'label' => __( 'Contact', 'bc-practice' ), 'paths' => '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/>' ),
        'location' => array( 'label' => __( 'Location', 'bc-practice' ), 'paths' => '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>' ),
        'calendar' => array( 'label' => __( 'Calendar', 'bc-practice' ), 'paths' => '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18m-13 5h2m4 0h2"/>' ),
        'search' => array( 'label' => __( 'Search', 'bc-practice' ), 'paths' => '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>' ),
        'briefcase' => array( 'label' => __( 'Briefcase / jobs', 'bc-practice' ), 'paths' => '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12h18m-13-5v14m8-14v14"/>' ),
        'book' => array( 'label' => __( 'Book / learning', 'bc-practice' ), 'paths' => '<path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>' ),
        'heart' => array( 'label' => __( 'Heart / well-being', 'bc-practice' ), 'paths' => '<path d="M12 21 3 12a6 6 0 0 1 9-8 6 6 0 0 1 9 8l-9 9Z"/>' ),
        'laptop' => array( 'label' => __( 'Laptop / telework', 'bc-practice' ), 'paths' => '<rect x="5" y="3" width="14" height="13" rx="1"/><path d="M5 16 2 21h20l-3-5M9 21l1-3h4l1 3"/>' ),
        'chart' => array( 'label' => __( 'Chart / performance', 'bc-practice' ), 'paths' => '<path d="M3 3v18h18M6 16l5-5 4 3 6-8m-5 0h5v5"/>' ),
        'people' => array( 'label' => __( 'People / team', 'bc-practice' ), 'paths' => '<circle cx="9" cy="7" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m0-17a3 3 0 0 1 0 6m3 4a6 6 0 0 1 3 5v2"/>' ),
        'person' => array( 'label' => __( 'Person / profile', 'bc-practice' ), 'paths' => '<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>' ),
        'settings' => array( 'label' => __( 'Settings', 'bc-practice' ), 'paths' => '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2" fill="white"/><circle cx="16" cy="12" r="2" fill="white"/><circle cx="10" cy="18" r="2" fill="white"/>' ),
        'shield' => array( 'label' => __( 'Shield / safety', 'bc-practice' ), 'paths' => '<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m7 12 3 3 7-7"/>' ),
        'lock' => array( 'label' => __( 'Lock / privacy', 'bc-practice' ), 'paths' => '<rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v3"/>' ),
        'key' => array( 'label' => __( 'Key / access', 'bc-practice' ), 'paths' => '<circle cx="7" cy="8" r="5"/><path d="m11 12 10 10m-4-4 3-3m-6 0 3-3"/>' ),
        'home' => array( 'label' => __( 'Home', 'bc-practice' ), 'paths' => '<path d="m2 11 10-9 10 9M5 9v13h14V9M9 22v-8h6v8"/>' ),
        'phone' => array( 'label' => __( 'Phone', 'bc-practice' ), 'paths' => '<path d="M4 2h4l2 5-3 2a16 16 0 0 0 8 8l2-3 5 2v4c0 2-2 3-4 2C10 20 4 14 2 6 1 4 2 2 4 2Z"/>' ),
        'chat' => array( 'label' => __( 'Chat / feedback', 'bc-practice' ), 'paths' => '<path d="M3 3h18v14H9l-6 5V3Zm4 5h10M7 12h7"/>' ),
        'help' => array( 'label' => __( 'Help / question', 'bc-practice' ), 'paths' => '<circle cx="12" cy="12" r="10"/><path d="M9.25 8a2.75 2.75 0 1 1 5.5 0c0 2.1-2.75 2.25-2.75 4.75"/><circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none"/>' ),
        'download' => array( 'label' => __( 'Download', 'bc-practice' ), 'paths' => '<path d="M12 2v13m-5-5 5 5 5-5M3 16v6h18v-6"/>' ),
        'upload' => array( 'label' => __( 'Upload', 'bc-practice' ), 'paths' => '<path d="M12 16V3m-5 5 5-5 5 5M3 16v6h18v-6"/>' ),
        'external-link' => array( 'label' => __( 'External link', 'bc-practice' ), 'paths' => '<path d="M14 3h7v7m0-7L10 14M10 5H3v16h16v-7"/>' ),
        'arrow-right' => array( 'label' => __( 'Arrow right / go to', 'bc-practice' ), 'paths' => '<path d="M3 12h18m-7-7 7 7-7 7"/>' ),
        'link' => array( 'label' => __( 'Link', 'bc-practice' ), 'paths' => '<path d="m10 8 4-4a5 5 0 0 1 7 7l-4 4m-3 1-4 4a5 5 0 0 1-7-7l4-4m1 7 8-8"/>' ),
        'globe' => array( 'label' => __( 'Globe / website', 'bc-practice' ), 'paths' => '<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>' ),
        'folder' => array( 'label' => __( 'Folder / resources', 'bc-practice' ), 'paths' => '<path d="M2 5h8l2 3h10v13H2V5Z"/>' ),
        'clipboard' => array( 'label' => __( 'Clipboard / checklist', 'bc-practice' ), 'paths' => '<path d="M8 4H4v18h16V4h-4M8 2h8v5H8V2Zm0 10h8m-8 5h8"/>' ),
        'wallet' => array( 'label' => __( 'Wallet / pay', 'bc-practice' ), 'paths' => '<path d="M3 5h16v4H3V5Zm0 4h19v12H3V9Zm13 4h6v5h-6v-5"/><circle cx="18.5" cy="15.5" r=".5"/>' ),
        'bank' => array( 'label' => __( 'Bank / pension', 'bc-practice' ), 'paths' => '<path d="m2 7 10-5 10 5H2Zm2 3v8m5-8v8m6-8v8m5-8v8M2 22h20M3 19h18"/>' ),
        'award' => array( 'label' => __( 'Award / recognition', 'bc-practice' ), 'paths' => '<circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9"/>' ),
        'graduation' => array( 'label' => __( 'Graduation / training', 'bc-practice' ), 'paths' => '<path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7c4 3 8 3 12 0v-7m4-2v11"/>' ),
        'building' => array( 'label' => __( 'Building / workplace', 'bc-practice' ), 'paths' => '<path d="M4 22V2h16v20H4Zm4-16h1m6 0h1M8 10h1m6 0h1M8 14h1m6 0h1m-7 8v-4h6v4"/>' ),
        'lightbulb' => array( 'label' => __( 'Light bulb / ideas', 'bc-practice' ), 'paths' => '<path d="M8 17c0-4-4-4-4-8a8 8 0 0 1 16 0c0 4-4 4-4 8H8Zm0 3h8m-6 3h4"/>' ),
        'leaf' => array( 'label' => __( 'Leaf / environment', 'bc-practice' ), 'paths' => '<path d="M21 2C7 2 2 7 3 14c1 6 8 9 13 4 4-4 5-10 5-16ZM2 22 16 8"/>' ),
        'accessibility' => array( 'label' => __( 'Accessibility', 'bc-practice' ), 'paths' => '<circle cx="12" cy="4" r="2"/><path d="M3 9h18m-9-3v9m0-3-6 10m6-10 6 10"/>' ),
        'tools' => array( 'label' => __( 'Tools', 'bc-practice' ), 'paths' => '<path d="M14.4 6.6 17 9.2l4-4a6 6 0 0 1-7.7 7.7l-7.6 7.6a2.1 2.1 0 0 1-3-3l7.6-7.6A6 6 0 0 1 18 2.2l-3.6 4.4Z"/><circle cx="4.3" cy="19.2" r=".55" fill="currentColor" stroke="none"/>' ),
        'star' => array( 'label' => __( 'Star / favourite', 'bc-practice' ), 'paths' => '<path d="m12 2 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1 3-7Z"/>' ),
        'refresh' => array( 'label' => __( 'Refresh / update', 'bc-practice' ), 'paths' => '<path d="M21 8a9 9 0 0 0-16-3L2 8m0-6v6h6m-5 8a9 9 0 0 0 16 3l3-3m0 6v-6h-6"/>' ),
    );
}

function bc_practice_component_blocks() {
    $options = array();
    foreach ( bc_practice_component_icons() as $value => $icon ) {
        $options[] = array( 'value' => $value, 'label' => $icon['label'] );
    }
    return array(
        'icon' => array( 'title' => __( 'Component icon', 'bc-practice' ), 'icon' => 'info', 'description' => __( 'A decorative icon accompanying a heading or message.', 'bc-practice' ), 'category' => 'bc-components', 'iconOptions' => $options, 'attributes' => array( 'icon' => array( 'type' => 'string', 'enum' => array_keys( bc_practice_component_icons() ), 'default' => 'info' ) ) ),
        'accordion-controls' => array( 'title' => __( 'Accordion controls', 'bc-practice' ), 'icon' => 'list-view', 'description' => __( 'Expand all and Collapse all for the Details blocks in an accordion group.', 'bc-practice' ), 'category' => 'bc-components' ),
        'last-updated' => array( 'title' => __( 'Last updated', 'bc-practice' ), 'icon' => 'calendar-alt', 'description' => __( 'Shows the last saved modification date using the site date format and time zone.', 'bc-practice' ), 'category' => 'bc-components' ),
    );
}

add_filter( 'block_categories_all', function ( $categories ) {
    $categories[] = array( 'slug' => 'bc-components', 'title' => __( 'B.C. components', 'bc-practice' ) );
    return $categories;
} );

add_action( 'init', function () {
    $version = wp_get_theme()->get( 'Version' );
    wp_register_script( 'bc-practice-editor-tools', get_theme_file_uri( 'assets/js/editor-tools.js' ), array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-data', 'wp-hooks', 'wp-notices' ), $version, true );
    wp_register_script( 'bc-practice-component-blocks', get_theme_file_uri( 'assets/js/component-blocks.js' ), array( 'bc-practice-editor-tools' ), $version, true );
    register_block_type( 'bc-practice/steps', array(
        'api_version' => 3, 'title' => __( 'Steps', 'bc-practice' ), 'category' => 'bc-components', 'icon' => 'editor-ol',
        'attributes' => array( 'presentation' => array( 'type' => 'string', 'enum' => array( 'simple', 'connected', 'cards', 'roadmap' ), 'default' => 'connected' ), 'markers' => array( 'type' => 'string', 'enum' => array( '', 'numbers', 'icons' ), 'default' => '' ) ),
        'supports' => array( 'html' => false ), 'editor_script' => 'bc-practice-component-blocks',
    ) );
    register_block_type( 'bc-practice/resource-tabs', array(
        'api_version' => 3, 'title' => __( 'Resource tabs', 'bc-practice' ), 'category' => 'bc-components', 'icon' => 'index-card',
        'attributes' => array( 'label' => array( 'type' => 'string', 'default' => 'Resource categories' ) ),
        'supports' => array( 'html' => false, 'anchor' => true ), 'editor_script' => 'bc-practice-component-blocks',
    ) );
    register_block_type( 'bc-practice/resource-panel', array(
        'api_version' => 3, 'title' => __( 'Resource group', 'bc-practice' ), 'category' => 'bc-components', 'icon' => 'screenoptions',
        'attributes' => array( 'title' => array( 'type' => 'string', 'source' => 'html', 'selector' => '.bc-tab-panel-title', 'default' => 'Resource group' ) ),
        'parent' => array( 'bc-practice/resource-tabs' ), 'supports' => array( 'html' => false, 'anchor' => true, 'reusable' => false ),
        'editor_script' => 'bc-practice-component-blocks',
    ) );
    register_block_type( 'bc-practice/step', array(
        'api_version' => 3, 'title' => __( 'Step', 'bc-practice' ), 'category' => 'bc-components', 'icon' => 'editor-ol',
        'parent' => array( 'bc-practice/steps' ), 'supports' => array( 'html' => false, 'reusable' => false ),
        'editor_script' => 'bc-practice-component-blocks',
    ) );
} );

add_action( 'after_setup_theme', function () {
    add_theme_support( 'editor-styles' );
    add_editor_style( 'assets/css/editor.css' );
} );

add_action( 'enqueue_block_editor_assets', function () {
    wp_enqueue_script( 'bc-practice-editor-tools' );
    wp_enqueue_style( 'bc-practice-editor-ui', get_theme_file_uri( 'assets/css/editor.css' ), array(), wp_get_theme()->get( 'Version' ) );
} );

add_action( 'enqueue_block_assets', function () {
    wp_enqueue_style( 'bc-practice-components', get_theme_file_uri( 'assets/css/components.css' ), array( 'bc-practice-page-templates' ), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'bc-practice-banners', get_theme_file_uri( 'assets/css/banners.css' ), array( 'bc-practice-components' ), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'bc-practice-framework', get_theme_file_uri( 'assets/css/page-framework.css' ), array( 'bc-practice-banners' ), wp_get_theme()->get( 'Version' ) );
} );

add_action( 'wp_enqueue_scripts', function () {
    if ( is_singular() ) {
        wp_enqueue_script( 'bc-practice-components', get_theme_file_uri( 'assets/js/components.js' ), array(), wp_get_theme()->get( 'Version' ), array( 'strategy' => 'defer', 'in_footer' => true ) );
    }
} );

function bc_practice_component_svg( $name ) {
    $icons = bc_practice_component_icons();
    $icon = $icons[ $name ] ?? $icons['info'];
    return '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' . $icon['paths'] . '</svg>';
}

function bc_practice_render_icon( $attributes ) {
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-component-icon' ) ) . ' aria-hidden="true">' . bc_practice_component_svg( $attributes['icon'] ?? 'info' ) . '</div>';
}

function bc_practice_render_accordion_controls() {
    $editor = defined( 'REST_REQUEST' ) && REST_REQUEST;
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-accordion-controls' ) ) . ' data-bc-accordion-controls data-expanded-message="' . esc_attr__( 'All sections expanded.', 'bc-practice' ) . '" data-collapsed-message="' . esc_attr__( 'All sections collapsed.', 'bc-practice' ) . '"' . ( $editor ? '' : ' hidden' ) . '><div class="bc-accordion-actions"><button type="button" data-bc-expand-all' . ( $editor ? ' disabled' : '' ) . '>' . esc_html__( 'Expand all', 'bc-practice' ) . '</button><span aria-hidden="true">|</span><button type="button" data-bc-collapse-all' . ( $editor ? ' disabled' : '' ) . '>' . esc_html__( 'Collapse all', 'bc-practice' ) . '</button></div><span class="screen-reader-text" data-bc-accordion-status aria-live="polite"></span></div>';
}

function bc_practice_render_last_updated( $attributes, $content, $block ) {
    $id = isset( $block->context['postId'] ) ? absint( $block->context['postId'] ) : get_the_ID();
    $post = get_post( $id );
    $date = bc_practice_updated_date( $post );
    if ( ! $date ) {
        return bc_practice_empty_preview( __( 'The page layout displays this date automatically when enabled. It uses the last saved modification date.', 'bc-practice' ) );
    }
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-last-updated' ) ) . '>' . bc_practice_component_svg( 'calendar' ) . '<p>' . esc_html__( 'Last updated:', 'bc-practice' ) . ' ' . $date . '</p></div>';
}

require_once get_theme_file_path( 'inc/pattern-components.php' );
