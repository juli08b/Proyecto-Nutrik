import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useCart } from "../Pages/Cart";

import logoPequeno from "../assets/logoNutrick.png";
import tienda from "../assets/Tienda.svg";
import nuevo from "../assets/Nuevo.svg";
import descuento from "../assets/Descuento.svg";
import sugerencias from "../assets/Sugerencia.svg";
import categoria from "../assets/Categoria.svg";
import producto from "../assets/Producto.svg";
import dieta from "../assets/Dieta.svg";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState("");
  const { totalItems, setCarritoAbierto } = useCart();

  return (
    <>
      <nav className="navegacion">
        <ul className="nav-list">

          <li className="nav-logo-min">
            <Link to="/"><img src={logoPequeno} alt="Nutrik" width={150} height={90} /></Link>
          </li>

          <li>
            <button className="btn-nav" onClick={() => setMenuAbierto("categoria")}>
              <img src={categoria} alt="" width={20} height={20} />CATEGORÍA
            </button>
          </li>

          <li>
            <button className="btn-nav" onClick={() => setMenuAbierto("dietas")}>
              <img src={dieta} alt="" width={20} height={20} />DIETAS
            </button>
          </li>
          
          <button className="btn-nav" onClick={() => setMenuAbierto("productos")}>
            <img src={producto} alt="" width={20} height={20} />PRODUCTOS
            </button>

              {/* ÍCONO CARRITO */}
          <li>
            <button className="btn-carrito-nav" onClick={() => setCarritoAbierto(true)}>
              🛒
              {totalItems > 0 && <span className="carrito-badge">{totalItems}</span>}
            </button>
          </li>

          <li className="divisor-container"><div className="divisor"></div></li>

          <li className="nav-extra-item">
            <span className="icono-circulo"><img className="nuevo" src={tienda} alt="" /></span>
            <Link to="/tienda">Tienda</Link>
          </li>
          <li className="nav-extra-item">
            <span className="icono-circulo"><img className="nuevo" src={nuevo} alt="" /></span>
            <Link to="/nuevo">Lo nuevo</Link>
          </li>
          <li className="nav-extra-item">
            <span className="icono-circulo"><img className="nuevo" src={descuento} alt="" /></span>
            <Link to="/descuentos">Descuento</Link>
          </li>
          <li className="nav-extra-item">
            <span className="icono-circulo"><img className="nuevo" src={sugerencias} alt="" /></span>
            <Link to="/sugerencias">Sugerencias</Link>
          </li>

          <li className="divisor-container"><div className="divisor"></div></li>

          <li>
            <button className="btn-nav-acceder">
              <Link to="/Registro">ACCEDER</Link>
            </button>
          </li>

        </ul>
      </nav>

      {/* OVERLAY SIDEBAR */}
      <div className={`overlay ${menuAbierto ? "activo" : ""}`} onClick={() => setMenuAbierto("")}></div>

      <div className={`sidebar ${menuAbierto ? "activo" : ""}`}>
        <button className="cerrar-menu" onClick={() => setMenuAbierto("")}>✕</button>

        {menuAbierto === "categoria" && (
          <div>
            <h2>Categorías</h2>
            <Link to="/congelados">❄️ Congelados</Link><br />
            <Link to="/snacks">🍫 Snacks</Link><br />
            <Link to="/frutas">🍎 Frutas</Link><br />
            <Link to="/aves-pescado">🍗 Aves y Pescados</Link><br />
            <Link to="/lacteos-huevos">🥛 Lácteos y Huevos</Link><br />
            <Link to="/cereales-granos">🥣 Cereales y Granos</Link><br />
            <Link to="/vitaminas">💊 Vitaminas y Bienestar</Link><br />
            <Link to="/suplementos">🏋️‍♂️ Suplementos en Polvo</Link><br />
          </div>
        )}
       {menuAbierto === "productos" && (
  <div>
    <h2>Productos</h2>
    <Link to="/productos" onClick={() => setMenuAbierto("")}>📋 Ver todos</Link><br />
    <Link to="/proteinas">🥩 Proteínas</Link><br />
    <Link to="/harinas">🍞 Harinas</Link><br />
    <Link to="/bebidas">🥤 Bebidas</Link>
  </div>
)}  
        {menuAbierto === "dietas" && (
          <div>
            <h2>Dietas</h2>
            <Link to="/keto">🥑 Keto</Link><br />
            <Link to="/vegana">🥗 Vegana</Link><br />
            <Link to="/fitness">💪 Fitness</Link><br />
            <Link to="/sin-lactosa">🚫🥛 Sin lactosa</Link><br />
            <Link to="/padeo">🍖 Padeo</Link><br />
            <Link to="/organico">🌿 Organico</Link><br />
            <Link to="/sin-gluten">🌾🚫 Sin gluten</Link><br />
            <Link to="/vegetariano">🥕 Vegetariano</Link><br />
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
