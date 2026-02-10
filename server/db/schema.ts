export const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    guest_count INTEGER NOT NULL,
    date TEXT NOT NULL,
    service_id TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`
