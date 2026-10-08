# FSD Lab Manual

| Folder | Topic | Type |
|---|---|---|
| `assignment-3` | JavaScript DOM / event listeners | plain HTML |
| `assignment-4-profile-card` | React props | Vite + React |
| `assignment-5-controlled-form` | React `useState`, two-way binding | Vite + React |
| `assignment-6-counter-app` | React state management and guards | Vite + React |
| `assignment-7-express-rest-api` | Express REST API | Node + Express |

## Setup (one time)

1. Install **Node.js LTS** (v20 or newer) from https://nodejs.org. This also installs `npm`.
2. Install **Git** from https://git-scm.com.
3. Check both work:
   ```bash
   node -v
   npm -v
   git --version
   ```
4. Get the code:
   ```bash
   git clone https://github.com/kawas8516/fsd-lab-manual.git
   cd fsd-lab-manual
   ```
   Or use **Code > Download ZIP** on GitHub and extract it.

`node_modules` and `dist` are not in the repo. Run `npm install` in each project folder once. It reads `package.json` and downloads everything.

## Assignment 3: DOM / event listeners

No install needed. Open `assignment-3/index.html` in any browser (double-click it).

## Assignments 4, 5, 6: React apps (Vite)

Run these inside the assignment folder, for example:

```bash
cd assignment-4-profile-card
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173). Press `Ctrl+C` to stop.

Same steps for `assignment-5-controlled-form` and `assignment-6-counter-app`. Run only one at a time, or Vite will pick the next free port (5174, ...).

Optional: `npm run build` makes a production build in `dist/`. `npm run lint` runs ESLint.

## Assignment 7: Express REST API

```bash
cd assignment-7-express-rest-api
npm install
npm start
```

The server runs on http://localhost:5000. Data is in memory, so it resets on restart.

Test it, in a second terminal:

```bash
npm test
```

Or try it by hand:

```bash
curl http://localhost:5000/api/users
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"t@example.com\"}"
```

On Windows PowerShell, use `curl.exe` instead of `curl`, or use Postman / Thunder Client.

To use another port: `PORT=5001 npm start` (macOS/Linux) or `$env:PORT=5001; npm start` (PowerShell).

## Troubleshooting

- `npm is not recognized`: Node.js is not installed, or the terminal was not reopened after installing.
- `Port already in use`: stop the other server with `Ctrl+C`, or use another port.
- PowerShell blocks `npm` scripts: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, or use Command Prompt.
- Broken install: delete `node_modules` and run `npm install` again.
