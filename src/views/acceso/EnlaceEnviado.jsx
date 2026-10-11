import { Navigate, useNavigate } from 'react-router-dom'
import AuthTopBar from '../../components/layout/AuthTopBar'
import Icon from '../../components/ui/Icon'
import { IconBadge, PetScene } from '../../components/ui/Decor'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useCountdown } from '../../hooks/useCountdown'
import { maskEmail } from '../../utils/format'
import styles from './Acceso.module.css'

// 01 · Acceso / 07 · Recuperar contraseña — Enlace enviado
export default function EnlaceEnviado() {
  const { resetEmail, requestPasswordReset } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [left, leftText, restart] = useCountdown(58)

  if (!resetEmail) return <Navigate to="/recuperar" replace />

  // En la demo no hay correo real: "Abrir mi correo" simula abrir el enlace que llegó.
  function openEmail() {
    showToast('Simulamos que abriste el enlace del correo.', { tone: 'info' })
    navigate('/recuperar/nueva')
  }

  function resend() {
    requestPasswordReset(resetEmail)
    restart()
    showToast('Te enviamos el enlace otra vez.')
  }

  return (
    <>
      <title>Enlace enviado | PetMind</title>
      <AuthTopBar backTo="/login" backLabel="Volver a iniciar sesión" />

      <PetScene leftNote="Revisa tu bandeja" rightNote="y también spam ;)">
        <div className={styles.cardContent}>
          <IconBadge icon="send" tone="accent" />
          <h1>¡Enlace enviado!</h1>
          <p>Si existe una cuenta con este correo, recibirás las instrucciones en los próximos minutos.</p>
          <span className={styles.emailPill}>{maskEmail(resetEmail)}</span>

          <button type="button" className={`btn btn-primary btn-block ${styles.submit}`} onClick={openEmail}>
            Abrir mi correo <Icon name="arrow-right" />
          </button>

          <div className="alert alert-warning">
            <Icon name="info" />
            <span>El enlace vence en 30 minutos. Si no lo ves, revisa la carpeta de spam o promociones.</span>
          </div>

          <p className={styles.resend}>
            ¿No te llegó?{' '}
            {left > 0 ? (
              <strong>Reenviar en {leftText}</strong>
            ) : (
              <button type="button" className="link-button" onClick={resend}>
                Reenviar enlace
              </button>
            )}
          </p>
        </div>
      </PetScene>
    </>
  )
}
