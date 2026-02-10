import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { reservations } from './routes/reservations.ts'
import { config } from './routes/config.ts'

const app = new Hono()

app.use(
  '/api/*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4173', 'http://localhost:3000'],
  })
)

app.route('/api/reservations', reservations)
app.route('/api/config', config)

app.get('/api/health', (c) => {
  return c.json({ status: 'ok' })
})

export { app }
