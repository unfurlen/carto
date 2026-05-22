# Set Vite base path for GitHub Pages

**Date:** 2026-05-22

## Context

GitHub Pages project sites are served at `https://<user>.github.io/<repo>/`. Vite builds default to `/` as the base path, so asset references like `/assets/index.js` resolve to the wrong URL.

## Decision

Set `base: '/carto/'` in `vite.config.ts`. This ensures the built HTML references assets at `/carto/assets/...` matching the GitHub Pages URL structure.

## Alternatives considered

- Use a CNAME for a custom domain — unnecessary complexity
- Build with `--base=/carto/` flag — config file is cleaner
