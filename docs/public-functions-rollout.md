# Public Functions Rollout

## Feature flag

Use this environment variable to switch the public site between legacy backend access and the new scoped public functions:

```env
PUBLIC_USE_SCOPED_PUBLIC_FUNCTIONS=false
```

### Behavior

- `false` → current production-safe behavior
  - legacy RPCs for landing/directories
  - legacy edge functions for public builder/app detail
- `true` → new scoped public functions only

## New function inventory

### Landing
- `landing-builders-list`
- `landing-apps-list`
- `landing-charlas-list`

### Directory pages
- `directory-builders-list`
- `directory-apps-list`
- `directory-charlas-list`

### Public detail pages
- `public-builder-profile`
- `public-app-detail`
- `public-charla-detail`

## Security model

- Every function validates query parameters
- Every function returns only fields required by the current public UI
- `email_public` is intentionally excluded from the new public builder profile payload
- Service role key is used only inside function runtime
- Frontend pages never call tables directly

## Local rollout sequence

1. Keep `PUBLIC_USE_SCOPED_PUBLIC_FUNCTIONS=false`
2. Deploy new functions in a non-production environment
3. Test with `PUBLIC_USE_SCOPED_PUBLIC_FUNCTIONS=true`
4. Verify landing, builders, apps, charlas, and all detail pages
5. Only after validation, enable the flag in production
