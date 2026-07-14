# Multi-stage: build CRA frontend, then run Flask/gunicorn as non-root.
FROM node:18-alpine AS frontend
WORKDIR /frontend
COPY react-app/package.json react-app/package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY react-app/ ./
ARG REACT_APP_BASE_URL=
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV CI=false
RUN npm run build

FROM python:3.9-slim AS runtime
RUN apt-get update \
  && apt-get install -y --no-install-recommends libpq5 \
  && rm -rf /var/lib/apt/lists/* \
  && useradd --create-home --uid 1000 appuser

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt psycopg2-binary

COPY --chown=appuser:appuser app ./app
COPY --chown=appuser:appuser migrations ./migrations

# CRA build/ has index.html + static/js|css. Flask serves /static from app/static,
# so flatten: app/static/js/... (not app/static/static/js/...).
COPY --from=frontend /frontend/build /tmp/frontend-build
RUN mkdir -p app/static \
  && cp /tmp/frontend-build/index.html app/static/ \
  && cp -r /tmp/frontend-build/static/. app/static/ \
  && find /tmp/frontend-build -maxdepth 1 -type f ! -name 'index.html' -exec cp {} app/static/ \; \
  && chown -R appuser:appuser app/static \
  && rm -rf /tmp/frontend-build

USER appuser

ENV FLASK_APP=app \
    FLASK_ENV=production \
    PORT=5000 \
    SQLALCHEMY_ECHO=False

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--threads", "2", "--timeout", "60", "app:app"]
