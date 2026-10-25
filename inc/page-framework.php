<?php
/** Shared page titles, metadata, guide links and footer integration. */
defined( 'ABSPATH' ) || exit;

function bc_practice_framework_blocks() {
    return array(
        'page-title' => array( 'title' => 'Page title and introduction', 'icon' => 'heading', 'description' => 'Current page title, explicit excerpt, appearance and page information.', 'attributes' => array( 'showUpdated' => array( 'type' => 'boolean', 'default' => true ), 'showAudience' => array( 'type' => 'boolean', 'default' => true ) ) ),
        'page-information' => array( 'title' => 'Page information', 'icon' => 'info', 'description' => 'Selected audience and applicability terms, with an optional saved modification date.', 'attributes' => array( 'showUpdated' => array( 'type' => 'boolean', 'default' => false ), 'showAudience' => array( 'type' => 'boolean', 'default' => true ) ) ),
        'guide-contents' => array( 'title' => 'Guide contents', 'icon' => 'editor-ol', 'description' => 'Lists published pages within the closest marked guide, in page order.' ),
        'guide-navigation' => array( 'title' => 'Previous and next chapter', 'icon' => 'leftright', 'description' => 'Previous and next pages within an explicitly marked guide.' ),
        'home-content' => array( 'title' => 'Home page content', 'icon' => 'admin-home', 'description' => 'The static home page body, or the posts index when Reading settings use latest posts.' ),
        'footer-feedback' => array( 'title' => 'Footer page feedback', 'icon' => 'feedback', 'description' => 'Page-linked feedback above the site footer. Requires B.C. page feedback 1.1 or later.' ),
    );
}

function bc_practice_updated_date( $post ) {
    if ( ! $post || post_password_required( $post ) ) {
        return '';
    }
    $editor = defined( 'REST_REQUEST' ) && REST_REQUEST;
    if ( ! $editor && ! empty( $GLOBALS['bc_practice_updated'][ $post->ID ] ) ) {
        return '';
    }
    $date = get_post_datetime( $post, 'modified' );
    if ( ! $date ) {
        return '';
    }
    if ( ! $editor ) {
        $GLOBALS['bc_practice_updated'][ $post->ID ] = true;
    }
    return '<time datetime="' . esc_attr( $date->format( DATE_W3C ) ) . '">' . esc_html( wp_date( get_option( 'date_format' ) ?: 'F j, Y', $date->getTimestamp() ) ) . '</time>';
}

function bc_practice_page_information( $page, $updated, $audience ) {
    if ( ! $page || post_password_required( $page ) ) {
        return '';
    }
    $items = '';
    $editor = defined( 'REST_REQUEST' ) && REST_REQUEST;
    if ( $audience && ( $editor || empty( $GLOBALS['bc_practice_audience'][ $page->ID ] ) ) ) {
        foreach ( array( 'bc_audience' => 'Written for', 'bc_applicability' => 'Applies to' ) as $taxonomy => $label ) {
            $terms = get_the_terms( $page, $taxonomy );
            if ( ! $terms || is_wp_error( $terms ) ) {
                continue;
            }
            $names = array_map( function ( $term ) { return esc_html( $term->name ); }, $terms );
            $items .= '<div><dt>' . esc_html( $label ) . '</dt><dd>' . implode( ', ', $names ) . '</dd></div>';
        }
        if ( $items && ! $editor ) {
            $GLOBALS['bc_practice_audience'][ $page->ID ] = true;
        }
    }
    if ( $updated ) {
        $date = bc_practice_updated_date( $page );
        if ( $date ) {
            $items .= '<div><dt>Last updated</dt><dd>' . $date . '</dd></div>';
        }
    }
    return $items ? '<dl class="bc-page-information">' . $items . '</dl>' : '';
}

function bc_practice_render_page_information( $attributes, $content, $block ) {
    $html = bc_practice_page_information( bc_practice_context_page( $block ), ! empty( $attributes['showUpdated'] ), $attributes['showAudience'] ?? true );
    return $html ? '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-page-information-block' ) ) . '>' . $html . '</div>' : bc_practice_empty_preview( 'Select Written for or Applies to terms in the page settings. Empty fields are omitted.' );
}

function bc_practice_render_page_title( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( ! $page ) {
        return ( is_front_page() && is_home() ) ? '<div class="bc-page-hero bc-page-title"><h1>' . esc_html( get_bloginfo( 'name' ) ) . '</h1></div>' : bc_practice_empty_preview( 'The page title, Excerpt, selected appearance and page information appear here.' );
    }
    $copy = '<h1 class="wp-block-post-title">' . esc_html( bc_practice_card_title( $page ) ) . '</h1>';
    if ( ! post_password_required( $page ) && '' !== trim( $page->post_excerpt ) ) {
        $copy .= '<div class="bc-page-introduction">' . wpautop( esc_html( $page->post_excerpt ) ) . '</div>';
    }
    $information = bc_practice_page_information( $page, $attributes['showUpdated'] ?? true, $attributes['showAudience'] ?? true );
    $style = bc_practice_title_style( $page->ID );
    $image = '';
    if ( 0 === strpos( $style, 'image-' ) && ! post_password_required( $page ) ) {
        $image = get_the_post_thumbnail( $page, 'large', array( 'alt' => '', 'class' => 'bc-title-image', 'loading' => 'eager' ) );
    }
    if ( 'plain' === $style || ( 0 === strpos( $style, 'image-' ) && ! $image ) ) {
        return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-page-title bc-page-hero' ) ) . '>' . $copy . $information . '</div>';
    }
    if ( 'image-compact' === $style ) {
        $banner = '<div class="bc-banner bc-banner-image-compact"><div class="bc-banner-copy">' . $copy . '</div><figure class="bc-banner-media">' . $image . '</figure></div>';
    } elseif ( 'image-tall' === $style ) {
        $banner = '<div class="bc-banner bc-title-image-tall">' . $image . '<div class="bc-banner-copy">' . $copy . '</div></div>';
    } else {
        $banner = '<div class="bc-banner bc-banner-solid ' . ( 'solid-tall' === $style ? 'bc-banner-tall' : 'bc-banner-compact' ) . '"><div class="bc-banner-copy">' . $copy . '</div></div>';
    }
    return '<div ' . get_block_wrapper_attributes( array( 'class' => 'bc-page-title bc-banner-frame' ) ) . '>' . $banner . $information . '</div>';
}

function bc_practice_guide_pages( $root ) {
    return get_pages( array( 'child_of' => $root, 'sort_column' => 'menu_order,post_title,ID', 'post_status' => 'publish' ) );
}

function bc_practice_render_guide_contents( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    $root = $page ? bc_practice_guide_root( $page->ID ) : 0;
    if ( ! $root ) {
        return bc_practice_empty_preview( 'Mark the guide’s starting page in Page presentation and navigation.' );
    }
    $pages = bc_practice_guide_pages( $root );
    if ( ! $pages ) {
        return bc_practice_empty_preview( 'Publish child pages to populate the guide contents.' );
    }
    $list = wp_list_pages( array( 'pages' => $pages, 'child_of' => $root, 'title_li' => '', 'echo' => false, 'current_page' => $page->ID, 'sort_column' => 'menu_order,post_title,ID' ) );
    return '<nav ' . get_block_wrapper_attributes( array( 'class' => 'bc-guide-contents' ) ) . ' aria-label="Guide contents"><h2>In this guide</h2><ul>' . $list . '</ul></nav>';
}

function bc_practice_guide_order( $parent, $groups, &$ordered, &$seen, $depth = 0 ) {
    if ( $depth > 20 || empty( $groups[ $parent ] ) ) {
        return;
    }
    foreach ( $groups[ $parent ] as $page ) {
        if ( isset( $seen[ $page->ID ] ) || get_post_meta( $page->ID, '_bc_guide_start', true ) ) {
            continue;
        }
        $seen[ $page->ID ] = true;
        $ordered[] = $page;
        bc_practice_guide_order( $page->ID, $groups, $ordered, $seen, $depth + 1 );
    }
}

function bc_practice_render_guide_navigation( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    $root = $page ? bc_practice_guide_root( $page->ID ) : 0;
    if ( ! $root ) {
        return '';
    }
    $groups = array();
    foreach ( bc_practice_guide_pages( $root ) as $item ) {
        $groups[ $item->post_parent ][] = $item;
    }
    $ordered = array( get_post( $root ) );
    $seen = array( $root => true );
    bc_practice_guide_order( $root, $groups, $ordered, $seen );
    $position = array_search( (int) $page->ID, array_map( 'intval', wp_list_pluck( $ordered, 'ID' ) ), true );
    if ( false === $position || count( $ordered ) < 2 ) {
        return '';
    }
    $links = '';
    foreach ( array( -1 => 'Previous', 1 => 'Next' ) as $offset => $label ) {
        if ( ! isset( $ordered[ $position + $offset ] ) ) {
            continue;
        }
        $target = $ordered[ $position + $offset ];
        $links .= '<a class="bc-guide-' . ( $offset < 0 ? 'previous' : 'next' ) . '" rel="' . ( $offset < 0 ? 'prev' : 'next' ) . '" href="' . esc_url( get_permalink( $target ) ) . '"><span>' . esc_html( $label ) . '</span><strong>' . esc_html( bc_practice_card_title( $target ) ) . '</strong></a>';
    }
    return '<nav ' . get_block_wrapper_attributes( array( 'class' => 'bc-guide-navigation' ) ) . ' aria-label="Guide chapters">' . $links . '</nav>';
}

function bc_practice_render_home_content( $attributes, $content, $block ) {
    $page = bc_practice_context_page( $block );
    if ( $page ) {
        $parsed = parse_blocks( '<!-- wp:post-content {"className":"bc-home-content","layout":{"type":"default"}} /-->' );
        $body = new WP_Block( $parsed[0], array( 'postId' => $page->ID, 'postType' => 'page' ) );
        return $body->render();
    }
    if ( is_home() ) {
        return do_blocks( '<!-- wp:heading --><h2 class="wp-block-heading">Latest updates</h2><!-- /wp:heading --><!-- wp:query {"query":{"inherit":true}} --><div class="wp-block-query"><!-- wp:post-template --><!-- wp:post-title {"level":3,"isLink":true} /--><!-- wp:post-excerpt /--><!-- /wp:post-template --><!-- wp:query-pagination --><!-- wp:query-pagination-previous /--><!-- wp:query-pagination-numbers /--><!-- wp:query-pagination-next /--><!-- /wp:query-pagination --><!-- wp:query-no-results --><!-- wp:paragraph --><p>No updates have been published yet.</p><!-- /wp:paragraph --><!-- /wp:query-no-results --></div><!-- /wp:query -->' );
    }
    return bc_practice_empty_preview( 'Choose a static home page under Settings → Reading. Its body content appears here.' );
}

function bc_practice_render_footer_feedback( $attributes = array(), $content = '', $block = null ) {
    if ( ! function_exists( 'bc_pf_render_footer' ) ) {
        return '';
    }
    $form = bc_pf_render_footer();
    return $form ? '<div class="bc-footer-feedback"><div class="bc-page-shell">' . $form . '</div></div>' : '';
}

/** Saved footer customizations also receive the shared strip, without rewriting them. */
add_filter( 'render_block_core/template-part', function ( $html, $block ) {
    if ( 'footer' !== ( $block['attrs']['slug'] ?? '' ) && 'footer' !== ( $block['attrs']['tagName'] ?? '' ) ) {
        return $html;
    }
    $strip = bc_practice_render_footer_feedback();
    if ( ! $strip ) {
        return $html;
    }
    if ( preg_match( '/<footer\b[^>]*>/i', $html ) ) {
        return preg_replace_callback( '/<footer\b[^>]*>/i', function ( $match ) use ( $strip ) { return $match[0] . $strip; }, $html, 1 );
    }
    return $strip . $html;
}, 10, 2 );
