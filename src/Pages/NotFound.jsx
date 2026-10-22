import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import "./NotFound.css";

// Se muestra cuando alguien entra a una dirección que no existe.
// El Navbar tiene varios links a categorías que todavía no tienen ruta,
// así que esta página evita que el usuario caiga en una pantalla en blanco.
const NotFound = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si es vendedor lo manda a su panel, si no a la tienda
  const destino = user?.role === "vendedor" ? "/vendedor/dashboard" : "/";

  return (
    <div className="notfound">
      <div className="notfound-card">
        <span className="notfound-codigo">404</span>
        <h1>No encontramos esta página</h1>
        <p>
          La dirección que buscas no existe o todavía no está disponible.
          Revisa el enlace o vuelve al inicio.
        </p>

        <div className="notfound-botones">
          <button className="notfound-primario" onClick={() => navigate(destino)}>
            {user?.role === "vendedor" ? "Ir a mi panel" : "Volver al inicio"}
          </button>
          <button className="notfound-secundario" onClick={() => navigate(-1)}>
            ← Volver atrás
          </button>
        </div>

        <Link className="notfound-link" to="/productos">
          O mira el catálogo completo →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
