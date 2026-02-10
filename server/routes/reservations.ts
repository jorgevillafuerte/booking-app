import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { db } from '../db/index.ts'
import { createReservationSchema } from '../types.ts'
import type { Reservation } from '../types.ts'

const reservations = new Hono()

reservations.post(
  '/',
  zValidator('json', createReservationSchema),
  (c) => {
    const data = c.req.valid('json')
    const id = crypto.randomUUID()

    db.prepare(
      `INSERT INTO reservations (id, restaurant_id, guest_count, date, service_id, time_slot)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(id, data.restaurantId, data.guestCount, data.date, data.serviceId, data.timeSlot)

    const row = db.prepare('SELECT * FROM reservations WHERE id = ?').get(id) as {
      id: string
      restaurant_id: string
      guest_count: number
      date: string
      service_id: string
      time_slot: string
      created_at: string
    }

    const reservation: Reservation = {
      id: row.id,
      restaurantId: row.restaurant_id,
      guestCount: row.guest_count,
      date: row.date,
      serviceId: row.service_id,
      timeSlot: row.time_slot,
      createdAt: row.created_at,
    }

    return c.json(reservation, 201)
  }
)

reservations.get('/:id', (c) => {
  const { id } = c.req.param()

  const row = db.prepare('SELECT * FROM reservations WHERE id = ?').get(id) as {
    id: string
    restaurant_id: string
    guest_count: number
    date: string
    service_id: string
    time_slot: string
    created_at: string
  } | undefined

  if (!row) {
    return c.json({ error: 'Reservation not found' }, 404)
  }

  const reservation: Reservation = {
    id: row.id,
    restaurantId: row.restaurant_id,
    guestCount: row.guest_count,
    date: row.date,
    serviceId: row.service_id,
    timeSlot: row.time_slot,
    createdAt: row.created_at,
  }

  return c.json(reservation)
})

export { reservations }
