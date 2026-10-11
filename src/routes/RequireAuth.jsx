import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Rutas privadas: sin sesión → /login (y al entrar vuelve aquí). Con otro tipo de cuenta → su propio panel.
export default function RequireAuth({ role, children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
  }

  if (role && user.accountType !== role) {
    return <Navigate to={user.accountType === 'fundacion' ? '/fundacion' : '/cuenta'} replace />
  }

  return children ?? <Outlet />
}
