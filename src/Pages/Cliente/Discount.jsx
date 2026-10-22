import "./Discount.css";
import { useCart } from "./Cart";
import {
  productosDescuento,
  precioFinal,
  formatearPrecio,
} from "../../data/productosData";

const Descuentos = () => {
  const { agregarProducto, setCarritoAbierto } = useCart();

  const handleAgregar = (producto) => {
    agregarProducto({ ...producto, precio: precioFinal(producto) });
    setCarritoAbierto(true);
  };

  return (
    <div className="contenedor desc-contenedor">
      {/* Bloque del título principal */}
      <div className="desc-titulo-bloque">
        <h2 className="titulo2prod">Productos en Descuento</h2>
        <p className="desc-subtitulo">
          Aprovecha estos precios por tiempo limitado y descubre promociones
          especiales para tu bienestar.
        </p>
      </div>

      {/* Tarjetas de productos */}
      <div className="contenedorproductos">
        {productosDescuento.map((p) => (
          <div className="desc-card" key={p.id}>
            {/* Badge con el porcentaje de descuento */}
            <div className="desc-badge">-{p.descuento}% OFF</div>

            <img className="img-producto" src={p.imagen} alt={p.nombre} />

            <div className="desc-info">
              <h3 className="desc-nombre">{p.nombre}</h3>
              <p className="desc-descripcion">{p.descripcion}</p>

              {/* Precios: original tachado + precio con descuento */}
              <div className="desc-precios">
                <span className="desc-precio-original">
                  ${formatearPrecio(p.precio)}
                </span>
                <span className="desc-precio-final">
                  ${formatearPrecio(precioFinal(p))}
                </span>
              </div>

              <span className="desc-ahorro">
                Ahorras ${formatearPrecio(p.precio - precioFinal(p))}
              </span>
            </div>

            <button
              className="botonesproductos1"
              onClick={() => handleAgregar(p)}
            >
              🛒 Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Descuentos;