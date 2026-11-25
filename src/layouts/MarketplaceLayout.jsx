import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { ROLES } from '../constants/roles';

// Comparte el contenedor entre marketplace y administración; exige sesión y
// restringe visualmente /admin al rol administrativo. La API debe autorizar cada operación.
const VendedorLayout = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const esAdmin = /^\/admin(\/|$)/i.test(pathname);

  if (!user) return <Navigate to="/login" replace />;
  if (esAdmin && user.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="vendedor-layout">
      <main className="vendedor-main">
        <div className="vendedor-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendedorLayout;