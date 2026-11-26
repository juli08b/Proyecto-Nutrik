import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { IconoCuenta } from "./MenuCuenta";
import { enlacesCuenta, seccionesCuenta } from "./enlacesCuenta";
import logoPequeno from "../assets/logoN.svg";

const SidebarVendedor = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const secciones = seccionesCuenta(user);

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between z-50">
      {/* Logo de la marca en la parte superior */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100 shrink-0">
        <Link to="/" aria-label="Nutrik — Tu salud empieza aquí" className="flex items-center gap-3 group">

          {/* Logo (Imagen) */}
          <img
            src={logoPequeno}
            alt="Nutrik"
            className="block h-15 w-auto max-w-[100px] object-contain transition-transform group-hover:scale-105"
          />

          {/* Texto del Logo */}
          <div className="flex flex-col leading-[1.05]">
            <strong className="text-[#1A4D2E] text-[1.15rem] font-black tracking-[0.14em]">
              NUTRIK
            </strong>
            <span className="text-[#7f8f83] text-[0.58rem] font-bold tracking-[0.14em] uppercase">
              TU SALUD EMPIEZA AQUÍ
            </span>
          </div>

        </Link>
      </div>

      {/* Área scrolleable */}
      <nav
        className="flex-1 overflow-y-auto py-6 px-4"
        aria-label="Menú de cuenta"
      >
        {/* Secciones y enlaces */}
        <div className="flex flex-col gap-6">
          {secciones.map(({ modo, titulo }) => (
            <div key={modo}>
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
                      ${isActive
                        ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                      }`
                    }
                    title={item.texto}
                    aria-label={item.texto}
                  >
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <IconoCuenta nombre={item.icono} />
                    </span>
                    <span className="truncate">{item.texto}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer fijo abajo */}
      <div className="p-4 border-t border-gray-100 shrink-0">
        <button
          type="button"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
          onClick={cerrarSesion}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <IconoCuenta nombre="salir" />
          </span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarVendedor;