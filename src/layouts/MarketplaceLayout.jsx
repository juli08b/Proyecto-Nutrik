import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BellRing,
  ChevronDown,
  Heart,
  LogOut,
  MessageCircleMore,
  Search,
  ShoppingBag,
  UserRound,
  X,
  Home,
} from 'lucide-react';

import SidebarVendedor from '../Components/SidebarVendedor';
import { useAuth } from '../Context/authContext';
import { ROLES } from '../constants/roles';

const MarketplaceLayout = () => {
  const [menuMensajesAbierto, setMenuMensajesAbierto] = useState(false);
  const [menuNotificacionesAbierto, setMenuNotificacionesAbierto] = useState(false);
  const [menuPerfilAbierto, setMenuPerfilAbierto] = useState(false);

  const accionesRef = useRef(null);
  const perfilRef = useRef(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const { pathname } = useLocation();

  const esAdmin = /^\/admin(\/|$)/i.test(pathname);
  // Cierra los desplegables al hacer clic fuera de cada contenedor.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accionesRef.current && !accionesRef.current.contains(event.target)) {
        setMenuMensajesAbierto(false);
        setMenuNotificacionesAbierto(false);
      }

      if (perfilRef.current && !perfilRef.current.contains(event.target)) {
        setMenuPerfilAbierto(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return <Navigate to="/login" replace />;

  if (esAdmin && user.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  const iniciales = user.primerNombre
    ? user.primerNombre.charAt(0).toUpperCase()
    : 'U';

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  const abrirMensajes = () => {
    setMenuMensajesAbierto((abierto) => !abierto);
    setMenuNotificacionesAbierto(false);
  };

  const abrirNotificaciones = () => {
    setMenuNotificacionesAbierto((abierto) => !abierto);
    setMenuMensajesAbierto(false);
  };

  const botonAccionClass = (abierto) =>
    `relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors
    focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500
    ${abierto
      ? 'bg-green-50 text-green-700'
      : 'text-gray-500 hover:bg-gray-100 hover:text-green-700'
    }`;

  const handleBuscar = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    if (!busqueda.trim()) return; // Si está vacío, no hace nada

    // Decidimos a dónde enviar al usuario según dónde esté parado
    const esRutaVentas = pathname.includes('/vendedor') || pathname.includes('/mis-productos');

    if (esRutaVentas) {
      // Si está en ventas, busca en sus productos
      navigate(`/vendedor/productos?q=${encodeURIComponent(busqueda)}`);
    } else {
      // Si está en perfil o admin, busca en el catálogo general
      navigate(`/productos?q=${encodeURIComponent(busqueda)}`);
    }

    // Opcional: Limpiar el buscador después de buscar
    // setBusqueda(""); 
  };

  const cerrarMenusPerfil = () => setMenuPerfilAbierto(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA] font-sans">
      <SidebarVendedor />

      <div className="ml-64 flex h-screen min-w-0 flex-1 flex-col">
        {/* Barra superior */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
          {/* Buscador */}
          {/* Buscador */}
          <div className="mx-8 w-full max-w-md flex-1">
            {/* ✅ Envolvemos en un form para capturar el Enter */}
            <form onSubmit={handleBuscar} className="relative">
              <Search
                size={18}
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                placeholder="Buscar productos, pedidos..."
                aria-label="Buscar productos y pedidos"
                value={busqueda} // ✅ Conectado al estado
                onChange={(e) => setBusqueda(e.target.value)} // ✅ Actualiza el estado
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm
        outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
            </form>

          </div>

          {/* Mensajes, notificaciones y perfil */}
          <div className="flex shrink-0 items-center gap-3 md:gap-5">
            <div ref={accionesRef} className="relative flex items-center gap-2">
              {/* Mensajes */}
              <div className="relative">
                <button
                  type="button"
                  onClick={abrirMensajes}
                  className={botonAccionClass(menuMensajesAbierto)}
                  aria-label="Abrir mensajes"
                  aria-expanded={menuMensajesAbierto}
                  title="Mensajes"
                >
                  <MessageCircleMore size={21} strokeWidth={1.8} aria-hidden="true" />
                  {/* Indicador de mensajes nuevos: mostrar solo si hay mensajes sin leer */}
                  {/* <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-blue-500" /> */}
                </button>

                {menuMensajesAbierto && (
                  <div
                    role="dialog"
                    aria-label="Mensajes"
                    className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                  >
                    <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
                      <div>
                        <h2 className="text-sm font-semibold text-gray-800">Mensajes</h2>
                        <p className="mt-1 text-xs text-gray-500">Tus conversaciones</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMenuMensajesAbierto(false)}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Cerrar mensajes"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="px-5 py-8 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                        <MessageCircleMore size={23} strokeWidth={1.7} />
                      </div>
                      <p className="text-sm font-medium text-gray-700">No tienes mensajes</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Aquí aparecerán tus conversaciones cuando recibas un mensaje.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Notificaciones */}
              <div className="relative">
                <button
                  type="button"
                  onClick={abrirNotificaciones}
                  className={botonAccionClass(menuNotificacionesAbierto)}
                  aria-label="Abrir notificaciones"
                  aria-expanded={menuNotificacionesAbierto}
                  title="Notificaciones"
                >
                  <BellRing size={21} strokeWidth={1.8} aria-hidden="true" />
                  {/* Indicador: quitarlo cuando no haya notificaciones pendientes */}
                  <span
                    className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"
                    aria-label="Notificaciones pendientes"
                  />
                </button>

                {menuNotificacionesAbierto && (
                  <div
                    role="dialog"
                    aria-label="Notificaciones"
                    className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                  >
                    <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
                      <div>
                        <h2 className="text-sm font-semibold text-gray-800">Notificaciones</h2>
                        <p className="mt-1 text-xs text-gray-500">Actualizaciones de tus pedidos</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMenuNotificacionesAbierto(false)}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Cerrar notificaciones"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="px-5 py-8 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                        <BellRing size={23} strokeWidth={1.7} />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Todo al día</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Aquí verás las novedades y actualizaciones de tus pedidos.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden h-8 w-px bg-gray-200 md:block" />

            {/* Menú de perfil */}
            <div ref={perfilRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuPerfilAbierto((abierto) => !abierto)}
                className={`group flex items-center gap-3 rounded-full border py-1.5 pl-2 pr-3 transition
                  ${menuPerfilAbierto
                    ? 'border-gray-200 bg-gray-50 shadow-sm'
                    : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                  }`}
                aria-label="Abrir menú de perfil"
                aria-expanded={menuPerfilAbierto}
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-green-400 to-green-700 font-bold text-white shadow-sm">
                  {user.foto ? (
                    <img src={user.foto} alt="Foto de perfil" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-sm">{iniciales}</span>
                  )}
                </div>

                <div className="hidden text-left md:block">
                  <p className="max-w-[120px] truncate text-sm font-semibold leading-tight text-gray-800 transition group-hover:text-green-700">
                    {user.primerNombre || 'Usuario'}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                    {user.role === ROLES.ADMIN
                      ? 'Administrador'
                      : user.tipoUsuario === 'vendedor'
                        ? 'Vendedor'
                        : 'Usuario'}
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`ml-1 text-gray-400 transition-transform duration-200 group-hover:text-gray-700 ${menuPerfilAbierto ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {menuPerfilAbierto && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                  <div className="mb-1 border-b border-gray-100 px-4 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Accion
                    </p>
                  </div>
                  <Link
                    to="/"
                    onClick={cerrarMenusPerfil}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <Home size={16} className="text-gray-400" />
                    Volver a la Tienda
                  </Link>
                  <div className="mb-1 border-b border-gray-100 px-4 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Mi cuenta
                    </p>
                  </div>

                  <Link
                    to="/seguimiento"
                    onClick={cerrarMenusPerfil}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <ShoppingBag size={16} className="text-gray-400" />
                    Seguimiento de pedidos
                  </Link>

                  <Link
                    to="/favoritos"
                    onClick={cerrarMenusPerfil}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <Heart size={16} className="text-gray-400" />
                    Mis favoritos
                  </Link>

                  <Link
                    to="/perfil"
                    onClick={cerrarMenusPerfil}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <UserRound size={16} className="text-gray-400" />
                    Mi perfil
                  </Link>

                  <div className="mt-1 border-t border-gray-100 pt-1">
                    <button
                      type="button"
                      onClick={cerrarSesion}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Contenido principal con desplazamiento independiente */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div >
    </div >
  );
};

export default MarketplaceLayout;
