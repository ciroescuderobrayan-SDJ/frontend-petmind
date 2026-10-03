# PetMind · Plan de trabajo · Momento 2

**Entrega: sábado 10 de octubre de 2026.** Este plan cubre solo lo que pide el documento del Momento 2. Lo demás (la lista de Web 2 y el resto del backlog) queda para el tercer momento (sección 10).

| | |
|---|---|
| **Entrega** | Sábado 10 de octubre. Cada integrante envía el enlace del repositorio en el [formulario de entrega](https://forms.cloud.microsoft/r/ybi2FFJCD8?origin=lprLink). |
| **Repositorio** | https://github.com/ciroescuderobrayan-SDJ/frontend-petmind |
| **Mockups** | Carpeta compartida `02-Visuales PetMind/03 - Mockups de pantallas` |
| **Equipo** | Brayan Ciro · Santiago Varela · Emanuel Gómez |

> **¿Por dónde empiezo?** Lean la sección 2 (qué le toca a cada uno) y la 4 (cómo trabajar desde la casa). Después, cada uno sigue su propia lista: **Brayan, sección 6 · Santiago, sección 7 · Emanuel, sección 8.**

---

## 1. Lo que pide el Momento 2

**Objetivo:** convertir los componentes aislados en una SPA navegable, que capture datos reales del usuario y simule el CRUD completo con un estado global.

| Entregable | Cómo lo cumplimos | Responsable |
|---|---|---|
| **Navegación con React Router DOM**, sin recargar la página | `routes.jsx`, `MainLayout` con la Navbar, y `Link`, `NavLink` y `navigate` en todo el sitio | Brayan (rutas y Navbar), los tres (enlaces) |
| **Formularios controlados** | Login y Registro · Publicar / editar mascota · Crear / editar campaña | Brayan · Santiago · Emanuel |
| **Estado global con Context API** (`createContext` + Provider) | `AuthContext` · `PetsContext` · `CampaignsContext` | Brayan · Santiago · Emanuel |
| **Simulación de nivel 3:** lo que se crea en el formulario aparece al instante en la lista | Mascota nueva → Adoptar y Mis mascotas · Campaña nueva → Donar y Mis campañas · Usuario nuevo → la Navbar lo saluda y ya puede iniciar sesión | Santiago · Emanuel · Brayan |
| **Mínimo un componente por persona** | `Navbar` · `PetCard` · `CampaignCard`, cada uno con su CSS Module y en `main` desde el domingo 4 | Brayan · Santiago · Emanuel |
| **Condición:** proyecto versionado | Ramas, pull requests y commits de los tres (sección 4) | Los tres |
| **Condición:** arquitectura corregida si hubo observaciones en la semana 6 | _Si las hubo, anótenlas aquí; cada dueño corrige lo suyo._ | Dueño del componente |

## 2. Quién hace qué

Cada uno tiene su parte completa de principio a fin: contexto, formulario y lista. Mascotas y campañas son dos CRUD independientes, así que Santiago y Emanuel no se cruzan.

| | Brayan | Santiago | Emanuel |
|---|---|---|---|
| **Área** | Base, navegación y sesión | Mascotas | Campañas de donación |
| **Su componente (mínimo uno)** | `Navbar` (además `MainLayout` y `PasswordInput`) | `PetCard` | `CampaignCard` |
| **Contexto** | `AuthContext` | `PetsContext` | `CampaignsContext` |
| **Formularios controlados** | Iniciar sesión y Registro | Publicar / editar mascota | Crear / editar campaña |
| **Pantallas** | Inicio, Login, Registro | Adoptar, Perfil de la mascota, Mis mascotas, Publicar mascota | Donar, Detalle de campaña, Mis campañas, Crear campaña |
| **Su lista de tareas** | Sección 6 | Sección 7 | Sección 8 |

## 3. Cronograma

| Día | Brayan | Santiago | Emanuel |
|---|---|---|---|
| **Sáb 3** | Invitar a los dos al repo · Día 0 (esqueleto) → `main` en la noche | Clonar e instalar · `data/pets.js` · maqueta de `PetCard` | Clonar e instalar · `data/campaigns.js` · `formatCOP` · maqueta de `CampaignCard` |
| **Dom 4** | `global.css` · `MainLayout` y `Navbar` → PR | `PetsProvider` · `PetCard` → PR | `CampaignsProvider` · `CampaignCard` → PR |
| **Lun 5** | `AuthProvider` · `PasswordInput` · Login → PR | Adoptar y Perfil de la mascota → PR | Donar y Detalle de campaña → PR |
| **Mar 6** | Registro → PR | Publicar mascota → PR | Crear campaña → PR |
| **Mié 7** | Navbar con sesión · Inicio · README → PR | Mis mascotas · editar y eliminar → PR | Mis campañas · editar y eliminar → PR |

- **Jueves 8:** todo en `main` antes de las 6 p. m. y prueba final juntos (sección 9).
- **Viernes 9:** colchón para arreglar lo que salga en la prueba. A las 9 p. m. se congela `main`.
- **Sábado 10:** Brayan crea la etiqueta `momento-2` y los tres envían el formulario.

## 4. Cómo trabajar desde la casa

### La primera vez

1. Aceptar la invitación al repositorio que llega al correo de su cuenta de GitHub. Sin eso pueden clonar, pero no subir cambios.
2. Clonar, instalar y correr:

```bash
git clone https://github.com/ciroescuderobrayan-SDJ/frontend-petmind.git
cd frontend-petmind
npm install
npm run dev
```

3. Poner su nombre y el correo de su cuenta de GitHub en el proyecto. Cada uno entrega el repositorio, así que los commits tienen que salir a su nombre:

```bash
git config user.name "Su Nombre"
git config user.email "correo-de-su-github"
```

### Cada vez que se sienten a trabajar

```bash
git switch main
git pull                                # trae lo último que subieron los demás
npm install                             # por si Brayan cambió el package.json
git switch -c feature/<area>-<tarea>    # rama nueva para la tarea del día
```

Si van a seguir en una rama que ya tenían, en vez de la última línea: `git switch <su-rama>` y luego `git merge main`.

### Para subir lo que hicieron

```bash
npm run lint
npm run build
git add .
git commit -m "Agrega PetCard con su CSS Module"
git push -u origin feature/<area>-<tarea>    # las siguientes veces basta con git push
```

Después, en GitHub: **Compare & pull request** → base `main` → avisar en el grupo para que otro lo revise. Si en 12 horas nadie lo ha revisado y `lint` y `build` pasan, el autor lo puede unir.

### Reglas

1. **Cada archivo tiene un dueño** (sección 5.1). Solo el dueño lo modifica. Después del Día 0, Brayan tampoco vuelve a tocar los archivos de los demás.
2. **Archivos compartidos:** `package.json`, `package-lock.json`, `index.html`, `main.jsx`, `App.jsx`, `routes.jsx` y `styles/` solo los toca Brayan. Si necesitan un cambio ahí (por ejemplo una ruta nueva), lo piden en el grupo y Brayan lo sube ese mismo día.
3. **Nada directo a `main`:** todo entra por pull request, al menos uno al día. La única excepción es el esqueleto del Día 0.
4. **No se instalan librerías nuevas** (solo `react-router-dom`, que va en el esqueleto). Así nadie choca en `package-lock.json`. Para íconos usen los SVG de `public/img/iconos/` o texto. Imágenes nuevas sí se pueden agregar en `public/img/`.
5. **Se programa contra el contrato** (sección 5), no contra el código del otro. Si el contexto de otro todavía está vacío, su página igual compila; cuando él suba su parte, la pantalla se llena sola.
6. **Estilos con CSS Modules** (`PetCard.module.css`) y las variables de `global.css`, para que todo se vea parecido sin tener que coordinarse.

### Las únicas dependencias y cómo no esperarlas

| Quién | Necesita | Cómo no esperar |
|---|---|---|
| Santiago y Emanuel | El esqueleto: rutas, layout y contextos vacíos | Brayan lo sube el sábado. Mientras tanto ellos hacen sus datos y tarjetas, que son archivos nuevos que el esqueleto no toca. |
| Navbar (Brayan) | Las páginas de Santiago y Emanuel | Solo enlaza a sus rutas (texto). Las páginas existen desde el Día 0. |
| Inicio (Brayan) | `PetCard` y `usePets()` de Santiago | Es un extra del miércoles y `PetCard` entra a `main` el domingo. Si se atrasa, el Inicio sale sin esa sección. |

### Definición de hecho

Una tarea está hecha cuando:

- se llega a ella desde la app con `Link`, `NavLink` o `navigate` (nunca `<a href>` para rutas internas, porque recarga la página);
- sus inputs están controlados (`value` o `checked` + `onChange`);
- lee los datos del contexto con su hook, no por props desde `App`;
- no hay errores en la consola del navegador, y `npm run lint` y `npm run build` pasan;
- está unida a `main`.

## 5. Contrato del proyecto

Esto es lo que los tres respetan para poder trabajar por separado. Si algo de aquí cambia, se avisa en el grupo antes de subirlo.

### 5.1 Carpetas y dueños

```
public/img/fotos, iconos, ilustraciones, logo          Brayan (copia de "02 - Recursos gráficos")
src/
├── main.jsx, App.jsx                                  Brayan
├── routes/routes.jsx                                  Brayan
├── layouts/MainLayout.jsx                             Brayan
├── styles/global.css                                  Brayan
├── context/
│   ├── AuthContext.js, AuthProvider.jsx               Brayan
│   ├── PetsContext.js, PetsProvider.jsx               Santiago
│   └── CampaignsContext.js, CampaignsProvider.jsx     Emanuel
├── data/
│   ├── cities.js, users.js                            Brayan
│   ├── pets.js                                        Santiago
│   └── campaigns.js                                   Emanuel
├── utils/formatCOP.js                                 Emanuel
├── components/
│   ├── layout/Navbar.jsx                              Brayan
│   ├── forms/PasswordInput.jsx                        Brayan
│   ├── cards/PetCard.jsx                              Santiago
│   └── cards/CampaignCard.jsx                         Emanuel
└── pages/
    ├── HomePage.jsx                                   Brayan
    ├── acceso/LoginPage, RegisterPage                 Brayan
    ├── adopcion/PetsPage, PetDetailPage               Santiago
    ├── donaciones/CampaignsPage, CampaignDetailPage   Emanuel
    └── panel-fundacion/
        ├── MyPetsPage, PetFormPage                    Santiago
        └── MyCampaignsPage, CampaignFormPage          Emanuel
```

Cada componente lleva su CSS Module al lado: `PetCard.jsx` + `PetCard.module.css`.

### 5.2 Rutas (`src/routes/routes.jsx`)

| Ruta | Página | Dueño |
|---|---|---|
| `/` | `HomePage` | Brayan |
| `/login` | `LoginPage` | Brayan |
| `/registro` | `RegisterPage` | Brayan |
| `/adoptar` | `PetsPage` | Santiago |
| `/adoptar/:id` | `PetDetailPage` | Santiago |
| `/fundacion/mascotas` | `MyPetsPage` | Santiago |
| `/fundacion/mascotas/nueva` | `PetFormPage` | Santiago |
| `/fundacion/mascotas/:id/editar` | `PetFormPage` | Santiago |
| `/donar` | `CampaignsPage` | Emanuel |
| `/donar/:id` | `CampaignDetailPage` | Emanuel |
| `/fundacion/campanas` | `MyCampaignsPage` | Emanuel |
| `/fundacion/campanas/nueva` | `CampaignFormPage` | Emanuel |
| `/fundacion/campanas/:id/editar` | `CampaignFormPage` | Emanuel |

Todas usan `MainLayout` (la Navbar arriba y la página debajo). En esta entrega ninguna ruta pide sesión, y Mis mascotas y Mis campañas están en la Navbar para llegar a ellas en la demo.

```jsx
// src/routes/routes.jsx — dueño: Brayan
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import PetsPage from '../pages/adopcion/PetsPage'
// …un import por página

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/adoptar', element: <PetsPage /> },
      { path: '/adoptar/:id', element: <PetDetailPage /> },
      // …resto de la tabla
    ],
  },
])
```

```jsx
// src/App.jsx — dueño: Brayan
export default function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <CampaignsProvider>
          <RouterProvider router={router} />
        </CampaignsProvider>
      </PetsProvider>
    </AuthProvider>
  )
}
```

Si en clase usaron `<BrowserRouter>` con `<Routes>`, también sirve. Lo que importa es que la tabla de rutas sea esta.

### 5.3 Contextos

Cada contexto son **dos archivos**. Si el hook y el Provider van en el mismo `.jsx`, ESLint marca error (`react-refresh/only-export-components` está como error en este proyecto).

```js
// src/context/PetsContext.js — contexto + hook (archivo .js, sin JSX)
import { createContext, useContext } from 'react'

export const PetsContext = createContext(null)
export const usePets = () => useContext(PetsContext)
```

```jsx
// src/context/PetsProvider.jsx — solo el componente. Así queda el stub del Día 0:
import { useState } from 'react'
import { PetsContext } from './PetsContext'

export function PetsProvider({ children }) {
  const [pets] = useState([]) // Santiago lo cambia por los datos de data/pets.js
  const value = {
    pets,
    addPet: () => {}, // addPet(data)
    updatePet: () => {}, // updatePet(id, changes)
    deletePet: () => {}, // deletePet(id)
    getPetById: () => undefined, // getPetById(id)
  }
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>
}
```

| Hook | Dueño | Devuelve |
|---|---|---|
| `useAuth()` | Brayan | `user` (`null` sin sesión), `users`, `register(data)`, `login(email, password)` que devuelve `true` o `false`, `logout()` |
| `usePets()` | Santiago | `pets`, `addPet(data)`, `updatePet(id, changes)`, `deletePet(id)`, `getPetById(id)` |
| `useCampaigns()` | Emanuel | `campaigns`, `addCampaign(data)`, `updateCampaign(id, changes)`, `deleteCampaign(id)`, `getCampaignById(id)` |

- Las listas se leen con el hook en la página que las usa; no se pasan por props desde `App` (eso es el props drilling que la tarea pide evitar). A una tarjeta sí se le pasa su objeto: `<PetCard pet={pet} />`.
- Actualizaciones inmutables: agregar con `setPets((prev) => [nueva, ...prev])`, editar con `map`, eliminar con `filter`.
- Id de lo nuevo: `String(Date.now())`.
- Los providers no navegan: la página que llama `login()` o `addPet()` es la que hace `navigate(...)`.
- Los datos viven en memoria: al recargar (F5) vuelven los de prueba. Es normal, todavía no hay backend.

### 5.4 Datos de prueba

```js
// src/data/pets.js — Santiago
export const initialPets = [
  {
    id: 'luna',
    name: 'Luna',
    species: 'Perro', // 'Perro' | 'Gato' | 'Otro'
    sex: 'Hembra', // 'Hembra' | 'Macho'
    age: '2 años',
    size: 'Mediano', // 'Pequeño' | 'Mediano' | 'Grande'
    city: 'Medellín',
    photo: '/img/fotos/mascota-luna-perra.jpg',
    traits: ['Cariñosa', 'Tranquila'],
    health: { vaccinated: true, dewormed: true, sterilized: false, microchip: false },
    story: 'Luna llegó a…',
    status: 'Disponible', // 'Disponible' | 'En proceso' | 'Adoptado' | 'Pausado'
    urgent: false,
    foundation: 'Huellitas de Amor', // en esta entrega, fijo para lo que se cree
    createdAt: '2026-09-12',
  },
]
```

```js
// src/data/campaigns.js — Emanuel
export const initialCampaigns = [
  {
    id: 'toby',
    title: 'Cirugía de pata para Toby',
    category: 'Tratamiento', // 'Tratamiento' | 'Rescate' | 'Alimento' | 'Esterilización' | 'Refugio'
    story: 'Lo atropellaron en Cali…',
    photo: '/img/fotos/historia-rocky-antes-del-rescate.jpg',
    foundation: 'Patitas Valle',
    expenses: [
      { concept: 'Cirugía', amount: 3500000 },
      { concept: 'Fisioterapia', amount: 1300000 },
    ],
    goal: 4800000, // siempre = suma de expenses
    raised: 3620000,
    donors: 128,
    endDate: '2026-10-15',
    urgent: true,
  },
]
```

Usuario (`src/data/users.js`, Brayan): `{ id, accountType, name, lastName, email, password, phone, city, interests }`, con `accountType` igual a `'persona'` o `'fundacion'`.

Usuarios de prueba (contraseña `petmind123` para los dos): `brayan.ciro@correo.com` (persona) y `huellitas@correo.com` (fundación Huellitas de Amor).

### 5.5 Estilos

```css
/* src/styles/global.css — dueño: Brayan. Los demás solo usan las variables. */
:root {
  --color-primary: #0b6b67; /* verde PetMind */
  --color-accent: #f17155; /* coral */
  --color-info: #4f8fc4; /* azul */
  --color-bg: …;
  --color-surface: …;
  --color-border: …;
  --color-text: …;
  --color-text-muted: …;
  --color-danger: …;
  --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
  --radius: 14px;
}
```

Clases compartidas de `global.css`: `container`, `btn` con `btn-primary` o `btn-outline`, `input`, `field-error`, `card`, `chip` y `chip active`. Si todavía no están en `main`, úsenlas igual: el elemento se ve sin estilo hasta que Brayan las suba, pero nada se rompe.

### 5.6 Formularios controlados

Todos los formularios siguen el mismo patrón:

```jsx
const [form, setForm] = useState(initialForm)
const [errors, setErrors] = useState({})
const navigate = useNavigate()

const handleChange = (e) => {
  const { name, value, type, checked } = e.target
  setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
}

const handleSubmit = (e) => {
  e.preventDefault()
  const newErrors = validate(form) // { name: 'El nombre es obligatorio', … }
  setErrors(newErrors)
  if (Object.keys(newErrors).length > 0) return
  addPet(form) // se guarda en el contexto…
  navigate('/fundacion/mascotas') // …y la lista ya la muestra
}

// Cada campo: value (o checked) + onChange
<input className="input" name="name" value={form.name} onChange={handleChange} />
{errors.name && <p className="field-error">{errors.name}</p>}
```

- Chips de selección múltiple (carácter, intereses): un arreglo en el estado; se agrega con `[...prev, valor]` y se quita con `filter`.
- Lo que llega de un input es texto: los montos se convierten con `Number(...)`.

## 6. Brayan: base, navegación y sesión

**Ramas:** el Día 0 va directo a `main`. Después: `feature/estilos-navbar` (dom), `feature/login` (lun), `feature/registro` (mar) y `feature/inicio` (mié).

### Día 0 · sábado 3: esqueleto (unas 2 horas)

Es lo único que bloquea a los demás. Mientras tanto ellos adelantan datos y tarjetas.

- [ ] Invitar a Santiago y a Emanuel como colaboradores (GitHub → Settings → Collaborators).
- [x] Subir este plan (`PLAN-DE-TRABAJO.md`).
- [ ] `npm install react-router-dom` (versión 7). No instalar el paquete `react-router` (versión 8): es otro paquete.
- [ ] Quitar lo de la plantilla de Vite (`App.css`, `src/assets/`, `public/icons.svg` e `index.css`) y poner `lang="es"` y `<title>PetMind</title>` en `index.html`.
- [ ] Copiar `02 - Recursos gráficos` a `public/img/` con carpetas en minúscula y sin tildes: `fotos/`, `iconos/`, `ilustraciones/`, `logo/`.
- [ ] Crear todos los archivos de la sección 5.1 como stubs: cada página con un `<h1>` con su nombre, la `Navbar` con los enlaces y los tres contextos con su forma final y el estado vacío.
- [ ] `routes.jsx` con las rutas de la sección 5.2, `App.jsx` con los providers y `MainLayout` con la Navbar y `<Outlet />`.
- [ ] `global.css` con las variables y clases de la sección 5.5 (valores provisionales) y `data/cities.js` con la lista de ciudades.
- [ ] `npm run lint` y `npm run build` sin errores → subir a `main` → avisar en el grupo que ya pueden hacer `git pull`.

### Resto de la semana

- [ ] **Estilos y layout (dom 4):** valores de `global.css`, la fuente Plus Jakarta Sans de Google Fonts y `<ScrollRestoration />` en `MainLayout`, para que cada pantalla abra arriba.
- [ ] **Navbar (dom 4)**, como el menú de `01 - Referencia de diseño`: logo → `/`; `NavLink` a Adoptar, Donar, Mis mascotas y Mis campañas, con el activo resaltado; botón "Iniciar sesión" → `/login`.
- [ ] **Sesión (lun 5):** `AuthProvider` + `data/users.js` con los dos usuarios de prueba de la sección 5.4.
- [ ] **`PasswordInput` (lun 5):** campo con botón para mostrar u ocultar, usado en Login y Registro.
- [ ] **Login `/login` (lun 5)**, mockup `01 - Acceso / 01 - Iniciar sesión`: correo, contraseña y "Recordarme". Valida campos obligatorios y formato de correo; si no coincide, muestra "Correo o contraseña incorrectos". La persona va a `/` y la fundación a `/fundacion/mascotas`. Enlace a `/registro`. Los botones de Google y Facebook quedan solo visuales.
- [ ] **Registro `/registro` (mar 6)**, mockups `02` y `03` de Acceso, en una sola pantalla: tipo de cuenta (persona o fundación), nombre, apellido, correo, celular, ciudad, contraseña, intereses (chips) y aceptar términos. Valida obligatorios, correo válido y no repetido, contraseña de 8 o más caracteres y términos aceptados. Al crear: el usuario entra a `users`, queda con sesión y va al Inicio.
- [ ] **Navbar con sesión (mié 7):** con sesión muestra "Hola, {user.name}" y "Cerrar sesión", leídos con `useAuth()` y sin props. Un usuario recién registrado aparece al instante (nivel 3).
- [ ] **Inicio `/` (mié 7):** título, texto y botones "Conocer mascotas" (`/adoptar`) y "Quiero ayudar" (`/donar`). Extra: las 4 primeras mascotas de `usePets()` con `PetCard`, que muestra el mismo estado global en otra pantalla.
- [ ] **README (mié 7):** cómo instalar y correr el proyecto, y el equipo.
- [ ] **Sábado 10:** etiqueta en el commit entregado: `git tag momento-2 && git push origin momento-2`.

## 7. Santiago: mascotas

**Ramas:** `feature/mascotas-card` (sáb y dom), `feature/mascotas-listas` (lun), `feature/mascotas-formulario` (mar) y `feature/mascotas-admin` (mié).

**Mientras llega el esqueleto (sábado):**

- Hagan `data/pets.js` y la maqueta de `PetCard` en la rama `feature/mascotas-card`.
- Para ver la tarjeta, impórtenla un rato en `App.jsx`, sin hacer commit de ese cambio.
- El botón de la tarjeta se deja como `<button>` y se cambia a `<Link>` cuando el esqueleto esté en `main`.
- No copien las fotos: llegan con el esqueleto en `public/img/fotos/`.
- Cuando Brayan avise, deshagan la prueba con `git restore src/App.jsx` y traigan el esqueleto: `git switch main`, `git pull`, `git switch feature/mascotas-card` y `git merge main`.

**Tareas:**

- [ ] **Datos (sáb 3):** `data/pets.js` con las 7 mascotas de las fotos (Luna, Simón, Rocky, Nala, Max, Canela y Milo) y estados variados.
- [ ] **`PetCard` (sáb 3 y dom 4)**, mockup `02 - Adopción / 01`: foto, etiqueta "Nuevo" o "Urgente", nombre, sexo · edad · ciudad, etiquetas de carácter, fundación y botón "Conocer a {nombre}" → `/adoptar/:id`. Recibe `pet` por props. **PR el domingo.**
- [ ] **`PetsProvider` (dom 4):** estado con `initialPets` y las cuatro funciones del contrato.
- [ ] **Adoptar `/adoptar` (lun 5)**, mockup `02 - Adopción / 01`: grilla de `PetCard` con `usePets()` y contador de resultados. Extra: búsqueda por nombre y filtro por especie con inputs controlados.
- [ ] **Perfil `/adoptar/:id` (lun 5)**, mockup `02 - Adopción / 02`: `useParams` + `getPetById`; foto, datos, carácter, salud, historia y fundación. Si el id no existe: mensaje y enlace a `/adoptar`.
- [ ] **Publicar `/fundacion/mascotas/nueva` (mar 6)**, mockup `08 - Panel de la fundación / 03`: formulario controlado con foto (un `<select>` con las fotos de `/img/fotos/`), nombre, especie, sexo, edad, tamaño, ciudad, salud (4 casillas), carácter (chips), historia y estado, con mensajes de error por campo. Al enviar: `addPet(form)` → `navigate('/fundacion/mascotas')`, y la mascota aparece de primera (nivel 3).
- [ ] **Mis mascotas `/fundacion/mascotas` (mié 7)**, mockup `08 / 02`: tabla con foto, nombre, especie · edad · tamaño, estado y fecha; acciones Ver, Editar y Eliminar (con `window.confirm`); botón "+ Publicar mascota".
- [ ] **Editar `/fundacion/mascotas/:id/editar` (mié 7):** el mismo `PetFormPage` con los datos cargados → `updatePet`. Pónganle `key={id ?? 'nueva'}` al formulario: sin eso, si pasan de editar a "Publicar mascota", el formulario conserva los datos viejos.

## 8. Emanuel: campañas de donación

**Ramas:** `feature/campanas-card` (sáb y dom), `feature/campanas-listas` (lun), `feature/campanas-formulario` (mar) y `feature/campanas-admin` (mié).

**Mientras llega el esqueleto (sábado):**

- Hagan `data/campaigns.js`, `utils/formatCOP.js` y la maqueta de `CampaignCard` en la rama `feature/campanas-card`.
- Para ver la tarjeta, impórtenla un rato en `App.jsx`, sin hacer commit de ese cambio.
- No copien las fotos: llegan con el esqueleto en `public/img/fotos/`.
- Cuando Brayan avise, deshagan la prueba con `git restore src/App.jsx` y traigan el esqueleto: `git switch main`, `git pull`, `git switch feature/campanas-card` y `git merge main`.

**Tareas:**

- [ ] **Datos (sáb 3):** `data/campaigns.js` con las 6 campañas del mockup `03 - Donaciones / 01` (con fotos de las mascotas) y `utils/formatCOP.js` con `Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })`.
- [ ] **`CampaignCard` (sáb 3 y dom 4):** foto, categoría, "Urgente", fundación, título, barra de progreso (`raised / goal`), montos con `formatCOP`, donantes, días restantes (calculados con `endDate`) y botón "Donar" → `/donar/:id`. Recibe `campaign` por props. **PR el domingo.**
- [ ] **`CampaignsProvider` (dom 4):** estado con `initialCampaigns` y las cuatro funciones del contrato.
- [ ] **Donar `/donar` (lun 5)**, mockup `03 - Donaciones / 01`: grilla de `CampaignCard` con `useCampaigns()`. Extra: chips de categoría como filtro.
- [ ] **Detalle `/donar/:id` (lun 5)**, mockup `03 - Donaciones / 02`: foto, historia, progreso y desglose de gastos. Si el id no existe: mensaje y enlace a `/donar`.
- [ ] **Crear `/fundacion/campanas/nueva` (mar 6)**, mockup `08 - Panel de la fundación / 06`: formulario controlado con categoría (5 opciones), título, historia, foto, fecha de cierre, urgente y lista de gastos (agregar y quitar filas). La meta es la suma de los gastos: se calcula al renderizar, no va en otro `useState`. Valida obligatorios, al menos un gasto mayor a 0 y fecha futura. Al enviar: `addCampaign(form)` → `navigate('/donar')`, y la campaña aparece con 0 % (nivel 3).
- [ ] **Mis campañas `/fundacion/campanas` (mié 7):** no tiene mockup; tabla sencilla como la de Mis mascotas: título, categoría, recaudado / meta, fecha de cierre y acciones Ver, Editar y Eliminar (con confirmación); botón "+ Crear campaña".
- [ ] **Editar `/fundacion/campanas/:id/editar` (mié 7):** el mismo `CampaignFormPage` → `updateCampaign`, con el mismo `key={id ?? 'nueva'}` que Santiago.

## 9. Prueba final y entrega

**Jueves 8:** todo en `main` antes de las 6 p. m. Prueba juntos (en llamada) desde un clon limpio:

- [ ] `npm install` y `npm run dev` funcionan en un clon nuevo.
- [ ] Se navega con la Navbar por todas las pantallas sin que la página se recargue.
- [ ] Registrar un usuario nuevo → la Navbar lo saluda → cerrar sesión → iniciar sesión con ese usuario. Con contraseña equivocada sale el mensaje de error.
- [ ] Iniciar sesión con `huellitas@correo.com` lleva a Mis mascotas.
- [ ] Publicar mascota con el formulario vacío muestra los errores. Lleno, la mascota aparece de primera en Mis mascotas y en Adoptar. Editarla cambia los datos en las dos listas y eliminarla la quita de ambas.
- [ ] Crear campaña: agregar y quitar gastos cambia la meta en vivo, y la campaña aparece en Donar con 0 %. Editarla y eliminarla funciona igual que con las mascotas.
- [ ] `npm run lint` y `npm run build` sin errores.

**Viernes 9:** arreglos de lo que salga en la prueba. A las 9 p. m. se congela `main`.

**Sábado 10:**

- [ ] Brayan crea la etiqueta `momento-2`.
- [ ] Brayan, Santiago y Emanuel envían, cada uno, el [formulario de entrega](https://forms.cloud.microsoft/r/ybi2FFJCD8?origin=lprLink) con el enlace del repositorio.

## 10. Queda para el tercer momento

No entra en esta entrega:

- **La lista de Web 2:** `AuthLayout`, footer, provider de tema claro y oscuro, favicon, nombre de la página en cada componente y el listado total de componentes.
- **El resto del backlog (Excel), con el mismo reparto por áreas:**
  - Brayan: registro de fundación, verificación de correo, recuperar contraseña, panel del usuario, rutas privadas y la librería de componentes `ui/`.
  - Santiago: formulario de adopción por pasos y seguimiento, directorio y perfil de fundaciones, tablero de solicitudes.
  - Emanuel: donar en 3 pasos y comprobante, historias, Nosotros, Contacto, Reportar y el resumen del panel de la fundación.
  - Los tres: conectar los contextos al backend.
