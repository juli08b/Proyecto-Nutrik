import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import logo from '../assets/logoNutrick.png';
import './SidebarVendedor.css';

const SidebarVendedor = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar-vendedor">
      <div className="sidebar-logo">
        <img src={logo} alt="Nutrik" />
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/vendedor/dashboard" className="sidebar-item">
          🏠
          <span>Inicio</span>
        </NavLink>

        <NavLink to="/vendedor/productos" className="sidebar-item">
          📦
          <span>Productos</span>
        </NavLink>

        <NavLink to="/vendedor/pedidos" className="sidebar-item">
          🛒
          <span>Pedidos</span>
        </NavLink>

        <NavLink to="/vendedor/facturas" className="sidebar-item">
          🧾
          <span>Facturas</span>
        </NavLink>

        <NavLink to="/vendedor/clientes" className="sidebar-item">
          👥
          <span>Clientes</span>
        </NavLink>

        <NavLink to="/vendedor/ventas" className="sidebar-item">
          📊
          <span>Ventas</span>
        </NavLink>

        <NavLink to="/vendedor/configuracion" className="sidebar-item">
          ⚙️
          <span>Configuración</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        {user && (
          <p className="sidebar-usuario">{user.nombreNegocio || user.name}</p>
        )}
        <button className="sidebar-item cerrar-sesion" onClick={cerrarSesion}>
          🚪
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarVendedor;