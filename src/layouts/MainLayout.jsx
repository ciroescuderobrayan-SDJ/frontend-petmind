import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="app-shell">
        <Navbar />
        <main className="main-content">
        <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default MainLayout