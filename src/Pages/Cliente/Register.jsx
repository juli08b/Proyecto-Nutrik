import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Register.css';
import logo from '../../assets/logoNutrick.png';
import { useAuth } from '../../Context/authContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [paso, setPaso] = useState(1);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const [form, setForm] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    genero: '',

    estatura: '',
    peso: '',
    actividad: '',
    objetivo: '',

    alergia: '',
    otroAlergia: '',
    dieta: '',
    otroDieta: '',
    restricciones: '',
    password: '',
    confirmPassword: '',
  });

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const manejarEstatura = (e) => {
    let valor = e.target.value.replace(/[^\d]/g, '');
    if (valor.length > 1) valor = valor.charAt(0) + '.' + valor.slice(1, 3);
    setForm({ ...form, estatura: valor });
  };

  const manejarPeso = (e) => {
    let valor = e.target.value.replace(/[^\d]/g, '');
    if (valor.length > 0) valor = valor + ' kg';
    setForm({ ...form, peso: valor });
  };

  const validarPaso = () => {
    if (paso === 1) {
      if (!form.primerNombre || !form.primerApellido || !form.email || !form.telefono || !form.genero)
        return 'Completa los campos obligatorios de tus datos personales.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        return 'Ingresa un correo electrónico válido.';
    }
    if (paso === 2) {
      if (!form.estatura || !form.peso || !form.actividad || !form.objetivo)
        return 'Completa tu peso, estatura, actividad y objetivo.';
    }
    if (paso === 3) {
      if (!form.password || form.password.length < 8)
        return 'La contraseña debe tener mínimo 8 caracteres.';
      if (form.password !== form.confirmPassword)
        return 'Las contraseñas no coinciden.';
    }
    return '';
  };

  const siguiente = () => {
    const msg = validarPaso();
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    setPaso((p) => p + 1);
  };

  const anterior = () => {
    setError('');
    setPaso((p) => p - 1);
  };

  const enviar = (e) => {
    e.preventDefault();
    const msg = validarPaso();
    if (msg) {
      setError(msg);
      return;
    }
    const nombreCompleto = [form.primerNombre, form.segundoNombre, form.primerApellido, form.segundoApellido]
      .filter(Boolean).join(' ').trim();

    const res = register('cliente', {
      ...form,
      nombreCompleto,
      alergia: form.alergia === 'otro' ? form.otroAlergia : form.alergia,
      dieta: form.dieta === 'otro' ? form.otroDieta : form.dieta,
      password: form.password,
    });

    if (!res.ok) {
      setError(res.error);
      return;
    }
    setExito(true);
    setTimeout(() => navigate('/perfil'), 1200);
  };

  const pasos = ['Datos personales', 'Cuerpo y actividad', 'Tu alimentación y acceso'];

  return (
    <div className="main-container">
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

      <div className="form-container">
        <div className="card-registro">
          <h2 className="card-title">Crea tu Perfil de Cliente</h2>

          {/* INDICADOR DE PASOS */}
          <div className="steps">
            {pasos.map((label, i) => {
              const num = i + 1;
              return (
                <div
                  key={label}
                  className={`step ${paso === num ? 'activo' : ''} ${paso > num ? 'completado' : ''}`}
                >
                  <div className="step-number">{paso > num ? '✓' : num}</div>
                  <div className="step-label">{label}</div>
                </div>
              );
            })}
          </div>

          {error && <div className="form-error">{error}</div>}
          {exito && <div className="form-ok">¡Cuenta creada! Redirigiendo a tu perfil...</div>}

          <form className="register-form" onSubmit={enviar}>
            {/* PASO 1: DATOS PERSONALES */}
            {paso === 1 && (
              <>
                <div className="field-group">
                  <label className="field-label">Nombres *</label>
                  <div className="input-row">
                    <input type="text" name="primerNombre" placeholder="Primer Nombre" value={form.primerNombre} onChange={cambiar} required />
                    <input type="text" name="segundoNombre" placeholder="Segundo Nombre" value={form.segundoNombre} onChange={cambiar} />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Apellidos *</label>
                  <div className="input-row">
                    <input type="text" name="primerApellido" placeholder="Primer Apellido" value={form.primerApellido} onChange={cambiar} required />
                    <input type="text" name="segundoApellido" placeholder="Segundo Apellido" value={form.segundoApellido} onChange={cambiar} />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Correo electrónico *</label>
                  <input type="email" name="email" placeholder="ejemplo@correo.com" value={form.email} onChange={cambiar} required />
                </div>

                <div className="field-group">
                  <label className="field-label">Teléfono *</label>
                  <input type="tel" name="telefono" placeholder="300 123 4567" value={form.telefono} onChange={cambiar} required />
                </div>

                <div className="field-group">
                  <label className="field-label">Fecha de nacimiento</label>
                  <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={cambiar} />
                </div>

                <div className="field-group">
                  <label className="field-label">Género *</label>
                  <select className="select-custom" name="genero" value={form.genero} onChange={cambiar} required>
                    <option value="" disabled>Selecciona tu género</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero-no">Prefiero no decirlo</option>
                  </select>
                </div>
              </>
            )}

            {/* PASO 2: CUERPO Y ACTIVIDAD */}
            {paso === 2 && (
              <>
                <div className="field-group">
                  <label className="field-label">Peso y estatura *</label>
                  <div className="input-row">
                    <input type="text" name="peso" placeholder="Peso" value={form.peso} onChange={manejarPeso} />
                    <input type="text" name="estatura" placeholder="Estatura (m)" value={form.estatura} onChange={manejarEstatura} maxLength="4" />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Actividad diaria *</label>
                  <select className="select-custom" name="actividad" value={form.actividad} onChange={cambiar} required>
                    <option value="" disabled>Selecciona tu actividad</option>
                    <option value="sedentario">Sedentario (poco ejercicio)</option>
                    <option value="ligero">Ligero (ejercicio 1-3 días)</option>
                    <option value="activo">Activo (ejercicio 3-5 días)</option>
                    <option value="muy-activo">Muy activo (6-7 días)</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Objetivo principal *</label>
                  <select className="select-custom" name="objetivo" value={form.objetivo} onChange={cambiar} required>
                    <option value="" disabled>Selecciona tu objetivo</option>
                    <option value="perder">Perder peso</option>
                    <option value="musculo">Ganar músculo</option>
                    <option value="mantener">Mantener mi peso</option>
                    <option value="energia">Más energía</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">¿Cada cuánto haces ejercicio?</label>
                  <select className="select-custom" name="frecuencia" value={form.frecuencia || ''} onChange={cambiar}>
                    <option value="" disabled>Frecuencia</option>
                    <option value="nunca">Casi nunca</option>
                    <option value="1-2">1-2 veces por semana</option>
                    <option value="3-4">3-4 veces por semana</option>
                    <option value="5+">5 o más veces por semana</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Nivel de experiencia</label>
                  <div className="input-row">
                    <select className="select-custom" name="nivel" value={form.nivel || ''} onChange={cambiar}>
                      <option value="" disabled>Nivel</option>
                      <option value="principiante">Principiante</option>
                      <option value="intermedio">Intermedio</option>
                      <option value="avanzado">Avanzado</option>
                    </select>
                    <select className="select-custom" name="horario" value={form.horario || ''} onChange={cambiar}>
                      <option value="" disabled>Horario de alimentación</option>
                      <option value="mañana">Mañana</option>
                      <option value="tarde">Tarde</option>
                      <option value="noche">Noche</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* PASO 3: ALIMENTACIÓN Y CREDENCIALES */}
            {paso === 3 && (
              <>
                <div className="field-group">
                  <label className="field-label">¿Tienes alguna alergia o intolerancia alimentaria?</label>
                  <div className="input-row">
                    <select
                      className="select-custom"
                      name="alergia"
                      value={form.alergia}
                      onChange={cambiar}
                    >
                      <option value="">Ninguna</option>
                      <option value="gluten">Gluten</option>
                      <option value="lactosa">Lactosa</option>
                      <option value="frutos-secos">Frutos secos</option>
                      <option value="soja">Soja</option>
                      <option value="huevo">Huevo</option>
                      <option value="mariscos">Mariscos</option>
                      <option value="otro">Otra...</option>
                    </select>
                    {form.alergia === 'otro' && (
                      <input
                        type="text"
                        name="otroAlergia"
                        placeholder="Especifica cuál"
                        value={form.otroAlergia}
                        onChange={cambiar}
                      />
                    )}
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">¿Sigues algún tipo de alimentación especial?</label>
                  <div className="input-row">
                    <select className="select-custom" name="dieta" value={form.dieta} onChange={cambiar}>
                      <option value="">Sin dieta especial</option>
                      <option value="vegetariano">Vegetariano</option>
                      <option value="vegano">Vegano</option>
                      <option value="pescetariano">Pescetariano</option>
                      <option value="keto">Keto</option>
                      <option value="sin-gluten">Sin gluten</option>
                      <option value="otro">Otro</option>
                    </select>
                    {form.dieta === 'otro' && (
                      <input
                        type="text"
                        name="otroDieta"
                        placeholder="Especifica cuál"
                        value={form.otroDieta}
                        onChange={cambiar}
                      />
                    )}
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Restricciones o preferencias adicionales</label>
                  <textarea
                    name="restricciones"
                    className="textarea-custom"
                    rows="2"
                    placeholder="Ej: no consumo azúcar, prefiero alimentos sin procesar..."
                    value={form.restricciones}
                    onChange={cambiar}
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Contraseña * {`(mín. 8 caracteres)`}</label>
                  <input type="password" name="password" placeholder="Crea una contraseña segura" value={form.password} onChange={cambiar} maxLength="32" />
                </div>

                <div className="field-group">
                  <label className="field-label">Confirmar contraseña *</label>
                  <input type="password" name="confirmPassword" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={cambiar} maxLength="32" />
                </div>
              </>
            )}

            {/* BARRA DE NAVEGACIÓN DE PASOS */}
            <div className="step-navegacion">
              {paso > 1 ? (
                <button type="button" className="btn-step atras" onClick={anterior}>← Anterior</button>
              ) : (
                <Link to="/login" className="btn-step atras enlace">¿Ya tienes cuenta? Ingresa</Link>
              )}

              {paso < 3 ? (
                <button type="button" className="btn-step siguiente" onClick={siguiente}>Siguiente →</button>
              ) : (
                <button type="submit" className="btn-step siguiente">Empezar 🚀</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;