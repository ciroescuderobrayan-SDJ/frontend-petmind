import { Link } from 'react-router-dom'
import styles from './NoEncontrada.module.css'

// Rutas que no existen (y mascotas, campañas o historias con un id que no está).
export default function NoEncontrada({ title = 'Esta página se perdió', text = 'Como un peludito sin collar: no la encontramos. Revisa el enlace o vuelve al inicio.', backTo = '/', backLabel = 'Ir al inicio' }) {
  return (
    <section className={`container ${styles.page}`}>
      <title>Página no encontrada | PetMind</title>
      <img className={styles.illustration} src="/img/ilustraciones/ilustracion-banner-perro-y-gato.svg" alt="" />
      <span className="eyebrow">Error 404</span>
      <h1>{title}</h1>
      <p>{text}</p>
      <div className={styles.actions}>
        <Link className="btn btn-primary" to={backTo}>
          {backLabel}
        </Link>
        <Link className="btn btn-secondary" to="/adoptar">
          Ver mascotas
        </Link>
      </div>
    </section>
  )
}
