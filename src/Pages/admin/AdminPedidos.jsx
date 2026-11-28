import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { listarPedidos } from '../../api/pedidos';
import { ROLES } from '../../constants/roles';
import './AdminManagement.css';

const ESTADOS = ['Pendiente', 'Enviado', 'Completado', 'Cancelado'];

function listaDesde(respuesta) {
  if (Array.isArray(respuesta)) return respuesta;
  return Array.isArray(respuesta?.data) ? respuesta.data : [];
}

function nombreCliente(pedido) {
  const usuario = pedido.usuario;
  const nombre = [
    usuario?.NombreUno_usuario,
    usuario?.NombreDos_usuario,
    usuario?.ApellidoDos_usuario,
    usuario?.SegundoApellido,
  ].filter(Boolean).join(' ');
  return nombre || usuario?.Email || `Usuario ${pedido.Id_usuario ?? '—'}`;
}

function fecha(pedido) {
  const valor = new Date(pedido.created_at || pedido.Fecha_salida || '');
  return Number.isNaN(valor.getTime()) ? '—' : valor.toLocaleDateString('es-CO');
}

function moneda(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(valor) || 0);
}

export default function AdminPedidos() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role !== ROLES.ADMIN) return undefined;
    let vigente = true;

    listarPedidos()
      .then((respuesta) => {
        if (vigente) setPedidos(listaDesde(respuesta));
      })
      .catch((e) => {
        if (vigente) setError(e.message);
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [user?.role]);

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return pedidos.filter((pedido) => {
      if (filtroEstado && pedido.Estado !== filtroEstado) return false;
      if (!texto) return true;
      return [
        pedido.Numero_pedido,
        pedido.Id_pedido,
        pedido.usuario?.Email,
        nombreCliente(pedido),
      ].filter(Boolean).join(' ').toLowerCase().includes(texto);
    });
  }, [pedidos, busqueda, filtroEstado]);

  if (!user) return <Navigate to="/nutrik/owner" replace />;
  if (user.role !== ROLES.ADMIN) return <Navigate to="/" replace />;

  const detalles = pedidoSeleccionado?.detalleCompras || pedidoSeleccionado?.detalle_compras || [];

  return (
    <section className="admin-management">
      <header className="actividad-header">
        <div>
          <p className="actividad-eyebrow">Operación de la tienda</p>
          <h1>Supervisar pedidos</h1>
          <p>Pedidos y detalles consultados desde Laravel; esta vista no altera sus estados ni el inventario.</p>
        </div>
      </header>

      {error && <p role="alert" className="admin-error">{error}</p>}

      <section className="actividad-panel admin-listado">
        <div className="admin-filtros">
          <label>
            Buscar pedido o cliente
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Número, nombre o correo"
            />
          </label>
          <label>
            Estado
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              {ESTADOS.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
            </select>
          </label>
          <span>{filtrados.length} de {pedidos.length} pedidos</span>
        </div>

        {cargando ? (
          <p role="status">Cargando pedidos…</p>
        ) : error ? (
          <p>No se pudieron cargar los pedidos.</p>
        ) : filtrados.length ? (
          <div className="table-responsive">
            <table>
              <thead>
                <tr><th>Número</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Detalle</th></tr>
              </thead>
              <tbody>
                {filtrados.map((pedido) => (
                  <tr key={pedido.Id_pedido}>
                    <td>{pedido.Numero_pedido || `#${pedido.Id_pedido}`}</td>
                    <td>{nombreCliente(pedido)}</td>
                    <td>{fecha(pedido)}</td>
                    <td>{moneda(pedido.Total_pedido)}</td>
                    <td>{pedido.Estado || 'Sin estado'}</td>
                    <td>
                      <button
                        type="button"
                        className="actividad-btn"
                        onClick={() => setPedidoSeleccionado(pedido)}
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No se encontraron pedidos.</p>
        )}
      </section>

      {pedidoSeleccionado && (
        <section className="actividad-panel admin-detalle-pedido" aria-live="polite">
          <div className="table-header">
            <div>
              <h2>Pedido {pedidoSeleccionado.Numero_pedido || `#${pedidoSeleccionado.Id_pedido}`}</h2>
              <p>{nombreCliente(pedidoSeleccionado)} · {fecha(pedidoSeleccionado)}</p>
            </div>
            <button type="button" className="actividad-btn" onClick={() => setPedidoSeleccionado(null)}>
              Cerrar detalle
            </button>
          </div>
          <p>
            {pedidoSeleccionado.Direccion_envio || 'Dirección no disponible'}
            {pedidoSeleccionado.Ciudad_envio ? `, ${pedidoSeleccionado.Ciudad_envio}` : ''}
            {' · '}{pedidoSeleccionado.Metodo_pago || 'Método de pago no disponible'}
          </p>
          {detalles.length ? (
            <div className="table-responsive">
              <table>
                <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th></tr></thead>
                <tbody>
                  {detalles.map((detalle) => (
                    <tr key={detalle.Id_Detalle}>
                      <td>{detalle.producto?.Nombre_producto || `Producto ${detalle.Id_producto}`}</td>
                      <td>{detalle.Cantidad}</td>
                      <td>{moneda(detalle.Precio_unitario)}</td>
                      <td>{moneda(detalle.Subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p>Este pedido no tiene detalles disponibles.</p>}
          <p className="admin-total-pedido">Total: {moneda(pedidoSeleccionado.Total_pedido)}</p>
        </section>
      )}
    </section>
  );
}
