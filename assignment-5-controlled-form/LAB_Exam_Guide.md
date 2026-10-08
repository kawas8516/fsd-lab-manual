# FSD Lab Exam Guide — Do Each Assignment Manually

Short, exam-friendly versions. Type only what is shown. Styling is optional — examiners care about **logic**.

> **Windows tip:** folder names with spaces need quotes: `cd "Controlled Form"` (or type `cd Con` + **Tab**).

---

## 0. Quick Setup Cheat-Sheet

### React (Vite) project
```powershell
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev          # opens http://localhost:5173
```
- Edit `src/App.jsx` (main component). Delete the default content inside it.
- Remove `import './App.css'` if you delete that file (otherwise error).
- Stop server: `Ctrl + C`.

### Express project
```powershell
mkdir my-api
cd my-api
npm init -y
npm install express
# create server.js, then:
node server.js
```

### Plain HTML
Make `file.html`, double-click to open in browser. Refresh after every change.

---

## 1. DOM To-Do List (`Assignment2.html`)

**Aim:** Add tasks, click to mark done, delete — using DOM methods only (`createElement`, `appendChild`, `remove`).

**Idea (3 steps):**
1. HTML: a form (input + button) and an empty `<ul>`.
2. On form `submit`: `preventDefault()`, read input, skip if empty, call `addTask(text)`.
3. `addTask`: create `<li>` + `<span>` (text, click toggles `completed`) + Delete button (click removes `<li>`), append to `<ul>`.

```html
<!DOCTYPE html>
<html>
<head>
  <title>To-Do List</title>
  <style>
    .completed { text-decoration: line-through; color: gray; }
    li span { cursor: pointer; }
  </style>
</head>
<body>
  <h2>Task Tracker</h2>

  <form id="todoForm">
    <input type="text" id="taskInput" placeholder="Add a new task">
    <button type="submit">Add Task</button>
  </form>

  <ul id="taskList"></ul>

  <script>
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    todoForm.addEventListener('submit', function (event) {
      event.preventDefault();                 // stop page reload
      const text = taskInput.value.trim();
      if (text === '') return;                // ignore empty
      addTask(text);
      taskInput.value = '';
      taskInput.focus();
    });

    function addTask(text) {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = text;
      span.addEventListener('click', function () {
        li.classList.toggle('completed');     // mark done / undo
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', function () {
        li.remove();                          // remove from DOM
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }
  </script>
</body>
</html>
```

**Test:** add 2 tasks → click one (strikethrough) → click again (undo) → Delete → submit empty (nothing happens).

**Viva points:**
- DOM = tree of page elements that JS can change.
- `getElementById` selects; `createElement` makes; `appendChild` inserts; `remove()` deletes.
- `textContent` is safer than `innerHTML` (no HTML injection).
- `classList.toggle` adds the class if missing, removes if present.
- Form `submit` event fires on button click AND Enter key.

---

## 2. JavaScript Form Validation (`assignment3.html`)

**Aim:** Validate Name, Email, Phone, Password with RegEx; show error messages.

**Idea (3 steps):**
1. HTML form with inputs + an empty `<div>` under each to show errors.
2. RegEx pattern per field. `pattern.test(value)` → `true/false`.
3. On submit: `event.preventDefault()`, run all validators, show success only if all pass.

**Code (minimal):**
```html
<!DOCTYPE html>
<html>
<head><title>Form Validation</title></head>
<body>
<form id="f" novalidate>
  Name: <input id="name"> <span id="nameErr" style="color:red"></span><br><br>
  Email: <input id="email"> <span id="emailErr" style="color:red"></span><br><br>
  Phone: <input id="phone"> <span id="phoneErr" style="color:red"></span><br><br>
  Password: <input type="password" id="pass"> <span id="passErr" style="color:red"></span><br><br>
  <button type="submit">Submit</button>
  <p id="ok" style="color:green"></p>
</form>

<script>
const patterns = {
  name:  /^[A-Za-z]{3,}$/,                                   // letters only, min 3
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // x@y.com
  phone: /^[0-9]{10}$/,                                      // exactly 10 digits
  pass:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/             // 8+, upper, lower, digit
};
const messages = {
  name:  'Name: letters only, min 3',
  email: 'Enter a valid email',
  phone: 'Phone must be 10 digits',
  pass:  'Min 8 chars, 1 upper, 1 lower, 1 digit'
};

function check(field) {
  const value = document.getElementById(field).value.trim();
  const err = document.getElementById(field + 'Err');
  const valid = patterns[field].test(value);
  err.textContent = valid ? '' : messages[field];
  return valid;
}

document.getElementById('f').addEventListener('submit', function (e) {
  e.preventDefault();                       // stop page reload
  const results = ['name', 'email', 'phone', 'pass'].map(check); // run ALL (no short-circuit)
  document.getElementById('ok').textContent =
    results.every(Boolean) ? 'Registration successful!' : '';
});
</script>
</body>
</html>
```

**Viva points:**
- `preventDefault()` stops the browser's default form submit/reload.
- `test()` is a RegExp method returning boolean. `^` start, `$` end, `{3,}` min 3.
- `(?=.*[A-Z])` = lookahead: "somewhere there must be an uppercase".
- Optional: add `input` event listener for live (real-time) validation.

---

## 3. String Starts With Special Character (`stringcheck.html`)

**Aim:** Check whether a string starts with a special character; show message.

**Idea:** `/^[^a-zA-Z0-9]/` → first char is **not** letter/digit = special.

```html
<!DOCTYPE html>
<html>
<body>
  <input type="text" id="inputString" placeholder="Enter a string">
  <button onclick="validateString()">Validate</button>
  <p id="result"></p>

  <script>
    function validateString() {
      const s = document.getElementById('inputString').value;
      const result = document.getElementById('result');
      if (/^[^a-zA-Z0-9]/.test(s)) {
        result.textContent = 'Starts with a special character.';
        result.style.color = 'green';
      } else {
        result.textContent = 'Does NOT start with a special character.';
        result.style.color = 'red';
      }
    }
  </script>
</body>
</html>
```

**Test:** `@hello` → yes. `hello` → no. `1abc` → no.

**Viva points:** `^` outside brackets = start of string; `^` inside `[ ]` = NOT.
Empty string → no match → "does not start".

---

## 4. Profile Card using Props (`PRofile card/`)

**Aim:** Reusable `ProfileCard` component; data passed as **props**; list rendered with `map()`.

**Steps:**
```powershell
npm create vite@latest profile-card -- --template react
cd profile-card
npm install
```

**`src/ProfileCard.jsx`** (new file)
```jsx
function ProfileCard({ name, role, description, imageUrl }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: 10, width: 250, textAlign: 'center' }}>
      <img src={imageUrl} alt={name} width="100" style={{ borderRadius: '50%' }} />
      <h2>{name}</h2>
      <p><b>{role}</b></p>
      <p>{description}</p>
    </div>
  )
}

export default ProfileCard
```

**`src/App.jsx`** (replace everything)
```jsx
import ProfileCard from './ProfileCard'

const students = [
  { id: 1, name: 'Aarav Sharma', role: 'Full Stack Developer', description: 'Loves the MERN stack.', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Isha Patel',   role: 'UI/UX Designer',       description: 'Clean, accessible UIs.', imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Rohan Mehta',  role: 'Backend Engineer',     description: 'APIs and databases.',   imageUrl: 'https://randomuser.me/api/portraits/men/65.jpg' },
]

function App() {
  return (
    <div>
      <h1>Student Profiles</h1>
      <div style={{ display: 'flex' }}>
        {students.map((s) => (
          <ProfileCard key={s.id} {...s} />
        ))}
      </div>
    </div>
  )
}

export default App
```

Run: `npm run dev`.

**Viva points:**
- **Props** = read-only inputs passed parent → child.
- `{ name, role }` in function params = destructuring props.
- `key` is needed in `map()` so React can track list items.
- `{...s}` spread = passes every field of object as a prop.

---

## 5. Controlled Form (`Controlled Form/`)

**Aim:** Inputs controlled by React state; live preview under form.

**Idea:** state = single source of truth. `value={state}` + `onChange` → `setState`.

```powershell
npm create vite@latest controlled-form -- --template react
cd controlled-form
npm install
```

**`src/App.jsx`** (replace everything)
```jsx
import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [tech, setTech] = useState('')

  return (
    <div>
      <h1>Controlled Form</h1>

      <form>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <label>Favorite Technology: </label>
        <input
          type="text"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />
      </form>

      <h2>Live Preview</h2>
      <p>Username: {username}</p>
      <p>Favorite Technology: {tech}</p>
    </div>
  )
}

export default App
```

**Viva points:**
- Controlled = value comes from state, not from the DOM.
- `e.target.value` = current text in the input.
- Without `onChange`, a `value`-bound input becomes read-only (can't type).
- Each keystroke → `setState` → re-render → preview updates instantly.

---

## 6. Counter App with useState (`Counter App/`)

**Aim:** Increment / Decrement (not below 0) / Reset using `useState`.

```powershell
npm create vite@latest counter-app -- --template react
cd counter-app
npm install
```

**`src/App.jsx`** (replace everything)
```jsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Counter App</h1>
      <h2>{count}</h2>

      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default App
```

**Viva points:**
- `useState(0)` returns `[value, setter]`. Initial value = 0.
- Never modify `count` directly (`count++` ❌). Always use `setCount`.
- Calling the setter triggers a **re-render** → UI shows new value.
- Safer update form: `setCount(c => c + 1)`.
- Hook rules: call at top level of component, not inside loops/ifs.

---

## 7. REST API using Express.js (`Express REST API/`)

**Aim:** CRUD API on in-memory users array: GET, POST, PUT, DELETE on `/api/users`.

```powershell
mkdir express-api
cd express-api
npm init -y
npm install express
```

**`server.js`**
```js
const express = require('express')
const app = express()

app.use(express.json())          // IMPORTANT: lets us read req.body (JSON)

let users = [
  { id: 1, name: 'Aarav', email: 'aarav@example.com' },
  { id: 2, name: 'Diya',  email: 'diya@example.com' },
]
let nextId = 3

// READ all
app.get('/api/users', (req, res) => {
  res.json(users)
})

// CREATE
app.post('/api/users', (req, res) => {
  const { name, email } = req.body
  const user = { id: nextId++, name, email }
  users.push(user)
  res.status(201).json(user)
})

// UPDATE
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id))
  if (!user) return res.status(404).json({ error: 'User not found' })
  if (req.body.name)  user.name  = req.body.name
  if (req.body.email) user.email = req.body.email
  res.json(user)
})

// DELETE
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'User not found' })
  const removed = users.splice(index, 1)
  res.json(removed[0])
})

app.listen(5000, () => console.log('Server running on http://localhost:5000'))
```

Run: `node server.js`

### Test it

**Thunder Client / Postman** (set header `Content-Type: application/json`):

| Action | Method | URL | Body (JSON) |
|---|---|---|---|
| All users | GET | `http://localhost:5000/api/users` | – |
| Add user | POST | `http://localhost:5000/api/users` | `{"name":"Test","email":"t@x.com"}` |
| Update | PUT | `http://localhost:5000/api/users/1` | `{"name":"New Name"}` |
| Delete | DELETE | `http://localhost:5000/api/users/1` | – |

**Or with curl** (Git Bash):
```bash
curl http://localhost:5000/api/users
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d '{"name":"Test","email":"t@x.com"}'
curl -X PUT http://localhost:5000/api/users/1 -H "Content-Type: application/json" -d '{"name":"New"}'
curl -X DELETE http://localhost:5000/api/users/1
```

**Viva points:**
- REST: HTTP verbs map to CRUD → GET=read, POST=create, PUT=update, DELETE=delete.
- `req.params.id` = value from URL (always a **string** → convert with `Number()`).
- `req.body` = JSON payload; needs `express.json()` middleware.
- Status codes: 200 OK, 201 Created, 404 Not Found, 400 Bad Request.
- Data is in memory → resets when server restarts.

---

## 8. Common Mistakes (Check Before Submitting)

| Mistake | Fix |
|---|---|
| `cd Controlled Form` fails | Use quotes: `cd "Controlled Form"` |
| Can't type in React input | Added `value` but forgot `onChange` |
| `Cannot find module './App.css'` | Removed file but left the import — delete import |
| Blank React page | Check browser console (F12); usually typo or missing `export default` |
| Component not showing | Component name must start with a **Capital** letter |
| `req.body` is `undefined` | Forgot `app.use(express.json())` |
| POST returns weird data | Forgot `Content-Type: application/json` header in Postman |
| `Port already in use` | Old server still running → `Ctrl + C` it, or change port |
| Update/delete never finds user | `req.params.id` is string → use `Number(...)` |
| Changes not showing in HTML file | Hit refresh (F5) |
| `npm` command not found | Run inside the project folder (where `package.json` is) |

---

## 9. Exam Strategy

1. Read question → identify: **HTML+JS**, **React**, or **Express**.
2. Set up project (section 0) — takes 1 minute.
3. Write the **core logic first** (state / regex / routes). Style last.
4. **Run and test** with 2–3 inputs before saying done.
5. Keep terminal open to show it works; know 2–3 viva points from the matching section.
