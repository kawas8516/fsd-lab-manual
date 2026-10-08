// Smoke test: starts the app on a random port and exercises every route.
const assert = require('node:assert')
const app = require('./server')

const server = app.listen(0, async () => {
  const base = `http://localhost:${server.address().port}/api/users`
  const call = async (url, method = 'GET', body) => {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body),
    })
    return { status: res.status, data: await res.json() }
  }
  try {
    let r = await call(base)
    assert.equal(r.status, 200)
    assert.equal(r.data.length, 2)

    r = await call(base, 'POST', { name: 'Test', email: 't@example.com' })
    assert.equal(r.status, 201)
    const id = r.data.id

    r = await call(base, 'POST', { name: 'NoEmail' })
    assert.equal(r.status, 400)

    r = await call(`${base}/${id}`, 'PUT', { name: 'Updated' })
    assert.equal(r.status, 200)
    assert.equal(r.data.name, 'Updated')
    assert.equal(r.data.email, 't@example.com')

    r = await call(`${base}/999`, 'PUT', { name: 'x' })
    assert.equal(r.status, 404)

    r = await call(`${base}/${id}`, 'DELETE')
    assert.equal(r.status, 200)

    r = await call(base)
    assert.equal(r.data.length, 2)

    r = await call(`${base}/${id}`, 'DELETE')
    assert.equal(r.status, 404)

    console.log('All tests passed')
  } catch (err) {
    console.error('FAILED:', err.message)
    process.exitCode = 1
  } finally {
    server.close()
  }
})
