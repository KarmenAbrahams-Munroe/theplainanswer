<?php
/** Pattern-family controls, featured updates and data-table safeguards. */
defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
    $version = wp_get_theme()->get( 'Version' );
    wp_register_script( 'bc-practice-pattern-components', get_theme_file_uri( 'assets/js/pattern-components.js' ), array( 'bc-practice-component-blocks', 'wp-dom-ready', 'wp-html-entities' ), $version, true );
    register_block_type( 'bc-practice/featured-update', array(
        'api_version' => 3, 'title' => 'Featured update', 'category' => 'bc-components', 'icon' => 'megaphone',
        'attributes' => array(
            'title' => array( 'type' => 'string', 'default' => '' ), 'description' => array( 'type' => 'string', 'default' => '' ),
            'url' => array( 'type' => 'string', 'default' => '' ), 'date' => array( 'type' => 'string', 'default' => '' ),
            'showDate' => array( 'type' => 'boolean', 'default' => false ), 'visual' => array( 'type' => 'string', 'enum' => array( 'none', 'photo', 'solid', 'graphic' ), 'default' => 'none' ),
            'fallback' => array( 'type' => 'string', 'enum' => array( 'solid', 'graphic' ), 'default' => 'graphic' ),
            'imageId' => array( 'type' => 'number', 'default' => 0 ), 'imageAlt' => array( 'type' => 'string', 'default' => '' ),
        ),
        'supports' => array( 'html' => false, 'anchor' => true ), 'editor_script' => 'bc-practice-pattern-components',
        'render_callback' => 'bc_practice_render_featured_update',
    ) );
    foreach ( array( 'agenda' => array( 'Event agenda', null ), 'event-day' => array( 'Event date', array( 'bc-practice/agenda' ) ), 'event' => array( 'Event session', array( 'bc-practice/event-day' ) ) ) as $name => $settings ) {
        $args = array( 'api_version' => 3, 'title' => $settings[0], 'category' => 'bc-components', 'icon' => 'calendar', 'supports' => array( 'html' => false, 'anchor' => true ), 'editor_script' => 'bc-practice-pattern-components' );
        if ( $settings[1] ) { $args['parent'] = $settings[1]; }
        if ( 'event-day' === $name ) { $args['attributes'] = array( 'date' => array( 'type' => 'string', 'source' => 'html', 'selector' => '.bc-event-date', 'default' => '' ) ); }
        register_block_type( 'bc-practice/' . $name, $args );
    }
} );
add_action( 'enqueue_block_editor_assets', function () {
    wp_enqueue_script( 'bc-practice-pattern-components' );
    wp_add_inline_script( 'bc-practice-pattern-components', 'window.bcPracticePatternAssets = ' . wp_json_encode( array( 'graphic' => get_theme_file_uri( 'assets/images/update-graphic.svg' ) ) ) . ';', 'before' );
} );
add_action( 'enqueue_block_assets', function () {
    wp_enqueue_style( 'bc-practice-pattern-components', get_theme_file_uri( 'assets/css/pattern-components.css' ), array( 'bc-practice-framework' ), wp_get_theme()->get( 'Version' ) );
} );

function bc_practice_render_featured_update( $a ) {
    $visual = $a['visual'] ?? 'none'; $media = '';
    if ( 'photo' === $visual && ! empty( $a['imageId'] ) && wp_attachment_is_image( $a['imageId'] ) ) {
        $media = wp_get_attachment_image( $a['imageId'], 'large', false, array( 'alt' => $a['imageAlt'] ?? '', 'class' => 'bc-featured-photo' ) );
    }
    if ( ! $media && 'none' !== $visual ) {
        $visual = 'photo' === $visual ? ( $a['fallback'] ?? 'graphic' ) : $visual;
        if ( 'graphic' === $visual ) { $media = '<img src="' . esc_url( get_theme_file_uri( 'assets/images/update-graphic.svg' ) ) . '" alt="" loading="lazy" />'; }
    }
    $title = esc_html( html_entity_decode( wp_strip_all_tags( $a['title'] ?? '' ), ENT_QUOTES, 'UTF-8' ) ); $url = esc_url( $a['url'] ?? '' );
    if ( $url ) { $title = '<a href="' . $url . '">' . $title . '</a>'; }
    $date = ! empty( $a['showDate'] ) && ! empty( $a['date'] ) ? '<p class="bc-featured-date">' . esc_html( html_entity_decode( wp_strip_all_tags( $a['date'] ), ENT_QUOTES, 'UTF-8' ) ) . '</p>' : '';
    $wrapper = array( 'class' => 'bc-featured-update' );
    if ( ! empty( $a['anchor'] ) ) { $wrapper['id'] = $a['anchor']; }
    return '<div ' . get_block_wrapper_attributes( $wrapper ) . '>' . ( 'none' !== $visual ? '<div class="bc-featured-visual bc-featured-visual-' . esc_attr( $visual ) . '"' . ( 'solid' === $visual ? ' aria-hidden="true"' : '' ) . '>' . $media . '</div>' : '' ) . '<div class="bc-featured-copy"><h3 class="bc-featured-title">' . $title . '</h3>' . $date . '<p>' . wp_kses_post( $a['description'] ?? '' ) . '</p></div></div>';
}

/** Native table HTML is retained in saved content, so existing editor tools keep working. */
function bc_practice_is_data_table( $block ) {
    return ! empty( $block['attrs']['metadata']['bcDataTable'] ) || preg_match( '/(?:^|\s)bc-data-table(?:\s|$)/', $block['attrs']['className'] ?? '' );
}
function bc_practice_table_has_text( $html ) {
    return '' !== preg_replace( '/[\s\x{00a0}\x{200b}\x{feff}]+/u', '', html_entity_decode( wp_strip_all_tags( $html ), ENT_QUOTES | ENT_HTML5, 'UTF-8' ) );
}
function bc_practice_data_table_issues( $block ) {
    $html = $block['innerHTML'] ?? ''; $issues = array();
    $rows_headers = false !== strpos( ' ' . ( $block['attrs']['className'] ?? '' ) . ' ', ' bc-data-table-row-headers ' );
    if ( substr_count( strtolower( $html ), '<table' ) !== 1 || preg_match( '/\b(?:colspan|rowspan)\s*=\s*["\']?(?:[2-9]|[1-9][0-9])/i', $html ) ) { return array( 'Use a simple table without merged cells or nested tables.' ); }
    preg_match_all( '/<(?:th|td)\b[^>]*>/is', $html, $cell_tags );
    foreach ( $cell_tags[0] as $cell_html ) {
        $tag = new WP_HTML_Tag_Processor( $cell_html ); $tag->next_tag();
        foreach ( array( 'colspan', 'rowspan' ) as $span ) { $value = $tag->get_attribute( $span ); if ( null !== $value && '1' !== (string) $value ) { return array( 'Use a simple table without merged cells or nested tables.' ); } }
    }
    if ( ! preg_match( '/<(?:figcaption|caption)\b[^>]*>(.*?)<\/(?:figcaption|caption)>/is', $html, $caption ) || ! bc_practice_table_has_text( $caption[1] ) ) { $issues[] = 'Enter a table title in the Table headings panel.'; }
    $head = array();
    if ( preg_match( '/<thead\b[^>]*>(.*?)<\/thead>/is', $html, $section ) && 1 === preg_match_all( '/<tr\b[^>]*>(.*?)<\/tr>/is', $section[1], $head_rows ) ) {
        preg_match_all( '/<(th|td)\b([^>]*)>(.*?)<\/\1>/is', $head_rows[1][0], $head, PREG_SET_ORDER );
    }
    if ( ! $head ) { $issues[] = 'Add one column-heading row. Existing data will stay in place.'; }
    foreach ( $head as $cell ) {
        $tag = new WP_HTML_Tag_Processor( '<' . $cell[1] . $cell[2] . '>' ); $tag->next_tag();
        if ( 'th' !== strtolower( $cell[1] ) || 'col' !== $tag->get_attribute( 'scope' ) ) { $issues[] = 'Use column heading cells for every cell in the heading row.'; break; }
        if ( ! bc_practice_table_has_text( $cell[3] ) ) { $issues[] = 'Give each column a heading.'; break; }
    }
    if ( preg_match( '/<tbody\b[^>]*>(.*?)<\/tbody>/is', $html, $body ) ) {
        preg_match_all( '/<tr\b[^>]*>(.*?)<\/tr>/is', $body[1], $rows );
        foreach ( $rows[1] as $row ) {
            preg_match_all( '/<(th|td)\b([^>]*)>(.*?)<\/\1>/is', $row, $cells, PREG_SET_ORDER );
            if ( $head && count( $cells ) !== count( $head ) ) { $issues[] = 'Give every row the same number of cells as the heading row.'; break; }
            foreach ( $cells as $i => $cell ) {
                $tag = new WP_HTML_Tag_Processor( '<' . $cell[1] . $cell[2] . '>' ); $tag->next_tag();
                $is_row = $rows_headers && 0 === $i;
                if ( $is_row && ( 'th' !== strtolower( $cell[1] ) || 'row' !== $tag->get_attribute( 'scope' ) || ! bc_practice_table_has_text( $cell[3] ) ) ) { $issues[] = 'Give each row a row heading.'; break 2; }
                if ( ! $is_row && 'th' === strtolower( $cell[1] ) ) { $issues[] = 'Use the Row headings option to identify row headings consistently.'; break 2; }
            }
        }
    }
    if ( $head && preg_match( '/<tfoot\b[^>]*>(.*?)<\/tfoot>/is', $html, $foot ) ) {
        preg_match_all( '/<tr\b[^>]*>(.*?)<\/tr>/is', $foot[1], $rows );
        foreach ( $rows[1] as $row ) { preg_match_all( '/<(?:th|td)\b[^>]*>/is', $row, $cells ); if ( count( $cells[0] ) !== count( $head ) ) { $issues[] = 'Give every row the same number of cells as the heading row.'; break; } }
    }
    return array_values( array_unique( $issues ) );
}
function bc_practice_validate_data_tables( $content, $seen = array() ) {
    $issues = array();
    foreach ( parse_blocks( $content ) as $block ) {
        if ( 'core/table' === $block['blockName'] && bc_practice_is_data_table( $block ) ) { $issues = array_merge( $issues, bc_practice_data_table_issues( $block ) ); }
        if ( ! empty( $block['innerBlocks'] ) ) { $issues = array_merge( $issues, bc_practice_validate_data_tables( serialize_blocks( $block['innerBlocks'] ), $seen ) ); }
        if ( 'core/block' === $block['blockName'] && ! empty( $block['attrs']['ref'] ) ) {
            $ref = (int) $block['attrs']['ref']; $key = 'ref:' . $ref;
            if ( ! in_array( $key, $seen, true ) && count( $seen ) < 20 ) { $shared = get_post( $ref ); if ( $shared ) { $issues = array_merge( $issues, bc_practice_validate_data_tables( $shared->post_content, array_merge( $seen, array( $key ) ) ) ); } }
        }
        if ( 'core/pattern' === $block['blockName'] && ! empty( $block['attrs']['slug'] ) ) {
            $slug = $block['attrs']['slug']; $key = 'pattern:' . $slug; $registry = WP_Block_Patterns_Registry::get_instance();
            if ( ! in_array( $key, $seen, true ) && count( $seen ) < 20 && $registry->is_registered( $slug ) ) { $pattern = $registry->get_registered( $slug ); $issues = array_merge( $issues, bc_practice_validate_data_tables( $pattern['content'], array_merge( $seen, array( $key ) ) ) ); }
        }
    }
    return array_values( array_unique( $issues ) );
}
function bc_practice_table_publication_error( $content ) {
    $issues = bc_practice_validate_data_tables( $content );
    return $issues ? new WP_Error( 'bc_data_table', 'Check the Data table before publishing: ' . implode( ' ', $issues ) . ' You can still save a draft.', array( 'status' => 422 ) ) : null;
}
foreach ( array( 'page', 'post', 'wp_block', 'wp_template', 'wp_template_part' ) as $post_type ) {
    add_filter( 'rest_pre_insert_' . $post_type, function ( $prepared, $request ) {
        if ( is_wp_error( $prepared ) ) { return $prepared; }
        $id = (int) ( $request['id'] ?? 0 ); $status = $prepared->post_status ?? ( $id ? get_post_status( $id ) : 'draft' );
        if ( in_array( $status, array( 'publish', 'future', 'private' ), true ) ) {
            $content = $prepared->post_content ?? ( $id ? get_post_field( 'post_content', $id ) : '' );
            $error = bc_practice_table_publication_error( $content ); if ( $error ) { return $error; }
        }
        return $prepared;
    }, 10, 2 );
}
/** The companion workflow retains its own API; validate its saved checkpoint without modifying the plugin. */
add_filter( 'rest_pre_dispatch', function ( $result, $server, $request ) {
    if ( 'POST' === $request->get_method() && preg_match( '#^/bc-page-workflow/v1/pages/(\d+)/publish$#', $request->get_route(), $match ) && function_exists( 'bcw_state' ) && current_user_can( 'edit_post', (int) $match[1] ) ) {
        $state = bcw_state( (int) $match[1] ); $snapshot = $state ? json_decode( $state->snapshot, true ) : null;
        if ( $snapshot ) { $error = bc_practice_table_publication_error( $snapshot['content'] ); if ( $error ) { return $error; } }
    }
    return $result;
}, 4, 3 );
add_filter( 'render_block_core/table', function ( $html, $block ) {
    if ( ! bc_practice_is_data_table( $block ) ) { return $html; }
    if ( preg_match( '/<figcaption\b[^>]*>(.*?)<\/figcaption>/is', $html, $caption ) ) {
        $html = preg_replace( '/<figcaption\b[^>]*>.*?<\/figcaption>/is', '', $html, 1 );
        $html = preg_replace_callback( '/<table\b[^>]*>/i', function ( $m ) use ( $caption ) { return $m[0] . '<caption>' . $caption[1] . '</caption>'; }, $html, 1 );
    }
    $label = isset( $caption[1] ) ? html_entity_decode( wp_strip_all_tags( $caption[1] ), ENT_QUOTES, 'UTF-8' ) : 'Data table';
    $processor = new WP_HTML_Tag_Processor( $html );
    if ( $processor->next_tag( 'FIGURE' ) ) { $processor->add_class( 'bc-data-table' ); $processor->set_attribute( 'tabindex', '0' ); $processor->set_attribute( 'role', 'region' ); $processor->set_attribute( 'aria-label', $label ); }
    return $processor->get_updated_html();
}, 10, 2 );

require_once get_theme_file_path( 'inc/refinements.php' );
