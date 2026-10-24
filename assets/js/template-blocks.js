(function (wp) {
    'use strict';
    var el = wp.element.createElement;
    var ServerSideRender = wp.serverSideRender.default || wp.serverSideRender;
    function IconPicker(props) {
        var state = wp.element.useState(''), search = state[0], setSearch = state[1];
        var options = props.options.filter(function (option) { return (option.label + ' ' + option.value).toLowerCase().indexOf(search.toLowerCase()) !== -1; });
        return el(wp.components.ComboboxControl, {
            label: 'Symbol', value: props.value, options: options, allowReset: false,
            onFilterValueChange: setSearch,
            onChange: function (value) { if (value) props.onChange(value); },
            help: 'Type to search the shared icon library.'
        });
    }
    Object.keys(window.bcPracticeTemplateBlocks || {}).forEach(function (slug) {
        var settings = window.bcPracticeTemplateBlocks[slug];
        wp.blocks.registerBlockType('bc-practice/' + slug, {
            apiVersion: 3,
            title: settings.title,
            description: settings.description,
            icon: settings.icon,
            category: settings.category || 'theme',
            usesContext: ['postId', 'postType'],
            attributes: settings.attributes || {},
            supports: { html: false },
            edit: function (props) {
                var postId = props.context && props.context.postId;
                var controls = null;
                if (slug === 'icon') {
                    controls = el(wp.blockEditor.InspectorControls, {},
                        el(wp.components.PanelBody, { title: 'Icon' },
                            el(IconPicker, {
                                value: props.attributes.icon,
                                options: settings.iconOptions,
                                onChange: function (value) { props.setAttributes({ icon: value }); }
                            })
                        )
                    );
                }
                if (slug === 'topic-navigation' || slug === 'page-contents') {
                    var topic = slug === 'topic-navigation';
                    controls = el(wp.blockEditor.InspectorControls, {},
                        el(wp.components.PanelBody, { title: 'Navigation layout' },
                            el(wp.components.SelectControl, {
                                label: 'Presentation',
                                value: props.attributes.presentation,
                                options: topic ? [
                                    { label: 'Topic sidebar', value: 'sidebar' },
                                    { label: 'Browse topic disclosure', value: 'disclosure' }
                                ] : [
                                    { label: 'Inline list', value: 'inline' },
                                    { label: 'Sticky index', value: 'sticky' }
                                ],
                                onChange: function (value) { props.setAttributes({ presentation: value }); }
                            })
                        )
                    );
                }
                return el(wp.element.Fragment, {}, controls,
                    el('div', wp.blockEditor.useBlockProps(), el(ServerSideRender, {
                        block: 'bc-practice/' + slug,
                        attributes: props.attributes,
                        urlQueryArgs: postId ? { post_id: postId } : {},
                        httpMethod: 'POST'
                    }))
                );
            },
            save: function () { return null; }
        });
    });
})(window.wp);
