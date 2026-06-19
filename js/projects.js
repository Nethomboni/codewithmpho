// ============================================
// PROJECTS.JS - Modal & Filter System
// ============================================

const PROJECTS = [
  {
    id: 'pastimes',
    type: 'E-Commerce Website',
    title: 'Pastimes',
    desc: 'An e-commerce website for a fashion brand offering a seamless shopping experience with clean design and secure checkout.',
    full: 'Pastimes is a full-featured e-commerce platform built for a fashion brand. The project involved creating a complete online shopping experience including product catalog, cart management, user authentication, and a secure checkout process. Special attention was paid to visual aesthetics to match the brand\'s luxurious identity.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    category: 'websites',
    github: 'https://github.com/RC-WEDE6021-PART-2-AND-PART-3/rc-pta-wede6021-part2-and-3-lets_code',
    thumbnail: '../assets/images/Pastimes/mock-up-home-page.png',
    features: ['Product catalog & filtering', 'Shopping cart system', 'User authentication', 'Secure checkout flow', 'Admin dashboard', 'Mobile responsive'],
    challenges: ['Building a seamless checkout UX', 'Optimizing image loading performance', 'Implementing secure payment flow'],
    solutions: ['Custom cart logic with localStorage', 'Lazy loading & WebP images', 'PHP backend validation with form tokens'],
    screenshots: [
      '../assets/images/Pastimes/home-page.png',
      '../assets/images/Pastimes/browse-page.png',
      '../assets/images/Pastimes/view-item.png',
      '../assets/images/Pastimes/shopping-cart-page.png',
      '../assets/images/Pastimes/sell-page.png',
      '../assets/images/Pastimes/login-page.png'
    ]
  },
  {
    id: 'mali-budget',
    type: 'Mobile App',
    title: 'Mali Budget',
    desc: 'A personal finance management app that helps users track expenses, set budgets and achieve financial goals.',
    full: 'Mali Budget is an Android mobile application designed to empower users with clear financial visibility. The app allows users to categorize expenses, set monthly budgets, visualize spending patterns through charts, and receive alerts when approaching budget limits.',
    tags: ['Kotlin', 'Firebase', 'Android Studio'],
    category: 'mobile',
    github: 'https://github.com/lebza-ww/TechCoreX-Innovations-OPSC',
    thumbnail: '../assets/images/Mali Budget/Logo.jpeg',
    features: ['Expense tracking & categorization', 'Budget goals & alerts', 'Spending visualizations', 'Firebase sync', 'Offline support', 'Export reports'],
    challenges: ['Real-time sync with offline support', 'Intuitive data visualization', 'User onboarding flow'],
    solutions: ['Firebase Realtime Database with local caching', 'MPAndroidChart library', 'Step-by-step guided onboarding'],
    screenshots: [
      '../assets/images/Mali Budget/Logo.jpeg'
    ]
  },
  {
    id: 'cybersecurity-bot',
    type: 'Desktop App',
    title: 'CyberSecurity Awareness Bot',
    desc: 'A desktop chatbot that educates users on cybersecurity best practices and promotes safer digital habits.',
    full: 'CyberShield Bot is a Windows desktop application built with C# and WPF that acts as an interactive cybersecurity awareness tool. Users can ask the bot questions about online safety, password practices, phishing, and more. The bot uses a knowledge base to provide helpful, accurate guidance.',
    tags: ['C#', 'WPF', 'SQL Server', '.NET'],
    category: 'desktop',
    github: 'https://github.com/Nethomboni/CyberSecurityBotApp/tree/452f955f750068390ae72beaf13fb00b0deb7bc5',
    thumbnail: '../assets/images/cybersecurity_screenshots/Screenshot 2026-05-31 163845.png',
    features: ['Interactive chat interface', 'Cybersecurity knowledge base', 'Phishing awareness module', 'Password strength checker', 'Safe browsing tips', 'Progress tracking'],
    challenges: ['Natural language understanding on desktop', 'Engaging UX for educational content', 'Maintaining accurate info base'],
    solutions: ['Pattern-matching NLP with keyword scoring', 'Gamified learning with quiz mode', 'Structured JSON knowledge base'],
    screenshots: [
      '../assets/images/cybersecurity_screenshots/Screenshot 2026-05-31 163845.png',
      '../assets/images/cybersecurity_screenshots/Screenshot 2026-05-31 165237.png',
      '../assets/images/cybersecurity_screenshots/Screenshot 2026-05-31 165443.png'
    ]
  },
  {
    id: 'harvest-printing',
    type: 'Business Website',
    title: 'Harvest Printing Centre',
    desc: 'A professional website for a printing business showcasing services, portfolio and enabling customers to request quotes online.',
    full: 'Harvest Printing Centre\'s website was built to establish their professional online presence. The site showcases their printing services, galleries of completed work, and includes a quote request system that connects directly to their team via email. The design reflects their brand identity with a clean, professional aesthetic.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    category: 'websites',
    github: 'https://github.com/GivenMu/Harvest-Printing-Centre',
    thumbnail: '../assets/images/Harvest printing centre/harvest-pinting-centre.png',
    features: ['Service showcase pages', 'Portfolio gallery', 'Quote request form', 'Email notifications', 'Google Maps integration', 'SEO optimized'],
    challenges: ['Quote system with dynamic pricing variables', 'Gallery performance with many images', 'Local SEO optimization'],
    solutions: ['PHP form handler with email integration', 'Masonry grid with lazy loading', 'Structured data markup + sitemap'],
    screenshots: [
      '../assets/images/Harvest printing centre/harvest-pinting-centre.png',
      '../assets/images/Harvest printing centre/Screenshot 2026-04-12 224003.png',
      '../assets/images/Harvest printing centre/Screenshot 2026-04-12 224132.png',
      '../assets/images/Harvest printing centre/Screenshot 2026-04-12 224314.png',
      '../assets/images/Harvest printing centre/Screenshot 2026-04-12 224332.png'
    ]
  },
  {
    id: 'harvest-app',
    type: 'Mobile App',
    title: 'Harvest Printing Centre Mobile App',
    desc: 'A mobile app for the printing business that allows customers to place orders, track progress and receive updates.',
    full: 'The Harvest Printing mobile app extends the business\'s digital presence to Android devices. Customers can browse services, place print orders, upload files directly, track their order status in real-time, and receive push notifications when orders are ready for collection.',
    tags: ['Kotlin', 'Firebase', 'Android Studio'],
    category: 'mobile',
    github: 'https://github.com/GivenMu/Harvest-Printing-Centre',
    thumbnail: '../assets/images/Harvest printing center App/log in page.png',
    features: ['Service ordering system', 'File upload for print jobs', 'Real-time order tracking', 'Push notifications', 'Order history', 'Customer profiles'],
    challenges: ['File upload handling on mobile', 'Real-time order status updates', 'Intuitive order flow'],
    solutions: ['Firebase Storage for file uploads', 'Firestore listeners for live updates', 'Multi-step order wizard UX'],
    screenshots: [
      '../assets/images/Harvest printing center App/create account page.png',
      '../assets/images/Harvest printing center App/home page.png',
      '../assets/images/Harvest printing center App/create account page.png',
      '../assets/images/Harvest printing center App/log in page.png',
      '../assets/images/Harvest printing center App/products.png',
      '../assets/images/Harvest printing center App/profile page.png',
      '../assets/images/Harvest printing center App/services page.png'
    ]
  },
 {
  id: 'lumina-store',
  type: 'E-Commerce Website',
  title: 'Lumina Store za',
  desc: 'A modern e-commerce platform offering a seamless shopping experience with intuitive navigation, secure checkout, and responsive design.',
  full: 'Lumina Store is a full-stack e-commerce application built to deliver a fast, engaging, and user-friendly online shopping experience. Designed with a sleek, premium aesthetic, the platform features dynamic product listings, category filtering, shopping cart functionality, secure checkout flows, and responsive layouts optimized for all devices. The project demonstrates modern web development practices, scalable architecture, and a focus on performance and usability.',
  tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
  category: 'websites',
  github: 'https://github.com/nethomboni/lumina-store-za',
  thumbnail: '../assets/images/Lumina Store/Screenshot 2026-06-16 162915.png',
  features: [
    'Dynamic product catalog',
    'Advanced search and category filtering',
    'Shopping cart and wishlist functionality',
    'Secure checkout experience',
    'Dark/light theme support',
    'Fully responsive design'
  ],
  challenges: [
    'Managing complex application state across cart and user interactions',
    'Optimizing performance with dynamic product data',
    'Ensuring a seamless experience across devices and browsers'
  ],
  solutions: [
    'Implemented centralized state management for cart and user data',
    'Leveraged Next.js optimization features and efficient data fetching strategies',
    'Conducted extensive responsive and cross-browser testing'
  ],
  screenshots: [
    '../assets/images/Lumina Store/Screenshot 2026-06-16 162915.png',
    '../assets/images/Lumina Store/Screenshot 2026-06-16 162933.png',
    '../assets/images/Lumina Store/Screenshot 2026-06-16 163008.png',
    '../assets/images/Lumina Store/Screenshot 2026-06-16 163031.png',
    '../assets/images/Lumina Store/Screenshot 2026-06-16 163109.png',
    '../assets/images/Lumina Store/Screenshot 2026-06-16 163142.png'
  ]
}
];

// ============================================
// RENDER PROJECT CARDS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  initFilter();
  initModal();
});

function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => {
    // Build the thumbnail section — real image if available, placeholder otherwise
    const thumbHTML = p.thumbnail
      ? `<img
           src="${p.thumbnail}"
           alt="${p.title} – project preview"
           loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
         />
         <div class="project-thumb-placeholder" style="display:none;">Project Preview</div>`
      : `<div class="project-thumb-placeholder">Project Preview</div>`;

    return `
      <div class="project-card animate-on-scroll" data-id="${p.id}" onclick="openModal('${p.id}')">
        <div class="project-card-thumb">
          ${thumbHTML}
        </div>
        <div class="project-card-body">
          <p class="project-type">${p.type}</p>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-view-btn">
            <span>🔒 View Project</span>
            <span>→</span>
          </div>
        </div>
      </div>`;
  }).join('');

  // Re-initialise scroll animations on newly injected cards
  setTimeout(() => {
    const els = grid.querySelectorAll('.animate-on-scroll');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }, 50);
}

// ============================================
// FILTER TABS
// ============================================

function initFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.dataset.filter);
    });
  });
}

// ============================================
// MODAL INIT
// ============================================

function initModal() {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ============================================
// OPEN MODAL
// ============================================

function openModal(id) {
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  // ---- Modal hero image ----
  const heroHTML = project.thumbnail
    ? `<img
         class="modal-hero-img"
         src="${project.thumbnail}"
         alt="${project.title} – hero screenshot"
         loading="eager"
         onerror="
           this.style.display='none';
           this.nextElementSibling.style.display='flex';
         "
       />
       <div class="modal-hero-placeholder" style="display:none;">Project Screenshot</div>`
    : `<div class="modal-hero-placeholder">Project Screenshot</div>`;

  // ---- Screenshots ----
  let screenshotsHTML = '';

  if (Array.isArray(project.screenshots) && project.screenshots.length) {
    // First image is the featured (full-width) screenshot
    const [featured, ...rest] = project.screenshots;

    const featuredHTML = `
      <div class="screenshot-item featured">
        <img
          src="${featured}"
          alt="${project.title} – featured screenshot"
          loading="lazy"
          onerror="
            this.style.display='none';
            this.parentElement.classList.add('screenshot-broken');
            this.parentElement.insertAdjacentHTML('beforeend',
              '<span class=\\'screenshot-placeholder\\'>Image unavailable</span>');
          "
        />
      </div>`;

    const restHTML = rest.map((src, i) => {
      // Derive a human-readable label from the filename
      const label = src
        .split('/').pop()           // grab filename
        .replace(/\.\w+$/, '')      // strip extension
        .replace(/[-_]/g, ' ');     // dashes/underscores → spaces

      return `
        <div class="screenshot-item">
          <img
            src="${src}"
            alt="${project.title} – ${label}"
            loading="lazy"
            onerror="
              this.style.display='none';
              this.parentElement.classList.add('screenshot-broken');
              this.parentElement.insertAdjacentHTML('beforeend',
                '<span class=\\'screenshot-placeholder\\'>${label}</span>');
            "
          />
        </div>`;
    }).join('');

    screenshotsHTML = featuredHTML + restHTML;

  } else if (typeof project.screenshots === 'number') {
    // Numeric fallback — plain placeholder tiles
    screenshotsHTML = Array.from({ length: project.screenshots }, (_, i) =>
      `<div class="screenshot-item">
         <div class="screenshot-placeholder">Screenshot ${i + 1}</div>
       </div>`
    ).join('');
  }

  // ---- Build modal HTML ----
  overlay.innerHTML = `
    <div class="modal-container">
      <button class="modal-close" onclick="closeModal()" aria-label="Close modal">✕</button>

      <div class="modal-hero">
        ${heroHTML}
      </div>

      <div class="modal-body">
        <p class="modal-type">${project.type}</p>
        <h2>${project.title}</h2>
        <p>${project.full}</p>

        <div class="modal-grid">
          <div class="modal-section">
            <h4>Features</h4>
            <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
          </div>
          <div class="modal-section">
            <h4>Technologies</h4>
            <ul>${project.tags.map(t => `<li>${t}</li>`).join('')}</ul>
          </div>
          <div class="modal-section">
            <h4>Challenges</h4>
            <ul>${project.challenges.map(c => `<li>${c}</li>`).join('')}</ul>
          </div>
          <div class="modal-section">
            <h4>Solutions</h4>
            <ul>${project.solutions.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="modal-screenshots">
          <h4>Screenshots</h4>
          <div class="screenshots-slider">
            ${screenshotsHTML}
          </div>
        </div>

        <div class="modal-footer">
          <div class="modal-tags">
            ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-primary">
            View Full Project →
          </a>
        </div>
      </div>
    </div>`;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ============================================
// CLOSE MODAL
// ============================================

function closeModal() {
  const overlay = document.getElementById('project-modal');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}
