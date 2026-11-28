import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import './SidebarVendedor.css';
import { IconoCuenta } from './MenuCuenta';
import { enlacesCuenta, seccionesCuenta } from './enlacesCuenta';

const SidebarVendedor = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const secciones = seccionesCuenta(user);

  const cerrarSesion = async () => {
    const resultado = await logout();
    if (!resultado?.ok) {
      window.alert(resultado?.error || 'No se pudo cerrar la sesión con Laravel.');
      return;
    }
    navigate('/');
  };

  return (
    <aside className="sidebar-vendedor">
      <nav className="sidebar-nav" aria-label="Menú de cuenta">
        {secciones.map(({ modo, titulo }) => (
          <div className="sidebar-grupo" key={modo}>
            <p className="sidebar-grupo-titulo">{titulo}</p>
            {enlacesCuenta(modo).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                title={item.texto}
                aria-label={item.texto}
              >
                <IconoCuenta nombre={item.icono} />
                <span>{item.texto}</span>
              </NavLink>
            ))}
          </div>
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