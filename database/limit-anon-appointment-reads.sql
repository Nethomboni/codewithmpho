-- Limit what the public (anon) role can read from appointments.
-- The booking API only needs the date and time of booked slots; names,
-- emails and project details stay private. Inserts are unchanged.
revoke select on public.appointments from anon;
grant select (appointment_date, appointment_time) on public.appointments to anon;
