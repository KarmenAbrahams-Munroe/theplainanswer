(function () {
    'use strict';
    var groupSelector = '.bc-accordion-group';
    var sequence = 0;
    function uniqueId() {
        var id;
        do { id = 'bc-accordion-item-' + (++sequence); } while (document.getElementById(id));
        return id;
    }

    document.querySelectorAll(groupSelector).forEach(function (group) {
        var details = Array.from(group.querySelectorAll('details')).filter(function (item) {
            var ancestor = item.parentElement.closest('details');
            return item.closest(groupSelector) === group && (!ancestor || !group.contains(ancestor));
        });
        var controls = Array.from(group.querySelectorAll('[data-bc-accordion-controls]')).filter(function (item) {
            var ancestor = item.closest('details');
            return item.closest(groupSelector) === group && (!ancestor || !group.contains(ancestor));
        })[0];
        // Named Details sets are exclusive. Preserve that native behaviour.
        if (!controls || details.length < 2 || details.some(function (item) { return !!item.getAttribute('name'); })) { return; }
        var ids = details.map(function (item) { if (!item.id) { item.id = uniqueId(); } return item.id; }).join(' ');
        controls.querySelectorAll('button').forEach(function (button) { button.setAttribute('aria-controls', ids); });
        controls.hidden = false;
        controls.addEventListener('click', function (event) {
            var button = event.target.closest('button');
            if (!button || !controls.contains(button)) { return; }
            var open = button.hasAttribute('data-bc-expand-all');
            details.forEach(function (item) { item.open = open; });
            var status = controls.querySelector('[data-bc-accordion-status]');
            status.textContent = open ? controls.dataset.expandedMessage : controls.dataset.collapsedMessage;
        });
    });

    function revealFragment() {
        var target;
        try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); }
        catch (error) { return; }
        if (!target) { return; }
        var parent = target.closest('details');
        var changed = false;
        while (parent) {
            if (!parent.open) { parent.open = true; changed = true; }
            parent = parent.parentElement.closest('details');
        }
        if (changed) { window.requestAnimationFrame(function () { target.scrollIntoView({ block: 'start', behavior: 'instant' }); }); }
    }
    revealFragment();
    window.addEventListener('hashchange', revealFragment);

    var printState = null;
    window.addEventListener('beforeprint', function () {
        if (printState) { return; }
        printState = Array.from(document.querySelectorAll(groupSelector + ' details')).map(function (item) {
            return { item: item, open: item.open, name: item.getAttribute('name') };
        });
        printState.forEach(function (entry) { entry.item.removeAttribute('name'); });
        printState.forEach(function (entry) { entry.item.open = true; });
    });
    window.addEventListener('afterprint', function () {
        if (!printState) { return; }
        printState.forEach(function (entry) { entry.item.open = false; });
        printState.forEach(function (entry) { if (entry.name !== null) { entry.item.setAttribute('name', entry.name); } });
        printState.forEach(function (entry) { entry.item.open = entry.open; });
        printState = null;
    });
})();

(function () {
    'use strict';
    var sequence = 0, instances = [];
    function uniqueId(prefix) {
        var id;
        do { id = prefix + (++sequence); } while (document.getElementById(id));
        return id;
    }
    document.querySelectorAll('.bc-resource-tabs').forEach(function (root) {
        var panels = Array.from(root.children).filter(function (child) { return child.classList.contains('bc-tab-panel'); });
        if (panels.length < 2) return;
        var list = document.createElement('div');
        list.className = 'bc-resource-tablist';
        list.setAttribute('role', 'tablist');
        list.setAttribute('aria-label', (root.dataset.tabLabel || '').trim() || 'Resource categories');
        var tabs = panels.map(function (panel, index) {
            var heading = Array.from(panel.children).find(function (child) { return child.classList.contains('bc-tab-panel-title'); });
            var tab = document.createElement('button');
            tab.type = 'button'; tab.className = 'bc-resource-tab'; tab.id = uniqueId('bc-resource-tab-');
            tab.textContent = (heading && heading.textContent.trim()) || 'Resource group ' + (index + 1);
            if (!panel.id) panel.id = uniqueId('bc-resource-panel-');
            tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', panel.id);
            panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', tab.id); panel.tabIndex = 0;
            list.appendChild(tab); return tab;
        });
        function activate(index) {
            tabs.forEach(function (tab, i) {
                tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1;
                panels[i].hidden = i !== index;
            });
        }
        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () { activate(index); });
            tab.addEventListener('keydown', function (event) {
                var next;
                if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
                else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
                else if (event.key === 'Home') next = 0;
                else if (event.key === 'End') next = tabs.length - 1;
                else return;
                event.preventDefault(); tabs[next].focus();
            });
        });
        root.insertBefore(list, root.firstChild); root.classList.add('is-enhanced'); activate(0);
        instances.push({ panels: panels, activate: activate });
    });
    function revealFragment() {
        var target;
        try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (error) { return; }
        if (!target) return;
        var changed = false;
        instances.forEach(function (instance) {
            instance.panels.forEach(function (panel, index) {
                if (panel.hidden && panel.contains(target)) { instance.activate(index); changed = true; }
            });
        });
        if (changed) window.requestAnimationFrame(function () { target.scrollIntoView({ block: 'start', behavior: 'instant' }); });
    }
    revealFragment(); window.addEventListener('hashchange', revealFragment);
})();
