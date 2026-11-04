import Switch from './switch';

export default function Preferencias({ onSave }) {
  // Modo oscuro: cambia el atributo data-theme del <html>
  const cambiarTema = (e) => {
    document.documentElement.dataset.theme = e.target.checked ? 'dark' : 'light';
  };

  return (
    <>
      <div className="card">
        <h2>Preferencias de la app</h2>
        <p className="sub">Personaliza como ves Nutrik.</p>
        <div className="grid">
          <div className="f"><label htmlFor="idm">Idioma</label><select id="idm"><option>Español</option><option>English</option></select></div>
          <div className="f"><label htmlFor="zh">Zona horaria</label><select id="zh"><option>America/Bogota (GMT-5)</option></select></div>
          <div className="f"><label htmlFor="fd">Formato de fecha</label><select id="fd"><option>DD/MM/AAAA</option><option>MM/DD/AAAA</option></select></div>
          <div className="f"><label htmlFor="tp">Filas por tabla</label><select id="tp"><option>5</option><option>10</option><option>25</option></select></div>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <div><p>Modo oscuro</p><span>Cambia el aspecto de la interfaz</span></div>
          <Switch onChange={cambiarTema} />
        </div>
      </div>
      <div className="bar"><button className="btn" onClick={onSave}>Guardar cambios</button></div>
    </>
  );
}