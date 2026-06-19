# CodeWithMpho – Portfolio Website

A premium, cinematic full-stack developer portfolio website.

## 🚀 Quick Start (Static – No Backend)

Simply open `index.html` in your browser, or deploy the entire folder to Netlify/Vercel for free.

No build step required.

---

## 📁 Folder Structure

```
/portfolio
  /assets
    /images       ← Add your photos here
    /icons
  /css
    style.css     ← Global styles, navbar, footer
    home.css      ← Home page styles
    pages.css     ← About, Projects, Services, Pricing, Contact styles
  /js
    main.js       ← Navbar, animations, particles, FAQ
    projects.js   ← Project data, modal system, filtering
  /pages
    about.html
    projects.html
    services.html
    pricing.html
    contact.html
    privacy-policy.html
    terms-and-conditions.html
  index.html
  server.js       ← Node.js backend (optional, for contact form emails)
  package.json
  netlify.toml
  .env.example
```

---

## 🖼️ Adding Your Photos

Replace placeholder images by adding your photos to `/assets/images/` and updating the CSS background references:

| Selector | File to add | Used in |
|---|---|---|
| `.hero-bg-img` | `hero-workspace.jpg` | All hero sections |
| `.about-img-placeholder` | Your photo | Home about section |
| `.about-img-section` | Your photo | About page |

In `style.css` and `home.css`, update:
```css
.hero-bg-img {
  background-image: url('../assets/images/hero-workspace.jpg');
}
```

For real `<img>` tags on About page, replace the div placeholders with:
```html
<img src="../assets/images/your-photo.jpg" alt="Mpho – Developer" />
```

---

## 📧 Enabling the Contact Form (Backend)

The form works in two modes:

### Mode 1: Static (default)
The form simulates a success state after 1.5s. To make it real, connect a service like **Formspree** or **Netlify Forms**:

**Netlify Forms** – add `netlify` attribute to your form tag:
```html
<form netlify name="contact" ...>
```

**Formspree** – change the form action:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Mode 2: Node.js Backend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your SMTP credentials:
   ```bash
   cp .env.example .env
   ```
3. Start the server:
   ```bash
   npm start
   # or for development:
   npm run dev
   ```
4. In `contact.html`, update the fetch call to use the real endpoint:
   ```javascript
   const response = await fetch('/send-email', {
     method: 'POST',
     body: new FormData(this)
   });
   ```

---

## 🌐 Deployment

### Netlify (recommended – free)
1. Push your code to GitHub
2. Connect repo to Netlify
3. Deploy – `netlify.toml` handles all routing

### Vercel
1. Push to GitHub
2. Import project in Vercel dashboard
3. No build command needed (static site)

### GitHub Pages
1. Push to a GitHub repo
2. Enable Pages → Deploy from branch → `main` → `/` (root)

---

## 🎨 Customisation

### Update Your Details
Search for these placeholders and replace:
- `hello@codewithmpho.com` → your email
- `+27 71 123 4567` → your phone
- `CodeWithMpho` → your brand name
- `Mpho` → your name
- GitHub links → your actual GitHub project URLs

### Projects
Edit the `PROJECTS` array in `/js/projects.js` to update project info, GitHub links, technologies and descriptions.

### Colors
All colors are CSS variables in `style.css` under `:root`. The main accent is `--gold: #c9922a`.

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| 1440px | Large desktop |
| 1024px | Laptop / small desktop |
| 768px | Tablet |
| 480px | Mobile |

---

Built with HTML5, CSS3, Vanilla JavaScript and Node.js + Express.
