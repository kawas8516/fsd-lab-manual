# Assignment 7: Express REST API

CRUD API for users, built with Express 5. Data is kept in an in-memory array, so it resets when the server restarts.

## Run

Needs Node.js LTS (v20+). From the repo root:

```bash
cd assignment-7-express-rest-api
npm install
npm start
```

Server runs on http://localhost:5000. Change the port with the `PORT` environment variable (`PORT=5001 npm start`, or `$env:PORT=5001; npm start` in PowerShell).

## Endpoints

| Method | URL | Body | Result |
|---|---|---|---|
| GET | `/api/users` | none | `200` list of users |
| POST | `/api/users` | `{ "name", "email" }` | `201` new user, or `400` if a field is missing |
| PUT | `/api/users/:id` | `{ "name"?, "email"? }` | `200` updated user, or `404` |
| DELETE | `/api/users/:id` | none | `200` removed user, or `404` |

Try it:

```bash
curl http://localhost:5000/api/users
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"t@example.com\"}"
```

In PowerShell use `curl.exe`, or use Postman / Thunder Client.

## Test

```bash
npm test
```

`test.js` starts the app on a random port and checks every route. No server needs to be running.

## Files

- `server.js`: routes and server (exports `app` for the test).
- `test.js`: smoke test.
