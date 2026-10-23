import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { useCart } from "./Cart";
import { agregarItemCarrito, vaciarCarrito as vaciarCarritoApi } from "../../api/carrito";
import { crearPedidoConDetalles } from "../../api/pedidos";
import "./Checkout.css";

export default function Checkout() {
  const { user, updateProfile } = useAuth();
  const { carrito, totalPrecio, totalItems, vaciarCarrito } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: user?.nombreCompleto || user?.primerNombre || user?.nombreNegocio || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || "",
    ciudad: user?.ciudad || "Bogotá",
    metodo: "contraentrega",
  });
  const [comprado, setComprado] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState("");
  const [errorPago, setErrorPago] = useState("");

  const cambiarCampo = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorPago("");
  };

  //Si no hay sesión: letrero centrado para pedir iniciar sesión
  if (!user) {
    return (
      <div className="checkout-sesion-overlay">
        <div className="checkout-sesion">
          <span className="checkout-sesion-icono">🔒</span>
          <h3>Debes iniciar sesión</h3>
          <p>Para poder pagar tu pedido primero ingresa a tu cuenta de Nutrik.</p>
          <div className="checkout-sesion-botones">
            <Link to="/elegir-rol" className="checkout-sesion-btn-primario">
              Iniciar sesión
            </Link>
            <button className="checkout-sesion-btn-cerrar" onClick={() => navigate("/")}>
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const confirmarPago = async (e) => {
    e.preventDefault();
    setErrorPago("");

    try {
      const hoy = new Date();
      const fechaSalida = hoy.toISOString().slice(0, 10);
      const fechaLlegada = new Date(hoy.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      // Guardamos el carrito actual en la tabla carrito_compras.
      await vaciarCarritoApi(user.id);
      for (const item of carrito) {
        await agregarItemCarrito({
          Id_usuario: user.id,
          Nombre_producto: item.nombre,
          Precio_unitario: Number(item.precio),
          Imagen: item.imagen || null,
          Cantidad: Number(item.cantidad),
          Total: Number(item.precio) * Number(item.cantidad),
        });
      }

      // Guardamos también los datos de entrega en el perfil del usuario.
      await updateProfile({
        telefono: form.telefono.trim(),
        direccion: form.direccion.trim(),
        ciudad: form.ciudad.trim(),
      });

      const pedido = {
        Estado: "Pendiente",
        Fecha_salida: fechaSalida,
        Fecha_Llegada: fechaLlegada,
        Metodo_pago: form.metodo,
        Subtotal: totalPrecio,
        Costo_envio: costoEnvio,
        Total_pedido: totalFinal,
        Direccion_envio: form.direccion.trim(),
        Ciudad_envio: form.ciudad.trim(),
        Id_usuario: user.id,
      };

      const { idPedido } = await crearPedidoConDetalles({ pedido, items: carrito });

      setNumeroPedido(`NUT-${String(idPedido).padStart(6, "0")}`);
      window.dispatchEvent(new Event("nutrik:orders-updated"));
      setComprado(true);
      vaciarCarrito();
    } catch (error) {
      setErrorPago(
        error.message || "No pudimos registrar tu pedido. Inténtalo de nuevo."
      );
    }
  };

  //Pantalla de éxito
  if (comprado) {
    return (
      <div className="checkout-exito">
        <span className="checkout-exito-icono">✅</span>
        <h2>¡Pedido confirmado!</h2>
        <p className="checkout-exito-numero">Número de pedido: <strong>{numeroPedido}</strong></p>
        <p>
          Gracias, {form.nombre.split(" ")[0]}. Tu pedido quedó registrado y te contactaremos para coordinar la entrega.
        </p>
        <p className="checkout-demo-aviso">Esta tienda de demostración no procesa cobros en línea.</p>
        <button className="checkout-exito-btn" onClick={() => navigate("/")}>
          Seguir comprando
        </button>
      </div>
    );
  }

  //Carrito vacío (si entra directo sin nada)
  if (carrito.length === 0) {
    return (
      <div className="checkout-vacio">
        <span className="checkout-vacio-icono">🛒</span>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos antes de ir a pagar.</p>
        <button className="checkout-vacio-btn" onClick={() => navigate("/")}>
          Ir a la tienda
        </button>
      </div>
    );
  }

  const costoEnvio = totalPrecio >= 100000 ? 0 : 9000;
  const totalFinal = totalPrecio + costoEnvio;

  return (
    <div className="checkout">
      <h1 className="checkout-titulo">Finalizar compra</h1>

      <div className="checkout-contenido">
        {/* Resumen del pedido */}
        <section className="checkout-resumen">
          <h2>Tu pedido ({totalItems} productos)</h2>
          <div className="checkout-items">
            {carrito.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />
                <div>
                  <p className="checkout-item-nombre">{item.nombre}</p>
                  <p className="checkout-item-cantidad">Cantidad: {item.cantidad}</p>
                </div>
                <span className="checkout-item-precio">
                  ${(item.precio * item.cantidad).toLocaleString("es-CO")}
                </span>
              </div>
            ))}
          </div>

          <div className="checkout-totales">
            <div className="checkout-total-fila">
              <span>Subtotal</span>
              <span>${totalPrecio.toLocaleString("es-CO")}</span>
            </div>
            <div className="checkout-total-fila">
              <span>Envío</span>
              <span>{costoEnvio === 0 ? "Gratis 🎉" : "$" + costoEnvio.toLocaleString("es-CO")}</span>
            </div>
            <div className="checkout-total-fila checkout-total-grande">
              <span>Total a pagar</span>
              <span>${totalFinal.toLocaleString("es-CO")}</span>
            </div>
          </div>
        </section>

        {/* Datos de entrega y pago */}
        <form className="checkout-form" onSubmit={confirmarPago}>
          <h2>Datos de entrega</h2>

          <label>
            Nombre completo
            <input name="nombre" autoComplete="name" value={form.nombre} onChange={cambiarCampo} required />
          </label>

          <label>
            Teléfono
            <input
              name="telefono"
              type="tel"
              autoComplete="tel"
              value={form.telefono}
              onChange={cambiarCampo}
              placeholder="300 123 4567"
              required
            />
          </label>

          <label>
            Dirección
            <input
              name="direccion"
              autoComplete="street-address"
              value={form.direccion}
              onChange={cambiarCampo}
              placeholder="Calle, número, barrio"
              required
            />
          </label>

          <label>
            Ciudad
            <input name="ciudad" autoComplete="address-level2" value={form.ciudad} onChange={cambiarCampo} required />
          </label>

          <h2>Método de pago</h2>
          <div className="checkout-metodos">
            <label className={`checkout-metodo ${form.metodo === "contraentrega" ? "seleccionado" : ""}`}>
              <input type="radio" name="metodo" value="contraentrega" checked={form.metodo === "contraentrega"} onChange={cambiarCampo} />
              💵 Pago contra entrega
            </label>
            <label className={`checkout-metodo ${form.metodo === "nequi" ? "seleccionado" : ""}`}>
              <input type="radio" name="metodo" value="nequi" checked={form.metodo === "nequi"} onChange={cambiarCampo} />
              📱 Nequi
            </label>
            <label className={`checkout-metodo ${form.metodo === "tarjeta" ? "seleccionado" : ""}`}>
              <input type="radio" name="metodo" value="tarjeta" checked={form.metodo === "tarjeta"} onChange={cambiarCampo} />
              💳 Tarjeta débito/crédito
            </label>
          </div>

          <p className="checkout-demo-aviso">
            Al confirmar, registraremos el pedido en esta demostración; no se realizará ningún cobro.
          </p>
          {errorPago && <p className="checkout-error" role="alert">{errorPago}</p>}

          <button type="submit" className="checkout-pagar-btn">
            Confirmar pedido · ${totalFinal.toLocaleString("es-CO")}
          </button>
        </form>
      </div>
    </div>
  );
}