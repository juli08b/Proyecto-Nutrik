import { useState } from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { ROLES } from '../../constants/roles';
import logo from '../../assets/logoNutrick.png';
import './AdminLayout.css';

const ENLACES = [
  { to: '/admin', texto: 'Panel de administración' },
  { to: '/admin/usuarios', texto: 'Usuarios' },
  { to: '/admin/productos', texto: 'Productos' },
  { to: '/admin/categorias', texto: 'Categorías' },
  { to: '/admin/pedidos', texto: 'Pedidos' },
  { to: '/admin/actividad', texto: 'Actividad' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cerrando, setCerrando] = useState(false);
  const [error, setError] = useState('');

  if (!user || user.role !== ROLES.ADMIN) return <Navigate to="/login" replace />;

  const cerrarSesion = async () => {
    setError('');
    setCerrando(true);
    try {
      const resultado = await logout();
      if (!resultado.ok) {
        setError(resultado.error || 'No se pudo cerrar la sesión.');
        return;
      }
      navigate('/login', { replace: true });
    } finally {
      setCerrando(false);
    }
  };

  return (
    <div className="admin-layout">
      <header className="admin-barra">
        <div className="admin-marca">
          <img src={logo} alt="Nutrik" />
          <div><strong>Nutrik</strong><span>Administración</span></div>
        </div>
        <div className="admin-sesion">
          <span>{user.nombreCompleto || user.email || 'Administrador'}</span>
          <button type="button" onClick={cerrarSesion} disabled={cerrando}>
            {cerrando ? 'Cerrando…' : 'Cerrar sesión'}
          </button>
        </div>
      </header>

      <div className="admin-cuerpo">
        <aside className="admin-sidebar">
          <p>Administración</p>
          <nav aria-label="Navegación administrativa">
            {ENLACES.map(({ to, texto }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/admin'}
                className={({ isActive }) => `admin-sidebar-enlace${isActive ? ' activo' : ''}`}
              >
                {texto}
              </NavLink>
            ))}
          </nav>
          <button type="button" className="admin-sidebar-salir" onClick={cerrarSesion} disabled={cerrando}>
            {cerrando ? 'Cerrando…' : 'Cerrar sesión'}
          </button>
        </aside>
        <main className="admin-contenido">
          {error && <p className="admin-layout-error" role="alert">{error}</p>}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
