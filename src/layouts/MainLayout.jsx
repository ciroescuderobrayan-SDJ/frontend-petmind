import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content" id="contenido">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
