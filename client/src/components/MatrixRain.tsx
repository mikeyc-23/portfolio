import { useEffect, useRef } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeDrops()
    }

    const fontSize = 16
    const drops: number[] = []

    const initializeDrops = () => {
      const columns = Math.floor(canvas.width / fontSize)
      drops.length = 0
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -200
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~'.split('')

    let animationFrameId: number
    let lastDrawTime = 0
    const fps = 15
    const interval = 1000 / fps

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw)

      if (timestamp - lastDrawTime < interval) return
      lastDrawTime = timestamp

      const currentColumns = Math.floor(canvas.width / fontSize)
      if (currentColumns > drops.length) {
        for (let i = drops.length; i < currentColumns; i++) {
          drops.push(Math.random() * -200)
        }
      }

      ctx.fillStyle = 'rgba(10, 10, 8, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px "Courier New"`

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] >= 0) {
          const char = characters[Math.floor(Math.random() * characters.length)]
          ctx.fillStyle = Math.random() > 0.5 ? '#3a5a20' : '#8ac860'
          ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        backgroundColor: '#0a0a08',
        pointerEvents: 'none',
      }}
    />
  )
}

export default MatrixRain
