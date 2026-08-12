'use strict';

const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prisma');
const emailService = require('../src/services/emailService');

// Mock Prisma Client and Email Service
jest.mock('../src/config/prisma', () => ({
  bookACall: {
    create: jest.fn(),
  },
}));

jest.mock('../src/services/emailService', () => ({
  sendBookACallNotification: jest.fn().mockResolvedValue(true),
  sendBookACallConfirmation: jest.fn().mockResolvedValue(true),
}));

describe('POST /api/book-a-call', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create a call booking with valid data', async () => {
    const validData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'Acme Corp',
      phone: '+1234567890',
      preferredDate: '2026-07-15T00:00:00.000Z',
      message: 'Hello, looking forward to the call.',
    };

    prisma.bookACall.create.mockResolvedValue({
      id: 'abc-123-xyz',
      ...validData,
      preferredDate: new Date(validData.preferredDate),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/book-a-call')
      .send(validData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      bookingId: 'abc-123-xyz',
      data: expect.objectContaining({
        id: 'abc-123-xyz',
        name: 'John Doe',
        email: 'john.doe@example.com',
      }),
    });

    expect(prisma.bookACall.create).toHaveBeenCalledTimes(1);
    expect(prisma.bookACall.create).toHaveBeenCalledWith({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Acme Corp',
        phone: '+1234567890',
        preferredDate: expect.any(Date),
        message: 'Hello, looking forward to the call.',
      },
    });

    // Expect email notifications to have been triggered
    expect(emailService.sendBookACallNotification).toHaveBeenCalledTimes(1);
    expect(emailService.sendBookACallConfirmation).toHaveBeenCalledTimes(1);
  });

  it('should successfully create a booking without optional fields', async () => {
    const minimalData = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    };

    prisma.bookACall.create.mockResolvedValue({
      id: 'def-456-uvw',
      ...minimalData,
      phone: null,
      company: null,
      preferredDate: null,
      message: null,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/book-a-call')
      .send(minimalData);

    expect(response.status).toBe(201);
    expect(response.body.bookingId).toBe('def-456-uvw');
    expect(prisma.bookACall.create).toHaveBeenCalledTimes(1);
    expect(emailService.sendBookACallNotification).toHaveBeenCalledTimes(1);
  });

  it('should fail validation (400) if name is missing', async () => {
    const invalidData = {
      email: 'missing.name@example.com',
    };

    const response = await request(app)
      .post('/api/book-a-call')
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.some(err => err.field === 'name')).toBe(true);
    expect(prisma.bookACall.create).not.toHaveBeenCalled();
  });

  it('should fail validation (400) if email format is invalid', async () => {
    const invalidData = {
      name: 'Bob Ross',
      email: 'invalid-email-format',
    };

    const response = await request(app)
      .post('/api/book-a-call')
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body.errors.some(err => err.field === 'email')).toBe(true);
    expect(prisma.bookACall.create).not.toHaveBeenCalled();
  });

  it('should fail validation (400) if preferredDate is not in ISO format', async () => {
    const invalidData = {
      name: 'Alice Cooper',
      email: 'alice@example.com',
      preferredDate: 'not-a-date-string',
    };

    const response = await request(app)
      .post('/api/book-a-call')
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body.errors.some(err => err.field === 'preferredDate')).toBe(true);
    expect(prisma.bookACall.create).not.toHaveBeenCalled();
  });
});
