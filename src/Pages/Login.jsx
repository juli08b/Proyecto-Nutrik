import { Link } from 'react-router-dom'; // Importante para la navegación
import './Login.css';
import logo from '../assets/logoNutrick.png'; 

const Login = () => {
  return (
    <div className="login-page">
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Bienvenido</h1>
        <p>Lleva una vida saludable con nosotros</p>
      </div>

      <div className="login-form-side">
        <div className="form-content">
          <h2>Bienvenido De Nuevo</h2>
          {/* Cambiamos el <a> por <Link> */}
          <p>¿No tienes cuenta? <Link to="/Registro">Crea una ahora</Link></p>
          
          <form>
            <div className="input-field">
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <input type="password" placeholder="Password" />
            </div>
            
            <button className="btn-login">Iniciar Sesion</button>
            <button className="btn-google"> Iniciar Sesion con Google</button>
          </form>
          
          <p className="forgot-pass">Olvidaste tu clave? <Link to="/forgot-password">Click aquí</Link></p>

        </div>
      </div>
    </div>
  );
};

export default Login;
