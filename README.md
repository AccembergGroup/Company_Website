# Accemberg Corporate Platform
A high-end, studio-grade corporate web application built for the premium enterprise software firm **Accemberg**. This platform is heavily optimized for buttery-smooth 60 FPS interactions, zero-lag physics, and a minimalist "Midnight Neo-Glow" dark aesthetic.

## Tech Stack
- **Frontend Framework:** Next.js 16 (App Router)
- **Backend Framework:** Node.js + Express REST API
- **Core Library:** React 19, vanilla Tailwind CSS 4
- **ORM & Database:** Prisma ORM, PostgreSQL (hosted on Supabase)
- **Animations & Layouts:** GSAP (ScrollTrigger, quickTo), Lenis (Smooth Scroll)
- **Background Jobs:** `node-cron` scheduled tasks
- **Typography:** Space Grotesk (Headers), Inter (Body)

## Advanced UI / Physics Engines
This platform relies heavily on mathematical DOM manipulation rather than raw canvas (WebGL) to maintain accessibility while achieving Awwwards-tier visual quality. To ensure no lag on mobile or integrated graphics, several bespoke GPU-level optimization engines have been built:

1. **`FastScroll.js`:** 
   Native hardware-accelerated wrapper that calculates `translateZ`, `filter: blur()`, and wind-drift on ScrollTrigger to simulate particles dissolving/blowing away. 
   *(Note: The original SVG math-fractal engine is backed up at `DustScroll.js` if mathematical wave physics are ever desired on heavy GPU desktops).*

2. **`Spotlight.js` (Bento Hover Engine):** 
   Replaces global React Contexts. Bypasses Virtual DOM rendering by grabbing global cursor coordinates and injecting them straight into CSS variables mathematically per-card. Renders native border mask cutouts and inner radiant glows behind glass morphisms.

3. **`CustomCursor.js`:**
   A custom hardware shadow orb driven entirely by GSAP `quickTo` physical elasticity maps. Bypasses pure CPU blending (no `mix-blend-mode`) to maintain sub-millisecond response rates.

4. **`ScrambleText.js`:** 
   A hacker-aesthetic terminal decryption text reveal. Explicitly bound by React `useEffect` mounting lifecycle to entirely prevent Next.js 16 Server-Side Rendering (SSR) Hydration mismatches. 

## Backend API & Maintenance System
The Express REST API server is located in the `/backend` subdirectory and interfaces directly with the Supabase PostgreSQL database using Prisma ORM.

### Key Background Operations:
* **Database Keep-Alive** (Every 4 minutes): Performs a lightweight `SELECT 1` query to prevent PgBouncer connection timeouts.
* **Nightly Backups** (Daily at 02:00 UTC): Exports full database snapshots of all tables in JSON format directly to the `backups/` directory on disk.
* **Database Cleanup** (Sundays at 03:00 UTC): Automatically deletes cancelled booking requests older than **120 days** to keep tables lightweight.

## Responsive Safety Nets
All complex hover effects (Spotlight, Custom Cursor, etc.) are strictly protected by `matchMedia('(pointer: fine)')` blocks. This ensures pure native touch scrolling on all tablets and mobile devices with zero JS event-listener lag interference and no "sticky hover" bugs.

## Component Structure
The UI is broken down into distinct vertical domains found in `src/components/`:
- `Navbar.js` & `Preloader.js`
- `Hero.js`
- `StatsBar.js`
- `About.js`
- `Products.js` (Bento Grid)
- `Services.js` (Hover Cards)
- `Process.js` (Line Graph Layout)
- `Clients.js` & `Projects.js` (Masonry Grid)
- `Contact.js` & `Footer.js`

## Local Development

### 1. Run the Frontend Server
```bash
npm install
npm run dev
```
Runs locally at [http://localhost:3000](http://localhost:3000).

### 2. Run the Backend API Server
```bash
cd backend
npm install
npm run db:generate
npm run dev
```
Runs locally at [http://localhost:5000](http://localhost:5000). The server triggers and executes keep-alive and maintenance jobs automatically.
