import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Cliente/Product.css";
import { useCart } from "../Cliente/Cart";
import {
  buscarProducto,
  precioFinal,
  formatearPrecio,
} from "../../data/productosData";

const productosFrozen = [
  { id: 1, productoId: "silk", nombre: "Silk - Almendra sin Azúcar" },
  { id: 2, productoId: "yogurt-smoothie", nombre: "Yogurt Smoothie" },
];

function Frozen() {
  const { agregarProducto, setCarritoAbierto } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const manejarAgregar = (p) => {
    const datos = buscarProducto(p.productoId);
    if (!datos) return;
    agregarProducto({ ...datos, precio: precioFinal(datos) });
    setCarritoAbierto(true);
  };

  return (
    <section className="productos-section">
      <div className="productos-header">
        <h1>Congelados</h1>
        <p>Descubre nuestra selección de productos congelados saludables y listos para disfrutar.</p>
      </div>

      <div className="productos-grid">
        {productosFrozen.map((producto) => {
          const datos = buscarProducto(producto.productoId) || {};
          return (
            <div className="producto-card" key={producto.id}>
              <div className="producto-badge nuevo">Congelado</div>
              <img src={datos.imagen} alt={producto.nombre} className="producto-img" />
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p className="producto-descripcion">
                  {datos.descripcion || "Producto congelado saludable de Nutrik."}
                </p>
                <div className="producto-precios">
                  <span className="producto-precio">
                    ${formatearPrecio(precioFinal(datos))}
                  </span>
                </div>
                <div className="producto-acciones">
                  <Link to={`/Productview/${producto.productoId}`} className="btn-ver">
                    Ver producto
                  </Link>
                  <button className="btn-agregar" onClick={() => manejarAgregar(producto)}>
                    🛒 Agregar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Frozen;