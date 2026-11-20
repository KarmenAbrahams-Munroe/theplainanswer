(function (wp) {
    'use strict';
    var el = wp.element.createElement;
    var ServerSideRender = wp.serverSideRender.default || wp.serverSideRender;
    var IconPicker = window.bcPracticeEditorTools.IconPicker;
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
                if (slug === 'page-title' || slug === 'page-information') {
                    controls = el(wp.blockEditor.InspectorControls, {},
                        el(wp.components.PanelBody, { title: 'Page information' },
                            el(wp.components.ToggleControl, {
                                label: 'Show Last updated', checked: !!props.attributes.showUpdated,
                                help: 'Uses the page’s saved modification date.',
                                onChange: function (value) { props.setAttributes({ showUpdated: value }); }
                            }),
                            el(wp.components.ToggleControl, {
                                label: 'Show audience and applicability', checked: props.attributes.showAudience !== false,
                                help: 'Only explicitly selected page terms appear.',
                                onChange: function (value) { props.setAttributes({ showAudience: value }); }
                            })
                        )
                    );
                }
                if (slug === 'icon') {
                    var picker = function (close) { return el(IconPicker, {
                        value: props.attributes.icon, options: settings.iconOptions,
                        onChange: function (value) { props.setAttributes({ icon: value }); if (close) { close(); } }
                    }); };
                    controls = el(wp.element.Fragment, {}, el(wp.blockEditor.InspectorControls, {},
                        el(wp.components.PanelBody, { title: 'Icon' },
                            picker()
                        )
                    ), el(wp.blockEditor.BlockControls, {}, el(wp.components.ToolbarGroup, {},
                        el(wp.components.Dropdown, {
                            renderToggle: function (toggle) { return el(wp.components.ToolbarButton, { onClick: toggle.onToggle, 'aria-expanded': toggle.isOpen, label: 'Change icon' }, 'Change icon'); },
                            renderContent: function (dropdown) { return el('div', { className: 'bc-editor-icon-picker' }, picker(dropdown.onClose)); }
                        })
                    )));
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
                var sources = {
                    'child-page-cards': 'Generated from published child pages. Edit each child page’s title and Page introduction (excerpt); use Parent and Order to change the cards. Grandchild links come from those pages’ children.',
                    'page-title': 'Generated from the page title, Page introduction (excerpt), Featured image and Page presentation and navigation settings. Edit these on the page itself.',
                    'page-introduction': 'Edit Page introduction (excerpt) in the page’s Page presentation and navigation settings.',
                    'last-updated': 'Uses the page’s last saved modification date. Saving the page updates this field automatically.',
                    'page-information': 'Uses this page’s selected audience and applicability terms, with its saved modification date when enabled.',
                    'page-contents': 'Generated from this page’s H2 headings. Edit the headings in the page content to change this list.',
                    'topic-navigation': 'Generated from published pages and their Parent and Order settings.',
                    'guide-contents': 'Generated from published pages under the closest page marked This page starts a guide. Use Parent and Order on those pages to change this list.',
                    'reading-navigation': 'Generated from the current page’s H2 headings and published section pages. Edit the page content and the section’s Parent and Order settings.',
                    'section-menu': 'Generated from published section pages. Use their Parent and Order settings to change the links.',
                    'guide-navigation': 'Generated from the published page order inside a section marked This page starts a guide.',
                    'breadcrumbs': 'Generated from this page’s title and published parent pages.',
                    'footer-feedback': 'Uses the B.C. page feedback plugin settings and the page currently being viewed.'
                };
                return el(wp.element.Fragment, {}, controls,
                    el('div', wp.blockEditor.useBlockProps(), el(ServerSideRender, {
                        block: 'bc-practice/' + slug,
                        attributes: props.attributes,
                        urlQueryArgs: postId ? { post_id: postId } : {},
                        httpMethod: 'POST'
                    }), props.isSelected && sources[slug] && el('p', { className: 'bc-editor-source' }, sources[slug]))
                );
            },
            save: function () { return null; }
        });
    });
})(window.wp);
