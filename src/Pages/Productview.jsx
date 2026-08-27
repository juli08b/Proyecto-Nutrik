import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { listaProductos } from './Product'; 
import './Product.css';

function Productview({ agregarProducto, setCarritoAbierto }) {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);

  const producto = listaProductos.find((p) => p.id === id);

  if (!producto) {
    return (
      <div className="contenedor-vistas">
        <h2>Producto no encontrado</h2>
        <Link to="/product">Volver a productos</Link>
      </div>
    );
  }

  const manejarAgregar = () => {
    if (agregarProducto) agregarProducto({ ...producto, cantidad });
    if (setCarritoAbierto) setCarritoAbierto(true);
  };

  return (
    <div className="contenedor-vistas">
      <div className="vista-producto">
        {/* EFECTO ZOOM EN HOVER */}
        <div className="imagen-producto-zoom">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="info-producto">
          {producto.stock && (
            <span className="stock-status">
              🟢 Disponible en Stock ({producto.stock} unidades)
            </span>
          )}

          <h1>{producto.nombre}</h1>

          <div className="rating-box-detail">
            <span className="estrellas">★★★★★</span>
            <span className="score">{producto.rating}</span>
            <span className="opiniones-link">({producto.reviews} opiniones verificadas)</span>
          </div>

          <div className="precio-seccion-ml">
            <div className="precio-principal">
              <span className="monto">{producto.precio}</span>
              {producto.precioAnterior && <span className="precio-viejo">{producto.precioAnterior}</span>}
              {producto.descuento && <span className="descuento-badge">{producto.descuento}</span>}
            </div>
            <p className="cuotas-texto">💳 Paga en hasta 3 cuotas sin interés</p>
          </div>

          <p className="descripcion-producto">{producto.descripcion}</p>

          <div className="selector-cantidad">
            <label>Cantidad:</label>
            <div className="controles-cantidad">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)}>+</button>
            </div>
          </div>

          <div className="acciones-producto">
            <button className="btn-comprar-ya">⚡COMPRAR AHORA</button>
            <button className="btn-agregar-carrito" onClick={manejarAgregar}>
              🛒 AGREGAR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productview;