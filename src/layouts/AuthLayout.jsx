import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'

// Acceso (01): cada pantalla trae su propia barra superior (logo + enlace), como en los mockups.
const AuthLayout = () => {
  return (
    <div className={styles.shell}>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
