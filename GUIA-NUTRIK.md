# NUTRIK — Guía completa del proyecto

Documento de referencia técnica. Explica **cada archivo** del proyecto desde cero,
asumiendo que **no sabes programar**.

---

# PARTE 1 — LOS FUNDAMENTOS

## 1.1 ¿Qué es una página web?

Es un archivo de texto (HTML) que el navegador (Chrome, Safari, Firefox) dibuja en
la pantalla. Cuando haces clic en algo, se vuelve a "dibujar". Nutrik es una
**aplicación web**: todo lo que ves se ejecuta dentro de tu navegador, no en un
servidor propio.

## 1.2 Los 3 lenguajes que necesitas

| Lenguaje | Para qué | Ejemplo en Nutrik |
|---|---|---|
| **HTML** (.jsx y .css no, sino la *estructura*) | Etiquetas que describen qué hay | `<h1>Hola</h1>`, `<img src=...>` |
| **CSS** (.css) | Cómo se ve: colores, tamaños, espacios | `.header-container { background: white; }` |
| **JavaScript** (.jsx) | La lógica: qué pasa al hacer clic | `agregarProducto(producto)` |

**Regla mental:** cada pantalla necesita las 3. Un archivo `.jsx` guarda la
estructura **y** la lógica. Un `.css` guarda solo el aspecto visual.

## 1.3 ¿Qué es un "componente"?

Un componente es **una pieza de la página guardada en su propio archivo**, con
nombre propio, que se puede reutilizar.

Ejemplo: `Navbar.jsx` es "la barra de navegación de arriba". `Footer.jsx` es "el
pie de página". Una vez escritos, se usan con una sola línea:

```jsx
import Navbar from './Components/Navbar';
// ...
<Navbar />
```

Cuando React ve `<Navbar />` en pantalla, busca el archivo `Navbar.jsx` y lo
dibuja ahí. Esa es toda la magia.

## 1.4 ¿Qué es JSX?

Es HTML con superpoderes. Parece HTML pero:

1. Puede pedir datos a JavaScript con `{variable}`.
2. Puede repetir bloques con `.map()`.
3. Puede ejecutar funciones: `{precioFinal(producto)}`.

```jsx
<h1>{user.nombreCompleto}</h1>
```

## 1.5 Los 3 conceptos que más se usan

### `useState` — memoria
Guarda un valor que **cambia con el tiempo** y hace que la pantalla se redibuje.

```jsx
const [carrito, setCarrito] = useState([]);
```
Se lee `carrito`, se cambia con `setCarrito(...)`. Al cambiar, React vuelve a
dibujar el componente.

### Props — propiedades
Un componente que acepta datos de afuera:
```jsx
function Home({ setMenuAbierto }) { ... }
```
Aquí `Home` recibe `setMenuAbierto`. Se llama a `<Home setMenuAbierto={setMenuAbierto} />`.

### `useEffect` — reacción
Código que se ejecuta **después** de dibujar, cuando algo cambió.
```jsx
useEffect(() => { window.scrollTo(0, 0); }, []);
```
El `[]` vacío significa "solo una vez, al entrar".

---

# PARTE 2 — LAS HERRAMIENTAS DEL PROYECTO

## 2.1 Node.js y npm

- **Node.js** es un programa instalado en tu computador que sabe ejecutar
  JavaScript **fuera del navegador**. Sin él, no se puede compilar nada.
- **npm** es el "administrador de tiendas" de Node. Con un comando trae las
  librerías que el proyecto necesita.

```bash
npm install     # descarga todo lo de node_modules
npm run dev     # arranca el servidor de desarrollo
npm run build   # genera la versión final para publicar
npm run lint    # revisa errores de código
npm run preview # prueba la versión ya compilada
```

## 2.2 `node_modules` — la carpeta que dijiste "Moodle"

**No es código tuyo.** Es la carpeta donde `npm` guarda **todas las librerías
descargadas**. Son como las piezas de unidos que llegaron en una caja.

**Reglas:**
- **Nunca la edites a mano.** Se regenera con `npm install`.
- **Nunca la subas a GitHub.** Por eso existe `.gitignore`.
- **Nunca la borres** pensando que es basura: sin ella el proyecto no arranca.

Tamaño típico en Nutrik: cientos de megabytes.

## 2.3 Vite — el servidor y el empaquetador

Vite cumple **tres** papeles:

1. **Servidor de desarrollo**: levanta la app en `http://localhost:5173` y la
   actualiza al instante mientras escribes (se llama *hot reload*).
2. **Traductor**: los navegadores no entienden `.jsx`. Vite los convierte a
   JavaScript normal.
3. **Empaquetador**: para `npm run build` junta y **minifica** (aplasta) todo en
   los archivos de `dist/`.

## 2.4 React — la librería base

Es la librería que permite construir interfaces por partes (componentes) y
redibujar solo lo que cambió.

Se usa con **JSX**, que es JavaScript que devuelve HTML:

```jsx
function Saludo() {
  return <h1>Hola</h1>;   // "return" = devuelve lo que se ve
}
```

## 2.5 React Router — las rutas (las "páginas")

Sin esto, un sitio web sería un archivo. Con esto, cada dirección URL muestra
distinta pantalla.

```jsx
<Route path="/login" element={<Login />} />
```
Significa: "si la dirección es `/login`, dibuja el componente `Login`".

| Concepto | Significado |
|---|---|
| `path="/login"` | La dirección en el navegador |
| `element={<Login />}` | Qué se dibuja |
| `path=":id"` | Parámetro variable (ej. `/Productview/creatine` → `id = "creatine"`) |
| `path="*"` | **Cualquier ruta que no exista** (la 404) |
| `<Outlet />` | Hueco donde entra la página hija dentro de un layout |

Navegar **sin recargar la página**:
- `<Link to="/ruta">texto</Link>` — enlace
- `navigate("/ruta")` — desde código (una función)

> ⚠️ Un `<a href="/ruta">` normal **sí** recarga toda la página. En Nutrik el
> `Footer` usa `<a>`, por eso se siente más lento al hacer clic ahí.

## 2.6 Recharts — los gráficos

Librería de **gráficas** (barras, líneas, tortas). Solo se usa en
`src/Pages/Dashboard/Dashboard.jsx`.

```jsx
<BarChart data={datos}>
  <Bar dataKey="ventas" />
</BarChart>
```
| Parte | Qué es |
|---|---|
| `BarChart` / `LineChart` / `PieChart` | El tipo de gráfica |
| `data={...}` | Los números a dibujar |
| `<Bar dataKey="ventas" />` | Una serie: "la columna clave `ventas`" |
| `dataKey` | El nombre del campo dentro de cada objeto |

## 2.7 Tailwind CSS — la librería de diseño (ver `TAILWIND-CSS.md`)

La pediste explicada aparte porque es el tema central. Está en
**[`TAILWIND-CSS.md`](./TAILWIND-CSS.md)**.

Resumen: Tailwind es una librería que **reemplaza escribir CSS a mano** por
escribir clases directamente en el HTML. En vez de un archivo con
`.boton { background: green; }`, escribes `className="bg-green-500"`.

---

# PARTE 3 — ESTRUCTURA DE CARPETAS

```
Proyecto-Nutrik/
├── index.html          ← el archivo que Vite carga primero
├── package.json        ← lista de librerías y comandos
├── package-lock.json   ← versiones exactas (no se edita)
├── vite.config.js      ← configuración de Vite
├── eslint.config.js    ← reglas de calidad de código
├── README.md           ← (por defecto de Vite, sin personalizar)
├── .gitignore          ← qué NO se sube a Git
│
├── public/             ← archivos que se copian tal cual a la web
│   ├── favicon.svg
│   └── icons.svg
│
├── src/                ← AQUÍ vive TODO el código real
│   ├── main.jsx        ← punto de entrada
│   ├── App.jsx         ← todas las rutas
│   ├── index.css       ← estilos globales
│   ├── global.css      ← configuración de Tailwind
│   ├── App.css         ← archivo VACÍO
│   │
│   ├── Context/        ← "memoria compartida" de la app
│   │   ├── authContext.js
│   │   └── AuthProvider.jsx
│   │
│   ├── data/           ← los datos (catálogo)
│   │   └── productosData.js
│   │
│   ├── Components/     ← piezas reutilizables
│   │   ├── Home.jsx / Home.css
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── Footer.jsx / Footer.css
│   │   ├── Header.jsx
│   │   ├── HeaderVendedor.jsx
│   │   ├── SidebarVendedor.jsx / SidebarVendedor.css
│   │   ├── VendedorLayout.jsx
│   │   └── layout/CategoriasLayout.jsx
│   │
│   ├── Pages/          ← las pantallas
│   │   ├── NotFound.jsx            (404)
│   │   ├── Product.jsx / Product.css        (versión vendedor)
│   │   ├── Productview.jsx                  (versión vendedor)
│   │   ├── Inicio/       RoleSelection
│   │   ├── Catalog/      Frozen, Snacks
│   │   ├── Cliente/      11 pantallas del cliente + carrito
│   │   ├── Vendedor/     Login, Register, Pedidos, Dashboard(muerto)
│   │   └── Dashboard/    Dashboard del vendedor
│   │
│   └── assets/         ← 32 imágenes (logos, íconos, fotos)
│
├── dist/               ← resultado de npm run build (NO es fuente)
└── Proyecto-Nutrik-master/  ← ⚠️ COPIA DENTRO DEL PROYECTO
```

## 3.1 La carpeta que sobra: `Proyecto-Nutrik-master/`

Dentro de tu proyecto hay **una copia completa de otra versión** (con su propio
`package.json`, `node_modules`Ignored, `src/`, etc.). **No se usa para nada.**

**Consecuencia real:** rompe el linter, porque `npm run lint` revisa también
esas carpetas y encuentra errores en archivos que nadie está tocando. Y confunde
al buscar cosas. Se puede borrar cuando quieras.

---

# PARTE 4 — LOS ARCHIVOS DE LA RAÍZ

## 4.1 `index.html`

Es lo **único** que el navegador pide primero. Hoy dice:

```html
<title>y</title>          ← ⚠️ el título de la pestaña es "y". Debería ser "Nutrik"
<link rel="icon" href="/favicon.svg" />
<div id="root"></div>     ← el hueco donde React dibuja todo
<script type="module" src="/src/main.jsx"></script>
```

El `<div id="root">` es la pieza clave: React **vacía ese div** y lo reemplaza con
toda la aplicación. Por eso en `index.html` no hay nada de Nutrik.

## 4.2 `package.json` — el inventario del proyecto

```json
{
  "name": "nutrik",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite", "build": "vite build",
    "lint": "eslint .", "preview": "vite preview"
  }
}
```

**Dependencias** (las usa la app):

| Librería | Versión | Para qué |
|---|---|---|
| `react` | ^19.2.5 | La base de la interfaz |
| `react-dom` | ^19.2.5 | Pegar React dentro de la página HTML |
| `react-router-dom` | ^7.15.0 | Las rutas / páginas |
| `recharts` | ^3.10.1 | Los gráficos del dashboard |
| `tailwindcss` | ^4.3.3 | El diseño con clases |
| `@tailwindcss/vite` | ^4.3.3 | El plugin que conecta Tailwind con Vite |

**DevDependencies** (solo para trabajar, no para publicar):

| Librería | Para qué |
|---|---|
| `vite` ^8.0.10 | El servidor y el empaquetador |
| `@vitejs/plugin-react` ^6.0.1 | Enciende React dentro de Vite |
| `eslint` ^10.2.1 | Revisa errores |
| `eslint-plugin-react-hooks` | Revisa errores de `useState`/`useEffect` |
| `eslint-plugin-react-refresh` | Revisa que los componentes estén bien separados |
| `@eslint/js` | Reglas base de ESLint |
| `globals` | Define `window`, `document`, etc. |
| `@types/react`, `@types/react-dom` | Tipos (restos de TypeScript, no se usan) |

> El símbolo `^` significa "esta versión o cualquier más reciente **menor**".
> Ej: `^19.2.5` permite la 19.9.0, pero no la 20.0.0.

## 4.3 `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Solo dos plugins: uno enciende React, el otro enciende Tailwind.

## 4.4 `eslint.config.js`

Define las reglas de "código bien escrito". Por eso `npm run lint` se queja de
variables importadas que nunca se usan: son **señales de que algo quedó
suelto**.

## 4.5 `.gitignore`

Le dice a Git qué **no** subir. Típicamente: `node_modules`, `dist`, `.DS_Store`.

## 4.6 `public/`

Lo que está aquí se **copia literal** a la raíz del sitio publicado. No se
procesa.

- `favicon.svg` — el ícono de la pestaña. ⚠️ **Es el logo morado de React, no el
  de Nutrik.** Sobró de la plantilla y nadie lo cambió.
- `icons.svg` — íconos de redes sociales de la plantilla de Vite. **No lo usa
  ningún archivo.** Sobró.

## 4.7 `dist/`

Lo genera `npm run build`. Contiene la versión optimizada para subir a un hosting.
Es una **salida**, no fuente: se puede borrar y volver a crear.

---

# PARTE 5 — `src/` — EL CORAZÓN

## 5.1 `src/main.jsx` — el punto de entrada

```jsx
import './index.css';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

Lee esto como capas (**envolturas**). Cada capa envuelve a la siguiente:

```
React.StrictMode      ← avisa si escribes código con problemas
└── BrowserRouter      ← sabe qué URL estás viendo
    └── AuthProvider   ← guarda quién está conectado
        └── App        ← dibuja la pantalla correcta
```

`StrictMode` en desarrollo **muestra los avisos dos veces a propósito**, para que
detectes errores que solo aparecerían una vez. No es un bug.

## 5.2 `src/App.jsx` — el mapa de rutas

Es el archivo más importante para entender la navegación.

### La envoltura del carrito

```jsx
<CartProvider>
  <CartPanel />      ← el panel lateral, existe en TODAS las páginas
  {mostrarLayout && <Navbar ... />}
  <Routes> ... </Routes>
  {mostrarLayout && <Footer />}
</CartProvider>
```

`CartProvider` envuelve **todo**, para que el carrito esté disponible en
cualquier pantalla.

### El interruptor `mostrarLayout`

```jsx
const pathActual = location.pathname.toLowerCase();
const mostrarLayout =
  !pathActual.includes('login') &&
  !pathActual.includes('registro') &&
  !pathActual.includes('forgot') &&
  !pathActual.includes('elegir-rol') &&
  !pathActual.includes('vendedor');
```

Si la URL contiene alguna de esas palabras, **no** se dibuja el Navbar ni el
Footer. Esos son "screens completos" que ocupan toda la página.

> ⚠️ **Trampa:** el chequeo es por *texto*, no por ruta exacta. Cualquier URL
> futura que contenga la palabra "login" u otra de esas perdería la barra.

### Mapa completo de rutas

| URL | Qué dibuja |
|---|---|
| `/` | `Home` — portada |
| `/header` | `Header` — encabezado con buscador |
| `/elegir-rol` | `RoleSelection` — ¿comprar o vender? |
| `/login` | `Login` (cliente) |
| `/registro` | `Register` (cliente, 3 pasos) |
| `/forgot-password` | `ForgotPassword` |
| `/perfil` | `Perfil` |
| `/vendedor/login` | `LoginVendedor` |
| `/vendedor/registro` | `RegisterVendedor` |
| `/vendedor` | **`VendedorLayout`** ← el marco con menú lateral |
| `/vendedor/dashboard` | `Dashboard` (gráficas) |
| `/vendedor/productos` | `Productos` (catálogo del vendedor) |
| `/vendedor/productos/:id` | `Vistaproducto` |
| `/vendedor/pedidos` | `Pedidos` ← lista de pedidos |
| `/vendedor/facturas` | Placeholder "Próximamente…" |
| `/vendedor/clientes` | Placeholder |
| `/vendedor/ventas` | Placeholder |
| `/vendedor/configuracion` | Placeholder |
| `/catalog` | **`CategoriasLayout`** ← marco de categorías |
| `/catalog/frozen` | `Frozen` (congelados) |
| `/catalog/snacks` | `Snacks` |
| `/contact` | `Contact` (formulario PQR) |
| `/discount` | `Discount` (productos rebajados) |
| `/descuentos` | `Discount` (misma pantalla, segundo nombre) |
| `/checkout` | `Checkout` (pagar) |
| `/productos` | `Product` (catálogo cliente) |
| `/Productview/:id` | `Productview` (detalle) |
| `/newproduct` | `Newproduct` (novedades) |
| `*` (cualquier otra) | `NotFound` (404) |

**Rutas anidadas:** `/vendedor` y `/catalog` son "contenedores". Dibujan su
propio marco y, en el hueco `<Outlet />`, meten la página hija.

## 5.3 `src/index.css` — los estilos globales

Define **variables CSS** (colores y fuente con nombre) y estilos base para TODO
el sitio:

```css
:root {
  --fondo-crema: #f1f5e8;
  --verde-nutrik: #91c13e;
  --verde-oscuro: #1b300b;
  --fuente-principal: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
```

`:root` significa "esto vale para toda la página". Después cualquier archivo puede
usar `var(--verde-nutrik)` en vez de escribir `#91c13e`.

También pone el fondo con degradado, quita el subrayado de los `<a>` y hace que
las imágenes no se salgan de su caja (`max-width: 100%`).

## 5.4 `src/App.css` — vacío

Tiene 0 bytes, pero `App.jsx` lo importa. No hace nada. Se puede borrar junto con
su línea de import.

## 5.5 `src/global.css` — Tailwind

Contiene solo 14 líneas. Es la configuración de la librería de diseño.
**Explicado en detalle en [`TAILWIND-CSS.md`](./TAILWIND-CSS.md).**

---

# PARTE 6 — `src/Context/` (la memoria compartida)

## 6.1 ¿Qué es un Context?

Imagina un hospital. En vez de pasar un expediente **de mano en mano** entre 40
habitaciones, se deja en un archivador central y cada quien lo pide cuando lo
necesita.

Un **Context** es ese archivador: un dato guardado arriba que cualquier pantalla
puede leer sin que se lo tengan que pasar.

## 6.2 `authContext.js` — el archivador vacío

```jsx
const AuthContext = createContext(null);

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
```

Aquí solo se **declara** el archivador y se crea el acceso (`useAuth`). Todavía
no se guarda nada.

> El `if (!ctx) throw` es una protección: si alguien usa `useAuth()` fuera del
> provider, se detiene con un mensaje claro en vez de fallar raro.

## 6.3 `AuthProvider.jsx` — el archivador con la información

Aquí está toda la lógica de usuarios.

### Dónde se guardan los datos

Nutrik **no tiene servidor ni base de datos**. Todo vive en el
**`localStorage`** del navegador: un almacén de texto que sobrevive al cerrar el
navegador.

Dos claves:

| Clave | Contenido |
|---|---|
| `nutrik_users` | Lista de **todos** los usuarios registrados |
| `nutrik_session` | El correo de **quién está conectado** |

### Las cuentas de demostración

```js
const DEMO_ACCOUNTS = [
  { id: 'juliana@nutrik.com', role: 'cliente', password: 'juliana123', ... },
  { id: 'tienda@nutrik.com',  role: 'vendedor', nombreNegocio: 'Tienda Nutrik', password: 'tienda123', ... },
];
```

> 🔑 **Cliente:** `juliana@nutrik.com` / `juliana123`
> 🔑 **Vendedor:** `tienda@nutrik.com` / `tienda123`

Estas se usan solo si el `localStorage` está vacío. Si ya registraste usuarios, se
usan los tuyos.

### Las 6 funciones

| Función | Qué hace |
|---|---|
| `login(email, password)` | Busca la cuenta, compara la clave, guarda la sesión. Devuelve `{ok:true}` o `{ok:false, error:"..."}` |
| `register(role, data)` | Crea un usuario, lo **loguea de una**, y lo guarda |
| `updateProfile(cambios)` | Modifica los datos del usuario conectado |
| `logout()` | Borra la sesión |
| `existeCuenta(email)` | Solo revisa si el correo existe (para recuperar clave) |
| `resetPassword(email, nueva)` | Cambia la clave y **cierra la sesión** |

**Patrón importante:** casi todas devuelven un objeto
`{ ok: boolean, error?: string }`. Así la pantalla puede preguntar:
```jsx
const res = login(correo, contrasena);
if (!res.ok) { setError(res.error); return; }
```

**Detalle de seguridad (a medias):** al guardar la sesión se hace
`delete copia.password` — la clave **no** se guarda en memoria mientras el
usuario está conectado. Pero sí queda escrita en texto plano dentro de
`nutrik_users`. Para un proyecto escolar está bien; para producción **no**.

---

# PARTE 7 — `src/data/productosData.js` (el catálogo)

Un solo archivo con **todos** los productos. Existe para que el carrito, la
tienda, los descuentos y las categorías **muestren siempre los mismos precios**.

## 7.1 Los 22 productos

Están en un arreglo `PRODUCTOS`. Cada uno tiene:

```js
{
  id: "creatine",                        // clave única
  nombre: "Creatina Monohidratada",
  descripcion: "Suplemento premium...",
  precio: 85000,                         // en pesos colombianos, número pelado
  imagen: "https://...",                 // URL de internet
  etiqueta: "",                          // "", "nuevo" o "descuento"
  descuento: 22,                         // solo en algunos (es un %)
}
```

| Grupo | Cantidad | Condición |
|---|---|---|
| Tienda | 10 | `etiqueta: ""` |
| Nuevos | 10 | `etiqueta: "nuevo"` |
| Descuentos | 2 | `etiqueta: "descuento"` + campo `descuento` |

> Las **imágenes son URLs de internet** (Pinterest, Unsplash, una tienda). No hay
> archivos de imagen en el proyecto para los productos. Si el equipo borra una de
> esas imágenes, se rompe sola.

## 7.2 Las 5 funciones auxiliares

| Función | Qué hace | Ejemplo |
|---|---|---|
| `precioFinal(p)` | Aplica el descuento y redondea | precio 106000, −22% → **82880** |
| `formatearPrecio(v)` | Le pone puntos de miles | `85000` → `"85.000"` |
| `productosTienda` | Filtro: los que no tienen etiqueta | 10 productos |
| `productosNuevos` | Filtro: `etiqueta === "nuevo"` | 10 productos |
| `productosDescuento` | Filtro: `etiqueta === "descuento"` | 2 productos |
| `buscarProducto(id)` | Busca **uno** por su id | `buscarProducto("creatine")` |

**`.filter()`** = "quédame solo los que cumplen esto".
**`.find()`** = "búscame **el primero** que cumpla esto".

---

# PARTE 8 — `src/Components/` (piezas reutilizables)

## 8.1 `Navbar.jsx` — la barra de navegación

Es el archivo más complejo de la interfaz pública.

### Las dos "tapas" del menú lateral

```jsx
const [menuAbierto, setMenuAbierto] = useState("");
```
Guarda un **texto**, no un sí/no:
- `""` → cerrado
- `"categoria"` → panel de categorías
- `"dietas"` → panel de dietas
- `"productos"` → panel de productos

Los tres paneles se dibujan con tres `<div>` que se muestran si
`menuAbierto === "..."`. Solo dos se abren:
`menuAbierto === "productos"` **nunca se activa** (no hay botón que lo ponga).
Es código muerto.

### Las categorías del panel

| Link | ¿Existe la ruta? |
|---|---|
| `/catalog/frozen` | ✅ Sí |
| `/catalog/snacks` | ✅ Sí |
| `/frutas` | ❌ **404** |
| `/aves-pescado` | ❌ **404** |
| `/lacteos-huevos` | ❌ **404** |
| `/cereales-granos` | ❌ **404** |
| `/vitaminas` | ❌ **404** |
| `/suplementos` | ❌ **404** |

Lo mismo las 8 dietas (Keto, Vegana, Fitness, etc.): **todas dan 404.**

> Por eso se creó la página `NotFound`: sin ella el usuario veía una pantalla
> **en blanco**, que parece un error grave.

### El menú de usuario

Un detalle fino: `useEffect` + `document.addEventListener('mousedown', ...)`
detecta el clic **por fuera** del menú para cerrarlo. Y el `return` de ese
`useEffect` **limpia** el listener al desmontar, para no acumular eventos.

Las iniciales (`JA` para Juliana Gómez) se calculan con `.split(' ')`, `.map()`,
`.slice(0, 2)` y `.join('')`.

### El carrito del Navbar

```jsx
const { totalItems, setCarritoAbierto } = useCart();
...
{totalItems > 0 && <span className="carrito-badge">{totalItems}</span>}
```

## 8.2 `Footer.jsx` — el pie de página

Columnas de logo, información, ayuda y redes.

⚠️ **Usa `<a href="...">` en vez de `<Link>`.** Cada clic **recarga la página
entera** y por eso los enlaces se sienten lentos.

⚠️ **7 de sus 8 enlaces no existen** (`/nosotros`, `/contacto`, `/servicio`,
`/pedidos`, `/horarios`, `/terminos`, `/datos`) → todos dan 404. Además
`/contacto` no coincide con la ruta real, que es `/contact`.

## 8.3 `Home.jsx` — la portada

Ocho secciones, todas con CSS escrito a mano en `Home.css`:
**hero**, **beneficios**, **productos destacados**, **pasos de compra**,
**indicadores** (números), **newsletter** y **CTA final**.

Dos cosas que conviene saber:
- Los productos destacados están **escritos a mano** en el JSX. **No** vienen de
  `productosData.js`. Si agregas un producto al catálogo, **no** aparece aquí.
- Las imágenes son URLs de Unsplash escritas directamente.
- Las imágenes de `hero` usan un **`<div className="circulo">` superpuesto**
  (técnica de recorte circular).
- Los botones del CTA final (`Comenzar compra`, `Ver catálogo`) **no tienen
  `onClick`**: no hacen nada.

> El linter marca `setMenuAbierto` como variable sin usar: `App.jsx` se la pasa a
> `Home`, pero `Home` nunca la llama.

## 8.4 `Header.jsx` — el encabezado con buscador

**Este archivo usa Tailwind** (ya no tiene `Header.css`).

```jsx
<header className="flex w-full flex-col bg-white shadow-[...]">
  <div className="flex items-center justify-between gap-5 px-10 py-2.5">
```
Traducción: *"una caja blanca, en columna, con sombra; dentro, una fila con el
logo a la izquierda, un buscador que crece al centro, y los íconos a la
derecha."*

El detalle esta en `TAILWIND-CSS.md`.

⚠️ El `<form>` del buscador **no tiene acción**: al dar Enter o clic, la página
se recarga sin buscar nada. Es visual.

## 8.5 `SidebarVendedor.jsx` — el menú del panel de vendedor

La pieza con la corrección más importante de este proyecto. Usa **`NavLink`** en
vez de `Link`:

```jsx
<NavLink to="/vendedor/dashboard"
  className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}>
```

`NavLink` sabe si **tú estás actualmente** en esa ruta y entrega una función que
devuelve `true` o `false`. Con eso el ítem activo se pinta distinto.

> Antes usaba `Link` con una clase fija, así que **nada se resaltaba nunca** al
> navegar. Este archivo se corrigió.

Al final, el botón "Cerrar sesión" llama `logout()` y `navigate('/')`.

## 8.6 `VendedorLayout.jsx` — el marco del panel

```jsx
<div className="vendedor-layout">
  <SidebarVendedor />
  <main className="vendedor-main">
    <HeaderVendedor />
    <div className="vendedor-content">
      <Outlet />       ← aquí entra la página
    </div>
  </main>
</div>
```

Es el concepto de **layout**: un marcofijo (menú + cabecera) alrededor de una
página que cambia. Se usa para las 8 rutas `/vendedor/*`.

## 8.7 `HeaderVendedor.jsx` — la cabecera del panel

Muestra "Nutrik Vendedor", una campana con **3 notificaciones escritas a mano**
(no son reales) y el nombre del negocio.

## 8.8 `layout/CategoriasLayout.jsx` — el marco de categorías

Hoy solo envuelve un `<Outlet />` en un div. Importa `Navbar` pero **no lo usa**
(el linter lo marca). El Navbar real lo pone `App.jsx`.

---

# PARTE 9 — `src/Pages/` (las pantallas)

## 9.1 Cliente

### `Cliente/Login.jsx` — entrar como cliente
- Estados: `correo`, `contrasena`, `verClave`, `error`.
- `verClave` alterna el input entre `password` y `text` (el botón del ojo).
- Llama a `login()`; si falla, muestra el error; si funciona, `navigate('/perfil')`.
- Incluye 3 íconos **SVG escritos a mano** (correo, candado, Google).
- **Muestra la cuenta demo escrita en la pantalla.**
- ⚠️ El botón "Iniciar sesión con Google" **no hace nada**: no hay Google OAuth
  implementado.

### `Cliente/Register.jsx` — registrarse (3 pasos)

El formulario más complejo del cliente. Usa un solo objeto `form` con 19 campos
y un contador `paso` (1, 2, 3).

| Paso | Qué pide |
|---|---|
| 1 | Datos personales: 4 nombres, correo, teléfono, fecha, género |
| 2 | Peso, estatura, actividad, objetivo, frecuencia, nivel, horario |
| 3 | Alergia, dieta, restricciones, contraseña ×2 |

**Validación por pasos:** `validarPaso()` revisa solo el paso actual. Si algo
falta, muestra el error y **no avanza**.

Dos validadores con lógica propia:
```jsx
// Estatura: convierte "170" en "1.70"
let valor = e.target.value.replace(/[^\d]/g, '');
if (valor.length > 1) valor = valor.charAt(0) + '.' + valor.slice(1, 3);

// Peso: agrega " kg" solo
if (valor.length > 0) valor = valor + ' kg';
```

`manejarEstatura` tiene un detalle: escribe el punto, pero si borras y reescribes,
el segundo punto se cuela. Es un bug menor.

**El correo se valida con una expresión regular:**
```jsx
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```
Se lee: "algo, luego un @, luego algo con un punto, sin espacios".

**Transformación final:** si eligió "otra alergia" escribe el texto libre; si no,
guarda la opción elegida:
```jsx
alergia: form.alergia === 'otro' ? form.alergia : form.alergia   // (simplificado)
```

**En el paso 2 hay campos que `validarPaso` NO exige** (`frecuencia`, `nivel`,
`horario`) aunque el `<select>` tenga `required`. El `required` los pide igual, así
que en la práctica sí son obligatorios.

### `Cliente/Perfil.jsx` — mi perfil
- Si no hay sesión: `<Navigate to="/elegir-rol" replace />` (te echa).
- **Dos modos** controlados por `editando`: ver y editar.
- **Subir foto con `FileReader`:** valida que pese menos de 2 MB, la lee como
  Base64 (`readAsDataURL`) y la guarda en el usuario. Un slider permite mover el
  encuadre con `objectPosition`.
- Calcula iniciales del nombre para el avatar.
- `updateProfile()` guarda y muestra "¡Perfil actualizado!" 3 segundos.

> El `<input type="file">` está oculto y un botón normal hace
> `inputFotoRef.current?.click()` para dispararlo. Truco clásico.

### `Cliente/ForgotPassword.jsx` — recuperar clave
Dos pasos: pide el correo → `existeCuenta()`; si existe, pasa a escribir la nueva
clave → `resetPassword()`. Exige mínimo 8 caracteres y que coincidan. Luego
redirige al login en 1.8 s.

### `Cliente/Cart.jsx` — ⭐ el carrito (3 cosas en un archivo)

Es la pieza más importante de la lógica del cliente.

**a) El Context (`CartProvider`)** — la memoria compartida

| Estado | Para qué |
|---|---|
| `carrito` | Lista de productos agregados |
| `carritoAbierto` | `true`/`false` del panel lateral |

| Función | Qué hace |
|---|---|
| `agregarProducto(p)` | Si ya existe, **suma 1**; si no, lo agrega con `cantidad: 1` |
| `eliminarProducto(id)` | Lo quita |
| `cambiarCantidad(id, delta)` | Suma o resta; **si llega a 0, desaparece** |
| `vaciarCarrito()` | Lo deja vacío (tras pagar) |
| `totalItems` | Suma **todas las cantidades** → el número del badge |
| `totalPrecio` | Suma `precio × cantidad` de cada producto |

Los dos `useMemo` evitan recalcular en cada redibujado.

**b) El hook `useCart()`** — el acceso
```jsx
export function useCart() { return useContext(CartContext); }
```
Con esto cualquier pantalla hace `const { agregarProducto } = useCart();`.

**c) `CartPanel`** — el panel visual
- Un overlay oscuro (clic fuera = cerrar).
- La lista de productos con `+` y `−`.
- El total y el botón "Pagar".
- **Un candado**: si pulsas "Pagar" sin sesión, aparece un aviso que manda a
  `/elegir-rol`.

> ⚠️ **El carrito NO se guarda en `localStorage`.** Si recargas la página,
> **se borra**. Solo sobrevive mientras no cambies de pestaña ni recargues.

**Sobre el `eslint-disable`:**
```jsx
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {...}
```
Se le dice al linter "ignora este archivo en esa regla", porque el archivo mezcla
el provider, el hook y el panel. Es correcto, pero lo ideal sería separarlo en
`CartContext.js`, `CartProvider.jsx` y `CartPanel.jsx`.

### `Cliente/Checkout.jsx` — pagar
- Si no hay sesión → pantalla de candado.
- Si el carrito está vacío → pantalla de carrito vacío.
- Si ya se compró → pantalla de éxito con **número de pedido generado al azar**:
  ```jsx
  const numero = "NUT-" + Math.floor(100000 + Math.random() * 900000);
  ```
- **Envío gratis** desde $100.000, si no $9.000.
- 3 métodos de pago (solo visuales; **no se conecta a ninguna pasarela real**).
- Al confirmar: muestra el número y vacía el carrito.

> El "pago" es **simulado**. No hay pasarela, ni base de datos, ni correo.

### `Cliente/Product.jsx` — catálogo del cliente
Mapea `productosTienda`, muestra badge de descuento, precio original tachado,
"Ver producto" y "Agregar".

### `Cliente/Productview.jsx` — detalle del producto
Usa `useParams()` para leer el `:id`, busca con `buscarProducto(id)`. Si no
existe: "Producto no encontrado".

⚠️ **Bug:** los botones "Comprar ahora" y "🛒 Agregar al carrito" ejecutan
**exactamente el mismo código**. Los dos solo agregan y abren el panel.

### `Cliente/Discount.jsx` — rebajas
Muestra solo `productosDescuento`, con el precio original tachado, el final y
**"Ahorras $X"**.

### `Cliente/Newproduct.jsx` — novedades
Mapea `productosNuevos`. Usa `useEffect` para subir la página al entrar.

### `Cliente/Contact.jsx` — contacto (PQR)
**Es el único archivo que se conecta a internet de verdad.** Envía el formulario
a:

```js
fetch('https://formsubmit.co/ajax/davidalexanderchangosantacruz@gmail.com', {...})
```

- Estado: `'idle' | 'sending' | 'success' | 'error'`.
- Incluye un **campo trampa** `name="_honey"` invisible (`className="hidden-field"`)
  para atrapar robots.
- Campos ocultos `_subject` y `_template`.

> `await` = "espera a que internet responda". Por eso el botón dice
> "Enviando...".

> ⚠️ El linter marca `Link` importado y no usado: sobró de una versión anterior.

## 9.2 Vendedor

### `Vendedor/Login.jsx` — entrar como vendedor
Igual al del cliente, pero con una **regla extra**:
```jsx
if (res.user && res.user.role !== 'vendedor') {
  setError('Esta cuenta es de cliente. Usa la opción "Quiero Comprar".');
  return;
}
```
Impide que un cliente entre por la puerta de vendedor. Muestra la cuenta demo
`tienda@nutrik.com / tienda123`.

### `Vendedor/Register.jsx` — registrar la tienda
Formulario **de una sola página** (no por pasos, a diferencia del cliente).
Campos: nombre del negocio, NIT, correo, teléfono, dirección, ciudad, tipo de
productos, descripción y contraseña ×2.

### `Vendedor/Pedidos.jsx` — ⭐ lista de pedidos

Trabajo reciente y el más pulido de la zona de vendedor.

- **4 pedidos de ejemplo** escritos a mano en una constante.
- **Filtros** por estado (Todos / Pendiente / Enviado / Entregado) y **buscador**
  por ID, cliente o fecha.
- **Tabla** con cliente, fecha, productos, total y botón de ver detalle.
- **Modal** con el detalle, donde se puede cambiar la cantidad con `+`/`−`.
- Botón **"Descartar pedido"** → `vaciarCarrito()`.
- Botón **"Marcar como enviado"** → agrega el ID a un arreglo local.

> ⚠️ **Lo más importante que debes saber:** esta pantalla **no lee pedidos
> reales**. Lee **`useCart()`**, es decir, **el carrito del propio navegador de
> quien la está viendo**. Y "marcar como enviado" solo escribe en una variable
> que se borra al recargar.
>
> No hay servidor, así que **no existe** un sistema real de pedidos. Es
> una maqueta funcional.

### `Vendedor/Dashboard.jsx` + `.css` — ⚠️ CÓDIGO MUERTO
Existe una **copia vieja del dashboard** en esta carpeta. `App.jsx` importa la de
`src/Pages/Dashboard/`. **Esta nunca se muestra** y se puede borrar.

## 9.3 `Dashboard/Dashboard.jsx` — el panel con gráficas

Es el archivo que usa **Recharts**.

- 4 tarjetas de indicadores (KPIs): ventas totales, pedidos, clientes, ingresos.
- **Rango de fechas** con botones (7 días, 30 días, 3 meses, año).
- Gráfica de barras de ventas por día.
- Gráfica de torta de productos más vendidos.
- Tabla de productos con stock bajo.
- Lista de últimos pedidos.

**Importante:** los datos son **ficticios y están escritos en el archivo**
(no vienen de ningún servidor). `useMemo` solo agrupa y filtra esos datos según
el rango elegido — **no consulta nada**.

## 9.4 `Inicio/RoleSelection.jsx` — elegir rol
Pantalla con dos tarjetas: "🛒 Quiero Comprar" (login/registro de cliente) y
"🏪 Quiero Vender" (login/registro de vendedor). Es el punto de entrada a las
dos puertas del sistema.

## 9.5 `Catalog/Frozen.jsx` y `Catalog/Snacks.jsx` — categorías

Ambas usan un **truco de dos fuentes**: tienen su propia lista pequeña **y**
buscan los datos reales en el catálogo.

```jsx
const productosSnacks = [
  { id: 1, productoId: "granola", nombre: "Granola Natural", imagen: granola },
  ...
];
// ...
const datos = buscarProducto(producto.productoId) || {};
```

Por eso **muestran el nombre de la lista local pero la descripción y el precio
del catálogo central**. `|| {}` evita que se rompa si un id no existe.

> ⚠️ `Frozen.jsx` **no tiene imágenes propias**: usa `datos.imagen` (URL de
> internet). `Snacks.jsx` sí usa 4 SVG locales.

## 9.6 `Product.jsx` y `Productview.jsx` (raíz) — versión vendedor

Copias casi idénticas a las de `Cliente/`, con **una diferencia clave**:

```jsx
const Productos = ({ rutaBase = "/Productview" }) => { ... }
...
<Link to={`${rutaBase}/${producto.id}`}>   ← usa la ruta que le pasaron
```

En `App.jsx`:
```jsx
<Route path="productos" element={<Productos rutaBase="/vendedor/productos" />} />
```
Así, dentro del panel del vendedor, "Ver producto" lleva a
`/vendedor/productos/creatine` en vez de salir del panel. Son **componentes
reutilizables parametrizados**.

## 9.7 `NotFound.jsx` — la página 404

**Migrada a Tailwind.** Decide a dónde mandar:
```jsx
const destino = user?.role === "vendedor" ? "/vendedor/dashboard" : "/";
```
Botones: ir al panel (vendedor) o al inicio (cliente), volver atrás, y un enlace
al catálogo.

## 9.8 `Pages/NotFound.css` y `Components/Header.css` — ya no existen

Se **borraron** al migrar esos dos componentes a Tailwind. Los borrados están
pendientes de commitear en Git.

---

# PARTE 10 — `src/assets/` (32 imágenes)

| Tipo | Archivos |
|---|---|
| Logos | `logoNutrick.png` (el principal), `logoN.svg`, `logo.svg` |
| Íconos de interfaz | `Carrito03.svg`, `Usuario.svg`, `Deseo.svg`, `Busqueda.svg`, `Tienda.svg`, `Nuevo.svg`, `Descuento.svg`, `Sugerencia.svg`, `Categoria.svg`, `Dieta.svg`, `Producto.svg` |
| Fotos de producto (SVG) | `granola.svg`, `frutos.svg`, `chia.svg`, `coco.svg`, `creatine.svg`, `detox.svg`, `colageno.svg`, `maca.svg`, `omega3.svg`, `yogur.svg` |
| Fotos grandes | `fondo.jpg`, `comida.jpg`, `hero.png`, `TazonComida.png` |
| Redes y país | `Tiktok.jpg`, `Instagram.jpg`, `Facebook.jpg`, `Colombia.jpg` |
| **Sobrantes** | `react.svg`, `vite.svg` ⚠️ (de la plantilla), `Categoria.svg`, `Dieta.svg` |

> Los SVG son imágenes vectoriales: se pueden agrandar sin pixelarse.
> **Los SVG de productos no se usan** — el catálogo toma las imágenes de URLs de
> internet. Solo 4 se usan (en `Snacks.jsx`).

**Cómo se importan:**
```jsx
import logo from '../assets/logoNutrick.png';
<img src={logo} alt="Nutrik" />
```
Vite convierte la ruta en un nombre único y lo sirve optimizado.

---

# PARTE 11 — CÓMO PROBAR TODO

```bash
cd /Users/macnueva/Documents/Proyecto-Nutrik
npm install     # solo la primera vez
npm run dev     # abre http://localhost:5173
```

## Rutas para probar

| Prueba | Ruta |
|---|---|
| Portada | `/` |
| Ver la pagina 404 | `/cualquier-cosa` |
| Elegir rol | `/elegir-rol` |
| Login cliente | `/login` → `juliana@nutrik.com` / `juliana123` |
| Login vendedor | `/vendedor/login` → `tienda@nutrik.com` / `tienda123` |
| Catálogo | `/productos` |
| Carrito | agrega algo y clic en el ícono 🛒 del Navbar |
| Pagar | con sesión iniciada |
| Gráficas | `/vendedor/dashboard` como vendedor |
| Pedidos | `/vendedor/pedidos` como vendedor |

## Dos comandos de diagnóstico

```bash
npm run build    # ¿compila sin errores?
npm run lint     # ¿el código está bien escrito?
```

**Ahora mismo:** `build` pasa ✅ · `lint` falla con **3 errores** ⚠️ (abajo).

---

# PARTE 12 — PROBLEMAS PENDIENTES

## 12.1 Los 3 errores del linter (menores, fáciles)

| Archivo | Línea | Problema | Solución |
|---|---|---|---|
| `Components/Home.jsx` | 5 | `setMenuAbierto` sin usar | borrar el parámetro en `App.jsx:66` |
| `Components/layout/CategoriasLayout.jsx` | 2 | `Navbar` sin usar | borrar el import |
| `Pages/Cliente/Contact.jsx` | 2 | `Link` sin usar | borrar el import |

## 12.2 Cosas que no funcionan (importante decirlo)

| Problema | Dónde |
|---|---|
| **15 enlaces del Navbar dan 404** (8 categorías + 7 dietas) | `Navbar.jsx` |
| **7 enlaces del Footer dan 404** | `Footer.jsx` |
| "Iniciar sesión con Google" no hace nada | `Login.jsx`, `Vendedor/Login.jsx` |
| El buscador del `Header` no busca nada | `Header.jsx` |
| Botones del CTA final no hacen nada | `Home.jsx` |
| El newsletter no guarda correos | `Home.jsx` |
| "Comprar ahora" y "Agregar" hacen lo mismo | `Cliente/Productview.jsx` |
| El carrito **se pierde al recargar** | `Cliente/Cart.jsx` |
| El panel de "Productos" del Navbar nunca abre | `Navbar.jsx` |
| Las notificaciones "3" son fijas | `HeaderVendedor.jsx` |
| Facturas / Clientes / Ventas / Configuración son "Próximamente" | `App.jsx` |

## 12.3 Límites de arquitectura (para la sustentación)

Esto **no son bugs**, es el alcance del proyecto. Pero conviene saberlo y
explicarlo:

1. **No hay base de datos ni servidor.** Todo está en `localStorage` del
   navegador. Si borras los datos del navegador, pierdes las cuentas.
2. **El "panel de vendedor" es una maqueta.** Los pedidos salen del carrito de
   quien está viendo, no de un sistema real de pedidos.
3. **El pago es simulado.** No hay pasarela (ni MercadoPago, ni Wompi, ni Stripe).
4. **No hay imágenes propias de producto.** El catálogo depende de URLs
   externas: si una cae, se rompe.
5. **Las contraseñas se guardan en texto plano** dentro de `localStorage`.
6. **La copia `Proyecto-Nutrik-master/`** está dentro del proyecto sin usarse.

## 12.4 Pendientes de Git (no he commiteado nada)

```
 M package.json          ← Tailwind agregado
 M package-lock.json
 M vite.config.js        ← plugin de Tailwind
 M src/main.jsx          ← import de global.css
 M src/Components/Header.jsx   ← migrado a Tailwind
 M src/Pages/NotFound.jsx      ← migrado a Tailwind
 D src/Components/Header.css    ← borrado (ya no hace falta)
 D src/Pages/NotFound.css       ← borrado (ya no hace falta)
?? src/global.css        ← nuevo, todavía sin trackear
```

---

# PARTE 13 — GLOSARIO RÁPIDO

| Término | Significado |
|---|---|
| **JSX** | HTML + JavaScript en un archivo `.jsx` |
| **Componente** | Pieza de UI en su propio archivo |
| **Props** | Datos que un componente recibe de afuera |
| **`useState`** | Memoria que redibuja al cambiar |
| **`useEffect`** | Código que corre después de dibujar |
| **`useMemo`** | Recordar un cálculo caro |
| **`useContext`** | Leer la memoria compartida |
| **Context / Provider** | La memoria compartida y quien la llena |
| **localStorage** | Almacén de texto permanente del navegador |
| **Ruta / Route** | "Si la URL es X, dibuja Y" |
| **Layout** | Marco fijo alrededor de páginas que cambian |
| **`Outlet`** | El hueco del layout donde entra la página hija |
| **Nesting** | Rutas dentro de rutas |
| **`.map()`** | Repetir un bloque por cada elemento de una lista |
| **`.filter()`** | Quedarse solo con los que cumplen una condición |
| **`.find()`** | Buscar el primero que cumple una condición |
| **`?.`** | "si existe, usa esto" (evita errores) |
| **Desestructuración** | `const { a, b } = objeto` → sacar valores |
| **Props drilling** | Pasar un dato por muchos componentes intermedios (el Context lo evita) |
| **Build** | Convertir el proyecto en archivos publicables |
| **Lint** | Revisar el estilo y buscar errores |
| **`npm run dev`** | Arrancar el servidor de desarrollo |
| **HMR** | Recargar solo lo que cambiaste, al instante |

---

# PARTE 14 — PARA SUSTENTAR (resumen en 60 segundos)

**Nutrik** es una aplicación web de comercio electrónico de productos saludables,
construida con **React 19** y **Vite 8**, con **tres tipos de usuario**: visitante,
cliente y vendedor.

**Arquitectura por capas:**
- **Presentación:** componentes en `src/Components/` y pantallas en `src/Pages/`.
- **Estado global:** dos Contexts de React — `AuthProvider` (usuarios y sesión) y
  `CartProvider` (carrito de compras) — que evitan pasar datos por prop drilling.
- **Datos:** un catálogo centralizado en `src/data/productosData.js` con 22
  productos, funciones de precio con descuento y formato de moneda colombiana.
- **Navegación:** React Router con rutas públicas, rutas de cliente, un panel de
  vendedor anidado con layout, categorías anidadas y una ruta `*` de 404.
- **Visualización:** Recharts para los gráficos del dashboard.
- **Diseño:** **Tailwind CSS v4** migrándose de forma progresiva desde CSS
  convencional, con un tema de marca propio en `src/global.css`.
- **Persistencia:** `localStorage` (sin servidor ni base de datos).

**Alcance:** la tienda, el carrito, el checkout y la autenticación son
funcionales; el panel de vendedor, el pago y el sistema de pedidos son
maquetas funcionales sobre datos locales.

---

Documento relacionado: **[`TAILWIND-CSS.md`](./TAILWIND-CSS.md)** — la librería
de diseño explicada desde cero.
