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

const IconoGoogle = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.54 5.54 0 0 1-2.4 3.63v3h3.87c2.27-2.1 3.57-5.17 3.57-8.82z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.79-2.12-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.27 14.28A7.18 7.18 0 0 1 4.91 12c0-.79.14-1.56.36-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1z" />
    <path fill="#EA4335" d="M12 4.78c1.76 0 3.34.61 4.59 1.8L19.88 3.2A11.98 11.98 0 0 0 1.29 6.62l3.98 3.1C6.21 6.9 8.87 4.78 12 4.78z" />
  </svg>
);

const LoginVendedor = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [verClave, setVerClave] = useState(false);
  const [error, setError] = useState('');

  const manejarLogin = (e) => {
    e.preventDefault();
    const res = login(correo, contrasena);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    if (res.user && res.user.role !== 'vendedor') {
      setError('Esta cuenta es de cliente. Usa la opción "Quiero Comprar".');
      return;
    }
    navigate('/vendedor/dashboard');
  };

  return (
    <div className="login-page">
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Portal de Vendedores</h1>
        <p>Expande tu negocio saludable y llega a más clientes</p>
      </div>

      <div className="login-form-side">
        <div className="form-content">
          <h2 className="welcome-card">Bienvenido de nuevo</h2>

          <p className="register-link">
            ¿Aún no registras tu tienda? <Link to="/vendedor/registro">Regístrate aquí</Link>
          </p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={manejarLogin}>
            <div className="input-field">
              <IconoCorreo />
              <input
                type="email"
                placeholder="Correo electrónico del negocio"
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

            <button type="submit" className="btn-login">Iniciar sesión como Vendedor</button>
          </form>

          <div className="demo-box">
            <strong>Cuenta demo:</strong> tienda@nutrik.com · tienda123
          </div>

          <div className="divider">
            <span>o continúa con</span>
          </div>

          <button type="button" className="btn-google">
            <IconoGoogle />
            Iniciar sesión con Google
          </button>

          <p className="forgot-pass">
            ¿Olvidaste tu clave comercial? <Link to="/forgot-password">Haga clic aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginVendedor;