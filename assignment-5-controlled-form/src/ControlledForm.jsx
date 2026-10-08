import { useState } from 'react'
import './ControlledForm.css'

function ControlledForm() {
  // State is the single source of truth for both inputs.
  const [username, setUsername] = useState('')
  const [technology, setTechnology] = useState('')

  return (
    <div className="form-card">
      <h1>Controlled Form</h1>
      <p className="subtitle">React state drives every input value below.</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. kaustubh"
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="technology">Favorite Technology</label>
          <input
            id="technology"
            name="technology"
            type="text"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            placeholder="e.g. React"
            autoComplete="off"
          />
        </div>

        <div className="actions">
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setUsername('')
              setTechnology('')
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <section className="preview">
        <h2>Live Preview</h2>
        <p>
          <span className="key">Username:</span>{' '}
          <span className="value">{username || <em>nothing typed yet</em>}</span>
        </p>
        <p>
          <span className="key">Favorite Technology:</span>{' '}
          <span className="value">{technology || <em>nothing typed yet</em>}</span>
        </p>
      </section>
    </div>
  )
}

export default ControlledForm
