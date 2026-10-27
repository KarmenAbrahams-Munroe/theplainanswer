(function (wp) {
    'use strict';
    var el = wp.element.createElement, be = wp.blockEditor, store = 'core/block-editor', tools = window.bcPracticeEditorTools;
    function has(a, name) { return (' ' + (a.className || '') + ' ').indexOf(' ' + name + ' ') !== -1; }
    function classes(a, remove, add) { return (a.className || '').split(/\s+/).filter(function (c) { return c && remove.indexOf(c) < 0; }).concat(add || []).join(' '); }
    function html(value) { return value == null ? '' : (typeof value.toHTMLString === 'function' ? value.toHTMLString() : String(value)); }
    function text(value) { return wp.htmlEntities.decodeEntities(html(value).replace(/<[^>]*>/g, '')).replace(/[\u00a0\u200b]/g, ' ').trim(); }
    function escaped(value) { return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function para(content, className) { return wp.blocks.createBlock('core/paragraph', { content: content || '', className: className }); }
    function heading(content, level) { return wp.blocks.createBlock('core/heading', { level: level || 3, content: content || '' }); }
    function group(className, inner) { return wp.blocks.createBlock('core/group', { className: className, layout: { type: 'default' } }, inner); }
    function session() { return wp.blocks.createBlock('bc-practice/event', {}, [heading('Session title', 4), para('Add the time and location.', 'bc-event-time'), para('Describe this session and add a link to its heading if needed.')]); }
    function day() { return wp.blocks.createBlock('bc-practice/event-day', { date: 'Add a date' }, [session()]); }

    function Featured(props) {
        var a = props.attributes, preview = tools.usePreview(), media = wp.data.useSelect(function (select) { return a.imageId ? select('core').getMedia(a.imageId) : null; }, [a.imageId]);
        var picture = media && media.source_url, visual = a.visual === 'photo' && picture ? 'photo' : (a.visual === 'photo' ? a.fallback : a.visual);
        var image = visual === 'photo' ? el('img', { src: picture, alt: a.imageAlt }) : visual === 'graphic' ? el('img', { src: window.bcPracticePatternAssets.graphic, alt: '' }) : null;
        var blockProps = be.useBlockProps({ className: 'bc-featured-update' });
        return el(wp.element.Fragment, {}, !preview && el(be.InspectorControls, {}, el(wp.components.PanelBody, { title: 'Featured update' },
            el(wp.components.TextControl, { label: 'Link destination', type: 'url', value: a.url, onChange: function (value) { props.setAttributes({ url: value }); }, help: 'The title becomes the link. Add a complete web address or a site-relative address.' }),
            el(wp.components.SelectControl, { label: 'Visual', value: a.visual, options: [{ label: 'Text only', value: 'none' }, { label: 'Photo', value: 'photo' }, { label: 'Solid colour', value: 'solid' }, { label: 'Theme graphic', value: 'graphic' }], onChange: function (value) { props.setAttributes({ visual: value }); } }),
            a.visual === 'photo' && el(wp.element.Fragment, {},
                el(be.MediaUploadCheck, {}, el(be.MediaUpload, { allowedTypes: ['image'], value: a.imageId, onSelect: function (value) { props.setAttributes({ imageId: value.id, imageAlt: value.alt || '' }); }, render: function (open) { return el(wp.components.Button, { variant: 'secondary', onClick: open.open }, a.imageId ? 'Replace image' : 'Choose image'); } })),
                a.imageId > 0 && el(wp.components.Button, { variant: 'tertiary', onClick: function () { props.setAttributes({ imageId: 0 }); } }, 'Remove image'),
                el(wp.components.TextControl, { label: 'Image alt text', value: a.imageAlt, onChange: function (value) { props.setAttributes({ imageAlt: value }); }, help: 'Describe information the image adds. Leave blank for a decorative image.' }),
                el(wp.components.SelectControl, { label: 'When the photo is unavailable', value: a.fallback, options: [{ label: 'Theme graphic', value: 'graphic' }, { label: 'Solid colour', value: 'solid' }], onChange: function (value) { props.setAttributes({ fallback: value }); } })
            ),
            el(wp.components.ToggleControl, { label: 'Show date', checked: a.showDate, onChange: function (value) { props.setAttributes({ showDate: value }); }, help: 'Enter a relevant date in the card. No author name is displayed.' })
        )), el('div', blockProps,
            visual !== 'none' && el('div', { className: 'bc-featured-visual bc-featured-visual-' + visual }, image),
            el('div', { className: 'bc-featured-copy' },
                preview ? el('h3', { className: 'bc-featured-title' }, a.url ? el('a', { href: a.url }, text(a.title)) : text(a.title)) : el(be.RichText, { tagName: 'h3', className: 'bc-featured-title', value: a.title, allowedFormats: [], role: 'textbox', 'aria-label': 'Update title', placeholder: 'Update title', onChange: function (value) { props.setAttributes({ title: value }); } }),
                a.showDate && (preview ? el('p', { className: 'bc-featured-date' }, text(a.date)) : el(be.RichText, { tagName: 'p', className: 'bc-featured-date', value: a.date, allowedFormats: [], role: 'textbox', 'aria-label': 'Update date', placeholder: 'Add a date', onChange: function (value) { props.setAttributes({ date: value }); } })),
                preview ? el(be.RichText.Content, { tagName: 'p', value: a.description }) : el(be.RichText, { tagName: 'p', value: a.description, role: 'textbox', 'aria-label': 'Update description', placeholder: 'Explain what people will find.', onChange: function (value) { props.setAttributes({ description: value }); } })
            )
        ));
    }
    wp.blocks.registerBlockType('bc-practice/featured-update', {
        apiVersion: 3, title: 'Featured update', category: 'bc-components', icon: 'megaphone', description: 'One linked update with text only, a photo, solid colour or theme graphic.',
        attributes: { title: { type: 'string', default: '' }, description: { type: 'string', default: '' }, url: { type: 'string', default: '' }, date: { type: 'string', default: '' }, showDate: { type: 'boolean', default: false }, visual: { type: 'string', enum: ['none', 'photo', 'solid', 'graphic'], default: 'none' }, fallback: { type: 'string', enum: ['solid', 'graphic'], default: 'graphic' }, imageId: { type: 'number', default: 0 }, imageAlt: { type: 'string', default: '' } },
        supports: { html: false, anchor: true }, edit: Featured, save: function () { return null; }
    });
    wp.blocks.registerBlockType('bc-practice/agenda', {
        apiVersion: 3, title: 'Event agenda', category: 'bc-components', icon: 'calendar', supports: { html: false, anchor: true },
        edit: function (props) {
            var preview = tools.usePreview(), inner = be.useInnerBlocksProps(be.useBlockProps({ className: 'bc-agenda' }), { allowedBlocks: ['bc-practice/event-day'], template: [['bc-practice/event-day', { date: 'Add a date' }, [['bc-practice/event', {}, [['core/heading', { level: 4, content: 'Session title' }], ['core/paragraph', { content: 'Add the time and location.', className: 'bc-event-time' }]]]]]], renderAppender: preview ? false : function () { return el(tools.Appender, { clientId: props.clientId, name: 'bc-practice/event-day', label: 'Add date group', create: day }); } });
            return el('div', inner);
        },
        save: function () { return el('div', be.useBlockProps.save({ className: 'bc-agenda' }), el(be.InnerBlocks.Content)); }
    });
    wp.blocks.registerBlockType('bc-practice/event-day', {
        apiVersion: 3, title: 'Event date', category: 'bc-components', icon: 'calendar', parent: ['bc-practice/agenda'], supports: { html: false, anchor: true }, attributes: { date: { type: 'string', source: 'html', selector: '.bc-event-date', default: '' } },
        edit: function (props) {
            var preview = tools.usePreview(), inner = be.useInnerBlocksProps({ className: 'bc-event-sessions' }, { allowedBlocks: ['bc-practice/event'], renderAppender: preview ? false : function () { return el(tools.Appender, { clientId: props.clientId, name: 'bc-practice/event', label: 'Add session', create: session }); } });
            return el('section', be.useBlockProps({ className: 'bc-event-day' }),
                preview ? el(be.RichText.Content, { tagName: 'h3', className: 'bc-event-date', value: props.attributes.date }) : el(be.RichText, { tagName: 'h3', className: 'bc-event-date', value: props.attributes.date, allowedFormats: [], role: 'textbox', 'aria-label': 'Event date', placeholder: 'Add a date', onChange: function (value) { props.setAttributes({ date: value }); } }),
                el('div', inner), !preview && el(tools.ItemActions, { clientId: props.clientId, name: 'bc-practice/event-day', label: 'Date group controls', onlyWhenSelected: true, showLabel: true })
            );
        },
        save: function (props) { return el('section', be.useBlockProps.save({ className: 'bc-event-day' }), el(be.RichText.Content, { tagName: 'h3', className: 'bc-event-date', value: props.attributes.date }), el('div', { className: 'bc-event-sessions' }, el(be.InnerBlocks.Content))); }
    });
    wp.blocks.registerBlockType('bc-practice/event', {
        apiVersion: 3, title: 'Event session', category: 'bc-components', icon: 'clock', parent: ['bc-practice/event-day'], supports: { html: false, anchor: true },
        edit: function (props) {
            var preview = tools.usePreview(), inner = be.useInnerBlocksProps(be.useBlockProps({ className: 'bc-event-session' }), { template: [['core/heading', { level: 4, placeholder: 'Session title' }], ['core/paragraph', { placeholder: 'Add the time and location.', className: 'bc-event-time' }], ['core/paragraph', { placeholder: 'Describe this session.' }]], allowedBlocks: ['core/heading', 'core/paragraph', 'core/image', 'core/list', 'core/buttons'], renderAppender: preview ? false : be.InnerBlocks.ButtonBlockAppender });
            return el('div', inner, inner.children, !preview && el(tools.ItemActions, { clientId: props.clientId, name: 'bc-practice/event', label: 'Session controls', showLabel: true }));
        },
        save: function () { return el('div', be.useBlockProps.save({ className: 'bc-event-session' }), el(be.InnerBlocks.Content)); }
    });

    function GroupOptions(props) {
        var target = wp.data.useSelect(function (select) {
            if (!props.isSelected || !has(props.attributes, 'bc-pattern')) return null;
            var found = null;
            function walk(blocks) { for (var i = 0; i < blocks.length && !found; i++) { var b = blocks[i]; if (b.name === 'core/group' && ['bc-quick-links-list','bc-media-feature','bc-icon-list','bc-three-column-grid','bc-navigation-manual','bc-comparison-cards'].some(function (name) { return has(b.attributes,name); })) found = {id:b.clientId,attributes:b.attributes}; else walk(b.innerBlocks); } }
            walk(select(store).getBlocks(props.clientId)); return found;
        }, [props.clientId,props.isSelected,props.attributes.className]);
        var a = target ? target.attributes : props.attributes, options = [];
        function change(patch) { if (target) wp.data.dispatch(store).updateBlockAttributes(target.id,patch); else props.setAttributes(patch); }
        if (has(a, 'bc-comparison-cards')) {
            options.push(el(wp.components.ToggleControl, { key: 'comparison-icons', label: 'Show icons', checked: has(a, 'bc-comparison-icons'), onChange: async function (value) {
                change({ className: classes(a, ['bc-comparison-icons'], value ? ['bc-comparison-icons'] : []) });
                if (!value) return;
                var editor = wp.data.select(store), id = target ? target.id : props.clientId;
                var headers = editor.getBlocks(id).map(function (card) { return card.innerBlocks.find(function (b) { return b.name === 'core/group' && has(b.attributes, 'bc-comparison-header'); }); }).filter(Boolean);
                for (var i = 0; i < headers.length; i++) {
                    var header = headers[i];
                    if (!header.innerBlocks.some(function (b) { return b.name === 'bc-practice/icon'; }) && editor.canInsertBlockType('bc-practice/icon', header.clientId)) {
                        await wp.data.dispatch(store).insertBlocks([wp.blocks.createBlock('bc-practice/icon', {icon:'info'})], 0, header.clientId, false);
                    }
                }
            }, help: 'Choose an icon to change it. Turning icons off keeps them for later. Keep headings clear so the meaning is also available in text.' }));
        }
        if (has(a, 'bc-quick-links-list')) {
            options.push(el(wp.components.SelectControl, { key: 'link-columns', label: 'Link columns', value: has(a, 'bc-quick-links-two-column') ? '2' : '1', options: [{ label: 'One column', value: '1' }, { label: 'Two columns', value: '2' }], onChange: function (value) { change({ className: classes(a, ['bc-quick-links-two-column'], value === '2' ? ['bc-quick-links-two-column'] : []) }); }, help: 'Links return to one column in narrow spaces. Read across each row, then down.' }));
        }
        if (has(a, 'bc-navigation-manual')) {
            options.push(el(wp.components.SelectControl, {key:'navigation-columns',label:'Navigation columns',value:has(a,'bc-navigation-columns-3')?'3':has(a,'bc-navigation-columns-auto')?'auto':'2',options:[{label:'Two columns',value:'2'},{label:'Three columns',value:'3'},{label:'Fit available space',value:'auto'}],onChange:function(value){change({className:classes(a,['bc-navigation-columns-3','bc-navigation-columns-auto'],value==='2'?[]:['bc-navigation-columns-'+value])});},help:'Cards stack in narrow spaces.'}));
        }
        if (has(a, 'bc-icon-list')) {
            options.push(el(wp.components.SelectControl, { key: 'icons', label: 'Icon summary layout', value: has(a, 'bc-icon-columns') ? 'columns' : 'list', options: [{ label: 'List', value: 'list' }, { label: 'Two columns', value: 'columns' }], onChange: function (value) { change({ className: classes(a, ['bc-icon-columns'], value === 'columns' ? ['bc-icon-columns'] : []) }); } }));
        }
        if (has(a, 'bc-three-column-grid')) {
            options.push(el(wp.components.SelectControl, { key: 'columns', label: 'Columns', value: has(a, 'bc-text-columns-2') ? '2' : has(a, 'bc-text-columns-3') ? '3' : 'auto', options: [{ label: 'Fit available space', value: 'auto' }, { label: 'Two columns', value: '2' }, { label: 'Three columns', value: '3' }], onChange: function (value) { change({ className: classes(a, ['bc-text-columns-2', 'bc-text-columns-3'], value === 'auto' ? [] : ['bc-text-columns-' + value]) }); }, help: 'Columns stack in narrow spaces.' }));
            options.push(el(wp.components.ToggleControl, { key: 'rules', label: 'Show separators above items', checked: has(a, 'bc-text-ruled'), onChange: function (value) { change({ className: classes(a, ['bc-text-ruled'], value ? ['bc-text-ruled'] : []) }); } }));
        }
        if (has(a, 'bc-media-feature')) {
            options.push(el(wp.components.SelectControl, { key: 'images', label: 'Images', value: has(a, 'bc-media-overlap') ? 'overlap' : 'single', options: [{ label: 'Overlapping images', value: 'overlap' }, { label: 'One image', value: 'single' }], onChange: function (value) { change({ className: classes(a, ['bc-media-overlap', 'bc-media-single'], [value === 'overlap' ? 'bc-media-overlap' : 'bc-media-single']) }); }, help: 'One image shows the first image. The second is retained for switching back to overlapping images.' }));
        }
        return props.isSelected && options.length ? el(be.InspectorControls, {}, el(wp.components.PanelBody, { title: 'Pattern layout' }, options)) : null;
    }
    function normalizeTable(a) {
        var rowHeaders = has(a, 'bc-data-table-row-headers'), result = {};
        ['head', 'body', 'foot'].forEach(function (section) {
            result[section] = (a[section] || []).map(function (row) { return Object.assign({}, row, { cells: row.cells.map(function (cell, i) {
                var header = section === 'head' || (section === 'body' && rowHeaders && i === 0);
                return Object.assign({}, cell, { tag: header ? 'th' : 'td', scope: header ? (section === 'head' ? 'col' : 'row') : undefined });
            }) }); });
        });
        return result;
    }
    function tableIssues(a) {
        var errors = [], width = a.head && a.head[0] ? a.head[0].cells.length : 0;
        if (!text(a.caption)) errors.push('Enter a table title.');
        if (!a.head || a.head.length !== 1 || !width) errors.push('Add one column-heading row.');
        else if (a.head[0].cells.some(function (cell) { return !text(cell.content); })) errors.push('Give each column a heading.');
        ['head', 'body', 'foot'].forEach(function (section) { (a[section] || []).forEach(function (row) {
            if (width && row.cells.length !== width) errors.push('Give every row the same number of cells as the heading row.');
            if (row.cells.some(function (c) { return Number(c.colspan || 1) !== 1 || Number(c.rowspan || 1) !== 1; })) errors.push('Use a simple table without merged cells.');
        }); });
        if (has(a, 'bc-data-table-row-headers') && (a.body || []).some(function (row) { return !row.cells[0] || !text(row.cells[0].content); })) errors.push('Give each row a row heading.');
        return errors.filter(function (value, i, all) { return all.indexOf(value) === i; });
    }
    function TableEdit(props) {
        var a = props.attributes, managed = has(a, 'bc-data-table') || !!(a.metadata && a.metadata.bcDataTable), warning = wp.element.useState(''), message = warning[0], setMessage = warning[1];
        function prepare(patch, base) {
            if (!patch || !managed) return patch || {};
            patch = Object.assign({}, patch);
            if (patch.head && !patch.head.length && (base.head || []).length) { setMessage('The heading row is required for this Data table. Edit the headings instead of turning them off.'); return {}; }
            var next = Object.assign({}, base, patch);
            if (!has(next, 'bc-data-table')) { patch.className = next.className = classes(next, [], ['bc-data-table']); }
            if (!next.metadata || !next.metadata.bcDataTable) { patch.metadata = Object.assign({}, next.metadata || {}, { bcDataTable: true }); }
            var normalized = normalizeTable(next);
            // Preserve granular native cell edits; normalize only sections explicitly replaced.
            ['head', 'body', 'foot'].forEach(function (section) { if (!Object.prototype.hasOwnProperty.call(patch, section)) delete normalized[section]; });
            return Object.assign({}, patch, normalized);
        }
        function change(patch) {
            // Resolve native updater functions against the latest attributes before adding safeguards.
            var current = wp.data.select(store).getBlockAttributes(props.clientId) || a;
            props.setAttributes(prepare(typeof patch === 'function' ? patch(current) : patch, current));
        }
        var errors = managed ? tableIssues(a) : [], panel = el(be.InspectorControls, {}, el(wp.components.PanelBody, { title: 'Table headings', initialOpen: true },
            managed ? el(wp.element.Fragment, {},
                el(wp.components.TextControl, { label: 'Table title (required)', value: wp.htmlEntities.decodeEntities(html(a.caption).replace(/<[^>]*>/g, '')), onChange: function (value) { props.setAttributes({ caption: escaped(value) }); }, help: 'Describe the table. It will be displayed as its caption.' }),
                el(wp.components.ToggleControl, { label: 'First column contains row headings', checked: has(a, 'bc-data-table-row-headers'), onChange: function (value) { var next = Object.assign({}, a, { className: classes(a, ['bc-data-table-row-headers'], value ? ['bc-data-table-row-headers'] : []) }); props.setAttributes(Object.assign({ className: next.className }, normalizeTable(next))); } }),
                (!a.head || !a.head.length) && el(wp.components.Button, { variant: 'secondary', onClick: function () { var width = a.body && a.body[0] ? a.body[0].cells.length : 2; change({ head: [{ cells: Array.from({ length: width }, function () { return { content: '', tag: 'th', scope: 'col' }; }) }] }); } }, 'Add heading row'),
                el('p', {}, 'Column headings stay enabled. Use the table toolbar to add or remove rows and columns. Drafts can be saved while you work.'),
                errors.length > 0 && el(wp.components.Notice, { status: 'warning', isDismissible: false }, 'Before publishing: ' + errors.join(' ')),
                message && el(wp.components.Notice, { status: 'info', isDismissible: true, onRemove: function () { setMessage(''); } }, message)
            ) : el(wp.element.Fragment, {}, el('p', {}, 'This table uses the standard WordPress editor. Check its headings and caption before publishing.'), el(wp.components.Button, { variant: 'secondary', onClick: function () { var next = Object.assign({}, a, { className: classes(a, [], ['bc-data-table']) }); var rows = normalizeTable(next); if (!rows.head.length) { var width = rows.body[0] ? rows.body[0].cells.length : 2; rows.head = [{ cells: Array.from({ length: width }, function () { return { content: '', tag: 'th', scope: 'col' }; }) }]; } props.setAttributes(Object.assign({ className: next.className, metadata: Object.assign({}, a.metadata || {}, { name: 'Data table', bcDataTable: true }) }, rows)); } }, 'Use Data table checks'), el('p', {}, 'Adds a heading row if needed and keeps all existing data. A title and headings are required before publication.'))
        ));
        return el(wp.element.Fragment, {}, el(props.original, Object.assign({}, props, { setAttributes: change })), props.isSelected && panel);
    }
    wp.hooks.addFilter('editor.BlockEdit', 'bc-practice/pattern-families', function (BlockEdit) {
        return function (props) {
            if (tools.usePreview()) return el(BlockEdit, props);
            if (props.name === 'core/table') return el(TableEdit, Object.assign({}, props, { original: BlockEdit }));
            return el(wp.element.Fragment, {}, el(BlockEdit, props), props.name === 'core/group' && el(GroupOptions, props));
        };
    });
    wp.domReady(function () {
        wp.blocks.registerBlockVariation('core/table', { name: 'bc-data-table', title: 'Data table', description: 'A simple data table with required headings, a title and publication checks.', attributes: { metadata: { name: 'Data table', bcDataTable: true }, className: 'bc-reference-table bc-data-table', hasFixedLayout: false, caption: '', head: [{ cells: [{ content: '', tag: 'th', scope: 'col' }, { content: '', tag: 'th', scope: 'col' }] }], body: [{ cells: [{ content: '', tag: 'td' }, { content: '', tag: 'td' }] }] }, isActive: function (a) { return has(a, 'bc-data-table'); }, scope: ['inserter'] });
    });
})(window.wp);
