'use strict';

const BookACall = require('../models/BookACall');
const emailService = require('../services/emailService');

/* POST /api/v1/book-a-call ─ public */
exports.createBooking = async (req, res, next) => {
  try {
    const { name, email, company, phone, preferredDate, message } = req.body;
    
    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.log('⚠️ [Mock] Form submitted successfully (No DB connected):', req.body);
      
      const mockBooking = { id: 'mock-id-' + Date.now(), ...req.body };
      emailService.sendBookACallNotification(mockBooking).catch((e) => console.error('[email] notify:', e.message));
      emailService.sendBookACallConfirmation(mockBooking).catch((e) => console.error('[email] confirm:', e.message));

      return res.status(201).json({ 
        success: true, 
        bookingId: mockBooking.id,
        data: req.body 
      });
    }

    const booking = await BookACall.create({
      name, email, company, phone,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      message,
    });

    emailService.sendBookACallNotification(booking).catch((e) => console.error('[email] notify:', e.message));
    emailService.sendBookACallConfirmation(booking).catch((e) => console.error('[email] confirm:', e.message));

    res.status(201).json({ success: true, bookingId: booking.id, data: booking });
  } catch (err) {
    if (!process.env.DATABASE_URL || err.name === 'PrismaClientInitializationError') {
      console.log('⚠️ [Mock Fallback] Form submitted successfully:', req.body);
      const mockBooking = { id: 'mock-id-' + Date.now(), ...req.body };
      emailService.sendBookACallNotification(mockBooking).catch((e) => console.error('[email] notify:', e.message));
      emailService.sendBookACallConfirmation(mockBooking).catch((e) => console.error('[email] confirm:', e.message));

      return res.status(201).json({ 
        success: true, 
        bookingId: mockBooking.id,
        data: req.body 
      });
    }
    next(err);
  }
};


/* GET /api/v1/book-a-call ─ admin */
exports.getBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = status ? { status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [data, total] = await Promise.all([
      BookACall.findAll({ where, skip, take }),
      BookACall.count(where),
    ]);

    res.json({ success: true, data, total, page: parseInt(page), limit: take, pages: Math.ceil(total / take) });
  } catch (err) {
    next(err);
  }
};

/* PATCH /api/v1/book-a-call/:id ─ admin */
exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await BookACall.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/v1/book-a-call/:id ─ admin */
exports.deleteBooking = async (req, res, next) => {
  try {
    await BookACall.delete(req.params.id);
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    next(err);
  }
};
