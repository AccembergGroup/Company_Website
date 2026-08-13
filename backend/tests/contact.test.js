'use strict';

const request      = require('supertest');
const app          = require('../src/app');
const prisma       = require('../src/config/prisma');
const emailService = require('../src/services/emailService');

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock('../src/config/prisma', () => ({
  contact: {
    create:    jest.fn(),
    findFirst: jest.fn(),
  },
}));

jest.mock('../src/services/emailService', () => ({
  sendContactNotification: jest.fn().mockResolvedValue(true),
  sendContactAutoReply:    jest.fn().mockResolvedValue(true),
}));

// ── Fixtures ──────────────────────────────────────────────────────────────────

const VALID_PAYLOAD = {
  name:    'Rahul Sharma',
  email:   'rahul.sharma@example.com',
  subject: 'Project Enquiry',
  message: 'Hi, I would like to discuss a custom SaaS project.',
};

const CREATED_RECORD = {
  id:          'contact-uuid-001',
  ...VALID_PAYLOAD,
  submittedAt: new Date('2026-07-06T14:00:00Z'),
};

// ── Test Suite ─────────────────────────────────────────────────────────────────

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default: no recent submission (dedup passes)
    prisma.contact.findFirst.mockResolvedValue(null);
  });

  /* ── Scenario 1: Valid full payload ─────────────────────────────────────── */
  it('should create a contact submission and return 201 with contactId', async () => {
    prisma.contact.create.mockResolvedValue(CREATED_RECORD);

    const res = await request(app)
      .post('/api/contact')
      .send(VALID_PAYLOAD);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.contactId).toBe('contact-uuid-001');
    expect(res.body.data).toMatchObject({
      id:      'contact-uuid-001',
      name:    'Rahul Sharma',
      email:   'rahul.sharma@example.com',
      subject: 'Project Enquiry',
    });

    expect(prisma.contact.create).toHaveBeenCalledTimes(1);
    expect(prisma.contact.create).toHaveBeenCalledWith({
      data: {
        name:    'Rahul Sharma',
        email:   expect.any(String), // normalizeEmail may lowercase
        subject: 'Project Enquiry',
        message: 'Hi, I would like to discuss a custom SaaS project.',
      },
    });
  });

  /* ── Scenario 2: Valid minimal payload (all required fields) ────────────── */
  it('should accept the minimum required fields and return 201', async () => {
    const minimal = {
      name:    'Jane Doe',
      email:   'jane@example.com',
      subject: 'Hello',
      message: 'Just saying hi.',
    };
    prisma.contact.create.mockResolvedValue({ id: 'contact-uuid-002', ...minimal, submittedAt: new Date() });

    const res = await request(app)
      .post('/api/contact')
      .send(minimal);

    expect(res.status).toBe(201);
    expect(res.body.contactId).toBe('contact-uuid-002');
    expect(prisma.contact.create).toHaveBeenCalledTimes(1);
  });

  /* ── Scenario 3: Missing name → 400 ────────────────────────────────────── */
  it('should return 400 if name is missing', async () => {
    const { name: _removed, ...payload } = VALID_PAYLOAD;

    const res = await request(app)
      .post('/api/contact')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.some((e) => e.field === 'name')).toBe(true);
    expect(prisma.contact.create).not.toHaveBeenCalled();
  });

  /* ── Scenario 4: Invalid email format → 400 ────────────────────────────── */
  it('should return 400 if email format is invalid', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...VALID_PAYLOAD, email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.field === 'email')).toBe(true);
    expect(prisma.contact.create).not.toHaveBeenCalled();
  });

  /* ── Scenario 5: Missing subject → 400 ─────────────────────────────────── */
  it('should return 400 if subject is missing', async () => {
    const { subject: _removed, ...payload } = VALID_PAYLOAD;

    const res = await request(app)
      .post('/api/contact')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.field === 'subject')).toBe(true);
    expect(prisma.contact.create).not.toHaveBeenCalled();
  });

  /* ── Scenario 6: Missing message → 400 ─────────────────────────────────── */
  it('should return 400 if message is missing', async () => {
    const { message: _removed, ...payload } = VALID_PAYLOAD;

    const res = await request(app)
      .post('/api/contact')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.field === 'message')).toBe(true);
    expect(prisma.contact.create).not.toHaveBeenCalled();
  });

  /* ── Scenario 7: Duplicate email within 5-minute window → 429 ──────────── */
  it('should return 429 if the same email submitted within the last 5 minutes', async () => {
    // Simulate an existing recent submission
    prisma.contact.findFirst.mockResolvedValue({
      id:          'contact-uuid-previous',
      email:       'rahul.sharma@example.com',
      submittedAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    });

    const res = await request(app)
      .post('/api/contact')
      .send(VALID_PAYLOAD);

    expect(res.status).toBe(429);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/already received/i);
    expect(prisma.contact.create).not.toHaveBeenCalled();
    expect(emailService.sendContactNotification).not.toHaveBeenCalled();
  });

  /* ── Scenario 8: Email service failure does NOT block the 201 response ─── */
  it('should return 201 even when email service throws', async () => {
    prisma.contact.create.mockResolvedValue(CREATED_RECORD);

    // Both email functions reject
    emailService.sendContactNotification.mockRejectedValueOnce(
      new Error('SMTP connection refused')
    );
    emailService.sendContactAutoReply.mockRejectedValueOnce(
      new Error('SMTP connection refused')
    );

    const res = await request(app)
      .post('/api/contact')
      .send(VALID_PAYLOAD);

    // Response must still be 201 — email is fire-and-forget
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.contactId).toBe('contact-uuid-001');
  });
});
