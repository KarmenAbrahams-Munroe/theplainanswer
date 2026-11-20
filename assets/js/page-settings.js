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
        return el(Panel, { name: 'bc-related-pages', title: 'Related pages', className: 'bc-page-sidebar-panel bc-page-related-panel' },
            el('p', {}, 'Choose pages to show as cards below page feedback. Cards use each page’s current title and Page introduction (excerpt).'),
            el(wp.components.ComboboxControl, {
                label: 'Add a related page', value: null, options: options, __next40pxDefaultSize: true, __nextHasNoMarginBottom: true,
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
        var options = window.bcPracticeNavigationOptions || {};
        var disabled = window.bcPracticeNavigationOptions && !options.ready;
        function panel(name, title, children) {
            return el(Panel, { name: name, title: title, className: 'bc-page-sidebar-panel' }, el('div', { className: 'bc-page-sidebar-fields' }, children));
        }
        function select(props) {
            return el(wp.components.SelectControl, Object.assign({ __next40pxDefaultSize: true, __nextHasNoMarginBottom: true }, props));
        }
        function compatibilityNotice() {
            return disabled && el(wp.components.Notice, { status: 'warning', isDismissible: false }, 'Update B.C. page workflow to 0.1.1 or later to save these options in shared drafts.');
        }
        return el(wp.element.Fragment, {},
            panel('bc-page-settings', 'Page title and introduction', el(wp.element.Fragment, {},
                select({
                    label: 'Page title style', value: titleStyle,
                    options: [{ label: 'Plain', value: 'plain' }, { label: 'Compact image', value: 'image-compact' }, { label: 'Taller image', value: 'image-tall' }, { label: 'Compact solid colour', value: 'solid-compact' }, { label: 'Taller solid colour', value: 'solid-tall' }],
                    help: titleStyle.indexOf('image-') === 0 ? 'Uses this page’s featured image.' : undefined,
                    onChange: function (value) { update('_bc_title_style', value); }
                }),
                el(wp.components.TextareaControl, {
                    label: 'Page introduction (excerpt)', value: data.excerpt, rows: 4, __nextHasNoMarginBottom: true,
                    help: 'Shown below the title and on navigation cards.',
                    onChange: function (value) { wp.data.dispatch('core/editor').editPost({ excerpt: value }); }
                })
            )),
            panel('bc-page-navigation', 'Page navigation', el(wp.element.Fragment, {},
                compatibilityNotice(),
                el(wp.components.ToggleControl, { label: 'Show On this page', __nextHasNoMarginBottom: true, checked: ['both','page'].indexOf(data.meta._bc_navigation_panels || 'both') !== -1, disabled: disabled, onChange: function (value) { var section = ['both','section'].indexOf(data.meta._bc_navigation_panels || 'both') !== -1; update('_bc_navigation_panels', value ? (section ? 'both' : 'page') : (section ? 'section' : 'none')); }, help: 'Links to this page’s H2 headings in content and guide layouts.' }),
                el(wp.components.ToggleControl, { label: 'Show In this section', __nextHasNoMarginBottom: true, checked: ['both','section'].indexOf(data.meta._bc_navigation_panels || 'both') !== -1, disabled: disabled, onChange: function (value) { var page = ['both','page'].indexOf(data.meta._bc_navigation_panels || 'both') !== -1; update('_bc_navigation_panels', value ? (page ? 'both' : 'section') : (page ? 'page' : 'none')); }, help: 'Links to other pages in this section.' }),
                el('p', { className: 'bc-page-sidebar-help' }, 'Turn off both menus for a full-width title.')
            )),
            panel('bc-page-cards', 'Navigation cards', el(wp.element.Fragment, {},
                compatibilityNotice(),
                select({ label: 'Navigation card style', value: data.meta._bc_navigation_cards || 'standard', options: Object.keys(options.styles || {}).map(function (key) { return {value:key,label:options.styles[key]}; }), disabled: disabled, onChange: function (value) { update('_bc_navigation_cards', value); }, help: 'For this page’s automatic child-page cards.' }),
                el(window.bcPracticeEditorTools.IconPicker, { label: 'Page icon', value: data.meta._bc_page_icon || 'document', options: options.icons || [], disabled: disabled, onChange: function (value) { update('_bc_page_icon', value); }, help: 'Used on icon cards, panels and rows linking to this page.' })
            )),
            panel('bc-page-menu-guide', 'Site menu and guides', el(wp.element.Fragment, {},
                select({
                    label: 'Mega-menu visibility', value: data.meta._bc_menu_visibility || 'branch',
                    options: [{ label: 'Show page and subpages', value: 'branch' }, { label: 'Show page only', value: 'page' }, { label: 'Hide page and subpages', value: 'hidden' }],
                    help: 'Subpages inherit this setting. Search, breadcrumbs and guide links keep the full hierarchy.',
                    onChange: function (value) { update('_bc_menu_visibility', value); }
                }),
                el(wp.components.ToggleControl, {
                    label: 'This page starts a guide', __nextHasNoMarginBottom: true, checked: !!data.meta._bc_guide_start,
                    help: 'Groups chapters in In this section. Previous/Next links follow Page order, then title.',
                    onChange: function (value) { update('_bc_guide_start', value); }
                })
            )),
            el(RelatedPages, { id: data.id, meta: data.meta, update: update })
        );
    }
    wp.plugins.registerPlugin('bc-practice-page-settings', { render: PageSettings, icon: 'admin-page' });
})(window.wp);
