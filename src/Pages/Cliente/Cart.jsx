import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import "./Cart.css";

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

  //VACÍA EL CARRITO COMPLETO TRAS PAGAR
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  //SUMA TODAS LA CANTIDAD PARA EL BADGE 
  const totalItems = useMemo(() => carrito.reduce((acc, p) => acc + Number(p.cantidad || 1), 0), [carrito]);
  //MULTIPLICA PRECIO X CANTIDAD PARA QUE SE MIRE EL TOTAL
  const totalPrecio = useMemo(
    () => carrito.reduce((acc, p) => acc + Number(p.precio || 0) * Number(p.cantidad || 1), 0),
    [carrito]
  );

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
        vaciarCarrito,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
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

  const { user } = useAuth();
  const navigate = useNavigate();
  const [mostrarAviso, setMostrarAviso] = useState(false);

  const manejarPagar = () => {
    if (user) {
      setCarritoAbierto(false); // Cierra el panel y va al pago
      navigate("/checkout");
    } else {
      //SIN SESIÓN: AVISA EN EL CENTRO QUE DEBE INICIAR SESIÓN
      setMostrarAviso(true);
    }
  };

  return (
    <>
      {/* OVERLAY LA PARTE OSCURA */}
      <div
        className={`cart-overlay ${carritoAbierto ? "activo" : ""}`}
        onClick={() => setCarritoAbierto(false)}
      />

      {/* LETRERO CENTRAL cuando intenta pagar sin sesión */}
      {mostrarAviso && (
        <div className="aviso-sesion-overlay" onClick={() => setMostrarAviso(false)}>
          <div className="aviso-sesion" onClick={(e) => e.stopPropagation()}>
            <span className="aviso-sesion-icono">🔒</span>
            <h3>Debes iniciar sesión</h3>
            <p>Para poder pagar tu pedido necesitas iniciar sesión en tu cuenta de Nutrik.</p>
            <div className="aviso-sesion-botones">
              <Link
                to="/elegir-rol"
                className="aviso-sesion-btn-primario"
                onClick={() => setMostrarAviso(false)}
              >
                Iniciar sesión
              </Link>
              <button className="aviso-sesion-btn-cerrar" onClick={() => setMostrarAviso(false)}>
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <p className="cart-item-unitario">
                    ${item.precio.toLocaleString("es-CO")} c/u
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
             {/*BOTON PAGAR — exige sesión iniciada */}
            <button className="cart-btn-pagar" onClick={manejarPagar}>
              Pagar · ${totalPrecio.toLocaleString("es-CO")}
            </button>

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
