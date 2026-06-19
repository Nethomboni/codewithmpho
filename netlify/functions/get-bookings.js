// netlify/functions/get-bookings.js
// Returns all booked time slots for a given date
// GET /.netlify/functions/get-bookings?date=YYYY-MM-DD

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const date = event.queryStringParameters?.date;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid or missing date parameter (expected YYYY-MM-DD)' }),
    };
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', date);

    if (error) throw error;

    const bookedSlots = data.map(row => {
      // Normalize HH:MM:SS → HH:MM
      return row.appointment_time.slice(0, 5);
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ date, bookedSlots }),
    };
  } catch (err) {
    console.error('get-bookings error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch bookings' }),
    };
  }
};
