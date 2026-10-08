# Forthright Legal Services

A look-and-flow prototype for the firm’s site. It is a frontend only: the diary, the fee, and the mobile-money step are simulated in the browser. There is no backend and no payment gateway.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (http://localhost:5173). `npm run build` typechecks and writes `dist/`.

## Sample fee

The consultation amount was not provided. The booking flow uses **KES 15,000**, labeled on screen as a sample pending the firm’s figure.

## Intentionally omitted

Only supplied facts are shown. There is no email address, no about or story section, and no practice areas beyond regulatory compliance. The practice list is a single finished entry backed by an array, so further areas can be added in `src/firm.ts` when they are known. Phone and WhatsApp are shown exactly as given (`0738`), with no `wa.me` link and no invented digits.
