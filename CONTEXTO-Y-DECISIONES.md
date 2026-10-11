# PetMind · Contexto y decisiones de las visuales

Bitácora del trabajo para pasar a React **todas** las pantallas de `02-Visuales PetMind/03 - Mockups de pantallas` (42 pantallas + la página de inicio de `01 - Referencia de diseño`).
Se actualiza a medida que avanza el trabajo: qué se hizo, cómo está organizado y por qué se tomó cada decisión.

> Estado: **pausado y traspasado a Codex** (21:35). Claude hizo la base y las secciones Inicio, 01, 02 y 03; Codex sigue con 04 a 08 siguiendo `PROMPT-CODEX.md`, y después Claude audita. Ver secciones 2 y 5.

---

## 1. Qué se pidió

> "Hazme todas estas visuales" (carpeta `03 - Mockups de pantallas`) y "crea un archivo de texto en la carpeta con el contexto de todo lo que vas haciendo y decisiones".

- Fuente de verdad: los PNG de cada sección (`00 - Mapa de navegación` + pantallas numeradas) y `00 - Mapa general de PetMind.png`.
- Se construye sobre lo que ya estaba en `main` (Navbar, Hero, PetCard, FeatureCards, Footer, ThemeProvider, layouts, títulos por página, favicon).
- Sin commits ni push: todo queda en el árbol de trabajo para que Brayan lo revise.

## 2. Estado por sección

| Sección | Pantallas | Estado |
|---|---|---|
| Base (estilos, íconos, datos, contextos, layouts) | — | ✅ |
| Inicio | 1 | ✅ |
| 01 · Acceso | 9 | ✅ |
| 02 · Adopción | 8 | ✅ |
| 03 · Donaciones | 6 | ✅ |
| 04 · Fundaciones | 2 | 🟡 Pendiente (Codex). Ya existen `FoundationCard` y `components/ui/FoundationMap.jsx` (este último sin probar) |
| 05 · Historias | 2 | ⏳ Pendiente (Codex). Datos en `data/stories.js` y `BeforeAfter` listos |
| 06 · Institucional y reportes | 4 | ⏳ Pendiente (Codex). Datos en `data/institutional.js` y `data/reports.js` |
| 07 · Panel del usuario | 5 | ⏳ Pendiente (Codex). `DashboardLayout` hecho pero sin revisar en pantalla |
| 08 · Panel de la fundación | 6 | ⏳ Pendiente (Codex). Reemplazar los stubs de `views/fundacion/` |

## 3. Decisiones (y por qué)

1. **Sin librerías nuevas.** Solo React + `react-router-dom`, como dice la regla 4 del plan. Los íconos son SVG propios en `components/ui/Icon.jsx` (trazo estilo Lucide) y la gráfica del panel de la fundación se dibuja con HTML/CSS.
2. **Estilos:** CSS Modules por componente/página + las variables de `styles/global.css`. Los colores salen medidos de los mockups (verde `#0b6b67`, coral `#f17155`, azul `#4f8fc4`, ámbar, morado, fondo `#faf9f6`, pie `#083f3d`). Todo usa variables para que el modo oscuro siga funcionando.
3. **Tipografías:** Plus Jakarta Sans (ya estaba) y **Caveat Brush** para los textos a mano ("Más que mascotas…", "¡Hola de nuevo!", "Campaña destacada"…). Se identificó comparando los mockups.
4. **Estado global con Context API**, un contexto por dominio y en dos archivos (`XContext.js` + `XProvider.jsx`) para cumplir la regla `react-refresh/only-export-components`, igual que `ThemeContext`.
5. **Fechas relativas a hoy** en los datos de prueba (días restantes de campañas, "hace 2 horas", la entrevista "el lunes"), para que la demo nunca muestre campañas vencidas ni fechas pasadas como "próximas".
6. **Rutas privadas:** `/cuenta/*` pide sesión de persona y `/fundacion/*` sesión de fundación, como en el mapa general ("Con sesión iniciada"). Al entrar sin sesión se va a `/login` y, al iniciar, se vuelve a la página que se quería ver.
7. **Persistencia de la demo:** los contextos guardan su estado en `localStorage` (`hooks/usePersistentState.js`), así lo creado sobrevive a un F5. Si pasan más de 3 días sin usarla, vuelve a los datos de prueba. Los datos de tarjeta nunca se guardan.
8. **Mismos nombres en todo el sitio:** los mockups usan nombres de ejemplo que a veces chocan entre pantallas (p. ej. el gato de "Milo y Ana" es Simón en otra). Se dejó una sola versión por mascota y fundación, y Toby es una campaña (no una mascota en adopción) porque su foto es la de Rocky "antes".
9. **Donar sin cuenta:** se puede donar sin iniciar sesión (los datos se piden en el paso 2). Si hay sesión, se llenan solos y la donación aparece en Mi cuenta.
10. **Frecuencia por defecto "Una sola vez":** el mockup muestra "Mensual" marcado porque es el ejemplo de Brayan; dejarlo marcado por defecto sería un cobro recurrente que la persona no eligió. Los botones del Fondo PetMind sí abren con "Mensual" cuando se elige esa opción.
11. **Pagos simulados:** tarjeta con validación real (Luhn, vencimiento, CVV). `4000 0000 0000 0002` simula un pago rechazado (queda en el historial como "Rechazada", como en el mockup de Mis donaciones). Las mensuales solo permiten tarjeta, como dicen los textos del mockup.
12. **Comprobantes y certificados:** se descargan como archivo de texto generado en el navegador; sin backend no hay PDF real.
13. **Conteos en vivo:** número de mascotas y campañas de cada fundación (directorio, perfil, menú del panel) se calculan con los datos reales del contexto, para que al publicar una mascota el número suba. Las cifras históricas (adopciones, donaciones, reseñas) salen de los datos de prueba.

_(Se irán agregando más decisiones abajo a medida que aparezcan.)_

## 4. Bitácora

- **2026-10-10 · 18:45** — Revisión de las 42 pantallas, los 8 mapas de navegación y los recursos gráficos. Se midieron colores y se identificó la fuente manuscrita. Se definió la estructura de carpetas, rutas y contextos.
- **19:30** — Base lista: variables y clases en `global.css` (+ tema oscuro en `ThemeProvider.css`), íconos, utilidades (`utils/format.js`, `utils/dates.js`), datos de prueba (`data/`), 9 contextos, layouts (principal, acceso, donación y panel) y componentes de `ui/`, `forms/` y `cards/`. Fotos y logo copiados a `public/img/`.
- **19:40** — Inicio completo (hero, tarjetas de Emanuel, mascotas, historias, videos, banner y pie). Se revisó con capturas de Chrome contra la referencia.
- **20:05** — 01 · Acceso: las 9 pantallas, con validaciones y flujo real (registro → verificación → panel; recuperar → enlace → nueva → lista).
- **20:40** — 02 · Adopción: listado con filtros (todos funcionan y se combinan), perfil con galería y pestañas, formulario en 4 pasos (el paso va en `?paso=`, borrador automático, validación por paso), solicitud enviada y seguimiento con línea de tiempo y chat.
- **21:20** — 03 · Donaciones: listado con filtros y orden, detalle con pestañas, flujo de donar en 3 pasos (estado compartido en `DonarFlujo.jsx` con `useOutletContext`) y comprobante. Al pagar, la campaña suma el monto y el donante al instante (75% → 76% en Toby).
- **21:35** — Brayan pidió pausar y pasarle el trabajo a Codex. Estado al pausar: `npm run lint` y `npm run build` pasan (solo el aviso de tamaño del bundle). Se escribió `PROMPT-CODEX.md` con el contexto, las reglas, las APIs y la especificación de cada pantalla pendiente. Cuando Codex termine, Claude audita contra los mockups.

## 5. Traspaso

- Instrucciones para Codex: `PROMPT-CODEX.md` (raíz del repo). Codex debe seguir escribiendo en esta bitácora y marcar el estado de cada sección.
- Nada se ha subido a git: los cambios siguen en el árbol de trabajo.
- Cuentas de prueba: `brayan.ciro@correo.com` (persona) y `huellitas@correo.com` (fundación), contraseña `petmind123`.
- Para reiniciar los datos de la demo: borrar en el navegador las llaves `petmind.v1.*` de `localStorage`.
