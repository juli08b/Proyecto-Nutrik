import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { useCart } from "../checkout/Cart";
import {
  buscarProducto,
  formatearPrecio,
  precioFinal,
} from "../../data/productosData";

// Cada ruta de categoría selecciona manualmente IDs del catálogo local.
const CATEGORIAS = {
  frutas: {
    titulo: "Frutas",
    descripcion: "Encuentra opciones naturales para acompañar tu alimentación.",
    productos: ["frutos", "chia"],
  },
  "aves-pescados": {
    titulo: "Aves y pescados",
    descripcion: "Alternativas prácticas y nutritivas para tus comidas.",
    productos: ["puroverde-ajiaco"],
  },
  "lacteos-huevos": {
    titulo: "Lácteos y huevos",
    descripcion: "Productos ricos en proteína para una alimentación equilibrada.",
    productos: ["yogur", "frubite-frutos-rojos"],
  },
  "cereales-granos": {
    titulo: "Cereales y granos",
    descripcion: "Opciones nutritivas para tus desayunos y snacks.",
    productos: ["granola", "Galletas", "barra-tosh"],
  },
  vitaminas: {
    titulo: "Vitaminas y bienestar",
    descripcion: "Complementos para cuidar tu bienestar todos los días.",
    productos: ["omega", "colageno", "detox"],
  },
  suplementos: {
    titulo: "Suplementos en polvo",
    descripcion: "Suplementos para apoyar tu rendimiento y recuperación.",
    productos: ["creatine", "maca", "colageno-premium"],
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
              <div className="producto-badge nuevo">{categoria.titulo}</div>
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
