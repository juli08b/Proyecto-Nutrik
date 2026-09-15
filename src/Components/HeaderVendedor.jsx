import { useAuth } from '../Context/authContext';

const HeaderVendedor = () => {
  const { user } = useAuth();

  return (
    <header className="pedidos-header">
      <div className="header-left">
        <button className="menu-button" aria-label="Abrir menú">
          ☰
        </button>
        <div className="logo-nutrik">
          🥗
          <span>Nutrik Vendedor</span>
        </div>
      </div>

      <div className="header-right">
        <div className="notificacion">
          🔔
          <span>3</span>
        </div>

        <div className="header-usuario">
          <span className="header-usuario-nombre">
            {user?.nombreNegocio || user?.name || 'Vendedor'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default HeaderVendedor;