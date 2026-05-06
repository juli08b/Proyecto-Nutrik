import { Link } from 'react-router-dom'; // Importante para la navegación de React Router
import "./Navbar.css";

// Importación del logo pequeño que querías agregar
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
        
        {/* LOGO PEQUEÑO: Agregado al inicio como pediste */}
        <li className="nav-logo-min">
          <Link to="/">
            <img src={logoPequeno} alt="Nutrik" width={150} height={90} />
          </Link>
        </li>

        {/* Enlaces principales con botones */}
        <li>
          <button className="btn-nav">
            <img src={categoria} alt="" width={20} height={20} />
            <Link to="/categorias">CATEGORÍA</Link>
          </button>
        </li>
        <li>
          <button className="btn-nav">
            <img src={producto} alt="" width={20} height={20} />
            <Link to="/productos">PRODUCTOS</Link>
          </button>
        </li>
        <li>
          <button className="btn-nav">
            <img src={dieta} alt="" width={20} height={20} />
            <Link to="/dietas">DIETAS</Link>
          </button>
        </li>

        {/* Separador visual */}
        <li className="divisor-container">
          <div className="divisor"></div>
        </li>

        {/* Enlaces extra a la derecha */}
        <li className="nav-extra-item">
          <span className="icono-circulo"><img src={tienda} alt="" /></span>
          <Link to="/tienda">Tienda</Link>
        </li>
        <li className="nav-extra-item">
          <span className="icono-circulo"><img src={nuevo} alt="" /></span>
          <Link to="/nuevo">Lo nuevo</Link>
        </li>
        <li className="nav-extra-item">
          <span className="icono-circulo"><img src={descuento} alt="" /></span>
          <Link to="/descuentos">Descuento</Link>
        </li>
        <li className="nav-extra-item">
          <span className="icono-circulo"><img src={sugerencias} alt="" /></span>
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
  );
}

export default Navbar;