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
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
