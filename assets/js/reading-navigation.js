(function () {
    'use strict';

    var desktop = window.matchMedia('(min-width: 901px)');
    var controllers = [];
    var queued = false;

    function targetFor(hash) {
        try { return document.getElementById(decodeURIComponent(hash.replace(/^#/, ''))); }
        catch (error) { return null; }
    }

    function focusVisible(element) {
        if (!element) { return; }
        element.focus({ preventScroll: true });
        var rect = element.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
            element.scrollIntoView({ block: 'nearest' });
        }
    }

    function schedule() {
        if (queued) { return; }
        queued = true;
        window.requestAnimationFrame(function () {
            queued = false;
            controllers.forEach(function (controller) { controller.track(); });
        });
    }

    document.querySelectorAll('[data-bc-reading-navigation]').forEach(function (host) {
        var layout = host.closest('.bc-reading-layout');
        var pagePane = host.querySelector('[data-reading-pane="page"]');
        var sectionPane = document.getElementById(host.dataset.sectionId);
        var sectionHome = sectionPane && sectionPane.closest('[data-reading-section-home]');
        var pageDetails = pagePane && pagePane.querySelector('details');
        var sectionDetails = sectionPane && sectionPane.querySelector('details');
        var tools = host.querySelector('[data-reading-tools]');
        var tablist = host.querySelector('[data-reading-tabs]');
        var singleLabel = host.querySelector('[data-reading-single-label]');
        var tabs = Array.from(host.querySelectorAll('[data-reading-tab]'));
        var jump = host.querySelector('[data-reading-section-jump]');
        var selected = pagePane ? 'page' : 'section';
        var isDesktop = false;
        var pageMobileOpen = false;
        var sectionMobileOpen = false;
        var active = null;
        var entries = pagePane ? Array.from(pagePane.querySelectorAll('a[href^="#"]')).map(function (link) {
            return { link: link, target: targetFor(link.hash) };
        }).filter(function (entry) { return entry.target; }) : [];

        if (!sectionPane) {
            var missing = host.querySelector('[data-reading-tab="section"]');
            if (missing) { missing.remove(); }
            if (jump) { jump.remove(); jump = null; }
            tabs = tabs.filter(function (tab) { return tab.dataset.readingTab !== 'section'; });
        }
        if (!pagePane && !sectionPane) { host.hidden = true; return; }

        function tabFor(key) {
            return tabs.find(function (tab) { return tab.dataset.readingTab === key; });
        }

        function paneFor(key) { return key === 'page' ? pagePane : sectionPane; }

        function focusNavigation(key) {
            var pane = paneFor(key);
            // A single view has no visible tab; focus its first link instead.
            focusVisible(tablist.hidden ? pane && pane.querySelector('a') : tabFor(key));
        }

        function sizeNavigation() {
            if (!isDesktop || !layout) { return; }
            var title = layout.querySelector('.bc-reading-title');
            var body = layout.querySelector('.bc-reading-body');
            if (!title || !body) { return; }
            // A long menu must not stretch a short article or move its footer.
            var gap = parseFloat(getComputedStyle(layout).rowGap) || 0;
            var height = Math.ceil(Math.max(180, title.getBoundingClientRect().height + body.getBoundingClientRect().height + gap));
            var value = height + 'px';
            if (host.style.getPropertyValue('--bc-reading-content-height') !== value) {
                host.style.setProperty('--bc-reading-content-height', value);
            }
        }

        function select(key) {
            if (!paneFor(key)) { return; }
            selected = key;
            tabs.forEach(function (tab) {
                var current = tab.dataset.readingTab === key;
                tab.setAttribute('aria-selected', String(current));
                tab.tabIndex = current ? 0 : -1;
            });
            if (pagePane) { pagePane.hidden = key !== 'page'; }
            if (sectionPane) { sectionPane.hidden = key !== 'section'; }
            sizeNavigation();
            schedule();
        }

        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () { select(tab.dataset.readingTab); });
            tab.addEventListener('keydown', function (event) {
                var next;
                if (event.key === 'ArrowRight') { next = (index + 1) % tabs.length; }
                if (event.key === 'ArrowLeft') { next = (index + tabs.length - 1) % tabs.length; }
                if (event.key === 'Home') { next = 0; }
                if (event.key === 'End') { next = tabs.length - 1; }
                if (next === undefined) { return; }
                event.preventDefault();
                tabs[next].focus();
                // Enter/Space activates a view; moving between tabs keeps the selection.
            });
        });

        if (pageDetails) {
            pageDetails.addEventListener('toggle', function () { if (!isDesktop) { pageMobileOpen = pageDetails.open; } schedule(); });
        }
        if (sectionDetails) {
            sectionDetails.addEventListener('toggle', function () { if (!isDesktop) { sectionMobileOpen = sectionDetails.open; } });
            sectionPane.querySelectorAll('[data-bc-branch-toggle]').forEach(function (button) {
                var panel = document.getElementById(button.getAttribute('aria-controls'));
                if (!panel) { return; }
                function expand(open) {
                    panel.hidden = !open;
                    button.setAttribute('aria-expanded', String(open));
                    button.setAttribute('aria-label', open ? button.dataset.hideLabel : button.dataset.showLabel);
                }
                expand(button.dataset.bcOpen === 'true');
                button.hidden = false;
                button.addEventListener('click', function () { expand(button.getAttribute('aria-expanded') !== 'true'); });
            });
            sectionPane.addEventListener('keydown', function (event) {
                if (event.key !== 'Escape') { return; }
                var branch = event.target.closest('[data-bc-branch-panel]');
                if (branch) {
                    var toggle = sectionPane.querySelector('[aria-controls="' + branch.id + '"]');
                    if (toggle) { toggle.click(); toggle.focus(); }
                } else if (isDesktop) {
                    focusNavigation('section');
                } else {
                    sectionDetails.open = false;
                    sectionDetails.querySelector('summary').focus();
                }
                event.stopPropagation();
            });
        }

        function place() {
            var focused = document.activeElement;
            var focusPage = pagePane && pagePane.contains(focused);
            var focusSection = sectionPane && sectionPane.contains(focused);
            var focusedTab = focused && focused.dataset && focused.dataset.readingTab;
            isDesktop = desktop.matches;
            host.classList.toggle('is-desktop-navigation', isDesktop);
            if (layout) { layout.classList.toggle('has-reading-navigation', true); }
            if (isDesktop) {
                if (sectionPane && sectionPane.parentElement !== host) { host.appendChild(sectionPane); }
                if (pageDetails) { pageDetails.open = true; }
                if (sectionDetails) { sectionDetails.open = true; }
                tools.hidden = false;
                var both = Boolean(pagePane && sectionPane);
                tablist.hidden = !both;
                if (singleLabel) { singleLabel.hidden = both; }
                [pagePane, sectionPane].filter(Boolean).forEach(function (pane) {
                    if (both) {
                        pane.setAttribute('role', 'tabpanel');
                        pane.setAttribute('aria-labelledby', tabFor(pane.dataset.readingPane).id);
                    } else {
                        pane.removeAttribute('role'); pane.removeAttribute('aria-labelledby');
                    }
                });
                if (focusPage) { selected = 'page'; }
                if (focusSection) { selected = 'section'; }
                select(selected);
                if (focusPage && focused.tagName === 'SUMMARY') { focusNavigation('page'); }
                else if (focusSection && focused.tagName === 'SUMMARY') { focusNavigation('section'); }
                else if (focusPage || focusSection) { focusVisible(focused); }
            } else {
                tools.hidden = true;
                [pagePane, sectionPane].filter(Boolean).forEach(function (pane) {
                    pane.hidden = false; pane.removeAttribute('role'); pane.removeAttribute('aria-labelledby');
                });
                if (focusPage || focusedTab === 'page') { pageMobileOpen = true; }
                if (focusSection || focusedTab === 'section') { sectionMobileOpen = true; }
                if (pageDetails) { pageDetails.open = pageMobileOpen; }
                if (sectionDetails) { sectionDetails.open = sectionMobileOpen; }
                if (sectionPane && sectionHome && sectionPane.parentElement !== sectionHome) { sectionHome.appendChild(sectionPane); }
                if (focusedTab) {
                    var details = focusedTab === 'page' ? pageDetails : sectionDetails;
                    if (details) { focusVisible(details.querySelector('summary')); }
                } else if (focusPage || focusSection) { focusVisible(focused); }
            }
            schedule();
        }

        if (jump && sectionDetails) {
            jump.addEventListener('click', function () {
                sectionDetails.open = true; sectionMobileOpen = true;
                window.requestAnimationFrame(function () { focusVisible(sectionDetails.querySelector('summary')); });
            });
        }

        if (pagePane) {
            pagePane.addEventListener('click', function (event) {
                var link = event.target.closest('a[href^="#"]');
                if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) { return; }
                var target = targetFor(link.hash);
                if (!target) { return; }
                if (!isDesktop) { pageDetails.open = false; pageMobileOpen = false; }
                window.requestAnimationFrame(function () {
                    if (!target.hasAttribute('tabindex')) {
                        target.setAttribute('tabindex', '-1');
                        target.addEventListener('blur', function () { target.removeAttribute('tabindex'); }, { once: true });
                    }
                    target.focus({ preventScroll: true });
                    target.scrollIntoView({ block: 'start' });
                });
            });
            pagePane.addEventListener('keydown', function (event) {
                if (event.key !== 'Escape') { return; }
                if (isDesktop) { focusNavigation('page'); }
                else { pageDetails.open = false; pageDetails.querySelector('summary').focus(); }
            });
        }

        function track() {
            sizeNavigation();
            if (!entries.length) { return; }
            var rootStyle = getComputedStyle(document.documentElement);
            var offset = parseFloat(rootStyle.getPropertyValue('--bc-sticky-offset')) || 24;
            var padding = parseFloat(rootStyle.scrollPaddingTop) || 0;
            var current = entries[0];
            entries.forEach(function (entry) {
                var margin = parseFloat(getComputedStyle(entry.target).scrollMarginTop) || 0;
                // Anchor alignment combines the scrolling container's padding and target margin.
                if (entry.target.getBoundingClientRect().top <= Math.max(offset + 16, padding + margin + 2)) { current = entry; }
            });
            var last = entries[entries.length - 1];
            var scroller = document.scrollingElement || document.documentElement;
            if (Math.ceil(window.scrollY + window.innerHeight) >= scroller.scrollHeight - 2 && last.target.getBoundingClientRect().top < window.innerHeight) { current = last; }
            if (active !== current) {
                entries.forEach(function (entry) { entry.link.removeAttribute('aria-current'); });
                current.link.setAttribute('aria-current', 'location'); active = current;
            }
            if (isDesktop && selected === 'page' && !pagePane.contains(document.activeElement)) {
                var rect = current.link.getBoundingClientRect(), bounds = pagePane.getBoundingClientRect();
                if (rect.bottom > bounds.bottom) { pagePane.scrollTop += rect.bottom - bounds.bottom; }
                else if (rect.top < bounds.top) { pagePane.scrollTop -= bounds.top - rect.top; }
            }
        }

        function sectionHash() {
            if (sectionDetails && targetFor(window.location.hash) === sectionDetails.querySelector('summary')) {
                if (isDesktop) { select('section'); focusNavigation('section'); }
                else { sectionDetails.open = true; sectionMobileOpen = true; }
            }
        }

        if (desktop.addEventListener) { desktop.addEventListener('change', place); }
        else { desktop.addListener(place); }
        window.addEventListener('hashchange', sectionHash);
        controllers.push({ track: track });
        place(); sectionHash();
        if (window.ResizeObserver && layout) {
            var observer = new ResizeObserver(schedule);
            layout.querySelectorAll('.bc-reading-title, .bc-reading-body').forEach(function (element) { observer.observe(element); });
        }
    });

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('load', schedule);
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(schedule); }
    schedule();
})();
