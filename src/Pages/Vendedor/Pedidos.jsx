import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "../Cliente/Cart";
import { useAuth } from "../../Context/authContext";
import { buscarProducto, precioFinal, formatearPrecio } from "../../data/productosData";
import "./Pedidos.css";

const FILTROS = ["Todos", "Pendiente", "Enviado", "Completado", "Cancelado"];

const pedidosBase = [
  {
    id: "#1052",
    cliente: "Ana Martínez",
    fecha: "25/08/2026",
    metodo: "Contra entrega",
    direccion: "Cra. 12 #45-18, Bogotá",
    estado: "Completado",
    items: [
      { id: "creatine", cantidad: 2 },
      { id: "yogur", cantidad: 1 },
    ],
  },
  {
    id: "#1051",
    cliente: "Carlos López",
    fecha: "25/08/2026",
    metodo: "PSE",
    direccion: "Calle 100 #10-22, Medellín",
    estado: "Enviado",
    items: [{ id: "detox", cantidad: 3 }],
  },
  {
    id: "#1050",
    cliente: "Lucía Gómez",
    fecha: "24/08/2026",
    metodo: "Contra entrega",
    direccion: "Av. 6N #23-14, Cali",
    estado: "Pendiente",
    items: [
      { id: "omega", cantidad: 1 },
      { id: "colageno-premium", cantidad: 2 },
    ],
  },
  {
    id: "#1049",
    cliente: "Diego Ruiz",
    fecha: "24/08/2026",
    metodo: "Contra entrega",
    direccion: "Cll 71 #6-30, Bogotá",
    estado: "Cancelado",
    items: [{ id: "barra-tosh", cantidad: 2 }],
  },
];

// Suma el dinero de un pedido: subtotal sin descuento, ahorro y total real
const calcularDinero = (items) =>
  items.reduce(
    (acc, item) => {
      const original = Number(item.precioOriginal || 0) * Number(item.cantidad || 1);
      const final = Number(item.precio || 0) * Number(item.cantidad || 1);
      acc.subtotal += original;
      acc.descuento += original - final;
      acc.total += final;
      return acc;
    },
    { subtotal: 0, descuento: 0, total: 0 }
  );

// El precio y el descuento SIEMPRE se leen del catálogo, nunca se escriben a mano,
// así el pedido cobra exactamente lo mismo que la tienda
const lineaDesdeCatalogo = (id, cantidad) => {
  const producto = buscarProducto(id);
  if (!producto) return null;
  return {
    id: producto.id,
    nombre: producto.nombre,
    imagen: producto.imagen,
    cantidad: Number(cantidad || 1),
    descuento: producto.descuento || 0,
    precioOriginal: producto.precio,
    precio: precioFinal(producto),
  };
};

const Pedidos = () => {
  const { user } = useAuth();
  // con el botón "−" el producto se elimina solo cuando la cantidad llega a 0
  const { carrito, cambiarCantidad, vaciarCarrito } = useCart();

  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [enviados, setEnviados] = useState([]);

  const pedidos = useMemo(() => {
    // EL PEDIDO EN CURSO: es el carrito del cliente, resuelto contra el catálogo
    const enCurso = {
      id: "#EN-CURSO",
      cliente: user?.nombreNegocio || user?.name || "Cliente en curso",
      fecha: new Date().toLocaleDateString("es-CO"),
      metodo: "Contra entrega",
      direccion: "Dirección por confirmar",
      estado: "Pendiente",
      items: carrito
        .map((item) => lineaDesdeCatalogo(item.id, item.cantidad))
        .filter(Boolean),
      enCurso: true,
    };

    // LOS PEDIDOS GUARDADOS
    const historicos = pedidosBase.map((pedido) => ({
      ...pedido,
      items: pedido.items
        .map((linea) => lineaDesdeCatalogo(linea.id, linea.cantidad))
        .filter(Boolean),
    }));

    return carrito.length > 0 ? [enCurso, ...historicos] : historicos;
  }, [carrito, user]);

  // SOLO PEDE VER ESTA VISTA SI ES VENDEDOR CON SESIÓN
  if (!user) return <Navigate to="/elegir-rol" replace />;
  if (user.role !== "vendedor") return <Navigate to="/perfil" replace />;

  // Si lo mandaron a enviar, el estado real del pedido pasa a ser "Enviado"
  const estadoReal = (pedido) => (enviados.includes(pedido.id) ? "Enviado" : pedido.estado);

  // FILTRA POR ESTADO Y POR TEXTO (N° de pedido, cliente o fecha)
  const pedidosFiltrados = pedidos.filter((p) => {
    const coincideEstado = filtro === "Todos" || estadoReal(p) === filtro;
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return coincideEstado;
    return (
      coincideEstado &&
      (p.id.toLowerCase().includes(texto) ||
        p.cliente.toLowerCase().includes(texto) ||
        p.fecha.toLowerCase().includes(texto))
    );
  });

  const cuenta = (estado) =>
    estado === "Todos"
      ? pedidos.length
      : pedidos.filter((p) => estadoReal(p) === estado).length;

  // ── VISTA ──
  const detallePedidoActivo = pedidos.find((p) => p.id === pedidoSeleccionado);
  const dineroDetalle = detallePedidoActivo
    ? calcularDinero(detallePedidoActivo.items)
    : null;

  return (
    <div className="pedidos-vendedor">
      {/* ── TÍTULO ── */}
      <div className="pedidos-titulo">
        <h1>Pedidos</h1>
        <p>Gestiona y administra los pedidos de tus clientes</p>
      </div>

      {/* ── BUSCADOR + FILTROS ── */}
      <div className="pedidos-controles">
        <div className="pedidos-buscador">
          <span className="buscador-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por N° pedido, cliente o fecha..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="pedidos-filtros">
          {FILTROS.map((f) => (
            <button
              key={f}
              className={`filtro-btn ${filtro === f ? "activo" : ""}`}
              onClick={() => setFiltro(f)}
            >
              {f}
              <span className="filtro-cuenta">{cuenta(f)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLA DE PEDIDOS ── */}
      <div className="tabla-contenedor">
        {pedidosFiltrados.length === 0 ? (
          <div className="tabla-vacia">
            <p>🛒 No se encontraron pedidos</p>
            <span>Prueba con otro estado o cambia la búsqueda</span>
          </div>
        ) : (
          <div className="tabla-scroll">
            <table className="pedidos-tabla">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th className="th-total">Total</th>
                  <th>Estado</th>
                  <th className="th-acciones">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((pedido) => {
                  const dinero = calcularDinero(pedido.items);
                  const estado = estadoReal(pedido);

                  return (
                    <tr key={pedido.id}>
                      <td className="td-id">{pedido.id}</td>
                      <td>
                        <span className="td-cliente">{pedido.cliente}</span>
                        {/* si el pedido trae descuento se avisa en la misma celda */}
                        {dinero.descuento > 0 && (
                          <span className="td-ahorro">
                            −{formatearPrecio(dinero.descuento)} en descuentos
                          </span>
                        )}
                      </td>
                      <td className="td-fecha">{pedido.fecha}</td>
                      <td className="th-total td-total">${formatearPrecio(dinero.total)}</td>
                      <td>
                        <span className={`status-badge ${estado.toLowerCase()}`}>{estado}</span>
                      </td>
                      <td className="td-acciones">
                        <button
                          className="btn-ver-detalle"
                          title="Ver detalle del pedido"
                          onClick={() => setPedidoSeleccionado(pedido.id)}
                        >
                          👁
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* CONTEO DE LO QUE SE ESTÁ MOSTRANDO */}
        <div className="tabla-pie">
          Mostrando {pedidosFiltrados.length} de {pedidos.length} pedidos
        </div>
      </div>

      {/* ── MODAL DE DETALLE DEL PEDIDO ── */}
      {pedidoSeleccionado && detallePedidoActivo && (
        <div className="modal-overlay" onClick={() => setPedidoSeleccionado(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-titulo">
                <h3>Pedido {detallePedidoActivo.id}</h3>
                <p>{detallePedidoActivo.cliente}</p>
              </div>
              <span className={`status-badge ${estadoReal(detallePedidoActivo).toLowerCase()}`}>
                {estadoReal(detallePedidoActivo)}
              </span>
              <button
                className="modal-cerrar"
                title="Cerrar"
                onClick={() => setPedidoSeleccionado(null)}
              >
                ✕
              </button>
            </div>

            {/* DATOS DE LA ENTREGA */}
            <div className="pedido-datos">
              <span>🗓 {detallePedidoActivo.fecha}</span>
              <span>📍 {detallePedidoActivo.direccion}</span>
              <span>💳 {detallePedidoActivo.metodo}</span>
            </div>

            {/* PRODUCTOS */}
            <div className="modal-items">
              {detallePedidoActivo.items.length === 0 ? (
                <p className="pedido-sin-items">Este pedido todavía no tiene productos</p>
              ) : (
                detallePedidoActivo.items.map((item) => {
                  // el ahorro es solo de ESE producto, no del pedido completo
                  const ahorroLinea = (item.precioOriginal - item.precio) * item.cantidad;

                  return (
                    <div className="modal-item" key={item.id}>
                      <img src={item.imagen} alt={item.nombre} className="modal-item-img" />

                      <div className="modal-item-info">
                        <p className="modal-item-nombre">{item.nombre}</p>

                        {item.descuento > 0 && (
                          <p className="modal-item-original">
                            <span className="item-off">-{item.descuento}%</span>
                            <s>${formatearPrecio(item.precioOriginal * item.cantidad)}</s>
                            <em>ahorra ${formatearPrecio(ahorroLinea)}</em>
                          </p>
                        )}

                        <p className="modal-item-unitario">
                          ${formatearPrecio(item.precio)} c/u
                        </p>
                      </div>

                      <div className="modal-item-lado">
                        <p className="modal-item-total">
                          ${formatearPrecio(item.precio * item.cantidad)}
                        </p>

                        {/* SOLO EL PEDIDO EN CURSO SE PUEDE EDITAR */}
                        {detallePedidoActivo.enCurso && (
                          <div className="item-controles">
                            <button
                              title="Quitar una unidad"
                              onClick={() => cambiarCantidad(item.id, -1)}
                            >
                              −
                            </button>
                            <span>{item.cantidad}</span>
                            <button
                              title="Agregar una unidad"
                              onClick={() => cambiarCantidad(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* DINERO */}
            <div className="modal-footer">
              <div className="total-fila">
                <span>Subtotal</span>
                <span>${formatearPrecio(dineroDetalle.subtotal)}</span>
              </div>

              {dineroDetalle.descuento > 0 && (
                <div className="total-fila total-descuento">
                  <span>Descuentos aplicados</span>
                  <span>− ${formatearPrecio(dineroDetalle.descuento)}</span>
                </div>
              )}

              <div className="total-fila total-final">
                <span>Total del pedido</span>
                <span>${formatearPrecio(dineroDetalle.total)}</span>
              </div>

              {/* SOLO EL PEDIDO EN CURSO TIENE ACCIONES */}
              {detallePedidoActivo.enCurso ? (
                <div className="modal-acciones">
                  {enviados.includes(detallePedidoActivo.id) ? (
                    <p className="pedido-confirmacion">
                      ✅ Pedido marcado como enviado
                    </p>
                  ) : (
                    <button
                      className="btn-primario"
                      onClick={() =>
                        setEnviados((prev) => [...prev, detallePedidoActivo.id])
                      }
                    >
                      📦 Marcar como enviado
                    </button>
                  )}
                  <button className="btn-secundario" onClick={vaciarCarrito}>
                    Descartar pedido
                  </button>
                </div>
              ) : (
                <div className="modal-acciones">
                  <button
                    className="btn-secundario"
                    onClick={() => setPedidoSeleccionado(null)}
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
