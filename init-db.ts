#!/usr/bin/env tsx
/**
 * Initialize the database by importing the db module
 * This creates the database file with the correct schema
 */

import { db } from './server/db/index.ts'

console.log('Database initialized successfully')

// Verify the schema
const schema = db.prepare(`
  SELECT sql FROM sqlite_master
  WHERE type='table' AND name='reservations'
`).get() as { sql: string } | undefined

if (schema) {
  console.log('\nTable schema:')
  console.log(schema.sql)
} else {
  console.error('ERROR: Table was not created')
  process.exit(1)
}

db.close()
