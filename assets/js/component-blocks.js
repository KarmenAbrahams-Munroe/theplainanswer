(function (wp) {
    'use strict';
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var useInnerBlocksProps = wp.blockEditor.useInnerBlocksProps;
    var tools = window.bcPracticeEditorTools;
    function editable(edit) {
        return function (props) {
            var preview = tools.usePreview();
            var blocks = wp.data.useSelect(function (select) { return select('core/block-editor').getBlocks(props.clientId); }, [props.clientId]);
            return preview ? wp.blocks.getSaveElement(props.name, props.attributes, blocks) : el(edit, props);
        };
    }

    wp.blocks.registerBlockType('bc-practice/steps', {
        apiVersion: 3,
        title: __('PSW Steps', 'bc-practice'),
        description: __('An ordered process with editable headings, paragraphs and lists.', 'bc-practice'),
        category: 'bc-components',
        icon: 'editor-ol',
        attributes: { presentation: { type: 'string', enum: ['simple', 'connected', 'cards', 'roadmap'], default: 'connected' }, markers: { type: 'string', enum: ['', 'numbers', 'icons'], default: '' } },
        supports: { html: false },
        edit: editable(function (props) {
            var presentation = props.attributes.presentation;
            var markers = props.attributes.markers || 'numbers';
            var blockProps = useBlockProps({ className: 'bc-steps bc-steps-' + presentation + (props.attributes.markers ? ' bc-steps-' + markers : ''), role: 'list' });
            var innerProps = useInnerBlocksProps(blockProps, {
                allowedBlocks: ['bc-practice/step'],
                template: [['bc-practice/step'], ['bc-practice/step'], ['bc-practice/step']],
                orientation: presentation === 'roadmap' ? 'horizontal' : 'vertical',
                renderAppender: function () { return el(tools.Appender, { clientId: props.clientId, name: 'bc-practice/step', label: __('Add step', 'bc-practice'), create: function () { return tools.step(presentation, markers); } }); }
            });
            return el(wp.element.Fragment, {},
                el(wp.blockEditor.InspectorControls, {},
                    el(wp.components.PanelBody, { title: __('Steps', 'bc-practice') },
                        el(wp.components.SelectControl, {
                            label: __('Layout', 'bc-practice'), value: presentation,
                            options: [
                                { label: __('Simple steps', 'bc-practice'), value: 'simple' },
                                { label: __('Connected steps', 'bc-practice'), value: 'connected' },
                                { label: __('Boxed steps', 'bc-practice'), value: 'cards' },
                                { label: __('Horizontal steps', 'bc-practice'), value: 'roadmap' }
                            ],
                            onChange: function (value) { props.setAttributes({ presentation: value }); }
                        }),
                        el(wp.components.SelectControl, {
                            label: __('Markers', 'bc-practice'), value: markers,
                            options: [{ label: __('Numbers', 'bc-practice'), value: 'numbers' }, { label: __('Icons', 'bc-practice'), value: 'icons' }],
                            onChange: function (value) {
                                if (value === 'icons') {
                                    wp.data.select('core/block-editor').getBlocks(props.clientId).forEach(function (block) {
                                        if (!block.innerBlocks.some(function (child) { return child.name === 'bc-practice/icon'; }) && wp.data.select('core/block-editor').canInsertBlockType('bc-practice/icon', block.clientId)) {
                                            wp.data.dispatch('core/block-editor').insertBlocks([wp.blocks.createBlock('bc-practice/icon', { icon: 'clipboard' })], 0, block.clientId, false);
                                        }
                                    });
                                }
                                props.setAttributes({ markers: value });
                            },
                            help: __('The content and order stay the same when you change markers. Select each icon to change it.', 'bc-practice')
                        })
                    )
                ),
                el('ol', innerProps)
            );
        }),
        save: function (props) {
            return el('ol', useBlockProps.save({ className: 'bc-steps bc-steps-' + props.attributes.presentation + (props.attributes.markers ? ' bc-steps-' + props.attributes.markers : ''), role: 'list' }), el(wp.blockEditor.InnerBlocks.Content));
        }
    });

    wp.blocks.registerBlockType('bc-practice/step', {
        apiVersion: 3,
        title: __('PSW Step', 'bc-practice'),
        category: 'bc-components',
        icon: 'editor-ol',
        parent: ['bc-practice/steps'],
        supports: { html: false, reusable: false },
        edit: editable(function (attributes) {
            var props = useInnerBlocksProps(useBlockProps({ className: 'bc-step' }), {
                template: [
                    ['core/heading', { level: 3, placeholder: __('Step heading', 'bc-practice') }],
                    ['core/paragraph', { placeholder: __('Explain what to do and why.', 'bc-practice') }]
                ],
                renderAppender: wp.blockEditor.InnerBlocks.ButtonBlockAppender
            });
            return el('li', props, props.children, el(tools.ItemActions, { clientId: attributes.clientId, name: 'bc-practice/step', label: __('Step controls', 'bc-practice') }));
        }),
        save: function () {
            return el('li', useBlockProps.save({ className: 'bc-step' }), el(wp.blockEditor.InnerBlocks.Content));
        }
    });

    wp.blocks.registerBlockType('bc-practice/resource-tabs', {
        apiVersion: 3,
        title: __('PSW Resource tabs', 'bc-practice'),
        description: __('Groups of related resources, with tabs on the published page.', 'bc-practice'),
        category: 'bc-components', icon: 'index-card',
        attributes: { label: { type: 'string', default: 'Resource categories' } },
        supports: { html: false, anchor: true },
        edit: editable(function (props) {
            var inner = useInnerBlocksProps(useBlockProps({ className: 'bc-resource-tabs' }), {
                allowedBlocks: ['bc-practice/resource-panel'],
                template: [['bc-practice/resource-panel', { title: 'Getting started' }], ['bc-practice/resource-panel', { title: 'Guidance and tools' }]],
                renderAppender: function () { return el(tools.Appender, { clientId: props.clientId, name: 'bc-practice/resource-panel', label: __('Add resource group', 'bc-practice'), create: tools.resource }); }
            });
            return el(wp.element.Fragment, {},
                el(wp.blockEditor.InspectorControls, {},
                    el(wp.components.PanelBody, { title: __('Resource tabs', 'bc-practice') },
                        el(wp.components.TextControl, {
                            label: __('Tab group label', 'bc-practice'), value: props.attributes.label,
                            onChange: function (value) { props.setAttributes({ label: value }); },
                            help: __('Describe this set of resource categories.', 'bc-practice')
                        }),
                        el('p', {}, __('Edit each group heading to name its tab. All groups stay visible here; preview the page to try the tabs. Use the controls beneath a selected group to move, duplicate or remove it.', 'bc-practice'))
                    )
                ),
                el('div', inner)
            );
        }),
        save: function (props) {
            return el('div', useBlockProps.save({ className: 'bc-resource-tabs', 'data-tab-label': props.attributes.label }), el(wp.blockEditor.InnerBlocks.Content));
        }
    });

    wp.blocks.registerBlockType('bc-practice/resource-panel', {
        apiVersion: 3, title: __('PSW Resource group', 'bc-practice'), category: 'bc-components', icon: 'screenoptions',
        parent: ['bc-practice/resource-tabs'],
        attributes: { title: { type: 'string', source: 'html', selector: '.bc-tab-panel-title', default: 'Resource group' } },
        supports: { html: false, anchor: true, reusable: false },
        edit: editable(function (props) {
            return el('section', useBlockProps({ className: 'bc-tab-panel' }),
                el(wp.blockEditor.RichText, {
                    tagName: 'h3', className: 'bc-tab-panel-title', value: props.attributes.title,
                    identifier: 'title', 'aria-label': __('Resource group name', 'bc-practice'),
                    allowedFormats: [], placeholder: __('Resource group name', 'bc-practice'),
                    onChange: function (title) { props.setAttributes({ title: title }); }
                }),
                el('div', { className: 'bc-tab-panel-content' }, el(wp.blockEditor.InnerBlocks, {
                    template: [['core/paragraph', { placeholder: __('Add resources for this group.', 'bc-practice') }]],
                    renderAppender: wp.blockEditor.InnerBlocks.ButtonBlockAppender
                })),
                el(tools.ItemActions, { clientId: props.clientId, name: 'bc-practice/resource-panel', label: __('Resource group controls', 'bc-practice') })
            );
        }),
        save: function (props) {
            return el('section', useBlockProps.save({ className: 'bc-tab-panel' }),
                el(wp.blockEditor.RichText.Content, { tagName: 'h3', className: 'bc-tab-panel-title', value: props.attributes.title }),
                el('div', { className: 'bc-tab-panel-content' }, el(wp.blockEditor.InnerBlocks.Content))
            );
        }
    });
    wp.blocks.registerBlockType('bc-practice/audience-tabs', {
        apiVersion: 3,
        title: __('PSW Audience tabs', 'bc-practice'),
        description: __('Labelled tabs containing editable text, blocks and patterns.', 'bc-practice'),
        category: 'bc-components', icon: 'index-card',
        keywords: [__('audience', 'bc-practice'), __('tabs', 'bc-practice'), __('content', 'bc-practice')],
        attributes: { label: { type: 'string', default: 'Audience guidance' }, presentation: { type: 'string', enum: ['underlined', 'framed'], default: 'underlined' } },
        supports: { html: false, anchor: true },
        edit: editable(function (props) {
            var inner = useInnerBlocksProps(useBlockProps({ className: 'bc-audience-tabs bc-audience-tabs-' + props.attributes.presentation }), {
                allowedBlocks: ['bc-practice/audience-panel'],
                template: [['bc-practice/audience-panel', { title: 'Audience one' }], ['bc-practice/audience-panel', { title: 'Audience two' }]],
                renderAppender: function () { return el(tools.Appender, { clientId: props.clientId, name: 'bc-practice/audience-panel', label: __('Add tab', 'bc-practice'), create: function () { return wp.blocks.createBlock('bc-practice/audience-panel', { title: '' }, [wp.blocks.createBlock('core/paragraph', { placeholder: __('Add content or insert a pattern for this audience.', 'bc-practice') })]); } }); }
            });
            return el(wp.element.Fragment, {},
                el(wp.blockEditor.InspectorControls, {},
                    el(wp.components.PanelBody, { title: __('Audience tabs', 'bc-practice') },
                        el(wp.components.SelectControl, {
                            label: __('Tab appearance', 'bc-practice'), value: props.attributes.presentation,
                            options: [{ label: __('Underlined', 'bc-practice'), value: 'underlined' }, { label: __('Framed', 'bc-practice'), value: 'framed' }],
                            onChange: function (value) { props.setAttributes({ presentation: value }); }
                        }),
                        el(wp.components.TextControl, {
                            label: __('Tab group label', 'bc-practice'), value: props.attributes.label,
                            onChange: function (value) { props.setAttributes({ label: value }); },
                            help: __('Describe this set of tabs for people using assistive technology.', 'bc-practice')
                        }),
                        el('p', {}, __('All tabs stay open while editing. Edit each Tab label and add blocks or patterns beneath it. Preview the page to try switching tabs.', 'bc-practice')),
                        el('p', {}, __('Use H3 headings inside tabs. Put information for every audience above the tabs.', 'bc-practice'))
                    )
                ),
                el('div', inner)
            );
        }),
        save: function (props) {
            return el('div', useBlockProps.save({ className: 'bc-audience-tabs bc-audience-tabs-' + props.attributes.presentation, 'data-tab-label': props.attributes.label }), el(wp.blockEditor.InnerBlocks.Content));
        }
    });

    wp.blocks.registerBlockType('bc-practice/audience-panel', {
        apiVersion: 3, title: __('PSW Audience tab', 'bc-practice'), category: 'bc-components', icon: 'excerpt-view',
        parent: ['bc-practice/audience-tabs'],
        attributes: { title: { type: 'string', source: 'html', selector: '.bc-audience-panel-title', default: '' } },
        supports: { html: false, anchor: true, reusable: false },
        edit: editable(function (props) {
            return el('section', useBlockProps({ className: 'bc-audience-panel' }),
                el('div', { className: 'bc-audience-editor-header' },
                    el('span', { className: 'bc-audience-editor-label', 'aria-hidden': true }, __('Tab label', 'bc-practice')),
                    el(wp.blockEditor.RichText, {
                        tagName: 'h3', className: 'bc-audience-panel-title', value: props.attributes.title,
                        identifier: 'title', 'aria-label': __('Tab label', 'bc-practice'),
                        allowedFormats: [], placeholder: __('Name this tab', 'bc-practice'),
                        onChange: function (title) { props.setAttributes({ title: title }); }
                    }),
                    el(tools.ItemActions, { clientId: props.clientId, name: 'bc-practice/audience-panel', label: __('Tab controls', 'bc-practice') })
                ),
                el('div', { className: 'bc-audience-panel-content bc-pattern-flow' }, el(wp.blockEditor.InnerBlocks, {
                    template: [['core/paragraph', { placeholder: __('Add content or insert a pattern for this audience.', 'bc-practice') }]],
                    templateLock: false, renderAppender: wp.blockEditor.InnerBlocks.ButtonBlockAppender
                }))
            );
        }),
        save: function (props) {
            return el('section', useBlockProps.save({ className: 'bc-audience-panel' }),
                el(wp.blockEditor.RichText.Content, { tagName: 'h3', className: 'bc-audience-panel-title', value: props.attributes.title }),
                el('div', { className: 'bc-audience-panel-content bc-pattern-flow' }, el(wp.blockEditor.InnerBlocks.Content))
            );
        }
    });
})(window.wp);
