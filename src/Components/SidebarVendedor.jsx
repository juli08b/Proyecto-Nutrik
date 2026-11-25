import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
// import './SidebarVendedor.css'; // <-- Ya no lo necesitas si usas Tailwind
import { IconoCuenta } from "./MenuCuenta";
import { enlacesCuenta, seccionesCuenta } from "./enlacesCuenta";

const SidebarVendedor = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const secciones = seccionesCuenta(user);

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    // Contenedor principal: Ancho fijo, fondo blanco, borde derecho, flex col
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 flex flex-col justify-between z-40">
      {/* Área scrolleable si hay muchos items */}
      <nav
        className="flex-1 overflow-y-auto py-6 px-4"
        aria-label="Menú de cuenta"
      >
        {/* Opcional: Zona de perfil de usuario (Recomendado en el paso anterior) */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
            {user?.nombre?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Hola, {user?.nombre || "Usuario"}
            </p>
            <p className="text-xs text-gray-500">Vendedor</p>
          </div>
        </div>

        {secciones.map(({ modo, titulo }) => (
          <div key={modo} className="mb-6">
            {/* Título de sección más sutil */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
              {titulo}
            </p>

            <div className="flex flex-col gap-1">
              {enlacesCuenta(modo).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "bg-green-50 text-green-700 border-l-4 border-green-600" // ESTADO ACTIVO MEJORADO
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                    }`
                  }
                  title={item.texto}
                  aria-label={item.texto}
                >
                  {/* Asegúrate de que el icono herede el color del texto */}
                  <span className="w-5 h-5 flex items-center justify-center">
                    <IconoCuenta nombre={item.icono} />
                  </span>
                  <span>{item.texto}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer fijo abajo */}
      <div className="p-4 border-t border-gray-100">
        <button
          type="button"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
          onClick={cerrarSesion}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <IconoCuenta nombre="salir" />
          </span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarVendedor;
