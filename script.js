/* ============================================
   MAY SHIRAH — Portfolio JS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Nav scroll ---- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---- Mobile menu ---- */
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('navMenu');
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('active');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) window.scrollTo({ top: t.offsetTop - 60, behavior: 'smooth' });
    });
  });

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const idx = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = Math.min(idx * 60, 300) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  reveals.forEach(el => observer.observe(el));

  /* ---- Image fallback handling ---- */
  document.querySelectorAll('.work-card-img img, .concept-img img, .hero-img-wrap img').forEach(img => {
    img.addEventListener('error', function () {
      this.style.display = 'none';
      const fallback = this.parentElement.querySelector('.work-card-img-fallback, .concept-fallback');
      if (fallback) {
        fallback.style.display = 'flex';
      }
    });
    // Also handle already-broken images (cached)
    if (img.complete && img.naturalWidth === 0) {
      img.style.display = 'none';
      const fallback = img.parentElement.querySelector('.work-card-img-fallback, .concept-fallback');
      if (fallback) fallback.style.display = 'flex';
    }
  });
});
