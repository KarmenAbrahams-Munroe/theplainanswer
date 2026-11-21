<?php
/** Pattern categories describe components and layouts. Block categories remain separate. */
defined( 'ABSPATH' ) || exit;

/** Resolve the one setup-only starter without changing saved pattern content. */
function bc_practice_navigation_starter_settings( $context ) {
    $page_types = apply_filters( 'bc_practice_page_editor_types', array( 'page' ) );
    if ( 'core/edit-site' === ( $context->name ?? '' ) || empty( $context->post ) || ! in_array( $context->post->post_type, $page_types, true ) ) {
        return array();
    }
    $registry = WP_Block_Patterns_Registry::get_instance();
    if ( ! $registry->is_registered( 'bc-practice/page-topic' ) ) {
        return array();
    }
    $pattern = $registry->get_registered( 'bc-practice/page-topic' );
    return array(
        'template' => 'bc-topic-landing',
        'content' => serialize_blocks( bc_practice_expand_content_blocks( parse_blocks( $pattern['content'] ) ) ),
    );
}

/** Independent pattern copies use normal block editing; authored locks still apply. */
add_filter( 'block_editor_settings_all', function ( $settings, $context ) {
    $settings['disableContentOnlyForUnsyncedPatterns'] = true;
    $starter = bc_practice_navigation_starter_settings( $context );
    if ( $starter ) {
        $settings['bcNavigationStarter'] = $starter;
    }
    return $settings;
}, 10, 2 );

add_action( 'init', function () {
    foreach ( array(
        'bc-cards' => 'Cards and panels',
        'bc-text' => 'Text and columns',
        'bc-introductions' => 'Images and introductions',
        'bc-lists' => 'Lists and checklists',
        'bc-links' => 'Links',
        'bc-tabs-accordions' => 'Tabs and accordions',
        'bc-processes' => 'Steps and processes',
        'bc-comparisons-tables' => 'Comparisons and tables',
        'bc-notices' => 'Notices and callouts',
        'bc-news' => 'News and events',
        'bc-contact' => 'Contact and support',
        'bc-site-header' => 'Header and site navigation',
        'bc-section-navigation' => 'Page and section navigation',
        'bc-page-information' => 'Page information',
    ) as $slug => $label ) {
        register_block_pattern_category( $slug, array( 'label' => $label ) );
    }
} );

/** Reserve generated page structure for template authors; registrations remain. */
add_filter( 'allowed_block_types_all', function ( $allowed, $context ) {
    // These dynamic layout blocks remain available to template authors.
    $page_types = apply_filters( 'bc_practice_page_editor_types', array( 'page', 'post' ) );
    if ( 'core/edit-site' === ( $context->name ?? '' ) || empty( $context->post ) || ! in_array( $context->post->post_type, $page_types, true ) ) {
        return $allowed;
    }
    if ( false === $allowed ) {
        return $allowed;
    }
    $types = true === $allowed ? array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ) : $allowed;
    return array_values( array_diff( $types, array(
        'bc-practice/page-title', 'bc-practice/home-content', 'bc-practice/footer-feedback',
        'bc-practice/reading-navigation', 'bc-practice/section-menu', 'bc-practice/breadcrumbs',
        'bc-practice/page-introduction', 'bc-practice/topic-navigation', 'bc-practice/child-page-cards',
        'bc-practice/page-information', 'bc-practice/last-updated', 'bc-practice/mega-menu',
        'bc-practice/page-contents', 'bc-practice/guide-contents', 'bc-practice/guide-navigation',
    ) ) );
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
