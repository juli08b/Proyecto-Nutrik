import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SidebarVendedor from "../Components/SidebarVendedor";
import { useAuth } from "../Context/authContext";
import { ROLES } from "../constants/roles";

const MarketplaceLayout = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const esAdmin = /^\/admin(\/|$)/i.test(pathname);

  if (!user) return <Navigate to="/login" replace />;
  if (esAdmin && user.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar fijo arriba */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar fijo a la izquierda */}
        <SidebarVendedor />

        {/* ✅ CORRECCIÓN: Contenedor principal con margen izquierdo y centrado interno */}
        <main className="flex-1 ml-64 p-6">
          {/* Este div es el que centra el contenido dentro del área disponible */}
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketplaceLayout;
