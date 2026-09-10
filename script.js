// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Contact form — submits to contact.php, which saves it to the database
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  formStatus.style.color = '';
  formStatus.textContent = 'Sending...';

  try {
    const res = await fetch('contact.php', {
      method: 'POST',
      body: new FormData(contactForm),
    });
    const data = await res.json();

    if (data.success) {
      formStatus.textContent = data.message;
      contactForm.reset();
    } else {
      formStatus.style.color = '#ff3d3d';
      formStatus.textContent = data.error || 'Something went wrong. Please try again.';
    }
  } catch (err) {
    formStatus.style.color = '#ff3d3d';
    formStatus.textContent = 'Could not reach the server. Please try again later.';
  } finally {
    submitBtn.disabled = false;
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar shrink on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
