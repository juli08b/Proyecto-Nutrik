import Switch from './switch';

export default function MiTienda({ onSave }) {
  return (
    <>
      <div className="card">
        <h2>Datos de la tienda</h2>
        <p className="sub">Aparecen en tus facturas y pedidos.</p>
        <div className="grid">
          <div className="f"><label htmlFor="tn">Nombre de la tienda</label><input type="text" id="tn" defaultValue="Nutrik – Alimenta tu bienestar" /></div>
          <div className="f"><label htmlFor="nit">NIT</label><input type="text" id="nit" defaultValue="900.123.456-7" /></div>
          <div className="f w"><label htmlFor="dir">Dirección</label><input type="text" id="dir" defaultValue="Cra 15 #93-47, Bogotá" /></div>
          <div className="f"><label htmlFor="mon">Moneda</label>
            <select id="mon"><option>Peso colombiano (COP)</option><option>Dólar (USD)</option></select></div>
          <div className="f"><label htmlFor="iva">IVA por defecto</label>
            <select id="iva"><option>19 %</option><option>5 %</option><option>Excluido</option></select></div>
        </div>
      </div>

      <div className="card">
        <h2>Facturación y pagos</h2>
        <p className="sub">Define cómo numeras tus facturas y cómo te pagan.</p>
        <div className="grid" style={{ marginBottom: 8 }}>
          <div className="f"><label htmlFor="pf">Prefijo de factura</label><input type="text" id="pf" defaultValue="FAC-" /></div>
          <div className="f"><label htmlFor="cn">Siguiente número</label><input type="text" id="cn" defaultValue="0006" /></div>
        </div>
        <div className="row"><div><p>Efectivo</p><span>Pago contra entrega o en tienda</span></div><Switch defaultChecked /></div>
        <div className="row"><div><p>Transferencia bancaria</p><span>Nequi, Daviplata o cuenta bancaria</span></div><Switch defaultChecked /></div>
        <div className="row"><div><p>Tarjeta de crédito o débito</p><span>Requiere conectar una pasarela de pagos</span></div><Switch /></div>
      </div>

      <div className="bar">
        <button className="btn o">Cancelar</button>
        <button className="btn" onClick={onSave}>Guardar cambios</button>
      </div>
    </>
  );
}