import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthTopBar from '../../components/layout/AuthTopBar'
import Icon from '../../components/ui/Icon'
import { IconBadge, PetScene } from '../../components/ui/Decor'
import { Stepper } from '../../components/forms/Steppers'
import { OtpInput } from '../../components/forms/OtpInput'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useCountdown } from '../../hooks/useCountdown'
import styles from './Acceso.module.css'

// 01 · Acceso / 05 · Registro paso 3 — Verificar correo
export default function VerificarCorreo() {
  const { pendingEmail, users, verifyEmail } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [left, leftText, restart] = useCountdown(60)

  const pending = users.find((user) => user.email === pendingEmail)
  const backTo = pending?.accountType === 'fundacion' ? '/registro/fundacion' : '/registro/persona'

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = verifyEmail(code)
    if (!result.ok) {
      setError(result.error)
      return
    }
    showToast(`¡Bienvenido a PetMind, ${result.user.name}!`)
    navigate(result.user.accountType === 'fundacion' ? '/fundacion' : '/cuenta', { replace: true })
  }

  function resend() {
    restart()
    setCode('')
    showToast(`Te enviamos un código nuevo a ${pendingEmail}`)
  }

  return (
    <>
      <title>Verifica tu correo | PetMind</title>
      <AuthTopBar backTo={backTo} backLabel="Volver a mis datos" />

      <PetScene leftNote="¡Ya casi!" rightNote="un paso más ♡">
        {pending ? (
          <form className={styles.cardContent} onSubmit={handleSubmit} noValidate>
            <Stepper steps={['Tipo de cuenta', 'Tus datos', 'Verificación']} current={3} hideDoneLabels />
            <IconBadge icon="mail" heart />
            <h1>Verifica tu correo</h1>
            <p>Enviamos un código de 6 dígitos a</p>
            <span className={styles.emailPill}>{pendingEmail}</span>

            <OtpInput
              value={code}
              onChange={(value) => {
                setCode(value)
                setError('')
              }}
              invalid={Boolean(error)}
            />
            {error && (
              <span className="field-error" role="alert">
                {error}
              </span>
            )}

            <button type="submit" className={`btn btn-primary btn-block ${styles.submit}`} disabled={code.length < 6}>
              Verificar y entrar <Icon name="arrow-right" />
            </button>

            <p className={styles.resend}>
              ¿No te llegó?{' '}
              {left > 0 ? (
                <strong>Reenviar en {leftText}</strong>
              ) : (
                <button type="button" className="link-button" onClick={resend}>
                  Reenviar código
                </button>
              )}
            </p>
            <p className={styles.hint}>Demo: sirve cualquier código de 6 dígitos.</p>
          </form>
        ) : (
          <div className={styles.cardContent}>
            <IconBadge icon="mail" />
            <h1>No hay un registro pendiente</h1>
            <p>Crea tu cuenta para recibir el código de verificación.</p>
            <Link className="btn btn-primary btn-block" to="/registro">
              Crear cuenta
            </Link>
          </div>
        )}
      </PetScene>
    </>
  )
}
