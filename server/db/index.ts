import Database from 'better-sqlite3'
import { CREATE_TABLE_SQL } from './schema.ts'

export const db = new Database('./reservations.db')

db.pragma('journal_mode = WAL')
db.exec(CREATE_TABLE_SQL)
