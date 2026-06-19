// ============================================
// MAIN.JS - Navigation, Animations, Utilities
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initParticles();
  initSkillBars();
  initFAQ();
  highlightActiveNav();
  initGlobalContactButton();
});

// ============================================
// NAVBAR
// ============================================

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Scroll handler
  window.addEventListener('scroll', () => {
    if (navbar.classList.contains('dark')) {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }
}

function highlightActiveNav() {
  const path = window.location.pathname;
  const allLinks = document.querySelectorAll('.navbar-links a, .mobile-menu a');

  allLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHome = (href === 'index.html' || href === '/' || href === '../index.html') &&
                   (path.endsWith('index.html') || path === '/' || path.endsWith('/'));
    const isMatch = path.includes(href.replace('../', '').replace('.html', '')) && href !== 'index.html' && href !== '../index.html';

    if (isHome || isMatch) {
      link.classList.add('active');
    }
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ============================================
// SKILL BARS
// ============================================

function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.dataset.pct || '0';
        setTimeout(() => {
          bar.style.width = pct + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ============================================
// PARTICLES (Hero)
// ============================================

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.4 - 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.life > this.maxLife || this.y < 0) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 146, 42, ${this.opacity * (1 - this.life / this.maxLife)})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) {
    const p = new Particle();
    p.life = Math.floor(Math.random() * p.maxLife);
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  animate();
}

// ============================================
// FAQ
// ============================================

function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ============================================
// PRICING TOGGLE
// ============================================

function initPricingToggle() {
  const btns = document.querySelectorAll('.pricing-toggle-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Future: swap pricing content based on toggle
    });
  });
}

document.addEventListener('DOMContentLoaded', initPricingToggle);

// ============================================
// SMOOTH SCROLL for anchor links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// GLOBAL CONTACT BUTTON (Sun/Star ☀️)
// ============================================

function initGlobalContactButton() {
  const sunBtn = document.querySelector('.theme-toggle');
  if (!sunBtn) return;

  // Upgrade the button with accessibility + tooltip attributes
  sunBtn.setAttribute('aria-label', 'Go to contact form');
  sunBtn.setAttribute('title', 'Contact Me');
  sunBtn.setAttribute('tabindex', '0');
  sunBtn.classList.add('sun-btn');

  const navigate = () => {
    const path = window.location.pathname;
    const isContactPage = path.includes('contact.html') || path.endsWith('/contact');

    if (isContactPage) {
      // Already on contact page – smooth scroll to the form
      const target = document.querySelector('#contact-form');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Determine relative path prefix based on page depth
      // Pages in /pages/ need ../pages/contact.html
      // Index at root needs pages/contact.html
      const isInSubdir = path.includes('/pages/');
      const href = isInSubdir ? 'contact.html#contact-form' : 'pages/contact.html#contact-form';
      window.location.href = href;
    }
  };

  sunBtn.addEventListener('click', navigate);
  sunBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate();
    }
  });
}

// ============================================
// Scroll to #contact-form after page load
// (used when navigating from another page)
// ============================================
window.addEventListener('load', () => {
  if (window.location.hash === '#contact-form') {
    setTimeout(() => {
      const target = document.getElementById('contact-form');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
});
