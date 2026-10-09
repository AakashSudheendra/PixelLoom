# Pixelloom — Collaborative Design Canvas

Pixelloom is a collaborative canvas workspace based on the supplied project brief.

## Technology stack
- **Next.js App Router + TypeScript** for the application.
- **Convex** schema and reactive functions for canvas documents, objects, comments, and collaborator presence.
- **Redux Toolkit** for client-side workspace and navigation state.
- **Inngest** for retryable background jobs, including autosave checkpoints and invitations.
- **Polar** is planned for subscription checkout and billing; configure credentials in `.env.local` before enabling paid plans.

## Included
- Responsive dashboard, project cards, workspace navigation, search, and create-project flow.
- Canvas editor preview with tool selection, zoom controls, editable sticky note, and project navigation.
- Convex schema and functions for canvases, canvas objects, comments, and presence.
- Inngest API route and background event handlers.

## Run locally
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Configure Convex and run `npx convex dev`; set `NEXT_PUBLIC_CONVEX_URL`.
5. Run `npm run dev`.
6. Connect the Inngest app in the Inngest dashboard to enable background functions.

## Important implementation notes
The dashboard currently uses local Redux state for the demo. The Convex data model and functions are provided, but the UI still needs deployment-specific Convex wiring and authentication before it becomes a durable multi-user collaborative canvas. Polar checkout/webhooks also require a Polar organization and configured credentials. The subscription integration is not yet activated. Never commit secrets.
