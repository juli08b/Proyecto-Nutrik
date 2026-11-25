import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Register.css';
import logo from '../../assets/logoNutrick.png';
import { useAuth } from '../../Context/authContext';

const NOMBRE_VALIDO = /^\p{L}[\p{L}\p{M}]*(?:[ '\u2019-]\p{L}[\p{L}\p{M}]*)*$/u;
const NUMERO_VALIDO = /^\d+(?:[.,]\d+)?$/;

function fechaHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

function fechaValida(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const [anio, mes, dia] = valor.split('-').map(Number);
  const fecha = new Date(0);
  fecha.setFullYear(anio, mes - 1, dia);
  return anio > 0 && fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 && fecha.getDate() === dia && valor <= fechaHoy();
}

// Cada paso devuelve errores por nombre de campo; el envío revisa los tres.
function validarPaso(paso, form, fechaIncompleta) {
  const errores = {};

  if (paso === 1) {
    const nombres = [
      ['primerNombre', 'primer nombre', true],
      ['segundoNombre', 'segundo nombre', false],
      ['primerApellido', 'primer apellido', true],
      ['segundoApellido', 'segundo apellido', false],
    ];
    nombres.forEach(([campo, etiqueta, obligatorio]) => {
      const valor = form[campo].trim();
      if (!valor && obligatorio) errores[campo] = `Ingresa tu ${etiqueta}.`;
      else if (valor && !NOMBRE_VALIDO.test(valor)) {
        errores[campo] = `El ${etiqueta} no corresponde: usa solo letras, espacios, guiones o apóstrofos.`;
      }
    });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errores.email = 'Ingresa un correo electrónico válido, por ejemplo nombre@correo.com.';
    }
    if (!/^\d{10}$/.test(form.telefono)) {
      errores.telefono = 'Ingresa un teléfono de 10 dígitos, sin espacios ni símbolos.';
    }
    if (fechaIncompleta || (form.fechaNacimiento && !fechaValida(form.fechaNacimiento))) {
      errores.fechaNacimiento = 'Ingresa una fecha válida que no sea posterior a hoy.';
    }
    if (!form.genero) errores.genero = 'Selecciona tu género.';
  }

  if (paso === 2) {
    const validarMedida = (campo, minimo, maximo, mensaje) => {
      const valor = form[campo].trim();
      const numero = Number(valor.replace(',', '.'));
      if (!NUMERO_VALIDO.test(valor) || numero < minimo || numero > maximo) {
        errores[campo] = mensaje;
      }
    };
    validarMedida('peso', 2, 300, 'Ingresa un peso entre 2 y 300 kg.');
    validarMedida('estatura', 0.4, 2.5, 'Ingresa una estatura entre 0,4 y 2,5 metros.');
    if (!form.actividad) errores.actividad = 'Selecciona tu actividad diaria.';
    if (!form.objetivo) errores.objetivo = 'Selecciona tu objetivo principal.';
  }

  if (paso === 3) {
    if (form.alergia === 'otro' && !form.otroAlergia.trim()) {
      errores.otroAlergia = 'Especifica tu alergia o intolerancia.';
    }
    if (form.dieta === 'otro' && !form.otroDieta.trim()) {
      errores.otroDieta = 'Especifica tu tipo de alimentación.';
    }
    if (form.password.length < 8) errores.password = 'La contraseña debe tener mínimo 8 caracteres.';
    if (!form.confirmPassword) errores.confirmPassword = 'Confirma tu contraseña.';
    else if (form.password !== form.confirmPassword) errores.confirmPassword = 'Las contraseñas no coinciden.';
  }

  return errores;
}

// Registro en tres pasos: datos personales, actividad y alimentación/acceso.
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [paso, setPaso] = useState(1);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState({});
  const [fechaIncompleta, setFechaIncompleta] = useState(false);
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

  const cambiar = (e) => {
    const { name, value } = e.target;
    if (name === 'fechaNacimiento') setFechaIncompleta(e.target.validity.badInput);
    setForm((actual) => ({ ...actual, [name]: value }));
    setErrores((actuales) => {
      const nuevos = { ...actuales };
      delete nuevos[name];
      if (name === 'alergia') delete nuevos.otroAlergia;
      if (name === 'dieta') delete nuevos.otroDieta;
      if (name === 'password') delete nuevos.confirmPassword;
      return nuevos;
    });
    setError('');
  };

  const mensajeCampo = (campo) => errores[campo] && (
    <span className="field-error" id={`error-${campo}`} role="alert">{errores[campo]}</span>
  );

  const siguiente = () => {
    const encontrados = validarPaso(paso, form, fechaIncompleta);
    setErrores(encontrados);
    if (Object.keys(encontrados).length) return;
    setError('');
    setPaso((p) => p + 1);
  };

  const anterior = () => {
    setError('');
    setErrores({});
    setPaso((p) => p - 1);
  };

  // Envía una cuenta de usuario, resolviendo las opciones personalizadas de dieta y alergia.
  const enviar = async (e) => {
    e.preventDefault();
    if (paso < 3) {
      siguiente();
      return;
    }
    setError('');
    for (let numero = 1; numero <= 3; numero += 1) {
      const encontrados = validarPaso(numero, form, fechaIncompleta);
      if (Object.keys(encontrados).length) {
        setErrores(encontrados);
        setPaso(numero);
        return;
      }
    }
    setErrores({});
    const nombres = {
      primerNombre: form.primerNombre.trim(),
      segundoNombre: form.segundoNombre.trim(),
      primerApellido: form.primerApellido.trim(),
      segundoApellido: form.segundoApellido.trim(),
    };
    const nombreCompleto = Object.values(nombres)
      .filter(Boolean).join(' ').trim();

    const res = await register('usuario', {
      ...form,
      ...nombres,
      email: form.email.trim(),
      nombreCompleto,
      peso: `${form.peso.trim().replace(',', '.')} kg`,
      estatura: form.estatura.trim().replace(',', '.'),
      alergia: form.alergia === 'otro' ? form.otroAlergia.trim() : form.alergia,
      dieta: form.dieta === 'otro' ? form.otroDieta.trim() : form.dieta,
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

          {error && <div className="form-error" role="alert">{error}</div>}
          {exito && <div className="form-ok">¡Cuenta creada! Redirigiendo a tu perfil...</div>}

          <form
            className="register-form"
            onSubmit={enviar}
            onKeyDown={(e) => {
              if (paso < 3 && e.key === 'Enter' && e.target.tagName === 'INPUT') {
                e.preventDefault();
                siguiente();
              }
            }}
            noValidate
          >
            {/* PASO 1: DATOS PERSONALES */}
            {paso === 1 && (
              <>
                <div className="field-group">
                  <span className="field-label">Nombres *</span>
                  <div className="input-row">
                    <div className="input-group">
                      <input type="text" name="primerNombre" aria-label="Primer nombre" aria-invalid={Boolean(errores.primerNombre)} aria-describedby={errores.primerNombre ? 'error-primerNombre' : undefined} placeholder="Primer Nombre" value={form.primerNombre} onChange={cambiar} required />
                      {mensajeCampo('primerNombre')}
                    </div>
                    <div className="input-group">
                      <input type="text" name="segundoNombre" aria-label="Segundo nombre" aria-invalid={Boolean(errores.segundoNombre)} aria-describedby={errores.segundoNombre ? 'error-segundoNombre' : undefined} placeholder="Segundo Nombre" value={form.segundoNombre} onChange={cambiar} />
                      {mensajeCampo('segundoNombre')}
                    </div>
                  </div>
                </div>

                <div className="field-group">
                  <span className="field-label">Apellidos *</span>
                  <div className="input-row">
                    <div className="input-group">
                      <input type="text" name="primerApellido" aria-label="Primer apellido" aria-invalid={Boolean(errores.primerApellido)} aria-describedby={errores.primerApellido ? 'error-primerApellido' : undefined} placeholder="Primer Apellido" value={form.primerApellido} onChange={cambiar} required />
                      {mensajeCampo('primerApellido')}
                    </div>
                    <div className="input-group">
                      <input type="text" name="segundoApellido" aria-label="Segundo apellido" aria-invalid={Boolean(errores.segundoApellido)} aria-describedby={errores.segundoApellido ? 'error-segundoApellido' : undefined} placeholder="Segundo Apellido" value={form.segundoApellido} onChange={cambiar} />
                      {mensajeCampo('segundoApellido')}
                    </div>
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="registro-email">Correo electrónico *</label>
                  <input id="registro-email" type="email" name="email" aria-invalid={Boolean(errores.email)} aria-describedby={errores.email ? 'error-email' : undefined} placeholder="ejemplo@correo.com" value={form.email} onChange={cambiar} required />
                  {mensajeCampo('email')}
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="registro-telefono">Teléfono *</label>
                  <input id="registro-telefono" type="tel" inputMode="numeric" name="telefono" aria-invalid={Boolean(errores.telefono)} aria-describedby={errores.telefono ? 'error-telefono' : undefined} placeholder="3001234567" value={form.telefono} onChange={cambiar} required />
                  {mensajeCampo('telefono')}
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="registro-fecha">Fecha de nacimiento</label>
                  <input id="registro-fecha" type="date" name="fechaNacimiento" max={fechaHoy()} aria-invalid={Boolean(errores.fechaNacimiento)} aria-describedby={errores.fechaNacimiento ? 'error-fechaNacimiento' : undefined} value={form.fechaNacimiento} onChange={cambiar} />
                  {mensajeCampo('fechaNacimiento')}
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="registro-genero">Género *</label>
                  <select id="registro-genero" className="select-custom" name="genero" aria-invalid={Boolean(errores.genero)} aria-describedby={errores.genero ? 'error-genero' : undefined} value={form.genero} onChange={cambiar} required>
                    <option value="" disabled>Selecciona tu género</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero-no">Prefiero no decirlo</option>
                  </select>
                  {mensajeCampo('genero')}
                </div>
              </>
            )}

            {/* PASO 2: CUERPO Y ACTIVIDAD */}
            {paso === 2 && (
              <>
                <div className="field-group">
                  <span className="field-label">Peso y estatura *</span>
                  <div className="input-row">
                    <div className="input-group">
                      <input type="text" inputMode="decimal" name="peso" aria-label="Peso en kilogramos" aria-invalid={Boolean(errores.peso)} aria-describedby={errores.peso ? 'error-peso' : undefined} placeholder="Peso (kg), ej. 65,5" value={form.peso} onChange={cambiar} required />
                      {mensajeCampo('peso')}
                    </div>
                    <div className="input-group">
                      <input type="text" inputMode="decimal" name="estatura" aria-label="Estatura en metros" aria-invalid={Boolean(errores.estatura)} aria-describedby={errores.estatura ? 'error-estatura' : undefined} placeholder="Estatura (m), ej. 1,70" value={form.estatura} onChange={cambiar} required />
                      {mensajeCampo('estatura')}
                    </div>
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="registro-actividad">Actividad diaria *</label>
                  <select id="registro-actividad" className="select-custom" name="actividad" aria-invalid={Boolean(errores.actividad)} aria-describedby={errores.actividad ? 'error-actividad' : undefined} value={form.actividad} onChange={cambiar} required>
                    <option value="" disabled>Selecciona tu actividad</option>
                    <option value="sedentario">Sedentario (poco ejercicio)</option>
                    <option value="ligero">Ligero (ejercicio 1-3 días)</option>
                    <option value="activo">Activo (ejercicio 3-5 días)</option>
                    <option value="muy-activo">Muy activo (6-7 días)</option>
                  </select>
                  {mensajeCampo('actividad')}
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="registro-objetivo">Objetivo principal *</label>
                  <select id="registro-objetivo" className="select-custom" name="objetivo" aria-invalid={Boolean(errores.objetivo)} aria-describedby={errores.objetivo ? 'error-objetivo' : undefined} value={form.objetivo} onChange={cambiar} required>
                    <option value="" disabled>Selecciona tu objetivo</option>
                    <option value="perder">Perder peso</option>
                    <option value="musculo">Ganar músculo</option>
                    <option value="mantener">Mantener mi peso</option>
                    <option value="energia">Más energía</option>
                  </select>
                  {mensajeCampo('objetivo')}
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
                      <div className="input-group">
                        <input
                          type="text"
                          name="otroAlergia"
                          aria-label="Especifica tu alergia o intolerancia"
                          aria-invalid={Boolean(errores.otroAlergia)}
                          aria-describedby={errores.otroAlergia ? 'error-otroAlergia' : undefined}
                          placeholder="Especifica cuál"
                          value={form.otroAlergia}
                          onChange={cambiar}
                          required
                        />
                        {mensajeCampo('otroAlergia')}
                      </div>
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
                      <div className="input-group">
                        <input
                          type="text"
                          name="otroDieta"
                          aria-label="Especifica tu tipo de alimentación"
                          aria-invalid={Boolean(errores.otroDieta)}
                          aria-describedby={errores.otroDieta ? 'error-otroDieta' : undefined}
                          placeholder="Especifica cuál"
                          value={form.otroDieta}
                          onChange={cambiar}
                          required
                        />
                        {mensajeCampo('otroDieta')}
                      </div>
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
                  <label className="field-label" htmlFor="registro-password">Contraseña * {`(mín. 8 caracteres)`}</label>
                  <input id="registro-password" type="password" name="password" aria-invalid={Boolean(errores.password)} aria-describedby={errores.password ? 'error-password' : undefined} placeholder="Crea una contraseña segura" value={form.password} onChange={cambiar} maxLength="32" required />
                  {mensajeCampo('password')}
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="registro-confirmar">Confirmar contraseña *</label>
                  <input id="registro-confirmar" type="password" name="confirmPassword" aria-invalid={Boolean(errores.confirmPassword)} aria-describedby={errores.confirmPassword ? 'error-confirmPassword' : undefined} placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={cambiar} maxLength="32" required />
                  {mensajeCampo('confirmPassword')}
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
                <button key="siguiente" type="button" className="btn-step siguiente" onClick={siguiente}>Siguiente →</button>
              ) : (
                <button key="enviar" type="submit" className="btn-step siguiente">Empezar 🚀</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;