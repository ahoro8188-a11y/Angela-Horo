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
