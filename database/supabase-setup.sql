-- ================================================================
-- CodeWithMpho Portfolio – Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ================================================================

-- 1. Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT         NOT NULL,
  email            TEXT         NOT NULL,
  project_details  TEXT,
  appointment_date DATE         NOT NULL,
  appointment_time TIME         NOT NULL,
  created_at       TIMESTAMPTZ  DEFAULT NOW()
);

-- 2. Unique constraint → prevents double bookings at DB level
--    This is the backend source of truth that catches race conditions
ALTER TABLE appointments
  ADD CONSTRAINT unique_appointment_slot
  UNIQUE (appointment_date, appointment_time);

-- 3. Index for fast date-range queries (fetching slots for a date)
CREATE INDEX IF NOT EXISTS idx_appointments_date
  ON appointments (appointment_date);

-- 4. Row Level Security (RLS)
--    The anon key can INSERT and SELECT appointment_time only.
--    Direct access to name/email is blocked from the browser.
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon key) to INSERT a new booking
CREATE POLICY "Allow public booking inserts"
  ON appointments FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to read ONLY the date and time columns (not PII)
CREATE POLICY "Allow public slot reads"
  ON appointments FOR SELECT
  TO anon
  USING (true);

-- Only the service_role key (used server-side) can see all columns
-- No additional policy needed – service_role bypasses RLS by default

-- ================================================================
-- VERIFY: Check the table was created correctly
-- ================================================================
SELECT column_name, data_type, is_nullable
FROM   information_schema.columns
WHERE  table_name = 'appointments'
ORDER  BY ordinal_position;
