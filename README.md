# React + Vite

## API de Laravel

En desarrollo, Vite reenvía `/api/v1` a `http://127.0.0.1:8000`. Inicia el
backend Laravel en ese puerto antes de probar productos y categorías. Si el
backend usa otro puerto, actualiza el destino del proxy en `vite.config.js`.

Al publicar el frontend, configura `VITE_API_URL` en el entorno de compilación
con la URL pública de la API, incluyendo `/api/v1` (por ejemplo,
`https://api.ejemplo.com/api/v1`). No uses `localhost` ni `127.0.0.1` para una
web pública: esas direcciones apuntan al equipo de cada visitante. El servidor
de la API también debe permitir solicitudes desde el dominio del frontend.

Los descuentos del catálogo de demostración tienen fechas de vigencia en
`src/data/productosData.js`. La administración persistente de promociones
requiere que el backend exponga la tabla y los endpoints descritos en
`MODELO-DATOS-NUTRIK.md`.

Las fichas `/Productview/:id` muestran productos relacionados y recetas de
Nutribot. El asistente adapta sus sugerencias con el perfil disponible y
reacciona cuando un producto se agrega al carrito; las recetas son ideas
generales y no sustituyen indicaciones médicas ni la revisión de la etiqueta.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
