# AASTU Gibigubae — Frontend

React + TypeScript frontend for the AASTU Gibigubae website, scaffolded per the project's
Front-end and Technical Documentation.

## Stack (from the docs)

- **React 18 + TypeScript** — UI, via Vite
- **Tailwind CSS** — styling, utility-first
- **Zustand** — global client state (auth/session, UI state)
- **TanStack Query (React Query)** — server state, caching, API sync
- **Axios** — HTTP client
- **React Hook Form + Zod** — forms and schema validation
- **React Router** — client-side routing
- **Vitest** — unit testing (Jest-compatible API)

## Folder structure

```
src/
  components/
    ui/          generic primitives (Button, Input, Modal, Card)
    layout/       structural (Navbar, Footer, PageContainer, AdminShell)
    common/       shared but specific (EmptyState, ErrorBoundary, ProtectedRoute)
  pages/          one per route-level view (Home, Events, EventDetail, Login, AdminDashboard...)
  features/       feature-sliced domain modules (events/, courses/, auth/, faq/, admin/...)
  hooks/          cross-feature reusable hooks
  store/          Zustand stores (authStore, uiStore, ...)
  services/       Axios instance + one API module per backend resource
  types/          shared TS types mirroring backend DTOs
  utils/          stateless helpers
  routes/         route config + route guards (role-based: Visitor/Registered/Sub-Admin/Admin)
  assets/         images/ icons/ fonts/
  styles/         global.css (Tailwind entry, font-face declarations)
```

Every folder has its own `README.md` explaining what belongs there — delete these once the
team is used to the layout, or keep them as living documentation.

Path aliases are configured in `tsconfig.app.json` and `vite.config.ts` (`@/`, `@components/`,
`@pages/`, `@features/`, `@hooks/`, `@store/`, `@services/`, `@types/`, `@utils/`, `@routes/`,
`@assets/`, `@styles/`).

## Design tokens (from Figma)

Already wired into `tailwind.config.js`:

- **Colors** — `primary` (#24468F), `primary-dark` (#14275C), `accent` (#FFC800)
- **Fonts** — `font-body`/`font-heading` (League Spartan / Gotham) for English,
  `font-am`/`font-am-display` (Abyssinica SIL / Adwa) for Amharic, applied via `lang="am"` or
  the `.font-am` utility class

⚠️ Font files themselves aren't included yet — League Spartan and Abyssinica SIL are free
(Google Fonts), but Gotham and Adwa may need licensing/sourcing. Font files go in
`src/assets/fonts/` and get declared in `src/styles/globals.css`.

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `VITE_API_BASE_URL` — backend REST API (Events/Courses/FAQ/Media/Admin APIs)
- `VITE_AUTH_BASE_URL` — centralized authentication server (SSO, JWT issuing)

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

## Status

This is the **structure + configuration** step only. No routes, pages, or components have been
built yet — `App.tsx` is a bare placeholder. Next steps (to be done one at a time):

1. Base layout shell (Navbar/Footer/PageContainer) + routing skeleton
2. Design system primitives in `components/ui/` (Button, Input, Card, etc.) matching Figma
3. First real page (Home) wired to layout + routes
4. Auth flow (login/session, protected routes) per the SSO flow in the docs
5. Feature pages (Events, Courses, FAQ, Media) one at a time

## Still needed from Figma

The Figma link ( `figma.com/design/4yA6m7PhCG0aE7eVpjNgGR/aastu-gibigubae` ) can't be fetched
automatically (Figma blocks bots), so beyond the color/type tokens already shared, it'll help to
get, screen by screen as we build each one:

- A screenshot of the specific screen/frame we're about to build
- Any spacing/sizing specifics if you have Figma's Dev Mode inspect panel (padding, border
  radius, exact font sizes) — optional, I can estimate from screenshots otherwise
