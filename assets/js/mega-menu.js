(function () {
    'use strict';
    var mobile = window.matchMedia('(max-width: 900px)');
    var instances = [];

    function element(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }
    function arrow(direction) {
        var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('width', '20');
        icon.setAttribute('height', '20');
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('focusable', 'false');
        var path = document.createElementNS(icon.namespaceURI, 'path');
        path.setAttribute('d', direction === 'down' ? 'm6 9 6 6 6-6' : direction === 'left' ? 'm15 5-7 7 7 7' : direction === 'close' ? 'm6 6 12 12M6 18 18 6' : 'm9 5 7 7-7 7');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '2');
        icon.appendChild(path);
        return icon;
    }
    function button(text, className) {
        var node = element('button', className, text);
        node.type = 'button';
        return node;
    }
    function focus(node) {
        if (node) node.focus({ preventScroll: true });
    }
    function initialPath(nodes, current) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.id === current) return node.children.length ? [node.id] : [];
            var child = initialPath(node.children, current);
            if (child !== null) return [node.id].concat(child);
        }
        return null;
    }

    document.querySelectorAll('[data-bc-mega]').forEach(function (root, instanceIndex) {
        var app = root.querySelector('[data-bc-mega-app]');
        var fallback = root.querySelector('[data-bc-mega-fallback]');
        var data;
        try { data = JSON.parse(root.querySelector('[data-bc-mega-data]').textContent); }
        catch (error) { return; }
        if (!data || !Array.isArray(data.sections) || !data.sections.length) return;
        var strings = data.strings;
        var prefix = 'bc-mega-' + instanceIndex + '-';
        // Avoid collisions with authored anchors or another copy of this script.
        while (document.getElementById(prefix + 'surface')) prefix += 'x-';
        var active = -1, path = [], mobileOpen = false;
        var toggles = [], scrollPositions = {};
        var mobileToggle = button(strings.menu, 'bc-mega-mobile-toggle');
        mobileToggle.appendChild(arrow('down'));
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-controls', prefix + 'surface');
        var surface = element('div', 'bc-mega-surface');
        surface.id = prefix + 'surface';
        var bar = element('ul', 'bc-mega-bar');
        var panel = element('div', 'bc-mega-panel');
        panel.id = prefix + 'panel';
        panel.hidden = true;
        var toolbar = element('div', 'bc-mega-toolbar');
        var back = button('', 'bc-mega-back');
        back.hidden = true;
        var trail = element('p', 'bc-mega-trail');
        toolbar.append(back, trail);
        var columns = element('div', 'bc-mega-columns');
        var footer = element('div', 'bc-mega-footer');
        if (data.support) {
            var support = element('a', 'bc-mega-support', data.support.label);
            support.href = data.support.url;
            footer.appendChild(support);
        }
        var closeButton = button(strings.close, 'bc-mega-close');
        closeButton.appendChild(arrow('close'));
        footer.appendChild(closeButton);
        panel.append(toolbar, columns, footer);
        surface.append(bar, panel);
        app.append(mobileToggle, surface);

        function makeLink(node, className, text) {
            var link = element('a', className, text || node.title);
            link.href = node.url;
            if (node.id && node.id === data.current) link.setAttribute('aria-current', 'page');
            return link;
        }
        function levels() {
            var section = data.sections[active];
            var result = [{ owner: section, nodes: section.children }];
            for (var i = 0; i < path.length; i++) {
                var selected = result[i].nodes.find(function (node) { return node.id === path[i]; });
                if (!selected || !selected.children.length) break;
                result.push({ owner: selected, nodes: selected.children });
            }
            return result;
        }
        function rememberScroll() {
            columns.querySelectorAll('[data-scroll-key]').forEach(function (pane) {
                scrollPositions[pane.dataset.scrollKey] = pane.scrollTop;
            });
        }
        function revealInList(control) {
            var list = control && control.closest('.bc-mega-links');
            if (!list) return;
            var scrollBox = panel.classList.contains('bc-mega-flow') ? panel : list;
            var bounds = scrollBox.getBoundingClientRect(), row = control.getBoundingClientRect();
            var top = bounds.top + scrollBox.clientTop, bottom = top + scrollBox.clientHeight;
            if (row.top < top) scrollBox.scrollTop -= top - row.top;
            else if (row.bottom > bottom) scrollBox.scrollTop += row.bottom - bottom;
        }
        function fit() {
            if (active < 0 && !mobileOpen) return;
            var top = mobile.matches ? surface.getBoundingClientRect().top : panel.getBoundingClientRect().top;
            // All rows remain reachable in short viewports; the page itself can scroll.
            root.style.setProperty('--bc-mega-available', Math.max(180, window.innerHeight - Math.max(0, top) - 16) + 'px');
            var fixedHeight = 0;
            columns.querySelectorAll('.bc-mega-column').forEach(function (pane) {
                var head = pane.querySelector('.bc-mega-column-head');
                fixedHeight = Math.max(fixedHeight, head ? head.offsetHeight : 0);
            });
            var minimumList = Math.max(44, parseFloat(window.getComputedStyle(root).fontSize) * 3.3);
            var available = panel.clientHeight - toolbar.offsetHeight - footer.offsetHeight;
            // At very large text sizes, scroll the complete panel so its headings cannot cover the links.
            panel.classList.toggle('bc-mega-flow', active >= 0 && available < fixedHeight + minimumList);
        }
        function updateVisibility() {
            surface.hidden = mobile.matches && !mobileOpen;
            bar.hidden = mobile.matches && active >= 0;
            panel.hidden = active < 0;
            mobileToggle.setAttribute('aria-expanded', String(mobileOpen));
            root.classList.toggle('is-mobile-open', mobileOpen);
            root.classList.toggle('has-open-panel', active >= 0);
            toggles.forEach(function (toggle, index) {
                if (toggle.tagName === 'BUTTON') toggle.setAttribute('aria-expanded', String(index === active));
            });
            fit();
        }
        function renderColumns(targetLevel, focusId) {
            rememberScroll();
            panel.scrollTop = 0;
            var list = levels();
            var end = list.length - 1;
            var start = mobile.matches ? end : Math.max(0, end - 2);
            columns.replaceChildren();
            trail.textContent = [data.sections[active].label].concat(list.slice(1).map(function (item) { return item.owner.title; })).join(' / ');
            back.hidden = !mobile.matches && start === 0;
            toolbar.hidden = back.hidden;
            var backLabel = end ? list[end - 1].owner.title : strings.main;
            back.replaceChildren(arrow('left'), element('span', '', strings.backTo.replace('%s', backLabel)));
            var count = mobile.matches ? 1 : 3;
            for (var slot = 0; slot < count; slot++) {
                let level = start + slot;
                var entry = list[level];
                var pane = element('section', 'bc-mega-column' + (slot === 0 ? ' bc-mega-column-first' : ''));
                if (!entry) {
                    pane.classList.add('bc-mega-empty');
                    pane.appendChild(element('p', '', level === 1 ? strings.chooseTopic : strings.chooseSubtopic));
                    columns.appendChild(pane);
                    continue;
                }
                var heading = element('h2', 'bc-mega-column-title');
                if (entry.owner.url) heading.appendChild(makeLink(entry.owner, 'bc-mega-heading-link'));
                else heading.textContent = entry.owner.title;
                heading.id = prefix + 'heading-' + level;
                heading.tabIndex = -1;
                pane.setAttribute('aria-labelledby', heading.id);
                var head = element('div', 'bc-mega-column-head');
                head.appendChild(heading);
                // The middle desktop column carries the introduction once; other heads stay compact.
                if (!mobile.matches && slot === 1 && entry.owner.summary) head.appendChild(element('p', 'bc-mega-description', entry.owner.summary));
                pane.appendChild(head);
                var ul = element('ul', 'bc-mega-links');
                ul.dataset.scrollKey = active + '-' + entry.owner.id + '-' + level;
                entry.nodes.forEach(function (node) {
                    var li = element('li');
                    var control;
                    if (node.children.length) {
                        control = button('', 'bc-mega-branch');
                        control.append(element('span', '', node.title), arrow('right'));
                        control.dataset.nodeId = node.id;
                        control.setAttribute('aria-expanded', String(path[level] === node.id));
                        control.addEventListener('click', function () {
                            path = path.slice(0, level).concat(node.id);
                            renderColumns(level + 1);
                        });
                    } else {
                        control = makeLink(node, 'bc-mega-page');
                    }
                    li.appendChild(control);
                    ul.appendChild(li);
                });
                pane.appendChild(ul);
                columns.appendChild(pane);
            }
            updateVisibility();
            columns.querySelectorAll('[data-scroll-key]').forEach(function (list) {
                if (Object.prototype.hasOwnProperty.call(scrollPositions, list.dataset.scrollKey)) list.scrollTop = scrollPositions[list.dataset.scrollKey];
                else revealInList(list.querySelector('[aria-expanded="true"], [aria-current="page"]'));
            });
            if (focusId !== undefined) {
                var branch = columns.querySelector('[data-node-id="' + focusId + '"]');
                revealInList(branch);
                focus(branch || document.getElementById(prefix + 'heading-' + end));
            } else if (targetLevel !== undefined) {
                var target = document.getElementById(prefix + 'heading-' + targetLevel);
                if (panel.classList.contains('bc-mega-flow')) panel.scrollTop = 0;
                focus(target);
            }
        }
        function close(restoreFocus) {
            var previous = active;
            var hiddenFocus = panel.contains(document.activeElement) || (mobile.matches && surface.contains(document.activeElement));
            active = -1;
            mobileOpen = false;
            updateVisibility();
            if (restoreFocus || hiddenFocus) focus(mobile.matches ? mobileToggle : toggles[previous] || toggles[0]);
        }
        function open(index) {
            instances.forEach(function (instance) { if (instance.root !== root) instance.close(false); });
            active = index;
            mobileOpen = mobile.matches;
            path = initialPath(data.sections[index].children, data.current) || [];
            scrollPositions = {};
            renderColumns(mobile.matches ? path.length : undefined);
        }
        data.sections.forEach(function (section, index) {
            var li = element('li');
            var control;
            if (section.children.length) {
                control = button('', 'bc-mega-top');
                control.append(element('span', '', section.label), arrow('down'));
                control.setAttribute('aria-expanded', 'false');
                control.setAttribute('aria-controls', panel.id);
                control.addEventListener('click', function () { if (active === index) close(false); else open(index); });
            } else {
                control = makeLink(section, 'bc-mega-top', section.label);
            }
            toggles.push(control);
            li.appendChild(control);
            bar.appendChild(li);
        });
        mobileToggle.addEventListener('click', function () {
            if (mobileOpen) close(false);
            else {
                instances.forEach(function (instance) { if (instance.root !== root) instance.close(false); });
                mobileOpen = true;
                active = -1;
                updateVisibility();
            }
        });
        back.addEventListener('click', function () {
            if (path.length) {
                var previous = path.pop();
                renderColumns(undefined, previous);
            } else {
                var previousSection = active;
                active = -1;
                updateVisibility();
                focus(toggles[previousSection]);
            }
        });
        closeButton.addEventListener('click', function () { close(true); });
        root.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && (active >= 0 || mobileOpen)) {
                event.preventDefault();
                event.stopPropagation();
                close(true);
            }
        });
        root.addEventListener('focusout', function () {
            window.setTimeout(function () {
                if (!root.contains(document.activeElement)) close(false);
            }, 0);
        });
        document.addEventListener('click', function (event) {
            // Branch rendering replaces the clicked row; its original event path is stable.
            if (event.composedPath().indexOf(root) === -1) close(false);
        });
        root.addEventListener('click', function (event) {
            // Fragment links may stay on the same document. Preserve all native link actions.
            var link = event.target.closest('a');
            if (link && app.contains(link) && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
                var to = new URL(link.href, location.href);
                if (to.origin === location.origin && to.pathname === location.pathname && to.hash) close(true);
            }
        });
        function resize() {
            var focused = root.contains(document.activeElement);
            updateVisibility();
            if (active >= 0) {
                if (mobile.matches && !mobileOpen) { mobileOpen = true; updateVisibility(); }
                renderColumns(focused ? path.length : undefined);
            } else if (focused && mobile.matches && surface.hidden) focus(mobileToggle);
            else if (focused && !mobile.matches && document.activeElement === mobileToggle) focus(toggles[0]);
        }
        if (mobile.addEventListener) mobile.addEventListener('change', resize);
        else mobile.addListener(resize);
        window.addEventListener('resize', fit, { passive: true });
        window.addEventListener('scroll', fit, { passive: true });
        window.addEventListener('beforeprint', function () { close(false); });
        // Swap only after the complete interface is ready; the native menu survives failures.
        updateVisibility();
        fallback.hidden = true;
        app.hidden = false;
        root.classList.add('is-enhanced');
        fit();
        instances.push({ root: root, close: close });
    });
})();
