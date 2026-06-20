// api/send-contact.js
// POST /api/send-contact
// Validates the "Tell me about your project" contact form and emails it to Mpho.
// This is intentionally separate from /api/create-booking, which is only for
// the "Schedule a Call" flow and requires an appointment date/time.

import nodemailer from 'nodemailer';

// ── Sanitise ──────────────────────────────────────────────────────────────────
function sanitise(str, maxLen = 2000) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim().slice(0, maxLen);
}

// ── Email transporter ─────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── Email to Mpho ─────────────────────────────────────────────────────────────
function buildOwnerEmail({ name, email, subject, message }) {
  return {
    from:    `"CodeWithMpho Portfolio" <${process.env.SMTP_USER}>`,
    to:      process.env.CONTACT_EMAIL || 'officialcodewithmpho@gmail.com',
    replyTo: email,
    subject: `📬 New Contact Form Message – ${subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f7f4;padding:32px;border-radius:12px;">
        <h2 style="color:#c9922a;margin-bottom:4px;">New Contact Form Message</h2>
        <p style="color:#888;font-size:13px;margin-top:0;">Received via your CodeWithMpho portfolio</p>
        <hr style="border:none;border-top:1px solid #e0d5c5;margin:20px 0;" />
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#666;font-size:14px;width:90px;"><strong>Name</strong></td>
            <td style="padding:8px 0;color:#1a1612;font-size:14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;font-size:14px;"><strong>Email</strong></td>
            <td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}" style="color:#c9922a;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;font-size:14px;"><strong>Subject</strong></td>
            <td style="padding:8px 0;color:#1a1612;font-size:14px;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top:20px;">
          <p style="color:#666;font-size:14px;font-weight:bold;margin-bottom:8px;">Message:</p>
          <div style="background:#fff;border:1px solid #e0d5c5;border-radius:8px;padding:16px;color:#1a1612;font-size:14px;line-height:1.7;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color:#999;font-size:12px;margin-top:24px;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  };
}

// ── Confirmation email to the sender ──────────────────────────────────────────
function buildClientEmail({ name, email, subject }) {
  return {
    from:    `"Mpho – CodeWithMpho" <${process.env.SMTP_USER}>`,
    to:      email,
    subject: `✅ I've received your message – ${subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f7f4;padding:32px;border-radius:12px;">
        <h2 style="color:#c9922a;">Thanks for reaching out!</h2>
        <p style="color:#5a5248;line-height:1.7;">Hi ${name},</p>
        <p style="color:#5a5248;line-height:1.7;">I've received your message about "<strong>${subject}</strong>" and will get back to you within 24 hours.</p>
        <p style="color:#5a5248;line-height:1.7;">If it's urgent, feel free to WhatsApp me directly at +27 67 111 2527.</p>
        <p style="color:#5a5248;margin-top:28px;">Best regards,<br>
          <strong style="color:#1a1612;">Mpho Nethomboni</strong><br>
          <span style="color:#c9922a;font-size:13px;">Full-Stack Developer · CodeWithMpho</span>
        </p>
      </div>
    `,
  };
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const body = req.body || {};

  const name    = sanitise(body.name, 200);
  const email   = sanitise(body.email, 200);
  const subject = sanitise(body.subject, 200);
  const message = sanitise(body.message, 5000);

  // ── Required fields ─────────────────────────────────────────────────────────
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, subject and message are all required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  // ── Send email to Mpho (this must succeed for the request to succeed) ────────
  try {
    const transporter = createTransporter();
    await transporter.sendMail(buildOwnerEmail({ name, email, subject, message }));

    // Confirmation email to the sender is best-effort — don't fail the request over it
    try {
      await transporter.sendMail(buildClientEmail({ name, email, subject }));
    } catch (confirmErr) {
      console.error('send-contact confirmation email error:', confirmErr);
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('send-contact error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please email me directly at officialcodewithmpho@gmail.com',
    });
  }
}
