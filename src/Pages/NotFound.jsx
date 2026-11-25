import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

// Página de reserva para rutas inexistentes; ofrece un destino según la sesión.
const NotFound = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Cualquier usuario con sesión vuelve a su panel; los visitantes van al inicio.
  const destino = user ? "/mis-productos" : "/";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-10">
      <div className="w-full max-w-[460px] rounded-3xl border border-linea bg-white px-8 py-10 text-center shadow-[0_12px_32px_rgba(0,0,0,0.07)]">
        <span className="mb-3 inline-block rounded-full bg-marca-100 px-4 py-1.5 text-[1.6rem] font-extrabold tracking-[2px] text-marca-texto">
          404
        </span>
        <h1 className="mb-2.5 text-[1.4rem] font-bold text-ink">No encontramos esta página</h1>
        <p className="mb-[26px] text-[0.92rem] leading-[1.6] text-muted">
          La dirección que buscas no existe o todavía no está disponible.
          Revisa el enlace o vuelve al inicio.
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            className="w-full cursor-pointer rounded-xl border-none bg-gradient-to-br from-marca-600 to-marca-700 py-[13px] text-[0.92rem] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(31,106,61,0.28)]"
            onClick={() => navigate(destino)}
          >
            {user ? "Ir a mi panel" : "Volver al inicio"}
          </button>
          <button
            className="w-full cursor-pointer rounded-xl border border-marca-200 bg-white py-[13px] text-[0.92rem] font-bold text-neutra transition-all duration-200 hover:bg-marca-50"
            onClick={() => navigate(-1)}
          >
            ← Volver atrás
          </button>
        </div>

        <Link
          className="mt-5 inline-block text-[0.85rem] font-semibold text-marca-600 no-underline hover:underline"
          to="/productos"
        >
          O mira el catálogo completo →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
