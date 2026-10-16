import "./Product.css";
import { useParams } from "react-router-dom";
import { useCart } from "./Cliente/Cart";
import {
  buscarProducto,
  precioFinal,
  formatearPrecio,
} from "../data/productosData";

const Productview = () => {
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

  return (
    <div className="contenedor-vistas">
      <div className="vista-producto">
        <div className="imagen-producto">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="info-producto">
          <h1>{producto.nombre}</h1>
          <p className="descripcion-producto">{producto.descripcion}</p>
          <h2 className="precio-producto">
            ${formatearPrecio(precioFinal(producto))}
          </h2>
          <div className="acciones-producto">
            <button className="btn-carrito" onClick={manejarAgregar}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productview;