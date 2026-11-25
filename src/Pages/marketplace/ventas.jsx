import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../../Context/authContext";
import { buscarProducto, formatearPrecio, precioFinal } from "../../data/productosData";
import { listarDetalles, listarPedidos } from "../../api/pedidos";
import { listarProductos } from "../../api/productos";
import "./ventas.css";

const PEDIDOS_HISTORICOS = [
  {
    id: "#1052",
    cliente: "Ana Martínez",
    fecha: "25/08/2026",
    metodo: "Contra entrega",
    direccion: "Cra. 12 #45-18, Bogotá",
    estado: "Completado",
    items: [{ id: "creatine", cantidad: 2 }, { id: "yogur", cantidad: 1 }],
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
    items: [{ id: "omega", cantidad: 1 }, { id: "colageno", cantidad: 2 }],
  },
  {
    id: "#1049",
    cliente: "Diego Ruiz",
    fecha: "24/08/2026",
    metodo: "Contra entrega",
    direccion: "Cll 71 #6-30, Bogotá",
    estado: "Cancelado",
    items: [{ id: "granola", cantidad: 2 }],
  },
];

const COLORES_ESTADO = {
  Completado: "#2f7d4a",
  Enviado: "#547fa8",
  Pendiente: "#e5a839",
  Cancelado: "#cf6961",
};

const normalizarFecha = (fecha) => {
  if (!fecha) return "Fecha no disponible";
  const texto = String(fecha);
  const iso = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) return texto;
  const fechaValida = new Date(fecha);
  return Number.isNaN(fechaValida.getTime())
    ? "Fecha no disponible"
    : fechaValida.toLocaleDateString("es-CO");
};

const obtenerMarcaFecha = (fecha) => {
  const [dia, mes, anio] = normalizarFecha(fecha).split("/");
  return anio ? new Date(Number(anio), Number(mes) - 1, Number(dia)).getTime() : 0;
};

const normalizarItem = (item) => {
  const producto = buscarProducto(item.id || item.productoId);
  const cantidad = Number(item.cantidad ?? item.Cantidad ?? 1);
  const precio = Number(
    item.precio ?? item.Precio_unitario ?? (producto ? precioFinal(producto) : 0)
  );

  return {
    id: String(item.id || item.productoId || item.nombre || item.Nombre_producto || "producto"),
    nombre: item.nombre || item.Nombre_producto || producto?.nombre || "Producto",
    cantidad: Number.isFinite(cantidad) && cantidad > 0 ? cantidad : 1,
    precio: Number.isFinite(precio) ? precio : 0,
  };
};

const normalizarPedido = (pedido, indice = 0) => {
  const items = (Array.isArray(pedido.items) ? pedido.items : []).map(normalizarItem);
  const totalRegistrado = Number(
    pedido.total ?? pedido.totalPedido ?? pedido.Total_pedido ?? pedido.total_pedido
  );
  const envio = Number(pedido.envio ?? pedido.costoEnvio ?? pedido.Costo_envio ?? 0);
  const totalCalculado = items.reduce((total, item) => total + item.precio * item.cantidad, envio);
  const estadoOriginal = pedido.estado || pedido.Estado || "Pendiente";
  const estado = String(estadoOriginal).toLowerCase();
  const etiquetasEstado = {
    completado: "Completado",
    enviado: "Enviado",
    pendiente: "Pendiente",
    cancelado: "Cancelado",
    pagada: "Completado",
    pagado: "Completado",
  };
  const metodo = pedido.metodo || pedido.Metodo_pago || "No especificado";
  const metodosPago = {
    contraentrega: "Contra entrega",
    nequi: "Nequi",
    tarjeta: "Tarjeta",
  };

  return {
    id: String(pedido.numero || pedido.id || pedido.Id_pedido || `pedido-${indice + 1}`),
    cliente: pedido.cliente || pedido.nombre || pedido.Nombre_cliente || "Cliente",
    fecha: normalizarFecha(pedido.fecha || pedido.createdAt || pedido.Fecha_salida),
    estado: etiquetasEstado[estado] || estadoOriginal,
    metodo: metodosPago[String(metodo).toLowerCase()] || metodo,
    direccion: [pedido.direccion || pedido.Direccion_envio, pedido.ciudad || pedido.Ciudad_envio]
      .filter(Boolean)
      .join(", ") || "Dirección no disponible",
    comentario:
      pedido.comentario ||
      pedido.observaciones ||
      pedido.nota ||
      pedido.comentarioCliente ||
      "",
    items,
    total: Number.isFinite(totalRegistrado) && totalRegistrado > 0
      ? totalRegistrado
      : totalCalculado,
  };
};

const cargarPedidosGuardados = () => {
  const pedidos = JSON.parse(localStorage.getItem("nutrik_orders") || "[]");
  if (!Array.isArray(pedidos)) {
    throw new Error("El historial guardado no tiene el formato esperado.");
  }
  return pedidos.map(normalizarPedido);
};

const desempaquetarLista = (respuesta, recurso) => {
  const lista = Array.isArray(respuesta)
    ? respuesta
    : Array.isArray(respuesta?.data)
      ? respuesta.data
      : Array.isArray(respuesta?.data?.data)
        ? respuesta.data.data
        : null;
  if (!lista) throw new Error(`La respuesta de ${recurso} no contiene una lista válida.`);
  return lista;
};

const esVentaCancelada = (venta) => venta.estado.toLowerCase() === "cancelado";

const Ventas = () => {
  const { user } = useAuth();
  const [pedidosGuardados, setPedidosGuardados] = useState([]);
  const [pedidosApi, setPedidosApi] = useState([]);
  const [errorHistorial, setErrorHistorial] = useState("");
  const [cargandoHistorial, setCargandoHistorial] = useState(true);
  const [segmentoSeleccionado, setSegmentoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    let activo = true;
    const actualizarPedidos = () => {
      try {
        setPedidosGuardados(cargarPedidosGuardados());
      } catch (error) {
        console.error("No se pudieron cargar las ventas guardadas.", error);
        setErrorHistorial(error.message || "No se pudieron cargar las ventas guardadas.");
      }

      Promise.all([listarPedidos(), listarDetalles(), listarProductos()])
        .then(([respuestaPedidos, respuestaDetalles, respuestaProductos]) => {
          const pedidosApiOriginales = desempaquetarLista(respuestaPedidos, "pedidos");
          const detalles = desempaquetarLista(respuestaDetalles, "detalles de compra");
          const productos = desempaquetarLista(respuestaProductos, "productos");
          const nombresProductos = new Map(
            productos.map((producto) => [
              String(producto.Id_producto ?? producto.id),
              producto.Nombre_producto ?? producto.nombre ?? "Producto",
            ])
          );
          const detallesPorPedido = new Map();

          detalles.forEach((detalle) => {
            const idPedido = String(detalle.Id_pedido ?? detalle.idPedido ?? "");
            if (!idPedido) return;
            const items = detallesPorPedido.get(idPedido) || [];
            const idProducto = detalle.Id_producto ?? detalle.idProducto;
            items.push({
              id: String(idProducto ?? `producto-${items.length + 1}`),
              nombre: nombresProductos.get(String(idProducto)) || `Producto #${idProducto ?? "—"}`,
              cantidad: detalle.Cantidad ?? detalle.cantidad ?? 1,
              precio: detalle.Precio_unitario ?? detalle.precio ?? 0,
            });
            detallesPorPedido.set(idPedido, items);
          });

          const ventasApi = pedidosApiOriginales.map((pedido, indice) => {
            const id = String(pedido.Id_pedido ?? pedido.id ?? "");
            return normalizarPedido({
              ...pedido,
              items: detallesPorPedido.get(id) || [],
              cliente:
                pedido.Nombre_cliente ||
                pedido.cliente ||
                (pedido.Id_usuario ? `Cliente #${pedido.Id_usuario}` : "Cliente"),
            }, indice);
          });

          if (activo) {
            setPedidosApi(ventasApi);
            setErrorHistorial("");
          }
        })
        .catch((error) => {
          console.error("No se pudieron cargar las ventas desde el servidor.", error);
          if (activo) {
            setErrorHistorial(
              error.message || "No se pudieron cargar las ventas desde el servidor."
            );
          }
        })
        .finally(() => {
          if (activo) setCargandoHistorial(false);
        });
    };

    actualizarPedidos();
    window.addEventListener("nutrik:orders-updated", actualizarPedidos);
    window.addEventListener("storage", actualizarPedidos);
    return () => {
      activo = false;
      window.removeEventListener("nutrik:orders-updated", actualizarPedidos);
      window.removeEventListener("storage", actualizarPedidos);
    };
  }, []);

  const ventas = useMemo(() => {
    const historicas = PEDIDOS_HISTORICOS.map((pedido, indice) =>
      normalizarPedido(pedido, indice)
    );
    const porId = new Map(historicas.map((venta) => [venta.id, venta]));
    pedidosGuardados.forEach((venta) => porId.set(venta.id, venta));
    pedidosApi.forEach((venta) => porId.set(venta.id, venta));
    return [...porId.values()].sort((a, b) => obtenerMarcaFecha(b.fecha) - obtenerMarcaFecha(a.fecha));
  }, [pedidosApi, pedidosGuardados]);

  const ventasActivas = ventas.filter((venta) => !esVentaCancelada(venta));
  const ingresosActivos = ventasActivas.reduce((total, venta) => total + venta.total, 0);
  const promedioVenta = ventasActivas.length ? ingresosActivos / ventasActivas.length : 0;

  const ventasPorDia = (() => {
    const agrupadas = new Map();
    ventasActivas.forEach((venta) => {
      const actual = agrupadas.get(venta.fecha) || { fecha: venta.fecha, total: 0, cantidad: 0 };
      actual.total += venta.total;
      actual.cantidad += 1;
      agrupadas.set(venta.fecha, actual);
    });
    return [...agrupadas.values()]
      .sort((a, b) => obtenerMarcaFecha(a.fecha) - obtenerMarcaFecha(b.fecha))
      .slice(-10);
  })();

  const ventasPorEstado = (() => {
    const agrupadas = new Map();
    ventas.forEach((venta) => agrupadas.set(venta.estado, (agrupadas.get(venta.estado) || 0) + 1));
    return [...agrupadas].map(([estado, cantidad]) => ({
      estado,
      cantidad,
      color: COLORES_ESTADO[estado] || "#83947e",
    }));
  })();

  const ventasSeleccionadas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return ventas.filter((venta) => {
      const coincideSegmento =
        !segmentoSeleccionado ||
        (segmentoSeleccionado.tipo === "fecha"
          ? venta.fecha === segmentoSeleccionado.valor && !esVentaCancelada(venta)
          : venta.estado === segmentoSeleccionado.valor);
      const coincideBusqueda =
        !texto ||
        venta.id.toLowerCase().includes(texto) ||
        venta.cliente.toLowerCase().includes(texto);
      return coincideSegmento && coincideBusqueda;
    });
  }, [busqueda, segmentoSeleccionado, ventas]);

  if (!user) return <Navigate to="/elegir-rol" replace />;
  if (user.role !== "vendedor") return <Navigate to="/perfil" replace />;

  const seleccionarDia = (dato) => {
    const fecha = dato?.fecha || dato?.payload?.fecha;
    if (fecha) setSegmentoSeleccionado({ tipo: "fecha", valor: fecha });
  };

  const seleccionarEstado = (dato) => {
    const estado = dato?.estado || dato?.payload?.estado;
    if (estado) setSegmentoSeleccionado({ tipo: "estado", valor: estado });
  };

  return (
    <div className="ventas-pagina">
      <header className="ventas-encabezado">
        <div>
          <span className="ventas-eyebrow">Resumen comercial</span>
          <h1>Ventas</h1>
          <p>Consulta tus ingresos, el estado de los pedidos y el historial de ventas.</p>
        </div>
        <span className="ventas-contador">
          {cargandoHistorial ? "Cargando…" : `${ventas.length} registros`}
        </span>
      </header>

      {errorHistorial && (
        <div className="ventas-alerta" role="alert">
          No se pudo actualizar el historial desde el servidor: {errorHistorial}
          {ventas.length > 0 && " Se muestran los registros guardados y de ejemplo disponibles."}
        </div>
      )}

      <section className="ventas-indicadores" aria-label="Resumen de ventas">
        <article className="ventas-indicador">
          <span>Ventas registradas</span>
          <strong>{ventasActivas.length}</strong>
          <small>Pedidos no cancelados</small>
        </article>
        <article className="ventas-indicador">
          <span>Ingresos registrados</span>
          <strong>${formatearPrecio(ingresosActivos)}</strong>
          <small>No incluye pedidos cancelados</small>
        </article>
        <article className="ventas-indicador">
          <span>Promedio por venta</span>
          <strong>${formatearPrecio(promedioVenta)}</strong>
          <small>Según ventas no canceladas</small>
        </article>
        <article className="ventas-indicador ventas-indicador-canceladas">
          <span>Pedidos cancelados</span>
          <strong>{ventas.length - ventasActivas.length}</strong>
          <small>Incluidos en el historial</small>
        </article>
      </section>

      <section className="ventas-graficos" aria-label="Gráficas de ventas">
        <article className="ventas-panel-grafico">
          <div className="ventas-panel-titulo">
            <div>
              <h2>Ventas por día</h2>
              <p>Selecciona una barra para ver sus registros</p>
            </div>
            <span className="ventas-icono-grafico" aria-hidden="true">▥</span>
          </div>
          <div className="ventas-grafico">
            {ventasPorDia.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ventasPorDia} margin={{ top: 10, right: 12, left: 2, bottom: 4 }}>
                  <CartesianGrid stroke="#edf1ec" vertical={false} />
                  <XAxis dataKey="fecha" tick={{ fill: "#718071", fontSize: 11 }} />
                  <YAxis
                    tick={{ fill: "#718071", fontSize: 11 }}
                    tickFormatter={(valor) => `$${Math.round(valor / 1000)}k`}
                    width={48}
                  />
                  <Tooltip
                    formatter={(valor, _nombre, props) => [
                      `$${formatearPrecio(valor)} · ${props.payload.cantidad} venta(s)`,
                      "Ingresos",
                    ]}
                    labelFormatter={(fecha) => `Fecha: ${fecha}`}
                  />
                  <Bar
                    dataKey="total"
                    name="Ingresos"
                    fill="#4d8b5a"
                    radius={[7, 7, 0, 0]}
                    cursor="pointer"
                    onClick={seleccionarDia}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="ventas-grafico-vacio">Aún no hay ventas para mostrar.</p>
            )}
          </div>
        </article>

        <article className="ventas-panel-grafico">
          <div className="ventas-panel-titulo">
            <div>
              <h2>Pedidos por estado</h2>
              <p>Selecciona un segmento para ver sus registros</p>
            </div>
            <span className="ventas-icono-grafico ventas-icono-circulo" aria-hidden="true">◉</span>
          </div>
          <div className="ventas-grafico ventas-grafico-circular">
            {ventasPorEstado.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ventasPorEstado}
                    dataKey="cantidad"
                    nameKey="estado"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={94}
                    paddingAngle={3}
                    cursor="pointer"
                    onClick={seleccionarEstado}
                  >
                    {ventasPorEstado.map((item) => (
                      <Cell key={item.estado} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(valor) => [`${valor} pedido(s)`, "Registros"]} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="ventas-grafico-vacio">Aún no hay pedidos para mostrar.</p>
            )}
          </div>
          <div className="ventas-leyenda">
            {ventasPorEstado.map((item) => (
              <button
                className="ventas-leyenda-item"
                key={item.estado}
                onClick={() => setSegmentoSeleccionado({ tipo: "estado", valor: item.estado })}
              >
                <span style={{ "--estado-color": item.color }} />
                {item.estado} <strong>{item.cantidad}</strong>
              </button>
            ))}
          </div>
        </article>
      </section>

      {segmentoSeleccionado && (
        <section className="ventas-detalle-segmento" aria-live="polite">
          <div className="ventas-detalle-cabecera">
            <div>
              <span className="ventas-eyebrow">Detalle de la gráfica</span>
              <h2>
                {segmentoSeleccionado.tipo === "fecha"
                  ? `Ventas del ${segmentoSeleccionado.valor}`
                  : `Pedidos con estado: ${segmentoSeleccionado.valor}`}
              </h2>
              <p>{ventasSeleccionadas.length} registro(s) encontrados</p>
            </div>
            <button
              type="button"
              className="ventas-cerrar-detalle"
              onClick={() => setSegmentoSeleccionado(null)}
            >
              Cerrar detalle
            </button>
          </div>
          {ventasSeleccionadas.length ? (
            <div className="ventas-tarjetas-detalle">
              {ventasSeleccionadas.map((venta) => (
                <article className="venta-detalle-card" key={venta.id}>
                  <div className="venta-detalle-top">
                    <div>
                      <strong>{venta.id}</strong>
                      <span>{venta.fecha}</span>
                    </div>
                    <span className={`venta-estado venta-estado-${venta.estado.toLowerCase()}`}>
                      {venta.estado}
                    </span>
                  </div>
                  <div className="venta-detalle-datos">
                    <p><span>Cliente</span>{venta.cliente}</p>
                    <p><span>Pago</span>{venta.metodo}</p>
                    <p><span>Entrega</span>{venta.direccion}</p>
                  </div>
                  <div className="venta-detalle-productos">
                    <strong>Productos</strong>
                    {venta.items.length ? (
                      <ul>
                        {venta.items.map((item, indice) => (
                          <li key={`${item.id}-${indice}`}>
                            <span>{item.nombre} × {item.cantidad}</span>
                            <strong>${formatearPrecio(item.precio * item.cantidad)}</strong>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Este registro no tiene productos detallados.</p>
                    )}
                  </div>
                  <div className="venta-detalle-pie">
                    <p>
                      <span>Comentario</span>
                      {venta.comentario || "Sin comentarios registrados."}
                    </p>
                    <strong>Total: ${formatearPrecio(venta.total)}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="ventas-sin-registros">No hay ventas que coincidan con este segmento.</p>
          )}
        </section>
      )}

      <section className="ventas-historial">
        <div className="ventas-historial-cabecera">
          <div>
            <span className="ventas-eyebrow">Actividad de la tienda</span>
            <h2>Historial de ventas</h2>
            <p>Registros recientes, con su estado y total.</p>
          </div>
          <label className="ventas-busqueda">
            <span className="ventas-solo-lector">Buscar por pedido o cliente</span>
            <input
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar pedido o cliente"
            />
          </label>
        </div>
        <div className="ventas-tabla-scroll">
          <table className="ventas-tabla">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th className="ventas-th-total">Total</th>
              </tr>
            </thead>
            <tbody>
              {ventasSeleccionadas.length ? (
                ventasSeleccionadas.map((venta) => (
                  <tr key={venta.id}>
                    <td className="ventas-tabla-id">{venta.id}</td>
                    <td>{venta.cliente}</td>
                    <td>{venta.fecha}</td>
                    <td>
                      <span className={`venta-estado venta-estado-${venta.estado.toLowerCase()}`}>
                        {venta.estado}
                      </span>
                    </td>
                    <td className="ventas-tabla-total">${formatearPrecio(venta.total)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="ventas-tabla-vacia" colSpan="5">No hay ventas para mostrar.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="ventas-total-registros">
          Mostrando {ventasSeleccionadas.length} de {ventas.length} registros
        </p>
      </section>
    </div>
  );
};

export default Ventas;
