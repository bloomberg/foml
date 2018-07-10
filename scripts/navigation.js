(function () {
    'use strict';
    var nav = document.querySelector('body > nav');
    var sections = Array.prototype.slice.call(document.querySelectorAll('body > section'));
    var sectionsSelector = sections.map(function (s) { return '#' + s.id; }).join(', ');

    window.addEventListener('hashchange', setSelectedLink);
    window.addEventListener('scroll', throttle(setHashFromScroll));

    if (!window.location.hash) {
        setHashFromScroll();
    }
    setSelectedLink();

    function setSelectedLink() {
        var selected = nav.querySelector('a.selected');
        if (selected) {
            selected.classList.remove('selected');
        }

        var currentNode = document.querySelector(window.location.hash);
        if (!currentNode) {
            return;
        }
        var closestSection = currentNode.closest(sectionsSelector);
        if (!closestSection) {
            return;
        }
        nav.querySelector('a[href="#' + closestSection.id + '"]').classList.add('selected');
    }

    function setHashFromScroll() {
        // Don't override any currently-visible link targets that aren't sections (e.g., if the user clicked on a lecture permalink)
        var currentLinkTarget = location.hash && document.querySelector(location.hash);
        if (currentLinkTarget && sections.indexOf(currentLinkTarget) === -1) {
            if (isVisible(currentLinkTarget)) {
                return;
            }
        }

        var sectionFractions = sections.map(fractionOfScreenInThisEl);
        var mostVisibleSectionIndex = 0;
        for (var i = 1; i < sections.length; ++i) {
            var section = sections[i];
            if (sectionFractions[i] > sectionFractions[mostVisibleSectionIndex]) {
                mostVisibleSectionIndex = i;
            }
        }
        var mostVisibleSectionIndex = sections[mostVisibleSectionIndex].id;
        history.replaceState(null, '', '#' + mostVisibleSectionIndex);
        setSelectedLink();
    }

    function isVisible(el) {
        var rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function fractionOfScreenInThisEl(el) {
        var rect = el.getBoundingClientRect();
        var visibleTop = clamp(rect.top, 0, window.innerHeight);
        var visibleBottom = clamp(rect.bottom, 0, window.innerHeight);
        var visibleHeight = visibleBottom - visibleTop;

        return visibleHeight / window.innerHeight;
    }

    function clamp(x, min, max) {
        return x < min ? min : x > max ? max : x;
    }

    function throttle(f) {
        var scheduled = false;

        return function () {
            if (scheduled) {
                return;
            }

            scheduled = true;
            setTimeout(function () {
                scheduled = false;
                f();
            }, 100);
        };
    }
}());
