# Environment Setup Guide — Accemberg Backend

## Stack
- **Node.js + Express** API server
- **PostgreSQL** via [Supabase](https://supabase.com) (free hosted, no credit card)
- **Prisma ORM** for schema management and type-safe queries

---

## Step 1 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → **Start your project** (free account)
2. Click **New Project**
3. Set a **project name** (e.g. `accemberg`), choose a **region closest to your users**, and set a **strong database password** — save it
4. Wait ~2 minutes for the project to provision

---

## Step 2 — Get Your Connection Strings

Supabase requires **two** URLs — one for the app at runtime (via PgBouncer pooler), one for Prisma Migrate (direct).

1. In your Supabase dashboard → **Project Settings** → **Database**
2. Scroll to **Connection string** and select the **Transaction** tab:
   - Copy the URI — this is your `DATABASE_URL`
   - It looks like: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
   - **Append** `?pgbouncer=true` to the end if not already present
3. Now select the **Direct connection** tab:
   - Copy the URI — this is your `DIRECT_URL`
   - It looks like: `postgresql://postgres.[ref]:[password]@aws-0-[region].supabase.com:5432/postgres`

> **Why two URLs?**
> PgBouncer pools connections efficiently at runtime but doesn't support Prisma's migration queries.
> `DIRECT_URL` bypasses the pooler and is used only when you run `npm run db:migrate`.

---

## Step 3 — Create Your `.env` File

```bash
cd backend
cp .env.example .env
```

Open `.env` and fill in:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Supabase → Settings → Database → Transaction string |
| `DIRECT_URL` | Supabase → Settings → Database → Direct connection string |
| `ADMIN_API_KEY` | Generate below |
| `SMTP_*` | Your email provider (see Step 4) |
| `NOTIFY_EMAIL` | Your admin inbox |

### Generate a secure Admin API Key

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste the output as `ADMIN_API_KEY`. **Never commit `.env` to Git.**

---

## Step 4 — Email (SMTP) Setup

### Option A — Gmail App Password (Quick, for dev/staging)
1. Enable **2-Factor Authentication** on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for **Mail**
4. Set in `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   ```

### Option B — SendGrid (Recommended for production)
- Create a free account at [sendgrid.com](https://sendgrid.com)
- Generate an API key with **Full Access > Mail Send**
- Set:
  ```
  SMTP_HOST=smtp.sendgrid.net
  SMTP_PORT=465
  SMTP_SECURE=true
  SMTP_USER=apikey
  SMTP_PASS=SG.your_api_key_here
  ```

---

## Step 5 — Install Dependencies & Generate Prisma Client

```bash
cd backend
npm install
npm run db:generate
```

> `db:generate` creates the typed Prisma Client from `prisma/schema.prisma`.
> You must run this once after `npm install` and again any time you change the schema.

---

## Step 6 — Run Database Migrations

```bash
npm run db:migrate
```

This will:
1. Compare your `prisma/schema.prisma` against the actual database
2. Generate a new SQL migration file in `prisma/migrations/`
3. Apply it to your Supabase database

You will be prompted to name the migration (e.g. `initial_schema`).

> **Alternative (no migration history):** Use `npm run db:push` to push the schema directly without creating migration files. Good for early dev, not recommended for production.

---

## Step 7 — Start the Server

```bash
# Development (auto-restarts on save)
npm run dev

# Production
npm start
```

Server starts on `http://localhost:5000` (or `PORT` from `.env`).

---

## Step 8 — Verify

Open: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)

Expected response:
```json
{
  "success": true,
  "status": "ok",
  "db": "connected",
  "timestamp": "2026-07-01T16:00:00.000Z"
}
```

---

## Quick Reference — npm Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start dev server with nodemon |
| `npm start` | Start production server |
| `npm run db:generate` | Regenerate Prisma Client after schema changes |
| `npm run db:migrate` | Create + apply a new SQL migration |
| `npm run db:push` | Push schema to DB without migration history |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |
| `npm run db:reset` | ⚠️ Drop DB and re-apply all migrations (dev only) |

---

## API Quick Reference

Base URL: `http://localhost:5000/api/v1`

| Auth Required | Method | Path | Description |
|---|---|---|---|
| — | `GET` | `/health` | Health check |
| — | `POST` | `/contact` | Submit contact form |
| — | `POST` | `/book-a-call` | Submit booking request |
| ✅ | `GET` | `/book-a-call` | List bookings (paginated) |
| ✅ | `PATCH` | `/book-a-call/:id` | Update booking status |
| ✅ | `DELETE` | `/book-a-call/:id` | Delete booking request |
| — | `GET` | `/testimonials` | List active testimonials |
| ✅ | `POST` | `/testimonials` | Create testimonial |
| — | `GET` | `/faq` | List active FAQs |
| ✅ | `POST` | `/faq` | Create FAQ |
| — | `GET` | `/partners` | List verified partners |
| — | `GET` | `/services` | List all services |
| — | `GET` | `/products` | List all products |

> ✅ Admin routes require the `x-api-key: <ADMIN_API_KEY>` header.
