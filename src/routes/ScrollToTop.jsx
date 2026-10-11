import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Con BrowserRouter no hay <ScrollRestoration />: cada pantalla nueva abre arriba,
// y los enlaces con #ancla (p. ej. /contacto#preguntas) bajan hasta esa sección.
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search, hash])

  return null
}
