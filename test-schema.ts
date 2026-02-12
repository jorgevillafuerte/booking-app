#!/usr/bin/env tsx
/**
 * Test script to verify reservations table schema
 * This validates that created_at column exists with DEFAULT CURRENT_TIMESTAMP
 */

import Database from 'better-sqlite3'
import { CREATE_TABLE_SQL } from './server/db/schema.ts'

// Use a temporary test database
const testDb = new Database(':memory:')

console.log('Creating table...')
testDb.exec(CREATE_TABLE_SQL)

// Get the schema
const schema = testDb.prepare(`
  SELECT sql FROM sqlite_master
  WHERE type='table' AND name='reservations'
`).get() as { sql: string } | undefined

if (!schema) {
  console.error('❌ ERROR: reservations table was not created')
  process.exit(1)
}

console.log('✓ Table created successfully')
console.log('\nTable schema:')
console.log(schema.sql)

// Check for created_at column
if (!schema.sql.includes('created_at')) {
  console.error('\n❌ ERROR: created_at column not found in schema')
  process.exit(1)
}

console.log('\n✓ created_at column exists')

// Check for DATETIME type
if (!schema.sql.match(/created_at\s+DATETIME/i)) {
  console.error('❌ ERROR: created_at is not DATETIME type')
  process.exit(1)
}

console.log('✓ created_at is DATETIME type')

// Check for DEFAULT CURRENT_TIMESTAMP
if (!schema.sql.match(/DEFAULT\s+CURRENT_TIMESTAMP/i)) {
  console.error('❌ ERROR: DEFAULT CURRENT_TIMESTAMP not found')
  process.exit(1)
}

console.log('✓ DEFAULT CURRENT_TIMESTAMP constraint exists')

// Test insert without created_at value
console.log('\nTesting INSERT without created_at...')
const testId = crypto.randomUUID()

testDb.prepare(`
  INSERT INTO reservations (id, restaurant_id, guest_count, date, service_id, time_slot)
  VALUES (?, ?, ?, ?, ?, ?)
`).run(testId, 'test-restaurant', 4, '2026-02-15', 'dinner', '19:00')

const row = testDb.prepare('SELECT id, created_at FROM reservations WHERE id = ?').get(testId) as {
  id: string
  created_at: string
} | undefined

if (!row) {
  console.error('❌ ERROR: Failed to retrieve inserted row')
  process.exit(1)
}

console.log(`✓ Row inserted with id: ${row.id}`)

if (!row.created_at) {
  console.error('❌ ERROR: created_at was not populated automatically')
  process.exit(1)
}

console.log(`✓ created_at automatically populated: ${row.created_at}`)

// Verify timestamp format
const timestampRegex = /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/
if (!timestampRegex.test(row.created_at)) {
  console.error(`❌ ERROR: Invalid timestamp format: ${row.created_at}`)
  process.exit(1)
}

console.log('✓ Timestamp format is valid')

testDb.close()

console.log('\n✅ All schema validation tests passed!')
console.log('\nAcceptance criteria verification:')
console.log('  ✓ reservations table contains created_at column with type DATETIME')
console.log('  ✓ created_at column has DEFAULT CURRENT_TIMESTAMP constraint')
console.log('  ✓ INSERT into reservations without created_at value populates timestamp automatically')
console.log('  ✓ Database query returns valid timestamp')
