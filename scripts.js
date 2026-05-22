// Same-page anchor smooth scroll — only catches links starting with "#" (in-page anchors).
// Cross-page links like "index.html#practice" are left to the browser's default behavior.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const nav = document.getElementById('nav');
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
      const mobileNav = document.getElementById('mobileNav');
      if (mobileNav) mobileNav.classList.remove('open');
    }
  });
});

// Nav scrolled state — adds blur backdrop + border once user scrolls past 60px
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile dropdown nav
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const navBackdrop = document.getElementById('navBackdrop');

function positionDropdown() {
  if (!mobileNav || !nav) return;
  mobileNav.style.top = nav.offsetHeight + 'px';
}

function openMobileNav() {
  positionDropdown();
  mobileNav.classList.add('open');
  navBackdrop.classList.add('open');
  menuBtn.classList.add('open');
}

function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  navBackdrop.classList.remove('open');
  menuBtn.classList.remove('open');
}

if (menuBtn && mobileNav && navBackdrop) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
  });
  navBackdrop.addEventListener('click', closeMobileNav);
  window.addEventListener('resize', () => {
    if (mobileNav.classList.contains('open')) positionDropdown();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileNav();
  });
}

// Scroll-reveal — fades elements in as they enter the viewport
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}
