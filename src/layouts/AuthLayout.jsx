import '../styles/authLayout.css'
import { Link, Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
    <div className="auth-shell">
        <header className="auth-header">
        <Link className="auth-brand" to="/">
            PetMind
        </Link>
        </header>

        <main className="auth-content">
        <Outlet />
        </main>

        <footer className="auth-footer">
        <p>Conectamos vidas, cambiamos historias.</p>
        </footer>
    </div>
    )
}

export default AuthLayout