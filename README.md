
  # Photography Portfolio E-commerce Site

  This is a code bundle for Photography Portfolio E-commerce Site. The original project is available at https://www.figma.com/design/8N4pFVZPwyFUMq5ljGQuHK/Photography-Portfolio-E-commerce-Site.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Backend (Firebase Functions) & Payments

- Functions live in `functions/` with Express handlers for products, cart, checkout, and Stripe webhook.
- Set environment:
  - Copy `functions/env.example` to `functions/.env` and set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` (from your Stripe dashboard webhook endpoint).
  - Set `STRIPE_SECRET_KEY` in your Firebase Functions env if you prefer: `firebase functions:config:set stripe.secret="sk_test_xxx" stripe.webhook_secret="whsec_xxx"`.
- Install deps and build: `cd functions && npm install && npm run build`.
- Seed sample data: deploy/emulate then call `POST https://<functions-host>/admin/seed` once.
- Default API base URL (once deployed): `https://us-central1-jas-soni.cloudfunctions.net/api`. Override in the web app with `VITE_API_BASE_URL`.

## Frontend env

Create `.env.local` with:
```
VITE_API_BASE_URL=https://us-central1-jas-soni.cloudfunctions.net/api
```
  