import "./Header.css";
import Navbar from "./Navbar";

import avatar from "../assets/Usuario.svg";
import logo from "../assets/logoN.svg";
import deseo from "../assets/Deseo.svg";
import carrito from "../assets/Carrito03.svg";
import busqueda from "../assets/Busqueda.svg";

function Header() {
  return (
    <header className="header-container">
      <div className="fila-superior">
        <div className="logo">
          <img className="img-logo" src={logo} alt="Nutrick Logo" title="Nutrick" />
        </div>

        <form className="buscador">
          <input type="text" placeholder="Buscar productos, dietas..." />
          <button type="submit">
            <img src={busqueda} alt="Buscar" />
          </button>
        </form>

        <div className="grupo-iconos">
          <div className="icono-user">
            <img className="user" src={avatar} alt="Usuario" />
          </div>
          <div className="icono-carrito">
            <img className="carrito" src={carrito} alt="Carrito" />
          </div>
          <img className="icono-circulo-deseo" src={deseo} alt="Deseo" width={30} height={30} />
        </div>
      </div>

      {/* Aquí insertamos la navegación inferior */}
      <Navbar />
    </header>
  );
}

export default Header;