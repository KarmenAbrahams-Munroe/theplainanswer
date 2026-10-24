(function () {
    'use strict';

    var mobile = window.matchMedia('(max-width: 900px)');
    var contents = [];

    function controlled(button) {
        return document.getElementById(button.getAttribute('aria-controls'));
    }

    function setExpanded(button, open) {
        var panel = controlled(button);
        if (!panel) { return; }
        button.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
    }

    function stored(key, value) {
        try {
            if (value !== undefined) { window.sessionStorage.setItem(key, value); }
            return window.sessionStorage.getItem(key);
        } catch (error) { return null; }
    }

    function onBreakpoint(callback) {
        if (mobile.addEventListener) { mobile.addEventListener('change', callback); }
        else { mobile.addListener(callback); }
    }

    document.querySelectorAll('[data-bc-topic-navigation]').forEach(function (nav) {
        nav.querySelectorAll('[data-bc-branch-toggle]').forEach(function (button) {
            function show(open) {
                setExpanded(button, open);
                button.setAttribute('aria-label', open ? button.dataset.hideLabel : button.dataset.showLabel);
            }
            show(button.dataset.bcOpen === 'true');
            button.hidden = false;
            button.addEventListener('click', function () {
                show(button.getAttribute('aria-expanded') !== 'true');
            });
        });

        var button = nav.querySelector('[data-bc-topic-toggle]');
        var layout = nav.closest('.bc-detail-layout');
        var disclosure = nav.closest('.bc-topic-disclosure');
        var refresh = function () {};
        if (button) {
            var key = 'bc-practice:topic-navigation:' + nav.dataset.bcTopicRoot + ':desktop';
            var desktopOpen = stored(key) !== 'collapsed';
            var mobileOpen = false;
            refresh = function () {
                var open = mobile.matches ? mobileOpen : desktopOpen;
                // Keep focused links reachable when a resize closes the panel.
                if (!open && controlled(button).contains(document.activeElement)) { button.focus(); }
                setExpanded(button, open);
                button.querySelector('span').textContent = open ? button.dataset.hideLabel :
                    (mobile.matches ? button.dataset.mobileLabel : button.dataset.showLabel);
                if (layout) { layout.classList.toggle('bc-topic-is-collapsed', !open); }
            };
            button.hidden = false;
            refresh();
            button.addEventListener('click', function () {
                if (mobile.matches) { mobileOpen = !mobileOpen; }
                else {
                    desktopOpen = !desktopOpen;
                    stored(key, desktopOpen ? 'expanded' : 'collapsed');
                }
                refresh();
            });
            onBreakpoint(refresh);
        }

        nav.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') { return; }
            var branch = event.target.closest('[data-bc-branch-panel]');
            if (branch) {
                var toggle = nav.querySelector('[aria-controls="' + branch.id + '"]');
                setExpanded(toggle, false);
                toggle.setAttribute('aria-label', toggle.dataset.showLabel);
                toggle.focus();
            } else if (disclosure) {
                disclosure.open = false;
                disclosure.querySelector('summary').focus();
            } else if (button && mobile.matches) {
                mobileOpen = false;
                refresh();
                button.focus();
            }
            event.stopPropagation();
        });
    });

    function hashTarget(hash) {
        try { return document.getElementById(decodeURIComponent(hash.replace(/^#/, ''))); }
        catch (error) { return null; }
    }

    document.querySelectorAll('[data-bc-page-contents]').forEach(function (nav) {
        var button = nav.querySelector('[data-bc-contents-toggle]');
        var panel = controlled(button);
        var heading = nav.querySelector('h2');
        var mobileOpen = false;
        var links = Array.from(nav.querySelectorAll('a[href^="#"]'));
        var entries = links.map(function (link) {
            return { link: link, target: hashTarget(link.hash) };
        }).filter(function (entry) { return entry.target; });

        function refresh() {
            var open = !mobile.matches || mobileOpen;
            var focused = document.activeElement;
            if (mobile.matches) { button.hidden = false; }
            if (!open && panel.contains(document.activeElement)) { button.focus(); }
            setExpanded(button, open);
            if (!mobile.matches && focused === button && entries.length) {
                entries[0].link.focus({ preventScroll: true });
            }
            button.hidden = !mobile.matches;
            heading.hidden = mobile.matches;
        }
        refresh();
        button.addEventListener('click', function () { mobileOpen = !mobileOpen; refresh(); });
        onBreakpoint(refresh);

        nav.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && mobile.matches) {
                mobileOpen = false;
                refresh();
                button.focus();
                event.stopPropagation();
            }
        });

        nav.addEventListener('click', function (event) {
            var link = event.target.closest('a[href^="#"]');
            if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) { return; }
            var target = hashTarget(link.hash);
            if (!target) { return; }
            // Collapse before native anchor navigation calculates the destination.
            if (mobile.matches) { mobileOpen = false; refresh(); }
            window.requestAnimationFrame(function () {
                if (!target.hasAttribute('tabindex')) {
                    target.setAttribute('tabindex', '-1');
                    target.addEventListener('blur', function () { target.removeAttribute('tabindex'); }, { once: true });
                }
                target.focus({ preventScroll: true });
                // Refine the native jump after the disclosure's layout change.
                target.scrollIntoView({ block: 'start', behavior: 'instant' });
            });
        });
        if (nav.classList.contains('bc-page-contents-sticky')) {
            contents.push({ nav: nav, entries: entries, active: null });
        }
    });

    var scheduled = false;
    function updatePosition() {
        scheduled = false;
        var top = 24;
        var admin = document.getElementById('wpadminbar');
        if (admin && window.getComputedStyle(admin).position === 'fixed') {
            top = Math.max(top, admin.getBoundingClientRect().bottom + 24);
        }
        var header = document.querySelector('.wp-site-blocks > header');
        if (header) {
            var position = window.getComputedStyle(header).position;
            var rect = header.getBoundingClientRect();
            if ((position === 'fixed' || position === 'sticky') && rect.top <= top) { top = Math.max(top, rect.bottom + 24); }
        }
        document.documentElement.style.setProperty('--bc-sticky-offset', top + 'px');
        var activationLine = top + (parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0) + 8;
        contents.forEach(function (index) {
            if (!index.entries.length) { return; }
            var active = index.entries[0];
            index.entries.forEach(function (entry) {
                if (entry.target.getBoundingClientRect().top <= activationLine) { active = entry; }
            });
            if (index.active === active) { return; }
            index.entries.forEach(function (entry) { entry.link.removeAttribute('aria-current'); });
            active.link.setAttribute('aria-current', 'location');
            index.active = active;
            // Scroll only the index's own overflow container, preserving page position.
            if (!mobile.matches && !index.nav.contains(document.activeElement)) {
                var container = index.nav.closest('.bc-reference-sidebar') || index.nav;
                var linkRect = active.link.getBoundingClientRect();
                var containerRect = container.getBoundingClientRect();
                if (linkRect.bottom > containerRect.bottom) { container.scrollTop += linkRect.bottom - containerRect.bottom; }
                else if (linkRect.top < containerRect.top) { container.scrollTop -= containerRect.top - linkRect.top; }
            }
        });
    }
    function schedule() {
        if (!scheduled) { scheduled = true; window.requestAnimationFrame(updatePosition); }
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    document.addEventListener('toggle', schedule, true);
    window.addEventListener('load', schedule);
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(schedule); }
    updatePosition();
})();
