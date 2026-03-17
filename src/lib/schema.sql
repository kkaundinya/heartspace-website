-- Heart Space Database Schema
-- Run this in the Neon console SQL editor

CREATE TABLE IF NOT EXISTS workshops (
  id               SERIAL PRIMARY KEY,
  name             TEXT NOT NULL,
  description      TEXT,
  date_1           DATE NOT NULL,
  date_2           DATE NOT NULL,
  session_time     TEXT NOT NULL,           -- e.g. "11:00 AM - 12:30 PM IST"
  regular_price    INTEGER NOT NULL,         -- stored in rupees (₹999 = 999)
  discounted_price INTEGER,                  -- NULL means no discount active
  is_active        BOOLEAN NOT NULL DEFAULT true,
  zoom_link        TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS registrations (
  id                   SERIAL PRIMARY KEY,
  workshop_id          INTEGER NOT NULL REFERENCES workshops(id),
  full_name            TEXT NOT NULL,
  email                TEXT NOT NULL,
  phone                TEXT NOT NULL,
  payment_status       TEXT NOT NULL DEFAULT 'pending'
                       CHECK (payment_status IN ('pending','processing','success','failed','refunded')),
  cashfree_order_id    TEXT UNIQUE,
  cashfree_payment_id  TEXT,
  amount_paid          INTEGER,              -- in rupees
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registrations_email
  ON registrations(email);

CREATE INDEX IF NOT EXISTS idx_registrations_cashfree_order
  ON registrations(cashfree_order_id);

CREATE INDEX IF NOT EXISTS idx_registrations_workshop
  ON registrations(workshop_id);

-- Seed initial Workshop 1 data
-- Prices stored in rupees: ₹999 = 999
INSERT INTO workshops (name, description, date_1, date_2, session_time, regular_price, discounted_price, is_active)
VALUES (
  'Workshop 1: Surfacing Difficult Conversations',
  'Two live sessions with Shashi. A workbook before. A manual after. A recording you keep forever.',
  '2026-03-28',
  '2026-03-29',
  '11:00 AM – 12:30 PM IST',
  999,
  499,
  true
)
ON CONFLICT DO NOTHING;
