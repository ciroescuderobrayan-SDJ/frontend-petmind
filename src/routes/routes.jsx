import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import Inicio from '../views/Inicio'
import Login from '../views/acceso/Login'
import Registro from '../views/acceso/Registro'
import RegistroPersona from '../views/acceso/RegistroPersona'
import RegistroFundacion from '../views/acceso/RegistroFundacion'
import VerificarCorreo from '../views/acceso/VerificarCorreo'
import RecuperarContrasena from '../views/acceso/RecuperarContrasena'
import EnlaceEnviado from '../views/acceso/EnlaceEnviado'
import NuevaContrasena from '../views/acceso/NuevaContrasena'
import ContrasenaActualizada from '../views/acceso/ContrasenaActualizada'
import Adoptar from '../views/adopcion/Adoptar'
import PerfilDeLaMascota from '../views/adopcion/PerfilDeLaMascota'
import SolicitudAdopcion from '../views/adopcion/SolicitudAdopcion'
import SolicitudEnviada from '../views/adopcion/SolicitudEnviada'
import SeguimientoSolicitud from '../views/adopcion/SeguimientoSolicitud'
import Donar from '../views/donaciones/Donar'
import DetallesCampana from '../views/donaciones/DetallesCampana'
import DonarFlujo from '../views/donaciones/DonarFlujo'
import DonarMonto from '../views/donaciones/DonarMonto'
import DonarDatos from '../views/donaciones/DonarDatos'
import DonarPago from '../views/donaciones/DonarPago'
import DonacionExitosa from '../views/donaciones/DonacionExitosa'
import CheckoutLayout from '../layouts/CheckoutLayout'
import Legal from '../views/institucional/Legal'
import NoEncontrada from '../views/NoEncontrada'
import RequireAuth from './RequireAuth'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />

        {/* 02 · Adopción */}
        <Route path="/adoptar" element={<Adoptar />} />
        <Route path="/adoptar/:id" element={<PerfilDeLaMascota />} />
        <Route element={<RequireAuth role="persona" />}>
          <Route path="/adoptar/:id/solicitud" element={<SolicitudAdopcion />} />
          <Route path="/cuenta/solicitudes/:id" element={<SeguimientoSolicitud />} />
          <Route path="/cuenta/solicitudes/:id/enviada" element={<SolicitudEnviada />} />
        </Route>

        {/* 03 · Donaciones */}
        <Route path="/donar" element={<Donar />} />
        <Route path="/donar/:id" element={<DetallesCampana />} />
        <Route path="/donar/gracias/:id" element={<DonacionExitosa />} />

        <Route path="/legal" element={<Legal />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>

      {/* 03 · Donaciones: los 3 pasos van sin menú, solo con "Salir sin donar" */}
      <Route element={<CheckoutLayout />}>
        <Route path="/donar/:id/aportar" element={<DonarFlujo />}>
          <Route index element={<DonarMonto />} />
          <Route path="datos" element={<DonarDatos />} />
          <Route path="pago" element={<DonarPago />} />
        </Route>
      </Route>

      {/* 01 · Acceso */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro/persona" element={<RegistroPersona />} />
        <Route path="/registro/fundacion" element={<RegistroFundacion />} />
        <Route path="/registro/verificar" element={<VerificarCorreo />} />
        <Route path="/recuperar" element={<RecuperarContrasena />} />
        <Route path="/recuperar/enviado" element={<EnlaceEnviado />} />
        <Route path="/recuperar/nueva" element={<NuevaContrasena />} />
        <Route path="/recuperar/listo" element={<ContrasenaActualizada />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
