import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthTopBar from '../../components/layout/AuthTopBar'
import Icon from '../../components/ui/Icon'
import { IconBadge, PetScene } from '../../components/ui/Decor'
import { Field, IconInput } from '../../components/forms/Field'
import { useAuth } from '../../context/AuthContext'
import { isValidEmail } from '../../utils/format'
import styles from './Acceso.module.css'

// 01 · Acceso / 06 · Recuperar contraseña — Pedir enlace
export default function RecuperarContrasena() {
  const { requestPasswordReset } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError(email.trim() ? 'Revisa el formato del correo.' : 'Escribe el correo con el que te registraste.')
      return
    }
    requestPasswordReset(email)
    navigate('/recuperar/enviado')
  }

  return (
    <>
      <title>Recuperar contraseña | PetMind</title>
      <AuthTopBar backTo="/login" backLabel="Volver a iniciar sesión" />

      <PetScene leftNote="Nos pasa a todos" rightNote="te ayudamos ♡">
        <form className={styles.cardContent} onSubmit={handleSubmit} noValidate>
          <IconBadge icon="key" heart />
          <h1>¿Olvidaste tu contraseña?</h1>
          <p>Tranquilo. Escribe el correo con el que te registraste y te enviaremos un enlace para crear una nueva.</p>

          <div className={styles.cardForm}>
            <Field label="Correo electrónico" htmlFor="reset-email" error={error}>
              <IconInput
                id="reset-email"
                icon="mail"
                type="email"
                autoComplete="email"
                placeholder="tu.correo@correo.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError('')
                }}
                invalid={Boolean(error)}
              />
            </Field>
            <button type="submit" className={`btn btn-primary btn-block ${styles.submit}`}>
              Enviar enlace <Icon name="arrow-right" />
            </button>
          </div>

          <p className={styles.altLink}>
            ¿Lo recordaste? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </PetScene>
    </>
  )
}
