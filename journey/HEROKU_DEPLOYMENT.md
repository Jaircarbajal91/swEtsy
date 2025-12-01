# Heroku Deployment Guide

This document captures the exact steps used to deploy `swEtsy` to Heroku using the Docker-based workflow that lives in the repository. It assumes the project root is the repository root (`swEtsy/`).

## 1. Prerequisites

- Heroku CLI (`heroku --version`)
- Docker Engine 20.x or later
- Node.js ≥ 14 (for building the React bundle)
- Python 3.9 runtime available locally (optional; the container installs dependencies itself)

Log in to Heroku once the CLI and Docker are ready:

```bash
heroku login
heroku container:login
```

## 2. Build the React Frontend

The Dockerfile expects the production build to already exist in `react-app/build`; it copies those assets into Flask static files during image build (`COPY /react-app/build/* app/static/`). Rebuild the bundle whenever frontend code changes or the deployment base URL is updated.

```bash
cd react-app
npm install
REACT_APP_BASE_URL=https://<your-heroku-app>.herokuapp.com npm run build
cd ..
```

> The environment variable must match the public URL of the Heroku app so the frontend sends API calls to the correct host.

## 3. Configure Heroku Resources

If the Heroku app already exists, reuse it. Otherwise create it (replace `<your-heroku-app>` everywhere with the chosen name):

```bash
heroku create <your-heroku-app>
```

Provision a PostgreSQL instance if one is not already attached:

```bash
heroku addons:create heroku-postgresql:hobby-dev --app <your-heroku-app>
```

Set the required config vars. The Dockerfile sets `FLASK_APP` and `FLASK_ENV`, but `SECRET_KEY` must be provided. `DATABASE_URL` is injected automatically by the Postgres add-on; the app upgrades `postgres://` to `postgresql://` internally during start-up (`Config.SQLALCHEMY_DATABASE_URI`).

```bash
heroku config:set SECRET_KEY=<random-string> --app <your-heroku-app>
```

Optional but recommended:

- `REACT_APP_BASE_URL=https://<your-heroku-app>.herokuapp.com`
- Any third-party API keys needed by custom features

## 4. Build and Push the Docker Image

From the repository root:

```bash
docker build -t swetsy-heroku .
docker tag swetsy-heroku registry.heroku.com/<your-heroku-app>/web
docker push registry.heroku.com/<your-heroku-app>/web
```

Release the freshly pushed image so Heroku uses it for the `web` process type:

```bash
heroku container:release web --app <your-heroku-app>
```

The container entrypoint (`gunicorn --bind 0.0.0.0:${PORT:-5000} app:app`) comes directly from `Dockerfile`, so no Procfile is required.

## 5. Run Database Migrations (and Seeds)

Once the container is live, run migrations against the managed database:

```bash
heroku run flask db upgrade --app <your-heroku-app>
```

Seed data if desired (the repository exposes CLI commands via `app/__init__.py`):

```bash
heroku run flask seed all --app <your-heroku-app>
```

## 6. Verification Checklist

1. Visit `https://<your-heroku-app>.herokuapp.com` and confirm the React app loads.
2. Create a test account or log in with existing credentials to ensure authentication works (cookie/domain checks).
3. Exercise product browsing, cart, and review flows to confirm API endpoints respond over HTTPS.
4. Review Heroku logs for runtime errors:

   ```bash
   heroku logs --tail --app <your-heroku-app>
   ```

## 7. Ongoing Updates

For future deployments:

1. Rebuild the React bundle (`npm run build`).
2. Rebuild, tag, and push the Docker image.
3. Release the container and run `flask db upgrade`.

If you only change backend code, rebuilding the Docker image is still required (Heroku always pulls the pushed image). If you only change frontend code, you still must rebuild the React bundle before `docker build`, otherwise stale assets will ship to production.

## 8. Troubleshooting

- **Database URL uses `postgres://`**: Automatically handled in `app/config.py`; no manual change needed.
- **HTTP → HTTPS redirect loop**: Ensure the Heroku app has `https` enabled (the middleware checks `X-Forwarded-Proto` before redirecting).
- **Static assets 404**: Re-run `npm run build` before building the Docker image so `react-app/build` exists.
- **`SECRET_KEY` errors**: Confirm the config var is set and the app was redeployed after changing it.

For additional context, consult the Dockerfile and configuration references:

```4:30:Dockerfile
ENV REACT_APP_BASE_URL=https://swetsy-app-2-a892cfb2b203.herokuapp.com/
# ...
CMD sh -c "gunicorn --bind 0.0.0.0:${PORT:-5000} app:app"
```

```4:20:app/config.py
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        if database_url.startswith('postgres://'):
            SQLALCHEMY_DATABASE_URI = database_url.replace('postgres://', 'postgresql://', 1)
```


