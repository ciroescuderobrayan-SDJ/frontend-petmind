import Icon from '../ui/Icon'
import { ProgressBar } from '../ui/ProgressBar'
import styles from './Steppers.module.css'

// 1 Tipo de cuenta —— 2 Tus datos —— 3 Verificación  (current es 1, 2 o 3)
export function Stepper({ steps, current, tone = 'primary', hideDoneLabels = false, className = '' }) {
  return (
    <ol className={`${styles.stepper} ${styles[tone]} ${className}`} aria-label="Pasos">
      {steps.map((label, index) => {
        const number = index + 1
        const done = number < current
        const active = number === current
        return (
          <li key={label} className={`${styles.step} ${done ? styles.done : ''} ${active ? styles.active : ''}`} aria-current={active ? 'step' : undefined}>
            <span className={styles.circle}>{done ? <Icon name="check" strokeWidth={2.6} /> : number}</span>
            {(!hideDoneLabels || !done) && <span className={styles.label}>{label}</span>}
            {done && hideDoneLabels && <span className="sr-only">{label} (completado)</span>}
            {number < steps.length && <span className={`${styles.line} ${done ? styles.lineDone : ''}`} aria-hidden="true" />}
          </li>
        )
      })}
    </ol>
  )
}

// Tarjetas de pasos del formulario de adopción, con barra de avance debajo.
export function FormSteps({ steps, current, onStepClick }) {
  const progress = ((current - 0.25) / steps.length) * 100

  return (
    <div className={styles.formSteps}>
      <ol className={styles.formStepList}>
        {steps.map((step, index) => {
          const number = index + 1
          const done = number < current
          const active = number === current
          const clickable = done && onStepClick
          const content = (
            <>
              <span className={styles.formStepNumber}>{done ? <Icon name="check" strokeWidth={2.6} /> : number}</span>
              <span className={styles.formStepText}>
                <strong>{step.title}</strong>
                <span>{step.subtitle}</span>
              </span>
            </>
          )
          return (
            <li key={step.title} className={`${styles.formStep} ${done ? styles.formStepDone : ''} ${active ? styles.formStepActive : ''}`} aria-current={active ? 'step' : undefined}>
              {clickable ? (
                <button type="button" className={styles.formStepButton} onClick={() => onStepClick(number)}>
                  {content}
                </button>
              ) : (
                <div className={styles.formStepButton}>{content}</div>
              )}
            </li>
          )
        })}
      </ol>
      <ProgressBar value={progress} size="sm" label={`Paso ${current} de ${steps.length}`} />
    </div>
  )
}
