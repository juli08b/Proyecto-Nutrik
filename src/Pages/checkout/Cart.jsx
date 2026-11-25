import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { registrarActividad } from "../../utils/actividad";
import "./Cart.css";

// Carrito compartido por catálogo, panel lateral y checkout; persiste en este navegador.
const CartContext = createContext();
const CART_STORAGE_KEY = "nutrik_cart";

function normalizarItemCarrito(item) {
  const cantidad = Number(item.cantidad ?? item.Cantidad ?? 1);
  const precio = Number(item.precio ?? item.Precio ?? item.Precio_unitario ?? 0);

  return {
    ...item,
    precio: Number.isFinite(precio) ? precio : 0,
    cantidad: Number.isFinite(cantidad) && cantidad > 0 ? Math.floor(cantidad) : 1,
  };
}

function claveProducto(item) {
  const base = String(item.id ?? item.Id_producto ?? item.nombre ?? item.Nombre_producto);
  // Las presentaciones del mismo producto se guardan como líneas distintas.
  return item.variante ? `${base}::${item.variante}` : base;
}

function precioTotalItem(item) {
  const normalizado = normalizarItemCarrito(item);
  return normalizado.precio * normalizado.cantidad;
}

// Unifica líneas repetidas usando la clave del producto y su presentación.
function consolidarCarrito(items) {
  return items.reduce((resultado, itemActual) => {
    const item = normalizarItemCarrito(itemActual);
    const indiceExistente = resultado.findIndex(
      (itemAnterior) => claveProducto(itemAnterior) === claveProducto(item)
    );

    if (indiceExistente === -1) {
      resultado.push(item);
    } else {
      resultado[indiceExistente] = {
        ...resultado[indiceExistente],
        cantidad: resultado[indiceExistente].cantidad + item.cantidad,
      };
    }

    return resultado;
  }, []);
}

function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(guardado) ? consolidarCarrito(guardado) : [];
  } catch {
    return [];
  }
}


export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(cargarCarrito);
  const [avisoCompra, setAvisoCompra] = useState('');
  const { user } = useAuth();
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito]);

  // Rechaza productos propios y notifica a los componentes interesados en la adición.
  const agregarProducto = (producto, cantidad = 1) => {
    const vendedorId = producto.vendedorId ?? producto.user_id ?? producto.Vendedor;
    if (user && vendedorId && String(vendedorId) === String(user.id)) {
      setAvisoCompra('No puedes comprar tus propios productos.');
      return false;
    }
    const cantidadNormalizada = Math.floor(Number(cantidad));
    if (!Number.isFinite(cantidadNormalizada) || cantidadNormalizada < 1) {
      return false;
    }
    const item = { ...producto, cantidad: cantidadNormalizada };
    setAvisoCompra('');

    if (user) {
      registrarActividad({
        tipo: 'carrito',
        accion: 'Agregó al carrito',
        descripcion: `${item.nombre || item.Nombre_producto || 'Producto'} × ${cantidadNormalizada}`,
        usuario: user,
        detalles: {
          producto: item.nombre || item.Nombre_producto || 'Producto',
          cantidad: cantidadNormalizada,
          presentacion: item.presentacion || item.variante || '',
        },
      });
    }

    window.dispatchEvent(
      new CustomEvent("nutrik:product-added", { detail: item })
    );
    setCarrito((prev) => {
      // Un producto (o presentación) ocupa una sola línea; agregarlo otra vez
      // suma la cantidad indicada a la línea existente.
      return consolidarCarrito([...prev, normalizarItemCarrito(item)]);
    });
    return true;
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) =>
      consolidarCarrito(prev.filter((p) => claveProducto(p) !== String(id)))
    );
  };

  const cambiarCantidad = (clave, delta) => {
    setCarrito((prev) =>
      prev
        .map((p) => {
          const item = normalizarItemCarrito(p);
          return claveProducto(item) === String(clave)
            ? { ...item, cantidad: item.cantidad + delta }
            : item;
        })
        .filter((p) => p.cantidad > 0)
        .map(normalizarItemCarrito)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalItems = useMemo(
    () =>
      carrito.reduce(
        (acc, p) => acc + normalizarItemCarrito(p).cantidad,
        0
      ),
    [carrito]
  );
  const totalPrecio = useMemo(
    () =>
      carrito.reduce(
        (acc, p) =>
          acc + precioTotalItem(p),
        0
      ),
    [carrito]
  );

  return (
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
        avisoCompra,
        setAvisoCompra,
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

// Panel lateral que consume el estado compartido sin ser una ruta independiente.
export function CartPanel() {
  const { 
    carrito,
    carritoAbierto,
    setCarritoAbierto,
    eliminarProducto,
    cambiarCantidad,
    totalPrecio,
    avisoCompra,
    setAvisoCompra,
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
                to="/login"
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
      {avisoCompra && (
        <div className="aviso-sesion-overlay" onClick={() => setAvisoCompra('')}>
          <div className="aviso-sesion" onClick={(e) => e.stopPropagation()}>
            <span className="aviso-sesion-icono">⚠️</span>
            <h3>Compra no permitida</h3>
            <p>{avisoCompra}</p>
            <button className="aviso-sesion-btn-cerrar" onClick={() => setAvisoCompra('')}>
              Entendido
            </button>
          </div>
        </div>
      )}
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
              <div className="cart-item" key={claveProducto(item)}>
                <img
                  src={item.imagen || "/favicon.svg"}
                  alt={item.nombre}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <p className="cart-item-nombre">
                    {item.nombre}
                    {item.variante && <small> · {item.variante}</small>}
                  </p>
                  {/*precio — multiplica precio x cantidad y lo formatea en pesos col */}
                  <p className="cart-item-precio">
                    ${precioTotalItem(item).toLocaleString("es-CO")}
                  </p>
                  <p className="cart-item-unitario">
                    ${normalizarItemCarrito(item).precio.toLocaleString("es-CO")} c/u
                  </p>
                  {/* Controles de cantidad — botones + y - */}
                  <div className="cart-item-controles">
                    <button onClick={() => cambiarCantidad(claveProducto(item), -1)}>−</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(claveProducto(item), 1)}>+</button>
                  </div>
                </div>
                      {/* BOTON ELIMINAR */}
                <button className="cart-item-eliminar" onClick={() => eliminarProducto(claveProducto(item))}>
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
