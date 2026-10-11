import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import { useToast } from '../../context/ToastContext'
import { isValidEmail } from '../../utils/format'
import styles from './Footer.module.css'

const explore = [
  { to: '/adoptar', label: 'Adoptar' },
  { to: '/donar', label: 'Donar' },
  { to: '/fundaciones', label: 'Fundaciones' },
  { to: '/historias', label: 'Historias' },
]

const petmind = [
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/reportar', label: 'Reportar un caso' },
  { to: '/contacto#preguntas', label: 'Preguntas frecuentes' },
]

// Pie de página oscuro de las pantallas internas (en el inicio va debajo del banner de Emanuel).
export default function Footer() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError('Escribe un correo válido.')
      return
    }
    setError('')
    setEmail('')
    showToast('¡Listo! Te escribiremos una vez al mes.')
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo light size="sm" />
          <p>Plataforma que conecta personas, mascotas y fundaciones por el bienestar animal en Colombia.</p>
        </div>

        <nav className={styles.column} aria-label="Explorar">
          <h2>Explorar</h2>
          <ul>
            {explore.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.column} aria-label="PetMind">
          <h2>PetMind</h2>
          <ul>
            {petmind.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <form className={styles.newsletter} onSubmit={handleSubmit} noValidate>
          <h2>Recibe historias y nuevas mascotas</h2>
          <p>Un correo al mes, sin spam.</p>
          <div className={styles.newsletterRow}>
            <label htmlFor="footer-email" className="sr-only">
              Tu correo electrónico
            </label>
            <input
              id="footer-email"
              className={styles.input}
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(error) || undefined}
            />
            <button type="submit" className="btn btn-accent">
              Suscribirme
            </button>
          </div>
          {error && <span className={styles.error}>{error}</span>}
        </form>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomRow}`}>
          <span>© {new Date().getFullYear()} PetMind · Todos los derechos reservados</span>
          <span className={styles.legal}>
            <Link to="/legal#terminos">Términos</Link> · <Link to="/legal#privacidad">Privacidad</Link> · <Link to="/legal#datos">Tratamiento de datos</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
