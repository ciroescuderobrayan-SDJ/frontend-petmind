import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import Inicio from '../views/Inicio'
import Login from '../views/Login'
import Registro from '../views/Registro'
import Donar from '../views/Donar'
import DetallesCampana from '../views/DetallesCampana'
import MisCampanas from '../views/MisCampanas'
import CrearCampana from '../views/CrearCampana'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/donar" element={<Donar />} />
        <Route path="/donar/:id" element={<DetallesCampana />} />
        <Route path="/fundacion/campanas" element={<MisCampanas />} />
        <Route path="/fundacion/campanas/nueva" element={<CrearCampana />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
