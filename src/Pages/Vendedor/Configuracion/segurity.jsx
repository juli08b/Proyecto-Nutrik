import Switch from './switch';

export default function PerfilSeguridad({ onSave }) {
  return (
    <>
      <div className="card">
        <h2>Información personal</h2>
        <p className="sub">Estos datos se muestran en tu cuenta y en las facturas.</p>
        <div className="photo">
          <div className="av">CV</div>
          <div>
            <button className="btn o">Cambiar foto</button>
            <p className="sub" style={{ margin: '6px 0 0' }}>JPG o PNG, máximo 2 MB</p>
          </div>
        </div>
        <div className="grid">
          <div className="f"><label htmlFor="n">Nombre</label><input type="text" id="n" defaultValue="Carlos" /></div>
          <div className="f"><label htmlFor="a">Apellido</label><input type="text" id="a" defaultValue="Vendedor" /></div>
          <div className="f"><label htmlFor="e">Correo electrónico</label><input type="email" id="e" defaultValue="carlos@nutrik.co" /></div>
          <div className="f"><label htmlFor="t">Teléfono</label><input type="tel" id="t" defaultValue="+57 300 123 4567" /></div>
        </div>
      </div>
      <div className="bar">
        <button className="btn o">Cancelar</button>
        <button className="btn" onClick={onSave}>Guardar cambios</button>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Cambiar contraseña</h2>
        <p className="sub">Usa mínimo 8 caracteres, con letras y números.</p>
        <div className="grid">
          <div className="f w"><label htmlFor="p0">Contraseña actual</label><input type="password" id="p0" /></div>
          <div className="f"><label htmlFor="p1">Nueva contraseña</label><input type="password" id="p1" /></div>
          <div className="f"><label htmlFor="p2">Confirmar contraseña</label><input type="password" id="p2" /></div>
        </div>
        <div className="bar" style={{ marginTop: 16 }}>
          <button className="btn" onClick={onSave}>Actualizar contraseña</button>
        </div>
      </div>

      <div className="card">
        <h2>Verificación en dos pasos</h2>
        <p className="sub">Añade una capa extra de seguridad al iniciar sesión.</p>
        <div className="row">
          <div><p>Código por mensaje de texto</p><span>Te enviaremos un código a tu teléfono</span></div>
          <Switch />
        </div>
      </div>

      <div className="card">
        <h2>Sesiones activas</h2>
        <p className="sub">Dispositivos donde tu cuenta está abierta.</p>
        <table className="tbl">
          <thead><tr><th>Dispositivo</th><th>Ubicación</th><th>Último acceso</th><th></th></tr></thead>
          <tbody>
            <tr><td>Chrome · Windows</td><td>Bogotá, CO</td><td>Ahora</td><td><span className="pill">Este equipo</span></td></tr>
            <tr><td>Safari · iPhone</td><td>Bogotá, CO</td><td>Ayer, 6:42 p. m.</td><td><button className="btn o" style={{ padding: '5px 10px' }}>Cerrar</button></td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Zona de riesgo</h2>
        <p className="sub">Esta acción no se puede deshacer.</p>
        <button className="btn d">Eliminar cuenta</button>
      </div>
    </>
  );
}