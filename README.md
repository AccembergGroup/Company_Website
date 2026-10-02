# Accemberg — Company Website

<div align="center">

### Engineering-first Venture Studio

Official website for **Accemberg** — built with Next.js, GSAP, and premium design.

[🌐 Live Site](https://www.accemberg.com) | [📧 Contact](mailto:office@accemberg.com) | [LinkedIn](https://www.linkedin.com/company/accemberg-technologies)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square)
![License](https://img.shields.io/badge/License-Private-red?style=flat-square)

</div>

---

## 📋 Overview

This is the official marketing website for **Accemberg Technologies**, an engineering-first Venture Studio building premier digital systems, scalable SaaS platforms, and enterprise cloud architectures.

The site reflects our engineering standards — precision, performance, and premium aesthetics.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Animations** | [GSAP 3](https://gsap.com/) + ScrollTrigger |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Styling** | Vanilla CSS + CSS Variables |
| **Typography** | Syne + Archivo (Google Fonts) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
Company_Website-main/
├── public/
│   ├── logo.svg              # Accemberg logo
│   ├── logo-dark.svg         # Dark mode variant
│   └── partners/             # Partner logo assets
├── src/
│   ├── app/
│   │   ├── globals.css       # Global design system & CSS variables
│   │   ├── layout.js         # Root layout with fonts & metadata
│   │   ├── page.js           # Home page — assembles all sections
│   │   └── privacy-policy/   # Privacy policy page
│   └── components/
│       ├── Hero.js           # Hero with animated orbit + cycling text
│       ├── Navbar.js         # Floating pill navigation bar
│       ├── Partners.js       # Trusted by / partner logos marquee
│       ├── Services.js       # 6 service cards grid
│       ├── Products.js       # Bento grid product showcase
│       ├── About.js          # About section with engine grid
│       ├── Process.js        # 4-step delivery process cards
│       ├── Projects.js       # Case studies / project showcases
│       ├── Careers.js        # Careers & job listings
│       ├── Contact.js        # Contact form section
│       ├── Footer.js         # Site footer with nav columns
│       ├── Preloader.js      # Entry animation preloader
│       ├── ThemeProvider.js  # Dark/Light mode context
│       ├── ScrambleText.js   # Scramble text animation
│       ├── Spotlight.js      # Mouse-tracking spotlight cards
│       ├── Magnetic.js       # Magnetic hover effect
│       ├── CustomCursor.js   # Custom cursor
│       └── LenisProvider.js  # Smooth scroll setup
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/accemberg/company-website.git
cd company-website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

---

## 🎨 Design System

All design tokens are defined in [`src/app/globals.css`](src/app/globals.css) as CSS custom properties.

### Color Palette

| Variable | Value | Usage |
|---|---|---|
| `--accent` | `#0C49A2` | Primary brand blue |
| `--text-primary` | `#32373c` | Main text |
| `--text-secondary` | `#4A5568` | Secondary text |
| `--bg-base` | `#FFFFFF` | Page background |
| `--border` | `rgba(12,73,162,0.15)` | Card borders |

### Typography

- **Display / Headings:** `Syne` (700–800 weight)
- **Body:** `Archivo` (400–500 weight)

### Spacing

- `--section-y`: `clamp(60px, 6vw, 90px)` — vertical section padding
- `--container-x`: `clamp(24px, 6vw, 100px)` — horizontal container padding

---

## 🌗 Dark Mode

Full dark/light mode switching via `ThemeProvider`. Toggle is in the navbar. All components use CSS variables for instant, smooth theme transitions.

---

## 📦 Key Features

- ⚡ **GSAP Orbit Animation** — Interactive 3D orbit ring in the hero with mouse-responsive tilt
- 🔄 **Cycling Hero Text** — "From X to Y" headline cycling through word pairs every 3s
- 🖱️ **Custom Cursor** — Premium cursor with magnetic hover effects
- 📜 **Lenis Smooth Scroll** — Ultra-smooth scrolling experience
- 🔡 **ScrambleText** — Character scramble animation on section labels
- 🃏 **Spotlight Cards** — Radial spotlight that follows the mouse on cards
- 🌐 **Partners Marquee** — Infinite scroll marquee of partner logos
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop

---

## 🔧 Environment Variables

No environment variables required to run locally. All content is static.

---

## 📄 License

**Private & Proprietary.** All rights reserved © 2025 Accemberg Technologies.

Unauthorized copying, modification, or distribution of this codebase is strictly prohibited.

---

<div align="center">
  <p>Built with precision by the <strong>Accemberg Engineering Team</strong></p>
  <p><a href="https://www.accemberg.com">accemberg.com</a></p>
</div>
