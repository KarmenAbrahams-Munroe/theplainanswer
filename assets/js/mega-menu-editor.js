(function (wp) {
    'use strict';
    var el = wp.element.createElement;
    var useState = wp.element.useState, useEffect = wp.element.useEffect;
    var c = wp.components;
    var ServerSideRender = wp.serverSideRender.default || wp.serverSideRender;
    function title(page) {
        return wp.htmlEntities.decodeEntities((page.title && page.title.rendered || '').replace(/<[^>]*>/g, '')) || 'Untitled page';
    }
    function PagePicker(props) {
        var searchState = useState(''), search = searchState[0], setSearch = searchState[1];
        var optionsState = useState([]), pages = optionsState[0], setPages = optionsState[1];
        var selectedState = useState(null), selected = selectedState[0], setSelected = selectedState[1];
        var checkingState = useState(Boolean(props.value)), checking = checkingState[0], setChecking = checkingState[1];
        var errorState = useState(''), error = errorState[0], setError = errorState[1];
        useEffect(function () {
            var cancelled = false;
            var timer = window.setTimeout(function () {
                wp.apiFetch({ path: '/wp/v2/pages?status=publish&per_page=50&orderby=title&order=asc&_fields=id,title&search=' + encodeURIComponent(search) }).then(function (result) {
                    if (!cancelled) { setPages(result); setError(''); }
                }).catch(function () { if (!cancelled) setError('Pages could not be loaded. Try searching again.'); });
            }, 250);
            return function () { cancelled = true; window.clearTimeout(timer); };
        }, [search]);
        useEffect(function () {
            var cancelled = false;
            setSelected(null);
            setChecking(Boolean(props.value));
            if (!props.value) return;
            wp.apiFetch({ path: '/wp/v2/pages/' + props.value + '?context=view&_fields=id,title,status' }).then(function (result) {
                if (!cancelled) { setSelected(result.status === 'publish' ? result : null); setChecking(false); }
            }).catch(function () { if (!cancelled) { setSelected(null); setChecking(false); } });
            return function () { cancelled = true; };
        }, [props.value]);
        var options = [{ value: '0', label: 'Top-level topic pages' }];
        if (selected && !pages.some(function (page) { return page.id === selected.id; })) options.push({ value: String(selected.id), label: title(selected) });
        pages.forEach(function (page) { options.push({ value: String(page.id), label: title(page) }); });
        return el(wp.element.Fragment, {},
            el(c.ComboboxControl, {
                label: 'Parent page', help: 'Its published children become the first column. Top-level topic pages excludes the homepage and pages used as other menu sections. Type to search published pages.',
                value: String(props.value || 0), options: options, allowReset: false,
                onFilterValueChange: setSearch,
                onChange: function (value) { if (value !== null) props.onChange(Number(value)); }
            }),
            checking ? el('p', {}, 'Loading selected page…') : null,
            props.value && !checking && !selected ? el(c.Notice, { status: 'warning', isDismissible: false }, 'This parent page is unavailable or unpublished. Select a published page to show this section.') : null,
            error ? el(c.Notice, { status: 'warning', isDismissible: false }, error) : null
        );
    }
    wp.blocks.registerBlockType('bc-practice/mega-menu', {
        apiVersion: 3, title: 'Mega menu', icon: 'menu-alt3', category: 'theme',
        description: 'A global drill-down menu populated from published page hierarchies.',
        attributes: window.bcPracticeMegaAttributes,
        supports: { html: false, align: ['full', 'wide'] },
        edit: function (props) {
            var a = props.attributes;
            var sections = a.sections || [];
            function update(index, changes) {
                props.setAttributes({ sections: sections.map(function (section, i) { return i === index ? Object.assign({}, section, changes) : section; }) });
            }
            function move(index, offset) {
                var next = sections.slice(), section = next.splice(index, 1)[0];
                next.splice(index + offset, 0, section);
                props.setAttributes({ sections: next });
            }
            return el(wp.element.Fragment, {},
                el(wp.blockEditor.InspectorControls, {},
                    el(c.PanelBody, { title: 'Menu settings' },
                        el('p', {}, 'Choose the sections across the top. Page hierarchy sections populate automatically; links go directly to a destination.'),
                        el(c.TextControl, { label: 'Navigation label', value: a.navigationLabel, onChange: function (v) { props.setAttributes({ navigationLabel: v }); } }),
                        el(c.TextControl, { label: 'All-topics heading', value: a.topicsLabel, onChange: function (v) { props.setAttributes({ topicsLabel: v }); }, help: 'Used when a section lists all top-level pages.' })
                    ),
                    sections.map(function (section, index) {
                        return el(c.PanelBody, { key: index, title: (index + 1) + '. ' + (section.label || 'New section'), initialOpen: index === 0 },
                            el(c.TextControl, { label: 'Section label', value: section.label || '', onChange: function (v) { update(index, { label: v }); } }),
                            el(c.SelectControl, { label: 'Section type', value: section.type || 'tree', options: [{ label: 'Page hierarchy', value: 'tree' }, { label: 'Direct link', value: 'link' }], onChange: function (v) { update(index, { type: v }); } }),
                            section.type === 'link' ? el(c.TextControl, { label: 'Destination URL', type: 'url', value: section.url || '', onChange: function (v) { update(index, { url: v }); } }) : el(PagePicker, { value: section.rootId || 0, onChange: function (v) { update(index, { rootId: v }); } }),
                            el('div', { className: 'bc-mega-settings-actions' },
                                el(c.Button, { variant: 'secondary', disabled: index === 0, onClick: function () { move(index, -1); } }, 'Move up'),
                                el(c.Button, { variant: 'secondary', disabled: index === sections.length - 1, onClick: function () { move(index, 1); } }, 'Move down'),
                                el(c.Button, { variant: 'tertiary', isDestructive: true, onClick: function () { props.setAttributes({ sections: sections.filter(function (_, i) { return i !== index; }) }); } }, 'Remove')
                            )
                        );
                    }),
                    el(c.PanelBody, { title: 'Add a section' },
                        el(c.Button, { variant: 'secondary', disabled: sections.length >= 20, onClick: function () { props.setAttributes({ sections: sections.concat({ label: 'New section', type: 'tree', rootId: 0 }) }); } }, 'Add menu section'),
                        el('p', {}, 'Keep the top bar short. Use Top-level topic pages for Browse HR topics, then choose the Forms, Tools and systems, Policies and agreements, and Get support parent pages for their sections.')
                    ),
                    el(c.PanelBody, { title: 'Optional support link', initialOpen: false },
                        el(c.TextControl, { label: 'Support link text', value: a.supportLabel, onChange: function (v) { props.setAttributes({ supportLabel: v }); } }),
                        el(c.TextControl, { label: 'Support URL', type: 'url', value: a.supportUrl, onChange: function (v) { props.setAttributes({ supportUrl: v }); } }),
                        el('p', {}, 'Shows in the menu footer when both fields are filled in.')
                    )
                ),
                el('div', Object.assign({}, wp.blockEditor.useBlockProps(), { onClick: function (event) { if (event.target.closest('a')) event.preventDefault(); } }),
                    el(ServerSideRender, { block: 'bc-practice/mega-menu', attributes: a, httpMethod: 'POST' })
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);
