<?php
/** Pattern categories describe editorial tasks. Block categories remain separate. */
defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
    foreach ( array(
        'bc-page-starters' => 'Page starters',
        'bc-banners' => 'Banners and introductions',
        'bc-links' => 'Cards and links',
        'bc-text' => 'Text and reference',
        'bc-processes' => 'Steps and processes',
        'bc-accordions' => 'Accordions',
        'bc-notices' => 'Notices and callouts',
        'bc-page-information' => 'Page information and navigation',
        'bc-site-structure' => 'Site structure',
    ) as $slug => $label ) {
        register_block_pattern_category( $slug, array( 'label' => $label ) );
    }
} );

/** Reserve automatic title and footer blocks for template authors. */
add_filter( 'allowed_block_types_all', function ( $allowed, $context ) {
    // These dynamic layout blocks remain available to template authors.
    if ( empty( $context->post ) || ! in_array( $context->post->post_type, array( 'page', 'post' ), true ) ) {
        return $allowed;
    }
    if ( false === $allowed ) {
        return $allowed;
    }
    $types = true === $allowed ? array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ) : $allowed;
    return array_values( array_diff( $types, array( 'bc-practice/page-title', 'bc-practice/home-content', 'bc-practice/footer-feedback', 'bc-practice/reading-navigation', 'bc-practice/section-menu' ) ) );
}, 10, 2 );
