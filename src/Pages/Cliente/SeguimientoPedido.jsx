import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { listarDetalles, listarPedidos } from '../../api/pedidos';
import { formatearPrecio } from '../../data/productosData';
import OrderStatus from '../../Components/OrderStatus';
import './SeguimientoPedido.css';

function listaDeRespuesta(respuesta) {
  const datos = respuesta?.data ?? respuesta;
  return Array.isArray(datos) ? datos : [];
}

function valor(pedido, ...campos) {
  for (const campo of campos) {
    if (pedido?.[campo] !== undefined && pedido[campo] !== null) {
      return pedido[campo];
    }
  }
  return '';
}

function parsearFecha(fecha) {
  if (typeof fecha === 'string') {
    const soloFecha = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha);
    if (soloFecha) {
      return new Date(
        Number(soloFecha[1]),
        Number(soloFecha[2]) - 1,
        Number(soloFecha[3])
      );
    }
  }
  return new Date(fecha);
}

function fechaLegible(fecha) {
  if (!fecha) return 'Fecha no disponible';
  const parsed = parsearFecha(fecha);
  if (Number.isNaN(parsed.getTime())) return String(fecha);
  return parsed.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function fechaYHora(fecha) {
  if (!fecha) return '';
  const parsed = parsearFecha(fecha);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleString('es-CO', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function estadoNormalizado(pedido) {
  return String(valor(pedido, 'Estado', 'estado') || 'pendiente')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(' ', '_');
}

function propietarioId(pedido) {
  return valor(
    pedido,
    'Id_usuario',
    'id_usuario',
    'user_id',
    'usuario_id',
    'cliente_id'
  ) || pedido?.usuario?.Id_usuario || pedido?.usuario?.id || pedido?.user?.id;
}

function idPedido(pedido) {
  return String(valor(pedido, 'Id_pedido', 'id_pedido', 'id'));
}

function perteneceAlUsuario(pedido, user) {
  const propietario = propietarioId(pedido);
  return propietario !== undefined && propietario !== '' &&
    String(propietario) === String(user.id);
}

function detallesDelPedido(detalles, pedido) {
  const id = idPedido(pedido);
  const incluidos = pedido.detalles || pedido.items || pedido.productos;
  if (Array.isArray(incluidos)) return incluidos;

  return detalles.filter(
    (detalle) =>
      String(valor(detalle, 'Id_pedido', 'id_pedido', 'pedido_id')) === id
  );
}

function metodoLegible(metodo) {
  const clave = String(metodo).toLowerCase();
  const metodos = {
    contraentrega: 'Pago contra entrega',
    efectivo: 'Pago contra entrega',
    nequi: 'Nequi',
    tarjeta: 'Tarjeta',
    pse: 'PSE',
    pseb: 'PSE',
  };
  return metodos[clave] || metodo || 'No especificado';
}

function SeguimientoPedido() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState('');
  const [cargando, setCargando] = useState(Boolean(user?.id));
  const [error, setError] = useState('');

  const cargarPedidos = useCallback(async () => {
    if (!user?.id) return;
    try {
      const [respuestaPedidos, respuestaDetalles] = await Promise.all([
        listarPedidos(),
        listarDetalles(),
      ]);
      const propios = listaDeRespuesta(respuestaPedidos)
        .filter((pedido) => perteneceAlUsuario(pedido, user))
        .sort((a, b) => {
          const fechaA = parsearFecha(valor(a, 'Fecha_salida', 'Fecha_pedido', 'created_at', 'createdAt') || 0).getTime();
          const fechaB = parsearFecha(valor(b, 'Fecha_salida', 'Fecha_pedido', 'created_at', 'createdAt') || 0).getTime();
          return fechaB - fechaA;
        });
      setPedidos(propios);
      setDetalles(listaDeRespuesta(respuestaDetalles));
      setPedidoSeleccionado((actual) =>
        propios.some((pedido) => idPedido(pedido) === actual)
          ? actual
          : idPedido(propios[0] || {})
      );
    } catch (e) {
      setError(e.message || 'No pudimos cargar tus pedidos. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  }, [user]);

  const actualizarPedidos = useCallback(() => {
    setCargando(true);
    setError('');
    cargarPedidos();
  }, [cargarPedidos]);

  useEffect(() => {
    if (!user?.id) return undefined;
    void Promise.resolve().then(cargarPedidos);
    window.addEventListener('nutrik:orders-updated', actualizarPedidos);
    return () => window.removeEventListener('nutrik:orders-updated', actualizarPedidos);
  }, [cargarPedidos, actualizarPedidos, user?.id]);

  const pedido = useMemo(
    () => pedidos.find((item) => idPedido(item) === pedidoSeleccionado) || pedidos[0],
    [pedidos, pedidoSeleccionado]
  );
  const items = pedido ? detallesDelPedido(detalles, pedido) : [];
  const estado = pedido ? estadoNormalizado(pedido) : '';
  const fechaEntrega = pedido
    ? valor(pedido, 'Fecha_Llegada', 'fecha_entrega', 'Fecha_entrega')
    : '';
  const total = pedido
    ? Number(valor(pedido, 'Total_pedido', 'total', 'Total') || 0)
    : 0;
  const subtotal = pedido
    ? Number(valor(pedido, 'Subtotal', 'subtotal') || 0)
    : 0;
  const envio = pedido
    ? Number(valor(pedido, 'Costo_envio', 'envio', 'costo_envio') || 0)
    : 0;
  const direccion = pedido
    ? [
        valor(pedido, 'Direccion_envio', 'direccion_envio', 'direccion'),
        valor(pedido, 'Ciudad_envio', 'ciudad_envio', 'ciudad'),
      ]
        .filter(Boolean)
        .join(', ')
    : '';

  const descargarRecibo = () => {
    if (!pedido) return;
    const numero = valor(pedido, 'Numero_pedido', 'numero', 'Id_pedido', 'id');
    const lineas = items.map((item) => {
      const nombre =
        item.producto?.Nombre_producto ||
        item.producto?.nombre ||
        valor(item, 'Nombre_producto', 'nombre_producto', 'nombre') ||
        'Producto';
      const cantidad = Number(valor(item, 'Cantidad', 'cantidad') || 1);
      const precio = Number(
        valor(item, 'Precio_unitario', 'precio_unitario', 'precio') || 0
      );
      return `${cantidad} x ${nombre} — $${formatearPrecio(precio * cantidad)}`;
    });
    const contenido = [
      'NUTRIK — RESUMEN DE PEDIDO',
      `Pedido: ${numero}`,
      `Fecha: ${fechaLegible(valor(pedido, 'Fecha_salida', 'Fecha_pedido', 'created_at', 'createdAt'))}`,
      `Estado: ${valor(pedido, 'Estado', 'estado') || 'Pendiente'}`,
      '',
      'PRODUCTOS',
      ...(lineas.length ? lineas : ['Detalle de productos no disponible']),
      '',
      `Subtotal: $${formatearPrecio(subtotal)}`,
      `Envío: ${envio ? `$${formatearPrecio(envio)}` : 'Gratis'}`,
      `Total: $${formatearPrecio(total)}`,
      `Dirección: ${direccion || 'No disponible'}`,
      `Pago: ${metodoLegible(valor(pedido, 'Metodo_pago', 'metodo_pago'))}`,
    ].join('\n');

    const archivo = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `resumen-pedido-${numero}.txt`;
    enlace.click();
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <main className="seguimiento-pagina">
        <section className="seguimiento-vacio">
          <span className="seguimiento-vacio-icono">📦</span>
          <h1>Inicia sesión para consultar tus pedidos</h1>
          <p>Al entrar a tu cuenta podrás revisar el estado y los detalles de tus compras.</p>
          <Link className="seguimiento-boton-primario" to="/elegir-rol">
            Iniciar sesión
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="seguimiento-pagina">
      <header className="seguimiento-encabezado">
        <div>
          <p className="seguimiento-eyebrow">TU TIENDA SALUDABLE</p>
          <h1>Seguimiento de pedidos</h1>
          <p>Consulta el estado y los detalles de tus compras en un solo lugar.</p>
        </div>
        <button
          className="seguimiento-boton-secundario"
          onClick={actualizarPedidos}
          disabled={cargando}
        >
          <span aria-hidden="true">↻</span>
          {cargando ? 'Actualizando…' : 'Actualizar'}
        </button>
      </header>

      {error && (
        <section className="seguimiento-error" role="alert">
          <div>
            <strong>No pudimos cargar tus pedidos</strong>
            <p>{error}</p>
          </div>
          <button onClick={actualizarPedidos} disabled={cargando}>Intentar de nuevo</button>
        </section>
      )}

      {cargando && pedidos.length === 0 && (
        <section className="seguimiento-cargando" role="status">
          <span className="seguimiento-spinner" aria-hidden="true" />
          <p>Buscando tus pedidos…</p>
        </section>
      )}

      {!cargando && !error && pedidos.length === 0 && (
        <section className="seguimiento-vacio">
          <span className="seguimiento-vacio-icono">🛍️</span>
          <h2>Aún no tienes pedidos</h2>
          <p>Cuando completes una compra, aquí podrás ver su estado y el resumen.</p>
          <Link className="seguimiento-boton-primario" to="/productos">
            Explorar productos
          </Link>
        </section>
      )}

      {pedidos.length > 0 && pedido && (
        <>
          {pedidos.length > 1 && (
            <div className="seguimiento-selector">
              <label htmlFor="seguimiento-pedido-select">Pedido que quieres consultar</label>
              <select
                id="seguimiento-pedido-select"
                value={pedidoSeleccionado}
                onChange={(event) => setPedidoSeleccionado(event.target.value)}
              >
                {pedidos.map((opcion) => (
                  <option key={idPedido(opcion)} value={idPedido(opcion)}>
                    Pedido #{valor(opcion, 'Numero_pedido', 'numero', 'Id_pedido', 'id')} ·{' '}
                    {fechaLegible(valor(opcion, 'Fecha_salida', 'Fecha_pedido', 'created_at', 'createdAt'))}
                  </option>
                ))}
              </select>
            </div>
          )}

          <section className="seguimiento-resumen-superior">
            <div className="seguimiento-pedido-titulo">
              <span className="seguimiento-icono-caja">♧</span>
              <div>
                <div className="seguimiento-numero-fila">
                  <h2>Pedido #{valor(pedido, 'Numero_pedido', 'numero', 'Id_pedido', 'id')}</h2>
                  <span className={`seguimiento-estado-chip ${estado === 'cancelado' ? 'cancelado' : ''}`}>
                    {valor(pedido, 'Estado', 'estado') || 'Pendiente'}
                  </span>
                </div>
                <p>Realizado el {fechaLegible(valor(pedido, 'Fecha_salida', 'Fecha_pedido', 'created_at', 'createdAt'))}</p>
              </div>
            </div>
            <div className="seguimiento-acciones">
              <button
                className="seguimiento-boton-secundario"
                onClick={descargarRecibo}
              >
                ↓ Descargar resumen
              </button>
            </div>
          </section>

          <div className="seguimiento-columnas">
            <div className="seguimiento-columna-principal">
              {estado === 'cancelado' ? (
                <section className="seguimiento-cancelado">
                  <span>!</span>
                  <div>
                    <h2>Este pedido fue cancelado</h2>
                    <p>Si necesitas más información sobre la cancelación, contacta a nuestro equipo.</p>
                  </div>
                </section>
              ) : (
                <>
                  <section className="seguimiento-entrega">
                    <div className="seguimiento-entrega-texto">
                      <p>FECHA ESTIMADA DE ENTREGA</p>
                      <strong>{fechaEntrega ? fechaLegible(fechaEntrega) : 'Por confirmar'}</strong>
                      <span>
                        {fechaEntrega
                          ? 'La fecha puede cambiar según la preparación y el transporte.'
                          : 'Te mostraremos la fecha cuando esté disponible.'}
                      </span>
                    </div>
                    <div className="seguimiento-entrega-icono" aria-hidden="true">🚚</div>
                  </section>

                  <section className="seguimiento-estado-card">
                    <div className="seguimiento-seccion-titulo">
                      <span>✓</span>
                      <div>
                        <h2>Estado del pedido</h2>
                        <p>Te mostramos cada etapa de tu compra.</p>
                      </div>
                    </div>
                    <OrderStatus currentState={estado} />
                  </section>
                </>
              )}
            </div>

            <aside className="seguimiento-columna-lateral">
              <section className="seguimiento-compra-card">
                <div className="seguimiento-seccion-titulo">
                  <span>▤</span>
                  <h2>Resumen de compra</h2>
                  <small>{items.length} {items.length === 1 ? 'artículo' : 'artículos'}</small>
                </div>
                <div className="seguimiento-items">
                  {items.length ? items.map((item, index) => {
                    const nombre =
                      item.producto?.Nombre_producto ||
                      item.producto?.nombre ||
                      valor(item, 'Nombre_producto', 'nombre_producto', 'nombre') ||
                      'Producto';
                    const imagen =
                      item.producto?.Imagen ||
                      item.producto?.imagen ||
                      valor(item, 'Imagen', 'imagen');
                    const cantidad = Number(valor(item, 'Cantidad', 'cantidad') || 1);
                    const precio = Number(
                      valor(item, 'Precio_unitario', 'precio_unitario', 'precio') || 0
                    );
                    return (
                      <article className="seguimiento-item" key={`${nombre}-${index}`}>
                        <div className="seguimiento-item-imagen">
                          {imagen ? <img src={imagen} alt="" /> : <span>🌿</span>}
                        </div>
                        <div className="seguimiento-item-info">
                          <strong>{nombre}</strong>
                          <span>Cantidad: {cantidad}</span>
                        </div>
                        <strong className="seguimiento-item-precio">
                          ${formatearPrecio(precio * cantidad)}
                        </strong>
                      </article>
                    );
                  }) : (
                    <p className="seguimiento-sin-detalle">
                      El resumen de artículos no está disponible para este pedido.
                    </p>
                  )}
                </div>
                <div className="seguimiento-totales">
                  <div><span>Subtotal</span><strong>${formatearPrecio(subtotal)}</strong></div>
                  <div><span>Envío</span><strong>{envio ? `$${formatearPrecio(envio)}` : 'Gratis'}</strong></div>
                  <div className="seguimiento-total-final"><span>Total del pedido</span><strong>${formatearPrecio(total)}</strong></div>
                </div>
              </section>

              <section className="seguimiento-datos-card">
                <div className="seguimiento-dato">
                  <span className="seguimiento-dato-icono">⌖</span>
                  <div>
                    <small>DIRECCIÓN DE ENTREGA</small>
                    <strong>{direccion || 'Dirección no disponible'}</strong>
                  </div>
                </div>
                <div className="seguimiento-dato">
                  <span className="seguimiento-dato-icono">▣</span>
                  <div>
                    <small>MÉTODO DE PAGO</small>
                    <strong>{metodoLegible(valor(pedido, 'Metodo_pago', 'metodo_pago'))}</strong>
                  </div>
                </div>
                {fechaYHora(valor(pedido, 'Fecha_salida', 'Fecha_pedido', 'created_at', 'createdAt')) && (
                  <div className="seguimiento-dato">
                    <span className="seguimiento-dato-icono">◷</span>
                    <div>
                      <small>FECHA DEL PEDIDO</small>
                      <strong>{fechaYHora(valor(pedido, 'Fecha_salida', 'Fecha_pedido', 'created_at', 'createdAt'))}</strong>
                    </div>
                  </div>
                )}
              </section>

              <section className="seguimiento-ayuda-card">
                <div>
                  <strong>¿Necesitas ayuda?</strong>
                  <p>Escríbenos por WhatsApp usando el botón verde de la esquina.</p>
                </div>
              </section>
            </aside>
          </div>
        </>
      )}
    </main>
  );
}

export default SeguimientoPedido;
