import "./Product.css";
import { Link } from "react-router-dom";
import { useCart } from "./Cart";
import {
  productosTienda,
  precioFinal,
  formatearPrecio,
} from "../../data/productosData";

const Productos = () => {
  const { agregarProducto, setCarritoAbierto } = useCart();

  const manejarAgregar = (producto) => {
    agregarProducto({ ...producto, precio: precioFinal(producto) });
    setCarritoAbierto(true);
  };

  return (
    <div className="productos-section">
      <div className="productos-header">
        <h1 className="titulo-productos">Todos Nuestros Productos</h1>
        <p className="subtitulo-productos">
          Nuestros productos saludables, seleccionados para mejorar tu bienestar
          y acompañarte en cada momento del día.
        </p>
      </div>

      <div className="contenedor-productos">
        {productosTienda.map((producto) => (
          <div className="card-producto" key={producto.id}>
            {producto.descuento > 0 ? (
              <div className="producto-badge descuento">
                -{producto.descuento}% OFF
              </div>
            ) : null}

            <img className="img-producto" src={producto.imagen} alt={producto.nombre} />

            <div className="producto-cuerpo">
              <h3>{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>

              <div className="producto-precios">
                {producto.descuento > 0 && (
                  <span className="producto-precio-original">
                    ${formatearPrecio(producto.precio)}
                  </span>
                )}
                <span className="producto-precio">
                  ${formatearPrecio(precioFinal(producto))}
                </span>
              </div>

              <div className="producto-acciones">
                <Link to={`/Productview/${producto.id}`} className="btn-ver">
                  Ver producto
                </Link>
                <button
                  className="btn-agregar"
                  onClick={() => manejarAgregar(producto)}
                >
                  🛒 Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;