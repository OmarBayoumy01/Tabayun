# CLAUDE.md

Tabayun — a React 19 + TypeScript + Vite single-page app built on a **feature-module
architecture** with a **server-validated auth gate**. Keep all new work consistent with
the module pattern described below.

## Commands

| Command                | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                      |
| `npm run build`        | Type-check then build (`tsc -b && vite build`) |
| `npm run lint`         | ESLint (flat config)                           |
| `npm run format`       | Prettier write                                 |
| `npm run format:check` | Prettier check                                 |
| `npm run preview`      | Preview the production build                   |

## Stack

React 19 · React Router 7 (`createBrowserRouter`) · TanStack React Query 5 (server state) ·
Jotai 2 (global client state) · Axios · react-hook-form + Zod (`@hookform/resolvers`) ·
Tailwind CSS v4 (`@tailwindcss/vite`) · shadcn/ui + Radix · Sonner (toasts) · lucide-react.

TypeScript is strict. The `@/*` alias resolves to `./src/*` and is configured in **both**
`tsconfig.json` and `vite.config.ts` — keep them in sync.

## Architecture — the feature-module pattern (core rule)

Each feature lives in `src/modules/<feature>/` and owns its own:

- `routes.tsx` — exports a `RouteObject` (e.g. `authRoute`, `appRoute`); pages are wired in via `lazyPage()`
- `store.ts` — Jotai atoms, suffixed `...Atom` (e.g. `userDataAtom`)
- `apis/api.ts` — raw data-access functions (e.g. `getUser`, `analyzeMedia`); no React Query
- `apis/queries.ts` — React Query hooks (e.g. `useGetUser`) wrapping the `api.ts` functions, plus array query keys like `['auth', 'me']`
- `layout.tsx` — the module shell, rendering `<Outlet />`
- `pages/index.tsx` — page components as **named** `XController` exports (e.g. `LoginController`, `DashboardController`), lazy-loaded
- `types.ts` — module-local types

`src/routes/index.tsx` (`createAppRoutes()`) only **composes** the module route objects plus
the top-level error pages — it never imports individual pages. `lazyPage(importer, exportName)`
in `src/routes/lazy-page.tsx` wraps `React.lazy` so pages can use **named** exports instead of a
default export.

**Adding a feature:** create `src/modules/<feature>/` with the files above, then register its
route object in `createAppRoutes()`.

## Auth gate

`src/providers/router-provider.tsx` (`AppWrapper`) wraps the `/` app route tree. It calls
`useGetUser()`, shows `<PageLoader fullScreen />` until that resolves, hydrates `userDataAtom`,
and redirects unauthenticated users to `/auth/login`.

**Token presence alone is not trusted** — the user fetch is the source of truth. There is no
`/auth/me` endpoint: the access token is a JWT whose claims carry the identity, so `getUser`
(`src/modules/auth/apis/api.ts`) decodes the stored token (`sub` → email, `role`, `exp`) and
throws on a missing/malformed/expired token, which `AppWrapper` treats as unauthenticated.
Token helpers live in `src/lib/auth.ts` (`getToken` / `setToken` / `clearToken` /
`isAuthenticated`).

## Backend API

Endpoints (base URL via `VITE_API_URL`, see `.env.example`): `POST /auth/login` →
`{ access_token, token_type, role }`; `POST /detect/image` & `POST /detect/video` (multipart
`file`) → a `DetectionResult` (`verdict: 'Fake' | 'Real'`, `confidence`, `models[]`, `method`);
`POST /feedback` (**admin only**) → `{ success, detection_id }`; `GET /health`. Admin tokens
additionally unlock `/feedback`; the admin-only `FeedbackControl` in the detector reflects this.

## Non-React bridge (axios ↔ router)

`src/services/global-router.ts` (`globalHooks`) bridges `navigate` / `location` / `notify` into
module scope so code outside React can use them. `AppWrapper` keeps the bridge current, and the
axios interceptor in `src/lib/axios.ts` uses it: a Bearer token is attached on every request;
`401` redirects to `/auth/login`; other errors surface as a toast.

**Caveat — ESLint react-hooks v7 is strict:** only mutate `globalHooks` inside effects, and
avoid calling `setState` from effects.

## Conventions

- **Filenames:** kebab-case (`page-loader.tsx`, `mode-toggle.tsx`).
- **Exports:** named function/const components — avoid default exports except where a tool requires one.
- **State:** Jotai for global client state, React Query for server state, localStorage for theme.
- **Forms:** react-hook-form + `zodResolver` + a Zod schema. See `LoginController` in `src/modules/auth/pages/index.tsx`.
- **Styling:** Tailwind v4; design tokens (OKLCH, light/dark) in `src/theme.css`. Merge classes
  with `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge). Component variants use CVA.
- **shadcn/ui:** components live in `src/components/ui/`, configured by `components.json`
  (neutral base, lucide icons, CSS variables). Add new components via the shadcn CLI.
  **ESLint ignores `src/components/ui` and `dist`** — don't hand-lint generated UI.
- **Toasts:** `useNotify()` (`src/hooks/notify.ts`) wraps Sonner; `<Toaster />` is mounted in `main.tsx`.
- **Theme:** `ThemeProvider` (`light | dark | system`, storage key `vite-ui-theme`) with the `ModeToggle` switcher.
- **Formatting (`.prettierrc`):** no semicolons, single quotes, trailing commas (all), printWidth 80, tabWidth 2.

## Folder structure

```
src/
├── assets/
├── components/
│   ├── page-loader.tsx
│   ├── mode-toggle.tsx
│   └── ui/                 # shadcn/Radix components (eslint-ignored)
├── error-pages/            # 403.tsx, 404.tsx, suspended.tsx
├── hooks/                  # notify.ts (useNotify → Sonner)
├── lib/                    # auth.ts, axios.ts, queryClient.ts, utils.ts (cn)
├── modules/                # feature modules
│   ├── auth/               # routes, store, apis/queries, layout, pages, types
│   └── app/                # routes, layout, pages (dashboard)
├── providers/              # router-provider (AppWrapper), theme-provider, theme-context
├── routes/                 # index.tsx (createAppRoutes), lazy-page.tsx (lazyPage)
├── services/               # global-router.ts (globalHooks bridge)
├── main.tsx
├── index.css
└── theme.css
```

## Provider composition (`main.tsx`)

`StrictMode > ThemeProvider > QueryClientProvider > Suspense(PageLoader) > RouterProvider`,
with `<Toaster />` mounted alongside the router.

## Design Context

Design strategy lives in **`PRODUCT.md`** (root); the visual system in **`DESIGN.md`**.
Read them before any UI work.

- **Register:** product (a task-driven tool — the UI serves the verdict).
- **Users:** the general public checking whether a photo/video is real.
- **Personality:** friendly, modern, reassuring — like a knowledgeable friend, never
  hyped or alarmist.
- **Principles:** the verdict is the product · calm over alarm · honest confidence ·
  familiar, not clever · inclusive by default.
- **A11y:** WCAG AA; verdicts must never rely on color alone (icon + text + color).
- **Avoid:** hypey AI-startup chrome (gradients, glassmorphism), cold enterprise
  density, and the generic shadcn-default look.

<!-- SPECKIT START -->

For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan

<!-- SPECKIT END -->
