import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../Context/authContext';
import './NotificationsMenu.css';

const STORAGE_ORDERS = 'nutrik_orders';

function cargarPedidos() {
  try {
    const pedidos = JSON.parse(localStorage.getItem(STORAGE_ORDERS) || '[]');
    return Array.isArray(pedidos) ? pedidos : [];
  } catch (error) {
    console.error('No se pudieron cargar las notificaciones de pedidos.', error);
    return [];
  }
}

function NotificationsMenu() {
  const { user } = useAuth();
  const [abierto, setAbierto] = useState(false);
  const [pedidos, setPedidos] = useState(cargarPedidos);
  const [lecturasPorUsuario, setLecturasPorUsuario] = useState(() => {
    try {
      const lecturas = JSON.parse(localStorage.getItem('nutrik_notificaciones_leidas') || '{}');
      return lecturas && typeof lecturas === 'object' && !Array.isArray(lecturas)
        ? lecturas
        : {};
    } catch (error) {
      console.error('No se pudieron cargar las notificaciones leídas.', error);
      return {};
    }
  });
  const menuRef = useRef(null);
  const claveUsuario = user?.email || 'invitado';
  const leidas = lecturasPorUsuario[claveUsuario] || [];

  useEffect(() => {
    const actualizarPedidos = () => setPedidos(cargarPedidos());
    window.addEventListener('storage', actualizarPedidos);
    window.addEventListener('nutrik:orders-updated', actualizarPedidos);
    return () => {
      window.removeEventListener('storage', actualizarPedidos);
      window.removeEventListener('nutrik:orders-updated', actualizarPedidos);
    };
  }, []);

  useEffect(() => {
    if (!abierto) return undefined;
    const cerrarAlHacerClicFuera = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener('mousedown', cerrarAlHacerClicFuera);
    return () => document.removeEventListener('mousedown', cerrarAlHacerClicFuera);
  }, [abierto]);

  const sinLeer = pedidos.filter((pedido) => !leidas.includes(pedido.id)).length;

  const alternarMenu = () => {
    if (!abierto && sinLeer > 0) {
      const idsActualizados = [...new Set([...leidas, ...pedidos.map((pedido) => pedido.id)])];
      const lecturasActualizadas = { ...lecturasPorUsuario, [claveUsuario]: idsActualizados };
      setLecturasPorUsuario(lecturasActualizadas);
      try {
        localStorage.setItem('nutrik_notificaciones_leidas', JSON.stringify(lecturasActualizadas));
      } catch (error) {
        console.error('No se pudo guardar el estado de lectura de las notificaciones.', error);
      }
    }
    setAbierto((actual) => !actual);
  };

  return (
    <div className="notificaciones" ref={menuRef}>
      <button
        type="button"
        className="notificaciones-boton"
        onClick={alternarMenu}
        aria-label={sinLeer > 0 ? `Notificaciones, ${sinLeer} sin leer` : 'Notificaciones'}
        aria-expanded={abierto}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
        {sinLeer > 0 && <span className="notificaciones-badge">{sinLeer}</span>}
      </button>

      {abierto && (
        <section className="notificaciones-panel" aria-label="Notificaciones recientes">
          <div className="notificaciones-cabecera">
            <div>
              <strong>Notificaciones</strong>
              <span>Actualizaciones de tus pedidos</span>
            </div>
            <button
              type="button"
              className="notificaciones-cerrar"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar notificaciones"
            >
              ×
            </button>
          </div>

          {pedidos.length ? (
            <ul className="notificaciones-lista">
              {pedidos.slice().reverse().map((pedido) => (
                <li className="notificacion-item" key={pedido.id}>
                  <span className="notificacion-punto" aria-hidden="true" />
                  <div>
                    <strong>Pedido {pedido.numero || pedido.id} recibido</strong>
                    <p>
                      Total: ${(Number(pedido.total) || 0).toLocaleString('es-CO')} ·{' '}
                      {pedido.estado || 'Pendiente'}
                    </p>
                    <time dateTime={pedido.createdAt}>
                      {pedido.createdAt
                        ? new Date(pedido.createdAt).toLocaleString('es-CO', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : 'Recientemente'}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="notificaciones-vacias">
              Aún no tienes notificaciones. Aquí verás las actualizaciones de tus pedidos.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

export default NotificationsMenu;
