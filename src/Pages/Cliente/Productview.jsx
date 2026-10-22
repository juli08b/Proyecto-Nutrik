import './Product.css';
import { useParams } from "react-router-dom";
import { useCart } from './Cart';
import {
  buscarProducto,
  precioFinal,
  formatearPrecio,
} from '../../data/productosData';

function Productview() {
  const { id } = useParams();
  const { agregarProducto, setCarritoAbierto } = useCart();

  const producto = buscarProducto(id);

  if (!producto) {
    return <h1 className="producto-no-encontrado">Producto no encontrado</h1>;
  }

  const manejarAgregar = () => {
    agregarProducto({ ...producto, precio: precioFinal(producto) });
    setCarritoAbierto(true);
  };

  const manejarComprar = () => {
    agregarProducto({ ...producto, precio: precioFinal(producto) });
    setCarritoAbierto(true);
  };

  return (
    <div className="contenedor-vistas">
      <div className="vista-producto">
        <div className="imagen-producto">
          <img src={producto.imagen} alt={producto.nombre} />
          {producto.descuento > 0 && (
            <div className="desc-badge firma-badge">
              -{producto.descuento}% OFF
            </div>
          )}
        </div>

        <div className="info-producto">
          {producto.etiqueta === "nuevo" && (
            <span className="producto-tag-nuevo">✨ Recién llegado</span>
          )}
          {producto.etiqueta === "descuento" && (
            <span className="producto-tag-nuevo descuento">🔥 Oferta especial</span>
          )}

          <h1>{producto.nombre}</h1>

          <p className="descripcion-producto">{producto.descripcion}</p>

          {producto.descuento > 0 && (
            <p className="precio-original-producto">
              Antes: ${formatearPrecio(producto.precio)}
            </p>
          )}

          <h2 className="precio-producto">
            ${formatearPrecio(precioFinal(producto))}
          </h2>

          <div className="acciones-producto">
            <button className="btn-comprar" onClick={manejarComprar}>
              Comprar ahora
            </button>

            <button className="btn-carrito" onClick={manejarAgregar}>
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productview;