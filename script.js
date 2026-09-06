// Angela Horo — HR Portfolio
// Handles the mobile nav toggle. That's it — the hero's entrance
// and the marquee scroll are both pure CSS, no JS needed for those.

(function () {
  // Splash screen (home page only) — fade out once the page is ready.
  var splash = document.getElementById('splash');
  if (splash) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        splash.classList.add('hide');
      }, 350);
    });
    // Safety net: if 'load' already fired before this script ran, or
    // takes unusually long, don't leave the splash stuck on screen.
    setTimeout(function () { splash.classList.add('hide'); }, 2000);
  }
})();

(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  function openNav() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close the menu after tapping a link, so it doesn't stay open
  // when the page navigates or jumps to #contact.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Collapse back to the desktop layout if the window is resized
  // past the mobile breakpoint while the menu is open.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeNav();
  });
})();

(function () {
  // Progressive enhancement only: elements are visible by default
  // (see CSS). JS marks them pre-reveal (hidden) and immediately
  // observes them so they animate in — but if anything here fails,
  // the CSS default keeps everything visible regardless.
  if (!('IntersectionObserver' in window)) return;

  try {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pre-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
      el.classList.add('pre-reveal');
      observer.observe(el);
    });

    // Safety net in case an observed element never intersects for
    // some reason (e.g. zero-height section) — never leave it hidden.
    setTimeout(function () {
      targets.forEach(function (el) { el.classList.remove('pre-reveal'); });
    }, 4000);
  } catch (e) {
    // If anything above throws, do nothing further — CSS default
    // (fully visible, no pre-reveal class applied) already holds.
  }
})();
