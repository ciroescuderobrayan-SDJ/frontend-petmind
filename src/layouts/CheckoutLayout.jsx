import { Link, Outlet, useParams } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import Icon from '../components/ui/Icon'
import styles from './CheckoutLayout.module.css'

// Flujo de donar (03 · pasos 1 a 3): sin menú ni pie, solo el logo, el sello de seguridad y "Salir sin donar".
export default function CheckoutLayout() {
  const { id } = useParams()
  const exitTo = id && id !== 'fondo-petmind' ? `/donar/${id}` : '/donar'

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.left}>
          <Logo />
          <span className={styles.secure}>
            <Icon name="shield-check" />
            Donación 100% segura
          </span>
        </div>
        <Link className={styles.exit} to={exitTo}>
          <Icon name="x" />
          Salir sin donar
        </Link>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
