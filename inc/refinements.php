<?php
/** Page navigation choices and shared visual refinements. */
defined( 'ABSPATH' ) || exit;
function bc_practice_navigation_panels( $id ) {
    $mode = bc_practice_page_meta( $id, '_bc_navigation_panels' ) ?: 'both';
    return array( 'page' => in_array( $mode, array( 'both', 'page' ), true ), 'section' => in_array( $mode, array( 'both', 'section' ), true ) );
}
function bc_practice_navigation_card_styles() { return array( 'standard' => 'Standard cards', 'image' => 'Image cards', 'icons' => 'Icon cards', 'panels' => 'Icon panels', 'rows' => 'Compact icon rows' ); }
function bc_practice_navigation_card_style( $id ) {
    $style = bc_practice_page_meta( $id, '_bc_navigation_cards' );
    return isset( bc_practice_navigation_card_styles()[ $style ] ) ? $style : 'standard';
}
add_action( 'init', function () {
    $fields = array(
        '_bc_navigation_panels' => array( 'both', array( 'both', 'page', 'section', 'none' ) ),
        '_bc_navigation_cards' => array( 'standard', array_keys( bc_practice_navigation_card_styles() ) ),
        '_bc_page_icon' => array( 'document', array_keys( bc_practice_component_icons() ) ),
    );
    foreach ( $fields as $key => $settings ) {
        register_post_meta( 'page', $key, array( 'type' => 'string', 'single' => true, 'default' => $settings[0], 'show_in_rest' => array( 'schema' => array( 'type' => 'string', 'enum' => $settings[1] ) ),
            'auth_callback' => function ( $allowed, $key, $id ) { return current_user_can( 'edit_post', $id ); },
            'sanitize_callback' => function ( $value ) use ( $settings ) { return in_array( $value, $settings[1], true ) ? $value : $settings[0]; },
        ) );
    }
}, 20 );
add_action( 'enqueue_block_assets', function () {
    wp_enqueue_style( 'bc-practice-refinements', get_theme_file_uri( 'assets/css/refinements.css' ), array( 'bc-practice-pattern-components', 'bc-practice-reading-navigation' ), wp_get_theme()->get( 'Version' ) );
} );
add_action( 'enqueue_block_editor_assets', function () {
    $icons = array(); foreach ( bc_practice_component_icons() as $key => $icon ) { $icons[] = array( 'value' => $key, 'label' => $icon['label'], 'paths' => $icon['paths'] ); }
    wp_add_inline_script( 'bc-practice-page-settings', 'window.bcPracticeNavigationOptions = ' . wp_json_encode( array( 'styles' => bc_practice_navigation_card_styles(), 'icons' => $icons, 'ready' => ! defined( 'BCW_VERSION' ) || version_compare( BCW_VERSION, '0.1.1', '>=' ) ) ) . ';', 'before' );
}, 20 );
add_filter( 'body_class', function ( $classes ) {
    if ( is_singular( 'page' ) && 'none' === bc_practice_page_meta( get_queried_object_id(), '_bc_navigation_panels' ) ) { $classes[] = 'bc-reading-off'; }
    return $classes;
} );
