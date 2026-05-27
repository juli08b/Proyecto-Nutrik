import { createContext, useContext, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

//CONTEXTO 

//CREA LA CJA GLOBAL 
const CartContext = createContext();


export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  //CONTROLA SI EL PANEL ESTA VICIBLE O NO 
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      // BUSCA SI EL PRODUCTO YA ESTA EN EL CARRITO COMPARANDO ID
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id) => {
    //FILTER DEVUELVE LOS PRODUCTOS POR SU ID
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
    // SUMA O RESTA LA CANTIDAD
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + delta } : p))
        // SI LA CANTIDAD LLEGA A 0 LA ELIMINA
        .filter((p) => p.cantidad > 0)
    );
  };

  //SUMA TODAS LA CANTIDAD PARA EL BADGE 
  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  //MULTIPLICA PRECIO X CANTIDAD PARA QUE SE MIRE EL TOTAL
  const totalPrecio = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    //COMPARTE TODOS LOS COMPONENTES
    <CartContext.Provider
      value={{
        carrito,
        carritoAbierto,
        setCarritoAbierto,
        agregarProducto,
        eliminarProducto,
        cambiarCantidad,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

// ── PANEL DEL CARRITO ───
export function CartPanel() {
  const { 
    carrito,
    carritoAbierto,
    setCarritoAbierto,
    eliminarProducto,
    cambiarCantidad,
    totalPrecio,
  } = useCart();

  return (
    <>
      {/* OVERLAY LA PARTE OSCURA */}
      <div
        className={`cart-overlay ${carritoAbierto ? "activo" : ""}`}
        onClick={() => setCarritoAbierto(false)}
      />

      {/* Panel lateral */}
      <div className={`cart-panel ${carritoAbierto ? "activo" : ""}`}>

       {/*HEADER */}
        <div className="cart-header">
          <span>🛒</span>
          <h3>Mi Carrito</h3>
          <button className="cart-cerrar" onClick={() => setCarritoAbierto(false)}>✕</button>
        </div>

        {/* LISTA DE PRODUCTOS  */}
        <div className="cart-items">
          {carrito.length === 0 ? (
            <div className="cart-vacio">
              <p>🛒 Tu carrito está vacío</p>
              <span>Agrega productos para comenzar</span>
            </div>
          ) : (
            carrito.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-nombre">{item.nombre}</p>
                  {/*precio — multiplica precio x cantidad y lo formatea en pesos col */}
                  <p className="cart-item-precio">
                    ${(item.precio * item.cantidad).toLocaleString("es-CO")}
                  </p>
                   {/* Controles de cantidad — botones + y - */}
                  <div className="cart-item-controles">
                    <button onClick={() => cambiarCantidad(item.id, -1)}>−</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                  </div>
                </div>
                      {/* BOTON ELIMINAR */}
                <button className="cart-item-eliminar" onClick={() => eliminarProducto(item.id)}>
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

             {/* FOOTER */}
        {carrito.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="cart-total-precio">${totalPrecio.toLocaleString("es-CO")}</span>
            </div>
             {/*BOTOR PAGAR (AUN SIN FUNCION) */}
            <button className="cart-btn-pagar">Pagar</button>

               {/*BOTON SEGUIR COMPRANDO - CIERRA EL PANEL*/}
            <button className="cart-btn-seguir" onClick={() => setCarritoAbierto(false)}>
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPanel;
