import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import Icon from '../../components/ui/Icon'
import { Field } from '../../components/forms/Field'
import { MIN_DONATION, PLATFORM_FEE_RATE } from '../../data/donations'
import { formatCOP, onlyDigits } from '../../utils/format'
import styles from './DonarFlujo.module.css'

// 03 · Donaciones / 03 · Donar paso 1 — Elegir monto
export default function DonarMonto() {
  const { campaign, impacts, draft, update, amount, monthly, isFund, sponsoredPet, beneficiary } = useOutletContext()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const selectedImpact = !draft.custom ? impacts.find((impact) => impact.amount === draft.amount) : null
  const name = sponsoredPet?.name ?? campaign.petName
  const impactText = selectedImpact?.message
    ? `Con ${formatCOP(amount)} ${selectedImpact.message}`
    : amount >= MIN_DONATION
      ? `Con ${formatCOP(amount)} ${name ? `${name} está más cerca de su meta` : 'llegamos más lejos'}`
      : 'Elige un monto para ver su impacto'
  const backTo = isFund ? (sponsoredPet ? `/adoptar/${sponsoredPet.id}` : '/donar') : `/donar/${campaign.id}`

  function handleSubmit(event) {
    event.preventDefault()
    if (!amount) {
      setError('Elige o escribe un monto.')
      return
    }
    if (amount < MIN_DONATION) {
      setError(`El monto mínimo es ${formatCOP(MIN_DONATION)}.`)
      return
    }
    update({ stepOneDone: true })
    navigate('datos')
  }

  const title = sponsoredPet ? (
    <>
      ¿Cuánto quieres <span>donar</span> para el cuidado de {sponsoredPet.name}?
    </>
  ) : isFund ? (
    <>
      ¿Cuánto quieres <span>donar</span> al Fondo PetMind?
    </>
  ) : (
    <>
      ¿Cuánto quieres <span>donar</span> {name ? `a ${name}` : 'a esta campaña'}?
    </>
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>Todo aporte suma. Elige el monto y la frecuencia.</p>
      </div>

      <Field label="Frecuencia">
        <div className={styles.frequencies} role="radiogroup" aria-label="Frecuencia">
          <label className={`${styles.frequency} ${!monthly ? styles.frequencyActive : ''}`}>
            <input type="radio" className="sr-only" name="frequency" checked={!monthly} onChange={() => update({ frequency: 'unica' })} />
            <span className={styles.frequencyIcon}>
              <Icon name="heart" />
            </span>
            <span>
              <strong>Una sola vez</strong>
              <small>Aporte único {isFund ? 'al fondo' : 'a esta campaña'}</small>
            </span>
          </label>
          <label className={`${styles.frequency} ${monthly ? styles.frequencyActive : ''}`}>
            <input type="radio" className="sr-only" name="frequency" checked={monthly} onChange={() => update({ frequency: 'mensual' })} />
            <span className={styles.impactBadge}>Más impacto</span>
            <span className={styles.frequencyIcon}>
              <Icon name="calendar" />
            </span>
            <span>
              <strong>Mensual</strong>
              <small>{isFund ? 'Cada mes a las campañas más urgentes' : `Apoya a ${beneficiary} y luego al Fondo PetMind`}</small>
            </span>
          </label>
        </div>
      </Field>

      <Field label="Monto" error={error}>
        <div className={styles.presets} role="radiogroup" aria-label="Monto sugerido">
          {impacts.map((impact) => {
            const active = !draft.custom && draft.amount === impact.amount
            return (
              <button
                key={impact.amount}
                type="button"
                role="radio"
                aria-checked={active}
                className={`${styles.preset} ${active ? styles.presetActive : ''}`}
                onClick={() => {
                  update({ amount: impact.amount, custom: '' })
                  setError('')
                }}
              >
                <strong>{formatCOP(impact.amount)}</strong>
                <span>{impact.label}</span>
              </button>
            )
          })}
        </div>
        <div className={`input-group ${styles.otherAmount}`}>
          <span className={styles.currency}>$</span>
          <input
            className={`input ${draft.custom ? styles.otherActive : ''}`}
            inputMode="numeric"
            placeholder="Otro monto"
            aria-label="Otro monto"
            value={draft.custom ? Number(onlyDigits(draft.custom)).toLocaleString('es-CO') : ''}
            onChange={(event) => {
              const digits = onlyDigits(event.target.value).slice(0, 9)
              update({ custom: digits, amount: digits ? null : 50000 })
              setError('')
            }}
          />
          <span className="input-suffix">Mínimo {formatCOP(MIN_DONATION)}</span>
        </div>
      </Field>

      <div className={styles.impact} aria-live="polite">
        <img src={sponsoredPet?.photo ?? campaign.photo} alt="" />
        <div>
          <p className={styles.impactText}>{impactText}</p>
          <p>{monthly ? 'Cada mes te enviaremos cómo avanza.' : 'Te enviaremos cómo avanza la campaña.'}</p>
        </div>
      </div>

      <div className={styles.checks}>
        <label className="checkbox">
          <input type="checkbox" checked={draft.coverFee} onChange={(event) => update({ coverFee: event.target.checked })} />
          Agregar {formatCOP(Math.round(Math.max(amount, MIN_DONATION) * PLATFORM_FEE_RATE))} para cubrir los costos de la plataforma, así {beneficiary === 'la campaña' ? 'la campaña' : beneficiary} recibe el 100%
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={draft.anonymous} onChange={(event) => update({ anonymous: event.target.checked, showName: event.target.checked ? false : draft.showName })} />
          Donar de forma anónima
        </label>
      </div>

      <Field label={`Déjale un mensaje ${name ? `a ${name}` : 'a la fundación'}`} optional htmlFor="donation-message">
        <textarea
          id="donation-message"
          className={`textarea ${styles.message}`}
          maxLength={200}
          placeholder={name ? `¡Fuerza, ${name}! Pronto vas a volver a correr.` : 'Un mensaje de apoyo…'}
          value={draft.message}
          onChange={(event) => update({ message: event.target.value })}
        />
      </Field>

      <div className={styles.actions}>
        <Link className="btn btn-secondary btn-lg" to={backTo}>
          <Icon name="chevron-left" /> {isFund && !sponsoredPet ? 'Volver a las campañas' : sponsoredPet ? `Volver a ${sponsoredPet.name}` : 'Volver a la campaña'}
        </Link>
        <button type="submit" className="btn btn-accent btn-lg">
          Continuar <Icon name="arrow-right" />
        </button>
      </div>
    </form>
  )
}
