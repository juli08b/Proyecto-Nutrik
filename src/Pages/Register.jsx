import { Link } from 'react-router-dom'; 
import { useState } from 'react'; // 1. IMPORTANTE: Check que esto esté aquí
import './Register.css';
import logo from '../assets/logoNutrick.png'; 


const Register = () => {
  //ESTADOS (Pizarrones de memoria)
  // useState: Permite que el componente "recuerde" los valores escritos por el usuario
  const [estatura, setEstatura] = useState(""); // Almacena y actualiza el valor de estatura
  const [peso, setPeso] = useState(""); // Almacena y actualiza el valor de peso
  const [opcion, setOpcion] = useState(""); // Controla qué opción de alergia seleccionó el usuario
  const [otroDetalle, setOtroDetalle] = useState("");// Guarda texto cuando seleccionan "Otro"
  const [dieta, setDieta] = useState(""); // Controla la alimentación especial seleccionada
  const [otroDieta, setOtroDieta] = useState(""); // Guarda el detalle si elige "Otro"
  
  //FUNCIONES (Los Secretarios) ---

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
        <div className="logo-circle" aria-label="Logo de Nutrik">
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
            
            <div className="field-group">
              <label className="field-label">Nombres</label>
              <div className="input-row">
                <input type="text" placeholder="Primer Nombre" required />
                <input type="text" placeholder="Segundo Nombre" />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Apellidos</label>
              <div className="input-row">
                <input type="text" placeholder="Primer Apellido" required />
                <input type="text" placeholder="Segundo Apellido" required />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Correo electrónico</label>
              <input type="email" placeholder="ejemplo@correo.com" required />
            </div>

            <div className="field-group">
              <label className="field-label">Edad y actividad</label>
              <div className="input-row">
                <input type="number" placeholder="Edad" min="1" onKeyDown={bloquearNegativos} />
                <select className="select-custom">
                  <option value="" disabled selected>Actividad diaria</option>
                  <option value="sedentario">Sedentario</option>
                  <option value="activo">Activo</option>
                  <option value="muy-activo">Muy Activo</option>
                </select>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">¿Tienes alguna alergia o intolerancia alimentaria?</label>
              <select className="select-custom" value={opcion} onChange={(e) => setOpcion(e.target.value)}>
                <option value="" disabled selected>Alergias/Intolerancias</option>
                <option value="gluten">Gluten</option>
                <option value="lactosa">Lactosa</option>
                <option value="frutos-secos">Frutos secos</option>
                <option value="otro">Otro...</option>
              </select>

              {opcion === 'otro' && (
                <input
                  type="text"
                  placeholder="Por favor, especifica cuál"
                  value={otroDetalle}
                  onChange={(e) => setOtroDetalle(e.target.value)}
                  required
                />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">¿Sigues algún tipo de alimentación especial?</label>
              <div className="input-row">
                <select
                  className="select-custom"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="vegetariano">Vegetariano</option>
                  <option value="vegano">Vegano</option>
                  <option value="pescetariano">Pescetariano</option>
                  <option value="otro">Otro</option>
                </select>

                {dieta === 'otro' && (
                  <input
                    type="text"
                    placeholder="Por favor, especifica cuál"
                    value={otroDieta}
                    onChange={(e) => setOtroDieta(e.target.value)}
                    required
                  />
                )}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Peso y estatura</label>
              <div className="input-row">
                <input type="text" placeholder="Peso" value={peso} onChange={manejarPeso} />
                <input type="text" placeholder="Estatura (cm)" value={estatura} onChange={manejarEstatura} maxLength="4" />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Género</label>
              <select className="select-custom">
                <option value="" disabled selected>Genero</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Objetivo</label>
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
