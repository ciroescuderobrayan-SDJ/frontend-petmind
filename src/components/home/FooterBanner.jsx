import styles from './FooterBanner.module.css'
import petsIllustration from '../../assets/footer/ilustracion-banner-perro-y-gato.svg'
import leftLeaf from '../../assets/footer/hoja-izquierda.svg'
import rightLeaf from '../../assets/footer/hoja-derecha.svg'
import heart from '../../assets/footer/corazon.svg'

// Banner "Conectamos vidas, cambiamos historias" (antes era el Footer; ahora va al final del inicio,
// encima del pie de página oscuro de los mockups).
const FooterBanner = () => {
  return (
    <section className={`container ${styles.section}`} aria-label="Un futuro mejor es posible">
      <div className={styles.banner}>
        <img className={`${styles.decoration} ${styles.decorationLeft}`} src={leftLeaf} alt="" />
        <img className={styles.pets} src={petsIllustration} alt="" />
        <img className={styles.heart} src={heart} alt="" />
        <div className={styles.message}>
          <p>UN FUTURO MEJOR ES POSIBLE</p>
          <h2>Conectamos vidas, cambiamos historias.</h2>
          <span>Juntos podemos darles a más animales la oportunidad de un hogar, salud y amor.</span>
        </div>
        <img className={`${styles.decoration} ${styles.decorationRight}`} src={rightLeaf} alt="" />
      </div>
    </section>
  )
}

export default FooterBanner
