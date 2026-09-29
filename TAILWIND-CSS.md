# Tailwind CSS v4 — Guía completa desde cero

La librería de diseño instalada en Nutrik. Explicada para alguien que
**nunca ha programado**.

---

# 1. ¿QUÉ ES Y PARA QUÉ SIRVE?

## 1.1 El problema que resuelve

CSS a mano se escribe así. Creas un archivo y describes **cómo se ve** cada cosa:

**Archivo `boton.css`:**
```css
.boton-verde {
  background-color: #22c55e;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}
.boton-verde:hover {
  background-color: #16a34a;
}
```

Y en el HTML:
```jsx
<button className="boton-verde">Comprar</button>
```

Problemas:
1. Tienes que **inventar un nombre** para cada estilo.
2. Tienes que saltar entre **dos archivos** para cambiar un color.
3. Si 40 botones usan el mismo verde, tienes que buscar y reemplazar en 40 lados.

## 1.2 La solución de Tailwind

Tailwind **invierte** el orden: el estilo va **directo en la línea donde describes
el elemento**.

```jsx
<button className="bg-green-500 text-white px-6 py-3 rounded-lg border-none text-base cursor-pointer hover:bg-green-600">
  Comprar
</button>
```

**Sin archivo CSS. Sin inventar nombres. Todo a la vista.**

Y lo mejor: si quieres el botón rosado, cambias `green` por `pink`. Si lo quieres
más grande, cambias `py-3` por `py-5`. Sin buscar nada más.

## 1.3 La analogía

Imagina que CSS a mano es **dictionario**: para decir "verde" escribes la palabra
completa en un diccionario y la copias.

Tailwind es ** texting**: escribes `bg-green-500`. Es un código corto, siempre igual,
que ya sabes de memoria. No necesitas diccionario, solo conocer los códigos.

## 1.4 Las 3 ideas que lo hacen posible

### Idea 1: Utilidades diminutas
Cada clase hace **una sola cosa**:

| Clase | Qué hace |
|---|---|
| `flex` ||display: flex` (poner en fila) |
| `bg-white` | Fondo blanco |
| `p-4` | Relleno de 1rem |
| `rounded-lg` | Esquinas redondeadas |
| `text-2xl` | Letra grande |

Se **combinan** como piezas de LEGO.

### Idea 2: Valores con escala
Los números siguen una escala fija, para que todo Combine:

| Clase | Valor |
|---|---|
| `p-1` `p-2` `p-3` `p-4` `p-6` `p-8` `p-10` `p-12` | Relleno |
| `text-xs` `text-sm` `text-base` `text-lg` `text-xl` `text-2xl` | Tamaño de letra |
| `rounded-sm` `rounded` `rounded-md` `rounded-lg` `rounded-xl` `rounded-3xl` `rounded-full` | Redondeo |
| `w-1` … `w-full` | Ancho |
| `gap-2` `gap-4` `gap-8` | Separación |

En `1` = `0.25rem` = 4 píxeles. `4` = 1rem = 16 píxeles. `8` = 2rem = 32 píxeles.

### Idea 3: Responsive sinQuery
Con Responsive, el diseño se adapta solo:
- `p-4` — en móvil
- `sm:p-8` — desde 640px
- `md:p-12` — desde 768px
- `lg:p-16` — desde 1024px

---

# 2. CÓMO ESTÁ INSTALADO EN NUTRIK

## 2.1 Las piezas (ya instaladas)

En `package.json`:
```json
"tailwindcss": "^4.3.3",
"@tailwindcss/vite": "^4.3.3"
```

| Paquete | Función |
|---|---|
| `tailwindcss` | La librería en sí: lee tu código y genera el CSS |
| `@tailwindcss/vite` | El conector que le avisa a Vite que debe hacerlo |

En `vite.config.js`:
```js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## 2.2 `src/global.css` — el archivo de configuración

Así está ahora (son solo 14 líneas):

```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css";

@theme {
  --color-marca: #4eac36;
  --color-marca-50: #f1f6ee;
  --color-marca-100: #e8f5e9;
  --color-marca-200: #d8e2d4;
  --color-marca-600: #379754;
  --color-marca-700: #1f6a3d;
  --color-marca-texto: #2e7d32;
  --color-ink: #1a1a2e;
  --color-muted: #718096;
  --color-linea: #eef1ec;
  --color-campo: #f1f1f1;
  --color-neutra: #4a5d4f;
}
```

## 2.3 ⚠️ La decisión más importante: NO activamos el Preflight

Fíjate en que **NO** dice `@import "tailwindcss";` sino dos líneas separadas:

```css
@import "tailwindcss/theme.css" layer(theme);   /* los colores y medidas */
@import "tailwindcss/utilities.css";             /* las clases */
```

### ¿Por qué NO importar todo?

Porque `@import "tailwindcss"` (el atajo) trae un paquete extra llamado
**Preflight**.

**Preflight** es una capa de estilos que **reinicia todo** de la página:
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
h1 { font-size: inherit; font-weight: inherit; }
button { background: transparent; }
```
Básicamente dice: "olvídense de todo lo que el navegador hacía por defecto".

### El problema

Nutrik tiene **más de 30 archivos CSS escritos a mano** que **todavía no están
migrados**. Si se activara Preflight, todos esos estilos quedarían **roto** al
instante: los `margin` de las tarjetas, los tamaños de los `h1`, el fondo de los
`button`... todo.

### La decisión

Importar solo `theme` y `utilities`:
- ✅ **Sí** tenemos todas las clases de Tailwind.
- ✅ **No** se rompe nada de lo existente.
- 🔜 Cuando **todas** las pantallas estén migradas, se cambia a la línea completa
  y el proyecto queda más limpio.

### Cómo cambiarlo más adelante

```css
/* En el futuro */
@import "tailwindcss";   /* con Preflight incluido */
```
Y luego habría que revisar cada pantalla migrada, porque Preflight también toca
las que ya están en Tailwind.

---

# 3. LOS COLORES DE MARCA (`@theme`)

## 3.1 ¿Qué hace `@theme`?

`@theme` es el **almacén de variables** de Tailwind. Al declarar
`--color-marca-600: #379754;`, Tailwind **automáticamente** crea la clase
`bg-marca-600` y también `text-marca-600`, `border-marca-600`.

**No hace falta crear la clase a mano.** Solo declaras el color.

## 3.2 La regla del nombre

El nombre debe seguir el patrón:
```
--color-<nombre>-<variante>
   ↑        ↑         ↑
  fijo    el nombre  el tono
```

- `--color-` → dice que es un color
- `marca` → el nombre que tú inventas
- `600` → el tono

## 3.3 Los colores de Nutrik

| Variable | Hex | Cuándo se usa | Clase que genera |
|---|---|---|---|
| `--color-marca` | `#4eac36` | Verde principal, botón de búsqueda | `bg-marca` |
| `--color-marca-50` | `#f1f6ee` | Fondo muy claro al pasar el mouse | `bg-marca-50` |
| `--color-marca-100` | `#e8f5e9` | Fondo de la etiqueta 404 | `bg-marca-100` |
| `--color-marca-200` | `#d8e2d4` | Borde del botón secundario | `border-marca-200` |
| `--color-marca-600` | `#379754` | Inicio del degradado, enlaces | `bg-marca-600` |
| `--color-marca-700` | `#1f6a3d` | Final del degradado | `bg-marca-700` |
| `--color-marca-texto` | `#2e7d32` | Texto verde sobre fondo claro | `text-marca-texto` |
| `--color-ink` | `#1a1a2e` | Títulos oscuros | `text-ink` |
| `--color-muted` | `#718096` | Texto gris apagado | `text-muted` |
| `--color-linea` | `#eef1ec` | Bordes muy tenues | `border-linea` |
| `--color-campo` | `#f1f1f1` | Fondo del buscador | `bg-campo` |
| `--color-neutra` | `#4a5d4f` | Texto gris verdoso | `text-neutra` |

## 3.4 Por qué se llaman así

`marca` = "nuestro verde". Es una convención para no inventar nombres cada vez.
 Se podria haber puesto `--color-verde-nutrik`, pero `marca` es corto y se lee bien
como `bg-marca-600`.

Los nombres `ink` (tinta), `muted` (apagado) y `linea` (borde) vienen de la
**propia convención de Tailwind**, que ya trae colores como
`slate-500`, `gray-100`, `zinc-900`. Se mixes lo propio con lo estándar.

## 3.5 Cómo agregar un color nuevo

Paso 1. Agregar la variable en `src/global.css`, dentro de `@theme`:
```css
@theme {
  --color-aviso: #f59e0b;   /* naranja para advertencias */
}
```

Paso 2. Guardar. Listo. Ya existe `bg-aviso`, `text-aviso`, `border-aviso`.

Paso 3. Usarlo:
```jsx
<div className="bg-aviso text-white p-4">Cuidado</div>
```

---

# 4. CÓMO SE USA — LOS EJEMPLOS REALES DE NUTRIK

## 4.1 Ejemplo 1: `Header.jsx` (el encabezado)

### El código original (CSS a mano)
```css
.header-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
```

### Traducido a Tailwind
```jsx
<header className="flex w-full flex-col bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)]">
```

### Tabla de traducción

| CSS original | Tailwind | Explicación |
|---|---|---|
| `display: flex` | `flex` | poner en línea/columna según el siguiente |
| `flex-direction: column` | `flex-col` | **debajo**, no al lado |
| `width: 100%` | `w-full` | todo el ancho |
| `background-color: #ffffff` | `bg-white` | fondo blanco (atajo) |
| `box-shadow: ...` | `shadow-[...]` | sombra personalizada |

> La sombra no existe "de fábrica" con ese valor exacto, así que va entre
> **corchetes**. Ver "Valores arbitrarios" más abajo.

### La fila superior
```css
.fila-superior {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  gap: 20px;
}
```
```jsx
<div className="flex items-center justify-between gap-5 px-10 py-2.5">
```

| CSS | Tailwind | Valor real |
|---|---|---|
| `display: flex` | `flex` | — |
| `align-items: center` | `items-center` | centra verticalmente |
| `justify-content: space-between` | `justify-between` | logo ← → íconos |
| `padding: 10px 40px` | `px-10 py-2.5` | 40px a los lados, 10px arriba/abajo |
| `gap: 20px` | `gap-5` | 20px de separación |

**Regla de oro:**
- `p-4` = por **todos** los lados
- `px-4` = solo **horizontal** (x = izquierda y derecha)
- `py-4` = solo **vertical** (y = arriba y abajo)

`px-10` = 2.5rem = 40px. `py-2.5` = 0.625rem = 10px. Por eso `2.5` y no `3`.

### El buscador
```css
.buscador {
  flex: 1;
  max-width: 500px;
  display: flex;
  background: #f1f1f1;
  border-radius: 8px;
  overflow: hidden;
}
.buscador input {
  flex: 1; border: none; padding: 10px;
  background: transparent; outline: none;
}
.buscador button {
  background: #4eac36; border: none; padding: 0 15px; cursor: pointer;
}
```
```jsx
<form className="flex max-w-[500px] flex-1 overflow-hidden rounded-lg bg-campo">
  <input className="flex-1 border-0 bg-transparent p-2.5 outline-none" ... />
  <button className="cursor-pointer border-0 bg-marca px-[15px] py-0" ... />
</form>
```

| CSS | Tailwind |
|---|---|
| `flex: 1` | `flex-1` (crece para llenar) |
| `max-width: 500px` | `max-w-[500px]` ← **valor arbitrario** |
| `background: #f1f1f1` | `bg-campo` ← **color del tema** |
| `border-radius: 8px` | `rounded-lg` |
| `overflow: hidden` | `overflow-hidden` |
| `border: none` | `border-0` |
| `padding: 10px` | `p-2.5` |
| `background: transparent` | `bg-transparent` |
| `outline: none` | `outline-none` |
| `padding: 0 15px` | `px-[15px] py-0` |

### Los íconos
```css
.user, .carrito { width: 28px; cursor: pointer; }
```
```jsx
<img className="w-7 cursor-pointer" src={avatar} alt="Usuario" />
```
`w-7` = 1.75rem = **28 píxeles**. Un solo número, dos propiedades.

## 4.2 Ejemplo 2: `NotFound.jsx` (la página 404)

### La tarjeta central
```css
.notfound-card {
  width: 100%;
  max-width: 460px;
  padding: 40px 32px;
  background: #ffffff;
  border: 1px solid #eef1ec;
  border-radius: 24px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
  text-align: center;
}
```
```jsx
<div className="w-full max-w-[460px] rounded-3xl border border-linea bg-white px-8 py-10 text-center shadow-[0_12px_32px_rgba(0,0,0,0.07)]">
```

| CSS | Tailwind | Nota |
|---|---|---|
| `max-width: 460px` | `max-w-[460px]` | arbitrario |
| `padding: 40px 32px` | `px-8 py-10` | 32px lados, 40px arriba/abajo |
| `border: 1px solid #eef1ec` | `border border-linea` | ⚠️ ver abajo |
| `border-radius: 24px` | `rounded-3xl` | 24px exactos |
| `box-shadow: ...` | `shadow-[...]` | arbitrario |
| `text-align: center` | `text-center` | — |

> **Sobre `border border-linea`:** en Tailwind, `border` **solo** pone el grosor
> (`1px`). El color va aparte: `border-linea`. Juntas forman
> `1px solid #eef1ec`. El orden importa: siempre el grosor antes del color.

### La etiqueta 404
```css
.notfound-codigo {
  display: inline-block;
  margin-bottom: 12px;
  padding: 6px 16px;
  border-radius: 999px;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 2px;
}
```
```jsx
<span className="mb-3 inline-block rounded-full bg-marca-100 px-4 py-1.5 text-[1.6rem] font-extrabold tracking-[2px] text-marca-texto">
  404
</span>
```

| CSS | Tailwind |
|---|---|
| `display: inline-block` | `inline-block` |
| `margin-bottom: 12px` | `mb-3` |
| `padding: 6px 16px` | `px-4 py-1.5` |
| `border-radius: 999px` | `rounded-full` (píldora) |
| `background: #e8f5e9` | `bg-marca-100` |
| `color: #2e7d32` | `text-marca-texto` |
| `font-size: 1.6rem` | `text-[1.6rem]` ← arbitrario |
| `font-weight: 800` | `font-extrabold` |
| `letter-spacing: 2px` | `tracking-[2px]` ← arbitrario |

### El botón principal con degradado

Aquí está la mejor demostración. El CSS era:
```css
.notfound-primario {
  background: linear-gradient(135deg, #379754, #1f6a3d);
  border: none;
  color: #ffffff;
  padding: 13px;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}
.notfound-primario:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(31, 106, 61, 0.28);
}
```

Todo en una línea:
```jsx
className="w-full cursor-pointer rounded-xl border-none bg-gradient-to-br from-marca-600 to-marca-700 py-[13px] text-[0.92rem] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(31,106,61,0.28)]"
```

**El degradado se arma con 3 clases:**
| Clase | Qué hace |
|---|---|
| `bg-gradient-to-br` | Crea un degradado (→ esquina inferior derecha) |
| `from-marca-600` | El color **inicial** |
| `to-marca-700` | El color **final** |

⚠️ **Ojo:** el código **generado** usa colores en espacio `oklab` (más moderno
que RGB), por eso al inspeccionar se ven valores como
`--tw-gradient-stops`. Se ve raro, pero el resultado en pantalla es el correcto.

**El efecto hover se separa con `:`**
| Clase | Significado |
|---|---|
| `hover:` | "cuando le pasen el mouse encima" |
| `focus:` | "cuando esté enfocado con el teclado" |
| `active:` | "mientras lo están presionando" |
| `disabled:` | "cuando está deshabilitado" |
| `sm:` `md:` `lg:` | "en pantallas de ese tamaño" |

Se pueden **encadenar**: `hover:md:bg-marca-700` = "en pantallas medianas Y con
mouse encima".

`transition-all duration-200` hace la transición **suave** en 200ms. Sin eso el
salto sería instantáneo y se vería tosco.

---

# 5. REFERENCIA RÁPIDA DE CLASES

## 5.1 Disposición (cómo se acomodan los elementos)

| Clase | CSS | Para qué |
|---|---|---|
| `flex` | `display:flex` | fila o columna |
| `flex-col` | `flex-direction:column` | **debajo** |
| `flex-row` | `flex-direction:row` | al lado (por defecto) |
| `grid` | `display:grid` | cuadrícula |
| `hidden` | `display:none` | invisible |
| `block` `inline-block` `inline-flex` | — | distintos flujos |
| `relative` `absolute` `fixed` `sticky` | `position:*` | positioning |

## 5.2 Tamaño y espaciado

| Prefijo | Significa |
|---|---|
| `p-` | padding (relleno interno) |
| `m-` | margin (espacio externo) |
| `px-` `py-` | solo horizontal / vertical |
| `pt-` `pr-` `pb-` `pl-` | un solo lado |
| `w-` | ancho |
| `h-` | alto |
| `gap-` | separación **entre** hijos |
| `space-x-` `space-y-` | separación automática entre hijos |
| `min-h-` `max-w-` | límites |

## 5.3 Color

| Prefijo | Ejemplo |
|---|---|
| `bg-` | `bg-white`, `bg-marca-600` |
| `text-` | `text-ink`, `text-muted` |
| `border-` | `border-linea` |
| `from-` `to-` `via-` | degradado |
| `ring-` | contorno exterior |
| `shadow-` | sombra |
| `opacity-` | transparencia |

## 5.4 Tipografía

| Clase | Tamaño |
|---|---|
| `text-xs` | 12px |
| `text-sm` | 14px |
| `text-base` | 16px (normal) |
| `text-lg` | 18px |
| `text-xl` | 20px |
| `text-2xl` | 24px |
| `font-thin` … `font-black` | grosor (100–900) |
| `leading-none` / `leading-tight` / `leading-relaxed` | interlineado |
| `tracking-tight` … `tracking-widest` | espacio entre letras |
| `uppercase` `lowercase` `capitalize` | mayúsculas |

## 5.5 Bordes y efectos

| Clase | Para qué |
|---|---|
| `rounded` `rounded-md` `rounded-lg` `rounded-xl` `rounded-2xl` `rounded-3xl` `rounded-full` | redondeo |
| `border` `border-2` `border-0` | grosor |
| `shadow-sm` `shadow` `shadow-lg` `shadow-none` | sombras |
| `opacity-0` a `opacity-100` | transparencia |
| `blur` `brightness` `grayscale` | filtros |

## 5.6 Interacción

| Clase | Para qué |
|---|---|
| `cursor-pointer` | manito al pasar |
| `hover:` | al pasar el mouse |
| `focus:` | al enfocar con teclado |
| `group` + `group-hover:` | el padre se activa cuando el hijo tiene el mouse |
| `peer` + `peer-*` | lo hace el hermano anterior |

## 5.7 Responsive

| Prefijo | Desde |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

```jsx
<div className="p-4 sm:p-8 md:p-12 lg:p-16">
```
Móvil: 16px · Tablet: 32px · Laptop: 48px · Monitor: 64px.

---

# 6. TRUCOS QUE TE VAN A SERVIR

## 6.1 Valores arbitrarios (los corchetes)

Cuando el valor no está en la escala, **lo inventas** entre corchetes `[]`:

```jsx
max-w-[460px]          →  max-width: 460px
text-[1.6rem]          →  font-size: 1.6rem
px-[15px]              →  padding-left/right: 15px
shadow-[0_12px_32px_rgba(0,0,0,0.07)]
top-[calc(100%+8px)]
bg-[#1a1a2e]           →  cualquier color
```

**Regla importante:** los espacios se escriben con **raya baja** `_`, porque si
escribieras un espacio real, Tailwind lo leería como una clase separada.

## 6.2 El truco del guion bajo

`shadow-[0_12px_32px_rgba(0,0,0,0.07)]` genera:
```css
box-shadow: 0 12px 32px rgba(0,0,0,0.07);
```

Si se puede usar `/` en vez de `rgba()`, queda más corto:
```jsx
shadow-[0_12px_32px_rgb(0_0_0/7%)]
```

## 6.3 El grupo (hover en el padre)

```jsx
<div className="group">
  <img className="opacity-70 group-hover:opacity-100" />
</div>
```
`group` en el padre + `group-hover:` en el hijo = "esto cambia cuando el mouse
está sobre **el grupo**". Sirve para hacer tarjetas que cambian al pasar el mouse.

## 6.4 Componer con tu propio CSS

Las dos cosas conviven. `index.css` y los `className` de 30 archivos CSS
tradicionales **siguen funcionando**. Tailwind solo agrega opciones.

Cuando una clase propia y una de Tailwind chocan, **gana Tailwind** (porque se
importa después). Por eso `global.css` va después de `index.css` en `main.jsx`.

## 6.5 Orden de lectura recomendado

Cuando veas `className="flex items-center gap-2"` léelo así:

1. `flex` → es una **caja** que acomoda cosas
2. `items-center` → **centradas** verticalmente
3. `gap-2` → con **8px** de separación

## 6.6 Atajos para no memorizar todo

1. Empieza con **solo 20 clases**: `flex`, `grid`, `p-4`, `m-2`, `bg-*`,
   `text-white`, `text-sm`, `rounded`, `border`, `w-full`, `h-*`, `items-center`,
   `justify-between`, `gap-*`, `hidden`, `hover:*`, `md:*`.
2. Consulta la documentación oficial.
3. **En el navegador:** abre las DevTools, haz clic en un elemento y mira la
   pestaña de arriba a la derecha. Ahí está el nombre exacto de la clase que
   generó el estilo. Ese es el truco que usan los profesionales.

---

# 7. CÓMO SE VERIFICA QUE FUNCIONA

Para comprobar que Tailwind está generando las clases de verdad:

```bash
npm run build
```
Después revisa `dist/assets/index-*.css` (una hoja de estilos enorme). Debe
contener `.bg-marca`, `.max-w-\[460px\]`, `.hover\:-translate-y-0\.5`, etc.

Si una clase **no aparece** en ese archivo, hay dos razones posibles:

| Causa | Solución |
|---|---|
| La clase está mal escrita | Revisa el nombre (Tailwind v4 detecta los typos y avisa) |
| La clase está en un archivo que Tailwind no lee | Tailwind v4 detecta automáticamente los archivos; no hay que configurar nada |
| La clase está escrita **dividida** por una variable | ❌ **Este es el error clásico.** Ver abajo |

### ⚠️ El error más común: clases construidas con template strings

```jsx
// ❌ MAL — Tailwind no puede leer esto
const color = activo ? "bg-green-500" : "bg-gray-200";
<div className={color} />

// ❌ MAL — tampoco lo ve
<div className={`btn-${activo ? "active" : "off"}`} />

// ✅ BIEN — las dos clases están escritas completas
<div className={activo ? "bg-green-500" : "bg-gray-200"} />

// ✅ BIENO
<div className={`rounded-lg ${activo ? "bg-green-500" : "bg-gray-200"}`} />
```

**Regla:** si lees `bg-` o `text-` en el código, la palabra que sigue debe estar
**escrita en el archivo**, no inventada en tiempo de ejecución. Tailwind escanea
el texto del archivo; no ejecuta el programa.

---

# 8. MIGRAR UN COMPONENTE: LOS PASOS

Para cuando conviertan otra pantalla (por ejemplo `Footer.jsx`):

### Paso 1 — Apunta el CSS viejo
Abre el `.css` y anota cada regla: nombre, propiedad, valor.

### Paso 2 — Traduce propiedad por propiedad
Usa la tabla de la sección 4. Buscada en la escala cuando exista; corchetes
cuando no.

### Paso 3 — Escribe el `className`
Pega todo en el `className`, separado por espacios.

### Paso 4 — Borra el import del CSS
```jsx
import "./Footer.css";   ← elimina esta línea
```

### Paso 5 — Borra el archivo `.css`
Solo cuando **nadie más** lo importe. Comprueba con:
```bash
grep -rn "Footer.css" src/
```
Si no aparece nada más, se puede borrar.

### Paso 6 — Verifica
```bash
npm run build   # compila
npm run dev     # mira la página en http://localhost:5173
```

### Reglas para no romper nada
- **No actives Preflight** hasta que TODO esté migrado.
- **Un componente a la vez.** Migra, comprueba, y sigue.
- **No borres un CSS** si otro archivo lo importa. A veces dos páginas comparten
  el mismo archivo (en Nutrik, `Frozen.jsx` y `Snacks.jsx` usan
  `../Cliente/Product.css`).
- Si un estilo no se puede traducir fácil, **déjalo en CSS** y anótalo. No todo
  tiene que estar en Tailwind.

---

# 9. RESUMEN EN UNA PÁGINA

**Tailwind CSS** es una librería que reemplaza escribir hojas de estilo por
**clases de estilo directo en el HTML**.

**Los 3 conceptos:**
1. **Utilidades**: clases pequeñas (`flex`, `p-4`, `bg-white`) que se combinan.
2. **Escala fija**: los números siguen un patrón, para que todo combine.
3. **Variantes**: `hover:`, `md:`, `dark:` añaden condiciones.

**En Nutrik:**
- Instalado como `tailwindcss@4.3.3` + `@tailwindcss/vite`.
- Activado en `src/global.css` (importado desde `main.jsx`).
- 12 colores propios declarados en `@theme` (verde de marca + neutros).
- **Preflight desactivado** a propósito, para no romper los 30+ archivos CSS
  que faltan por migrar.
- 2 componentes ya migrados: `Header.jsx` y `NotFound.jsx`.
- El resto sigue con CSS tradicional. La migración es progresiva.

**Comandos:**
```bash
npm run dev     # probar
npm run build   # verificar que compila
```

**Para recordar una clase:** selecciona el elemento en el navegador con clic
derecho → "Inspeccionar" → la pestaña de estilos muestra el nombre exacto.
