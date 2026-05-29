import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Product.css";
import granola from "../../assets/granola.svg";
import frutos from "../../assets/frutos.svg";
import chia from "../../assets/chia.svg";
import coco from "../../assets/coco.svg";

const productosSnacks = [
  { id: 1, nombre: "Granola Natural", imagen: granola, ruta: "/catalog/snacks/granola-natural" },
  { id: 2, nombre: "Mix de Frutos", imagen: frutos, ruta: "/catalog/snacks/mix-frutos" },
  { id: 3, nombre: "Barras de Chía", imagen: chia, ruta: "/catalog/snacks/barras-chia" },
  { id: 4, nombre: "Chips de Coco", imagen: coco, ruta: "/catalog/snacks/chips-coco" },
];

function Snacks() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="productos-section">
      <div className="productos-header">
        <h1>Snacks</h1>
        <p>Descubre nuestros snacks saludables y deliciosos.</p>
      </div>

      <div className="productos-grid">
        {productosSnacks.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <Link to={producto.ruta}>
                <button className="btn-producto">Ver producto</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Snacks;