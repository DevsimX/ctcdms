# CTCDMS

**Clinical Test Center Data Management System** — hospital/item EQA (indoor/outdoor), scores, project CV, mutual recognition. Geography adapted for Australia (states/territories, regions).

---

## Tech stack

| Layer   | Technologies |
|--------|---------------|
| **Frontend** | Next.js 15.5.9, Tailwind CSS, MUI, Leaflet |
| **Backend**  | Django, PostgreSQL, Docker, Nginx |
| **CI/CD**    | GitHub Actions |

---

## Repository structure

```
.
├── .github/workflows/   # CI (backend tests, frontend build)
├── backend/             # Django + DRF API (CtcdmsDg/api/)
├── frontend/            # Next.js App Router app
├── project_design/      # Design report (DB, API, routes, components)
├── .gitignore
└── README.md
```

- **Backend:** [backend/README.md](backend/README.md) — API, JWT, Docker, run instructions.
- **Frontend:** [frontend/README.md](frontend/README.md) — routes, API client, run instructions.
- **Design:** [project_design/README.md](project_design/README.md) — database, endpoints, pages, components.

---

## Quick start

### Backend (Django)

```bash
cd backend
pip install -r requirements.txt
export DJANGO_SETTINGS_MODULE=config.settings.development
python manage.py migrate
python manage.py runserver
```

API: http://localhost:8000/CtcdmsDg/api/

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:3000

Set `NEXT_PUBLIC_API_URL=http://localhost:8000` if the backend runs on a different host (frontend rewrites `/CtcdmsDg/api` to that URL).

### Docker (backend only)

```bash
cd backend
cp .env.example .env
docker compose up -d
```

---

## CI

GitHub Actions (`.github/workflows/ci.yml`) on push/PR to `main`, `master`, or `develop`:

- **Backend:** install deps, `manage.py check`, `manage.py test`
- **Frontend:** `npm ci`, `npm run build` (optional lint)

---

## License

Private / internal use.
