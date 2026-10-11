import { Breadcrumbs } from '../../components/ui/Navigation'
import styles from './Legal.module.css'

// No tiene mockup: existe para que los enlaces de Términos, Privacidad y Tratamiento de datos no queden rotos.
const sections = [
  {
    id: 'terminos',
    title: 'Términos y condiciones',
    text: [
      'PetMind conecta personas con fundaciones verificadas. Las adopciones las aprueba siempre la fundación responsable de cada mascota.',
      'Al publicar mascotas o campañas, la fundación se compromete a que la información sea veraz y a reportar el uso de los recursos.',
    ],
  },
  {
    id: 'privacidad',
    title: 'Política de privacidad',
    text: [
      'Usamos tus datos para gestionar tus solicitudes, donaciones y reportes. Solo la fundación de cada proceso ve las respuestas de tu formulario.',
      'Puedes pedir que eliminemos tu cuenta en cualquier momento desde Mi perfil → Zona de cuidado.',
    ],
  },
  {
    id: 'datos',
    title: 'Tratamiento de datos personales',
    text: [
      'Tratamos tus datos según la Ley 1581 de 2012. Puedes conocer, actualizar y rectificar tu información escribiendo a hola@petmind.co.',
      'Esta es una versión de demostración del proyecto integrador: los datos se guardan solo en tu navegador.',
    ],
  },
]

export default function Legal() {
  return (
    <div className="page">
      <title>Términos y privacidad | PetMind</title>
      <div className="container-narrow">
        <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Términos y privacidad' }]} />
        <h1 className="page-title">Términos y privacidad</h1>
        <div className={styles.sections}>
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="panel">
              <h2 className={styles.title}>{section.title}</h2>
              {section.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
