import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SidebarVendedor from '../Components/SidebarVendedor';
import { useAuth } from '../Context/authContext';
import { ROLES } from '../constants/roles';
// Importa aquí tus iconos (lucide-react o los que uses)
import { Search, Bell, MessageSquare, ChevronDown } from 'lucide-react';

const MarketplaceLayout = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const esAdmin = /^\/admin(\/|$)/i.test(pathname);

  if (!user) return <Navigate to="/login" replace />;
  if (esAdmin && user.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">

      {/* 1. SIDEBAR (Fijo a la izquierda, ocupa todo el alto) */}
      <SidebarVendedor />

      {/* 2. COLUMNA DERECHA (Topbar + Contenido) */}
      <div className="flex-1 flex flex-col ml-64 h-screen">

        {/* 3. TOPBAR (Barra superior interna del Dashboard) */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">

          {/* Título o Migas de pan */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hola Vendedor</h1>
          </div>

          {/* Buscador Central */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Buscar productos, pedidos..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Acciones de la derecha (Mensajes, Notificaciones, Perfil) */}
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <MessageSquare size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                {user?.nombre?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-700">{user?.nombre || 'Usuario'}</p>
                <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Admin' : 'Vendedor'}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* 4. ÁREA DE CONTENIDO CON SCROLL INDEPENDIENTE */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default MarketplaceLayout;