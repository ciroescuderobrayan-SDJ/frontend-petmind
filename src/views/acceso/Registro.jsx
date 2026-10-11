import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthTopBar from '../../components/layout/AuthTopBar'
import Icon from '../../components/ui/Icon'
import { Stepper } from '../../components/forms/Steppers'
import styles from './Acceso.module.css'

const accountTypes = [
  {
    value: 'persona',
    title: 'Soy una persona',
    text: 'Quiero adoptar, donar o apoyar causas de bienestar animal.',
    photo: '/img/fotos/miniatura-video-historias-que-inspiran.jpg',
    icon: 'user',
    items: ['Adoptar y seguir tu solicitud', 'Donar a campañas y tratamientos', 'Guardar mascotas favoritas'],
  },
  {
    value: 'fundacion',
    title: 'Soy una fundación',
    text: 'Representamos una organización que rescata y cuida animales.',
    photo: '/img/fotos/historia-rocky-despues-del-rescate.jpg',
    icon: 'building',
    items: ['Publicar mascotas en adopción', 'Crear campañas de recaudación', 'Gestionar solicitudes recibidas'],
    verification: true,
  },
]

// 01 · Acceso / 02 · Registro paso 1 — Elegir tipo de cuenta
const Registro = () => {
  const navigate = useNavigate()
  const [type, setType] = useState('persona')

  return (
    <>
      <title>Crear cuenta | PetMind</title>
      <AuthTopBar question="¿Ya tienes cuenta?" actionTo="/login" actionLabel="Iniciar sesión" />

      <section className={styles.choose}>
        <Stepper steps={['Tipo de cuenta', 'Tus datos', 'Verificación']} current={1} />
        <h1 className={styles.chooseTitle}>
          ¿Cómo quieres ser parte de <span>PetMind</span>?
        </h1>
        <p className={styles.chooseLead}>Elige el tipo de cuenta. Así te mostramos las herramientas correctas desde el primer día.</p>

        <div className={styles.accountGrid} role="radiogroup" aria-label="Tipo de cuenta">
          {accountTypes.map((account) => {
            const selected = type === account.value
            const blue = account.value === 'fundacion'
            return (
              <label key={account.value} className={`${styles.accountCard} ${selected ? styles.accountSelected : ''}`}>
                <input type="radio" className="sr-only" name="accountType" value={account.value} checked={selected} onChange={() => setType(account.value)} />
                <div className={styles.accountPhoto}>
                  <img src={account.photo} alt="" />
                  {account.verification && (
                    <span className={styles.verifyBadge}>
                      <Icon name="shield" /> Requiere verificación
                    </span>
                  )}
                  <span className={styles.accountRadio} aria-hidden="true">
                    {selected && <Icon name="check" strokeWidth={3} />}
                  </span>
                  <span className={`${styles.accountIcon} ${blue ? styles.accountIconBlue : ''}`}>
                    <Icon name={account.icon} />
                  </span>
                </div>
                <div className={styles.accountBody}>
                  <h2>{account.title}</h2>
                  <p>{account.text}</p>
                  <ul className={styles.checklist}>
                    {account.items.map((item) => (
                      <li key={item}>
                        <span className={`${styles.checkTile} ${blue ? styles.checkTileBlue : ''}`}>
                          <Icon name="check" strokeWidth={2.6} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
            )
          })}
        </div>

        <button type="button" className={`btn btn-primary btn-lg ${styles.chooseButton}`} onClick={() => navigate(`/registro/${type}`)}>
          Continuar como {type === 'persona' ? 'persona' : 'fundación'} <Icon name="arrow-right" />
        </button>
      </section>
    </>
  )
}

export default Registro
