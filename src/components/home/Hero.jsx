import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <img className={styles.photo} src="/img/fotos/portada-mujer-abrazando-perro.jpg" alt="Mujer abrazando a su perro adoptado" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.copy}>
          <h1>
            Una segunda oportunidad <strong>puede cambiar una vida.</strong>
          </h1>
          <p>Adopta, dona o apoya organizaciones que trabajan por el bienestar animal.</p>

          <div className={styles.actions}>
            <Link className="btn btn-primary btn-lg" to="/adoptar">
              <Icon name="paw" /> Conocer mascotas <Icon name="arrow-right" />
            </Link>
            <Link className={`btn btn-lg ${styles.secondary}`} to="/donar">
              Quiero ayudar
            </Link>
          </div>
        </div>

        <p className={styles.note} aria-hidden="true">
          Más
          <br />
          que mascotas,
          <br />
          son historias
          <br />
          que importan <Icon name="heart" />
        </p>
      </div>
    </section>
  )
}

export default Hero
