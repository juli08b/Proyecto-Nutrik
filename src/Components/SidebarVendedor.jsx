import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { useModo } from '../Context/useModo';
import './SidebarVendedor.css';
import { IconoCuenta } from './MenuCuenta';
import { enlacesCuenta } from './enlacesCuenta';
import { ROLES } from '../constants/roles';

const SidebarVendedor = () => {
  const { user, logout } = useAuth();
  const { modo } = useModo();
  const items = enlacesCuenta(modo);
  if (modo === 'vendedor' && user?.role === ROLES.ADMIN) {
    items.push({ to: '/admin/usuarios', texto: 'Administrar usuarios', icono: 'administracion' });
  }
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar-vendedor">
      <nav className="sidebar-nav" aria-label={`Menú ${modo}`}>
        {items.map((item) => (
          <NavLink
            key={item.texto}
            to={item.to}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            title={item.texto}
            aria-label={item.texto}
          >
            <IconoCuenta nombre={item.icono} />
            <span>{item.texto}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-item cerrar-sesion" onClick={cerrarSesion} title="Cerrar sesión" aria-label="Cerrar sesión">
          <IconoCuenta nombre="salir" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarVendedor;