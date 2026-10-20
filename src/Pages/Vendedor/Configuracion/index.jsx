import { useState } from 'react';
import MiTienda from './store';
import Preferencias from './preferences';
import PerfilSeguridad from './segurity';
import './configuracion.css';

const SECCIONES = [
  { id: 'tienda', etiqueta: 'Mi tienda', icono: '🏪', Componente: MiTienda },
  { id: 'preferencias', etiqueta: 'Preferencias', icono: '🎨', Componente: Preferencias },
  { id: 'seguridad', etiqueta: 'Perfil y seguridad', icono: '🔒', Componente: PerfilSeguridad },
];

const Configuracion = () => {
  const [activa, setActiva] = useState('tienda');
  const [mensaje, setMensaje] = useState('');

  const seccionActiva = SECCIONES.find((seccion) => seccion.id === activa);
  const Seccion = seccionActiva.Componente;

  const guardarCambios = () => {
    setMensaje('Cambios guardados correctamente.');
    window.setTimeout(() => setMensaje(''), 2600);
  };

  const cambiarSeccion = (id) => {
    setActiva(id);
    setMensaje('');
  };

  return (
    <div className="config-vendedor">
      <header className="config-header">
        <h1>Configuración</h1>
        <p>Administra tu tienda, tus preferencias y la seguridad de tu cuenta.</p>
      </header>

      <div className="config-layout">
        <nav className="config-nav">
          {SECCIONES.map((seccion) => (
            <button
              key={seccion.id}
              type="button"
              className={`config-nav-item ${activa === seccion.id ? 'active' : ''}`}
              onClick={() => cambiarSeccion(seccion.id)}
            >
              <span className="config-nav-icono">{seccion.icono}</span>
              {seccion.etiqueta}
            </button>
          ))}
        </nav>

        <div className="config-contenido">
          {mensaje && <div className="config-toast">{mensaje}</div>}
          <Seccion onSave={guardarCambios} />
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
