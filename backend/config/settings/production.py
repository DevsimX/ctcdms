"""
Production settings: PostgreSQL, debug off, static/media.
"""
from .base import *  # noqa: F401, F403

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'ctcdms'),
        'USER': os.environ.get('POSTGRES_USER', 'ctcdms'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', ''),
        'HOST': os.environ.get('POSTGRES_HOST', 'db'),
        'PORT': os.environ.get('POSTGRES_PORT', '5432'),
    }
}

CORS_ALLOW_ALL_ORIGINS = False
