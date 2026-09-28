import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Cliente/Product.css";
import { useCart } from "../Cliente/Cart";
import granola from "../../assets/granola.svg";
import frutos from "../../assets/frutos.svg";
import chia from "../../assets/chia.svg";
import coco from "../../assets/coco.svg";
import {
  buscarProducto,
  precioFinal,
  formatearPrecio,
} from "../../data/productosData";

// Mostramos imágenes locales en las tarjetas, pero usamos los datos del catálogo
const productosSnacks = [
  { id: 1, productoId: "granola", nombre: "Granola Natural", imagen: granola },
  { id: 2, productoId: "frutos", nombre: "Mix de Frutos", imagen: frutos },
  { id: 3, productoId: "chia", nombre: "Barras de Chía", imagen: chia },
  { id: 4, productoId: "coco", nombre: "Chips de Coco", imagen: coco },
];

function Snacks() {
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
        <h1>Snacks</h1>
        <p>Descubre nuestros snacks saludables y deliciosos.</p>
      </div>

      <div className="productos-grid">
        {productosSnacks.map((producto) => {
          const datos = buscarProducto(producto.productoId) || {};
          return (
            <div className="producto-card" key={producto.id}>
              <div className="producto-badge nuevo">Snack</div>
              <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p className="producto-descripcion">
                  {datos.descripcion || "Snack saludable de Nutrik."}
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

export default Snacks;