import { useEffect, useState } from 'react'

// Cuenta regresiva para "Reenviar en 00:42". Devuelve [segundos, texto mm:ss, reiniciar].
export function useCountdown(seconds) {
  const [left, setLeft] = useState(seconds)

  useEffect(() => {
    if (left <= 0) return undefined
    const timer = window.setTimeout(() => setLeft((value) => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [left])

  const text = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`

  return [left, text, () => setLeft(seconds)]
}
