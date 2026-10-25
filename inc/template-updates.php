<?php
/** Reviewable migration of old template assignments; saved layouts remain intact. */
defined( 'ABSPATH' ) || exit;

function bc_practice_saved_template( $slug, $type = 'wp_template' ) {
    return get_posts( array( 'post_type' => $type, 'post_status' => 'any', 'name' => $slug, 'posts_per_page' => 1, 'fields' => 'ids', 'tax_query' => array( array( 'taxonomy' => 'wp_theme', 'field' => 'name', 'terms' => array_unique( array( get_stylesheet(), get_template() ) ) ) ) ) );
}

function bc_practice_old_template_pages() {
    return get_posts( array( 'post_type' => 'page', 'post_status' => 'any', 'posts_per_page' => -1, 'orderby' => 'title', 'order' => 'ASC', 'meta_query' => array( array( 'key' => '_wp_page_template', 'value' => array_keys( bc_practice_legacy_templates() ), 'compare' => 'IN' ) ) ) );
}

/** Resolve old assignments until reviewed, while keeping them out of new choices. */
add_filter( 'get_block_template', function ( $template, $id, $type ) {
    if ( $template || 'wp_template' !== $type ) {
        return $template;
    }
    $parts = explode( '//', $id, 2 );
    if ( 2 !== count( $parts ) || ! in_array( $parts[0], array( get_stylesheet(), get_template() ), true ) || ! isset( bc_practice_legacy_templates()[ $parts[1] ] ) ) {
        return $template;
    }
    $base = get_block_template( get_stylesheet() . '//page', $type );
    if ( ! $base ) {
        return $template;
    }
    $alias = clone $base;
    $alias->id = $id;
    $alias->slug = $parts[1];
    $alias->title = 'Standard content';
    return $alias;
}, 10, 3 );

function bc_practice_migrate_template_page( $page ) {
    $old = get_page_template_slug( $page );
    $styles = bc_practice_legacy_templates();
    if ( ! isset( $styles[ $old ] ) || bc_practice_saved_template( $old ) || ! current_user_can( 'edit_post', $page->ID ) ) {
        return false;
    }
    $current = get_post_meta( $page->ID, '_bc_title_style', true );
    $new_style = $current ?: $styles[ $old ];
    if ( ! metadata_exists( 'post', $page->ID, '_bc_template_backup' ) ) {
        update_post_meta( $page->ID, '_bc_template_backup', array( 'template' => $old, 'style_exists' => metadata_exists( 'post', $page->ID, '_bc_title_style' ), 'style' => $current, 'migrated_style' => $new_style ) );
    }
    update_post_meta( $page->ID, '_bc_title_style', $new_style );
    update_post_meta( $page->ID, '_wp_page_template', 'default' );
    return true;
}

function bc_practice_restore_template_page( $page ) {
    $backup = get_post_meta( $page->ID, '_bc_template_backup', true );
    if ( ! is_array( $backup ) || ! isset( $backup['template'], $backup['migrated_style'] ) || 'default' !== get_post_meta( $page->ID, '_wp_page_template', true ) || get_post_meta( $page->ID, '_bc_title_style', true ) !== $backup['migrated_style'] || ! current_user_can( 'edit_post', $page->ID ) ) {
        return false;
    }
    update_post_meta( $page->ID, '_wp_page_template', $backup['template'] );
    if ( $backup['style_exists'] ) {
        update_post_meta( $page->ID, '_bc_title_style', $backup['style'] );
    } else {
        delete_post_meta( $page->ID, '_bc_title_style' );
    }
    delete_post_meta( $page->ID, '_bc_template_backup' );
    return true;
}

add_action( 'admin_menu', function () { add_theme_page( 'Theme setup', 'Theme setup', 'manage_options', 'bc-practice-setup', 'bc_practice_setup_screen' ); } );

add_action( 'admin_notices', function () {
    if ( ! current_user_can( 'manage_options' ) || ! bc_practice_old_template_pages() ) {
        return;
    }
    echo '<div class="notice notice-info"><p>Some pages use earlier title or content templates. <a href="' . esc_url( admin_url( 'themes.php?page=bc-practice-setup' ) ) . '">Review template updates</a> to consolidate compatible assignments. Saved Site Editor layouts are preserved.</p></div>';
} );

function bc_practice_setup_screen() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    echo '<div class="wrap"><h1>Theme setup</h1><p>Page layouts: Home (the static front page), Topic landing page, Pages (standard content), and Guide and reference. Page-title appearance is a separate page setting.</p>';
    echo '<p><a href="' . esc_url( admin_url( 'options-reading.php' ) ) . '">Choose the static home page</a>. Administrators can maintain audience terms under <a href="' . esc_url( admin_url( 'edit-tags.php?taxonomy=bc_audience&post_type=page' ) ) . '">Pages → Written for</a> and <a href="' . esc_url( admin_url( 'edit-tags.php?taxonomy=bc_applicability&post_type=page' ) ) . '">Pages → Applies to</a>. Both lists start empty.</p>';
    if ( isset( $_GET['updated'] ) && is_scalar( $_GET['updated'] ) ) {
        echo '<div class="notice notice-success inline"><p>Updated ' . absint( $_GET['updated'] ) . ' compatible assignments. Saved layouts and page content were preserved.</p></div>';
    }
    if ( function_exists( 'bc_pf_render' ) && ! function_exists( 'bc_pf_render_footer' ) ) {
        echo '<div class="notice notice-warning inline"><p>Update the B.C. page feedback plugin to version 1.1 or later to enable shared footer placement. The older plugin continues using its existing placement.</p></div>';
    }
    echo '<h2>Earlier template assignments</h2><p>The update moves compatible assignments to Pages and preserves their title appearance. Page text and saved modification dates stay intact. Assignments with a saved customization of their old template require individual review.</p>';
    $pages = bc_practice_old_template_pages();
    if ( $pages ) {
        echo '<table class="widefat striped"><thead><tr><th>Page</th><th>Earlier template</th><th>Action</th></tr></thead><tbody>';
        foreach ( $pages as $page ) {
            $old = get_page_template_slug( $page );
            echo '<tr><td><a href="' . esc_url( get_edit_post_link( $page->ID ) ) . '">' . esc_html( bc_practice_card_title( $page ) ) . '</a></td><td>' . esc_html( $old ) . '</td><td>' . ( bc_practice_saved_template( $old ) ? 'Saved customization — review individually' : 'Move to Pages; keep title appearance' ) . '</td></tr>';
        }
        echo '</tbody></table>';
        bc_practice_template_update_form( 'migrate', 'Update compatible assignments' );
    } else {
        echo '<p>No earlier template assignments need updating.</p>';
    }
    echo '<p>Version 1.10 updates Pages, Guide and reference, and Topic landing page. The new reading layouts align titles with article content and provide a sticky two-view sidebar. Topic landing page supplies navigation cards automatically. Saved layout overrides remain in control until reviewed.</p>';
    echo '<h2>Saved Site Editor layouts</h2><p>These customizations take precedence over theme files. Review or export a customization before using the Site Editor’s reset controls to adopt the updated layout.</p><ul>';
    $saved = false;
    foreach ( array( 'wp_template', 'wp_template_part' ) as $type ) {
        foreach ( get_block_templates( array(), $type ) as $template ) {
            if ( ! empty( $template->wp_id ) ) {
                $saved = true;
                echo '<li>' . esc_html( $template->title ) . ' (' . esc_html( $template->slug ) . ')</li>';
            }
        }
    }
    echo $saved ? '</ul>' : '<li>No saved layout customizations found.</li></ul>';
    echo '<p>The shared footer receives feedback on eligible content pages. Add confirmed site-information links in the Footer template part. The Site notice template part is an empty slot for an optional centrally managed notice.</p>';
    $backups = get_posts( array( 'post_type' => 'page', 'post_status' => 'any', 'posts_per_page' => 1, 'meta_key' => '_bc_template_backup' ) );
    if ( $backups ) {
        echo '<h2>Restore earlier assignments</h2><p>Restore assignments changed by this screen when their template and title appearance have not subsequently changed.</p>';
        bc_practice_template_update_form( 'restore', 'Restore compatible previous assignments' );
    }
    echo '</div>';
}

function bc_practice_template_update_form( $operation, $label ) {
    echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '"><input type="hidden" name="action" value="bc_practice_template_update"><input type="hidden" name="operation" value="' . esc_attr( $operation ) . '">';
    wp_nonce_field( 'bc_practice_template_update' );
    submit_button( $label, 'secondary' );
    echo '</form>';
}

add_action( 'admin_post_bc_practice_template_update', function () {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'You cannot update template assignments.', '', array( 'response' => 403 ) );
    }
    check_admin_referer( 'bc_practice_template_update' );
    $restore = isset( $_POST['operation'] ) && 'restore' === $_POST['operation'];
    $pages = $restore ? get_posts( array( 'post_type' => 'page', 'post_status' => 'any', 'posts_per_page' => -1, 'meta_key' => '_bc_template_backup' ) ) : bc_practice_old_template_pages();
    $count = 0;
    foreach ( $pages as $page ) {
        if ( $restore ? bc_practice_restore_template_page( $page ) : bc_practice_migrate_template_page( $page ) ) {
            $count++;
        }
    }
    wp_safe_redirect( add_query_arg( array( 'page' => 'bc-practice-setup', 'updated' => $count ), admin_url( 'themes.php' ) ) );
    exit;
} );
