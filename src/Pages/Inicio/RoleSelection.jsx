import { Link } from "react-router-dom";
import logo from "../../assets/logoNutrick.png";
import './RoleSelection.css';

const RoleSelection = () => {
  return (
    <div className="rol-page">
      <div className="rol-card">
        <img src={logo} alt="Logo Nutrik" className="rol-logo" />
        <h1 className="rol-titulo">Únete a Nutrik</h1>
        <p className="rol-sub">Una sola cuenta para comprar y vender en el marketplace</p>

        <div className="rol-grid">
          <div className="rol-opcion">
            <div className="rol-icono">🛒</div>
            <h2>Usuario</h2>
            <p className="rol-desc">
              Explora productos de otros usuarios, compra y publica tus propios productos.
            </p>
            <div className="rol-acciones">
              <Link to="/login" className="rol-boton primario">Iniciar sesión</Link>
              <Link to="/registro" className="rol-boton secundario">Registrarme</Link>
            </div>
          </div>
        </div>

        <Link to="/" className="rol-volver">← Volver al inicio</Link>
      </div>
    </div>
  );
};

export default RoleSelection;