# Accemberg API Contract

**Base URL (dev):** `http://localhost:5000/api/v1`  
**Base URL (prod):** `https://api.accemberg.com/api/v1`  
**Content-Type:** `application/json`  
**API Version:** v1  
**Last Updated:** 2026-07-08

---

## Authentication

Admin-only routes require the `x-api-key` header:

```
x-api-key: <ADMIN_API_KEY>
```

The server key is set via the `ADMIN_API_KEY` environment variable. Missing or incorrect keys return `401`.

Public routes require **no authentication**.

---

## Global Response Envelope

All responses follow a consistent envelope:

```json
{
  "success": true | false,
  "data":    <object | array>,      // present on success
  "message": "<string>",            // present on error or informational responses
  "total":   <number>               // present on list responses
}
```

### Common Error Codes

| HTTP Status | Meaning                             |
|-------------|-------------------------------------|
| 400         | Validation error (see `errors[]`)   |
| 401         | Missing or invalid `x-api-key`      |
| 404         | Resource not found                  |
| 409         | Conflict (unique constraint)        |
| 429         | Rate limit exceeded                 |
| 500         | Internal server error               |
| 503         | Database unavailable (health check) |

### Validation Error Shape (400)

```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Valid email is required" }
  ]
}
```

---

## Rate Limiting

| Limiter      | Scope                                    | Limit                   |
|--------------|------------------------------------------|-------------------------|
| General      | All `GET` routes under `/api/*`          | 100 req / 15 min per IP |
| Form limiter | `POST /contact`, `POST /book-a-call`     | 5 req / 1 hr per IP     |

---

## Endpoints

---

### 1. Health Check

#### `GET /health`

Verifies server and database connectivity. Used by uptime monitors.

**Auth:** None  
**Rate limit:** General

**Response 200 — Healthy:**
```json
{
  "success": true,
  "status": "ok",
  "db": "connected",
  "timestamp": "2026-07-06T14:00:00.000Z"
}
```

**Response 503 — Degraded:**
```json
{
  "success": false,
  "status": "degraded",
  "db": "error",
  "timestamp": "2026-07-06T14:00:00.000Z"
}
```

---

### 2. Services

#### `GET /services`

Returns the full services catalogue ordered by `order` ascending.

**Auth:** None  
**Rate limit:** General

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

---

### 3. Products

#### `GET /products`

Returns the SaaS products catalogue ordered by `createdAt` ascending.

**Auth:** None  
**Rate limit:** General

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

---

### 4. Partners

#### `GET /partners`

Returns partner/client logos. Defaults to **verified partners only** (`isVerified=true`).  
Pass `?all=true` to include unverified partners.

**Auth:** None  
**Rate limit:** General

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

---

### 5. Contact

#### `POST /contact`

Submits a website contact form. Stores to DB, then sends:
- Internal notification email to the team
- Auto-reply confirmation to the submitter

**Auth:** None  
**Rate limit:** Form limiter — 5 submissions per IP per hour

**Request Body:**
```json
{
  "name":    "Priya Mehta",
  "email":   "priya@example.com",
  "subject": "Partnership Enquiry",
  "message": "Hi, I would like to explore a partnership opportunity."
}
```

**Validation Rules:**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `name` | string | ✅ | Non-empty, min 2 chars, max 100 chars |
| `email` | string | ✅ | Valid email format, normalised |
| `subject` | string | ✅ | Non-empty, min 3 chars, max 200 chars |
| `message` | string | ✅ | Non-empty, min 10 chars, max 2000 chars |

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

---

### 6. FAQs

**Base path:** `/faq` (alias: `/faqs`)

#### `GET /faq`

Returns all **active** FAQs ordered by `order` ascending.

**Auth:** None  
**Query params:** None

**Response 200:**
```json
{
  "success": true,
  "total": 6,
  "data": [
    {
      "id": "uuid",
      "question": "What is Accemberg?",
      "answer": "Accemberg is a hybrid venture studio...",
      "order": 1,
      "isActive": true,
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    }
  ]
}
```

---

#### `GET /faq/:id`

Returns a single FAQ by UUID (regardless of `isActive` state).

**Auth:** None  
**Path params:**

| Param | Type | Validation        |
|-------|------|-------------------|
| `id`  | UUID | Must be valid UUID |

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "question": "What is Accemberg?",
    "answer": "Accemberg is a hybrid venture studio...",
    "order": 1,
    "isActive": true,
    "createdAt": "2026-07-01T00:00:00.000Z",
    "updatedAt": "2026-07-01T00:00:00.000Z"
  }
}
```

**Response 404:**
```json
{ "success": false, "message": "FAQ not found." }
```

---

#### `POST /faq`

Creates a new FAQ entry.

**Auth:** Admin (`x-api-key`)

**Request Body:**
```json
{
  "question": "How long does a project take?",
  "answer":   "Typically 4–6 weeks for a rapid SaaS MVP.",
  "order":    7,
  "isActive": true
}
```

**Validation Rules:**

| Field      | Type    | Required | Rules                            |
|------------|---------|----------|----------------------------------|
| `question` | string  | ✅       | Non-empty, max 400 chars         |
| `answer`   | string  | ✅       | Non-empty                        |
| `order`    | integer | ❌       | min: 0, defaults to 0            |
| `isActive` | boolean | ❌       | defaults to `true`               |

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "question": "How long does a project take?",
    "answer": "Typically 4–6 weeks for a rapid SaaS MVP.",
    "order": 7,
    "isActive": true,
    "createdAt": "2026-07-06T14:00:00.000Z",
    "updatedAt": "2026-07-06T14:00:00.000Z"
  }
}
```

---

#### `PATCH /faq/:id`

Updates an existing FAQ (partial updates supported — send only fields to change).

**Auth:** Admin (`x-api-key`)  
**Path params:** `id` — valid UUID

**Request Body (all optional):**
```json
{
  "question": "Updated question text",
  "answer":   "Updated answer text",
  "order":    3,
  "isActive": false
}
```

**Validation Rules:** Same as POST.

**Response 200:**
```json
{
  "success": true,
  "data": { /* updated FAQ object */ }
}
```

---

#### `DELETE /faq/:id`

Permanently deletes an FAQ.

**Auth:** Admin (`x-api-key`)  
**Path params:** `id` — valid UUID

**Response 200:**
```json
{ "success": true, "message": "FAQ deleted." }
```

---

### 7. Testimonials

**Base path:** `/testimonials` (alias: `/testimonial`)

#### `GET /testimonials`

Returns all **active** testimonials. Featured ones appear first, then by `sortOrder` ascending.

**Auth:** None  
**Query params:**

| Param      | Type    | Default | Description                            |
|------------|---------|---------|----------------------------------------|
| `featured` | boolean | —       | Pass `true` to filter featured only    |

**Example:** `GET /testimonials?featured=true`

**Response 200:**
```json
{
  "success": true,
  "total": 3,
  "data": [
    {
      "id": "uuid",
      "name": "Sarah Connor",
      "role": "CTO",
      "company": "Cyberdyne Systems",
      "review": "Accemberg delivered our system integration ahead of schedule.",
      "rating": 5,
      "avatar": "https://...",
      "isFeatured": true,
      "sortOrder": 0,
      "isActive": true,
      "createdAt": "2026-06-01T10:00:00.000Z",
      "updatedAt": "2026-06-01T10:00:00.000Z"
    }
  ]
}
```

---

#### `GET /testimonials/:id`

Returns a single testimonial by UUID.

**Auth:** None  
**Path params:** `id` — valid UUID

**Response 200:**
```json
{
  "success": true,
  "data": { /* testimonial object */ }
}
```

**Response 404:**
```json
{ "success": false, "message": "Testimonial not found." }
```

---

#### `POST /testimonials`

Creates a new testimonial.

**Auth:** Admin (`x-api-key`)

**Request Body:**
```json
{
  "name":       "Elon Musk",
  "role":       "CEO",
  "company":    "SpaceX",
  "review":     "Lightning fast delivery, pixel-perfect execution.",
  "rating":     5,
  "avatar":     "https://example.com/avatar.jpg",
  "isFeatured": true,
  "sortOrder":  1
}
```

**Validation Rules:**

| Field        | Type    | Required | Rules                              |
|--------------|---------|----------|------------------------------------|
| `name`       | string  | ✅       | Non-empty, max 120 chars           |
| `role`       | string  | ❌       | max 150 chars                      |
| `company`    | string  | ❌       | max 120 chars                      |
| `review`     | string  | ✅       | Non-empty                          |
| `rating`     | integer | ❌       | min: 1, max: 5, defaults to 5      |
| `avatar`     | string  | ❌       | Must be a valid URL                |
| `isFeatured` | boolean | ❌       | defaults to `false`                |
| `sortOrder`  | integer | ❌       | min: 0, defaults to 0              |

**Response 201:**
```json
{
  "success": true,
  "data": { /* created testimonial object */ }
}
```

---

#### `PATCH /testimonials/:id`

Updates an existing testimonial (partial updates supported).

**Auth:** Admin (`x-api-key`)  
**Request Body:** Same fields as POST, all optional.

**Response 200:**
```json
{
  "success": true,
  "data": { /* updated testimonial object */ }
}
```

---

#### `DELETE /testimonials/:id`

Permanently deletes a testimonial.

**Auth:** Admin (`x-api-key`)

**Response 200:**
```json
{ "success": true, "message": "Testimonial deleted." }
```

---

### 8. Book a Call

**Base path:** `/book-a-call`

#### `POST /book-a-call`

Submits a discovery call booking request (public). Triggers email notifications to both the team and the submitter.

**Auth:** None  
**Rate limit:** Form limiter — 5 submissions per IP per hour

**Request Body:**
```json
{
  "name":          "Rahul Sharma",
  "email":         "rahul@example.com",
  "company":       "TechCorp India",
  "phone":         "+91 98765 43210",
  "preferredDate": "2026-08-15",
  "message":       "Looking to discuss a custom SaaS build for our HR workflow."
}
```

**Validation Rules:**

| Field           | Type   | Required | Rules                                      |
|-----------------|--------|----------|--------------------------------------------|
| `name`          | string | ✅       | Non-empty, max 120 chars                   |
| `email`         | string | ✅       | Valid email format, normalised             |
| `company`       | string | ❌       | max 120 chars                              |
| `phone`         | string | ❌       | max 30 chars                               |
| `preferredDate` | string | ❌       | ISO 8601 date (`YYYY-MM-DD`)               |
| `message`       | string | ❌       | max 2000 chars                             |

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
    "message":       "Looking to discuss...",
    "status":        "pending",
    "createdAt":     "2026-07-06T14:00:00.000Z",
    "updatedAt":     "2026-07-06T14:00:00.000Z"
  }
}
```

---

#### `GET /book-a-call`

Returns a paginated list of all bookings.

**Auth:** Admin (`x-api-key`)  
**Query params:**

| Param    | Type    | Default | Description                                          |
|----------|---------|---------|------------------------------------------------------|
| `status` | string  | —       | Filter by status: `pending`, `confirmed`, `completed`, `cancelled` |
| `page`   | integer | 1       | Page number (1-indexed)                              |
| `limit`  | integer | 20      | Records per page                                     |

**Example:** `GET /book-a-call?status=pending&page=1&limit=10`

**Response 200:**
```json
{
  "success": true,
  "total":   42,
  "page":    1,
  "limit":   10,
  "pages":   5,
  "data": [
    { /* booking object */ }
  ]
}
```

---

#### `PATCH /book-a-call/:id`

Updates the status of a booking.

**Auth:** Admin (`x-api-key`)  
**Path params:** `id` — valid UUID

**Request Body:**
```json
{ "status": "confirmed" }
```

**Validation Rules:**

| Field    | Type   | Required | Rules                                                   |
|----------|--------|----------|---------------------------------------------------------|
| `status` | string | ✅       | One of: `pending`, `confirmed`, `completed`, `cancelled` |

**Response 200:**
```json
{
  "success": true,
  "data": { /* updated booking object */ }
}
```

---

#### `DELETE /book-a-call/:id`

Permanently deletes a booking record.

**Auth:** Admin (`x-api-key`)

**Response 200:**
```json
{ "success": true, "message": "Deleted." }
```

---

## DB Schema Quick Reference

| Model         | Table           | Key Fields                                                                 |
|---------------|-----------------|----------------------------------------------------------------------------|
| `Contact`     | `contacts`      | `id`, `name`, `email`, `subject`, `message`, `submittedAt`                |
| `BookACall`   | `book_a_calls`  | `id`, `name`, `email`, `phone`, `company`, `preferredDate`, `message`, `status` |
| `Testimonial` | `testimonials`  | `id`, `name`, `role`, `company`, `review`, `rating`, `avatar`, `isFeatured`, `sortOrder`, `isActive` |
| `Faq`         | `faqs`          | `id`, `question`, `answer`, `order`, `isActive`                           |
| `Partner`     | `partners`      | `id`, `name`, `logoUrl`, `website`, `isVerified`                          |
| `Service`     | `services`      | `id`, `title`, `description`, `icon`, `order`                             |
| `Product`     | `products`      | `id`, `name`, `description`, `features[]`, `ctaLink`, `badge`             |

---

## Changelog

| Date       | Author      | Change                                                                              |
|------------|-------------|-------------------------------------------------------------------------------------|
| 2026-07-06 | Antigravity | Initial contract document created                                                   |
| 2026-07-08 | Antigravity | Fixed dev port (4000→5000); added Services, Products, Partners, Contact sections; removed stale notes |
