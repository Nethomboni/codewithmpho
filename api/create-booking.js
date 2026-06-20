// api/create-booking.js
// POST /api/create-booking
// Validates, saves to Supabase, sends email notifications

import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ── Sanitise ──────────────────────────────────────────────────────────────────
function sanitise(str, maxLen = 2000) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim().slice(0, maxLen);
}

// ── Pretty date ───────────────────────────────────────────────────────────────
function prettyDate(dateStr) {
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const d = new Date(dateStr + 'T00:00:00');
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
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
function buildOwnerEmail({ name, email, appointmentDate, appointmentTime, projectDetails }) {
  const pretty = prettyDate(appointmentDate);
  return {
    from: `"CodeWithMpho Portfolio" <${process.env.SMTP_USER}>`,
    to:   process.env.CONTACT_EMAIL || 'officialcodewithmpho@gmail.com',
    subject: `📅 New Discovery Call Booking – ${pretty} at ${appointmentTime} SAST`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f7f4;padding:32px;border-radius:12px;">
        <h2 style="color:#c9922a;margin-bottom:4px;">New Discovery Call Booking</h2>
        <p style="color:#888;font-size:13px;margin-top:0;">Received via your CodeWithMpho portfolio</p>
        <hr style="border:none;border-top:1px solid #e0d5c5;margin:20px 0;" />
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#666;font-size:14px;width:130px;"><strong>Name</strong></td>
            <td style="padding:8px 0;color:#1a1612;font-size:14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;font-size:14px;"><strong>Email</strong></td>
            <td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}" style="color:#c9922a;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;font-size:14px;"><strong>Date</strong></td>
            <td style="padding:8px 0;color:#1a1612;font-size:14px;">${pretty}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;font-size:14px;"><strong>Time</strong></td>
            <td style="padding:8px 0;color:#1a1612;font-size:14px;"><strong>${appointmentTime} SAST</strong></td>
          </tr>
        </table>
        ${projectDetails ? `
        <div style="margin-top:20px;">
          <p style="color:#666;font-size:14px;font-weight:bold;margin-bottom:8px;">Project Details:</p>
          <div style="background:#fff;border:1px solid #e0d5c5;border-radius:8px;padding:16px;color:#1a1612;font-size:14px;line-height:1.7;">
            ${projectDetails.replace(/\n/g, '<br>')}
          </div>
        </div>` : ''}
        <p style="color:#999;font-size:12px;margin-top:24px;">Booked via the Schedule a Call feature on your portfolio.</p>
      </div>
    `,
  };
}

// ── Email to client ───────────────────────────────────────────────────────────
function buildClientEmail({ name, email, appointmentDate, appointmentTime }) {
  const pretty = prettyDate(appointmentDate);
  return {
    from:    `"Mpho – CodeWithMpho" <${process.env.SMTP_USER}>`,
    to:      email,
    subject: `✅ Your Discovery Call is Confirmed – ${pretty}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f7f4;padding:32px;border-radius:12px;">
        <h2 style="color:#c9922a;">Your Discovery Call is Confirmed!</h2>
        <p style="color:#5a5248;line-height:1.7;">Hi ${name},</p>
        <p style="color:#5a5248;line-height:1.7;">Your 15-minute discovery call with Mpho has been booked successfully.</p>
        <div style="background:#fff;border:1px solid #e0d5c5;border-radius:12px;padding:20px;margin:24px 0;">
          <p style="margin:0 0 8px;font-size:15px;color:#1a1612;"><strong>📅 ${pretty}</strong></p>
          <p style="margin:0;font-size:15px;color:#c9922a;"><strong>🕐 ${appointmentTime} SAST (South Africa)</strong></p>
          <p style="margin:8px 0 0;font-size:13px;color:#888;">Duration: 15 minutes &nbsp;·&nbsp; Free &nbsp;·&nbsp; Remote</p>
        </div>
        <p style="color:#5a5248;line-height:1.7;">Mpho will reach out via email or WhatsApp to share the meeting link before the call.</p>
        <p style="color:#5a5248;line-height:1.7;">Looking forward to speaking with you!</p>
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

  const name            = sanitise(body.name, 200);
  const email           = sanitise(body.email, 200);
  const projectDetails  = sanitise(body.projectDetails, 2000);
  const appointmentDate = sanitise(body.appointmentDate, 20);
  const appointmentTime = sanitise(body.appointmentTime, 10);

  // ── Required fields ─────────────────────────────────────────────────────────
  if (!name || !email || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ success: false, message: 'Name, email, date and time are required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
    return res.status(400).json({ success: false, message: 'Invalid date format. Expected YYYY-MM-DD.' });
  }

  if (!/^\d{2}:\d{2}$/.test(appointmentTime)) {
    return res.status(400).json({ success: false, message: 'Invalid time format. Expected HH:MM.' });
  }

  // ── Weekday check ────────────────────────────────────────────────────────────
  const dow = new Date(appointmentDate + 'T00:00:00').getDay();
  if (dow === 0 || dow === 6) {
    return res.status(400).json({ success: false, message: 'Bookings are only available Monday – Friday.' });
  }

  // ── Time range check ─────────────────────────────────────────────────────────
  const [hh, mm] = appointmentTime.split(':').map(Number);
  const totalMins = hh * 60 + mm;
  const morningOk = totalMins >= 360  && totalMins <= 465;  // 06:00–07:45
  const eveningOk = totalMins >= 1140 && totalMins <= 1365; // 19:00–22:45
  if (!morningOk && !eveningOk) {
    return res.status(400).json({ success: false, message: 'Selected time is outside available booking hours.' });
  }

  // ── Double-booking check ──────────────────────────────────────────────────────
  try {
    const { data: existing, error: checkError } = await supabase
      .from('appointments')
      .select('id')
      .eq('appointment_date', appointmentDate)
      .eq('appointment_time', appointmentTime + ':00')
      .maybeSingle();

    if (checkError) throw checkError;

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This time slot has already been booked. Please choose another.',
      });
    }
  } catch (err) {
    console.error('check-booking error:', err);
    return res.status(500).json({ success: false, message: 'Could not verify slot availability. Please try again later.' });
  }

  // ── Insert ────────────────────────────────────────────────────────────────────
  try {
    const { error: insertError } = await supabase
      .from('appointments')
      .insert([{
        name,
        email,
        project_details:  projectDetails || null,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime + ':00',
      }]);

    if (insertError) {
      if (insertError.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'This slot was just taken. Please choose another time.',
        });
      }
      throw insertError;
    }
  } catch (err) {
    console.error('insert-booking error:', err);
    return res.status(500).json({ success: false, message: 'Failed to save booking. Please try again.' });
  }

  // ── Send emails (non-blocking) ────────────────────────────────────────────────
  try {
    const transporter = createTransporter();
    const payload = { name, email, appointmentDate, appointmentTime, projectDetails };
    await Promise.all([
      transporter.sendMail(buildOwnerEmail(payload)),
      transporter.sendMail(buildClientEmail(payload)),
    ]);
  } catch (emailErr) {
    console.error('Email error (booking still saved):', emailErr);
  }

  return res.status(201).json({
    success: true,
    message: 'Booking confirmed!',
    booking: { name, email, appointmentDate, appointmentTime },
  });
}
