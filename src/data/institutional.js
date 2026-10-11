import { hoursAgo, daysAgo } from '../utils/dates'

// Cifras que se repiten en Login, Donar y Nosotros.
export const impactStats = [
  { value: '1.240', label: 'adopciones logradas' },
  { value: '86', label: 'fundaciones verificadas' },
  { value: '$320M', label: 'donados a tratamientos' },
  { value: '18', label: 'ciudades de Colombia' },
]

export const values = [
  { icon: 'shield-check', tone: 'primary', title: 'Transparencia', text: 'Cada donación se reporta con comprobantes y fotos.' },
  { icon: 'heart', tone: 'accent', title: 'Empatía', text: 'Tratamos a cada animal y a cada persona con respeto.' },
  { icon: 'user', tone: 'info', title: 'Comunidad', text: 'Juntos logramos lo que nadie podría hacer solo.' },
  { icon: 'star', tone: 'warning', title: 'Responsabilidad', text: 'Promovemos adopciones pensadas, no impulsivas.' },
]

export const howItWorks = [
  { icon: 'shield-check', tone: 'solid', title: 'Verificamos fundaciones', text: 'Revisamos documentos legales y trayectoria antes de publicar cualquier mascota o campaña.' },
  { icon: 'heart', tone: 'solid-accent', title: 'Conectamos personas', text: 'Adoptantes, donantes y voluntarios encuentran dónde su ayuda hace más falta.' },
  { icon: 'file', tone: 'solid-info', title: 'Acompañamos el proceso', text: 'Seguimiento de adopciones y reportes de impacto de cada peso donado.' },
]

// Equipo real del proyecto integrador (en el mockup aparecían nombres de ejemplo).
export const team = [
  { name: 'Brayan Ciro', role: 'Base, navegación y sesión', color: 'primary' },
  { name: 'Santiago Varela', role: 'Mascotas y adopción', color: 'accent' },
  { name: 'Emanuel Gómez', role: 'Campañas y donaciones', color: 'info' },
  { name: 'Laura Restrepo', role: 'Veterinaria asesora', color: 'purple' },
]

export const contactTopics = ['Adopciones', 'Donaciones', 'Soy una fundación', 'Problema técnico', 'Alianzas', 'Otro']

export const contactChannels = [
  { icon: 'message', tone: 'primary', title: 'WhatsApp', text: '+57 300 000 0000 · respuesta inmediata', action: 'Escribir', href: 'https://wa.me/573000000000' },
  { icon: 'mail', tone: 'info', title: 'Correo', text: 'hola@petmind.co', action: 'Enviar', href: 'mailto:hola@petmind.co' },
  { icon: 'phone', tone: 'primary', title: 'Teléfono', text: '604 000 0000 · lun a vie 8–6', action: 'Llamar', href: 'tel:6040000000' },
  { icon: 'map-pin', tone: 'warning', title: 'Oficina', text: 'Medellín, Antioquia · con cita' },
]

export const faqs = [
  {
    q: '¿Adoptar en PetMind tiene costo?',
    a: 'No. Algunas fundaciones piden un aporte voluntario para cubrir vacunas y esterilización, y siempre lo verás antes de enviar tu solicitud.',
  },
  {
    q: '¿Cómo sé que mi donación llega?',
    a: 'Cada campaña publica facturas y fotos del uso del dinero. Además recibes un comprobante y puedes seguir las actualizaciones desde tu cuenta.',
  },
  {
    q: '¿Puedo adoptar si vivo en arriendo?',
    a: 'Sí. Solo necesitas que el arrendador permita mascotas; la fundación te lo preguntará en el formulario.',
  },
  {
    q: '¿Cómo registro mi fundación?',
    a: 'Crea una cuenta de fundación, sube el RUT y el certificado de Cámara de comercio. Revisamos todo en máximo 48 horas.',
  },
  {
    q: '¿Puedo cancelar mi donación mensual?',
    a: 'Cuando quieras, desde Mi cuenta → Mis donaciones. También puedes pausarla o cambiar el monto.',
  },
  {
    q: '¿Qué pasa si la adopción no funciona?',
    a: 'La fundación te acompaña durante la adaptación. Si no funciona, recibe a la mascota de nuevo para buscarle otro hogar.',
  },
]

export const userNotifications = [
  { id: 'n-1', icon: 'calendar', tone: 'primary', title: 'Huellitas de Amor agendó tu entrevista', date: hoursAgo(2), unread: true, to: '/cuenta/solicitudes/PM-2481' },
  { id: 'n-2', icon: 'heart', tone: 'accent', title: 'La campaña de Toby llegó al 76%', date: hoursAgo(5), unread: true, to: '/donar/toby' },
  { id: 'n-3', icon: 'paw', tone: 'info', title: 'Nueva mascota compatible: Canela, 8 meses', date: daysAgo(1), unread: false, to: '/adoptar/canela' },
]

export const foundationAttention = [
  { id: 'a-1', kind: 'photo', title: 'Max lleva 60 días publicado', text: 'Agrega fotos nuevas o un video', photo: '/img/fotos/mascota-max-perro.jpg', to: '/fundacion/mascotas/max/editar' },
  { id: 'a-2', kind: 'icon', icon: 'zap', tone: 'accent', title: '2 reportes a menos de 5 km', text: 'Perro herido · Gato abandonado', to: '/fundacion/reportes' },
  { id: 'a-3', kind: 'icon', icon: 'file', tone: 'info', title: 'Sube el comprobante de Nala', text: 'La campaña cierra en 4 días', to: '/fundacion/campanas' },
]
