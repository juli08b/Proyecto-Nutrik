import { useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Perfil.css';
import { useAuth } from '../../Context/authContext';

const Perfil = () => {
  const { user, updateProfile, logout } = useAuth();
  const inputFotoRef = useRef(null);

  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState(() => ({
    primerNombre: user?.primerNombre || '',
    segundoNombre: user?.segundoNombre || '',
    primerApellido: user?.primerApellido || '',
    segundoApellido: user?.segundoApellido || '',
    telefono: user?.telefono || '',
    fechaNacimiento: user?.fechaNacimiento || '',
    genero: user?.genero || '',
    estatura: user?.estatura || '',
    peso: user?.peso || '',
    actividad: user?.actividad || '',
    objetivo: user?.objetivo || '',
    alergia: user?.alergia || '',
    dieta: user?.dieta || '',
    restricciones: user?.restricciones || '',
  }));

  const [fotoPrev, setFotoPrev] = useState(user?.foto || null);
  const [fotoPos, setFotoPos] = useState(Number(user?.fotoPosicion) || 50);

  if (!user) return <Navigate to="/elegir-rol" replace />;

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const manejarFoto = (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    if (archivo.size > 2 * 1024 * 1024) {
      setMensaje('La foto debe medir menos de 2 MB.');
      return;
    }
    const lector = new FileReader();
    lector.onload = () => {
      setFotoPrev(lector.result);
      setFotoPos(50);
      setMensaje('¡Ajusta la foto y guarda los cambios!');
    };
    lector.readAsDataURL(archivo);
    e.target.value = '';
  };

  const guardar = (e) => {
    e.preventDefault();
    const nombreCompleto = [
      form.primerNombre,
      form.segundoNombre,
      form.primerApellido,
      form.segundoApellido,
    ].filter(Boolean).join(' ').trim();
    updateProfile({
      ...form,
      nombreCompleto,
      foto: fotoPrev,
      fotoPosicion: String(fotoPos),
    });
    setEditando(false);
    setMensaje('¡Perfil actualizado correctamente!');
    setTimeout(() => setMensaje(''), 3000);
  };

  const iniciales = (user.nombreCompleto || user.primerNombre || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const etiqueta = (valor, porDefecto = '—') => (valor ? valor : porDefecto);

  const posicionFoto = `50% ${fotoPos}%`;
  const posicionAvatar = `50% ${user?.fotoPosicion || 50}%`;

  return (
    <div className="perfil-contenedor py-4">
      <div className="perfil-tarjeta">
        <Link to="/" className="perfil-volver">← Volver a la tienda</Link>

        <div className="perfil-cabecera">
          <div className="perfil-avatar">
            {user.foto ? (
              <img
                src={user.foto}
                alt="Foto de perfil"
                className="perfil-foto"
                style={{ objectPosition: posicionAvatar }}
              />
            ) : (
              <span className="perfil-iniciales">{iniciales}</span>
            )}
          </div>
          <div>
            <h1 className="perfil-nombre">{user.nombreCompleto || user.primerNombre || 'Usuario'}</h1>
            <p className="perfil-correo">{user.email}</p>
            <span className={`perfil-rol ${user.role}`}>
              {user.role === 'vendedor' ? '🏪 Vendedor' : '🛒 Cliente'}
            </span>
          </div>
        </div>

        {mensaje && <div className="perfil-mensaje">{mensaje}</div>}

        {/* MODO VER */}
        {!editando && (
          <>
            <div className="perfil-datos">
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Teléfono</span>
                <span>{etiqueta(form.telefono)}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Fecha de nacimiento</span>
                <span>{etiqueta(form.fechaNacimiento)}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Género</span>
                <span className="capitalizado">{etiqueta(form.genero)}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Estatura</span>
                <span>{etiqueta(form.estatura, '—')}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Peso</span>
                <span>{etiqueta(form.peso)}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Actividad</span>
                <span className="capitalizado">{etiqueta(form.actividad)}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Objetivo</span>
                <span className="capitalizado">{etiqueta(form.objetivo)}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Alergia</span>
                <span className="capitalizado">{etiqueta(form.alergia)}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-etiqueta">Dieta</span>
                <span className="capitalizado">{etiqueta(form.dieta)}</span>
              </div>
              <div className="perfil-dato ancho">
                <span className="perfil-etiqueta">Restricciones</span>
                <span>{etiqueta(form.restricciones)}</span>
              </div>
            </div>

            <div className="perfil-acciones">
              <button className="perfil-boton editar" onClick={() => setEditando(true)}>
                ✏️ Editar perfil
              </button>
              <button className="perfil-boton salir" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          </>
        )}

        {/* MODO EDICIÓN */}
        {editando && (
          <form onSubmit={guardar} className="perfil-form">
            {/* SECCIÓN: FOTO DE PERFIL */}
            <section className="perfil-seccion foto">
              <h3 className="perfil-seccion-titulo">📷 Foto de perfil</h3>

              <div className="perfil-foto-ajuste">
                <div className="perfil-avatar perfil-avatar-prev">
                  {fotoPrev ? (
                    <img
                      src={fotoPrev}
                      alt="Vista previa"
                      className="perfil-foto"
                      style={{ objectPosition: posicionFoto }}
                    />
                  ) : (
                    <span className="perfil-iniciales">{iniciales}</span>
                  )}
                </div>

                <div className="perfil-foto-controles">
                  <p className="perfil-foto-hint">
                    Ajusta la posición de la foto (arriba / abajo) para que no se corte.
                  </p>

                  <input
                    ref={inputFotoRef}
                    type="file"
                    accept="image/*"
                    className="perfil-input-file"
                    onChange={manejarFoto}
                  />
                  <button
                    type="button"
                    className="perfil-boton-foto"
                    onClick={() => inputFotoRef.current?.click()}
                  >
                    📂 Elegir otra foto
                  </button>

                  <label className="perfil-rango">
                    <span>Posición vertical</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={fotoPos}
                      onChange={(e) => setFotoPos(e.target.value)}
                    />
                    <span className="perfil-rango-valor">{Math.round(Math.abs(fotoPos - 50) / 5)}%</span>
                  </label>
                </div>
              </div>
            </section>

            {/* SECCIÓN: DATOS PERSONALES */}
            <section className="perfil-seccion">
              <h3 className="perfil-seccion-titulo">👤 Datos personales</h3>
              <div className="perfil-seccion-grid">
                <div className="campo">
                  <label>Primer nombre</label>
                  <input name="primerNombre" value={form.primerNombre} onChange={cambiar} placeholder="Tu primer nombre" />
                </div>
                <div className="campo">
                  <label>Segundo nombre</label>
                  <input name="segundoNombre" value={form.segundoNombre} onChange={cambiar} placeholder="Opcional" />
                </div>
                <div className="campo">
                  <label>Primer apellido</label>
                  <input name="primerApellido" value={form.primerApellido} onChange={cambiar} placeholder="Tu primer apellido" />
                </div>
                <div className="campo">
                  <label>Segundo apellido</label>
                  <input name="segundoApellido" value={form.segundoApellido} onChange={cambiar} placeholder="Opcional" />
                </div>
                <div className="campo">
                  <label>Teléfono</label>
                  <input name="telefono" value={form.telefono} onChange={cambiar} placeholder="Ej: 3001234567" />
                </div>
                <div className="campo">
                  <label>Fecha de nacimiento</label>
                  <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={cambiar} />
                </div>
                <div className="campo">
                  <label>Género</label>
                  <select name="genero" value={form.genero} onChange={cambiar}>
                    <option value="">Selecciona</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero-no">Prefiero no decirlo</option>
                  </select>
                </div>
              </div>
            </section>

            {/* SECCIÓN: CUERPO Y ACTIVIDAD */}
            <section className="perfil-seccion">
              <h3 className="perfil-seccion-titulo">💪 Cuerpo y actividad</h3>
              <div className="perfil-seccion-grid">
                <div className="campo">
                  <label>Estatura (m)</label>
                  <input name="estatura" value={form.estatura} onChange={cambiar} placeholder="Ej: 1.70" />
                </div>
                <div className="campo">
                  <label>Peso (kg)</label>
                  <input name="peso" value={form.peso} onChange={cambiar} placeholder="Ej: 65" />
                </div>
                <div className="campo">
                  <label>Actividad diaria</label>
                  <select name="actividad" value={form.actividad} onChange={cambiar}>
                    <option value="">Selecciona</option>
                    <option value="sedentario">Sedentario</option>
                    <option value="ligero">Ligero</option>
                    <option value="activo">Activo</option>
                    <option value="muy-activo">Muy activo</option>
                  </select>
                </div>
                <div className="campo">
                  <label>Objetivo</label>
                  <select name="objetivo" value={form.objetivo} onChange={cambiar}>
                    <option value="">Selecciona</option>
                    <option value="perder">Perder peso</option>
                    <option value="musculo">Ganar músculo</option>
                    <option value="mantener">Mantener</option>
                    <option value="energia">Más energía</option>
                  </select>
                </div>
              </div>
            </section>

            {/* SECCIÓN: ALIMENTACIÓN */}
            <section className="perfil-seccion">
              <h3 className="perfil-seccion-titulo">🥗 Alimentación</h3>
              <div className="perfil-seccion-grid">
                <div className="campo">
                  <label>Alergia / intolerancia</label>
                  <input name="alergia" value={form.alergia} onChange={cambiar} placeholder="Ej: lactosa" />
                </div>
                <div className="campo">
                  <label>Dieta especial</label>
                  <input name="dieta" value={form.dieta} onChange={cambiar} placeholder="Ej: vegano" />
                </div>
                <div className="campo completo">
                  <label>Restricciones / preferencias</label>
                  <textarea name="restricciones" rows="2" value={form.restricciones} onChange={cambiar} placeholder="Cuéntanos tus preferencias…" />
                </div>
              </div>
            </section>

            <div className="perfil-acciones">
              <button type="submit" className="perfil-boton editar">💾 Guardar cambios</button>
              <button type="button" className="perfil-boton cancelar" onClick={() => setEditando(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Perfil;