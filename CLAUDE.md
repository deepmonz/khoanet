# khoa.net

English portfolio site to win outsourced projects. Plan: `C:\Users\hi\.claude\plans\vi-t-plan-x-y-d-ng-stateful-yeti.md`.

## Layout
- `frontend/` — Next.js 16 (App Router, Cache Components on), Tailwind v4, motion, @react-three/fiber, cmdk, lenis.
  Read `frontend/AGENTS.md`: this Next.js version differs from older docs; check `node_modules/next/dist/docs/`.
- `backend/` — (planned) FastAPI + MongoDB for the contact/lead form.

## Conventions
- All site copy and project data live in `frontend/lib/site.ts`; `TODO` marks details the owner must confirm.
- Theme: dark by default, `html.light` for light. Colors are CSS variables in `app/globals.css` exposed as Tailwind colors (`bg-bg`, `text-muted`, `border-line`, `text-accent`…).
- Scroll reveal is CSS-driven (`.reveal` + `data-in`), so content is visible without JS.
- Respect `prefers-reduced-motion` (use `useReducedMotion` from `lib/use-media-query.ts`); the hero 3D renders a still frame instead.
- Don't name clients or suppliers without permission; don't list third-party cloned repos as own work.

## Deploy
Docker (`frontend/Dockerfile`, standalone output) + root `docker-compose.yml` (container `khoanet-web`) on the VPS that also hosts hoamera.com and mocan.shop: joins their external `hoamera` network behind the shared `/home/nginx` stack (source of truth for that stack: `D:/Code/admin_seller_hoa/nginx`). Steps: `DEPLOY.md`; nginx/SSL files in `deploy/nginx/`; updates: `deploy/update.sh`.

## Commands (in `frontend/`)
- `npm run dev` · `npm run build` · `npx eslint .` · `npx tsc --noEmit`
- Port 3000 is often taken by another local project; use `-p 3100`.
