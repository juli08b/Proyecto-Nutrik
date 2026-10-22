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
    id: "coco",
    nombre: "Aceite de Coco Natural",
    descripcion:
      "Ideal para cocinar y preparar recetas saludables. Aporta grasas buenas y un sabor delicioso.",
    precio: 24000,
    imagen: "https://i.pinimg.com/736x/29/75/6f/29756f11865e9f4c61fe532cdfe48f39.jpg",
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

  // ─────────────────────────── LO NUEVO ───────────────────────────
  {
    id: "silk",
    nombre: "Silk - Almendra sin Azúcar",
    descripcion:
      "Bebida vegetal de almendras sin azúcar añadida. Lacteofree, ligera y rica en sabor, ideal para el desayuno.",
    precio: 6200,
    imagen: "https://i.pinimg.com/1200x/59/7a/da/597ada481273c9ecc7b001456412b3c4.jpg",
    etiqueta: "nuevo",
  },
  {
    id: "yogurt-smoothie",
    nombre: "Yogurt Smoothie",
    descripcion:
      "Smoothie cremoso de yogurt con frutas, listo para tomar. Una dosis rápida de energía y nutrientes.",
    precio: 7500,
    imagen: "https://i.pinimg.com/736x/98/f5/df/98f5dff3ee7d44b0d7df193a046eb42e.jpg",
    etiqueta: "nuevo",
  },
  {
    id: "sandia",
    nombre: "Sandía Fresca",
    descripcion:
      "Sandía hidratante y refrescante, rica en vitaminas y antioxidantes. Tu snack perfecto para el calor.",
    precio: 8000,
    imagen: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
    etiqueta: "nuevo",
  },
  {
    id: "batido",
    nombre: "Batido Energético",
    descripcion:
      "Batido nutritivo con superalimentos para recargar energía antes o después del ejercicio.",
    precio: 9500,
    imagen: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=800&auto=format&fit=crop",
    etiqueta: "nuevo",
  },
  {
    id: "milkaut",
    nombre: "Milkaut Yogurt",
    descripcion:
      "Yogurt cremoso de alta calidad, fuente de calcio y proteínas para toda la familia.",
    precio: 6800,
    imagen: "https://i.pinimg.com/736x/c0/0a/71/c00a71ead8fa8dac1cefdcc2467e8f72.jpg",
    etiqueta: "nuevo",
  },
  {
    id: "especias",
    nombre: "Especias Naturales",
    descripcion:
      "Mezcla de especias seleccionadas para dar sabor a tus platillos sin conservantes ni aditivos.",
    precio: 5900,
    imagen: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=800&auto=format&fit=crop",
    etiqueta: "nuevo",
  },
  {
    id: "arroz",
    nombre: "Arroz Blanco Integral",
    descripcion:
      "Arroz integral de grano completo, alto en fibra y nutrientes. La base perfecta de comidas balanceadas.",
    precio: 7200,
    imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
    etiqueta: "nuevo",
  },
  {
    id: "tostadas",
    nombre: "Tostadas Sanísimo Horneadas",
    descripcion:
      "Tostadas 100% integrales horneadas, crujientes y sin frituras. El acompañante ideal para tu desayuno.",
    precio: 6400,
    imagen: "https://i.pinimg.com/1200x/f9/e1/3f/f9e13fec1d60672de852b1cb6a33514c.jpg",
    etiqueta: "nuevo",
  },
  {
    id: "aceite-oliva",
    nombre: "Aceite de Oliva Extra Virgen",
    descripcion:
      "Aceite de oliva extra virgen de primera presión, rico en antioxidantes y grasas saludables.",
    precio: 24000,
    imagen: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop",
    etiqueta: "nuevo",
  },
  {
    id: "yogur-fresas",
    nombre: "Yogur con Fresas",
    descripcion:
      "Yogur cremoso con trozos naturales de fresa. El equilibrio perfecto entre sabor y nutrición.",
    precio: 7800,
    imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
    etiqueta: "nuevo",
  },

  // ─────────────────────────── DESCUENTOS ───────────────────────────
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
export const productosTienda = PRODUCTOS.filter(
  (p) => !p.etiqueta || p.etiqueta === ""
);
export const productosNuevos = PRODUCTOS.filter((p) => p.etiqueta === "nuevo");
export const productosDescuento = PRODUCTOS.filter(
  (p) => p.etiqueta === "descuento"
);

export const buscarProducto = (id) => PRODUCTOS.find((p) => p.id === id);