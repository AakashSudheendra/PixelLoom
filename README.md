# PixelLoom

**A collaborative design canvas for teams to collect ideas, sketch concepts, and review work together.**

PixelLoom is a Next.js App Router application built around an infinite-canvas workspace. The project brief targets live collaboration for 2+ concurrent users, persistent canvas objects, background autosave, and paid plans.

> **Implementation status:** The dashboard and canvas are currently a polished frontend prototype. Convex schema/functions, an Inngest endpoint, and a Polar checkout route are present, but the complete production workflow is not yet wired end-to-end. Read [Known limitations](#known-limitations) before deploying.

## Tech stack

| Technology | Purpose |
| --- | --- |
| Next.js 14 + React 18 + TypeScript | App Router, UI, and API routes |
| Redux Toolkit | Client-side dashboard/navigation state |
| Convex | Reactive database schema and functions for canvases, objects, comments, and presence |
| Inngest | Background workflow entry point for autosave-checkpoint and workspace-invitation events |
| Polar | Server-side subscription checkout session creation |
| Lucide React | Interface icons |
| CSS design tokens | Dark UI, responsive layouts, typography, spacing, and component styling |

## Features

### Dashboard and workspace
- Responsive workspace shell with Overview, Projects, My canvases, Shared with me, Templates, Brand kit, Integrations, Settings, and Billing navigation.
- Project search, project cards, activity feed, team-space panel, and create-project modal.
- Canvas editor preview with title editing, tool selection, zoom controls, and editable sticky note.
- Redux Toolkit store for local navigation and demo project state.

### Convex backend foundation
- Canvas records with owner, title, update timestamp, and archive status.
- Canvas objects for notes, text, and shapes.
- Presence records with cursor coordinates and heartbeat timestamps.
- Canvas comments and functions for listing/adding comments.
- Reactive Convex queries update subscribers automatically when data changes, once the client is connected to a configured Convex deployment.

### Background jobs and billing foundation
- Inngest route at `/api/inngest`.
- Validated autosave-event endpoint at `POST /api/canvas/autosave` (queues an Inngest event; it does not yet persist a versioned snapshot).
- Autosave-checkpoint and workspace-invitation event handlers.
- Polar checkout session endpoint at `POST /api/billing/checkout`.
- Example environment-variable file for local setup.

## Getting started

### Prerequisites
- Node.js 20 or newer
- npm
- A Convex account for persistent backend data
- Optional: Inngest account for background workflows
- Optional: Polar organization/product for paid checkout

### 1. Install dependencies

```bash
git clone https://github.com/AakashSudheendra/PixelLoom.git
cd PixelLoom
npm install
```

### 2. Configure environment variables

Copy the example file:

**macOS / Linux**
```bash
cp .env.example .env.local
```

**Windows PowerShell**
```powershell
Copy-Item .env.example .env.local
```

Set only the variables for services you intend to configure:

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_CONVEX_URL` | Convex client | URL for your Convex deployment; client provider integration still needs to be completed |
| `CONVEX_DEPLOYMENT` | Convex CLI | Usually populated by `npx convex dev` |
| `INNGEST_EVENT_KEY` | Inngest Cloud | Event publishing from the app |
| `INNGEST_SIGNING_KEY` | Inngest Cloud | Verifies signed Inngest requests |
| `PIXELLOOM_AUTOSAVE_API_KEY` | Autosave event endpoint | Server-only bearer token required by `POST /api/canvas/autosave`; generate a long random value and never expose it in browser code |
| `POLAR_ACCESS_TOKEN` | Billing | Server-only Polar API token; never expose with a `NEXT_PUBLIC_` prefix |
| `POLAR_PRODUCT_ID` | Billing | Product identifier configured in Polar |
| `POLAR_SERVER` | Billing | Use `sandbox` during development or `production` when configured for live payments |
| `POLAR_WEBHOOK_SECRET` | Billing lifecycle | Reserved for webhook verification; lifecycle webhook handling is not implemented yet |
| `POLAR_SUCCESS_URL` | Billing | Redirect after successful checkout |
| `POLAR_RETURN_URL` | Billing | Return destination from checkout |

Never commit `.env.local`, API tokens, webhook secrets, or customer data.

### 3. Start the Next.js development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Configure Convex

Run the Convex development command in a separate terminal and follow the prompts to create or select a deployment:

```bash
npx convex dev
```

Set `NEXT_PUBLIC_CONVEX_URL` from the deployment settings. Convex functions live in `convex/`. The generated `convex/_generated` files are created by the Convex CLI and should not be hand-written.

**Important:** the current visible UI uses local Redux demo data; the Convex backend is not yet connected to the canvas interface. A configured deployment alone will not turn on multi-user synchronization.

### 5. Configure Inngest (optional)

The handler is exposed at `/api/inngest`. A server-to-server `POST /api/canvas/autosave` endpoint validates the payload and queues an Inngest event; requests require `Authorization: Bearer <PIXELLOOM_AUTOSAVE_API_KEY>`. This endpoint is not yet connected to the visible editor. For local development, run the Inngest Dev Server and point it at your app, or configure the app in Inngest Cloud. Ensure event keys and signing keys match the environment. Current handlers provide workflow scaffolding and do not yet persist a versioned canvas snapshot or deliver invitations through an email provider.

### 6. Configure Polar (optional)

Create a Polar product and set `POLAR_ACCESS_TOKEN`, `POLAR_PRODUCT_ID`, and the appropriate server mode. The checkout route returns a checkout URL when configuration is valid. Do not enable production payments until webhook verification, subscription status synchronization, and server-side entitlement checks have been implemented and tested.

## Useful commands

```bash
npm run dev        # Start local development
npm run typecheck  # Run TypeScript type checking
npm run build      # Create a production build
npm start          # Serve the production build
```

Run `npm run typecheck` and `npm run build` before opening a pull request or deploying. A successful build does not verify live Convex, Inngest, or Polar credentials.

## Repository structure

```text
.
├── convex/
│   ├── schema.ts           # Database tables and indexes
│   ├── canvases.ts         # Canvas queries and mutations
│   ├── objects.ts          # Canvas object operations
│   ├── presence.ts         # Presence heartbeat/query
│   └── comments.ts         # Comment operations
├── src/
│   ├── app/
│   │   ├── api/billing/checkout/route.ts
│   │   ├── api/canvas/autosave/route.ts
│   │   ├── api/inngest/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── design-tokens.ts
│       ├── inngest.ts
│       └── store.ts
├── .env.example
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## Known limitations

The following work is still required before PixelLoom should be described as a production-ready collaborative canvas:

1. **Authentication and authorization:** establish a real identity provider and enforce access checks inside every Convex query/mutation. Current owner/user identifiers are caller-supplied strings and are not a security boundary.
2. **Live canvas integration:** wrap the app in `ConvexProvider`, connect the UI to reactive canvas/object queries and mutations, and remove the local-only canvas demo state.
3. **Concurrent editing:** implement object-level persistence, conflict handling, stable collaborator identities, cursor publishing, and visible presence indicators for concurrent users.
4. **Reliable autosave:** debounce editor changes, persist them through Convex, track save state/errors, and create durable/versioned snapshots if version history is offered. The current Inngest autosave handler only prepares checkpoint metadata.
5. **Invitations:** validate workspace permissions, send actual invitation emails, and handle acceptance/expiration. The current Inngest invitation handler validates event fields only.
6. **Subscription lifecycle:** verify Polar webhooks, synchronize subscription state, and enforce plan limits on the server. Checkout alone is not subscription enforcement.
7. **Automated verification:** add unit/integration tests and CI, then verify typecheck/build and end-to-end behavior with configured service deployments.

Until these items are completed, treat the current app as a development prototype and do not use it for sensitive work or real customer billing.

## Security notes
- Keep secrets in server-side environment variables.
- Validate all incoming request payloads.
- Add authentication and authorization to backend operations before exposing the app publicly.
- Use Polar sandbox mode for development.
- Do not rely on client-side plan checks to enforce paid features.

## Reference brief

The implementation is based on the supplied project summary: **“PixelLoom — Collaborative Design Canvas with Live Sync”**, specifying Next.js, Convex, Redux Toolkit, Inngest, and Polar.

## License

No license has been selected yet. Add a license before distributing or accepting external contributions.
