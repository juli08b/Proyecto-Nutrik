import { Link } from 'react-router-dom'; 
import { useState } from 'react'; // 1. IMPORTANTE: Check que esto esté aquí
import './Register.css';
import logo from '../assets/logoNutrick.png'; 

const Register = () => {
  // --- 2. ESTADOS (Pizarrones de memoria) ---
  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");

  // --- 3. FUNCIONES (Los Secretarios) ---

  // Secretario de Estatura (Pone el punto automático: 1.55)
  const manejarEstatura = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); 
    if (valor.length > 1) {
      valor = valor.charAt(0) + "." + valor.slice(1, 3);
    }
    setEstatura(valor);
  };

  // Secretario de Peso (Pone el "kg" automático)
  const manejarPeso = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); 
    if (valor.length > 0) {
      valor = valor + " kg";
    }
    setPeso(valor);
  };

  // Secretario de Seguridad (Bloquea negativos y la letra 'e')
  const bloquearNegativos = (e) => {
    if (e.key === '-' || e.key === 'e') e.preventDefault();
  };

  return (
    <div className="main-container">
      {/* CABECERA */}
      <div className="header-registro">
        <div className="logo-circle">
          <Link to="/">
            <img src={logo} alt="Logo Nutrik" className="logo-img" />
          </Link>
        </div>
        <div className="header-text">
          <h1>Únete a Nutrik</h1>
          <p>Tu plan comienza aquí 🌱</p>
        </div>
      </div>

      {/* FORMULARIO */}
      <div className="form-container">
        <div className="card-registro">
          <h2 className="card-title">Crea tu Perfil</h2>
          
          <form className="register-form">
            
            <label className="field-label">Nombres</label>
            <div className="from-group">
              <div className="input-row">
                <input type="text" placeholder="Primer Nombre" required />
                <input type="text" placeholder="Segundo Nombre" />
              </div>
              <label className="field-label">Apellidos</label>
              <div className="input-row">
                <input type="text" placeholder="Primer Apellido" required />
                <input type="text" placeholder="Segundo Apellido" required />
              </div>
            </div>

            <label className="field-label">Campo de Correo:</label>
            <div className="from-group">
              <input type="email" placeholder="ejemplo@correo.com" required />
            </div>

            <label className="field-label">Fila Datos:</label>
            <div className="from-group">
              <div className="input-group">
                <input type="number" placeholder="Edad" min="1" onKeyDown={bloquearNegativos} />
              </div>
            

              {/* INPUT DE PESO FORMATEADO */}
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Peso" 
                  value={peso} 
                  onChange={manejarPeso} 
                />
              </div>

              {/* INPUT DE ESTATURA FORMATEADA */}
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Estatura (cm)" 
                  value={estatura} 
                  onChange={manejarEstatura} 
                  maxLength="4" 
                />
              </div>
               </div>

              <label className="field-label">Campo Opciones:</label>
            <div className="input-group">
              <select className="select-custom">
                <option value="" disabled selected>Genero</option>
                <option value="Mujer">Femenino</option>
                <option value="Hombre">Masculino</option>
                <option value="Hombre">Otro</option>
              </select>
            </div>
          

            <label className="field-label">Campo Opciones:</label>
            <div className="input-group">
              <select className="select-custom">
                <option value="" disabled selected>Objetivo</option>
                <option value="perder">Perder Peso</option>
                <option value="musculo">Ganar Músculo</option>
              </select>
            </div>

            <button className="btn-submit" type="submit">Empezar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
