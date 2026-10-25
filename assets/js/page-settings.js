(function (wp) {
    'use strict';
    var el = wp.element.createElement;
    var Panel = wp.editor.PluginDocumentSettingPanel || wp.editPost.PluginDocumentSettingPanel;
    function pageTitle(page, id) {
        return page ? wp.htmlEntities.decodeEntities(page.title.rendered || page.title.raw || 'Untitled page') : 'Page ' + id + ' (unavailable)';
    }
    function RelatedPages(props) {
        var ids = props.meta._bc_related_pages || [];
        var filter = wp.element.useState(''), input = filter[0], setInput = filter[1];
        var debounced = wp.element.useState(''), search = debounced[0], setSearch = debounced[1];
        wp.element.useEffect(function () {
            var timer = setTimeout(function () { setSearch(input); }, 300);
            return function () { clearTimeout(timer); };
        }, [input]);
        var data = wp.data.useSelect(function (select) {
            var core = select('core');
            var query = { context: 'edit', status: 'publish', per_page: 20, search: search, orderby: 'title', order: 'asc', _fields: 'id,title,password' };
            return {
                matches: core.getEntityRecords('postType', 'page', query),
                failed: core.hasResolutionFailed('getEntityRecords', ['postType', 'page', query]),
                selected: ids.map(function (id) { return core.getEntityRecord('postType', 'page', id, { context: 'edit', _fields: 'id,title,status' }); })
            };
        }, [search, props.id, ids.join(',')]);
        var matches = (data.matches || []).filter(function (page) { return page.id !== props.id && ids.indexOf(page.id) === -1 && !page.password; });
        var options = matches.map(function (page) {
            var label = pageTitle(page, page.id);
            if (matches.filter(function (other) { return pageTitle(other, other.id) === label; }).length > 1) { label += ' (page ' + page.id + ')'; }
            return { value: String(page.id), label: label };
        });
        function move(index, offset) {
            var next = ids.slice(), other = index + offset;
            if (other < 0 || other >= next.length) { return; }
            next[index] = ids[other]; next[other] = ids[index]; props.update('_bc_related_pages', next);
        }
        return el(Panel, { name: 'bc-related-pages', title: 'Related pages', initialOpen: true },
            el('p', {}, 'Choose pages to show as cards below page feedback. Cards use each page’s current title and Page introduction (excerpt).'),
            el(wp.components.ComboboxControl, {
                label: 'Add a related page', value: null, options: options,
                onFilterValueChange: setInput,
                onChange: function (value) {
                    var id = Number(value);
                    if (id && ids.indexOf(id) === -1) { props.update('_bc_related_pages', ids.concat(id)); setInput(''); setSearch(''); }
                },
                help: data.failed ? 'The page list could not be loaded. Reload the editor and try again.' : !data.matches ? 'Loading pages…' : 'Type to search published pages. Password-protected pages are excluded.'
            }),
            ids.length ? el('ol', { className: 'bc-editor-related-list' }, ids.map(function (id, index) {
                var page = data.selected[index], title = pageTitle(page, id);
                return el('li', { key: id },
                    el('strong', {}, (index + 1) + '. ' + title),
                    page && page.status !== 'publish' && el('p', {}, 'This page is unpublished. Its card is hidden from visitors.'),
                    el('div', { className: 'bc-editor-related-actions' },
                        el(wp.components.Button, { variant: 'tertiary', disabled: index === 0, label: 'Move ' + title + ' up', onClick: function () { move(index, -1); } }, 'Move up'),
                        el(wp.components.Button, { variant: 'tertiary', disabled: index === ids.length - 1, label: 'Move ' + title + ' down', onClick: function () { move(index, 1); } }, 'Move down'),
                        el(wp.components.Button, { variant: 'tertiary', label: 'Unselect ' + title, onClick: function () { props.update('_bc_related_pages', ids.filter(function (value) { return value !== id; })); } }, 'Unselect')
                    )
                );
            })) : el('p', {}, 'No related pages selected. The section stays hidden until you choose a page.')
        );
    }
    function PageSettings() {
        var data = wp.data.useSelect(function (select) {
            var editor = select('core/editor');
            return { id: window.bcPageWorkflow ? window.bcPageWorkflow.page.source_id : editor.getCurrentPostId(), type: editor.getCurrentPostType(), meta: editor.getEditedPostAttribute('meta') || {}, template: editor.getEditedPostAttribute('template'), excerpt: editor.getEditedPostAttribute('excerpt') || '' };
        }, []);
        if ((window.bcPracticePageEditorTypes || ['page']).indexOf(data.type) === -1) { return null; }
        function update(key, value) {
            var next = Object.assign({}, data.meta); next[key] = value;
            wp.data.dispatch('core/editor').editPost({ meta: next });
        }
        var titleStyle = data.meta._bc_title_style || (window.bcPracticeLegacyTemplates || {})[data.template] || 'plain';
        return el(wp.element.Fragment, {}, el(Panel, { name: 'bc-page-settings', title: 'Page presentation and navigation', initialOpen: true },
            el(wp.components.SelectControl, {
                label: 'Page-title appearance', value: titleStyle,
                options: [{ label: 'Plain', value: 'plain' }, { label: 'Compact image', value: 'image-compact' }, { label: 'Taller image', value: 'image-tall' }, { label: 'Compact solid colour', value: 'solid-compact' }, { label: 'Taller solid colour', value: 'solid-tall' }],
                help: 'Image titles use this page’s Featured image.',
                onChange: function (value) { update('_bc_title_style', value); }
            }),
            el(wp.components.TextareaControl, {
                label: 'Page introduction (excerpt)', value: data.excerpt,
                help: 'Appears below this page’s title and on its card on the parent navigation page.',
                onChange: function (value) { wp.data.dispatch('core/editor').editPost({ excerpt: value }); }
            }),
            el(wp.components.SelectControl, {
                label: 'Mega-menu visibility', value: data.meta._bc_menu_visibility || 'branch',
                options: [{ label: 'Show page and subpages', value: 'branch' }, { label: 'Show page only', value: 'page' }, { label: 'Hide page and subpages', value: 'hidden' }],
                help: 'A parent’s menu boundary also covers new subpages. Guide navigation, search and breadcrumbs use the full page hierarchy.',
                onChange: function (value) { update('_bc_menu_visibility', value); }
            }),
            el(wp.components.ToggleControl, {
                label: 'This page starts a guide', checked: !!data.meta._bc_guide_start,
                help: 'Scopes In this section and enables ordered Previous/Next links. Chapters follow Page order, then title.',
                onChange: function (value) { update('_bc_guide_start', value); }
            })
        ), el(RelatedPages, { id: data.id, meta: data.meta, update: update }));
    }
    wp.plugins.registerPlugin('bc-practice-page-settings', { render: PageSettings, icon: 'admin-page' });
})(window.wp);
