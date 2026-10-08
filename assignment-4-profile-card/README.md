# Assignment 4: React Profile Card (Props)

A reusable `ProfileCard` component that receives `name`, `role`, `description` and `imageUrl` as props. `App` keeps an array of three students and renders one card per item with `map()`, passing each object through spread props and a unique `key`.

## Run

Needs Node.js LTS (v20+). From the repo root:

```bash
cd assignment-4-profile-card
npm install
npm run dev
```

Open http://localhost:5173 (use the URL Vite prints). Stop with `Ctrl+C`.

Other scripts: `npm run build` (output in `dist/`), `npm run lint`.

Profile photos load from `randomuser.me`, so an internet connection is needed to see them.

## Files

- `src/ProfileCard.jsx`: the card component (props).
- `src/App.jsx`: student data and list rendering.
- `src/App.css`, `src/index.css`: styles.
