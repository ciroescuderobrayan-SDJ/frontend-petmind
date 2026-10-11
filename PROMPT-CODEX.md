# Prompt para Codex · Terminar las visuales de PetMind (secciones 04 a 08)

Eres el agente que continúa un trabajo a medias en este repositorio (React 19 + Vite 8 + react-router-dom 7, JavaScript, sin TypeScript). Otra IA (Claude) construyó la base y las primeras secciones; tú terminas las pantallas que faltan y, al final, Claude va a auditar tu trabajo contra los mockups. Trabaja con cuidado: la auditoría compara pantalla por pantalla.

Antes de escribir código, lee completos estos archivos:

1. `CONTEXTO-Y-DECISIONES.md` (estado, decisiones tomadas y bitácora).
2. `src/styles/global.css` y `src/context/ThemeProvider.css` (variables y clases globales).
3. `src/routes/routes.jsx`, `src/App.jsx` y `src/layouts/DashboardLayout.jsx`.
4. Dos pantallas ya terminadas para copiar su estilo de código: `src/views/adopcion/PerfilDeLaMascota.jsx` (+ su `.module.css`) y `src/views/donaciones/DonarFlujo.jsx`.

---

## 1. Reglas (obligatorias)

1. **No hagas `git commit`, `git push` ni ningún cambio en git** (ni ramas, ni stash, ni reset). Deja todo en el árbol de trabajo. Brayan autoriza cada commit personalmente.
2. **No instales dependencias** ni cambies `package.json` / `package-lock.json`. Nada de librerías de íconos, gráficos, mapas, drag & drop o UI. Todo con React, CSS y SVG propios.
3. **No rehagas lo que ya está terminado** (sección 3). Solo toca esos archivos para corregir un bug real, y anótalo en la bitácora.
4. Textos de la interfaz **en español de Colombia**, iguales a los del mockup. Montos con `formatCOP` (`$52.500`), fechas con `utils/dates.js`.
5. Cada página pone su título de pestaña con `<title>Nombre | PetMind</title>` dentro del componente (React 19 lo sube al `<head>`). Es un requisito de la tarea.
6. Estilos con **CSS Modules** (`Pantalla.module.css` junto a la pantalla) + las clases globales de `global.css`. **Colores siempre con variables** (`var(--color-primary)`, etc.) para que el modo oscuro funcione. Para usar una clase global dentro de un módulo: `.card :global(.btn) { … }`.
7. Un `.jsx` que exporta componentes **no puede exportar también funciones o constantes** (regla `react-refresh/only-export-components`, está como error). Las utilidades van en `src/utils/*.js` o `src/data/*.js`. Cada contexto son dos archivos: `XContext.js` (createContext + hook) y `XProvider.jsx`.
8. Formularios **controlados** (`value`/`checked` + `onChange`), con validación y mensaje de error por campo (`<Field error={…}>`), como en el plan del Momento 2.
9. Antes de terminar, `npm run lint` y `npm run build` deben pasar sin errores (el aviso de tamaño del bundle se puede ignorar).
10. Si el puerto 5173 está ocupado (lo está: es el servidor de Brayan), **no lo cierres**: usa `npx vite --port 5199`.

## 2. Dónde están los mockups

Carpeta hermana del repo: `../02-Visuales PetMind/03 - Mockups de pantallas/`. Cada sección tiene un `00 - Mapa de navegación … .png` y las pantallas numeradas. Si puedes abrir imágenes, míralas; si no, la sección 6 de este documento describe cada pantalla con detalle (textos, orden y componentes).

## 3. Lo que ya está hecho (no rehacer)

- **Base:** variables y clases globales, tema oscuro, íconos (`components/ui/Icon.jsx`), datos de prueba (`src/data/`), 10 contextos, layouts, rutas privadas, scroll al cambiar de página.
- **Pantallas terminadas y revisadas contra los mockups:**
  - Inicio (`views/Inicio.jsx`).
  - 01 · Acceso, 9 pantallas (`views/acceso/`): login, registro (tipo de cuenta, persona, fundación), verificar correo, recuperar contraseña (pedir, enviado, nueva, actualizada).
  - 02 · Adopción, 8 pantallas (`views/adopcion/`): listado con filtros, perfil de la mascota, formulario en 4 pasos (`?paso=`), solicitud enviada y seguimiento con chat (`/cuenta/solicitudes/:id`, va con el layout principal, no con el panel).
  - 03 · Donaciones, 6 pantallas (`views/donaciones/`): campañas, detalle, donar en 3 pasos y comprobante.
  - `views/institucional/Legal.jsx` y `views/NoEncontrada.jsx`.
- **Hecho pero sin revisar en pantalla:** `layouts/DashboardLayout.jsx` (menú lateral + barra superior de los dos paneles) y `components/ui/FoundationMap.jsx` (mapa ilustrado con pines). Revísalos al usarlos y corrige lo que haga falta.
- **Stubs viejos que debes reemplazar:** `views/fundacion/MisMascotas.jsx`, `PublicarMascotas.jsx`, `MisCampanas.jsx` y `CrearCampana.jsx` (solo tienen un título).

## 4. Lo que tienes disponible

### Contextos (léelos con su hook; no pases listas por props desde App)

| Hook | Devuelve |
|---|---|
| `useAuth()` | `user`, `users`, `isAuthenticated`, `isPerson`, `isFoundation`, `login(email, password, remember)` → `{ ok, error, user }`, `logout()`, `register(data)`, `updateUser(changes)`, `changePassword(actual, nueva)` → `{ ok, error }`, `deleteAccount()`, … |
| `usePets()` | `pets`, `getPetById(id)`, `addPet(data)` → mascota (va de primera), `updatePet(id, changes)`, `deletePet(id)` |
| `useCampaigns()` | `campaigns`, `fund`, `getCampaignById(id)` (incluye `'fondo-petmind'`), `addCampaign(data)` (la meta = suma de `expenses`), `updateCampaign(id, changes)`, `deleteCampaign(id)`, `registerDonation(campaignId, monto)` |
| `useDonations()` | `donations`, `getDonationById(id)`, `addDonation(data)`, `updateDonation(id, changes)` |
| `useAdoptions()` | `requests`, `getRequestById(id)`, `moveRequest(id, etapa, { by, ...extra })`, `deleteRequest(id)`, `addMessage(id, { from: 'applicant' \| 'foundation', author, text })`, `addNote(id, { text, author })`, `saveDraft`, `getDraft`, `submitRequest` |
| `useReports()` | `reports`, `getReportById(id)`, `addReport(data)` → reporte con id `RP-xxxxx`, `updateReport(id, changes)` |
| `useFoundations()` | `foundations`, `getFoundationById(id)`, `addFoundation(data)`, `updateFoundation(id, changes)` |
| `useFavorites()` | `favorites` (`{ pets, campaigns, foundations }`), `isFavorite(tipo, id)`, `toggleFavorite(tipo, id)` → `false` si no hay sesión (entonces manda a `/login` con `state: { from, reason: 'favoritos' }`) |
| `useToast()` | `showToast(mensaje, { tone: 'success' \| 'error' \| 'info' })` |
| `useTheme()` | `theme`, `toggleTheme()` |

Todos guardan su estado en `localStorage` con llaves `petmind.v1.*` (`hooks/usePersistentState.js`). **Si cambias la forma de algún dato de `src/data/`, cambia el prefijo a `petmind.v2.`** en ese hook (y en `AuthProvider.jsx`, que usa `petmind.v1.session`), o los navegadores que ya abrieron la demo seguirán con los datos viejos.

### Datos de prueba (`src/data/`)

- `pets.js`: `initialPets` (9 mascotas: Luna, Simón, Rocky, Nala, Canela, Max, Bruno, Milo pausado, Thor adoptado), `species`, `sizes`, `petStatuses`, `adoptableStatuses`, `personalityOptions`, `ageOptions`, `sizeLabel(size, sex)` ("Mediano" → "Mediana" en hembras).
- `campaigns.js`: `initialCampaigns` (7), `campaignCategories` (con `icon` y `tone`), `categoryTone`, `defaultImpacts`, `fondoPetMind`, `campaignGoal(campaña)`.
- `foundations.js`: 6 fundaciones con `stats`, `contact`, `transparency`, `reviewsList`, `gallery`, `quote`, `map: { x, y }`; `foundationAnimals`.
- `stories.js`: `stories` (6, la primera es "Rocky volvió a caminar" con `before`/`after`, `journey`, `quote`, `video`, `donors`, `ctas`), `storyFilters`, `getStoryById`.
- `adoptions.js`: `initialRequests` (11 solicitudes de Huellitas de Amor en distintas etapas, con `compatibility`, `interview`, `visit`, `delivery`, `history`, `messages`, `notes`), `boardStages` (las 5 columnas del tablero), `stageLabels`, `stageStep`, `finishedStages`.
- `donations.js`: `initialDonations` (las de Brayan + recientes), `monthlyDonationsByFoundation` y `monthlyDonationCounts` (12 meses, el último es el mes actual), `documentTypes`, `paymentMethods`, `banks`.
- `reports.js`: `initialReports`, `reportTypes`, `urgencyLevels`, `emergencyLines`, `reportStatusLabels`.
- `institutional.js`: `impactStats`, `values`, `howItWorks`, `team` (el equipo real: Brayan Ciro, Santiago Varela, Emanuel Gómez + Laura Restrepo), `contactTopics`, `contactChannels`, `faqs`, `userNotifications`, `foundationAttention`.
- `users.js`: cuentas de prueba (contraseña `petmind123`): `brayan.ciro@correo.com` (persona) y `huellitas@correo.com` (fundación Huellitas de Amor); `interestOptions`, `housingOptions`, `fullName(user)`.
- `cities.js`: `cities`, `cityNames`, `departments`, `departmentOf(ciudad)`.

Las fechas de prueba son **relativas a hoy** (`daysAgo`, `daysFromNow`, `nextWeekday` de `utils/dates.js`). Mantén ese criterio en lo que agregues.

### Utilidades

- `utils/format.js`: `formatCOP`, `formatCOPShort` (`$6,8M`), `formatNumber`, `plural(n, 'donante')`, `percent`, `initials`, `maskEmail`, `maskDocument`, `formatPhone`, `isValidEmail`, `onlyDigits`, `slugify`, `downloadTextFile(nombre, contenido, tipo)`, `copyToClipboard`.
- `utils/dates.js`: `formatDate(v, { year })` ("24 sep 2026"), `formatLongDate`, `formatTime` ("4:12 p. m."), `formatDateTime`, `formatWeekdayDate`, `formatWeekdayLong` ("Lunes 28 de septiembre"), `weekdayShort`, `monthShort`, `monthName`, `dayOfMonth`, `timeAgo` ("hace 2 horas", "ayer"), `daysUntil`, `isFuture`, `greeting()` ("Buenas tardes"), `toDateInput`/`fromDateInput`, `formatAge(meses)`, `addMonths`.
- `utils/files.js`: `readFile(file)` (reduce las imágenes a 900 px y devuelve `{ name, size, type, url }`), `formatFileSize`.
- `utils/adoption.js`, `utils/payment.js`, `utils/password.js`.

### Componentes

- `ui/Icon` (`<Icon name="heart" />`; la lista está en el archivo, agrega trazados ahí si te falta uno), `ui/Logo` (+ `Isotipo`), `ui/Avatar` (`initials`, `color`: primary · accent · info · purple · warning · green, `size` xs…xxl, `shape` circle · rounded, `src`).
- `ui/Badges`: `VerifiedBadge`, `SexBadge`, `StatusPill` (`tone`: warning · success · info · neutral · danger · primary · purple).
- `ui/ProgressBar`: `ProgressBar` (`value`, `extra`, `size`), `SegmentedProgress` (`total`, `done`, `highlight`).
- `ui/Controls`: `SegmentedControl` (`variant` track · buttons, opciones con `dot`/`icon`), `Toggle`, `ChipSelect`, `NumberStepper`, `RangeSlider`, `DualRange`.
- `ui/Navigation`: `Breadcrumbs`, `Tabs` (`variant` underline · pills, con `count`), `AccordionItem`, `Pagination`, `Dropdown` + `DropdownItem`.
- `ui/Decor`: `Confetti`, `EmptyState`, `PetScene`, `IconBadge`. `ui/BeforeAfter` (`interactive` para el deslizador). `ui/FoundationMap` (`foundations`, `large`, `activeId`, `onSelect`).
- `forms/Field` (`Field`, `IconInput`, `SelectInput`), `forms/PasswordInput` (+ `PasswordStrength`), `forms/OtpInput`, `forms/FileDropzone` (+ `FileChip`), `forms/Steppers` (`Stepper`, `FormSteps`), `forms/OptionCard` (`layout` row · plain · center, `tone` primary · accent).
- `cards/PetCard` (`pet`, `variant` default · home · list, `preview` para la vista previa sin enlaces), `cards/CampaignCard` (`campaign`, `preview`), `cards/FoundationCard`, `cards/StoryCard`, `cards/StatTile` (`icon`, `tone`, `value`, `label`, `delta`).

### Clases globales más usadas

`container`, `container-narrow`, `page`, `page-tint-mint | peach | blue`, `section-heading`, `section-link`, `page-title`, `eyebrow`, `script` (letra manuscrita Caveat Brush), `grid-2/3/4`, `card-grid`, `panel` (+ `panel-sm`), `btn` + `btn-primary | btn-accent | btn-accent-soft | btn-outline | btn-secondary | btn-soft | btn-ghost | btn-danger | btn-white | btn-glass` + `btn-sm | btn-lg | btn-block`, `icon-btn`, `link`, `link-button`, `icon-tile` (+ `-accent | -info | -warning | -purple | -neutral | -solid | -solid-accent`), `form`, `form-row`, `form-row-3`, `field`, `input`, `select`, `textarea`, `input-group`, `checkbox`, `form-actions`, `chip`, `chip-option` (+ `active`, `chip-dark`), `badge` (+ `-accent | -dark | -primary | -soft-accent | -soft-info | -soft-warning | -soft-purple | -soft-primary`), `count-badge` (+ `-accent`), `alert` (+ `-error | -success | -warning | -info | -neutral`), `empty-state`, `sr-only`.

## 5. Rutas que debes agregar en `src/routes/routes.jsx`

Respeta las secciones con comentarios que ya tiene el archivo. Muchas pantallas terminadas **ya enlazan a estas rutas**, así que todas deben existir:

- Con `MainLayout` (menú y pie): `/fundaciones`, `/fundaciones/:id` (acepta `?tab=campanas`), `/historias` (acepta `?filtro=video`), `/historias/:id`, `/nosotros`, `/contacto` (acepta `?tema=…&asunto=…` y el ancla `#preguntas`), `/reportar`, `/reportar/enviado/:id`.
- Panel del usuario: `<Route element={<RequireAuth role="persona" />}>` → `<Route element={<DashboardLayout variant="persona" />}>` con `/cuenta`, `/cuenta/solicitudes`, `/cuenta/favoritos`, `/cuenta/donaciones`, `/cuenta/perfil` (con anclas `#notificaciones` y `#seguridad`), `/cuenta/reportes`, `/cuenta/mensajes`. **Ojo:** `/cuenta/solicitudes/:id` y `/cuenta/solicitudes/:id/enviada` ya existen con `MainLayout`; déjalas así.
- Panel de la fundación: `RequireAuth role="fundacion"` + `DashboardLayout variant="fundacion"` con `/fundacion`, `/fundacion/mascotas` (acepta `?q=`), `/fundacion/mascotas/nueva`, `/fundacion/mascotas/:id/editar`, `/fundacion/solicitudes`, `/fundacion/solicitudes/:id`, `/fundacion/campanas`, `/fundacion/campanas/nueva`, `/fundacion/campanas/:id/editar`, `/fundacion/donaciones`, `/fundacion/reportes`, `/fundacion/mensajes`, `/fundacion/equipo`, `/fundacion/documentos`.

Organiza las vistas en `src/views/fundaciones/`, `src/views/historias/`, `src/views/institucional/`, `src/views/cuenta/` y `src/views/fundacion/`.

## 6. Especificación de cada pantalla pendiente

Para todas: misma estructura visual que las pantallas ya hechas (migas de pan, título grande con una parte en color, tarjetas blancas con borde suave y radio grande). Revisa también el celular (390 px) y el modo oscuro.

### 04 · Fundaciones

**01 · Directorio `/fundaciones`** (`page-tint-blue`)
- Migas "Inicio > Fundaciones". Título "Fundaciones que **hacen la diferencia**" (la parte en negrita con `--color-info`). Texto: "Conoce a las organizaciones verificadas que rescatan, cuidan y buscan hogar para miles de animales en Colombia."
- Barra de búsqueda (una fila, tarjeta blanca): input con lupa "Buscar fundación por nombre", select con pin "Todos los departamentos" (usa `departments`), select con huella "Todos los animales", botón primario "Buscar".
- Chips de ciudad (`chip-option chip-dark`): Todas, Medellín, Envigado, Bello, Rionegro, Bogotá, Cali.
- Fila de resultados: "**N** fundaciones verificadas" (N real filtrado) + selector "Lista | Mapa" (íconos `grid` y `map-pin`).
- Vista Lista: grilla de 3 `FoundationCard` + columna derecha con `FoundationMap` (pines de las fundaciones filtradas; al pasar el mouse muestra el nombre) y debajo una tarjeta azul (degradado `--gradient-blue`): manuscrita "¿Tienes una fundación?", título "Únete a PetMind y llega a más familias", texto "Publica mascotas, crea campañas y recibe donaciones con total transparencia.", botón blanco "Registrar mi fundación →" a `/registro/fundacion`. Paginación debajo (se oculta si hay una sola página).
- Vista Mapa: `FoundationMap large` a todo el ancho con la ventanita "Ver perfil".
- Solo salen las fundaciones `verified`. Mascotas y campañas de cada tarjeta: **conteo en vivo** (mascotas con estado en `adoptableStatuses` y campañas `Activa`), adopciones de `stats` (decisión 13 del contexto). Pásalos con la prop `stats` de `FoundationCard`.

**02 · Perfil `/fundaciones/:id`**
- Portada a todo el ancho (foto `cover`, ~22rem de alto) con migas blancas "Fundaciones > {nombre}" encima.
- Avatar grande cuadrado redondeado (`size="xxl" shape="rounded"`, borde blanco) que se monta sobre el borde inferior de la portada. Al lado: nombre (h1) + pastilla azul "Verificada" (escudo); fila de datos: pin "Medellín, Antioquia", calendario "Desde 2015", huella "Perros y gatos".
- Botones a la derecha: "Seguir" (corazón; `toggleFavorite('foundations', id)`), "Contactar" (mensaje; baja a la tarjeta de contacto), "Donar a la fundación" (coral; al flujo de donar de su campaña activa más urgente, o al Fondo PetMind si no tiene).
- Franja de 5 cifras en una tarjeta con divisiones: mascotas en adopción (en vivo) · adopciones en {año} · `$41M` recibidos en donaciones (`formatCOPShort`) · campañas activas (en vivo) · `4.9 ★` de 126 adoptantes.
- Pestañas (subrayado, con contador): Mascotas · Campañas · Historias · Sobre nosotros · Reseñas. Lee y escribe la pestaña en `?tab=`.
  - Mascotas: grilla de 3 `PetCard`; debajo "Campañas activas" + "Ver las N →" y 2 `CampaignCard`.
  - Campañas: todas sus campañas activas. Historias: `StoryCard` de esa fundación (o un estado vacío). Sobre nosotros: texto largo + galería. Reseñas: `reviewsList` con estrellas y "Mostrando 3 de 126 reseñas".
- Columna derecha: "Sobre la fundación" (texto `about`, cita `quote` en manuscrita verde, 3 fotos `gallery`); "Contacto" (`id="contacto"`; 3 filas con `icon-tile` neutro: dirección + nota, teléfono + horario, correo + tiempo de respuesta); "Transparencia" (3 filas: check verde en círculo + texto + valor a la derecha en verde: "Verificado", "Ver PDF" (descarga con `downloadTextFile`), "34").
- Id que no existe → `NoEncontrada`.

### 05 · Historias

**01 · Historias y videos `/historias`**
- Migas. Título "Historias que **inspiran**" (coral). Texto "Rescates, adopciones y tratamientos reales que fueron posibles gracias a ti."
- Tarjeta destacada grande (la historia "Rocky volvió a caminar"): izquierda `BeforeAfter` partido con etiquetas "Antes · marzo" / "Después · agosto"; derecha manuscrita coral "Historia destacada", título, `featuredText`, 3 cifras (`stats`: 43 donantes · $3,2M recaudados · 5 meses de recuperación) y botón primario "Leer historia completa →".
- Chips de filtro (`storyFilters`; "Videos" con ícono de cámara) + select "Más recientes / Más queridas". Lee `?filtro=` (el inicio enlaza con `?filtro=video`).
- Grilla de 3 `StoryCard`.
- Franja final durazno (`--color-accent-softer`, borde coral suave): 3 fotos redondas de mascotas superpuestas, manuscrita coral "¿Adoptaste con PetMind?", título "Cuéntanos cómo va su nueva vida", texto "Comparte fotos o un video de tu mascota. Tu historia puede animar a otra familia a adoptar.", botón coral "Compartir mi historia" (ícono subir) → `/contacto?tema=Otro&asunto=Quiero compartir mi historia`.

**02 · Detalle `/historias/:id`** (columna angosta ~48rem centrada)
- Migas "Historias > {etiqueta} > {título}", pastilla con la etiqueta, h1, `lead`, fila de autor (avatar de la fundación, "Fundación Patitas Valle ✓", "Publicado el 18 ago 2026 · 4 min de lectura") y a la derecha botones cuadrados de "Me gusta" (corazón; suma 1 a los likes mostrados) y compartir (copia el enlace).
- Si tiene `before`/`after`: `BeforeAfter interactive` más ancho que la columna (~62rem) con las etiquetas largas, y debajo "Desliza para comparar el antes y el después". Si no, la foto.
- Cuerpo (`body`), "El camino de Rocky" (`journey`: 4 pasos en fila con círculos de color e ícono, unidos por una línea en degradado coral → ámbar → azul → verde; cada uno con título y 2 líneas), cita en caja menta con letra manuscrita verde y autor, párrafo final (`closing`), tarjeta de video (miniatura con botón de play al centro y texto abajo "Mira a Rocky en su nuevo hogar · 1:12"; al hacer clic, un aviso de que el video llega con el backend).
- "Gracias a las 43 personas que lo hicieron posible ♡": chips con avatar de iniciales y nombre (`donors`) + chip "+31 más".
- Dos tarjetas lado a lado (`ctas`): verde azulado "Hay más como Rocky esperando" + botón blanco pequeño "Ver mascotas →" (a `/adoptar?fundacion={id}` o al `to` que traiga); coral "Ayuda a escribir la próxima historia" + "Donar a Toby →" (a `/donar/{campaignId}`).
- "Más historias que inspiran" + "Ver todas →" + 3 `StoryCard`. Id inexistente → `NoEncontrada`.

### 06 · Institucional y reportes

**01 · Nosotros `/nosotros`**
- Arriba en dos columnas: manuscrita coral "Nuestra razón de ser", h1 "Conectamos vidas, / **cambiamos historias.**" (segunda línea verde), texto "PetMind nació en Medellín en 2024 con una idea simple: si juntamos en un solo lugar a las personas que quieren ayudar y a las fundaciones que rescatan animales, más peludos pueden tener una segunda oportunidad.", botones "Conocer mascotas →" (primario) y "Registrar una fundación" (secundario). Derecha: collage (foto grande `portada-mujer-abrazando-perro.jpg` recortada vertical, gato arriba a la derecha y perro abajo a la derecha, bordes blancos y sombra) con la tarjetita flotante "1.240 / familias formadas".
- Franja verde oscura en degradado con 4 cifras (`impactStats`).
- Misión (tarjeta menta: manuscrita "Misión", "Que ningún animal se quede sin ayuda", texto) y Visión (tarjeta durazno: "Visión", "La red de bienestar animal más confiable de Latinoamérica", "Para 2030 queremos que cada fundación de la región tenga las herramientas digitales para rescatar, cuidar y encontrar hogar a más animales.").
- Centrado: manuscrita "Lo que nos mueve" + h2 "Nuestros valores" + 4 tarjetas (`values`). Luego "Así funciona" + "¿Cómo ayuda PetMind?" + 3 tarjetas (`howItWorks`) con número grande y tenue al fondo (01, 02, 03) y `icon-tile` sólido. Luego "Las personas detrás" + "Nuestro equipo" + 4 tarjetas (`team`, avatar grande de iniciales con degradado, nombre y rol).
- Franja final durazno: "¿Quieres ser parte?" + "Adopta, dona, sé voluntario u hogar de paso. Hay muchas formas de ayudar." + "Crear mi cuenta" (primario, a `/registro`) + "Contáctanos" (secundario).

**02 · Contacto `/contacto`**
- Migas. "¿En qué te **podemos ayudar**?" (verde). "Escríbenos y te respondemos en menos de 24 horas hábiles."
- Izquierda, tarjeta "Envíanos un mensaje": "¿Sobre qué nos escribes?" con chips de selección única (`contactTopics`), Nombre, Correo (ícono), Asunto, Mensaje, "Adjuntar archivo (opcional)" con `FileDropzone layout="row"` ("Arrastra una imagen o PDF · máximo 5 MB"), botón primario de bloque "Enviar mensaje" (ícono enviar). Prellena tema y asunto desde `?tema=&asunto=` y nombre/correo desde la sesión. Valida y, al enviar, muestra un mensaje de éxito y limpia el formulario.
- Derecha: 4 tarjetas de canal (`contactChannels`: `icon-tile`, título, texto, acción en verde a la derecha con su `href`) y una tarjeta coral en degradado "¿Viste un animal en peligro?" + "No uses este formulario. Repórtalo y avisaremos a las fundaciones cercanas." + botón blanco "⚡ Reportar un caso" a `/reportar`.
- "Preguntas frecuentes" (`id="preguntas"`, el pie de página enlaza ahí): grilla de 2 columnas de `AccordionItem` (`faqs`), la primera abierta.

**03 · Reportar `/reportar`** (`page-tint-peach`)
- Aviso de emergencia (tarjeta blanca con borde coral suave): `icon-tile` coral sólido con rayo, "¿Es una emergencia con riesgo para la vida del animal o de personas?", "Llama primero a las autoridades o a la línea de protección animal de tu ciudad.", botones suaves coral "Línea 123" (`tel:123`) y "Líneas por ciudad" (despliega `emergencyLines`).
- "Reporta un animal **que necesita ayuda**" (coral). "Avisaremos a las fundaciones verificadas más cercanas. Puedes hacerlo de forma anónima."
- Tarjeta con secciones numeradas (cuadrito negro con el número):
  1. ¿Qué está pasando? — 4 `OptionCard layout="center" tone="accent"` (`reportTypes`).
  2. Especie — `SegmentedControl` Perro / Gato / Otro. 3. Nivel de urgencia — `SegmentedControl variant="buttons"` con punto de color (Baja verde, Media ámbar, Alta rojo).
  4. ¿Dónde está? — input con pin + mapa ilustrado (puedes reutilizar el estilo de `FoundationMap`) con un pin coral y un círculo punteado de radio; botón blanco "Usar mi ubicación" (`navigator.geolocation`; si falla, un aviso).
  5. Fotos o video — miniaturas de lo subido + `FileDropzone tone="accent"` "Agregar más fotos · Ayudan a evaluar la gravedad".
  6. Describe la situación — textarea. 7. Tus datos de contacto — nombre + celular (ícono) + casilla "Enviar el reporte de forma anónima" (si se marca, deshabilita y vacía nombre y celular).
  - Botón coral de bloque "Enviar reporte". Valida (tipo, ubicación, descripción de 20+ caracteres y contacto si no es anónimo).
- Columna derecha: "¿Qué pasa después?" con 3 pasos (número en recuadro coral, ámbar y verde): "Recibimos tu reporte · Te damos un código para seguirlo.", "Avisamos a fundaciones cercanas · Las que estén a menos de 10 km.", "Una fundación toma el caso · Te avisamos cuando esté en camino."; tarjeta ámbar "Mientras llega la ayuda · Si es seguro, ofrécele agua y sombra. No lo fuerces a moverse si está herido y mantén una distancia prudente."
- Al enviar: `addReport({ …, userId, notified: [3 fundaciones con distancia y status 'notificada'] })` → `navigate('/reportar/enviado/' + id)`.

**04 · Reporte enviado `/reportar/enviado/:id`** (fondo durazno en degradado)
- Izquierda: ícono enviar en recuadro coral grande con halo, manuscrita "Gracias por no mirar a otro lado", h1 "Tu reporte fue enviado", "Ya avisamos a 3 fundaciones cerca de la ubicación. Te notificaremos cuando una de ellas tome el caso.", caja punteada coral "Código de seguimiento **RP-40517**" + botón "Copiar", botones "Ver estado del reporte →" (primario; a `/cuenta/reportes` si hay sesión de persona, si no a `/login`) y "Volver al inicio".
- Derecha: tarjeta "Fundaciones notificadas" + pastilla verde "● En vivo"; 3 filas (avatar de iniciales, nombre + verificada, "a 2,4 km · El Poblado", pastilla "Vio el caso" verde o "Notificada" gris). A los ~4 segundos la primera pasa a "Vio el caso" (`updateReport`). Nota ámbar: "Si puedes, quédate cerca y atento a tu celular: la fundación podría llamarte para ubicar al animal."

### 07 · Panel del usuario (todo dentro de `DashboardLayout variant="persona"`)

Calcula todo con los datos del usuario en sesión (`user.id`). Un usuario nuevo no tiene nada: muestra estados vacíos amables, no los datos de Brayan.

**01 · Resumen `/cuenta`**
- Manuscrita coral "¡Hola de nuevo!", h1 "{greeting()}, {nombre}", "Esto es lo que está pasando con tus adopciones y donaciones."; botones "⚡ Reportar un caso" (secundario) y "🔍 Buscar mascotas" (primario).
- Fila: tarjeta de la solicitud activa más reciente (foto, "Adopción de Luna" + pastilla ámbar "En proceso", "Solicitud #PM-2481 · Huellitas de Amor", `SegmentedProgress` de 5, caja "Próximo paso: **Entrevista virtual · lunes 28 sep, 10:00 a. m.**" con ícono de video y enlace "Ver") + tarjeta coral en degradado "Donación mensual activa", "$52.500 / mes", "Apoyas la cirugía de Toby. Su campaña ya va en 76%." y botón blanco "Ver impacto".
- 4 `StatTile`: solicitudes activas (file), mascotas favoritas (heart, accent), "$152.500 donados en {año}" (star, info; suma de aprobadas del año), reportes en seguimiento (zap, warning).
- "Tus favoritos" ("Ver los N →"): 4 fotos con corazón y nombre encima. "Notificaciones" ("Ver todas"): `userNotifications` con `icon-tile`, título, `timeAgo` y punto coral si no se ha leído (`id="notificaciones"`).

**02 · Mis solicitudes `/cuenta/solicitudes`**
- h1 "Mis solicitudes de adopción", "Sigue el estado de cada solicitud y conversa con la fundación."
- `Tabs variant="pills"` con contador: Todas · En proceso · Borradores · Finalizadas; select "Más recientes".
- Filas (tarjeta grande por solicitud): foto redondeada; nombre + `SexBadge`, "2 años · Mediana · Medellín", fundación; al centro `StatusPill` (En proceso ámbar / Borrador gris / No seleccionada rojo / Aprobada verde), "Paso 3 de 5 · Entrevista virtual", fecha en negrita y `SegmentedProgress`; a la derecha, según el estado: "Mensajes" + "Ver detalle →" (`/cuenta/solicitudes/:id`) · "Eliminar" (rojo, con `window.confirm` → `deleteRequest`) + "Continuar solicitud →" (`/adoptar/{petId}/solicitud?paso={draftStep}`) · "Ver gatos similares" + caja rosada con el mensaje de la fundación (`result.message`).

**03 · Favoritos `/cuenta/favoritos`**
- h1 "Mis favoritos", "Las mascotas y campañas que guardaste." `Tabs variant="pills"`: Mascotas · Campañas · Fundaciones (con contador).
- Si `user.alert` existe: tarjeta menta con campana "Alerta activa: perros medianos en Medellín", "Te avisamos por correo cuando llegue una mascota así. Última coincidencia: ayer." y botón "Editar alerta" (a `/adoptar` con esos filtros o edición en línea).
- Grilla de 3 `PetCard` (la adoptada ya sale con "¡Ya fue adoptado!") + tarjeta punteada "Descubre más mascotas · Toca el corazón para guardarlas aquí." con botón "+" a `/adoptar`. Campañas → `CampaignCard`; Fundaciones → `FoundationCard`.

**04 · Mis donaciones `/cuenta/donaciones`**
- h1 "Mis donaciones", "Tu historial, tus donaciones mensuales y tus certificados."; botones "Exportar" (descarga CSV con `downloadTextFile`) y "♡ Nueva donación" (coral, a `/donar`).
- Fila: "Total donado en {año}" ($152.500, "4 donaciones · 4 campañas apoyadas", chips de categorías); tarjeta durazno de la suscripción mensual activa (foto, "Donación mensual a Toby" + "● Activa", "Patitas Valle · desde 26 sep 2026", Monto "$52.500 / mes", Próximo cobro, botones "Cambiar monto" (edición en línea), "Pausar"/"Reanudar" y "Cancelar" (rojo, con confirmación) → `updateDonation(id, { subscription: 'activa' | 'pausada' | 'cancelada', … })`); tarjeta verde oscura "Para tu declaración" / "Certificado anual {año}" / "Un solo documento con todas tus donaciones del año." / "Descargar PDF".
- "Historial de donaciones" con selector de año (los años que existan): tabla Fecha · Campaña (miniatura, título, fundación) · Método · Monto · Estado (`StatusPill` "Aprobada" verde / "Rechazada" rojo) · acción "Certificado" (descarga) o "Reintentar" (a `/donar/{campaignId}/aportar`). En celular la tabla pasa a tarjetas.

**05 · Mi perfil `/cuenta/perfil`**
- h1 "Mi perfil", "Tus datos se usan para agilizar tus solicitudes y donaciones."; botón primario "✓ Guardar cambios" arriba a la derecha (y deshabilitado si no hay cambios).
- "Datos personales": avatar `xl` con iniciales o foto + "Cambiar foto" (input de archivo → `readFile` → `avatar`) + "JPG o PNG · máx. 2 MB"; Nombre, Apellidos, Correo (solo lectura, con pastilla "● Verificado" dentro), Celular, Ciudad (select con pin), Tipo de vivienda (select con casa).
- "Notificaciones" (`id="notificaciones"`): 4 `Toggle` sobre `user.notifications` (requests, campaigns, alerts, newsletter) con los textos del mockup.
- Derecha: "Perfil completo al N%" (barra + lista: Datos personales, Correo verificado, Información del hogar, Documento de identidad; calculado), "Seguridad" (`id="seguridad"`: Contraseña "Actualizada hace 3 meses" + "Cambiar" que despliega el formulario actual/nueva/confirmar con `changePassword`; "Verificación en dos pasos · Código por SMS" con `Toggle`), "Zona de cuidado" (borde rojo, texto y "Eliminar mi cuenta" con confirmación → `deleteAccount()` → `/`).

**Sin mockup** (sencillas, con el mismo estilo): `/cuenta/reportes` (lista de reportes del usuario con código, tipo, fecha y estado `reportStatusLabels`) y `/cuenta/mensajes` (conversaciones de sus solicitudes con el último mensaje y enlace al seguimiento).

### 08 · Panel de la fundación (dentro de `DashboardLayout variant="fundacion"`)

Filtra siempre por `user.foundationId` (`huellitas-de-amor` en la cuenta de prueba).

**01 · Resumen `/fundacion`**
- Manuscrita "Buen trabajo este mes", h1 "Hola, equipo de {fundación}", "Tienes N solicitudes nuevas y M entrevistas esta semana." (calculado); botones "♡ Crear campaña" (secundario) y "+ Publicar mascota" (primario).
- 4 `StatTile` con `delta`: solicitudes nuevas (+3 hoy), mascotas publicadas (+2 sem.), "$6,8M" donaciones en {mes actual} (+11%), adopciones en {año} (+4).
- "Donaciones recibidas por mes" (gráfica de barras en HTML/CSS, sin librería): subtítulo "Millones de pesos · abril a septiembre de 2026" (calculado según el rango), selector 3 meses / 6 meses / Año; eje con $0M–$8M y líneas guía; barras verde claro y la del mes actual verde oscuro con el valor encima; al pasar el mouse (y con foco de teclado) una burbuja oscura "$5.600.000 · Julio · 142 donaciones". Datos: `monthlyDonationsByFoundation` y `monthlyDonationCounts`.
- "Solicitudes recientes" ("Ver todas →"): 4 filas con avatar, "Brayan Ciro → Luna", subtítulo y pastilla (Entrevista ámbar, Nueva azul, En revisión gris).
- Tres tarjetas: "Campañas activas" ("Gestionar"; 3 barras con %), "Agenda de la semana" ("Calendario"; entrevistas, visitas y entregas de `requests` con recuadro de fecha LUN 28 en coral), "Necesitan atención" (`foundationAttention`).

**02 · Mis mascotas `/fundacion/mascotas`**
- h1 "Mis mascotas", "Administra las mascotas publicadas por la fundación." + "+ Publicar mascota".
- `Tabs variant="pills"` con contador en vivo: Todas · Disponibles · En proceso · Adoptadas · Pausadas; buscador "Buscar por nombre" (lee `?q=` del buscador del panel) y botón "Especie" (menú con Perro / Gato / Otro).
- Tabla: casilla (y "seleccionar todas"), Mascota (miniatura, nombre + `SexBadge`, "Perro · 2 años · Mediana"), Estado (`StatusPill`: En proceso ámbar, Disponible verde, Visita agendada azul, Adoptado gris, "Pausado · en tratamiento" rojo), Solicitudes (conteo real de `requests`), Visitas, Publicada (`formatDate`), acciones: editar (lápiz → `/fundacion/mascotas/:id/editar`), compartir (copia el enlace del perfil), "⋯" (`Dropdown`: Ver perfil público, Cambiar estado, Eliminar con confirmación → `deletePet`). Acciones en lote cuando hay casillas marcadas. Pie: "Mostrando 1–6 de N" + `Pagination`.

**03 · Publicar mascota `/fundacion/mascotas/nueva` y `/fundacion/mascotas/:id/editar`**
- Migas "Mis mascotas > Publicar mascota", h1 "Publicar una mascota" (o "Editar a {nombre}"), botones "Guardar borrador" y "✈ Publicar".
- Tarjetas con número verde: **1 Fotos y video** ("Sube mínimo 3 fotos con buena luz. La primera será la portada."): portada grande con etiqueta "Portada", miniaturas, recuadro punteado "Agregar foto" (subir con `readFile`, y también poder elegir de las fotos de `/img/fotos/`), recuadro "Video opcional", botón para quitar y para volver portada. **2 Datos básicos**: Nombre, Especie y Sexo (`SegmentedControl`), Edad aproximada (select con `ageOptions`), Tamaño (Peq. / Mediano / Grande), Ubicación (ciudad). **3 Salud**: casillas Vacunas al día, Desparasitada, Esterilizada, Microchip + "Condiciones o cuidados especiales". **4 Personalidad e historia**: botón morado "✦ Sugerir texto" (arma un texto de ejemplo con los datos), "¿Cómo es su carácter?" (`ChipSelect` con `personalityOptions` + "+ Otra" para agregar), "¿Convive con perros?" y "¿Convive con niños?" (Sí / No / No sé), "Su historia" (textarea).
- Derecha fija: "VISTA PREVIA" con `<PetCard pet={…} preview />` que cambia en vivo; "Antes de publicar": Al menos 3 fotos, Datos básicos completos, Información de salud, Historia de 100+ caracteres (se marcan en verde al cumplirse).
- Publicar exige la lista completa (muestra los errores). `addPet({ …, foundationId, status: 'Disponible', urgent: false, gallery, photo: portada, traits, health, goodWithKids, goodWithDogs, story: [párrafos], createdAt })` → `navigate('/fundacion/mascotas')` + aviso. **La mascota debe salir de primera en Mis mascotas y en `/adoptar` al instante** (requisito "nivel 3" del Momento 2). "Guardar borrador" guarda con `status: 'Borrador'` (agrégalo a `petStatuses`; no sale en Adoptar). En editar, el mismo formulario lleno → `updatePet`, con `key={id ?? 'nueva'}` en el formulario.

**04 · Solicitudes (tablero) `/fundacion/solicitudes`**
- h1 "Solicitudes de adopción", "Arrastra cada solicitud a la etapa correspondiente."; botón "☰ Vista de tabla" (alterna con una tabla simple).
- Filtro por mascota (`Tabs variant="pills"`: Todas las mascotas, Luna 4, Nala 2, Canela 2, Max 1, en vivo) y botón "Compatibilidad" (ordena por puntaje).
- 5 columnas (`boardStages`, con punto de color, título y contador) sobre fondo gris claro; tarjetas blancas: avatar de iniciales, nombre, tiempo ("hace 2 horas") o cita ("Lun 28 · 10:00"), chip gris con miniatura y nombre de la mascota, abajo "📅 Agendada" o el barrio y la pastilla "92% afín" (verde ≥ 80, ámbar 60–79, rojo < 60).
- Arrastrar y soltar con la API nativa de HTML5 (`draggable`, `onDragStart`, `onDragOver`, `onDrop` → `moveRequest(id, etapa, { by: 'Laura R.' })`) y una alternativa con teclado (menú "Mover a…" en cada tarjeta). Clic en la tarjeta → detalle. Las solicitudes en `borrador`, `no-seleccionada` y `cancelada` no salen en el tablero.

**05 · Detalle `/fundacion/solicitudes/:id`**
- Migas "Solicitudes > Luna > #PM-2481", h1 "Solicitud de Brayan Ciro", botones "Enviar mensaje" (abre un chat igual al de `views/adopcion/SeguimientoSolicitud.jsx`; si lo reutilizas, sácalo a un componente) y "Descargar PDF" (texto con `downloadTextFile`).
- Tarjeta del solicitante: avatar xl, nombre, pin "Medellín · Laureles", teléfono, calendario "Enviada 24 sep", pastillas ("✓ Correo verificado", "✓ Ha tenido mascotas" verdes, "Vivienda arrendada" ámbar, según `applicant.badges`) y anillo de compatibilidad "92% compatible" (SVG con `stroke-dasharray` o `conic-gradient`).
- "Motivación" (cita en caja gris), "Hogar" (grilla: Vivienda, Arrendador permite mascotas, Personas en casa, Niños, Otras mascotas, Espacio + recuadro de foto "balcon.jpg"), "Experiencia y compromiso" (Experiencia previa, Horas sola al día, Presupuesto mensual, En viajes la cuida, Compromisos aceptados "3 de 4", Seguimiento 6 meses "Aceptado").
- Derecha: mascota (foto, "Luna", "2 años · Mediana · 4 solicitudes"); "Etapa actual" con pastilla "Entrevista · lunes 28, 10:00", botón primario "✓ Pasar a {siguiente etapa}" (`moveRequest`), "📅 Reprogramar entrevista" (fecha y hora en línea → actualiza `interview`) y "✕ No continuar" (rojo; pide un mensaje para la persona → `moveRequest(id, 'no-seleccionada', { result: { message, author } })`); "Notas internas" (notas en caja ámbar con autor y fecha + input "Agregar una nota..." → `addNote`); "Historial" (puntos con texto, fecha y quién).
- Lo que haga la fundación aquí debe verse del lado de la persona en `/cuenta/solicitudes/:id` (mismo contexto).

**06 · Crear campaña `/fundacion/campanas/nueva` y `/fundacion/campanas/:id/editar`**
- Migas "Campañas > Nueva campaña", h1 "Crear una campaña", botones "Guardar borrador" y "✈ Enviar a revisión" (coral).
- **1 ¿Para qué es la campaña?** (número en coral): 5 `OptionCard layout="center" tone="accent"` con `campaignCategories`; Título; "Mascota relacionada (opcional)" (select con las mascotas de la fundación + "Varias mascotas"); "Cuenta la historia".
- **2 Meta y uso del dinero**: "Fecha de cierre" (input de fecha con "· N días" calculado), "Meta total" (solo lectura, "se calcula abajo"); filas de gastos (concepto + monto con formato + botón ✕), "+ Agregar gasto", fila "Total"; "Cotización o soporte" (`FileChip` + `FileDropzone` "Agregar otro").
- Derecha fija: "VISTA PREVIA" `<CampaignCard campaign={…} preview />` en vivo (foto de la mascota relacionada o una elegida); tarjeta ámbar "Revisión de PetMind · Verificamos cada campaña en menos de 24 horas. El dinero se entrega contra factura del proveedor."
- Validación (plan, sección 8): obligatorios, al menos un gasto mayor a 0 y fecha futura. **La meta es la suma de los gastos y se calcula al renderizar** (no va en otro `useState`). "Enviar a revisión" simula la aprobación al instante: `addCampaign({ …, status: 'Activa', raised: 0, donors: 0, foundationId })` → `navigate('/donar')` + aviso "PetMind aprobó tu campaña (simulado)"; debe salir en `/donar` con 0 % (nivel 3). "Guardar borrador" → `status: 'Borrador'` (solo se ve en Mis campañas). En editar → `updateCampaign`, con `key`.

**Sin mockup**, sencillas y con el mismo estilo:
- `/fundacion/campanas` (Mis campañas): tabla como la de Mis mascotas: título, categoría, recaudado / meta con barra, fecha de cierre, estado; acciones Ver, Editar y Eliminar (con confirmación); botón "+ Crear campaña".
- `/fundacion/donaciones`: tabla de las donaciones aprobadas a sus campañas (fecha, campaña, donante o "Anónimo", monto) + total del mes.
- `/fundacion/reportes`: reportes donde aparece en `notified`, con botón "Tomar el caso" (`updateReport` → status `en-camino` y su `notified` en `tomado`).
- `/fundacion/mensajes`: conversaciones de sus solicitudes (último mensaje, enlace al detalle).
- `/fundacion/equipo` y `/fundacion/documentos`: listas simples (representante y voluntarios; RUT, Cámara de comercio e informe con estado "Verificado").

## 7. Pendientes generales

- `index.html`: `lang="es"` y `<title>PetMind</title>` (sigue con los valores de la plantilla de Vite).
- `README.md`: cómo instalar y correr, cuentas de prueba, cómo reiniciar los datos (llaves `petmind.v1.*`) y el equipo (Brayan Ciro, Santiago Varela, Emanuel Gómez). Hoy es el README de la plantilla.
- Revisa que todos los enlaces del sitio lleven a una ruta que existe (Navbar, pie, menú lateral de los paneles, `userNotifications`, `foundationAttention`).

## 8. Cómo verificar antes de entregar

1. `npm run lint` y `npm run build` sin errores.
2. `npx vite --port 5199` y prueba, sin errores en la consola del navegador:
   - Sin sesión, `/cuenta` y `/fundacion` mandan a `/login`; al entrar, vuelve a la página pedida.
   - Con `huellitas@correo.com`: publicar una mascota → sale de primera en Mis mascotas y en `/adoptar`; editarla cambia las dos listas; eliminarla la quita de ambas. Crear una campaña → sale en `/donar` con 0 %; editar y eliminar igual.
   - Mover una solicitud en el tablero y verla cambiar en el seguimiento de `brayan.ciro@correo.com`.
   - Con `brayan.ciro@correo.com`: los paneles muestran sus datos; guardar el perfil actualiza el nombre en la Navbar; pausar la donación mensual cambia su estado.
   - Un usuario recién registrado ve sus paneles vacíos con estados vacíos, sin errores.
   - Reportar un caso → pantalla de enviado con el código nuevo.
3. Revisa cada pantalla a 1440 px y a 390 px, en claro y en oscuro.

## 9. Entregable

- Código en el árbol de trabajo, **sin commits**.
- En `CONTEXTO-Y-DECISIONES.md`: marca cada sección como hecha en la tabla del punto 2, agrega a la bitácora qué hiciste (con hora) y suma las decisiones nuevas al punto 3 (por ejemplo, cualquier cosa del mockup que no se pudo hacer igual y por qué).
- Al terminar, responde con: lista de archivos creados o cambiados, rutas nuevas, qué quedó pendiente o dudoso, y el resultado de `npm run lint` y `npm run build`.
