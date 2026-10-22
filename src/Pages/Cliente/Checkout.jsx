import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { useCart } from "./Cart";
import "./Checkout.css";

export default function Checkout() {
  const { user } = useAuth();
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

  const cambiarCampo = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const confirmarPago = (e) => {
    e.preventDefault();
    const numero = "NUT-" + Math.floor(100000 + Math.random() * 900000);
    setNumeroPedido(numero);
    setComprado(true);
    vaciarCarrito(); //El carrito queda vacío tras pagar
  };

  //Pantalla de éxito
  if (comprado) {
    return (
      <div className="checkout-exito">
        <span className="checkout-exito-icono">✅</span>
        <h2>¡Pedido confirmado!</h2>
        <p className="checkout-exito-numero">Número de pedido: <strong>{numeroPedido}</strong></p>
        <p>
          Gracias, {form.nombre.split(" ")[0]}. Te contactaremos para coordinar la entrega de tu pedido.
        </p>
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
            <input name="nombre" value={form.nombre} onChange={cambiarCampo} required />
          </label>

          <label>
            Teléfono
            <input
              name="telefono"
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
              value={form.direccion}
              onChange={cambiarCampo}
              placeholder="Calle, número, barrio"
              required
            />
          </label>

          <label>
            Ciudad
            <input name="ciudad" value={form.ciudad} onChange={cambiarCampo} required />
          </label>

          <h2>Método de pago</h2>
          <div className="checkout-metodos">
            <label className="checkout-metodo">
              <input type="radio" name="metodo" value="contraentrega" checked={form.metodo === "contraentrega"} onChange={cambiarCampo} />
              💵 Pago contra entrega
            </label>
            <label className="checkout-metodo">
              <input type="radio" name="metodo" value="nequi" checked={form.metodo === "nequi"} onChange={cambiarCampo} />
              📱 Nequi
            </label>
            <label className="checkout-metodo">
              <input type="radio" name="metodo" value="tarjeta" checked={form.metodo === "tarjeta"} onChange={cambiarCampo} />
              💳 Tarjeta débito/crédito
            </label>
          </div>

          <button type="submit" className="checkout-pagar-btn">
            Pagar ${totalFinal.toLocaleString("es-CO")}
          </button>
        </form>
      </div>
    </div>
  );
}