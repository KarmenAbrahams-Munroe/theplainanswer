(function () {
    'use strict';
    var sequence = 0, instances = [];
    var labels = window.bcPracticeAudienceTabsLabels || { group: 'Audience guidance', tab: 'Tab' };
    function uniqueId(prefix) {
        var id;
        do { id = prefix + (++sequence); } while (document.getElementById(id));
        return id;
    }
    document.querySelectorAll('.bc-audience-tabs').forEach(function (root) {
        if (root.classList.contains('is-enhanced')) { return; }
        var panels = Array.from(root.children).filter(function (child) { return child.classList.contains('bc-audience-panel'); });
        if (panels.length < 2) { return; }
        var list = document.createElement('div'), active = 0;
        list.className = 'bc-audience-tablist';
        list.setAttribute('role', 'tablist');
        list.setAttribute('aria-label', (root.dataset.tabLabel || '').trim() || labels.group);
        var tabs = panels.map(function (panel, index) {
            var heading = Array.from(panel.children).find(function (child) { return child.classList.contains('bc-audience-panel-title'); });
            var tab = document.createElement('button');
            tab.type = 'button'; tab.className = 'bc-audience-tab'; tab.id = uniqueId('bc-audience-tab-');
            tab.textContent = (heading && heading.textContent.trim()) || labels.tab + ' ' + (index + 1);
            if (!panel.id || document.getElementById(panel.id) !== panel) { panel.id = uniqueId('bc-audience-panel-'); }
            tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', panel.id);
            panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', tab.id); panel.tabIndex = 0;
            list.appendChild(tab); return tab;
        });
        function roving(index) {
            tabs.forEach(function (tab, i) { tab.tabIndex = i === index ? 0 : -1; });
        }
        function activate(index) {
            active = index;
            tabs.forEach(function (tab, i) { tab.setAttribute('aria-selected', String(i === index)); panels[i].hidden = i !== index; });
            roving(index);
        }
        function orientation() {
            list.setAttribute('aria-orientation', window.getComputedStyle(list).flexDirection === 'column' ? 'vertical' : 'horizontal');
        }
        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () { activate(index); });
            tab.addEventListener('keydown', function (event) {
                var vertical = list.getAttribute('aria-orientation') === 'vertical', next;
                if ((!vertical && event.key === 'ArrowRight') || (vertical && event.key === 'ArrowDown')) { next = (index + 1) % tabs.length; }
                else if ((!vertical && event.key === 'ArrowLeft') || (vertical && event.key === 'ArrowUp')) { next = (index + tabs.length - 1) % tabs.length; }
                else if (event.key === 'Home') { next = 0; }
                else if (event.key === 'End') { next = tabs.length - 1; }
                else { return; }
                event.preventDefault(); roving(next); tabs[next].focus();
            });
        });
        list.addEventListener('focusout', function (event) { if (!list.contains(event.relatedTarget)) { roving(active); } });
        root.insertBefore(list, root.firstChild); root.classList.add('is-enhanced'); activate(0); orientation();
        if (window.ResizeObserver) { new ResizeObserver(orientation).observe(root); }
        else { window.addEventListener('resize', orientation); }
        instances.push({ panels: panels, activate: activate });
    });
    function revealFragment() {
        var target;
        try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (error) { return; }
        if (!target) { return; }
        var changed = false;
        instances.forEach(function (instance) {
            instance.panels.forEach(function (panel, index) { if (panel.hidden && panel.contains(target)) { instance.activate(index); changed = true; } });
        });
        if (changed) { window.requestAnimationFrame(function () { target.scrollIntoView({ block: 'start', behavior: 'instant' }); }); }
    }
    revealFragment(); window.addEventListener('hashchange', revealFragment);
})();
