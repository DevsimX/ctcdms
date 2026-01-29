# CTCDMS Backend

Django + DRF backend for Clinical Test Center Data Management System. API under `CtcdmsDg/api/`. JWT auth via `rest_framework_simplejwt`.

## Tech stack

- Django 5.x, Django REST Framework, django-filter, django-cors-headers
- PostgreSQL (production) / SQLite (development)
- Gunicorn, Nginx (Docker)
- JWT: `POST /CtcdmsDg/api/token/` with `username`, `password`

## Local development

```bash
cd backend
pip install -r requirements.txt
export DJANGO_SETTINGS_MODULE=config.settings.development
python manage.py migrate
python manage.py runserver
```

API root: http://localhost:8000/CtcdmsDg/api/

## Docker

```bash
cd backend
cp .env.example .env   # edit .env
docker compose up -d
```

- Django (Gunicorn): port 8000
- Nginx: port 80 (proxy to Django)
- PostgreSQL: internal

## Tests

```bash
python manage.py test
```

Models use `managed = False` (existing DB). Tests avoid hitting unmanaged tables so CI runs without a real database.
