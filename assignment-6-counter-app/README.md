# Assignment 6: React Counter App (State Management and Guards)

Counter built with `useState` and three buttons: Increment, Decrement and Reset. A guard stops the count going below 0: `Math.max(0, c - 1)` in the handler, and the Decrement button is `disabled` when the count is 0. Updates use the functional form `setCount((c) => ...)`.

## Run

Needs Node.js LTS (v20+). From the repo root:

```bash
cd assignment-6-counter-app
npm install
npm run dev
```

Open http://localhost:5173 (use the URL Vite prints). Stop with `Ctrl+C`.

Other scripts: `npm run build` (output in `dist/`), `npm run lint`.

## Files

- `src/Counter.jsx`: the counter component (state and guard).
- `src/Counter.css`: component styles.
- `src/App.jsx`: renders the counter.
