<?php
/** Asset loading for the B.C. practice theme. */
defined( 'ABSPATH' ) || exit;

add_action( 'after_setup_theme', function () {
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'responsive-embeds' );
} );

// WordPress 6.6+ loads block assets in both the front end and the editor canvas.
add_action( 'enqueue_block_assets', function () {
    $version = wp_get_theme()->get( 'Version' );
    wp_enqueue_style( 'bc-practice-tokens', get_theme_file_uri( 'assets/css/design-tokens.css' ), array(), $version );
    wp_enqueue_style( 'bc-practice-blocks', get_theme_file_uri( 'assets/css/theme.css' ), array( 'bc-practice-tokens' ), $version );
} );

require_once get_theme_file_path( 'inc/page-templates.php' );
require_once get_theme_file_path( 'inc/components.php' );
