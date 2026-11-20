(function () {
    'use strict';

    var desktop = window.matchMedia('(min-width: 901px)');
    var controllers = [], queued = false;
    function targetFor(hash) {
        try { return document.getElementById(decodeURIComponent(hash.replace(/^#/, ''))); }
        catch (error) { return null; }
    }
    function focusVisible(element) {
        if (!element) { return; }
        element.focus({ preventScroll: true });
        var rect = element.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) { element.scrollIntoView({ block: 'nearest' }); }
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
        var pageDetails = pagePane && pagePane.querySelector('details');
        var pageLabel = pagePane && pagePane.querySelector('[data-reading-page-title]');
        var sectionPane = document.getElementById(host.dataset.sectionId);
        var sectionHome = sectionPane && sectionPane.closest('[data-reading-section-home]');
        var sectionDetails = sectionPane && sectionPane.querySelector('details');
        var sectionSummary = sectionDetails && sectionDetails.querySelector('summary');
        var popup = sectionPane && sectionPane.querySelector('[data-reading-section-popup]');
        var sectionLinks = sectionPane && sectionPane.querySelector('.bc-reading-section-links');
        var sectionWasOpen = false;
        var closeRow = sectionPane && sectionPane.querySelector('[data-reading-close-row]');
        var closeButton = sectionPane && sectionPane.querySelector('[data-reading-section-close]');
        var jump = host.querySelector('[data-reading-section-jump]');
        var isDesktop = false, placed = false, pageMobileOpen = false, sectionMobileOpen = false, desktopSectionOpen = false, active = null;
        var entries = pagePane ? Array.from(pagePane.querySelectorAll('a[href^="#"]')).map(function (link) {
            return { link: link, target: targetFor(link.hash) };
        }).filter(function (entry) { return entry.target; }) : [];

        if (!sectionPane && jump) { jump.remove(); jump = null; }
        if (!pagePane && !sectionPane) { host.hidden = true; return; }
        host.classList.toggle('has-page-index', Boolean(pagePane));

        function positionPopup() {
            if (!isDesktop || !sectionDetails || !sectionDetails.open || !popup) { return; }
            if (window.innerHeight <= 420) { sectionPane.classList.remove('opens-above'); return; }
            var rect = sectionSummary.getBoundingClientRect();
            var below = window.innerHeight - rect.bottom - 24, above = rect.top - 24;
            var up = below < 240 && above > below;
            sectionPane.classList.toggle('opens-above', up);
            popup.style.setProperty('--bc-section-popup-height', Math.max(100, Math.floor(up ? above : below)) + 'px');
        }
        function sizeNavigation() {
            if (isDesktop && layout) {
                var title = layout.querySelector('.bc-reading-title'), body = layout.querySelector('.bc-reading-body');
                if (title && body) {
                    var gap = parseFloat(getComputedStyle(layout).rowGap) || 0;
                    var value = Math.ceil(Math.max(180, title.getBoundingClientRect().height + body.getBoundingClientRect().height + gap)) + 'px';
                    if (host.style.getPropertyValue('--bc-reading-content-height') !== value) { host.style.setProperty('--bc-reading-content-height', value); }
                }
            }
            positionPopup();
        }
        function revealSectionItem(item) {
            if (!isDesktop || !sectionLinks || !item || window.innerHeight <= 420) { return; }
            var overview = sectionLinks.querySelector('.bc-section-overview');
            if (overview && overview.contains(item)) { return; }
            var bounds = sectionLinks.getBoundingClientRect(), rect = item.getBoundingClientRect();
            var top = bounds.top + (overview ? overview.getBoundingClientRect().height : 0) + 8;
            if (rect.bottom > bounds.bottom) { sectionLinks.scrollTop += rect.bottom - bounds.bottom + 4; }
            if (item.getBoundingClientRect().top < top) { sectionLinks.scrollTop -= top - item.getBoundingClientRect().top; }
        }
        function syncSection() {
            var open = Boolean(isDesktop && sectionDetails && sectionDetails.open);
            var newlyOpened = open && !sectionWasOpen;
            sectionWasOpen = open;
            host.classList.toggle('is-section-open', open);
            if (open && pagePane && pagePane.contains(document.activeElement)) { focusVisible(sectionSummary); }
            if (pagePane) {
                if (open) { pagePane.setAttribute('aria-hidden', 'true'); }
                else { pagePane.removeAttribute('aria-hidden'); }
            }
            if (closeRow) { closeRow.hidden = !isDesktop; }
            sizeNavigation();
            if (newlyOpened && sectionLinks) {
                var focusedItem = sectionLinks.contains(document.activeElement) ? document.activeElement : sectionLinks.querySelector('[aria-current=page]');
                revealSectionItem(focusedItem);
            }
            schedule();
        }
        function closeSection(returnFocus) {
            if (!sectionDetails) { return; }
            sectionDetails.open = false;
            if (isDesktop) { desktopSectionOpen = false; }
            else { sectionMobileOpen = false; }
            syncSection();
            if (returnFocus) { focusVisible(sectionSummary); }
        }

        if (pageDetails) {
            pageDetails.addEventListener('toggle', function () {
                if (!isDesktop) { pageMobileOpen = pageDetails.open; }
                schedule();
            });
        }
        if (sectionDetails) {
            sectionDetails.addEventListener('toggle', function () {
                if (isDesktop) { desktopSectionOpen = sectionDetails.open; }
                else { sectionMobileOpen = sectionDetails.open; }
                syncSection();
            });
            sectionPane.querySelectorAll('[data-bc-branch-toggle]').forEach(function (button) {
                var panel = document.getElementById(button.getAttribute('aria-controls'));
                if (!panel) { return; }
                function expand(open) {
                    panel.hidden = !open;
                    button.setAttribute('aria-expanded', String(open));
                    button.setAttribute('aria-label', open ? button.dataset.hideLabel : button.dataset.showLabel);
                }
                expand(button.dataset.bcOpen === 'true'); button.hidden = false;
                button.addEventListener('click', function () { expand(button.getAttribute('aria-expanded') !== 'true'); });
            });
            sectionPane.addEventListener('keydown', function (event) {
                if (event.key !== 'Escape' || !sectionDetails.open) { return; }
                event.preventDefault(); event.stopPropagation(); closeSection(true);
            });
            sectionLinks.addEventListener('focusin', function (event) { revealSectionItem(event.target); });
            sectionPane.addEventListener('focusout', function () {
                window.requestAnimationFrame(function () {
                    if (isDesktop && sectionDetails.open && !sectionPane.contains(document.activeElement)) { closeSection(false); }
                });
            });
            document.addEventListener('pointerdown', function (event) {
                if (!isDesktop || !sectionDetails.open || sectionPane.contains(event.target)) { return; }
                var focusedInside = popup.contains(document.activeElement);
                var focusableTarget = event.target.closest('a,button,input,select,textarea,summary,[tabindex]');
                closeSection(focusedInside && !focusableTarget);
            });
            if (closeButton) { closeButton.addEventListener('click', function () { closeSection(true); }); }
        }

        function place() {
            var focused = document.activeElement;
            var focusPage = Boolean(pagePane && pagePane.contains(focused));
            var focusSection = Boolean(sectionPane && sectionPane.contains(focused));
            if (placed) {
                if (isDesktop) { desktopSectionOpen = Boolean(sectionDetails && sectionDetails.open); }
                else {
                    pageMobileOpen = Boolean(pageDetails && pageDetails.open);
                    sectionMobileOpen = Boolean(sectionDetails && sectionDetails.open);
                }
            }
            isDesktop = desktop.matches; placed = true;
            host.classList.toggle('is-desktop-navigation', isDesktop);
            if (layout) { layout.classList.add('has-reading-navigation'); }
            if (pageLabel) { pageLabel.hidden = !isDesktop; }
            if (isDesktop) {
                if (sectionPane && sectionPane.parentElement !== host) { host.insertBefore(sectionPane, host.firstChild); }
                if (focusPage) { desktopSectionOpen = false; }
                if (focusSection && focused !== sectionSummary) { desktopSectionOpen = true; }
                if (pageDetails) { pageDetails.open = true; }
                if (sectionDetails) { sectionDetails.open = desktopSectionOpen; }
                syncSection();
                if (focusPage && focused.tagName === 'SUMMARY') { focusVisible(pagePane.querySelector('a')); }
                else if (jump && focused === jump) { focusVisible(sectionSummary); }
                else if (focusPage || focusSection) { focusVisible(focused); if (focusSection) { revealSectionItem(focused); } }
            } else {
                if (focusPage) { pageMobileOpen = true; }
                if (focusSection && focused !== sectionSummary) { sectionMobileOpen = true; }
                if (sectionPane && sectionHome && sectionPane.parentElement !== sectionHome) { sectionHome.appendChild(sectionPane); }
                if (pageDetails) { pageDetails.open = pageMobileOpen; }
                if (sectionDetails) { sectionDetails.open = sectionMobileOpen; }
                if (sectionPane) { sectionPane.classList.remove('opens-above'); }
                syncSection();
                if (closeButton && focused === closeButton) { focusVisible(sectionSummary); }
                else if (focusPage || focusSection) { focusVisible(focused); }
            }
            schedule();
        }

        if (jump && sectionDetails) {
            jump.addEventListener('click', function () {
                sectionDetails.open = true; sectionMobileOpen = true;
                window.requestAnimationFrame(function () { focusVisible(sectionSummary); });
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
                    target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'start' });
                });
            });
            pagePane.addEventListener('keydown', function (event) {
                if (event.key === 'Escape' && !isDesktop) { pageDetails.open = false; focusVisible(pageDetails.querySelector('summary')); }
            });
        }

        function track() {
            sizeNavigation();
            if (!entries.length) { return; }
            var rootStyle = getComputedStyle(document.documentElement);
            var offset = parseFloat(rootStyle.getPropertyValue('--bc-sticky-offset')) || 24;
            var padding = parseFloat(rootStyle.scrollPaddingTop) || 0, current = entries[0];
            entries.forEach(function (entry) {
                var margin = parseFloat(getComputedStyle(entry.target).scrollMarginTop) || 0;
                if (entry.target.getBoundingClientRect().top <= Math.max(offset + 16, padding + margin + 2)) { current = entry; }
            });
            var last = entries[entries.length - 1], scroller = document.scrollingElement || document.documentElement;
            if (Math.ceil(window.scrollY + window.innerHeight) >= scroller.scrollHeight - 2 && last.target.getBoundingClientRect().top < window.innerHeight) { current = last; }
            if (active !== current) {
                entries.forEach(function (entry) { entry.link.removeAttribute('aria-current'); });
                current.link.setAttribute('aria-current', 'location'); active = current;
            }
            if (isDesktop && !host.classList.contains('is-section-open') && !pagePane.contains(document.activeElement)) {
                var rect = current.link.getBoundingClientRect(), bounds = pageDetails.getBoundingClientRect();
                if (rect.bottom > bounds.bottom) { pageDetails.scrollTop += rect.bottom - bounds.bottom; }
                else if (rect.top < bounds.top) { pageDetails.scrollTop -= bounds.top - rect.top; }
            }
        }
        function sectionHash() {
            if (sectionDetails && targetFor(window.location.hash) === sectionSummary) {
                sectionDetails.open = true;
                if (isDesktop) { desktopSectionOpen = true; syncSection(); }
                else { sectionMobileOpen = true; }
            }
        }
        if (desktop.addEventListener) { desktop.addEventListener('change', place); }
        else { desktop.addListener(place); }
        window.addEventListener('hashchange', sectionHash);
        controllers.push({ track: track }); place(); sectionHash();
        if (window.ResizeObserver && layout) {
            var observer = new ResizeObserver(schedule);
            layout.querySelectorAll('.bc-reading-title, .bc-reading-body').forEach(function (element) { observer.observe(element); });
        }
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule); window.addEventListener('hashchange', schedule); window.addEventListener('load', schedule);
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(schedule); }
    schedule();
})();
