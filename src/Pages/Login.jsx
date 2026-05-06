//import React from 'react';
import './Login.css';
import logo from '../assets/logoNutrick.png'; 
import logo2 from '../assets/comida.jpg';

const Login = () => {
  return (
    <div className="login-page"> {/* Contenedor principal de toda la pantalla */}
      
      {/* LADO IZQUIERDO: El panel azul con información */}
      <div className="info-content">
        <img src={logo} alt="Logo Nutrik" className="login-logo" />
        <h1 className="welcome-text">Bienvenido</h1>
        <p>Lleva una vida saludable con nosotros</p>
        </div>

      {/* LADO DERECHO: El formulario de Login */}
      <div className="login-form-side">
        <div className="form-content">
          <h2>Bienvenido De Nuevo</h2>
          <p>¿No tienes cuenta? <a href="#">Crea una ahora</a></p>
          
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
          
          <p className="forgot-pass">Olvidaste tu clave? <a href="#">Click aquí</a></p>
        </div>
      </div>

    </div>
  );
};

export default Login;
