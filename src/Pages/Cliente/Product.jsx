import "./Product.css";
import { Link } from "react-router-dom";
import { useCart } from "./Cart";
import { useAuth } from "../../Context/authContext";
import { useProductos } from "../../Context/productContext";
import {
  productosTienda,
  precioFinal,
  formatearPrecio,
  descuentoActivo,
} from "../../data/productosData";

const Productos = () => {
  const { agregarProducto, setCarritoAbierto } = useCart();
  const { user } = useAuth();
  const { productos } = useProductos();

  const productosMarketplace = productos
    .filter((producto) => {
      const esPropio =
        user && producto.vendedorId && String(producto.vendedorId) === String(user.id);
      return !esPropio && String(producto.estado).toLowerCase() !== "inactivo";
    })
    .map((producto) => ({
      ...producto,
      nombre: producto.nombre,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
    }));

  const catalogo = [...productosTienda, ...productosMarketplace];

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
        {catalogo.map((producto) => (
          <div className="card-producto" key={producto.id}>
            {descuentoActivo(producto) ? (
              <div className="producto-badge descuento">
                -{producto.descuento}% OFF
              </div>
            ) : null}

            <img className="img-producto" src={producto.imagen} alt={producto.nombre} />

            <div className="producto-cuerpo">
              <h3>{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>

              <div className="producto-precios">
                {descuentoActivo(producto) && (
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