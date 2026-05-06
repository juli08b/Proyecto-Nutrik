import { Link } from 'react-router-dom'; 
import "./Navbar.css";

import logoPequeno from "../assets/logoNutrick.png"; 
import tienda from "../assets/Tienda.svg";
import nuevo from "../assets/Nuevo.svg";
import descuento from "../assets/Descuento.svg";
import sugerencias from "../assets/Sugerencia.svg";
import categoria from "../assets/Categoria.svg";
import producto from "../assets/Producto.svg";
import dieta from "../assets/Dieta.svg";


function Navbar() {
  return (
    <nav className="navegacion">
      <ul className="nav-list">
        
        <li className="nav-logo-min">
          <Link to="/">
            <img src={logoPequeno} alt="Nutrik" width={150} height={90} />
          </Link>
        </li>

        <li>
          <Link to="/categorias" className="link-wrapper">
            <button className="btn-nav">
              <img src={categoria} alt="" width={20} height={20} />
              CATEGORÍA
            </button>
          </Link>
        </li>
        <li>
          <Link to="/productos" className="link-wrapper">
            <button className="btn-nav">
              <img src={producto} alt="" width={20} height={20} />
              PRODUCTOS
            </button>
          </Link>
        </li>
        <li>
          <Link to="/dietas" className="link-wrapper">
            <button className="btn-nav">
              <img src={dieta} alt="" width={20} height={20} />
              DIETAS
            </button>
          </Link>
        </li>

        <li className="divisor-container">
          <div className="divisor"></div>
        </li>

        <li className="nav-extra-item">
          <Link to="/tienda" className="extra-link">
            <span className="icono-circulo"><img src={tienda} alt="" /></span>
            Tienda
          </Link>
        </li>
        <li className="nav-extra-item">
          <Link to="/nuevo" className="extra-link">
            <span className="icono-circulo"><img src={nuevo} alt="" /></span>
            Lo nuevo
          </Link>
        </li>
        <li className="nav-extra-item">
          <Link to="/descuentos" className="extra-link">
            <span className="icono-circulo"><img src={descuento} alt="" /></span>
            Descuento
          </Link>
        </li>
        <li className="nav-extra-item">
          <Link to="/sugerencias" className="extra-link">
            <span className="icono-circulo"><img src={sugerencias} alt="" /></span>
            Sugerencias
          </Link>
        </li>

        <li className="divisor-container">
          <div className="divisor"></div>
        </li>

        <li>
          {/* Aquí conectamos el botón de Acceder con la página de Login */}
          <Link to="/login" className="link-wrapper">
            <button className="btn-nav-acceder">
              ACCEDER
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;