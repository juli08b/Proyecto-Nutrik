import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../../assets/logoNutrick.png';
import { useAuth } from '../../Context/authContext';
import { ROLES } from '../../constants/roles';

export default function AdminLogin() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  if (user?.role === ROLES.ADMIN) return <Navigate to="/admin" replace />;

  const enviar = async (e) => {
    e.preventDefault();
    const resultado = await login(correo, contrasena);
    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }
    if (resultado.user?.role !== ROLES.ADMIN) {
      logout();
      setError('Las credenciales no corresponden a una cuenta administrativa.');
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="login-page">
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Acceso administrativo</h1>
        <p>Área privada de supervisión de Nutrik</p>
      </div>
      <div className="login-form-side">
        <div className="form-content">
          <h2 className="welcome-card">Iniciar sesión</h2>
          {error && <div className="login-error">{error}</div>}
          <form onSubmit={enviar}>
            <div className="input-field">
              <input
                type="email"
                placeholder="Correo administrativo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
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
        </div>
      </div>
    </div>
  );
}
