import Navbar from "./Navbar";

import avatar from "../assets/Usuario.svg";
import logo from "../assets/logoN.svg";
import deseo from "../assets/Deseo.svg";
import carrito from "../assets/Carrito03.svg";
import busqueda from "../assets/Busqueda.svg";

function Header() {
  return (
    <header className="flex w-full flex-col bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-5 px-10 py-2.5">
        <div className="logo">
          <img className="h-auto w-40" src={logo} alt="Nutrick Logo" title="Nutrick" />
        </div>

        <form className="flex max-w-[500px] flex-1 overflow-hidden rounded-lg bg-campo">
          <input
            className="flex-1 border-0 bg-transparent p-2.5 outline-none"
            type="text"
            placeholder="Buscar productos, dietas..."
          />
          <button className="cursor-pointer border-0 bg-marca px-[15px] py-0" type="submit">
            <img src={busqueda} alt="Buscar" />
          </button>
        </form>

        <div className="flex items-center gap-5">
          <div className="icono-user">
            <img className="w-7 cursor-pointer" src={avatar} alt="Usuario" />
          </div>
          <div className="icono-carrito">
            <img className="w-7 cursor-pointer" src={carrito} alt="Carrito" />
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