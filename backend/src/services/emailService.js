'use strict';

const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const FROM = process.env.MAIL_FROM || '"Accemberg" <noreply@accemberg.com>';
const NOTIFY = process.env.NOTIFY_EMAIL || 'admin@accemberg.com';

// Configure SendGrid if key is provided
const isSendGridActive = !!process.env.SENDGRID_API_KEY;
if (isSendGridActive) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/* ── Transporter (lazy-initialised for standard SMTP) ────────────────────── */
let _transporter = null;
function getTransporter() {
  if (_transporter) return _transporter;
  _transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return _transporter;
}

/**
 * Universal mail sender — routing to SendGrid HTTP API or Nodemailer SMTP
 */
async function sendMail({ to, subject, html }) {
  if (isSendGridActive) {
    await sgMail.send({
      to,
      from: FROM,
      subject,
      html,
    });
  } else {
    await getTransporter().sendMail({
      from: FROM,
      to,
      subject,
      html,
    });
  }
}

/* ── HTML helpers ─────────────────────────────────────────────────────────── */
function row(label, value) {
  if (!value) return '';
  return `<tr>
    <td style="padding:6px 14px;color:#7D93AE;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:6px 14px;color:#EFF4FA;font-size:13px">${value}</td>
  </tr>`;
}

function layout(badge, bodyHtml) {
  return `<!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#070B10;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#070B10;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0D1318;border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;max-width:600px;width:100%">
        <tr><td style="background:#131B24;padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.06)">
          <span style="font-size:20px;font-weight:700;color:#EFF4FA;letter-spacing:-0.02em">Accemberg</span>
          <span style="font-size:11px;color:#1A8FFF;margin-left:12px;letter-spacing:0.1em;text-transform:uppercase">${badge}</span>
        </td></tr>
        <tr><td style="padding:32px">${bodyHtml}</td></tr>
        <tr><td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
          <p style="margin:0;font-size:11px;color:#3F5060">© ${new Date().getFullYear()} Accemberg — Innovating Digital Futures</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/* ── Contact Emails ───────────────────────────────────────────────────────── */

async function sendContactNotification(contact) {
  const html = layout('New Contact Submission', `
    <p style="margin:0 0 20px;color:#EFF4FA;font-size:15px">New message received via the website contact form.</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid rgba(255,255,255,0.08);border-radius:6px;overflow:hidden;margin-bottom:20px">
      ${row('Name', contact.name)}
      ${row('Email', contact.email)}
      ${row('Subject', contact.subject)}
    </table>
    <div style="background:#131B24;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:16px">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#3F5060">Message</p>
      <p style="margin:0;color:#EFF4FA;font-size:14px;line-height:1.75;white-space:pre-wrap">${contact.message}</p>
    </div>
    <p style="margin:20px 0 0;font-size:12px;color:#3F5060">Received: ${new Date(contact.submittedAt).toUTCString()}</p>
  `);

  await sendMail({
    to: NOTIFY,
    subject: `[Contact] ${contact.subject} — ${contact.name}`,
    html,
  });
}

async function sendContactAutoReply(contact) {
  const html = layout("We've received your message", `
    <p style="margin:0 0 16px;color:#EFF4FA;font-size:15px">Hi ${contact.name},</p>
    <p style="margin:0 0 16px;color:#7D93AE;font-size:15px;line-height:1.75">
      Thank you for reaching out. We've received your message and will respond within
      <strong style="color:#EFF4FA">1–2 business days</strong>.
    </p>
    <p style="margin:0 0 24px;color:#7D93AE;font-size:15px">
      For urgent matters, reply directly to this email.
    </p>
    <p style="margin:0;color:#EFF4FA;font-size:14px">Best regards,<br><strong>The Accemberg Team</strong></p>
  `);

  await sendMail({
    to: contact.email,
    subject: 'We received your message — Accemberg',
    html,
  });
}

/* ── Book a Call Emails ───────────────────────────────────────────────────── */

async function sendBookACallNotification(booking) {
  const html = layout('New Call Booking', `
    <p style="margin:0 0 20px;color:#EFF4FA;font-size:15px">A discovery call has been requested.</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid rgba(255,255,255,0.08);border-radius:6px;overflow:hidden;margin-bottom:20px">
      ${row('Name', booking.name)}
      ${row('Email', booking.email)}
      ${row('Company', booking.company)}
      ${row('Phone', booking.phone)}
      ${row('Preferred Date', booking.preferredDate ? new Date(booking.preferredDate).toDateString() : '—')}
    </table>
    ${booking.message ? `
    <div style="background:#131B24;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:16px">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#3F5060">Message</p>
      <p style="margin:0;color:#EFF4FA;font-size:14px;line-height:1.75;white-space:pre-wrap">${booking.message}</p>
    </div>` : ''}
  `);

  const companySuffix = booking.company ? ` from ${booking.company}` : '';
  await sendMail({
    to: NOTIFY,
    subject: `New Call Booking — ${booking.name}${companySuffix}`,
    html,
  });
}

async function sendBookACallConfirmation(booking) {
  const preferredBlock = booking.preferredDate ? `
    <div style="margin:0 0 24px;background:#131B24;border:1px solid rgba(26,143,255,0.2);border-radius:6px;padding:16px">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#1A8FFF">Your preferred slot</p>
      <p style="margin:0;color:#EFF4FA;font-size:14px">${new Date(booking.preferredDate).toDateString()}</p>
    </div>` : '';

  const html = layout('Call Request Received', `
    <p style="margin:0 0 16px;color:#EFF4FA;font-size:15px">Hi ${booking.name},</p>
    <p style="margin:0 0 16px;color:#7D93AE;font-size:15px;line-height:1.75">
      We've received your call request and will send you a confirmed meeting link within
      <strong style="color:#EFF4FA">1 business day</strong>.
    </p>
    ${preferredBlock}
    <p style="margin:0;color:#EFF4FA;font-size:14px">Best regards,<br><strong>The Accemberg Team</strong></p>
  `);

  await sendMail({
    to: booking.email,
    subject: 'Your Accemberg call request — confirmed',
    html,
  });
}

module.exports = {
  sendContactNotification,
  sendContactAutoReply,
  sendBookACallNotification,
  sendBookACallConfirmation,
};
