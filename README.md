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
git clone <url-de-tu-repositorio-en-GitHub>
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

### Producción (Vercel)

La app está publicada en:

**[https://reto-final-full-satack.vercel.app/](https://reto-final-full-satack.vercel.app/)**

(Stack: Vite, build `npm run build`, salida `dist/`. Variables `VITE_FIREBASE_*` configuradas en el panel de Vercel; en Firebase *Authentication* → *Dominios autorizados* debe incluirse el dominio `*.vercel.app` del sitio.)

### Otras opciones

- **Firebase Hosting:** `npm run deploy:firebase` (tras `firebase use` y proyecto configurado; ver `.firebaserc`).
- **Netlify:** en el repo hay `netlify.toml` de referencia; mismas variables `VITE_*` y `dist` como directorio de publicación.

## Entregable final (taller) — checklist

Criterios tomados de **[`instrucciones.md`](./instrucciones.md)**. Usalo para cerrar el reto antes de entregar al docente o subir a la plataforma del curso.

| Requisito | Cómo comprobarlo |
|-----------|------------------|
| **Mín. 30 commits** con historial claro | `git log --oneline` (o en GitHub → *Insights* → *Network*). Si faltan, hacé commits pequeños y reales (docs, fixes, a11y) sin forzar ruido vacío. |
| **API REST** (p. ej. Fake Store) | Galería carga productos vía `src/services/api.js`. |
| **Registro / sesión** | Mock local sin `.env` o **Firebase Auth** con `.env` / Vercel. |
| **Galería, búsqueda, paginación, carrito, checkout** | Probar en la URL pública y en local. |
| **Diseño responsivo y atomic design** | Revisar móvil/tablet/desktop; carpetas `atoms` / `molecules` / `organisms`. |
| **Deploy** | Enlace de producción arriba (Vercel). |
| **Bonus Firebase** (si aplica) | Auth + Firestore (pedidos en colección `orders`); reglas publicadas. |

**Pasos concretos para “entregar” el trabajo (sin depender del aula; ajustá según te pida el curso):**

1. **Repo en GitHub** accesible (público o con invitación al docente) con el código al día (`git push`).
2. **URL de despliegue** lista (la de Vercel) y comprobá login + compra en producción.
3. **Completar 30+ commits** si el criterio del taller lo exige.
4. **Entrega formal:** lo que pida la institución (LMS, formulario, PDF, enlace a repo + enlace a producción, etc.); en muchos cursos basta con **enlace al repo** + **enlace a Vercel** en un README o en la tarea.
5. **(Opcional)** citar en el repo o en memoria **fuentes** si reutilizaste fragmentos (el taller lo indica en criterios de evaluación).

## Documentación del taller

La guía detallada (enunciado, funcionalidades, **paso a paso 1–15**, tips) está en **[`instrucciones.md`](./instrucciones.md)**.

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

## Licencia

Proyecto académico / portafolio. Ajusta este apartado según la licencia que use tu curso o institución.
