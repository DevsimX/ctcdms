# CTCDMS Frontend

Next.js 15 frontend for Clinical Test Center Data Management System. Matches the design report routes and components.

## Tech stack

- Next.js 15 (App Router), TypeScript
- Tailwind CSS, MUI (Material-UI)
- Leaflet for map (Index page)
- Axios + JWT (localStorage) for API

## Routes (from design report)

| Path | Page |
|------|------|
| `/` | Redirect to `/welcome` |
| `/welcome` | Dashboard |
| `/user/login` | Login (JWT) |
| `/admin`, `/admin/sub-page` | Admin |
| `/institution`, `/institutionDetail` | Institution |
| `/areaInstitution`, `/areaInstitutionDetail` | Area |
| `/projectDetail` | Project detail |
| `/search` | Search (hospital + item) |
| `/devcomponents` | Dev components (HospitalAutoFillSearchBox) |
| 404 | Not found |

## API

- Base URL: same origin `/CtcdmsDg/api` (Next.js rewrites to backend).
- Set `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8000`) when backend is on another host.
- JWT: `POST /CtcdmsDg/api/token/` with `username`, `password`; store `access` and `refresh` in localStorage.

## Run

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. Backend should be at the URL set in `NEXT_PUBLIC_API_URL` or same host with rewrites.
