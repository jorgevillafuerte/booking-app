# Booking App

## Stack
- Language: TypeScript 5.9.3
- Framework: React 19 (frontend), Hono 4.11 (backend)
- Database: SQLite (better-sqlite3)
- Key dependencies: Vite 7.3, Zod 4.3, @hono/node-server

## Commands
- Build: `npm run build`
- Test: (no test suite configured)
- Lint: `npm run lint`
- Run frontend: `npm run dev` (port 5173)
- Run backend: `npm run dev:server` (port 3000, watch mode)

## Structure
- src/ → React frontend (booking flow, components, i18n)
- src/booking/ → Booking state management (context, reducer, steps)
- src/components/ → Reusable UI components
- src/config/ → Theme and restaurant configuration
- server/ → Hono backend (API routes, database)
- server/routes/ → API endpoints (reservations, config)
- server/db/ → SQLite database setup and schema
- public/ → Static assets

## Conventions
- Error handling: Inline error responses in route handlers (404, validation errors via Zod)
- Testing: No test framework configured
- Code style: ESLint with React hooks plugin, TypeScript strict mode
- State management: React Context + useReducer pattern for booking flow
- Database: Snake_case columns, camelCase in TypeScript via manual mapping
- API: RESTful endpoints under /api/, CORS enabled for local development
- Naming: PascalCase for components, camelCase for functions/variables
- File organization: Colocated CSS with components (Component.tsx + Component.css)
