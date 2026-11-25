import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { listarUsuarios, actualizarEstadoUsuario } from '../../api/usuarios';
import { ESTADOS_USUARIO, ROLES } from '../../constants/roles';

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

  useEffect(() => {
    if (user?.role !== ROLES.ADMIN) return;
    listarUsuarios()
      .then(setUsuarios)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== ROLES.ADMIN) return <Navigate to="/mis-productos" replace />;

  const cambiarEstado = async (usuario, estado) => {
    setError('');
    try {
      await actualizarEstadoUsuario(usuario.id, estado);
      setUsuarios((actuales) =>
        actuales.map((item) => (item.id === usuario.id ? { ...item, estado } : item))
      );
    } catch (e) {
      setError(e.message);
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
    <section style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Administrar usuarios</h1>
      <p>Controla quién puede publicar productos en el marketplace.</p>
      {error && <p role="alert">{error}</p>}
      {cargando ? (
        <p>Cargando usuarios...</p>
      ) : (
        <>
          <div>
            <input
              type="search"
              placeholder="Buscar por nombre o correo"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar usuarios"
            />
            <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
              <option value="">Todos los roles</option>
              <option value={ROLES.USER}>{ROLES.USER}</option>
              <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
            </select>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              {ESTADOS.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
            </select>
          </div>
          <p>{usuariosFiltrados.length} usuario(s)</p>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombreCompleto || usuario.primerNombre || 'Sin nombre'}</td>
                <td>{usuario.email}</td>
                <td>{usuario.role}</td>
                <td>
                  <select
                    value={usuario.estado}
                    disabled={usuario.id === user.id}
                    onChange={(e) => cambiarEstado(usuario, e.target.value)}
                    aria-label={`Estado de ${usuario.email}`}
                  >
                    {ESTADOS.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </section>
  );
}
