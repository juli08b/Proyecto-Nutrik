import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../../assets/logoNutrick.png';
import { useAuth } from '../../Context/authContext';
import { ROLES } from '../../constants/roles';
import { Link } from 'react-router-dom';

const IconoCorrea = () => (
  <span className="campo-icono admin-campo-icono" aria-hidden="true">@</span>
);

const IconoCandado = () => (
  <span className="campo-icono admin-campo-icono" aria-hidden="true">●</span>
);

// Usa el inicio de sesión administrativo del proveedor de autenticación.
export default function AdminLogin() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  if (user?.role === ROLES.ADMIN) return <Navigate to="/admin" replace />;

  const enviar = async (e) => {
    e.preventDefault();
    const resultado = await login(correo, contrasena, { soloAdmin: true });
    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }
    if (resultado.user?.role !== ROLES.ADMIN) {
      await logout();
      setError('Las credenciales no corresponden a una cuenta privada.');
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="login-page">
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Acceso privado</h1>
        <p>Área reservada del propietario de Nutrik</p>
      </div>
      <div className="login-form-side">
        <div className="form-content">
          <span className="login-private-eyebrow">Acceso reservado</span>
          <h2 className="welcome-card">Administración Nutrik</h2>
          <p className="login-sub">Solo personal autorizado puede ingresar</p>
          {error && <div className="login-error">{error}</div>}
          <form onSubmit={enviar}>
            <div className="input-field">
              <IconoCorrea />
              <input
                type="email"
                placeholder="Correo administrativo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <IconoCandado />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-login">Entrar al panel</button>
          </form>
          <Link className="admin-login-volver" to="/">← Volver al sitio</Link>
        </div>
      </div>
    </div>
  );
}
