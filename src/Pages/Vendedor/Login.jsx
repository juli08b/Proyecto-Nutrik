import { Link } from 'react-router-dom'; // Importante para la navegación
import './Login.css';
import logo from '../../assets/logoNutrick.png'; 
import fondo from '../../assets/fondo.jpg'; // Se queda importada por si acaso

const Login = () => {
  return (
    <div className="login-page">
      {/* SECCIÓN IZQUIERDA: BIENVENIDA */}
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Portal de Vendedores</h1>
        <p>Expande tu negocio saludable y llega a más clientes</p>
      </div>

      {/* SECCIÓN DERECHA: FORMULARIO */}
      <div className="login-form-side">
        <div className="form-content">
          <h2>Acceso Comercial</h2>
          <p className="register-link">
            ¿Aún no registras tu tienda? <Link to="/vendedor/registro">Regístrate aquí</Link>
          </p>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-field">
              <input type="email" placeholder="Correo electrónico del negocio" />
            </div>

            <div className="input-field">
              <input type="password" placeholder="Contraseña" />
            </div>
            
            <button type="submit" className="btn-login">Iniciar sesión como Vendedor</button>
            
            <div className="divider">
              <span>o continúa con</span>
            </div>

            <button type="button" className="btn-google">
              Iniciar sesión con Google
            </button>
          </form>
          
          <p className="forgot-pass">
            ¿Olvidaste tu clave comercial? <Link to="/forgot-password">Haga clic aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;