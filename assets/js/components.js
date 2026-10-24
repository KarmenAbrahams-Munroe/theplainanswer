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
