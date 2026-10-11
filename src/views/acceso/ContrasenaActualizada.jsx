import { Link } from 'react-router-dom'
import AuthTopBar from '../../components/layout/AuthTopBar'
import Icon from '../../components/ui/Icon'
import { PetScene } from '../../components/ui/Decor'
import styles from './Acceso.module.css'

// 01 · Acceso / 09 · Recuperar contraseña — Actualizada
export default function ContrasenaActualizada() {
  return (
    <>
      <title>Contraseña actualizada | PetMind</title>
      <AuthTopBar backTo="/" backLabel="Ir al inicio" />

      <PetScene leftNote="¡Todo listo!" rightNote="bienvenido de vuelta">
        <div className={styles.cardContent}>
          <span className={styles.successCircle}>
            <Icon name="check" strokeWidth={2.6} />
          </span>
          <h1>Contraseña actualizada</h1>
          <p>Tu cuenta está segura. Ya puedes iniciar sesión con tu nueva contraseña.</p>
          <Link className={`btn btn-primary btn-block ${styles.submit}`} to="/login">
            Iniciar sesión <Icon name="arrow-right" />
          </Link>
          <p className={styles.altLink}>
            ¿No fuiste tú? <Link to="/contacto">Contáctanos</Link>
          </p>
        </div>
      </PetScene>
    </>
  )
}
