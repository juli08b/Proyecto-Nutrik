import { useAuth } from '../Context/authContext';
import NotificationsMenu from './NotificationsMenu';

const HeaderVendedor = () => {
  const { user } = useAuth();

  return (
    <header className="pedidos-header">
      <div className="header-left">
        <div className="logo-nutrik">
          <span>Nutrik Vendedor</span>
        </div>
      </div>

      <div className="header-right">
        <NotificationsMenu />

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