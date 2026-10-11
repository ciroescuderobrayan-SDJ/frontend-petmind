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
import DashboardLayout from '../layouts/DashboardLayout'
import DirectorioFundaciones from '../views/fundaciones/DirectorioFundaciones'
import PerfilFundacion from '../views/fundaciones/PerfilFundacion'
import ListaHistorias from '../views/historias/ListaHistorias'
import DetalleHistoria from '../views/historias/DetalleHistoria'
import Nosotros from '../views/institucional/Nosotros'
import Contacto from '../views/institucional/Contacto'
import Reportar from '../views/institucional/Reportar'
import ReporteEnviado from '../views/institucional/ReporteEnviado'
import PanelCuenta from '../views/cuenta/PanelCuenta'
import PanelFundacion from '../views/fundacion/PanelFundacion'

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
        <Route path="/fundaciones" element={<DirectorioFundaciones />} />
        <Route path="/fundaciones/:id" element={<PerfilFundacion />} />
        <Route path="/historias" element={<ListaHistorias />} />
        <Route path="/historias/:id" element={<DetalleHistoria />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/reportar" element={<Reportar />} />
        <Route path="/reportar/enviado/:id" element={<ReporteEnviado />} />

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

      <Route element={<RequireAuth role="persona" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/cuenta" element={<PanelCuenta />} />
          <Route path="/cuenta/solicitudes" element={<PanelCuenta />} />
          <Route path="/cuenta/favoritos" element={<PanelCuenta />} />
          <Route path="/cuenta/donaciones" element={<PanelCuenta />} />
          <Route path="/cuenta/reportes" element={<PanelCuenta />} />
          <Route path="/cuenta/mensajes" element={<PanelCuenta />} />
          <Route path="/cuenta/perfil" element={<PanelCuenta />} />
        </Route>
      </Route>
      <Route element={<RequireAuth role="fundacion" />}>
        <Route element={<DashboardLayout variant="fundacion" />}>
          <Route path="/fundacion" element={<PanelFundacion />} />
          <Route path="/fundacion/mascotas" element={<PanelFundacion />} />
          <Route path="/fundacion/mascotas/nueva" element={<PanelFundacion />} />
          <Route path="/fundacion/mascotas/:petId/editar" element={<PanelFundacion />} />
          <Route path="/fundacion/solicitudes" element={<PanelFundacion />} />
          <Route path="/fundacion/solicitudes/:id" element={<PanelFundacion />} />
          <Route path="/fundacion/campanas" element={<PanelFundacion />} />
          <Route path="/fundacion/campanas/nueva" element={<PanelFundacion />} />
          <Route path="/fundacion/campanas/:campaignId/editar" element={<PanelFundacion />} />
          <Route path="/fundacion/donaciones" element={<PanelFundacion />} />
          <Route path="/fundacion/reportes" element={<PanelFundacion />} />
          <Route path="/fundacion/mensajes" element={<PanelFundacion />} />
          <Route path="/fundacion/equipo" element={<PanelFundacion />} />
          <Route path="/fundacion/documentos" element={<PanelFundacion />} />
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
