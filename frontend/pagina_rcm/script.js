/* ============================================================
   🔗 ENLACE AL SISTEMA DE GESTIÓN (botón "Iniciar sesión")
   ------------------------------------------------------------
   Cambia SOLO la línea de abajo (LOGIN_URL) por la ruta real
   donde vas a publicar tu sistema de gestión (la SPA de Vite).

   Ejemplos según cómo lo despliegues:
   - Mismo hosting, en una subcarpeta:   "./sistema/index.html"
   - Mismo hosting, en la raíz:          "./app/index.html"
   - Un subdominio aparte:               "https://gestion.redcaminodemaria.org"
   - Un dominio totalmente distinto:     "https://app.redcaminodemaria.com"
   ============================================================ */
const LOGIN_URL = "./sistema/index.html";

// Aplica LOGIN_URL a todos los botones/enlaces de "Iniciar sesión"
document.querySelectorAll('.js-login-link').forEach(link => {
  link.setAttribute('href', LOGIN_URL);
});

// Navbar scroll state
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile menu
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}));

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(el => counterIO.observe(el));

// Contact form (demo only — sin backend conectado)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('¡Gracias por escribirnos! Conecta este formulario a tu correo o CRM para recibir los mensajes.');
  e.target.reset();
});
