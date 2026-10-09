# Forthright Legal Services

Website for Forthright Legal Services in Hurlingham, Nairobi.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints. `npm run build` typechecks, writes `dist/`, and adds clean paths for practice, consultation, contact, booking, and a 404 page.

Firm facts, practice areas, the consultation fee, and the consultation notes live in `src/firm.ts`. The fee is `feeAmount` (`KES 15,000`). Add further practices to the `practiceAreas` list.

## GitHub Pages

Pushes to `main` run `.github/workflows/pages.yml`, which builds with `GITHUB_PAGES=true` so asset paths use `/FLS/`. The published site is [https://faithkemboi-del.github.io/FLS/](https://faithkemboi-del.github.io/FLS/).

In the repository, open **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**, and save.
