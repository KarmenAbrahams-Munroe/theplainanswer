(function (wp) {
    'use strict';
    var el = wp.element.createElement;
    var Panel = wp.editor.PluginDocumentSettingPanel || wp.editPost.PluginDocumentSettingPanel;
    function PageSettings() {
        var data = wp.data.useSelect(function (select) {
            var editor = select('core/editor');
            return { type: editor.getCurrentPostType(), meta: editor.getEditedPostAttribute('meta') || {}, template: editor.getEditedPostAttribute('template') };
        }, []);
        if (data.type !== 'page') { return null; }
        function update(key, value) {
            var next = Object.assign({}, data.meta); next[key] = value;
            wp.data.dispatch('core/editor').editPost({ meta: next });
        }
        var titleStyle = data.meta._bc_title_style || (window.bcPracticeLegacyTemplates || {})[data.template] || 'plain';
        return el(Panel, { name: 'bc-page-settings', title: 'Page presentation and navigation', initialOpen: true },
            el(wp.components.SelectControl, {
                label: 'Page-title appearance', value: titleStyle,
                options: [{ label: 'Plain', value: 'plain' }, { label: 'Compact image', value: 'image-compact' }, { label: 'Taller image', value: 'image-tall' }, { label: 'Compact solid colour', value: 'solid-compact' }, { label: 'Taller solid colour', value: 'solid-tall' }],
                help: 'Image titles use this page’s Featured image. The introduction uses its Excerpt.',
                onChange: function (value) { update('_bc_title_style', value); }
            }),
            el(wp.components.SelectControl, {
                label: 'Mega-menu visibility', value: data.meta._bc_menu_visibility || 'branch',
                options: [{ label: 'Show page and subpages', value: 'branch' }, { label: 'Show page only', value: 'page' }, { label: 'Hide page and subpages', value: 'hidden' }],
                help: 'A parent’s menu boundary also covers new subpages. Guide navigation, search and breadcrumbs use the full page hierarchy.',
                onChange: function (value) { update('_bc_menu_visibility', value); }
            }),
            el(wp.components.ToggleControl, {
                label: 'This page starts a guide', checked: !!data.meta._bc_guide_start,
                help: 'Scopes the guide contents and chapter navigation. Chapters follow Page order, then title.',
                onChange: function (value) { update('_bc_guide_start', value); }
            })
        );
    }
    wp.plugins.registerPlugin('bc-practice-page-settings', { render: PageSettings, icon: 'admin-page' });
})(window.wp);
