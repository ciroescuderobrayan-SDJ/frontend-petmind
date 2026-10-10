import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <nav className="container navbar">
        <Link className="brand" to="/">
          PetMind
        </Link>

        <div className="nav-links">
          <NavLink className="nav-link" to="/adoptar">Adoptar</NavLink>
          <NavLink className="nav-link" to="/donar">Donar</NavLink>
          <NavLink className="nav-link" to="/fundacion/mascotas">Mis mascotas</NavLink>
          <NavLink className="nav-link" to="/fundacion/campanas">Mis campañas</NavLink>
        </div>

        <div className="nav-actions">
          <button type="button" className="btn btn-ghost" onClick={toggleTheme}>
            {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <Link className="btn btn-outline" to="/login">
            Iniciar sesión
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
