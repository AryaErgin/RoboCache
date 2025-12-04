# RoboCache

A robotics-themed geocaching-style web platform built with React, TypeScript, Vite, and React Router. It showcases a black-yellow-white brand system, modular CSS, and core pages for exploring caches, viewing details, creating new drops, and tracking maker profiles.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` — start the Vite dev server.
- `npm run build` — type-check and build for production.
- `npm run preview` — preview the production build locally.

## Google Cloud/Firebase setup (free-friendly)
- Enable **Firebase Hosting**, **Firestore**, and **Authentication** (Email/Password + Google provider) in your Firebase project (Spark/free tier is sufficient for demos).
- Create a `.env` file with your keys (these placeholders are safe defaults but won't reach real services):

```bash
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-js-key
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:abcdefgh
```

- Deploy with Firebase Hosting (serves the static Vite build from Google’s CDN):
  1. `npm install -g firebase-tools`
  2. `firebase login`
  3. `firebase init hosting` (set `dist` as the public folder, enable SPA rewrite to `/index.html`)
  4. `npm run build`
  5. `firebase deploy`

## Data, auth, and maps
- **Maps:** Uses Google Maps JavaScript API via `@react-google-maps/api`. Add `VITE_GOOGLE_MAPS_API_KEY` to load live tiles and markers.
- **Storage & cache data:** Uses Google Cloud Firestore through Firebase SDK to fetch caches and save new ones (see `src/utils/firestore.ts`).
- **Authentication:** Firebase Auth handles email/password and Google sign-in (see `src/pages/Auth.tsx`). Accounts are stored in Google Auth; no custom backend required for the demo.
