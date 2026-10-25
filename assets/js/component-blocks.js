(function (wp) {
    'use strict';
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var useInnerBlocksProps = wp.blockEditor.useInnerBlocksProps;

    wp.blocks.registerBlockType('bc-practice/steps', {
        apiVersion: 3,
        title: __('Numbered steps', 'bc-practice'),
        description: __('An ordered process with editable headings, paragraphs and lists.', 'bc-practice'),
        category: 'bc-components',
        icon: 'editor-ol',
        attributes: { presentation: { type: 'string', enum: ['connected', 'cards', 'roadmap'], default: 'connected' } },
        supports: { html: false },
        edit: function (props) {
            var presentation = props.attributes.presentation;
            var blockProps = useBlockProps({ className: 'bc-steps bc-steps-' + presentation, role: 'list' });
            var innerProps = useInnerBlocksProps(blockProps, {
                allowedBlocks: ['bc-practice/step'],
                template: [['bc-practice/step'], ['bc-practice/step'], ['bc-practice/step']],
                orientation: presentation === 'roadmap' ? 'horizontal' : 'vertical'
            });
            return el(wp.element.Fragment, {},
                el(wp.blockEditor.InspectorControls, {},
                    el(wp.components.PanelBody, { title: __('Steps', 'bc-practice') },
                        el(wp.components.SelectControl, {
                            label: __('Presentation', 'bc-practice'), value: presentation,
                            options: [
                                { label: __('Connected steps', 'bc-practice'), value: 'connected' },
                                { label: __('Boxed steps', 'bc-practice'), value: 'cards' },
                                { label: __('Icon roadmap', 'bc-practice'), value: 'roadmap' }
                            ],
                            onChange: function (value) { props.setAttributes({ presentation: value }); }
                        })
                    )
                ),
                el('ol', innerProps)
            );
        },
        save: function (props) {
            return el('ol', useBlockProps.save({ className: 'bc-steps bc-steps-' + props.attributes.presentation, role: 'list' }), el(wp.blockEditor.InnerBlocks.Content));
        }
    });

    wp.blocks.registerBlockType('bc-practice/step', {
        apiVersion: 3,
        title: __('Step', 'bc-practice'),
        category: 'bc-components',
        icon: 'editor-ol',
        parent: ['bc-practice/steps'],
        supports: { html: false, reusable: false },
        edit: function () {
            var props = useInnerBlocksProps(useBlockProps({ className: 'bc-step' }), {
                template: [
                    ['core/heading', { level: 3, placeholder: __('Step heading', 'bc-practice') }],
                    ['core/paragraph', { placeholder: __('Explain what to do and why.', 'bc-practice') }]
                ]
            });
            return el('li', props);
        },
        save: function () {
            return el('li', useBlockProps.save({ className: 'bc-step' }), el(wp.blockEditor.InnerBlocks.Content));
        }
    });

    wp.blocks.registerBlockType('bc-practice/resource-tabs', {
        apiVersion: 3,
        title: __('Resource tabs', 'bc-practice'),
        description: __('Groups of related resources, with tabs on the published page.', 'bc-practice'),
        category: 'bc-components', icon: 'index-card',
        attributes: { label: { type: 'string', default: 'Resource categories' } },
        supports: { html: false, anchor: true },
        edit: function (props) {
            var inner = useInnerBlocksProps(useBlockProps({ className: 'bc-resource-tabs' }), {
                allowedBlocks: ['bc-practice/resource-panel'],
                template: [['bc-practice/resource-panel', { title: 'Getting started' }], ['bc-practice/resource-panel', { title: 'Guidance and tools' }]]
            });
            return el(wp.element.Fragment, {},
                el(wp.blockEditor.InspectorControls, {},
                    el(wp.components.PanelBody, { title: __('Resource tabs', 'bc-practice') },
                        el(wp.components.TextControl, {
                            label: __('Tab group label', 'bc-practice'), value: props.attributes.label,
                            onChange: function (value) { props.setAttributes({ label: value }); },
                            help: __('Describe this set of resource categories.', 'bc-practice')
                        }),
                        el('p', {}, __('Edit each group heading to name its tab. All groups stay visible here; preview the page to try the tabs. Reorder or duplicate Resource group blocks in List View.', 'bc-practice'))
                    )
                ),
                el('div', inner)
            );
        },
        save: function (props) {
            return el('div', useBlockProps.save({ className: 'bc-resource-tabs', 'data-tab-label': props.attributes.label }), el(wp.blockEditor.InnerBlocks.Content));
        }
    });

    wp.blocks.registerBlockType('bc-practice/resource-panel', {
        apiVersion: 3, title: __('Resource group', 'bc-practice'), category: 'bc-components', icon: 'screenoptions',
        parent: ['bc-practice/resource-tabs'],
        attributes: { title: { type: 'string', source: 'html', selector: '.bc-tab-panel-title', default: 'Resource group' } },
        supports: { html: false, anchor: true, reusable: false },
        edit: function (props) {
            return el('section', useBlockProps({ className: 'bc-tab-panel' }),
                el(wp.blockEditor.RichText, {
                    tagName: 'h3', className: 'bc-tab-panel-title', value: props.attributes.title,
                    allowedFormats: [], placeholder: __('Resource group name', 'bc-practice'),
                    onChange: function (title) { props.setAttributes({ title: title }); }
                }),
                el('div', { className: 'bc-tab-panel-content' }, el(wp.blockEditor.InnerBlocks, {
                    template: [['core/paragraph', { placeholder: __('Add resources for this group.', 'bc-practice') }]]
                }))
            );
        },
        save: function (props) {
            return el('section', useBlockProps.save({ className: 'bc-tab-panel' }),
                el(wp.blockEditor.RichText.Content, { tagName: 'h3', className: 'bc-tab-panel-title', value: props.attributes.title }),
                el('div', { className: 'bc-tab-panel-content' }, el(wp.blockEditor.InnerBlocks.Content))
            );
        }
    });
})(window.wp);
