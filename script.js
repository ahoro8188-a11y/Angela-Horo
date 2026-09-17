// Angela Horo — portfolio
// Splash, mobile navigation, and progressive scroll reveal.

(function () {
  var splash = document.getElementById('splash');
  if (!splash) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hidden = false;

  function hide() {
    if (hidden) return;
    hidden = true;
    splash.classList.add('hide');
    document.body.classList.remove('await-intro');
    document.body.classList.add('intro-done');
  }

  if (reduce) {
    hide();
    return;
  }

  document.body.classList.add('await-intro');
  window.addEventListener('load', function () {
    setTimeout(hide, 2200);
  });
  setTimeout(hide, 3600);
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
    if (nav.classList.contains('open')) closeNav();
    else openNav();
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeNav();
  });
})();

(function () {
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
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    targets.forEach(function (el) {
      el.classList.add('pre-reveal');
      observer.observe(el);
    });

    setTimeout(function () {
      targets.forEach(function (el) { el.classList.remove('pre-reveal'); });
    }, 4000);
  } catch (e) {
    // CSS default keeps content visible.
  }
})();
