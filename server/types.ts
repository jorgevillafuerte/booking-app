import { z } from 'zod'

export const createReservationSchema = z.object({
  restaurantId: z.string().min(1),
  guestCount: z.number().int().min(1).max(100),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  serviceId: z.string().min(1),
  timeSlot: z.string().min(1),
})

export type CreateReservation = z.infer<typeof createReservationSchema>

export interface Reservation extends CreateReservation {
  id: string
  createdAt: string
}
