import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logoNutrick.png';
import { useAuth } from '../../Context/authContext';

const IconoCorreo = () => (
  <svg className="campo-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

const IconoCandado = () => (
  <svg className="campo-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

// Autentica la cuenta pública y muestra los errores devueltos por AuthProvider.
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [verClave, setVerClave] = useState(false);
  const [error, setError] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();
    const res = await login(correo, contrasena);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Equilibrio y salud</h1>
        <p>Lleva una vida saludable con nosotros</p>
      </div>

      <div className="login-form-side">
        <div className="form-content">
          <h2 className="welcome-card">Bienvenido a Nutrik</h2>

          <p className="login-sub">Accede con tu cuenta para comprar y vender</p>

          <p className="register-link">
            ¿No tienes cuenta? <Link to="/registro">Crea una ahora</Link>
          </p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={manejarLogin}>
            <div className="input-field">
              <IconoCorreo />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <IconoCandado />
              <input
                type={verClave ? 'text' : 'password'}
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-clave"
                onClick={() => setVerClave((v) => !v)}
                aria-label={verClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {verClave ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <button type="submit" className="btn-login">Iniciar sesión</button>
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