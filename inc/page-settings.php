<?php
/** Page presentation, navigation boundaries and site-managed audience terms. */
defined( 'ABSPATH' ) || exit;

function bc_practice_title_styles() {
    return array( '' => 'Plain', 'plain' => 'Plain', 'image-compact' => 'Compact image', 'image-tall' => 'Taller image', 'solid-compact' => 'Compact solid colour', 'solid-tall' => 'Taller solid colour' );
}

function bc_practice_legacy_templates() {
    return array( 'bc-detail-content' => 'plain', 'bc-banner-image-compact' => 'image-compact', 'bc-banner-image-tall' => 'image-tall', 'bc-banner-solid-compact' => 'solid-compact', 'bc-banner-solid-tall' => 'solid-tall' );
}

function bc_practice_title_style( $id ) {
    $style = get_post_meta( $id, '_bc_title_style', true );
    if ( $style && isset( bc_practice_title_styles()[ $style ] ) ) {
        return $style;
    }
    return bc_practice_legacy_templates()[ get_page_template_slug( $id ) ] ?? 'plain';
}

function bc_practice_navigation_mode( $id ) {
    $mode = get_post_meta( $id, '_bc_menu_visibility', true );
    return in_array( $mode, array( 'branch', 'page', 'hidden' ), true ) ? $mode : 'branch';
}

/** A branch boundary also applies when a descendant is selected as a menu root. */
function bc_practice_in_mega_menu( $id ) {
    if ( 'hidden' === bc_practice_navigation_mode( $id ) ) {
        return false;
    }
    foreach ( get_post_ancestors( $id ) as $ancestor ) {
        if ( 'branch' !== bc_practice_navigation_mode( $ancestor ) ) {
            return false;
        }
    }
    return true;
}

/** The closest explicitly marked guide wins for nested guides. */
function bc_practice_guide_root( $id ) {
    foreach ( array_merge( array( $id ), get_post_ancestors( $id ) ) as $candidate ) {
        if ( get_post_meta( $candidate, '_bc_guide_start', true ) && 'publish' === get_post_status( $candidate ) ) {
            return (int) $candidate;
        }
    }
    return 0;
}

add_action( 'after_setup_theme', function () {
    add_post_type_support( 'page', 'custom-fields' );
    add_theme_support( 'bc-page-feedback-footer' );
} );

add_action( 'init', function () {
    $permission = function ( $allowed, $key, $post_id ) { return current_user_can( 'edit_post', $post_id ); };
    foreach ( array(
        '_bc_title_style' => array( 'default' => '', 'enum' => array_keys( bc_practice_title_styles() ) ),
        '_bc_menu_visibility' => array( 'default' => 'branch', 'enum' => array( 'branch', 'page', 'hidden' ) ),
    ) as $key => $settings ) {
        register_post_meta( 'page', $key, array(
            'type' => 'string', 'single' => true, 'default' => $settings['default'],
            'show_in_rest' => array( 'schema' => array( 'type' => 'string', 'enum' => $settings['enum'] ) ),
            'auth_callback' => $permission,
            'sanitize_callback' => function ( $value ) use ( $settings ) { return in_array( $value, $settings['enum'], true ) ? $value : $settings['default']; },
        ) );
    }
    register_post_meta( 'page', '_bc_related_pages', array(
        'type' => 'array', 'single' => true, 'default' => array(),
        'show_in_rest' => array( 'schema' => array( 'type' => 'array', 'context' => array( 'edit' ), 'items' => array( 'type' => 'integer', 'minimum' => 1 ) ) ),
        'auth_callback' => $permission,
        'sanitize_callback' => function ( $value ) { return is_array( $value ) ? array_values( array_unique( array_filter( array_map( 'absint', $value ) ) ) ) : array(); },
    ) );
    register_post_meta( 'page', '_bc_guide_start', array( 'type' => 'boolean', 'single' => true, 'default' => false, 'show_in_rest' => true, 'auth_callback' => $permission, 'sanitize_callback' => 'rest_sanitize_boolean' ) );
    foreach ( array( 'bc_audience' => array( 'Written for', 'Audience' ), 'bc_applicability' => array( 'Applies to', 'Applicability group' ) ) as $name => $labels ) {
        register_taxonomy( $name, 'page', array(
            'labels' => array( 'name' => $labels[0], 'singular_name' => $labels[1], 'menu_name' => $labels[0], 'add_new_item' => 'Add ' . strtolower( $labels[1] ), 'edit_item' => 'Edit ' . strtolower( $labels[1] ), 'search_items' => 'Search ' . strtolower( $labels[0] ) ),
            'public' => false, 'show_ui' => true, 'show_in_rest' => true, 'show_admin_column' => true,
            'hierarchical' => true, 'rewrite' => false, 'query_var' => false,
            'capabilities' => array( 'manage_terms' => 'manage_options', 'edit_terms' => 'manage_options', 'delete_terms' => 'manage_options', 'assign_terms' => 'edit_pages' ),
        ) );
    }
} );

add_action( 'enqueue_block_editor_assets', function () {
    $screen = get_current_screen();
    if ( ! $screen || 'page' !== $screen->post_type || 'post' !== $screen->base ) {
        return;
    }
    wp_enqueue_script( 'bc-practice-page-settings', get_theme_file_uri( 'assets/js/page-settings.js' ), array( 'wp-plugins', 'wp-editor', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-core-data', 'wp-html-entities' ), wp_get_theme()->get( 'Version' ), true );
    wp_add_inline_script( 'bc-practice-page-settings', 'window.bcPracticeLegacyTemplates = ' . wp_json_encode( bc_practice_legacy_templates() ) . ';', 'before' );
} );
