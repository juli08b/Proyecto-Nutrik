import { createContext, useContext, useState } from "react";
import "./Cart.css";

// ===== CONTEXTO =====
const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [abierto, setAbierto] = useState(false);

  const agregar = (producto) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminar = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter((i) => i.cantidad > 0)
    );
  };

  const totalItems = items.reduce((s, i) => s + i.cantidad, 0);
  const totalPrecio = items.reduce((s, i) => s + i.precio * i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ items, agregar, eliminar, cambiarCantidad, totalItems, totalPrecio, abierto, setAbierto }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

// ===== DRAWER =====
function Cart() {
  const { items, eliminar, cambiarCantidad, totalPrecio, abierto, setAbierto } = useCart();

  return (
    <>
      {abierto && (
        <div className="carrito-overlay" onClick={() => setAbierto(false)} />
      )}
      <div className={`carrito-drawer ${abierto ? "abierto" : ""}`}>
        <div className="carrito-header">
          <h2>🛒 Mi Carrito</h2>
          <button className="cerrar-btn" onClick={() => setAbierto(false)}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío</p>
            <small>Agrega productos saludables</small>
          </div>
        ) : (
          <>
            <div className="carrito-items">
              {items.map((item) => (
                <div key={item.id} className="carrito-item">
                  <img src={item.imagen} alt={item.nombre} />
                  <div className="item-info">
                    <p className="item-nombre">{item.nombre}</p>
                    <p className="item-precio">${(item.precio * item.cantidad).toLocaleString()}</p>
                    <div className="item-controles">
                      <button onClick={() => cambiarCantidad(item.id, -1)}>−</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => cambiarCantidad(item.id, +1)}>+</button>
                    </div>
                  </div>
                  <button className="item-eliminar" onClick={() => eliminar(item.id)}>Eliminar</button>
                </div>
              ))}
            </div>
            <div className="carrito-footer">
              <div className="total-row">
                <span>Total:</span>
                <strong>${totalPrecio.toLocaleString()}</strong>
              </div>
              <button className="btn-pagar">Pagar</button>
              <button className="btn-seguir" onClick={() => setAbierto(false)}>Seguir comprando</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;