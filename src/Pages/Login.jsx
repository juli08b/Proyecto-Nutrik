import { Link } from 'react-router-dom'; // Importante para la navegación
import './Login.css';
import logo from '../assets/logoNutrick.png'; 

const Login = () => {
  return (
    <div className="login-page">
      {/* SECCIÓN IZQUIERDA: PANEL DE BIENVENIDA */}
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Bienvenido</h1>
        <p>Lleva una vida saludable con nosotros</p>
      </div>

      {/* SECCIÓN DERECHA: PANEL DEL FORMULARIO */}
      <div className="login-form-side">
        <div className="form-content">
          <h2>Bienvenido de nuevo</h2>
          <p className="register-link">
            ¿No tienes cuenta? <Link to="/Registro">Crea una ahora</Link>
          </p>
          
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Campo Email con Icono */}
            <div className="input-field">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <input type="email" placeholder="Correo electrónico" />
            </div>

            {/* Campo Contraseña con Icono y Ojo */}
            <div className="input-field">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input type="password" placeholder="Contraseña" />
              <button type="button" className="toggle-password">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </button>
            </div>
            
            <button type="submit" className="btn-login">Iniciar sesión</button>
            
            {/* Divisor "o continúa con" */}
            <div className="divider">
              <span>o continúa con</span>
            </div>

            {/* Botón de Google Estilizado */}
            <button type="button" className="btn-google">
              <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.55 2.94-2.21 5.44-4.71 7.11v5.9h7.62c4.46-4.1 7.03-10.15 7.03-17.27z"/>
                <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.62-5.9c-2.11 1.41-4.8 2.25-8.27 2.25-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
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
