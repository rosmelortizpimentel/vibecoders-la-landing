# Public Functions Inventory

These functions are **local-only for now** and are intended to replace direct frontend RPC usage.

## Landing
- `landing-builders-list`
- `landing-apps-list`
- `landing-charlas-list`

## Directories
- `directory-builders-list`
- `directory-apps-list`
- `directory-charlas-list`

## Public detail
- `public-builder-profile`
- `public-app-detail`
- `public-charla-detail`

## Security rules applied
- Return only fields needed by the public site
- Validate all query params (`limit`, `offset`, `username`, `identifier`, `app_id`)
- Service role key stays server-side only inside the function runtime
- No `email_public` or private fields returned to the web
