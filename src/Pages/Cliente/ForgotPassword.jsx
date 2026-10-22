import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import './ForgotPassword.css';
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

const ForgotPassword = () => {
  const { existeCuenta, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [paso, setPaso] = useState(1);
  const [correo, setCorreo] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [verClave, setVerClave] = useState(false);
  const [error, setError] = useState('');
  const [completado, setCompletado] = useState(false);

  const verificarCorreo = (e) => {
    e.preventDefault();
    const res = existeCuenta(correo);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setError('');
    setPaso(2);
  };

  const guardarNueva = (e) => {
    e.preventDefault();
    if (nueva.length < 8) {
      setError('La contraseña debe tener mínimo 8 caracteres.');
      return;
    }
    if (nueva !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    const res = resetPassword(correo, nueva);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setError('');
    setCompletado(true);
    setTimeout(() => navigate('/login'), 1800);
  };

  return (
    <div className="login-page">
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Recupera tu acceso</h1>
        <p>Te ayudamos a restablecer tu contraseña</p>
      </div>

      <div className="login-form-side">
        <div className="form-content forgot-form">
          <h2 className="welcome-card">¿Olvidaste tu contraseña?</h2>

          <p className="register-link">
            ¿Recordaste tu clave? <Link to="/login">Volver a iniciar sesión</Link>
          </p>

          {completado && (
            <div className="forgot-ok">
              ✅ <strong>¡Contraseña actualizada!</strong>
              <span>Redirigiendo al inicio de sesión…</span>
            </div>
          )}

          {error && <div className="login-error">{error}</div>}

          {/* PASO 1: SOLICITAR CORREO */}
          {!completado && paso === 1 && (
            <form onSubmit={verificarCorreo}>
              <div className="forgot-hint">
                Ingresa el correo con el que te registraste y te guiaremos
                para crear una nueva contraseña.
              </div>

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

              <button type="submit" className="btn-login">Continuar</button>
            </form>
          )}

          {/* PASO 2: NUEVA CONTRASEÑA */}
          {!completado && paso === 2 && (
            <form onSubmit={guardarNueva}>
              <div className="forgot-correo-confirmado">
                <span>✉️</span>
                <p>Enviaremos los cambios a <strong>{correo}</strong></p>
              </div>

              <div className="input-field">
                <IconoCandado />
                <input
                  type={verClave ? 'text' : 'password'}
                  placeholder="Nueva contraseña (mín. 8 caracteres)"
                  value={nueva}
                  onChange={(e) => setNueva(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <IconoCandado />
                <input
                  type={verClave ? 'text' : 'password'}
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmacion}
                  onChange={(e) => setConfirmacion(e.target.value)}
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

              <button type="submit" className="btn-login">Guardar nueva contraseña</button>

              <button
                type="button"
                className="btn-volver-paso"
                onClick={() => { setPaso(1); setError(''); }}
              >
                ← Cambiar correo
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;