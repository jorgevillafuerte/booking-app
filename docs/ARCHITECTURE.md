# Architecture

## Overview

A full-stack restaurant reservation system built with React and Hono. The application provides a multi-step booking flow where users select guest count, date, service time, and time slot before confirming their reservation.

## System Components

```
┌─────────────────┐
│  React Frontend │ (Vite dev server :5173)
│   - Booking UI  │
│   - i18n        │
│   - Theming     │
└────────┬────────┘
         │ HTTP (proxy /api)
         ▼
┌─────────────────┐
│   Hono Backend  │ (Node server :3000)
│   - REST API    │
│   - Validation  │
└────────┬────────┘
         │ SQL
         ▼
┌─────────────────┐
│  SQLite DB      │
│  reservations   │
└─────────────────┘
```

## Frontend Architecture

### Booking Flow
- **Context-based state**: `BookingProvider` wraps the app, providing global booking state
- **Reducer pattern**: `bookingReducer` handles state transitions (next/back, field updates)
- **Step-based navigation**: Multi-step wizard with progress tracking
- **Internationalization**: i18n context supports multiple languages

### Key Modules
- `booking/`: State management (context, reducer, step logic)
- `components/`: Reusable UI (Header, Footer, ProgressBar, BackButton, etc.)
- `config/`: Theme and restaurant settings
- `api/`: Frontend API client (fetch wrappers)

## Backend Architecture

### Hono Server
- **Lightweight framework**: Hono provides Express-like routing with better TypeScript support
- **Middleware**: CORS enabled for local development origins
- **Validation**: Zod schemas validate incoming requests via `@hono/zod-validator`

### API Endpoints
- `POST /api/reservations` → Create reservation
- `GET /api/reservations/:id` → Fetch reservation by ID
- `GET /api/config` → Fetch restaurant configuration
- `GET /api/health` → Health check

### Database Layer
- **Schema**: Single `reservations` table with snake_case columns
- **WAL mode**: Write-Ahead Logging for better concurrency
- **Manual mapping**: DB snake_case fields mapped to TypeScript camelCase objects

## Data Flow

1. User interacts with React booking UI
2. State updates via dispatch actions (e.g., `SET_GUEST_COUNT`, `NEXT_STEP`)
3. On final confirmation, frontend POST to `/api/reservations`
4. Hono validates payload with Zod schema
5. Server inserts into SQLite, returns created reservation
6. Frontend displays confirmation with reservation ID

## Design Patterns

- **Context + Reducer**: Centralized state management without external libraries
- **Validation-first API**: Zod schemas enforce type safety at runtime
- **Repository pattern (implicit)**: Direct SQL in route handlers (no ORM)
- **Separation of concerns**: Frontend/backend split with API boundary

## External Dependencies

- **Vite**: Frontend build tool with HMR and proxy to backend
- **better-sqlite3**: Synchronous SQLite driver for Node
- **Hono**: Minimalist web framework
- **Zod**: Schema validation library

## Development Workflow

- Frontend runs on Vite dev server (port 5173)
- Backend runs on separate Node process (port 3000)
- Vite proxies `/api/*` requests to backend
- Hot reload enabled on both frontend (Vite HMR) and backend (tsx watch mode)

## Configuration

- `vite.config.ts`: Frontend build + dev server proxy
- `tsconfig.json`: TypeScript project references (app, node, server)
- `.tool-versions`: Runtime version pinning (likely asdf)
- `setup-env.sh`: Environment setup script

## Future Considerations

- Add test suite (Vitest for frontend, Node:test or Vitest for backend)
- Consider ORM/query builder (Drizzle, Kysely) for type-safe SQL
- Add authentication and user sessions
- Implement reservation conflict detection
- Add email confirmation system
