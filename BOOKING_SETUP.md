# CodeWithMpho Portfolio – Booking System Setup Guide

Complete step-by-step guide to activate the **real-time appointment booking system** with Supabase + Netlify Functions + email notifications.

---

## Architecture Overview

```
Browser (contact.html)
  │
  ├─ GET  /.netlify/functions/get-bookings?date=YYYY-MM-DD
  │        → Returns booked time slots for that date
  │
  └─ POST /.netlify/functions/create-booking
           → Validates, saves to Supabase, sends emails
```

All secrets stay server-side in Netlify environment variables. The browser never sees your API keys.

---

## Step 1 – Supabase Setup

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Name it `codewithmpho-portfolio`, choose a region close to South Africa (e.g. **eu-west-1** or **af-south-1** if available)
3. Once created, go to **SQL Editor → New query**
4. Paste the contents of `database/supabase-setup.sql` and click **Run**
5. Go to **Project Settings → API**
6. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon / public key** → `SUPABASE_ANON_KEY`

---

## Step 2 – Gmail App Password

The system uses Nodemailer with Gmail SMTP to send email notifications.

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. **Security → 2-Step Verification** (must be enabled)
3. **Security → App passwords**
4. Create a new app password → name it "Portfolio Bookings"
5. Copy the 16-character password → `SMTP_PASS`

> **Alternative:** Use [Resend](https://resend.com) or [SendGrid](https://sendgrid.com) for more reliable email delivery in production.

---

## Step 3 – Netlify Deployment

### Environment Variables

In **Netlify → Site → Environment variables**, add:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | `https://your-project.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs…` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `your-gmail@gmail.com` |
| `SMTP_PASS` | your 16-char app password |
| `CONTACT_EMAIL` | `officialcodewithmpho@gmail.com` |

### Deploy

```bash
# Push to GitHub → Netlify auto-deploys
git add .
git commit -m "feat: real-time booking system with Supabase"
git push origin main
```

Or drag-and-drop the portfolio folder into [app.netlify.com](https://app.netlify.com).

---

## Step 4 – Local Development

```bash
# Install dependencies
npm install

# Install Netlify CLI
npm install -g netlify-cli

# Copy env template
cp .env.example .env
# Fill in your real values in .env

# Run locally with Netlify Functions
netlify dev
```

The site runs at `http://localhost:8888` with Functions available at `/.netlify/functions/*`.

---

## Booking Rules

| Rule | Value |
|------|-------|
| Days | Monday – Friday only |
| Morning slots | 06:00, 06:15, 06:30 … 07:45 |
| Evening slots | 19:00, 19:15, 19:30 … 22:45 |
| Duration | 15 minutes |
| Timezone | Africa/Johannesburg (SAST, UTC+2) |
| Double booking | Prevented at DB level (UNIQUE constraint) + backend check |

---

## What Happens on Booking

1. User selects a weekday → slots load from Supabase in real time
2. Booked slots appear greyed out (from live DB query)
3. User selects available slot → fills in name, email, optional project details
4. On confirm → POST to `create-booking` function
5. Function:
   - Validates all inputs server-side
   - Checks for race-condition double booking
   - Inserts into `appointments` table
   - Sends email to **Mpho** with booking details
   - Sends confirmation email to **client**
6. User sees confirmation with:
   - Exact date/time
   - Google Calendar button
   - Download `.ics` button (works with Outlook, Apple Calendar, etc.)

---

## Troubleshooting

**Slots not loading?**
- Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly in Netlify
- Check Supabase RLS policies allow SELECT for `anon` role
- Open browser DevTools → Network tab → check the `get-bookings` function response

**Booking fails?**
- Check all 7 environment variables are set
- Check Supabase `appointments` table exists with the unique constraint
- Check Netlify Function logs: **Netlify → Functions → get-bookings → logs**

**Emails not sending?**
- Verify Gmail App Password (not your main password)
- Check `SMTP_USER` and `SMTP_PASS` match
- Note: booking is saved even if email fails (non-blocking)
- Check `CONTACT_EMAIL` is correct

---

## File Structure

```
portfolio/
├── netlify/
│   └── functions/
│       ├── get-bookings.js      ← GET booked slots for a date
│       └── create-booking.js    ← POST validate + save + email
├── database/
│   └── supabase-setup.sql       ← Run once in Supabase SQL editor
├── pages/
│   └── contact.html             ← Full booking UI
├── js/
│   └── main.js                  ← Global sun button routing
├── css/
│   └── pages.css                ← All contact + modal styles
├── .env.example                 ← Copy to .env and fill in values
├── netlify.toml                 ← Netlify build config
└── package.json                 ← Node dependencies
```
