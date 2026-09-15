import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/authContext";
import { useCart } from "../Pages/Cliente/Cart";

import logoPequeno from "../assets/logoNutrick.png";
import carritoIcono from "../assets/Carrito03.svg";

import tienda from "../assets/Tienda.svg";
import nuevo from "../assets/Nuevo.svg";
import descuento from "../assets/Descuento.svg";
import sugerencias from "../assets/Sugerencia.svg";
import categoria from "../assets/Categoria.svg";
import dieta from "../assets/Dieta.svg";

function Navbar() {

  // ESTADO DEL MENÚ
  const [menuAbierto, setMenuAbierto] = useState("");
  const [menuUsuario, setMenuUsuario] = useState(false);

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
    document.addEventListener('mousedown', alHacerClicFuera);
    return () => document.removeEventListener('mousedown', alHacerClicFuera);
  }, [menuUsuario]);

  const iniciales = (user?.nombreCompleto || user?.primerNombre || (user?.role === 'vendedor' ? user?.nombreNegocio : '') || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      <nav className="navegacion">
        <div className="nav-mercado">
          <div className="nav-logo-min">
            <Link to="/">
              <img src={logoPequeno} alt="Nutrik" width={120} height={72} />
            </Link>
          </div>

          <ul className="nav-list">
            {/* BOTONES */}
            <li className="nav-grupo-botones">
              <button
                className="btn-nav"
                onClick={() => setMenuAbierto("categoria")}
              >
                <img src={categoria} alt="" width={18} height={18} />
                CATEGORÍA
              </button>

              <button
                className="btn-nav"
                onClick={() => setMenuAbierto("dietas")}
              >
                <img src={dieta} alt="" width={18} height={18} />
                DIETAS
              </button>
            </li>

            {/* DIVISOR */}
            <li className="divisor-container">
              <div className="divisor"></div>
            </li>

            {/* LINKS CENTRO */}
            <li className="nav-grupo-links">
              <span className="nav-extra-item">
                <span className="icono-circulo">
                  <img className="nuevo" src={tienda} alt="" />
                </span>
                <Link to="/Productos">Tienda</Link>
              </span>

              <span className="nav-extra-item">
                <span className="icono-circulo">
                  <img className="nuevo" src={nuevo} alt="" />
                </span>
                <Link to="/Newproduct">Nuevo</Link>
              </span>

              <span className="nav-extra-item">
                <span className="icono-circulo">
                  <img className="nuevo" src={descuento} alt="" />
                </span>
                <Link to="/Discount">Descuento</Link>
              </span>

              <span className="nav-extra-item">
                <span className="icono-circulo">
                  <img className="nuevo" src={sugerencias} alt="" />
                </span>
                <Link to="/Contact">Sugerencias</Link>
              </span>
            </li>

            <li className="divisor-container">
              <div className="divisor"></div>
            </li>

            {/* CARRITO */}
            <li className="nav-perfil">
              <button
                className="btn-carrito-nav"
                onClick={() => setCarritoAbierto(true)}
                aria-label="Abrir carrito de compras"
              >
                <img src={carritoIcono} alt="Carrito" width={22} height={22} />
                {totalItems > 0 && (
                  <span className="carrito-badge">{totalItems}</span>
                )}
              </button>
            </li>

            {/* USUARIO / ACCEDER */}
            <li className="nav-perfil">
              {user ? (
                <div
                  className="nav-usuario"
                  ref={navUsuarioRef}
                  onClick={() => setMenuUsuario((v) => !v)}
                >
                  <button className="btn-nav-usuario">
                    <span className="nav-avatar">
                      {user.foto ? (
                        <img src={user.foto} alt="Usuario" className="nav-avatar-img" />
                      ) : (
                        iniciales
                      )}
                    </span>
                    <span className="nav-usuario-nombre">
                      {user.nombreCompleto || user.primerNombre || user.nombreNegocio || 'Usuario'}
                    </span>
                  </button>

                  {menuUsuario && (
                    <div className="nav-usuario-menu" onClick={(e) => e.stopPropagation()}>
                      {user.role === 'vendedor' ? (
                        <Link to="/vendedor/dashboard" onClick={() => setMenuUsuario(false)}>
                          🏪 Mi panel
                        </Link>
                      ) : (
                        <Link to="/perfil" onClick={() => setMenuUsuario(false)}>
                          👤 Mi perfil
                        </Link>
                      )}
                      <button onClick={() => { setMenuUsuario(false); logout(); navigate('/'); }}>🚪 Cerrar sesión</button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="btn-nav-acceder">
                  <Link to="/elegir-rol">ACCEDER</Link>
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`overlay ${menuAbierto ? "activo" : ""}`}
        onClick={() => setMenuAbierto("")}
      ></div>

      {/* SIDEBAR */}
      <div className={`sidebar ${menuAbierto ? "activo" : ""}`}>

        <button
          className="cerrar-menu"
          onClick={() => setMenuAbierto("")}
        >
          ✕
        </button>

        {menuAbierto === "categoria" && (
          <div>
            <h2>Categorías</h2>

            <Link to="/catalog/frozen"> ❄️ Congelados</Link>
            <br />

            <Link to="/catalog/snacks"> 🍫 Snacks</Link>
            <br />

            <Link to="/frutas"> 🍎 Frutas</Link>
            <br />

            <Link to="/aves-pescado"> 🍗 Aves y Pescados</Link>
            <br />

            <Link to="/lacteos-huevos"> 🥛 Lácteos y Huevos</Link>
            <br />

            <Link to="/cereales-granos"> 🥣 Cereales y Granos</Link>
            <br />

            <Link to="/vitaminas"> 💊 Vitaminas y Bienestar</Link>
            <br />

            <Link to="/suplementos"> 🏋️‍♂️ Suplementos en Polvo</Link>
            <br />



          </div>
        )}

        {menuAbierto === "productos" && (
          <div>
            <h2>Productos</h2>

            <Link to="/proteinas"> 🥩 Proteínas</Link>
            <br />

            <Link to="/harinas"> 🍞 Harinas</Link>
            <br />

            <Link to="/bebidas"> 🥤 Bebidas</Link>
          </div>
        )}

        {menuAbierto === "dietas" && (
          <div>
            <h2>Dietas</h2>

            <Link to="/keto"> 🥑 Keto</Link>
            <br />

            <Link to="/vegana"> 🥗 Vegana</Link>
            <br />

            <Link to="/fitness"> 💪 Fitness</Link>
            <br />

            <Link to="/sin-lactosa"> 🚫🥛 Sin lactosa</Link>
            <br />

            <Link to="/padeo"> 🍖 Padeo</Link>
            <br />

            <Link to="/organico"> 🌿 Organico</Link>
            <br />

            <Link to="/sin-gluten"> 🌾🚫 Sin gluten</Link>
            <br />

            <Link to="/vegetariano"> 🥕 Vegetariano</Link>
            <br />
          </div>
        )}

      </div>
    </>
  );
}



export default Navbar;
