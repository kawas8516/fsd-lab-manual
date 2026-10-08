const express = require('express')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// In-memory mock database.
let users = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com' },
  { id: 2, name: 'Diya Patel', email: 'diya@example.com' },
]
let nextId = 3

// GET /api/users - fetch all users
app.get('/api/users', (req, res) => {
  res.json(users)
})

// POST /api/users - add a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body || {}
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' })
  }
  const user = { id: nextId++, name, email }
  users.push(user)
  res.status(201).json(user)
})

// PUT /api/users/:id - update a user
app.put('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id))
  if (!user) return res.status(404).json({ error: 'User not found' })

  const { name, email } = req.body || {}
  if (name !== undefined) user.name = name
  if (email !== undefined) user.email = email
  res.json(user)
})

// DELETE /api/users/:id - remove a user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'User not found' })

  const [removed] = users.splice(index, 1)
  res.json(removed)
})

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
}

module.exports = app
