(function (wp) {
    'use strict';
    var el = wp.element.createElement, __ = wp.i18n.__;
    var store = 'core/block-editor';
    function usePreview() {
        return wp.data.useSelect(function (select) {
            var settings = select(store).getSettings();
            return settings.isPreviewMode !== undefined ? settings.isPreviewMode : settings.__unstableIsPreviewMode;
        }, []);
    }
    function hasClass(block, name) { return (' ' + ((block.attributes || {}).className || '') + ' ').indexOf(' ' + name + ' ') !== -1; }
    function group(name, children) { return wp.blocks.createBlock('core/group', { className: name, layout: { type: 'default' } }, children); }
    function heading() { return wp.blocks.createBlock('core/heading', { level: 3, placeholder: __('Heading', 'bc-practice') }); }
    function paragraph() { return wp.blocks.createBlock('core/paragraph', { placeholder: __('Add your content…', 'bc-practice') }); }
    function icon() { return wp.blocks.createBlock('bc-practice/icon', { icon: 'info' }); }
    function panel() { return wp.blocks.createBlock('core/details', { className: 'bc-accordion-item', summary: '' }, [paragraph()]); }
    function step(presentation, markers) { return wp.blocks.createBlock('bc-practice/step', {}, (presentation === 'roadmap' || markers === 'icons' ? [icon()] : []).concat([heading(), paragraph()])); }
    function resource() { return wp.blocks.createBlock('bc-practice/resource-panel', { title: '' }, [paragraph()]); }
    function copy(block) {
        return wp.blocks.cloneBlock(block, { anchor: undefined }, block.innerBlocks.map(copy));
    }
    function focusNew(block) {
        var target = block;
        function find(b) {
            if (b.name === 'core/heading' || b.name === 'core/paragraph' || b.name === 'core/details' || b.name === 'bc-practice/resource-panel') { return b; }
            for (var i = 0; i < b.innerBlocks.length; i++) { var found = find(b.innerBlocks[i]); if (found) { return found; } }
            return null;
        }
        target = find(block) || target;
        wp.data.dispatch(store).selectBlock(target.clientId, 0);
    }
    function Appender(props) {
        var allowed = wp.data.useSelect(function (select) { return select(store).canInsertBlockType(props.name, props.clientId); }, [props.name, props.clientId]);
        return el('div', { className: 'bc-editor-add', onClick: function (event) { event.stopPropagation(); } },
            el(wp.components.Button, {
                variant: 'secondary', disabled: !allowed,
                onMouseDown: function (event) { event.preventDefault(); },
                onClick: async function () {
                    var editor = wp.data.select(store), block = props.create();
                    if (!editor.canInsertBlockType(block.name, props.clientId)) { return; }
                    await wp.data.dispatch(store).insertBlocks([block], editor.getBlockOrder(props.clientId).length, props.clientId, false);
                    if (wp.data.select(store).getBlock(block.clientId)) { focusNew(block); }
                }
            }, props.label)
        );
    }
    function ItemActions(props) {
        var confirmation = wp.element.useState(false), confirming = confirmation[0], setConfirming = confirmation[1];
        var data = wp.data.useSelect(function (select) {
            var editor = select(store), root = editor.getBlockRootClientId(props.clientId);
            return { root: root, order: editor.getBlockOrder(root), siblings: editor.getBlocks(root).filter(function (block) { return block.name === props.name; }).map(function (block) { return block.clientId; }), selected: editor.isBlockSelected(props.clientId) || (!props.onlyWhenSelected && editor.hasSelectedInnerBlock(props.clientId, true)), move: editor.canMoveBlocks([props.clientId], root), remove: editor.canRemoveBlocks([props.clientId]), insert: editor.canInsertBlockType(props.name, root) };
        }, [props.clientId, props.name]);
        if (!data.selected) { return null; }
        var index = data.order.indexOf(props.clientId), siblingIndex = data.siblings.indexOf(props.clientId), dispatch = wp.data.dispatch(store);
        function move(offset) { var target = data.siblings[siblingIndex + offset]; if (!target) { return; } dispatch.moveBlocksToPosition([props.clientId], data.root, data.root, data.order.indexOf(target)); dispatch.selectBlock(props.clientId); }
        return el('div', { className: 'bc-editor-item-actions', role: 'group', 'aria-label': props.label, onClick: function (event) { event.stopPropagation(); } },
            props.showLabel && el('span', { className: 'bc-editor-action-label' }, props.label),
            el(wp.components.Button, { variant: 'tertiary', disabled: !data.move || siblingIndex <= 0, onClick: function () { move(-1); } }, __('Move up', 'bc-practice')),
            el(wp.components.Button, { variant: 'tertiary', disabled: !data.move || siblingIndex === data.siblings.length - 1, onClick: function () { move(1); } }, __('Move down', 'bc-practice')),
            el(wp.components.Button, { variant: 'tertiary', disabled: !data.insert, onClick: async function () { var block = copy(wp.data.select(store).getBlock(props.clientId)); await dispatch.insertBlocks([block], index + 1, data.root, false); if (wp.data.select(store).getBlock(block.clientId)) { focusNew(block); } } }, __('Duplicate', 'bc-practice')),
            el(wp.components.Button, { variant: 'tertiary', isDestructive: true, disabled: !data.remove, onClick: function () { setConfirming(true); } }, __('Remove…', 'bc-practice')),
            confirming && el(wp.components.Modal, {
                title: __('Remove this item?', 'bc-practice'), focusOnMount: 'firstContentElement',
                onRequestClose: function () { setConfirming(false); }, shouldCloseOnClickOutside: false
            },
                el('p', {}, __('This removes the selected item and all content inside it. You can restore it with Undo.', 'bc-practice')),
                el('div', { className: 'bc-editor-confirm-actions' },
                    el(wp.components.Button, { variant: 'secondary', onClick: function () { setConfirming(false); } }, __('Keep item', 'bc-practice')),
                    el(wp.components.Button, { variant: 'primary', isDestructive: true, onClick: async function () {
                        if (!wp.data.select(store).canRemoveBlocks([props.clientId])) { setConfirming(false); return; }
                        var next = data.order[index + 1] || data.order[index - 1] || data.root;
                        await dispatch.removeBlocks([props.clientId], false);
                        if (next) { dispatch.selectBlock(next); }
                        wp.data.dispatch('core/notices').createNotice('success', __('Item removed. Use Undo to restore it.', 'bc-practice'), { type: 'snackbar' });
                    } }, __('Remove item', 'bc-practice'))
                )
            )
        );
    }
    function itemFactory(kind, clientId) {
        if (kind === 'accordion') { return panel; }
        if (kind === 'tiles') { return function () { return group('bc-quick-tile', [icon(), paragraph()]); }; }
        if (kind === 'links') { return function () { return group('bc-quick-link-row', [icon(), paragraph()]); }; }
        if (kind === 'icons') { return function () { return group('bc-icon-text', [icon(), group('bc-icon-text-body', [heading(), paragraph()])]); }; }
        if (kind === 'images') { return function () { return group('bc-image-card', [wp.blocks.createBlock('core/image'), group('bc-image-card-body', [heading(), paragraph()])]); }; }
        if (kind === 'related') { return function () { return wp.blocks.createBlock('core/column', {}, [group('bc-component-card', [heading(), paragraph()])]); }; }
        if (kind === 'linkRows') { return function () { return group('bc-link-row', [icon(), group('bc-link-row-body', [heading(), paragraph()])]); }; }
        if (kind === 'features') { return function () { return group('bc-feature-item', [icon(), group('bc-feature-body', [heading(), paragraph(), wp.blocks.createBlock('core/list', { className: 'bc-checklist' }, [wp.blocks.createBlock('core/list-item', { content: '' })])])]); }; }
        return function () {
            var existing = wp.data.select(store).getBlocks(clientId), lists = existing.some(function (b) { return b.innerBlocks.some(function (c) { return c.name === 'core/list'; }); });
            return group('bc-text-column', [heading(), lists ? wp.blocks.createBlock('core/list', {}, [wp.blocks.createBlock('core/list-item', { content: '' })]) : paragraph()]);
        };
    }
    function collection(block, parent) {
        var classes = { 'bc-accordion-group': ['accordion', 'Add accordion panel'], 'bc-quick-tiles': ['tiles', 'Add quick action'], 'bc-quick-links-list': ['links', 'Add quick link'], 'bc-icon-list': ['icons', 'Add icon and text'], 'bc-image-card-grid': ['images', 'Add image card'], 'bc-three-column-grid': ['columns', 'Add text column'], 'bc-link-rows': ['linkRows', 'Add link row'], 'bc-feature-list': ['features', 'Add feature'] };
        if (block.name === 'core/group') { for (var name in classes) { if (hasClass(block, name)) { return classes[name]; } } }
        if (block.name === 'core/columns' && parent && hasClass(parent, 'bc-component-related')) { return ['related', 'Add card']; }
        return null;
    }
    function PatternControls(props) {
        var data = wp.data.useSelect(function (select) {
            var editor = select(store), block = editor.getBlock(props.clientId), root = editor.getBlockRootClientId(props.clientId), parent = editor.getBlock(root);
            return { block: block, parent: parent, grandparent: parent && editor.getBlock(editor.getBlockRootClientId(parent.clientId)) };
        }, [props.clientId]);
        if (!data.block) { return null; }
        var config = collection(data.block, data.parent), parentConfig = data.parent && collection(data.parent, data.grandparent);
        return el(wp.element.Fragment, {},
            config && el(Appender, { clientId: props.clientId, name: config[0] === 'accordion' ? 'core/details' : config[0] === 'related' ? 'core/column' : 'core/group', label: __(config[1], 'bc-practice'), create: itemFactory(config[0], props.clientId) }),
            parentConfig && el(wp.blockEditor.BlockControls, {}, el(wp.components.ToolbarGroup, {},
                el(wp.components.Dropdown, {
                    renderToggle: function (toggle) { return el(wp.components.ToolbarButton, { onClick: toggle.onToggle, 'aria-expanded': toggle.isOpen, label: __('Item actions', 'bc-practice') }, __('Item actions', 'bc-practice')); },
                    renderContent: function () { return el('div', { className: 'bc-editor-item-menu' }, el(ItemActions, { clientId: props.clientId, name: props.name, label: __('Item controls', 'bc-practice') })); }
                })
            ))
        );
    }
    function AccordionEdit(props) {
        var state = wp.data.useSelect(function (select) {
            var editor = select(store);
            return { owned: hasClass(props, 'bc-accordion-item') || editor.getBlockParents(props.clientId).some(function (id) { var b = editor.getBlock(id); return b && hasClass(b, 'bc-accordion-group'); }), disabled: editor.getBlockEditingMode(props.clientId) === 'disabled' };
        }, [props.clientId, props.attributes.className]);
        if (!state.owned || state.disabled) { return el(props.original, props); }
        return el(PanelEdit, props);
    }
    function PanelEdit(props) {
        var blockProps = wp.blockEditor.useBlockProps({ className: 'bc-editor-accordion-panel' });
        async function editContent() {
            var editor = wp.data.select(store), children = editor.getBlocks(props.clientId), first = children[0];
            if (!first && editor.canInsertBlockType('core/paragraph', props.clientId)) {
                first = paragraph();
                await wp.data.dispatch(store).insertBlocks([first], 0, props.clientId, false);
            }
            if (first && wp.data.select(store).getBlock(first.clientId)) { focusNew(first); }
        }
        return el(wp.element.Fragment, {},
            el(wp.blockEditor.BlockControls, {}, el(wp.components.ToolbarGroup, {},
                el(wp.components.ToolbarButton, { onClick: editContent, label: __('Edit panel content', 'bc-practice') }, __('Edit panel content', 'bc-practice'))
            )),
            el(wp.blockEditor.InspectorControls, {}, el(wp.components.PanelBody, { title: __('Accordion panel', 'bc-practice') },
                el(wp.components.ToggleControl, { label: __('Open when the page loads', 'bc-practice'), checked: !!props.attributes.showContent, onChange: function (value) { props.setAttributes({ showContent: value }); }, help: __('Panels stay open in the editor so you can edit their content.', 'bc-practice') }),
                wp.blocks.getBlockType('core/details').attributes.name && el(wp.components.TextControl, { label: __('Exclusive group name (optional)', 'bc-practice'), value: props.attributes.name || '', onChange: function (value) { props.setAttributes({ name: value || undefined }); }, help: __('Panels with the same name allow only one open at a time. Leave blank to use Expand all.', 'bc-practice') })
            )),
            el('div', blockProps,
                el('span', { className: 'bc-editor-field-label' }, __('Panel heading', 'bc-practice')),
                el(wp.blockEditor.RichText, { tagName: 'div', className: 'bc-editor-accordion-heading', identifier: 'summary', 'aria-label': __('Panel heading', 'bc-practice'), value: props.attributes.summary, placeholder: __('Enter a panel heading…', 'bc-practice'), onChange: function (summary) { props.setAttributes({ summary: summary }); } }),
                el('div', { className: 'bc-editor-accordion-content', role: 'group', 'aria-label': __('Panel content', 'bc-practice') },
                    el(wp.blockEditor.InnerBlocks, { renderAppender: wp.blockEditor.InnerBlocks.ButtonBlockAppender })
                ),
                el(ItemActions, { clientId: props.clientId, name: 'core/details', label: __('Panel controls', 'bc-practice') })
            )
        );
    }
    function AccordionControlsEdit() {
        return el('div', wp.blockEditor.useBlockProps({ className: 'bc-editor-generated' }), __('Expand all and Collapse all appear on the published page. Panels stay open while editing.', 'bc-practice'));
    }
    wp.hooks.addFilter('editor.BlockEdit', 'bc-practice/editor-tools', function (BlockEdit) {
        return function (props) {
            var preview = usePreview();
            if (preview) { return el(BlockEdit, props); }
            if (props.name === 'core/details') { return el(AccordionEdit, Object.assign({}, props, { original: BlockEdit })); }
            if (props.name === 'core/group' || props.name === 'core/columns' || props.name === 'core/column') {
                return el(wp.element.Fragment, {}, el(BlockEdit, props), el(PatternControls, props));
            }
            if (props.name === 'bc-practice/accordion-controls') {
                return el(AccordionControlsEdit);
            }
            return el(BlockEdit, props);
        };
    });
    window.bcPracticeEditorTools = { Appender: Appender, ItemActions: ItemActions, step: step, resource: resource, usePreview: usePreview };
})(window.wp);
