// This must run first: CSS only hides .reveal content once this class
// is present, so if this script never runs at all, nothing gets hidden.
document.body.classList.add('js');

// Navbar: transparent over the hero photo, solid once scrolled past it
const navbarEl = document.querySelector('.navbar');
if (navbarEl) {
  const toggleNavbar = () => {
    navbarEl.classList.toggle('scrolled', window.scrollY > 40);
  };
  toggleNavbar();
  window.addEventListener('scroll', toggleNavbar, { passive: true });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Respect the person's motion preference. If they've asked for reduced
// motion, skip the whole reveal/parallax system and show everything as-is.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.body.classList.add('no-animate');
}

// Count a number up from 0 to its target once, the first time it's revealed.
function animateCount(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = 'true';

  const target = parseFloat(el.dataset.count);
  if (Number.isNaN(target)) return;
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = value.toFixed(decimals) + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toFixed(decimals) + suffix;
    }
  }
  requestAnimationFrame(tick);
}

// Scroll-reveal: fade/slide in `.reveal` blocks and stagger the children
// of `.reveal-group` containers as they enter the viewport.
const revealTargets = document.querySelectorAll('.reveal, .reveal-group');

function revealElement(el) {
  if (el.classList.contains('reveal-group')) {
    Array.from(el.children).forEach((child, i) => {
      child.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
    });
  }
  el.classList.add('is-visible');
  el.querySelectorAll('[data-count]').forEach(animateCount);
}

if (!prefersReducedMotion && 'IntersectionObserver' in window && revealTargets.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealElement(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  revealTargets.forEach((el) => observer.observe(el));

  // Anything already on screen at load (e.g. the hero caption, which
  // sits pinned near the bottom of the first viewport) should appear
  // right away rather than waiting on the observer's first callback.
  revealTargets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      revealElement(el);
      observer.unobserve(el);
    }
  });
} else {
  // No IntersectionObserver support, or motion is reduced: just show everything.
  revealTargets.forEach(revealElement);
}

// Subtle hero parallax on scroll — the image is sized taller than its
// frame (see .hero-banner in CSS) so this never reveals empty space.
const heroBanner = document.querySelector('.hero-banner');
if (heroBanner && !prefersReducedMotion) {
  const applyParallax = () => {
    const offset = Math.min(window.scrollY * 0.15, 60);
    heroBanner.style.transform = `translateY(${offset}px)`;
  };
  applyParallax();
  window.addEventListener('scroll', applyParallax, { passive: true });
}
