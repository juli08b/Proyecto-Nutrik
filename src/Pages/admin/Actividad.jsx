import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { ROLES } from '../../constants/roles';
import {
  EVENTOS_ACTIVIDAD,
  limpiarActividades,
  obtenerActividades,
  resumenActividades,
} from '../../utils/actividad';
import './Dashboard.css';

const FILTROS = [
  { valor: '', texto: 'Todas las acciones' },
  ...Object.entries(EVENTOS_ACTIVIDAD).map(([valor, config]) => ({
    valor,
    texto: config.etiqueta,
  })),
];

function formatearFecha(fecha) {
  if (!fecha) return '—';
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function formatearHora(fecha) {
  if (!fecha) return 'Sin registro';
  return formatearFecha(fecha);
}

// Consulta y exporta la actividad almacenada en este navegador, no un registro global.
export default function Actividad() {
  const { user } = useAuth();
  const [eventos, setEventos] = useState(obtenerActividades);
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    if (user?.role !== ROLES.ADMIN) return undefined;

    const actualizar = () => setEventos(obtenerActividades());
    window.addEventListener('nutrik:activity-updated', actualizar);
    window.addEventListener('storage', actualizar);
    return () => {
      window.removeEventListener('nutrik:activity-updated', actualizar);
      window.removeEventListener('storage', actualizar);
    };
  }, [user?.role]);

  const resumen = useMemo(() => resumenActividades(eventos), [eventos]);

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return eventos
      .filter((evento) => !tipo || evento.tipo === tipo)
      .filter((evento) => {
        if (!texto) return true;
        return [
          evento.usuario?.nombre,
          evento.usuario?.email,
          evento.accion,
          evento.descripcion,
        ]
          .join(' ')
          .toLowerCase()
          .includes(texto);
      })
      .slice()
      .reverse();
  }, [eventos, busqueda, tipo]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== ROLES.ADMIN) return <Navigate to="/" replace />;

  const actualizar = () => setEventos(obtenerActividades());

  const borrar = () => {
    if (!window.confirm('¿Borrar todo el registro de actividad guardado en este navegador?')) {
      return;
    }
    limpiarActividades();
    setEventos([]);
  };

  // La descarga contiene todos los eventos locales, no solo el filtro visible.
  const exportar = () => {
    const blob = new Blob([JSON.stringify(eventos, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `nutrik-actividad-${new Date().toISOString().slice(0, 10)}.json`;
    enlace.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container actividad-container">
      <header className="actividad-header">
        <div>
          <p className="actividad-eyebrow">Control interno</p>
          <h1>Actividad de usuarios</h1>
          <p>Supervisión privada de ingresos y acciones dentro de la tienda.</p>
        </div>
        <div className="actividad-acciones">
          <button type="button" className="actividad-btn" onClick={actualizar}>
            Actualizar
          </button>
          <button type="button" className="actividad-btn" onClick={exportar}>
            Exportar
          </button>
          <button type="button" className="actividad-btn peligro" onClick={borrar}>
            Limpiar
          </button>
        </div>
      </header>

      <section className="actividad-kpis" aria-label="Resumen de actividad">
        <article className="kpi-card">
          <span>Ingresos registrados</span>
          <h2>{resumen.ingresos}</h2>
          <small>Sesiones iniciadas</small>
        </article>
        <article className="kpi-card">
          <span>Usuarios únicos</span>
          <h2>{resumen.usuarios}</h2>
          <small>Cuentas con actividad</small>
        </article>
        <article className="kpi-card">
          <span>Productos vistos</span>
          <h2>{resumen.productos}</h2>
          <small>Fichas consultadas</small>
        </article>
        <article className="kpi-card">
          <span>Pedidos</span>
          <h2>{resumen.pedidos}</h2>
          <small>Compras confirmadas</small>
        </article>
        <article className="kpi-card">
          <span>Última actividad</span>
          <h2 className="actividad-kpi-fecha">{formatearHora(resumen.ultima)}</h2>
          <small>{resumen.total} eventos guardados</small>
        </article>
      </section>

      <section className="actividad-panel">
        <div className="actividad-filtros">
          <label>
            Buscar
            <input
              type="search"
              placeholder="Nombre, correo o acción"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </label>
          <label>
            Acción
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {FILTROS.map((filtro) => (
                <option key={filtro.valor} value={filtro.valor}>
                  {filtro.texto}
                </option>
              ))}
            </select>
          </label>
          <span className="actividad-contador">
            {filtrados.length} de {eventos.length} eventos
          </span>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Detalle</th>
                <th>Fecha</th>
                <th>Ruta</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length ? (
                filtrados.map((evento) => (
                  <tr key={evento.id}>
                    <td>
                      <div className="actividad-usuario">
                        <strong>{evento.usuario?.nombre || 'Invitado'}</strong>
                        <span>{evento.usuario?.email || '—'}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`actividad-tipo actividad-tipo--${evento.tipo}`}>
                        <span aria-hidden="true">
                          {EVENTOS_ACTIVIDAD[evento.tipo]?.icono || '•'}
                        </span>
                        {evento.accion}
                      </span>
                    </td>
                    <td>
                      <span className="actividad-detalle">{evento.descripcion || '—'}</span>
                      {Object.keys(evento.detalles || {}).length > 0 && (
                        <span className="actividad-detalles-extra">
                          {Object.entries(evento.detalles)
                            .map(([clave, valor]) => `${clave}: ${valor}`)
                            .join(' · ')}
                        </span>
                      )}
                    </td>
                    <td>
                      <time dateTime={evento.fecha}>{formatearFecha(evento.fecha)}</time>
                    </td>
                    <td>
                      <code>{evento.ruta}</code>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="actividad-vacio">
                    Todavía no hay actividad registrada con estos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="actividad-nota">
        Los eventos se guardan en este navegador. Para un despliegue real, conecta este
        registro con el backend y protege el acceso desde el servidor.
      </p>
    </div>
  );
}
