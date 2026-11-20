<?php
/** Pattern categories describe editorial tasks. Block categories remain separate. */
defined( 'ABSPATH' ) || exit;

/** Independent pattern copies use normal block editing; authored locks still apply. */
add_filter( 'block_editor_settings_all', function ( $settings ) {
    $settings['disableContentOnlyForUnsyncedPatterns'] = true;
    return $settings;
} );

add_action( 'init', function () {
    foreach ( array(
        'bc-page-starters' => 'Page starters',
        'bc-banners' => 'Banners and introductions',
        'bc-links' => 'Links and cards',
        'bc-text' => 'Text, lists and tables',
        'bc-processes' => 'Steps and processes',
        'bc-accordions' => 'Accordions',
        'bc-notices' => 'Notices and callouts',
        'bc-page-information' => 'Page information',
        'bc-news' => 'News and events',
        'bc-site-structure' => 'Site structure',
    ) as $slug => $label ) {
        register_block_pattern_category( $slug, array( 'label' => $label ) );
    }
} );

/** Reserve automatic title and footer blocks for template authors. */
add_filter( 'allowed_block_types_all', function ( $allowed, $context ) {
    // These dynamic layout blocks remain available to template authors.
    $page_types = apply_filters( 'bc_practice_page_editor_types', array( 'page', 'post' ) );
    if ( empty( $context->post ) || ! in_array( $context->post->post_type, $page_types, true ) ) {
        return $allowed;
    }
    if ( false === $allowed ) {
        return $allowed;
    }
    $types = true === $allowed ? array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ) : $allowed;
    return array_values( array_diff( $types, array( 'bc-practice/page-title', 'bc-practice/home-content', 'bc-practice/footer-feedback', 'bc-practice/reading-navigation', 'bc-practice/section-menu' ) ) );
}, 10, 2 );

/** Keep the stable template slug and saved layouts; change its editor-facing label only. */
add_filter( 'theme_page_templates', function ( $templates ) {
    if ( isset( $templates['bc-topic-landing'] ) ) { $templates['bc-topic-landing'] = 'Navigation page'; }
    return $templates;
} );
function bc_practice_navigation_template_label( $template ) {
    if ( $template && 'bc-topic-landing' === $template->slug && in_array( $template->theme, array( get_stylesheet(), get_template() ), true ) ) {
        $template = clone $template; $template->title = 'Navigation page';
    }
    return $template;
}
add_filter( 'get_block_templates', function ( $templates ) { return array_map( 'bc_practice_navigation_template_label', $templates ); } );
add_filter( 'get_block_template', 'bc_practice_navigation_template_label' );
// WordPress returns customized templates before its final get_block_template filter.
add_filter( 'pre_get_block_template', function ( $value, $id, $type ) {
    static $resolving = false;
    if ( $resolving || 'wp_template' !== $type || ! in_array( $id, array( get_stylesheet() . '//bc-topic-landing', get_template() . '//bc-topic-landing' ), true ) ) { return $value; }
    if ( null !== $value ) { return bc_practice_navigation_template_label( $value ); }
    $resolving = true;
    try { return bc_practice_navigation_template_label( get_block_template( $id, $type ) ); }
    finally { $resolving = false; }
}, 99, 3 );
