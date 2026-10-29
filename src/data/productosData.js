// Catálogo central de productos de Nutrik.
// Todas las páginas (Tienda, Nuevo, Descuento, Snacks, Congelados y Vista de producto)
// leen de aquí para que el carrito y los precios sean siempre consistentes.

export const PRODUCTOS = [
  // ─────────────────────────── TIENDA ───────────────────────────
  {
    id: "creatine",
    nombre: "Creatina Monohidratada",
    descripcion:
      "Suplemento premium en polvo que mejora la fuerza, el rendimiento físico y la recuperación muscular. Ideal para deportistas y entrenamientos de alta intensidad.",
    precio: 85000,
    imagen: "https://i.pinimg.com/736x/4e/1d/3d/4e1d3d2831b01988bbfbcaf7fbdeabda.jpg",
    etiqueta: "",
  },
  {
    id: "yogur",
    nombre: "Yogur Griego Natural",
    descripcion:
      "Fuente natural de proteína y probióticos, sin azúcares añadidos. Cremoso, versátil y perfecto para desayunos saludables.",
    precio: 12000,
    imagen: "https://i.pinimg.com/1200x/04/40/75/044075ff03f913e906dca4efbafc8821.jpg",
    etiqueta: "",
  },
  {
    id: "detox",
    nombre: "Té Verde Detox",
    descripcion:
      "Bebida natural antioxidante con propiedades depurativas. Ayuda a la digestión y aporta energía sin calorías.",
    precio: 18000,
    imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
    etiqueta: "",
  },
  {
    id: "omega",
    nombre: "Omega 3 Fish Oil",
    descripcion:
      "Cápsulas de omega 3 de alta calidad que cuidan tu corazón y tu salud cardiovascular. Rico en EPA y DHA.",
    precio: 35000,
    imagen: "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg",
    etiqueta: "",
  },
  {
    id: "colageno",
    nombre: "Colágeno Hidrolizado",
    descripcion:
      "Contribuye al cuidado de articulaciones, piel, cabello y uñas. Fácil de disolver en agua, jugo o preparaciones.",
    precio: 79900,
    imagen: "https://i.pinimg.com/1200x/bf/0a/6d/bf0a6dc31db1508589493ceec6a6c512.jpg",
    etiqueta: "",
  },
  {
    id: "chia",
    nombre: "Semillas de Chía",
    descripcion:
      "Fuente natural de fibra, proteína y omega 3. Ideal para pudines, batidos y platillos saludables.",
    precio: 14000,
    imagen: "https://i.pinimg.com/736x/28/bf/0c/28bf0ce32dc25e1c1912e23c39653062.jpg",
    etiqueta: "",
  },
  {
    id: "Galletas",
    nombre: "Galletas de Arroz y Chips Algarrobo x150gr Dushi",
    descripcion:
      "Deliciosas galletas veganas, libre de azúcar y elaboradas con ingredientes saludables. Son perfectas para acompañar tus tardes o convertirlas en tu snack preferido, disfruta de su gran sabor y textura.",
    precio: 22000,
    imagen: "https://vistaintegral.co/wp-content/uploads/2023/09/12768-Galletas-Chips-Algarrobo-Dushi-Frente.jpg-595x785.jpeg",
    etiqueta: "",
  },
  {
    id: "maca",
    nombre: "Maca en Polvo",
    descripcion:
      "Raíz andina que aporta energía natural, vitalidad y equilibrio hormonal. Se mezcla fácil con alimentos o bebidas.",
    precio: 28000,
    imagen: "https://i.pinimg.com/736x/fc/fa/c7/fcfac715ba3b58d061d68ecfd143b8ab.jpg",
    etiqueta: "",
  },
  {
    id: "granola",
    nombre: "Granola Saludable",
    descripcion:
      "Mezcla nutritiva de avena, semillas y frutos horneados. Perfecta para acompañar yogur, leche o frutas.",
    precio: 16000,
    imagen: "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg",
    etiqueta: "",
  },
  {
    id: "frutos",
    nombre: "Mix de Frutos Secos",
    descripcion:
      "Snack saludable rico en proteína y grasas buenas. Combina almendras, nueces y semillas seleccionadas.",
    precio: 22000,
    imagen: "https://i.pinimg.com/736x/16/ae/4a/16ae4ab7cc204b95ed2cba520eee5f21.jpg",
    etiqueta: "",
  },


  // ─────────────────────────── DESCUENTOS ───────────────────────────



  {
    id: "wild-choco-mani",
    nombre: "wild protein chocolate con maní",
    descripcion: "Barra proteica sabor chocolate con maní. Presentación de 15 gr.",
    precio: 9900,
    descuento: 20,
    imagen: "https://www.thewildfoods.com.co/cdn/shop/files/CHOCO_CACAHUATE_BARRITA.png?v=1707514803&width=480",
    etiqueta: "descuento",
  },
  {
    id: "wild-choco",
    nombre: "wild protein chocolate",
    descripcion: "Barra proteica sabor chocolate. Presentación de 15 gr.",
    precio: 9900,
    imagen: "https://www.thewildfoods.com.co/cdn/shop/files/CHOCOLATE_BARRITA.png?v=1707514722&width=840",
    etiqueta: "nuevo",
  },
  {
    id: "frubite-frutos-rojos",
    nombre: "frubite Yogur de frutos rojos",
    descripcion: "Yogur con frutos rojos. Presentación de 220 g.",
    precio: 26900,
    descuento: 29,
    imagen: "https://vitaintegral.co/wp-content/uploads/2026/08/1597-Bocadillo-de-frutos-rojos-x220-gr-Frubite-Atras.jpg.jpeg",
    etiqueta: "descuento",
  },
  {
    id: "puroverde-sopa",
    nombre: "Sopa de verduras Puro Verde",
    descripcion: "Sopa de verduras lista para preparar. Presentación de 400 gr.",
    precio: 15300,
    imagen: "https://vitaintegral.co/wp-content/uploads/2026/09/14308-Sopa-de-verduras-x-400gr-Puro-Verde-Frente.jpg-595x693.jpg",
    etiqueta: "",
  },
  {
    id: "notco-zero",
    nombre: "Bebida vegetal NOTCO Zero",
    descripcion: "Bebida vegetal sin azúcar. Presentación de 1 LT.",
    precio: 20400,
    descuento: 20,
    imagen: "https://vitaintegral.co/wp-content/uploads/2026/04/13720-Bebida-vegetal-zero-x-1LT-NOTCO-Frente.jpg-595x744.png",
    etiqueta: "descuento",
  },
  {
    id: "blondie-balance",
    nombre: "Blondie Arequipe y Chocolate 60gr Es Un Balance",
    descripcion: "Blondie de arequipe y chocolate. Presentación de 60 g.",
    precio: 12900,
    imagen: "https://vitaintegral.co/wp-content/uploads/2026/10/14319-Blondie-Arequipe-y-Chocolate-60gr-Es-Un-Balance-Frente.jpg-595x595.jpeg",
    etiqueta: "nuevo",
  },
  {
    id: "puroverde-ajiaco",
    nombre: "Ajiaco con pollo 400gr Puro Verde",
    descripcion: "Ajiaco con pollo listo para preparar. Presentación de 400 gr.",
    precio: 19900,
    descuento: 19,
    imagen: "https://vitaintegral.co/wp-content/uploads/2026/09/14309-Ajiaco-con-pollo-400gr-Puro-Verde-Frente.jpg-595x595.jpg",
    etiqueta: "descuento",
  },
  {
    id: "whey-cookies-225",
    nombre: "Whey protein cookies 225gr Radical Nutrition",
    descripcion: "Galletas con proteína whey. Presentación de 225 g.",
    precio: 21900,
    imagen: "https://vitaintegral.co/wp-content/uploads/2026/09/14280-Whey-protein-cookies-225gr-Radical-Nutrition-Frente.jpg-595x793.jpeg",
    etiqueta: "nuevo",
  },
  {
    id: "whey-cookies-900",
    nombre: "Whey protein cookies 900gr Radical Nutrition",
    descripcion: "Galletas con proteína whey. Presentación de 1 kg.",
    precio: 105900,
    descuento: 30,
    imagen: "https://vitaintegral.co/wp-content/uploads/2026/09/14281-Whey-protein-cookies-900gr-Radical-Nutrition-Frente.jpg-595x793.jpeg",
    etiqueta: "descuento",
  },

  {
    id: "colageno-premium",
    nombre: "Colágeno Hidrolizado PREMIUM",
    descripcion:
      "Añadirlo a tu rutina diaria es un movimiento estratégico para tu bienestar y salud articular. Pureza máxima y rápida absorción.",
    precio: 106000,
    descuento: 22,
    imagen: "https://effektnutrition.com/cdn/shop/files/Colageno-4.jpg?v=1768606489&width=700",
    etiqueta: "descuento",
  },
  {
    id: "barra-tosh",
    nombre: "Barra de cereal TOSH nueces y arándanos",
    descripcion:
      "Disfruta de la energía natural sin preocuparte por el azúcar. Nuestras barras son el snack ideal para mantenerte activo y saludable.",
    precio: 36050,
    descuento: 12,
    imagen: "https://i.pinimg.com/736x/d0/38/ee/d038eeea2a5f64e65cfa0c2756b63b3a.jpg",
    etiqueta: "descuento",
  },
];

// Precio final aplicando el descuento (si existe)
export const precioFinal = (p) =>
  Math.round((p.precio || 0) * (1 - (p.descuento || 0) / 100));

// Formato de moneda colombiana: $ 85.000
export const formatearPrecio = (valor) =>
  Number(valor || 0).toLocaleString("es-CO");

// Componentes de catálogo
export const productosTienda = PRODUCTOS;

export const productosDescuento = PRODUCTOS.filter(
  (p) => p.etiqueta === "descuento"
);

export const buscarProducto = (id) => PRODUCTOS.find((p) => p.id === id);