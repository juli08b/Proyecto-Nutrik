import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { listarUsuarios, actualizarEstadoUsuario, eliminarUsuario, desdeApi } from '../../api/usuarios';
import { ESTADOS_USUARIO, ROLES } from '../../constants/roles';
import './Dashboard.css';
import './AdminManagement.css';

const ESTADOS = Object.values(ESTADOS_USUARIO);

// Lista usuarios desde la API y permite al administrador cambiar su estado.
export default function Usuarios() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [procesandoId, setProcesandoId] = useState(null);

  useEffect(() => {
    if (user?.role !== ROLES.ADMIN) return undefined;
    let vigente = true;
    listarUsuarios()
      .then((lista) => {
        if (vigente) setUsuarios(lista);
      })
      .catch((e) => {
        if (vigente) setError(e.message);
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });
    return () => { vigente = false; };
  }, [user?.role]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== ROLES.ADMIN) return <Navigate to="/login" replace />;

  const cambiarEstado = async (usuario, estado) => {
    setError('');
    setProcesandoId(usuario.id);
    try {
      const respuesta = await actualizarEstadoUsuario(usuario.id, estado);
      if (!respuesta?.data || respuesta.data.Id_usuario == null) {
        throw new Error('Laravel no devolvió el usuario actualizado.');
      }
      const actualizado = desdeApi(respuesta.data);
      setUsuarios((actuales) =>
        actuales.map((item) => (item.id === usuario.id ? actualizado : item))
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setProcesandoId(null);
    }
  };

  const eliminar = async (usuario) => {
    if (!window.confirm(`¿Eliminar la cuenta de ${usuario.nombreCompleto || usuario.email}?`)) return;
    setError('');
    setProcesandoId(usuario.id);
    try {
      await eliminarUsuario(usuario.id);
      setUsuarios((actuales) => actuales.filter((item) => item.id !== usuario.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setProcesandoId(null);
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = busqueda.trim().toLowerCase();
    const coincideTexto =
      !texto ||
      [usuario.nombreCompleto, usuario.email]
        .filter(Boolean)
        .some((valor) => valor.toLowerCase().includes(texto));
    const coincideRol = !filtroRol || usuario.role === filtroRol;
    const coincideEstado = !filtroEstado || usuario.estado === filtroEstado;
    return coincideTexto && coincideRol && coincideEstado;
  });

  return (
    <section className="admin-management">
      <header className="actividad-header">
        <div>
          <p className="actividad-eyebrow">Cuentas</p>
          <h1>Administrar usuarios</h1>
          <p>Consulta y gestiona las cuentas registradas en Laravel.</p>
        </div>
      </header>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <section className="actividad-panel admin-listado">
        <div className="admin-filtros">
          <label>
            Buscar usuario
            <input
              type="search"
              placeholder="Buscar por nombre o correo"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar usuarios"
            />
          </label>
          <label>
            Rol
            <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
              <option value="">Todos los roles</option>
              <option value={ROLES.USER}>{ROLES.USER}</option>
              <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
            </select>
          </label>
          <label>
            Estado
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              {ESTADOS.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
            </select>
          </label>
          <span>{usuariosFiltrados.length} usuario(s)</span>
        </div>
        {cargando ? (
          <p role="status">Cargando usuarios...</p>
        ) : !usuarios.length && error ? (
          <p>No se pudieron cargar los usuarios.</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length ? usuariosFiltrados.map((usuario) => {
                  const esPropio = String(usuario.id) === String(user.id);
                  return (
                    <tr key={usuario.id}>
                      <td>{usuario.nombreCompleto || usuario.primerNombre || 'Sin nombre'}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.role}</td>
                      <td>
                        <select
                          value={usuario.estado}
                          disabled={esPropio || procesandoId !== null}
                          onChange={(e) => cambiarEstado(usuario, e.target.value)}
                          aria-label={`Estado de ${usuario.email}`}
                        >
                          {ESTADOS.map((estado) => (
                            <option key={estado} value={estado}>{estado}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="actividad-btn peligro"
                          disabled={esPropio || procesandoId !== null}
                          onClick={() => eliminar(usuario)}
                          aria-label={`Eliminar ${usuario.email}`}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan="5">No se encontraron usuarios.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
