# E-Shop

Aplicación web de **e-commerce** con catálogo remoto, carrito, búsqueda, paginación, flujo de checkout y autenticación. Desarrollada con **React** y **Vite**, estilos con **Tailwind CSS**, estado con **Zustand** y consumo de la **Fake Store API** para productos. Incluye integración **opcional** con **Firebase** (Authentication, Firestore y Hosting).

## Características

- Galería de productos con datos en tiempo real (REST)
- Búsqueda y paginación
- Carrito con cantidades, total y persistencia local
- Registro e inicio de sesión: modo simulado (datos de ejemplo) o **Firebase Auth** con variables de entorno
- Vista previa de checkout y registro de pedidos en **Firestore** (usuario autenticado con Firebase)
- Interfaz responsive
- Estructura de componentes alineada con **atomic design** (`atoms` / `molecules` / `organisms`)

## Stack

| Área        | Tecnología                          |
|------------|--------------------------------------|
| UI         | React 19, Tailwind CSS 4             |
| Build      | Vite 8                              |
| Estado     | Zustand (persistencia en localStorage) |
| API        | Fake Store API (`https://fakestoreapi.com`) |
| Opcional   | Firebase (Auth, Firestore, Hosting)  |

## Requisitos

- **Node.js** 18+ (recomendado 20 LTS)
- Cuenta de **npm** o **pnpm** para dependencias
- (Opcional) Proyecto en **Firebase** y archivo `.env` con credenciales web

## Puesta en marcha

```bash
git clone <url-de-tu-repositorio>
cd proyecto-final
npm install
npm run dev
```

Abre en el navegador la URL que muestra Vite (por defecto `http://localhost:5173`).

## Variables de entorno (Firebase opcional)

Si usas autenticación y Firestore con Firebase:

1. Copia el archivo de ejemplo:  
   `cp .env.example .env` (en Windows: copia y renombra a `.env`)
2. En [Firebase Console](https://console.firebase.google.com) → *Project settings* → *Your apps* → *SDK setup* (configuración de la app web), rellena las variables en `.env` con el prefijo `VITE_`.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Sin `.env` o con valores vacíos, la app funciona con **sesión y usuarios simulados** (mock) y el carrito sigue persistiendo en el navegador.

## Scripts

| Comando            | Descripción |
|--------------------|------------|
| `npm run dev`      | Servidor de desarrollo |
| `npm run build`    | Build de producción en `dist/` |
| `npm run preview`  | Vista previa del build local |
| `npm run lint`     | ESLint |
| `npm run ci`       | `lint` + `build` (útil en CI) |
| `npm run deploy:firebase` | `build` y despliegue a **Firebase Hosting** + reglas de Firestore (requiere CLI y `firebase login`) |

## Despliegue

- **Firebase Hosting:** `npm run deploy:firebase` (tras `firebase use` y proyecto configurado). Ajusta `.firebaserc` con el ID de tu proyecto.
- **Vercel / Netlify:** en el repositorio hay `vercel.json` y `netlify.toml` de referencia. Define en el panel las variables `VITE_FIREBASE_*` si usas Firebase en producción, y el comando de build `npm run build` con publicación de `dist/`.

Añade en Firebase *Authentication* → *Authorized domains* el dominio de producción (p. ej. `*.web.app`).

## Estructura relevante

```
src/
  components/     # atomic design: atoms, molecules, organisms
  config/         # p. ej. Firebase
  mockdata/       # datos de ejemplo (desarrollo / fallback)
  services/       # API REST, pedidos a Firestore
  store/          # Zustand
  utils/
```

## Documentación del taller

La guía detallada del reto (enunciado, criterios, paso a paso y enlaces) está en **[`instrucciones.md`](./instrucciones.md)**.

## Licencia

Proyecto académico / portafolio. Ajusta este apartado según la licencia que use tu curso o institución.
