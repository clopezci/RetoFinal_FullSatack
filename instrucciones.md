# Guía del proyecto — Reto Desarrollador Fullstack

Reto para practicar las habilidades de un desarrollador fullstack moderno.

Este documento recoge el enunciado original y el **paso a paso** sugerido para el taller. El repositorio puede usarse como base; se recomienda trabajar con **commits pequeños y claros**.

## Menú de contenido

- [Enunciado](#enunciado)
- [Funcionalidades](#funcionalidades)
- [Tecnologías requeridas](#tecnologías-requeridas)
- [Instrucciones de uso (repositorio plantilla)](#instrucciones-de-uso-repositorio-plantilla)
- [Instrucciones paso a paso](#instrucciones-paso-a-paso)
- [Tips importantes](#tips-importantes)
- [Información de interés / enlaces](#información-de-interés--enlaces)
- [Statement (English)](#statement-english)
- [Step by step (English)](#step-by-step-english)
- [Resources (English)](#resources-english)

---

## Enunciado

Desarrollar una aplicación web fullstack para una tienda online que consuma una **API REST**. La aplicación debe incluir:

- **Registro de usuarios y manejo de sesión:** Firebase Authentication o localStorage (opcional para persistencia).
- **Galería de productos:** Poblada dinámicamente mediante peticiones a la API REST (fetch o Axios).
- **Paginación** de productos en la galería.
- **Buscador** de productos en tiempo real.
- **Carrito de compras** con estado local o en Firebase.
- **Previsualización de checkout** (vista previa del proceso de compra).

**Requisito de entrega frecuente:** el ejercicio debe tener un mínimo de **30 commits**.

**Criterios de evaluación:** buenas prácticas, limpieza y organización del código, diseño responsivo, funcionamiento correcto, interfaz moderna y accesible, componentes reutilizables y **atomic design**. Se permite reutilizar código de internet **citando fuentes**. Trabajo individual.

---

## Funcionalidades

| Área            | Incluido en el reto        |
|-----------------|----------------------------|
| Registro / sesión | Persistente (mock o Firebase) |
| Galería         | Datos vía API (p. ej. Fake Store) |
| Búsqueda        | Tiempo real                 |
| Paginación      | En galería                  |
| Carrito         | Cantidades y total         |
| Checkout        | Vista previa y confirmación |

---

## Tecnologías requeridas

- **Frontend:** React con **Tailwind CSS**.
- **Estado y persistencia:** **Zustand** (recomendado) o Context API + localStorage.
- **API:** p. ej. [Fake Store API](https://fake-store-api-docs.vercel.app/) (productos y usuarios de demostración).
- **Backend (bonus):** Firebase (Authentication, Firestore).

---

## Instrucciones de uso (repositorio plantilla)

> Nota: Estas instrucciones aplican al flujo de **clonar el reto original**; si ya trabajas en un repo propio, basta con `git clone` tu remoto, `npm install` y `npm run dev`.

```bash
# Ejemplo: clonar reto base
git clone https://github.com/xaca/reto_fullstack.git
# (Opcional) evitar mezclar historial: borrar .git e inicializar repo nuevo
# rm -rf .git   # Linux/macOS
# git init
# git add .
# git commit -m "Initial commit"
# Añadir remoto a GitHub y push según el curso
npm install
npm run dev
```

---

## Instrucciones paso a paso

### Paso 1: Plantilla de referencia (visual)

- Visitar p. ej. [ThemeWagon](https://themewagon.com/) y descargar una plantilla de ecommerce **solo como inspiración**.
- Primer commit sugerido: `docs: template de referencia seleccionada`.

### Paso 2: Configuración del proyecto

- Asegurar que la app arranca: `npm install` y `npm run dev`.
- Incluir dependencias del stack (p. ej. Tailwind, Zustand, cliente HTTP).
- Primer commit sugerido: `feat: proyecto inicial con React y Tailwind`.

### Paso 3: Mockdata

- Carpeta `src/mockdata/`: `products`, `users`, `categories`.
- Commits sugeridos: `feat: mockdata de productos`, `feat: mockdata de usuarios`.

### Paso 4: Atomic Design

- Estructura: `components/atoms`, `molecules`, `organisms` (y opcional `templates`).

### Paso 5: Zustand

- Store de productos, carrito, persistencia con middleware en localStorage si aplica.

### Paso 6: Galería con mock

- `ProductGallery` con grid responsivo y “agregar al carrito”.

### Paso 7: Carrito

- Listado, cantidades, total, eliminar ítems.

### Paso 8: Búsqueda

- Input en header; filtrado en tiempo real.

### Paso 9: Paginación

- Páginas (p. ej. 6–12 productos por página) y controles de navegación.

### Paso 10: Registro y sesión

- Formularios, usuario en el header, logout.

### Paso 11: Checkout

- Resumen, datos de usuario, total, confirmar (vaciar carrito).

### Paso 12: Diseño responsivo

- Revisar móvil, tablet y desktop (breakpoints Tailwind).

### Paso 13: API real (opcional en el guión; recomendable completarlo)

- Sustituir o combinar con API REST (Fake Store): `GET /products`, etc.

### Paso 14: Firebase (bonus)

- Authentication, Firestore, historial de pedidos, etc.

### Paso 15: Pruebas y deploy

- Probar en navegadores, optimizar; desplegar (Vercel, Netlify, Firebase Hosting, etc.).

---

## Tips importantes

- Empezar con **mockdata** para fijar estructura sin depender al 100% de la red.
- **Zustand** simplifica el estado frente a Context en proyectos de este tamaño.
- **Commits frecuentes** (el reto pide mínimo 30).
- Probar **tamaños de pantalla** mientras se desarrolla.
- Tratar **Firebase** como mejora una vez resuelto el flujo local.

---

## Información de interés / enlaces

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [ThemeWagon (plantillas)](https://themewagon.com/)
- [Fake Store API](https://fake-store-api-docs.vercel.app/)
- [Firebase](https://firebase.google.com/docs)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Diseño responsivo (MDN, ES)](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)

---

## Statement (English)

Develop a fullstack web application for an online store that consumes a **REST API** with: user registration and session, dynamic product gallery, pagination, real-time search, shopping cart, and checkout preview. Minimum **30 commits**; evaluation covers practices, code quality, responsive UI, correct behavior, accessible modern UI, and atomic design. Reuse with citation allowed; **individual** work.

---

## Step by step (English)

The original guide mirrors the Spanish steps: reference template, setup, mock data, atomic components, Zustand stores, gallery, cart, search, pagination, auth, checkout, responsive design, real API, optional Firebase, test and deploy. See the Spanish [Instrucciones paso a paso](#instrucciones-paso-a-paso) section for detail.

---

## Resources (English)

- [React](https://react.dev/) · [Tailwind](https://tailwindcss.com/) · [Zustand](https://zustand.docs.pmnd.rs/) · [Fake Store API](https://fake-store-api-docs.vercel.app/) · [Firebase](https://firebase.google.com/docs) · [Vite](https://vitejs.dev/) · [Axios](https://axios-http.com/)

---

*Contenido adaptado a partir de la guía del reto del curso; conserva el espíritu del taller para consulta y autoevaluación.*
