import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { useCart } from "./Cart";
import {
  productosNuevos,
  precioFinal,
  formatearPrecio,
} from "../../data/productosData";

function Newproduct() {
  const { agregarProducto, setCarritoAbierto } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const manejarAgregar = (producto) => {
    agregarProducto({ ...producto, precio: precioFinal(producto) });
    setCarritoAbierto(true);
  };

  return (
    <section className="productos-section">
      <div className="productos-header">
        <h1 className="titulo-productos">Explora lo Nuevo</h1>
        <p>
          Descubre nuestra selección de superalimentos y productos 100% naturales
          para potenciar tu bienestar diario.
        </p>
      </div>

      <div className="productos-grid">
        {productosNuevos.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <div className="producto-badge nuevo">Nuevo</div>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-img"
            />
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>

              <div className="producto-precios">
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
    </section>
  );
}

export default Newproduct;