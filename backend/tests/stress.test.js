'use strict';

const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

// Mock prisma and email service to avoid side effects during stress testing
jest.mock('../src/config/prisma', () => ({
  contact: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
}));

jest.mock('../src/services/emailService', () => ({
  sendContactNotification: jest.fn().mockResolvedValue(true),
  sendContactAutoReply: jest.fn().mockResolvedValue(true),
}));

describe('Contact Form Endpoint Stress Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    prisma.contact.findFirst.mockResolvedValue(null); // Clear dedup
  });

  /* ── 1. Bulk Submission ─────────────────────────────────────────────────── */
  it('should handle 50 bulk submissions in rapid succession', async () => {
    const totalRequests = 50;
    const promises = [];

    // Setup prisma mock to resolve
    prisma.contact.create.mockImplementation((args) => {
      return Promise.resolve({
        id: `mock-uuid-${Math.random()}`,
        ...args.data,
        submittedAt: new Date(),
      });
    });

    for (let i = 0; i < totalRequests; i++) {
      promises.push(
        request(app)
          .post('/api/contact')
          .send({
            name: `User ${i}`,
            email: `user${i}@example.com`,
            subject: `Bulk Subject ${i}`,
            message: `Bulk message body content for request index ${i}.`,
          })
      );
    }

    const responses = await Promise.all(promises);

    responses.forEach((res) => {
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.contactId).toBeDefined();
    });

    expect(prisma.contact.create).toHaveBeenCalledTimes(50);
  });

  /* ── 2. Special Characters & XSS/SQL Injection payloads ─────────────────── */
  it('should safely escape HTML, script tags, SQL injection vectors, and Unicode/Emojis', async () => {
    const specialPayload = {
      name: '<script>alert("XSS")</script> Name',
      email: 'hacker@example.com',
      subject: "' OR 1=1; -- SQLi Subject",
      message: '😊🚀 नमस्ते (Devanagari) & こんにちは (Japanese) with "quotes" and <tags>.',
    };

    prisma.contact.create.mockImplementation(({ data }) => Promise.resolve({
      id: 'special-uuid-123',
      ...data,
      submittedAt: new Date(),
    }));

    const res = await request(app)
      .post('/api/contact')
      .send(specialPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    // Verify escaped fields are returned
    const createdData = res.body.data;
    expect(createdData.name).toContain('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt; Name');
    expect(createdData.subject).toContain('&#x27; OR 1=1; -- SQLi Subject');
    expect(createdData.message).toContain('&amp;'); // Ampersand is escaped
    expect(createdData.message).toContain('&lt;tags&gt;'); // Tags are escaped
    expect(createdData.message).toContain('&quot;quotes&quot;'); // Quotes are escaped

    expect(prisma.contact.create).toHaveBeenCalledTimes(1);
  });

  /* ── 3. Field-length Boundaries ─────────────────────────────────────────── */
  it('should accept fields exactly at their maximum length boundaries', async () => {
    const maxName = 'a'.repeat(100);
    const maxSubject = 's'.repeat(200);
    const largeMessage = 'm'.repeat(2000);

    prisma.contact.create.mockImplementation(({ data }) => Promise.resolve({
      id: 'boundary-uuid',
      ...data,
      submittedAt: new Date(),
    }));

    const res = await request(app)
      .post('/api/contact')
      .send({
        name: maxName,
        email: 'boundary@example.com',
        subject: maxSubject,
        message: largeMessage,
      });

    expect(res.status).toBe(201);
    expect(prisma.contact.create).toHaveBeenCalledTimes(1);
  });

  it('should reject submissions with name exceeding 100 characters', async () => {
    const tooLongName = 'a'.repeat(101);

    const res = await request(app)
      .post('/api/contact')
      .send({
        name: tooLongName,
        email: 'too-long@example.com',
        subject: 'Valid Subject',
        message: 'Valid message.',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.some((e) => e.field === 'name')).toBe(true);
    expect(prisma.contact.create).not.toHaveBeenCalled();
  });

  it('should reject submissions with name shorter than 2 characters', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'a',
        email: 'too-short@example.com',
        subject: 'Valid Subject',
        message: 'Valid message.',
      });

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.field === 'name')).toBe(true);
  });

  it('should reject submissions with subject exceeding 200 characters', async () => {
    const tooLongSubject = 's'.repeat(201);

    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Valid Name',
        email: 'too-long-sub@example.com',
        subject: tooLongSubject,
        message: 'Valid message.',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.some((e) => e.field === 'subject')).toBe(true);
    expect(prisma.contact.create).not.toHaveBeenCalled();
  });

  it('should reject submissions with subject shorter than 3 characters', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Valid Name',
        email: 'too-short-sub@example.com',
        subject: 'ab',
        message: 'Valid message.',
      });

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.field === 'subject')).toBe(true);
  });

  it('should reject submissions with message exceeding 2000 characters', async () => {
    const tooLongMsg = 'm'.repeat(2001);

    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Valid Name',
        email: 'too-long-msg@example.com',
        subject: 'Valid Subject',
        message: tooLongMsg,
      });

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.field === 'message')).toBe(true);
  });

  it('should reject submissions with message shorter than 10 characters', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Valid Name',
        email: 'too-short-msg@example.com',
        subject: 'Valid Subject',
        message: 'Too short',
      });

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e) => e.field === 'message')).toBe(true);
  });
});
