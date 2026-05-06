import './Register.css';
import logo from '../assets/logoNutrick.png'; 

const Registro = () => {
  return (
    <div className="main-container">
      {/* Cabecera horizontal: Logo izquierda, Texto derecha */}
      <div className="header-registro">
        <div className="logo-circle">
          <img src={logo} alt="Logo Nutrik" className="logo-img" />
        </div>
        <div className="header-text">
          <h1>Únete a Nutrik</h1>
          <p>Tu plan comienza aquí 🌱</p>
        </div>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="form-container">
        <div className="card-registro">
          <h2 className="card-title">Crea tu Perfil</h2>
          
          <form className="register-form">
            
            <label className="field-label">Fila 1:</label>
            <div className="input-row">
              <div className="input-group">
                <input type="text" placeholder="Nombre" required />
              </div>
              <div className="input-group">
                <input type="text" placeholder="Apellido" required />
              </div>
            </div>

            <label className="field-label">Campo de Correo:</label>
            <div className="input-group">
              <input type="email" placeholder="Correo Electrónico" required />
            </div>

            <label className="field-label">Fila Datos:</label>
            <div className="input-row">
              <div className="input-group">
                <input type="number" placeholder="Edad" />
              </div>
              <div className="input-group">
                <input type="number" placeholder="Peso (kg)" />
              </div>
              <div className="input-group">
                <input type="number" placeholder="Estatura (cm)" />
              </div>
            </div>

            <label className="field-label">Campo Opciones:</label>
            <div className="input-group">
              <select className="select-custom">
                <option value="" disabled selected>Objetivo</option>
                <option value="perder">Perder Peso</option>
                <option value="musculo">Ganar Músculo</option>
              </select>
            </div>

            <label className="field-label">Botón:</label>
            <button className="btn-submit" type="submit">Empezar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
