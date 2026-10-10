import styles from './FeatureCard.module.css'

export default function FeatureCard({ image, title, description }) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <img src={image} alt="" />
      </span>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M5 12h13" />
          <path d="m13 7 5 5-5 5" />
        </svg>
      </span>
    </article>
  )
}
