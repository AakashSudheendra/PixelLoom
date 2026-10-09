# Pixelloom — Collaborative Design Canvas

Pixelloom is a collaborative canvas workspace built from the supplied project brief.

## Technology
- **Next.js App Router + TypeScript** — application and server routes.
- **Convex** — schema and reactive functions for canvas documents, objects, comments, and collaborator presence.
- **Redux Toolkit** — local workspace/navigation state for the dashboard.
- **Inngest** — retryable autosave-checkpoint and workspace-invitation jobs.
- **Polar** — server-side checkout-session route for subscription purchases.
- **Design tokens** — shared color, typography, spacing, and radius tokens; Manrope and DM Mono typography.

## Included
- Responsive dashboard, project cards, workspace navigation, search, and create-project flow.
- Canvas editor preview with tool selection, zoom controls, editable sticky note, and project navigation.
- Convex schema and CRUD/presence/comment functions.
- Inngest handler at `/api/inngest`.
- Polar checkout endpoint at `POST /api/billing/checkout`.

## Run locally
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Configure Convex and run `npx convex dev`; set `NEXT_PUBLIC_CONVEX_URL`.
5. Run `npm run dev`.
6. Connect the app in Inngest and configure server-side keys to run background jobs.
7. Set `POLAR_ACCESS_TOKEN`, `POLAR_PRODUCT_ID`, and the correct Polar environment to enable checkout.

## Current limitations
The dashboard currently uses Redux local demo data. Convex models/functions exist but have not yet been wired into the visible canvas UI or protected by authentication, so this is not yet a production-ready multi-user live-sync application. The checkout route creates Polar checkout sessions when valid credentials and product IDs are configured; webhook-based subscription lifecycle handling and entitlement enforcement are not implemented yet. The repository has not been built or typechecked in this environment, so run `npm install`, `npm run typecheck`, and `npm run build` before deployment. Never commit secrets.
