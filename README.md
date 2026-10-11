# PetMind

PetMind es una aplicación web de demostración para conectar personas, animales en adopción y fundaciones de protección animal en Colombia. Incluye recorridos públicos, formularios controlados, paneles por tipo de cuenta y datos locales persistidos en el navegador.

## Requisitos

- Node.js 20.19+ o 22.12+.
- npm incluido con Node.js.

## Iniciar el proyecto

```powershell
npm install
npm run dev
```

Vite muestra la dirección local disponible en la terminal. Para elegir un puerto específico:

```powershell
npm run dev -- --port 5199
```

## Verificaciones

```powershell
npm run lint
npm run build
```

## Cuentas de demostración

La contraseña para las cuentas precargadas es `petmind123`.

| Tipo | Correo |
| --- | --- |
| Persona | `brayan.ciro@correo.com` |
| Fundación | `huellitas@correo.com` |

Los datos de las cuentas, mascotas, solicitudes, campañas, aportes y reportes se guardan localmente en el navegador bajo claves `petmind.v1.*`. Los formularios simulan los flujos de la plataforma: no realizan pagos, no envían correos ni crean registros en un servidor.

## Equipo del proyecto integrador

- Brayan Ciro
- Santiago Varela
- Emanuel Gómez

## Restablecer datos locales

Para volver al estado inicial, abre las herramientas de desarrollador del navegador y ejecuta en la consola:

```js
Object.keys(localStorage).filter((key) => key.startsWith('petmind.v1.')).forEach((key) => localStorage.removeItem(key))
Object.keys(sessionStorage).filter((key) => key.startsWith('petmind.v1.')).forEach((key) => sessionStorage.removeItem(key))
location.reload()
```

También puedes borrar los datos del sitio desde la configuración del navegador. Al restablecer las claves, se cerrará la sesión de demostración.
