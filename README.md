# Accemberg Corporate Web Platform

A studio-grade, high-performance corporate web platform built for **Accemberg** — a hybrid venture studio engineering scalable software products and delivering enterprise services. 

Engineered for 60 FPS interactions, custom 3D physics, glassmorphism UI, and executive-tier responsive design across all viewports (Mobile, iPad Air, iPad Pro, 4K Displays).

---

## ⚡ Tech Stack & Architecture

- **Frontend Framework:** Next.js 16 (App Router)
- **UI Library & Rendering:** React 19
- **3D Graphics & Physics:** Three.js / `@react-three/fiber` / `@react-three/drei`
- **Animation Engines:** GSAP 3 (ScrollTrigger, quickTo), Lenis (Smooth Scroll)
- **Typography:** Plus Jakarta Sans (Display Headings & Brand Wordmarks), Inter (Body Copy)
- **Styling & Aesthetics:** Vanilla CSS Design System, Glassmorphism, Theme-Aware CSS Variables
- **Backend Infrastructure:** Node.js + Express REST API
- **Database & ORM:** PostgreSQL (Supabase) + Prisma ORM
- **Background Operations:** `node-cron` database keep-alive & snapshot tasks

---

## 🌟 Key Features & Engineering Highlights

### 1. Interactive 3D Hero Orbit Stage
- Hardware-accelerated 3D orbital mesh stage powered by Three.js.
- Dynamic viewport scaling (`clamp()`) and containment geometry tailored for Desktop, iPad Air, iPad Pro, and Mobile devices.

### 2. Executive Typography & Theme System
- **Display Headings & Wordmarks:** Powered by **Plus Jakarta Sans** with geometric feature settings (`font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'`).
- **Brand Wordmark System:** `.brand-wordmark-gradient` delivers theme-aware sky-cyan gradients in Dark Mode and cobalt-navy gradients in Light Mode with zero rendering artifacts.
- **Dark / Light Mode:** Instant theme switching with frosted glass pill navigation and backdrop blur filters.

### 3. Modal Overlays & Scroll Containment
- Dedicated case study detail popups and **IIIT Kottayam** Academic Alliance modals.
- Enhanced with `data-lenis-prevent` attributes to guarantee 100% smooth mouse wheel scrolling inside modal containers.

### 4. Performance & Physics Engines
- **`Spotlight.js` (Bento Hover Engine):** Bypasses React Virtual DOM state re-renders by feeding raw cursor coordinates into CSS variables per card for GPU-driven border masks and radiant glows.
- **`CustomCursor.js`:** GSAP `quickTo` physical elasticity maps for instantaneous, sub-millisecond cursor tracking.
- **`ScrambleText.js`:** Hacker-aesthetic terminal decryption text reveal with SSR hydration safety hooks.

---

## 🛠️ Project Structure

```
├── public/                # Static assets, logos, and partner media
├── src/
│   ├── app/
│   │   ├── globals.css    # Global design system tokens, typography rules & utilities
│   │   ├── layout.js     # Root layout & Next.js Google Fonts configuration
│   │   └── page.js       # Main application landing page
│   └── components/
│       ├── Navbar.js      # Floating frosted glass pill navigation
│       ├── Hero.js        # 3D interactive orbit & marquee strip
│       ├── StatsBar.js    # Metric counter bar
│       ├── About.js       # Core engineering pillars
│       ├── WhyAccemberg.js # Studio value proposition
│       ├── Solutions.js   # FinTech, SaaS & Logistics solution cards
│       ├── Services.js    # Engineering services grid
│       ├── Products.js   # Flagship product showcase (Bento layout)
│       ├── Process.js    # Delivery timeline & milestone graph
│       ├── TechStack.js  # Technology radar & stack chips
│       ├── Partners.js   # Academic alliance & IIIT Kottayam modal
│       ├── Projects.js   # Case study gallery & popup details
│       ├── Careers.js    # Culture & open roles
│       ├── Faqs.js       # Accordion FAQ system
│       ├── Contact.js    # Project discovery & contact form
│       └── Footer.js     # Brand footer, social links & repository link
└── backend/              # Node.js + Express API & Prisma database services
```

---

## 🚀 Local Development Setup

### 1. Frontend Development Server
```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend API & Database Service (Optional)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Start API server
npm run dev
```
Runs at [http://localhost:5000](http://localhost:5000). Handles database connection keep-alives and automated maintenance background tasks.

---

## 📬 Contact & Enquiries

- **Official Website:** [Accemberg](https://github.com/AccembergGroup/Company_Website)
- **GitHub Repository:** [AccembergGroup/Company_Website](https://github.com/AccembergGroup/Company_Website)
- **Email:** `office@accemberg.com`
