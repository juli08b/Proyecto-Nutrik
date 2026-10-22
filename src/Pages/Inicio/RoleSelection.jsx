import { Link } from "react-router-dom";
import logo from "../../assets/logoNutrick.png";
import './RoleSelection.css';

const RoleSelection = () => {
  return (
    <div className="rol-page">
      <div className="rol-card">
        <img src={logo} alt="Logo Nutrik" className="rol-logo" />
        <h1 className="rol-titulo">¿Cómo deseas ingresar a Nutrik?</h1>
        <p className="rol-sub">Elige cómo vas a usar Nutrik para continuar</p>

        <div className="rol-grid">
          {/* TARJETA CLIENTE (COMPRAR) */}
          <div className="rol-opcion">
            <div className="rol-icono">🛒</div>
            <h2>Quiero Comprar</h2>
            <p className="rol-desc">
              Vida sana, productos y recomendaciones de nutrición.
            </p>
            <div className="rol-acciones">
              <Link to="/login" className="rol-boton primario">Iniciar sesión</Link>
              <Link to="/registro" className="rol-boton secundario">Registrarme</Link>
            </div>
          </div>

          {/* TARJETA VENDEDOR (VENDER) */}
          <div className="rol-opcion">
            <div className="rol-icono">🏪</div>
            <h2>Quiero Vender</h2>
            <p className="rol-desc">
              Expón tus productos y llega a más clientes desde tu tienda.
            </p>
            <div className="rol-acciones">
              <Link to="/vendedor/login" className="rol-boton primario">Iniciar sesión</Link>
              <Link to="/vendedor/registro" className="rol-boton secundario">Registrar mi tienda</Link>
            </div>
          </div>
        </div>

        <Link to="/" className="rol-volver">← Volver al inicio</Link>
      </div>
    </div>
  );
};

export default RoleSelection;