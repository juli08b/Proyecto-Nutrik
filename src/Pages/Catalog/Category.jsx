import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Cliente/Product.css";
import { useCart } from "../Cliente/Cart";
import {
  buscarProducto,
  formatearPrecio,
  precioFinal,
} from "../../data/productosData";

const CATEGORIAS = {
  snacks: {
    titulo: "Snacks",
    descripcion: "Snacks saludables para acompañar tu día.",
    productos: [
      "Galletas",
      "wild-choco-mani",
      "wild-choco",
      "blondie-balance",
      "whey-cookies-225",
      "whey-cookies-900",
    ],
  },
  "lacteos-huevos": {
    titulo: "Lácteos",
    descripcion: "Yogures y bebidas refrigeradas para tu alimentación.",
    productos: ["yogur", "frubite-frutos-rojos", "notco-zero"],
  },
  "cereales-granos": {
    titulo: "Cereales y granos",
    descripcion: "Opciones nutritivas para tus desayunos y snacks.",
    productos: ["granola", "barra-tosh"],
  },
  vitaminas: {
    titulo: "Vitaminas y bienestar",
    descripcion: "Complementos para cuidar tu bienestar todos los días.",
    productos: ["omega", "detox"],
  },
  suplementos: {
    titulo: "Suplementos en polvo",
    descripcion: "Suplementos para apoyar tu rendimiento y recuperación.",
    productos: ["creatine", "colageno", "maca", "colageno-premium"],
  },
  "frutos-secos-semillas": {
    titulo: "Frutos secos y semillas",
    descripcion: "Snacks naturales ricos en fibra y grasas buenas.",
    productos: ["frutos", "chia"],
  },
};

function Category({ slug }) {
  const { agregarProducto, setCarritoAbierto } = useCart();
  const categoria = CATEGORIAS[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const manejarAgregar = (producto) => {
    const datos = buscarProducto(producto.id);
    if (!datos) return;
    agregarProducto({ ...datos, precio: precioFinal(datos) });
    setCarritoAbierto(true);
  };

  if (!categoria) return null;

  return (
    <section className="productos-section">
      <div className="productos-header">
        <h1>{categoria.titulo}</h1>
        <p>{categoria.descripcion}</p>
      </div>

      <div className="productos-grid">
        {categoria.productos.map((productoId) => {
          const producto = buscarProducto(productoId);
          if (!producto) return null;

          return (
            <div className="producto-card" key={producto.id}>
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
          );
        })}
      </div>
    </section>
  );
}

export default Category;
