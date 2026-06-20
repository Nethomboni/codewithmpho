// api/get-bookings.js
// GET /api/get-bookings?date=YYYY-MM-DD
// Returns all booked time slots for a given date from Supabase

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { date } = req.query;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid or missing date parameter (expected YYYY-MM-DD)' });
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', date);

    if (error) throw error;

    // Normalise HH:MM:SS → HH:MM
    const bookedSlots = data.map(row => row.appointment_time.slice(0, 5));

    return res.status(200).json({ date, bookedSlots });
  } catch (err) {
    console.error('get-bookings error:', err);
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}
