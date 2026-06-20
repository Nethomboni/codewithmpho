// ============================================
// SERVER.JS - CodeWithMpho Portfolio Backend
// Node.js + Express contact form handler
// ============================================

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from portfolio root
app.use(express.static(path.join(__dirname)));

// ---- Rate limiting (simple in-memory) ----
const requestCounts = {};
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  if (!requestCounts[ip]) requestCounts[ip] = [];
  requestCounts[ip] = requestCounts[ip].filter(t => now - t < 60000);
  if (requestCounts[ip].length >= 5) {
    return res.status(429).json({ success: false, message: 'Too many requests. Please wait a minute.' });
  }
  requestCounts[ip].push(now);
  next();
}

// ---- Input sanitiser ----
function sanitise(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim().slice(0, 2000);
}

// ---- Email transporter ----
// Configure with your real SMTP credentials or use a service like Resend / SendGrid
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
});

// ---- Contact form endpoint ----
app.post('/send-email', rateLimit, async (req, res) => {
  const name = sanitise(req.body.name || '');
  const email = sanitise(req.body.email || '');
  const subject = sanitise(req.body.subject || '');
  const message = sanitise(req.body.message || '');

  // Validate
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  const mailOptions = {
    from: `"CodeWithMpho Portfolio" <${process.env.SMTP_USER || 'your-email@gmail.com'}>`,
    to: process.env.CONTACT_EMAIL || 'hello@codewithmpho.com',
    replyTo: email,
    subject: `[Portfolio Contact] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 12px;">
        <h2 style="color: #c9922a; margin-bottom: 8px;">New Message from Portfolio</h2>
        <hr style="border: none; border-top: 1px solid #e0d5c5; margin-bottom: 24px;" />

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px; width: 100px;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; color: #1a1612; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; color: #1a1612; font-size: 14px;"><a href="mailto:${email}" style="color:#c9922a;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Subject:</strong></td>
            <td style="padding: 8px 0; color: #1a1612; font-size: 14px;">${subject}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <p style="color: #666; font-size: 14px; font-weight: bold; margin-bottom: 8px;">Message:</p>
          <div style="background: #fff; border: 1px solid #e0d5c5; border-radius: 8px; padding: 16px; color: #1a1612; font-size: 14px; line-height: 1.7;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 24px;">Sent via CodeWithMpho Portfolio contact form</p>
      </div>
    `,
  };

  // Auto-reply to sender
  const autoReplyOptions = {
    from: `"Mpho – CodeWithMpho" <${process.env.SMTP_USER || 'your-email@gmail.com'}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 12px;">
        <h2 style="color: #c9922a;">Thanks for getting in touch!</h2>
        <p style="color: #5a5248; line-height: 1.7;">Hi ${name},</p>
        <p style="color: #5a5248; line-height: 1.7;">Thank you for reaching out. I've received your message and will get back to you within 24 hours.</p>
        <p style="color: #5a5248; line-height: 1.7;">In the meantime, feel free to browse my work at <a href="https://codewithmpho.com" style="color:#c9922a;">codewithmpho.com</a>.</p>
        <p style="color: #5a5248; margin-top: 24px;">Best regards,<br><strong style="color:#1a1612;">Mpho</strong><br><span style="color:#c9922a;font-size:13px;">Software Developer &amp; Web Designer</span></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

// ---- Page routes ----
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'about.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'projects.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'services.html')));
app.get('/pricing', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'pricing.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'contact.html')));
app.get('/privacy-policy', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'privacy-policy.html')));
app.get('/terms-and-conditions', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'terms-and-conditions.html')));

// ---- 404 handler ----
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// ---- Start ----
app.listen(PORT, () => {
  console.log(`✅ CodeWithMpho Portfolio running at http://localhost:${PORT}`);
});

export default app;
