import { useState } from 'react'
import './Counter.css'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount((c) => c + 1)
  // Prevent count going below 0.
  const decrement = () => setCount((c) => Math.max(0, c - 1))
  const reset = () => setCount(0)

  return (
    <div className="counter-card">
      <h1>Counter App</h1>
      <p className="subtitle">State managed with the useState hook.</p>

      <div className="count" aria-live="polite">{count}</div>

      <div className="actions">
        <button type="button" onClick={decrement} disabled={count === 0}>
          Decrement
        </button>
        <button type="button" onClick={increment}>Increment</button>
        <button type="button" className="secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Counter
