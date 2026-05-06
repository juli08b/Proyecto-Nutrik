import { Link } from 'react-router-dom'; // Importante
import './Register.css';
import logo from '../assets/logoNutrick.png'; 

const Registro = () => {
  return (
    <div className="main-container">
      <div className="header-registro">
        <div className="logo-circle">
          <Link to="/"> {/* El logo te lleva al Home */}
            <img src={logo} alt="Logo Nutrik" className="logo-img" />
          </Link>
        </div>
        <div className="header-text">
          <h1>Únete a Nutrik</h1>
          <p>Tu plan comienza aquí 🌱</p>
        </div>
      </div>

      <div className="form-container">
        <div className="card-registro">
          <h2 className="card-title">Crea tu Perfil</h2>
          
          {/* Texto opcional para volver al Login */}
          <p className="login-link-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>

          <form className="register-form">
            {/* ... resto de tu formulario de registro ... */}
            <button className="btn-submit" type="submit">Empezar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
