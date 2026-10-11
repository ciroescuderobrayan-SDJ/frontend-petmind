const photo = (name) => `/img/fotos/${name}.jpg`

export const storyFilters = [
  { value: 'todas', label: 'Todas' },
  { value: 'antes-despues', label: 'Antes y después' },
  { value: 'adopcion', label: 'Adopciones' },
  { value: 'tratamiento', label: 'Tratamientos' },
  { value: 'video', label: 'Videos', icon: 'video' },
]

// `type` define el filtro y el color de la etiqueta.
export const stories = [
  {
    id: 'rocky-volvio-a-caminar',
    title: 'Rocky volvió a caminar',
    type: 'antes-despues',
    label: 'Antes y después',
    foundationId: 'patitas-valle',
    photo: photo('historia-rocky-despues-del-rescate'),
    before: { src: photo('historia-rocky-antes-del-rescate'), label: 'Antes · marzo', longLabel: 'Marzo · el día del rescate' },
    after: { src: photo('historia-rocky-despues-del-rescate'), label: 'Después · agosto', longLabel: 'Agosto · en su nuevo hogar' },
    excerpt: 'Fue encontrado con una pata fracturada. 43 donantes pagaron su cirugía.',
    homeExcerpt:
      'Fue encontrado en la calle con una pata fracturada. Gracias a 43 personas que donaron, pudo recibir tratamiento y hoy tiene una nueva vida.',
    featuredText:
      'Lo encontraron en la calle con una pata fracturada. Gracias a 43 personas que donaron pudo recibir cirugía y fisioterapia. Hoy corre en el patio de su nueva familia en Cali.',
    lead: 'Lo encontraron bajo un puente con una pata fracturada. Cinco meses después, corre en el patio de su nueva familia. Esta es la historia de cómo 43 personas le cambiaron la vida.',
    stats: [
      { value: '43', label: 'donantes' },
      { value: '$3,2M', label: 'recaudados' },
      { value: '5 meses', label: 'de recuperación' },
    ],
    likes: 312,
    publishedAt: '2026-08-18T10:00:00',
    readTime: 4,
    body: [
      'Era un martes lluvioso cuando una vecina del barrio Siloé nos escribió: había un perro que no se levantaba desde hacía dos días. Cuando llegamos, Rocky estaba débil, asustado y con la pata trasera izquierda fracturada.',
      'En la clínica confirmaron que necesitaba una cirugía con placa y semanas de fisioterapia. Publicamos su campaña en PetMind y en solo 9 días la comunidad reunió lo necesario.',
    ],
    journey: [
      { icon: 'map-pin', tone: 'accent', title: 'Rescate', lines: ['12 de marzo', 'Barrio Siloé, Cali'] },
      { icon: 'heart', tone: 'warning', title: 'Campaña', lines: ['43 donantes', '$3,2M en 9 días'] },
      { icon: 'shield-check', tone: 'info', title: 'Cirugía y terapia', lines: ['Abril a junio', '12 sesiones'] },
      { icon: 'home', tone: 'primary', title: 'Adopción', lines: ['2 de agosto', 'Familia Rodríguez'] },
    ],
    quote: {
      text: 'Cuando lo vimos correr por primera vez, toda la clínica aplaudió. Rocky nos enseñó a no rendirnos.',
      author: 'Dra. Catalina Ruiz, veterinaria de Rocky',
    },
    closing: 'Hoy Rocky vive con la familia Rodríguez, tiene dos hermanos humanos que lo adoran y un patio donde persigue pelotas todas las tardes. Su pata quedó perfecta.',
    video: { thumbnail: photo('historia-rocky-despues-del-rescate'), title: 'Mira a Rocky en su nuevo hogar', duration: '1:12' },
    donors: ['María C.', 'Juan P.', 'Laura R.', 'Anónimo', 'Andrés G.', 'Sofía M.', 'Camilo T.', 'Valentina', 'Anónimo', 'Diego H.', 'Paula V.', 'Santiago'],
    donorsTotal: 43,
    ctas: {
      adopt: { title: 'Hay más como Rocky esperando', text: '31 perros de Patitas Valle buscan un hogar.', label: 'Ver mascotas' },
      donate: { title: 'Ayuda a escribir la próxima historia', text: 'Toby necesita la misma cirugía que Rocky.', label: 'Donar a Toby', campaignId: 'toby' },
    },
  },
  {
    id: 'nuevo-comienzo-luna',
    title: 'Un nuevo comienzo para Luna',
    type: 'video',
    label: 'Video',
    foundationId: 'huellitas-de-amor',
    photo: photo('miniatura-video-nuevo-comienzo-luna'),
    duration: '1:28',
    excerpt: 'De la calle a correr libre en su nuevo hogar en Envigado.',
    lead: 'Así fue el primer día de Luna corriendo libre, después de meses de recuperación.',
    likes: 248,
    publishedAt: '2026-09-02T09:00:00',
    readTime: 2,
    body: [
      'Luna llegó a Huellitas de Amor con una pata lastimada y mucho miedo. Durante tres meses recibió tratamiento y el cariño de los voluntarios.',
      'En este video la acompañamos en su primera tarde en un parque de Envigado: corre, olfatea todo y no deja de mover la cola.',
    ],
    video: { thumbnail: photo('miniatura-video-nuevo-comienzo-luna'), title: 'Un nuevo comienzo para Luna', duration: '1:28' },
    donors: ['Laura R.', 'Camila R.', 'Anónimo', 'Julián G.'],
    donorsTotal: 26,
    ctas: {
      adopt: { title: 'Luna todavía busca familia', text: 'Conócela y envía tu solicitud.', label: 'Conocer a Luna', to: '/adoptar/luna' },
      donate: { title: 'Ayuda a la próxima Luna', text: 'Nala necesita su cirugía de ojo.', label: 'Donar a Nala', campaignId: 'cirugia-nala' },
    },
  },
  {
    id: 'milo-y-ana',
    title: 'Milo y Ana: amor a primera vista',
    type: 'adopcion',
    label: 'Adopción',
    foundationId: 'gatitos-bogota',
    photo: photo('miniatura-video-historias-que-inspiran'),
    excerpt: 'Ana llegó buscando un gato tranquilo y Milo la eligió a ella.',
    lead: 'Ana fue a conocer a otro gato, pero Milo se le subió al regazo y no se bajó más.',
    likes: 190,
    publishedAt: '2026-08-27T15:00:00',
    readTime: 3,
    body: [
      'Ana buscaba un gato tranquilo para su apartamento en Chapinero. Fue a conocer a una gatita, pero Milo se le acercó, se le subió al regazo y se quedó dormido.',
      'Tres meses después, Milo tiene su ventana favorita, una rascadora nueva y una humana que le habla todas las mañanas.',
    ],
    donors: ['Ana M.', 'Anónimo', 'Felipe S.'],
    donorsTotal: 12,
    ctas: {
      adopt: { title: 'Hay más gatos esperando', text: 'Conoce a los gatos en adopción.', label: 'Ver gatos', to: '/adoptar?especie=Gato' },
      donate: { title: 'Ayuda a más gatos', text: 'Esterilicemos 80 gatos en Bello.', label: 'Donar', campaignId: 'esterilizacion-bello' },
    },
  },
  {
    id: 'nala-recupero-la-vista',
    title: 'Nala recuperó la vista de un ojo',
    type: 'tratamiento',
    label: 'Tratamiento',
    foundationId: 'huellitas-de-amor',
    photo: photo('mascota-nala-gata'),
    excerpt: 'La cirugía se logró en 9 días gracias a la comunidad.',
    lead: 'Una infección casi le cuesta el ojo derecho. La comunidad reunió lo de su cirugía en 9 días.',
    likes: 156,
    publishedAt: '2026-08-12T11:00:00',
    readTime: 3,
    body: [
      'Nala llegó con una infección avanzada en el ojo derecho. El especialista fue claro: había que operar pronto.',
      'Gracias a 63 donantes, la cirugía se hizo a tiempo. Hoy Nala ve perfectamente y está lista para encontrar familia.',
    ],
    donors: ['María C.', 'Brayan C.', 'Anónimo'],
    donorsTotal: 63,
    ctas: {
      adopt: { title: 'Nala busca un hogar tranquilo', text: 'Conócela en su perfil.', label: 'Conocer a Nala', to: '/adoptar/nala' },
      donate: { title: 'Ayuda a escribir la próxima historia', text: 'Toby necesita una cirugía de pata.', label: 'Donar a Toby', campaignId: 'toby' },
    },
  },
  {
    id: 'pequenos-gestos',
    title: 'Pequeños gestos, grandes cambios',
    type: 'video',
    label: 'Video',
    foundationId: 'refugio-san-francisco',
    photo: photo('miniatura-video-pequenos-gestos'),
    duration: '1:45',
    excerpt: 'Voluntarios cuentan cómo es un día en el refugio.',
    lead: 'Un día en el Refugio San Francisco contado por sus voluntarios.',
    likes: 133,
    publishedAt: '2026-07-30T08:00:00',
    readTime: 2,
    body: ['Bañar, alimentar, pasear y jugar: así es un día cualquiera en el refugio. Cada pequeño gesto cuenta.'],
    video: { thumbnail: photo('miniatura-video-pequenos-gestos'), title: 'Pequeños gestos, grandes cambios', duration: '1:45' },
    donors: ['Anónimo', 'Sofía M.'],
    donorsTotal: 9,
    ctas: {
      adopt: { title: 'Conoce a los peludos del refugio', text: 'Todos esperan una familia.', label: 'Ver mascotas' },
      donate: { title: 'Dona al Fondo PetMind', text: 'Lo repartimos donde más se necesita.', label: 'Donar', campaignId: 'fondo-petmind' },
    },
  },
  {
    id: 'canela-ya-no-le-teme',
    title: 'Canela ya no le teme a la gente',
    type: 'tratamiento',
    label: 'Rehabilitación',
    tone: 'purple',
    foundationId: 'rescate-animal-sur',
    photo: photo('mascota-canela-perra'),
    excerpt: 'Tres meses de paciencia y juego con su hogar de paso.',
    lead: 'Canela no se dejaba tocar. Tres meses después, es la más sociable del grupo.',
    likes: 121,
    publishedAt: '2026-07-21T10:00:00',
    readTime: 3,
    body: [
      'Cuando Canela llegó, se escondía detrás de los muebles y temblaba si alguien se acercaba.',
      'Con paciencia, juego y rutinas, su hogar de paso le ayudó a confiar otra vez. Hoy corre a saludar a todo el que llega.',
    ],
    donors: ['Marta L.', 'Anónimo'],
    donorsTotal: 8,
    ctas: {
      adopt: { title: 'Canela busca familia', text: 'Conócela en su perfil.', label: 'Conocer a Canela', to: '/adoptar/canela' },
      donate: { title: 'Ayuda al refugio', text: 'Un techo nuevo antes de las lluvias.', label: 'Donar', campaignId: 'techo-refugio' },
    },
  },
]

// Videos de "Momentos PetMind" en el inicio.
export const homeVideos = [
  { id: 'nuevo-comienzo-luna', title: 'Un nuevo comienzo para Luna', photo: photo('miniatura-video-nuevo-comienzo-luna'), duration: '1:28' },
  { id: 'milo-y-ana', title: 'Historias que inspiran', photo: photo('miniatura-video-historias-que-inspiran'), duration: '2:14' },
  { id: 'pequenos-gestos', title: 'Pequeños gestos, grandes cambios', photo: photo('miniatura-video-pequenos-gestos'), duration: '1:45' },
]

export function getStoryById(id) {
  return stories.find((story) => story.id === id)
}
