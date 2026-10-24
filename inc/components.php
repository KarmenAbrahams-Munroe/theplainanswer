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
    register_block_pattern_category( 'bc-components', array( 'label' => __( 'B.C. components', 'bc-practice' ) ) );
    $version = wp_get_theme()->get( 'Version' );
    wp_register_script( 'bc-practice-component-blocks', get_theme_file_uri( 'assets/js/component-blocks.js' ), array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ), $version, true );
    register_block_type( 'bc-practice/steps', array(
        'api_version' => 3, 'title' => __( 'Numbered steps', 'bc-practice' ), 'category' => 'bc-components', 'icon' => 'editor-ol',
        'attributes' => array( 'presentation' => array( 'type' => 'string', 'enum' => array( 'connected', 'cards' ), 'default' => 'connected' ) ),
        'supports' => array( 'html' => false ), 'editor_script' => 'bc-practice-component-blocks',
    ) );
    register_block_type( 'bc-practice/step', array(
        'api_version' => 3, 'title' => __( 'Step', 'bc-practice' ), 'category' => 'bc-components', 'icon' => 'editor-ol',
        'parent' => array( 'bc-practice/steps' ), 'supports' => array( 'html' => false, 'reusable' => false ),
        'editor_script' => 'bc-practice-component-blocks',
    ) );
} );

add_action( 'enqueue_block_assets', function () {
    wp_enqueue_style( 'bc-practice-components', get_theme_file_uri( 'assets/css/components.css' ), array( 'bc-practice-page-templates' ), wp_get_theme()->get( 'Version' ) );
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
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-accordion-controls' ) ) . ' data-bc-accordion-controls data-expanded-message="' . esc_attr__( 'All sections expanded.', 'bc-practice' ) . '" data-collapsed-message="' . esc_attr__( 'All sections collapsed.', 'bc-practice' ) . '"' . ( $editor ? '' : ' hidden' ) . '><div class="bc-accordion-actions"><button type="button" data-bc-expand-all' . ( $editor ? ' disabled' : '' ) . '>' . esc_html__( 'Expand all', 'bc-practice' ) . '</button><button type="button" data-bc-collapse-all' . ( $editor ? ' disabled' : '' ) . '>' . esc_html__( 'Collapse all', 'bc-practice' ) . '</button></div><span class="screen-reader-text" data-bc-accordion-status aria-live="polite"></span></div>';
}

function bc_practice_render_last_updated( $attributes, $content, $block ) {
    $id = isset( $block->context['postId'] ) ? absint( $block->context['postId'] ) : get_the_ID();
    $post = get_post( $id );
    $date = $post ? get_post_datetime( $post, 'modified' ) : false;
    if ( ! $date ) {
        return bc_practice_empty_preview( __( 'The last saved update date will appear here.', 'bc-practice' ) );
    }
    $format = get_option( 'date_format' ) ?: 'F j, Y';
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-last-updated' ) ) . '>' . bc_practice_component_svg( 'calendar' ) . '<p>' . esc_html__( 'Last updated:', 'bc-practice' ) . ' <time datetime="' . esc_attr( $date->format( DATE_W3C ) ) . '">' . esc_html( wp_date( $format, $date->getTimestamp() ) ) . '</time></p></div>';
}
