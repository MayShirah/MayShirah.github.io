/* ============================================
   MAY SHIRAH — Portfolio JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.pageYOffset > 50);
  }, { passive: true });

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
    document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('active');
    links.classList.remove('active');
    document.body.style.overflow = '';
  }));

  // Smooth scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
      }
    });
  });

  // Scroll-triggered reveals with stagger
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(idx * 70, 350)}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach(el => observer.observe(el));

  // Counter animation for hero metrics
  const metrics = document.querySelectorAll('.hero__metric-num');
  let counted = false;
  const metricsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        metrics.forEach(el => {
          const text = el.textContent;
          const match = text.match(/([\d.]+)/);
          if (!match) return;
          const target = parseFloat(match[0]);
          const isFloat = text.includes('.');
          const suffix = text.replace(match[0], '');
          const duration = 1200;
          const start = performance.now();
          (function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = isFloat ? (target * eased).toFixed(1) : Math.round(target * eased);
            el.textContent = val + suffix;
            if (p < 1) requestAnimationFrame(tick);
          })(start);
        });
      }
    });
  }, { threshold: 0.5 });
  metrics.forEach(m => metricsObs.observe(m));
});
