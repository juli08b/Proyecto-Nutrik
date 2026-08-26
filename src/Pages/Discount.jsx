import "./Discount.css";
import { useCart } from "./Cart";

const productosDescuento = [
  {
    id: 101,
    nombre: "Colágeno Hidrolizado PREMIUM",
    // Descripción del primer producto
    descripcion:
      "Añadirlo a tu rutina diaria es un movimiento estratégico para tu bienestar y salud articular.",
    precioOriginal: 106000, // Precio antes del descuento
    descuento: 22,         // Porcentaje de descuento
    imagen: "https://effektnutrition.com/cdn/shop/files/Colageno-4.jpg?v=1768606489&width=700",
  },
  {
    id: 102,
    nombre: "Barra de cereal TOSH nueces y arándanos",
    // Descripción del segundo producto
    descripcion:
      "Disfrutá de la energía natural sin preocuparte por el azúcar nuestras barras Lyne sin azúcar son el snack ideal para mantenerte activo y saludable.",
    precioOriginal: 36050, // Precio antes del descuento
    descuento: 12,         // Porcentaje de descuento
    imagen: "https://i.pinimg.com/736x/d0/38/ee/d038eeea2a5f64e65cfa0c2756b63b3a.jpg",
  },
];

const Descuentos = () => {
  const { agregarProducto, setCarritoAbierto } = useCart();

  // Calcula el precio final aplicando el descuento
  const precioFinal = (p) =>
    Math.round(p.precioOriginal * (1 - p.descuento / 100));

  // Agrega al carrito con el precio ya descontado y abre el panel
  const handleAgregar = (producto) => {
    agregarProducto({ ...producto, precio: precioFinal(producto) });
    setCarritoAbierto(true);
  };

  return (
    <div className="contenedor desc-contenedor">

      {/* Bloque del título principal */}
      <div className="desc-titulo-bloque">
        <h2 className="titulo2prod">Productos en Descuento</h2>
        <p className="desc-subtitulo">Aprovecha estos precios por tiempo limitado y descubre promociones especiales para tu bienestar.</p>
      </div>

      {/* Tarjetas de productos — reutiliza las mismas clases de Product.css */}
      <div className="contenedorproductos">
        {productosDescuento.map((p) => (
          <div className="contenedorproducto desc-card" key={p.id}>

            {/* Badge rojo con el porcentaje de descuento */}
            <div className="desc-badge">-{p.descuento}% OFF</div>

            <img className="img-producto" src={p.imagen} alt={p.nombre} />

            <div className="desc-info">
              <h3 className="desc-nombre">{p.nombre}</h3>
              <p className="desc-descripcion">{p.descripcion}</p>

              {/* Precios: original tachado + precio con descuento en verde */}
              <div className="desc-precios">
                <span className="desc-precio-original">
                  $ {p.precioOriginal.toLocaleString("es-CO")}
                </span>
                <span className="desc-precio-final">
                  $ {precioFinal(p).toLocaleString("es-CO")}
                </span>
              </div>
            </div>

            {/* Botón igual al de la página de productos */}
            <button className="botonesproductos1" onClick={() => handleAgregar(p)}>
              Agregar al carrito
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Descuentos;