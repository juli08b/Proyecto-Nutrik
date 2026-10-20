import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/authContext";
import { useCart } from "../Pages/Cliente/Cart";

import logoPequeno from "../assets/logoNutrick.png";
import carritoIcono from "../assets/Carrito03.svg";
import busquedaIcono from "../assets/Busqueda.svg";
import usuarioIcono from "../assets/Usuario.svg";
import deseoIcono from "../assets/Deseo.svg";

import categoria from "../assets/Categoria.svg";
import dieta from "../assets/Dieta.svg";

const ENLACES = [
  { to: "/productos", texto: "Productos" },
  { texto: "Categorías", menu: "categoria" },
  { to: "/#beneficios", texto: "Beneficios" },
  { to: "/#nosotros", texto: "Nosotros" },
];

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState("");
  const [menuUsuario, setMenuUsuario] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const { user, logout } = useAuth();
  const { totalItems, setCarritoAbierto } = useCart();
  const navigate = useNavigate();
  const navUsuarioRef = useRef(null);

  useEffect(() => {
    if (!menuUsuario) return undefined;
    const alHacerClicFuera = (e) => {
      if (navUsuarioRef.current && !navUsuarioRef.current.contains(e.target)) {
        setMenuUsuario(false);
      }
    };
    document.addEventListener("mousedown", alHacerClicFuera);
    return () => document.removeEventListener("mousedown", alHacerClicFuera);
  }, [menuUsuario]);

  const iniciales = (
    user?.nombreCompleto ||
    user?.primerNombre ||
    (user?.role === "vendedor" ? user?.nombreNegocio : "") ||
    "U"
  )
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const cerrarMovil = () => setMenuMovil(false);

  const abrirSidebar = (menu) => {
    setMenuAbierto(menu);
    setMenuMovil(false);
  };

  const enviarBusqueda = (e) => {
    e.preventDefault();
    setBuscadorAbierto(false);
    navigate(`/productos?q=${encodeURIComponent(busqueda.trim())}`);
  };

  return (
    <>
      <nav className="navegacion">
        <div className="nav-mercado">
          <div className="nav-logo-min">
            <Link to="/" aria-label="Nutrik — Tu salud empieza aquí">
              <img src={logoPequeno} alt="Nutrik" />
            </Link>
            <div className="nav-logo-texto">
              <strong>NUTRIK</strong>
              <span>TU SALUD EMPIEZA AQUÍ</span>
            </div>
          </div>

          <div className="nav-centro">
            <div className="nav-grupo-links">
              {ENLACES.map((enlace) =>
                enlace.menu ? (
                  <button
                    key={enlace.texto}
                    type="button"
                    className="nav-link"
                    onClick={() => setMenuAbierto(enlace.menu)}
                  >
                    {enlace.texto}
                  </button>
                ) : (
                  <Link key={enlace.texto} to={enlace.to} className="nav-link">
                    {enlace.texto}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="nav-acciones">
            <div className="nav-busqueda">
              {buscadorAbierto && (
                <form className="nav-busqueda-form" onSubmit={enviarBusqueda}>
                  <input
                    type="search"
                    value={busqueda}
                    autoFocus
                    placeholder="Buscar productos…"
                    onChange={(e) => setBusqueda(e.target.value)}
                    aria-label="Buscar productos"
                  />
                </form>
              )}
              <button
                type="button"
                className="nav-icono-btn"
                onClick={() => setBuscadorAbierto((v) => !v)}
                aria-label="Buscar"
                aria-expanded={buscadorAbierto}
              >
                <img src={busquedaIcono} alt="" />
              </button>
            </div>

            <Link
              to="/productos"
              className="nav-icono-btn"
              aria-label="Favoritos"
            >
              <img src={deseoIcono} alt="" />
            </Link>

            {user ? (
              <div
                className="nav-usuario"
                ref={navUsuarioRef}
                onClick={() => setMenuUsuario((v) => !v)}
              >
                <button
                  type="button"
                  className="nav-icono-btn nav-icono-btn--usuario"
                  aria-haspopup="menu"
                  aria-expanded={menuUsuario}
                  aria-label="Perfil de usuario"
                >
                  {user.foto ? (
                    <img src={user.foto} alt="Usuario" />
                  ) : (
                    <span className="nav-avatar-texto">{iniciales}</span>
                  )}
                </button>

                {menuUsuario && (
                  <div
                    className="nav-usuario-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user.role === "vendedor" ? (
                      <Link
                        to="/vendedor/dashboard"
                        onClick={() => setMenuUsuario(false)}
                      >
                        🏪 Mi panel
                      </Link>
                    ) : (
                      <Link
                        to="/perfil"
                        onClick={() => setMenuUsuario(false)}
                      >
                        👤 Mi perfil
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuUsuario(false);
                        logout();
                        navigate("/");
                      }}
                    >
                      🚪 Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/elegir-rol"
                className="nav-icono-btn"
                aria-label="Perfil de usuario"
              >
                <img src={usuarioIcono} alt="" />
              </Link>
            )}

            <button
              type="button"
              className="nav-icono-btn nav-icono-btn--carrito"
              onClick={() => setCarritoAbierto(true)}
              aria-label="Abrir carrito de compras"
            >
              <img src={carritoIcono} alt="Carrito" />
              {totalItems > 0 && (
                <span className="carrito-badge">{totalItems}</span>
              )}
            </button>

            <button
              type="button"
              className="nav-hamburguesa"
              onClick={() => setMenuMovil((v) => !v)}
              aria-label={menuMovil ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuMovil}
            >
              {menuMovil ? (
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL */}
      {menuMovil && (
        <>
          <div className="nav-movil-backdrop" onClick={cerrarMovil} />
          <div className="nav-movil">
            <div className="nav-movil-links">
              {ENLACES.map((enlace) =>
                enlace.menu ? (
                  <button
                    key={enlace.texto}
                    type="button"
                    className="nav-movil-link"
                    onClick={() => abrirSidebar(enlace.menu)}
                  >
                    <span className="icono-circulo">
                      <img className="nuevo" src={categoria} alt="" />
                    </span>
                    {enlace.texto}
                  </button>
                ) : (
                  <Link
                    key={enlace.texto}
                    to={enlace.to}
                    className="nav-movil-link"
                    onClick={cerrarMovil}
                  >
                    {enlace.texto}
                  </Link>
                )
              )}
            </div>

            <div className="nav-movil-grupo">
              <button
                type="button"
                className="nav-movil-btn"
                onClick={() => abrirSidebar("categoria")}
              >
                <img src={categoria} alt="" width={16} height={16} />
                CATEGORÍA
              </button>
              <button
                type="button"
                className="nav-movil-btn"
                onClick={() => abrirSidebar("dietas")}
              >
                <img src={dieta} alt="" width={16} height={16} />
                DIETAS
              </button>
            </div>

            {!user && (
              <Link
                to="/elegir-rol"
                className="nav-movil-acceder"
                onClick={cerrarMovil}
              >
                ACCEDER
              </Link>
            )}
          </div>
        </>
      )}

      {/* OVERLAY */}
      <div
        className={`overlay ${menuAbierto ? "activo" : ""}`}
        onClick={() => setMenuAbierto("")}
      />

      {/* SIDEBAR */}
      <div className={`sidebar ${menuAbierto ? "activo" : ""}`}>
        <button
          type="button"
          className="cerrar-menu"
          onClick={() => setMenuAbierto("")}
        >
          ✕
        </button>

        {menuAbierto === "categoria" && (
          <div>
            <h2>Categorías</h2>

            <Link to="/catalog/frozen"> ❄️ Congelados</Link>
            <Link to="/catalog/snacks"> 🍫 Snacks</Link>
            <Link to="/frutas"> 🍎 Frutas</Link>
            <Link to="/aves-pescado"> 🍗 Aves y Pescados</Link>
            <Link to="/lacteos-huevos"> 🥛 Lácteos y Huevos</Link>
            <Link to="/cereales-granos"> 🥣 Cereales y Granos</Link>
            <Link to="/vitaminas"> 💊 Vitaminas y Bienestar</Link>
            <Link to="/suplementos"> 🏋️‍♂️ Suplementos en Polvo</Link>
          </div>
        )}

        {menuAbierto === "productos" && (
          <div>
            <h2>Productos</h2>

            <Link to="/proteinas"> 🥩 Proteínas</Link>
            <Link to="/harinas"> 🍞 Harinas</Link>
            <Link to="/bebidas"> 🥤 Bebidas</Link>
          </div>
        )}

        {menuAbierto === "dietas" && (
          <div>
            <h2>Dietas</h2>

            <Link to="/keto"> 🥑 Keto</Link>
            <Link to="/vegana"> 🥗 Vegana</Link>
            <Link to="/fitness"> 💪 Fitness</Link>
            <Link to="/sin-lactosa"> 🚫🥛 Sin lactosa</Link>
            <Link to="/padeo"> 🍖 Padeo</Link>
            <Link to="/organico"> 🌿 Organico</Link>
            <Link to="/sin-gluten"> 🌾🚫 Sin gluten</Link>
            <Link to="/vegetariano"> 🥕 Vegetariano</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
