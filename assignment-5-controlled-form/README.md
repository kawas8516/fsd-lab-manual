# Assignment 5: React Controlled Form (useState and Two-Way Binding)

Two controlled inputs, Username and Favorite Technology. Each input's `value` comes from `useState` and its `onChange` writes back to state, so state is the single source of truth. A Live Preview section shows the current values as you type, and Reset clears both fields.

## Run

Needs Node.js LTS (v20+). From the repo root:

```bash
cd assignment-5-controlled-form
npm install
npm run dev
```

Open http://localhost:5173 (use the URL Vite prints). Stop with `Ctrl+C`.

Other scripts: `npm run build` (output in `dist/`), `npm run lint`.

## Files

- `src/ControlledForm.jsx`: the form component (state, handlers, preview).
- `src/ControlledForm.css`: component styles.
- `src/App.jsx`: renders the form.
- `LAB_Exam_Guide.md`: revision notes for the lab exam.
