import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

const initialState = {
  x: -50,
  y: -50,
}

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState(initialState)

  useEffect(() => {
    const handleMove = event => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled)
      window.addEventListener('pointermove', handleMove)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      setPosition(initialState)
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  return (
    <main>
      <div
        title="Este es el circulito"
        style={{
          position: 'absolute',
          top: -25,
          left: -25,
          width: 50,
          height: 50,
          opacity: 0.8,
          backgroundColor: 'rgba(34, 38, 41, 0.68)',
          pointerEvents: 'none',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          border: '1px solid white',
        }}
      ></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} animación del
        puntero
      </button>
    </main>
  )
}
export default App
