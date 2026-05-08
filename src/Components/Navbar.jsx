import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

import logoPequeno from "../assets/logoNutrick.png";

import tienda from "../assets/Tienda.svg";
import nuevo from "../assets/Nuevo.svg";
import descuento from "../assets/Descuento.svg";
import sugerencias from "../assets/Sugerencia.svg";
import categoria from "../assets/Categoria.svg";
import producto from "../assets/Producto.svg";
import dieta from "../assets/Dieta.svg";

function Navbar() {

  // ESTADO DEL MENÚ
  const [menuAbierto, setMenuAbierto] = useState("");

  return (
    <>
      <nav className="navegacion">
        <ul className="nav-list">

          {/* LOGO */}
          <li className="nav-logo-min">
            <Link to="/">
              <img src={logoPequeno} alt="Nutrik" width={150} height={90} />
            </Link>
          </li>

          {/* BOTONES */}
          <li>
            <button
              className="btn-nav"
              onClick={() => setMenuAbierto("categoria")}
            >
              <img src={categoria} alt="" width={20} height={20} />
              CATEGORÍA
            </button>
          </li>

          <li>
            <button
              className="btn-nav"
              onClick={() => setMenuAbierto("productos")}
            >
              <img src={producto} alt="" width={20} height={20} />
              PRODUCTOS
            </button>
          </li>

          <li>
            <button
              className="btn-nav"
              onClick={() => setMenuAbierto("dietas")}
            >
              <img src={dieta} alt="" width={20} height={20} />
              DIETAS
            </button>
          </li>

          {/* DIVISOR */}
          <li className="divisor-container">
            <div className="divisor"></div>
          </li>

          {/* LINKS DERECHA */}
          <li className="nav-extra-item">
            <span className="icono-circulo">
              <img className="nuevo" src={tienda} alt="" />
            </span>
            <Link to="/tienda">Tienda</Link>
          </li>

          <li className="nav-extra-item">
            <span className="icono-circulo">
              <img className="nuevo" src={nuevo} alt="" />
            </span>
            <Link to="/nuevo">Lo nuevo</Link>
          </li>

          <li className="nav-extra-item">
            <span className="icono-circulo">
              <img className="nuevo" src={descuento} alt="" />
            </span>
            <Link to="/descuentos">Descuento</Link>
          </li>

          <li className="nav-extra-item">
            <span className="icono-circulo">
              <img className="nuevo" src={sugerencias} alt="" />
            </span>
            <Link to="/sugerencias">Sugerencias</Link>
          </li>

          <li className="divisor-container">
            <div className="divisor"></div>
          </li>

          <li>
            <button className="btn-nav-acceder">
              <Link to="/Registro">ACCEDER</Link>
            </button>
          </li>

        </ul>
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

            <Link to="/congelados">Congelados</Link>
            <br />

            <Link to="/snacks">Snacks</Link>
            <br />

            <Link to="/frutas">Frutas</Link>
          </div>
        )}

        {menuAbierto === "productos" && (
          <div>
            <h2>Productos</h2>

            <Link to="/proteinas">Proteínas</Link>
            <br />

            <Link to="/harinas">Harinas</Link>
            <br />

            <Link to="/bebidas">Bebidas</Link>
          </div>
        )}

        {menuAbierto === "dietas" && (
          <div>
            <h2>Dietas</h2>

            <Link to="/keto">Keto</Link>
            <br />

            <Link to="/vegana">Vegana</Link>
            <br />

            <Link to="/fitness">Fitness</Link>
          </div>
        )}

      </div>
    </>
  );
}



export default Navbar;
