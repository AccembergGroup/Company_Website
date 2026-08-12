# Accemberg REST API Documentation

**Version:** 1.0  
**Base URL (dev):** `http://localhost:5000/api/v1`  
**Base URL (prod):** `https://api.accemberg.com/api/v1`  
**Content-Type:** `application/json`  
**Last Updated:** 2026-07-06

---

## Table of Contents

1. [Authentication](#authentication)
2. [Global Response Envelope](#global-response-envelope)
3. [Error Reference](#error-reference)
4. [Rate Limiting](#rate-limiting)
5. [Endpoints](#endpoints)
   - [Health Check](#1-health-check)
   - [Services](#2-services)
   - [Products](#3-products)
   - [Partners](#4-partners)
   - [Contact](#5-contact)
   - [FAQs](#6-faqs)
   - [Testimonials](#7-testimonials)
   - [Book a Call](#8-book-a-call)
6. [Environment Variables Reference](#environment-variables-reference)
7. [Staging Verification Checklist](#staging-verification-checklist)

---

## Authentication

Admin-only routes require the `x-api-key` request header:

```
x-api-key: <ADMIN_API_KEY value from .env>
```

Generate a key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

| Missing key | Wrong key |
|---|---|
| `401 Unauthorized` | `401 Unauthorized` |

Public routes require **no authentication**.

---

## Global Response Envelope

All responses share a consistent JSON envelope:

```json
{
  "success": true,
  "data":    { },           // object or array — present on success
  "total":   6,             // present on list responses
  "message": "..."          // present on errors and informational responses
}
```

---

## Error Reference

| HTTP | Meaning | Typical Cause |
|------|---------|---------------|
| 400 | Validation failed | Missing or invalid field — see `errors[]` array |
| 401 | Unauthorized | Missing or wrong `x-api-key` |
| 404 | Not Found | Resource with given UUID does not exist |
| 409 | Conflict | Unique constraint violation |
| 429 | Too Many Requests | Rate limit exceeded or duplicate form submission |
| 500 | Internal Server Error | Unexpected server-side error |
| 503 | Service Unavailable | Database connection failed |

**Validation error shape (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email",   "message": "A valid email address is required" },
    { "field": "subject", "message": "Subject is required" }
  ]
}
```

---

## Rate Limiting

| Limiter | Applied To | Limit |
|---------|-----------|-------|
| General | All `GET` routes under `/api/*` | 100 req / 15 min per IP |
| Form | `POST /contact`, `POST /book-a-call` | 5 req / 1 hr per IP |

Rate limit headers are returned in responses (`RateLimit-*` standard headers).

---

## Endpoints

---

### 1. Health Check

#### `GET /health`

Verifies server and database connectivity. Used by uptime monitors.

**Auth:** None

| Status | Condition |
|--------|-----------|
| 200 | Server and database are healthy |
| 503 | Database connection failed |

**Response 200:**
```json
{
  "success":   true,
  "status":    "ok",
  "db":        "connected",
  "timestamp": "2026-07-06T14:00:00.000Z"
}
```

**Example cURL:**
```bash
curl http://localhost:5000/api/v1/health
```

---

### 2. Services

#### `GET /services`

Returns the full services catalogue ordered by `order` ascending.

**Auth:** None

**Response 200:**
```json
{
  "success": true,
  "total": 6,
  "data": [
    {
      "id":          "uuid",
      "title":       "Full-Stack Development",
      "description": "End-to-end web and mobile application development...",
      "icon":        "code-2",
      "order":       1,
      "createdAt":   "2026-07-06T00:00:00.000Z"
    }
  ]
}
```

**Field reference:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier |
| `title` | string | Service name, max 150 chars |
| `description` | string \| null | Longer description |
| `icon` | string \| null | Icon key (e.g. Lucide icon name), max 100 chars |
| `order` | integer | Display order (ascending) |
| `createdAt` | ISO 8601 | Record creation timestamp |

**Example cURL:**
```bash
curl http://localhost:5000/api/v1/services
```

---

### 3. Products

#### `GET /products`

Returns the SaaS products catalogue ordered by `createdAt` ascending.

**Auth:** None

**Response 200:**
```json
{
  "success": true,
  "total": 3,
  "data": [
    {
      "id":          "uuid",
      "name":        "Agnishakti",
      "description": "Enterprise-grade AI-powered operations platform...",
      "features":    ["Multi-tenant SaaS", "Real-time analytics"],
      "ctaLink":     "https://agnishakti.accemberg.com",
      "badge":       "Flagship",
      "createdAt":   "2026-07-06T00:00:00.000Z"
    }
  ]
}
```

**Field reference:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier |
| `name` | string | Product name, max 120 chars |
| `description` | string \| null | Product description |
| `features` | string[] | List of feature bullet points |
| `ctaLink` | string \| null | External URL, max 255 chars |
| `badge` | string \| null | Label tag (e.g. "Flagship", "Beta"), max 60 chars |
| `createdAt` | ISO 8601 | Record creation timestamp |

**Example cURL:**
```bash
curl http://localhost:5000/api/v1/products
```

---

### 4. Partners

#### `GET /partners`

Returns partner/client logos. Defaults to **verified partners only** (`isVerified=true`).

Pass `?all=true` to include unverified partners (useful for admin tooling).

**Auth:** None

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `all` | boolean | `false` | Pass `true` to include unverified partners |

**Response 200:**
```json
{
  "success": true,
  "total": 4,
  "data": [
    {
      "id":         "uuid",
      "name":       "Nexus Dynamics",
      "logoUrl":    "https://...",
      "website":    "https://nexusdynamics.example.com",
      "isVerified": true,
      "createdAt":  "2026-07-06T00:00:00.000Z"
    }
  ]
}
```

**Field reference:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier |
| `name` | string | Partner/client name, max 120 chars |
| `logoUrl` | string | Logo image URL |
| `website` | string \| null | Partner website URL, max 255 chars |
| `isVerified` | boolean | Whether partner has been verified/approved |
| `createdAt` | ISO 8601 | Record creation timestamp |

**Example cURLs:**
```bash
# Verified partners only (default — for frontend logo wall)
curl http://localhost:5000/api/v1/partners

# All partners including unverified
curl "http://localhost:5000/api/v1/partners?all=true"
```

---

### 5. Contact

#### `POST /contact`

Submits a website contact form. Stores to DB, then fire-and-forgets two emails:
- Internal notification to `NOTIFY_EMAIL`
- Auto-reply confirmation to the submitter

**Auth:** None  
**Rate limit:** Form limiter — 5 submissions per IP per 15 minutes

**Request body:**

```json
{
  "name":    "Priya Mehta",
  "email":   "priya@example.com",
  "subject": "Partnership Enquiry",
  "message": "Hi, I would like to explore a partnership opportunity."
}
```

**Validation rules:**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `name` | string | ✅ | Non-empty, trim, min 2 chars, max 100 chars |
| `email` | string | ✅ | Valid email format, normalised |
| `subject` | string | ✅ | Non-empty, trim, min 3 chars, max 200 chars |
| `message` | string | ✅ | Non-empty, trim, min 10 chars, max 2000 chars |

**Response 201:**
```json
{
  "success":   true,
  "contactId": "uuid",
  "data": {
    "id":          "uuid",
    "name":        "Priya Mehta",
    "email":       "priya@example.com",
    "subject":     "Partnership Enquiry",
    "message":     "Hi, I would like to explore a partnership opportunity.",
    "submittedAt": "2026-07-06T14:30:00.000Z"
  }
}
```

**Response 429 — Duplicate submission (within 5 minutes):**
```json
{
  "success": false,
  "message": "A message from this email address was already received in the last 5 minutes. Please wait before submitting again."
}
```

**Response 400 — Validation failure:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "A valid email address is required" }
  ]
}
```

**Example cURLs:**
```bash
# Valid submission
curl -X POST http://localhost:5000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":    "Priya Mehta",
    "email":   "priya@example.com",
    "subject": "Partnership Enquiry",
    "message": "Hi, I would like to explore a partnership."
  }'

# Validation error — missing fields
curl -X POST http://localhost:5000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{ "email": "priya@example.com" }'
```

---

### 6. FAQs

**Base path:** `/faq` (alias: `/faqs`)

#### `GET /faq`

Returns all **active** FAQs ordered by `order` ascending.

**Auth:** None

**Response 200:**
```json
{
  "success": true,
  "total": 8,
  "data": [
    {
      "id":        "uuid",
      "question":  "What is Accemberg?",
      "answer":    "Accemberg is a hybrid venture studio...",
      "order":     1,
      "isActive":  true,
      "createdAt": "2026-07-06T00:00:00.000Z",
      "updatedAt": "2026-07-06T00:00:00.000Z"
    }
  ]
}
```

**Example cURL:**
```bash
curl http://localhost:5000/api/v1/faq
```

---

#### `GET /faq/:id`

Returns a single FAQ by UUID.

**Auth:** None

**Response 200:** Single FAQ object.  
**Response 404:** `{ "success": false, "message": "FAQ not found." }`

**Example cURL:**
```bash
curl http://localhost:5000/api/v1/faq/<uuid>
```

---

#### `POST /faq`

Creates a new FAQ entry.

**Auth:** Admin (`x-api-key`)

**Request body:**
```json
{
  "question": "How long does a project take?",
  "answer":   "Typically 4–6 weeks for a rapid SaaS MVP.",
  "order":    9,
  "isActive": true
}
```

**Validation rules:**

| Field | Required | Rules |
|-------|----------|-------|
| `question` | ✅ | Non-empty, max 400 chars |
| `answer` | ✅ | Non-empty |
| `order` | ❌ | Integer, min 0, defaults to 0 |
| `isActive` | ❌ | Boolean, defaults to `true` |

**Response 201:** Created FAQ object.

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/faq \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_ADMIN_API_KEY" \
  -d '{
    "question": "How long does a project take?",
    "answer": "4–6 weeks for a rapid MVP.",
    "order": 9
  }'
```

---

#### `PATCH /faq/:id`

Updates an existing FAQ (partial — send only fields to change).

**Auth:** Admin (`x-api-key`)  
**Same validation as POST, all fields optional.**

**Response 200:** Updated FAQ object.

**Example cURL:**
```bash
curl -X PATCH http://localhost:5000/api/v1/faq/<uuid> \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_ADMIN_API_KEY" \
  -d '{ "isActive": false }'
```

---

#### `DELETE /faq/:id`

Permanently deletes an FAQ.

**Auth:** Admin (`x-api-key`)

**Response 200:** `{ "success": true, "message": "FAQ deleted." }`

**Example cURL:**
```bash
curl -X DELETE http://localhost:5000/api/v1/faq/<uuid> \
  -H "x-api-key: YOUR_ADMIN_API_KEY"
```

---

### 7. Testimonials

**Base path:** `/testimonials` (alias: `/testimonial`)

#### `GET /testimonials`

Returns all **active** testimonials. Featured ones appear first, then by `sortOrder` ascending.

**Auth:** None

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `featured` | boolean | Pass `true` to return only featured testimonials |

**Response 200:**
```json
{
  "success": true,
  "total": 5,
  "data": [
    {
      "id":         "uuid",
      "name":       "Sarah Connor",
      "role":       "CTO",
      "company":    "Cyberdyne Systems",
      "review":     "Accemberg delivered our system integration...",
      "rating":     5,
      "avatar":     "https://...",
      "isFeatured": true,
      "sortOrder":  1,
      "isActive":   true,
      "createdAt":  "2026-06-01T10:00:00.000Z",
      "updatedAt":  "2026-06-01T10:00:00.000Z"
    }
  ]
}
```

**Example cURLs:**
```bash
# All active testimonials
curl http://localhost:5000/api/v1/testimonials

# Featured only
curl "http://localhost:5000/api/v1/testimonials?featured=true"
```

---

#### `GET /testimonials/:id`

Returns a single testimonial by UUID.

**Auth:** None

**Response 200:** Single testimonial object.  
**Response 404:** `{ "success": false, "message": "Testimonial not found." }`

---

#### `POST /testimonials`

Creates a new testimonial.

**Auth:** Admin (`x-api-key`)

**Request body:**
```json
{
  "name":       "Jane Smith",
  "role":       "VP of Product",
  "company":    "ExampleCorp",
  "review":     "Exceptional quality and communication.",
  "rating":     5,
  "avatar":     "https://example.com/avatar.jpg",
  "isFeatured": true,
  "sortOrder":  3
}
```

**Validation rules:**

| Field | Required | Rules |
|-------|----------|-------|
| `name` | ✅ | Non-empty, max 120 chars |
| `role` | ❌ | max 150 chars |
| `company` | ❌ | max 120 chars |
| `review` | ✅ | Non-empty |
| `rating` | ❌ | Integer 1–5, defaults to 5 |
| `avatar` | ❌ | Valid URL |
| `isFeatured` | ❌ | Boolean, defaults to `false` |
| `sortOrder` | ❌ | Integer min 0, defaults to 0 |

**Response 201:** Created testimonial object.

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/testimonials \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_ADMIN_API_KEY" \
  -d '{
    "name": "Jane Smith",
    "role": "VP of Product",
    "company": "ExampleCorp",
    "review": "Exceptional quality and communication.",
    "rating": 5
  }'
```

---

#### `PATCH /testimonials/:id`

Updates a testimonial (partial).

**Auth:** Admin (`x-api-key`)

**Example cURL:**
```bash
curl -X PATCH http://localhost:5000/api/v1/testimonials/<uuid> \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_ADMIN_API_KEY" \
  -d '{ "isFeatured": true, "sortOrder": 1 }'
```

---

#### `DELETE /testimonials/:id`

Permanently deletes a testimonial.

**Auth:** Admin (`x-api-key`)

**Response 200:** `{ "success": true, "message": "Testimonial deleted." }`

---

### 8. Book a Call

**Base path:** `/book-a-call`

#### `POST /book-a-call`

Submits a discovery call booking request. Triggers email notifications to the team and a confirmation to the submitter.

**Auth:** None  
**Rate limit:** Form limiter — 5 submissions per IP per hour

**Request body:**
```json
{
  "name":          "Rahul Sharma",
  "email":         "rahul@example.com",
  "company":       "TechCorp India",
  "phone":         "+91 98765 43210",
  "preferredDate": "2026-08-15",
  "message":       "Looking to discuss a custom SaaS build."
}
```

**Validation rules:**

| Field | Required | Rules |
|-------|----------|-------|
| `name` | ✅ | Non-empty, max 120 chars |
| `email` | ✅ | Valid email, normalised |
| `company` | ❌ | max 120 chars |
| `phone` | ❌ | max 30 chars |
| `preferredDate` | ❌ | ISO 8601 date `YYYY-MM-DD` |
| `message` | ❌ | max 2000 chars |

**Response 201:**
```json
{
  "success":   true,
  "bookingId": "uuid",
  "data": {
    "id":            "uuid",
    "name":          "Rahul Sharma",
    "email":         "rahul@example.com",
    "company":       "TechCorp India",
    "phone":         "+91 98765 43210",
    "preferredDate": "2026-08-15T00:00:00.000Z",
    "message":       "Looking to discuss a custom SaaS build.",
    "status":        "pending",
    "createdAt":     "2026-07-06T14:00:00.000Z",
    "updatedAt":     "2026-07-06T14:00:00.000Z"
  }
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/book-a-call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "preferredDate": "2026-08-15"
  }'
```

---

#### `GET /book-a-call`

Returns a paginated list of all booking requests.

**Auth:** Admin (`x-api-key`)

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `status` | string | — | Filter: `pending`, `confirmed`, `completed`, `cancelled` |
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Records per page |

**Response 200:**
```json
{
  "success": true,
  "total":   42,
  "page":    1,
  "limit":   20,
  "pages":   3,
  "data":    [ ]
}
```

**Example cURL:**
```bash
curl "http://localhost:5000/api/v1/book-a-call?status=pending&page=1&limit=10" \
  -H "x-api-key: YOUR_ADMIN_API_KEY"
```

---

#### `PATCH /book-a-call/:id`

Updates a booking's status.

**Auth:** Admin (`x-api-key`)

**Request body:**
```json
{ "status": "confirmed" }
```

**Valid status values:** `pending`, `confirmed`, `completed`, `cancelled`

**Response 200:** Updated booking object.

**Example cURL:**
```bash
curl -X PATCH http://localhost:5000/api/v1/book-a-call/<uuid> \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_ADMIN_API_KEY" \
  -d '{ "status": "confirmed" }'
```

---

#### `DELETE /book-a-call/:id`

Permanently deletes a booking.

**Auth:** Admin (`x-api-key`)

**Response 200:** `{ "success": true, "message": "Deleted." }`

---

## Environment Variables Reference

Set these in `backend/.env` (development) or your hosting dashboard (staging/production).

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | ❌ | Server port. Defaults to `5000` |
| `NODE_ENV` | ❌ | `development`, `production`, or `test` |
| `DATABASE_URL` | ✅ | PostgreSQL connection string (transaction pooler, port 6543) |
| `DIRECT_URL` | ✅ | Direct connection URL for Prisma Migrate (port 5432) |
| `ALLOWED_ORIGINS` | ✅ | Comma-separated CORS origins (e.g. `http://localhost:3000`) |
| `ADMIN_API_KEY` | ✅ | Secret key for all admin-only routes |
| `SENDGRID_API_KEY` | ❌* | SendGrid API key — if set, bypasses SMTP config below |
| `SMTP_HOST` | ❌* | SMTP hostname (fallback when SendGrid not configured) |
| `SMTP_PORT` | ❌* | SMTP port (default 465) |
| `SMTP_SECURE` | ❌* | Use TLS: `true` or `false` |
| `SMTP_USER` | ❌* | SMTP username |
| `SMTP_PASS` | ❌* | SMTP password / app password |
| `NOTIFY_EMAIL` | ✅ | Internal inbox for contact + booking notifications |
| `MAIL_FROM` | ❌ | Sender name/address. Default: `"Accemberg" <noreply@accemberg.com>` |

> \* At least one of SendGrid or SMTP must be configured for email to work.

---

## Staging Verification Checklist

Use this checklist after deploying to staging. Run each item in order.

### Environment Setup
- [ ] All environment variables set in hosting dashboard
- [ ] `npm run db:seed` executed against staging database
- [ ] `npm run db:push` run if schema has changed

### Endpoint Smoke Tests
```bash
export API="https://api-staging.accemberg.com/api/v1"
export KEY="YOUR_STAGING_ADMIN_API_KEY"

# 1. Health
curl $API/health

# 2. Catalogue (read-only — should return seeded data)
curl $API/services
curl $API/products
curl $API/partners

# 3. FAQs
curl $API/faq

# 4. Testimonials
curl $API/testimonials

# 5. Contact form submission
curl -X POST $API/contact \
  -H "Content-Type: application/json" \
  -d '{ "name":"Staging Test","email":"staging@test.com","subject":"Test","message":"End-to-end staging test." }'

# 6. Book a call
curl -X POST $API/book-a-call \
  -H "Content-Type: application/json" \
  -d '{ "name":"Staging Test","email":"staging@test.com","preferredDate":"2026-09-01" }'

# 7. Admin — list bookings
curl "$API/book-a-call?page=1&limit=5" -H "x-api-key: $KEY"
```

### Email Verification
- [ ] Contact form submission → internal notification arrives in `NOTIFY_EMAIL` inbox
- [ ] Contact form submission → auto-reply arrives at submitter email
- [ ] Book a Call submission → team notification arrives in `NOTIFY_EMAIL` inbox
- [ ] Book a Call submission → confirmation email arrives at submitter email

### Integration Bugs (Avik's wiring checklist)
- [ ] Frontend `POST /contact` call uses correct `Content-Type: application/json`
- [ ] Frontend handles `409 Conflict` gracefully (show "already submitted" message)
- [ ] Frontend handles `400` validation errors and maps `errors[]` to form fields
- [ ] Frontend handles `429 Too Many Requests` and shows cooldown message
- [ ] CORS allows the production frontend origin (add to `ALLOWED_ORIGINS`)
