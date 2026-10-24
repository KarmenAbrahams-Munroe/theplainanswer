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
        attributes: { presentation: { type: 'string', enum: ['connected', 'cards'], default: 'connected' } },
        supports: { html: false },
        edit: function (props) {
            var presentation = props.attributes.presentation;
            var blockProps = useBlockProps({ className: 'bc-steps bc-steps-' + presentation, role: 'list' });
            var innerProps = useInnerBlocksProps(blockProps, {
                allowedBlocks: ['bc-practice/step'],
                template: [['bc-practice/step'], ['bc-practice/step'], ['bc-practice/step']],
                orientation: 'vertical'
            });
            return el(wp.element.Fragment, {},
                el(wp.blockEditor.InspectorControls, {},
                    el(wp.components.PanelBody, { title: __('Steps', 'bc-practice') },
                        el(wp.components.SelectControl, {
                            label: __('Presentation', 'bc-practice'), value: presentation,
                            options: [
                                { label: __('Connected steps', 'bc-practice'), value: 'connected' },
                                { label: __('Boxed steps', 'bc-practice'), value: 'cards' }
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
})(window.wp);
