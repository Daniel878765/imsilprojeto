/* =========================================
   IMSIL – main.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  /* ---- Hamburger menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const navUl     = document.querySelector('nav ul');

  hamburger?.addEventListener('click', () => {
    navUl.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navUl.classList.contains('open'));
  });

  navUl?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navUl.classList.remove('open'));
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      // open clicked (unless it was already open)
      if (!isOpen) item.classList.add('open');

      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  /* ---- Back to top ---- */
  const backTop = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backTop?.classList.add('visible');
    else backTop?.classList.remove('visible');
  }, { passive: true });

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Contact form (demo) ---- */
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✅  Mensagem enviada!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });

  /* ---- Scroll-reveal animation ---- */
  const revealEls = document.querySelectorAll(
    '.segment-card, .course-card, .inclusion-card, .faq-item, .feature-item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms`;
    revealObserver.observe(el);
  });

});
