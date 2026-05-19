import { Link } from 'react-router-dom'; // Importante para la navegación
import './Login.css';
import logo from '../assets/logoNutrick.png'; 
import fondo from '../assets/fondo.jpg'; // Se queda importada por si acaso, aunque la llamaremos desde el CSS

const Login = () => {
  return (
    <div className="login-page">
      {/* SECCIÓN IZQUIERDA: BIENVENIDA */}
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Equilibrio y salud</h1>
        <p>Lleva una vida saludable con nosotros</p>
      </div>

      {/* SECCIÓN DERECHA: FORMULARIO */}
      <div className="login-form-side">
        <div className="form-content">
          {/* Quitamos la etiqueta <img> de aquí para que no rompa la tarjeta */}
          <h2>Bienvenido de nuevo</h2>
          <p className="register-link">
            ¿No tienes cuenta? <Link to="/Registro">Crea una ahora</Link>
          </p>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-field">
              <input type="email" placeholder="Correo electrónico" />
            </div>

            <div className="input-field">
              <input type="password" placeholder="Contraseña" />
            </div>
            
            <button type="submit" className="btn-login">Iniciar sesión</button>
            
            <div className="divider">
              <span>o continúa con</span>
            </div>

            <button type="button" className="btn-google">
              Iniciar sesión con Google
            </button>
          </form>
          
          <p className="forgot-pass">
            ¿Olvidaste tu clave? <Link to="/forgot-password">Haga clic aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;