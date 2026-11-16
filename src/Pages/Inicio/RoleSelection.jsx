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

          {/* TARJETA ADMIN */}
          <div className="rol-opcion">
            <div className="rol-icono">🏪</div>
            <h2>Administrador</h2>
            <p className="rol-desc">
              Control total de la plataforma: productos, pedidos, ventas y configuración.
            </p>
            <div className="rol-acciones">
              <Link to="/admin/login" className="rol-boton primario">Iniciar sesión</Link>
              <Link to="/admin/registro" className="rol-boton secundario">Crear cuenta</Link>
            </div>
          </div>
        </div>

        <Link to="/" className="rol-volver">← Volver al inicio</Link>
      </div>
    </div>
  );
};

export default RoleSelection;