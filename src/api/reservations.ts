export interface CreateReservationRequest {
  restaurantId: string
  guestCount: number
  date: string
  serviceId: string
  timeSlot: string
}

export interface ReservationResponse {
  id: string
  restaurantId: string
  guestCount: number
  date: string
  serviceId: string
  timeSlot: string
  createdAt: string
}

export async function createReservation(data: CreateReservationRequest): Promise<ReservationResponse> {
  const response = await fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Reservation failed: ${response.status}`)
  }

  return response.json() as Promise<ReservationResponse>
}

export async function fetchReservations(): Promise<ReservationResponse[]> {
  const response = await fetch('/api/reservations', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch reservations: ${response.status}`)
  }

  return response.json() as Promise<ReservationResponse[]>
}
