import React from "react";
import logoPequeno from "../assets/logoNutrick.png";

const FacturaTemplate = React.forwardRef(({ facturaData }, ref) => {
  const data = facturaData || {
    numero: "F-2026-0089",
    fecha: "17/09/2026",
    vencimento: "24/09/2026",
    cliente: {
      nombre: "Camila Andrés Mosquera",
      documento: "1.085.432.112",
      correo: "camila.mosquera@email.com",
      direccion: "Calle 5 # 10-45, Popayán, Cauca",
    },
    items: [
      { id: 1, descripcion: "Proteína Whey Orgánica (1kg)", cantidad: 1, precio: 125000 },
      { id: 2, descripcion: "Granola Artesanal Sin Azúcar", cantidad: 2, precio: 22000 },
    ],
    impuesto: 0,
    envio: 8000,
  };

  const subtotal = data.items.reduce((acc, item) => acc + (Number(item.cantidad) * Number(item.precio)), 0);
  const total = subtotal + Number(data.envio) + Number(data.impuesto);

  const formatCurrency = (value) => {
    const validValue = isNaN(value) ? 0 : Number(value);
    return `$ ${validValue.toLocaleString("es-CO")}`;
  };

  return (
    <div 
      ref={ref} 
      className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:rounded-none"
    >
      {/* Barra superior de acento */}
      <div className="h-3 w-full bg-emerald-600 print:h-2"></div>

      {/* Contenedor principal con padding abundante */}
      <div className="p-10 sm:p-14 print:p-8">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-2">
              <img src={logoPequeno} alt="Logo Nutrik" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">NUTRICK S.A.S.</h1>
              <p className="text-sm text-slate-500 mt-1">NIT: 901.456.789-1</p>
              <p className="text-sm text-slate-500">Popayán, Cauca, Colombia</p>
            </div>
          </div>
          
          <div className="text-left sm:text-right">
            <h2 className="text-4xl font-black text-slate-200 tracking-tighter uppercase print:text-3xl">Factura</h2>
            <p className="text-xl font-bold text-slate-800 mt-1">Nº {data.numero}</p>
            <span className="inline-block mt-3 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              Pagada - Venta Online
            </span>
          </div>
        </div>

        {/* DATOS DEL CLIENTE Y FECHAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 bg-slate-50 rounded-xl p-8 border border-slate-100 mb-10 print:bg-transparent print:border-y print:rounded-none print:px-0">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Facturado a:</p>
            <p className="text-xl font-bold text-slate-800">{data.cliente.nombre}</p>
            <p className="text-sm text-slate-600 mt-2 font-medium">NIT/CC: {data.cliente.documento}</p>
            <p className="text-sm text-slate-500 mt-1">{data.cliente.correo}</p>
            <p className="text-sm text-slate-500">{data.cliente.direccion}</p>
          </div>
          <div className="flex flex-col gap-5 sm:items-end">
            <div className="sm:text-right">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Fecha de Emisión</p>
              <p className="text-base font-semibold text-slate-800">{data.fecha}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Fecha de Vencimiento</p>
              <p className="text-base font-semibold text-slate-800">{data.vencimento}</p>
            </div>
          </div>
        </div>

        {/* TABLA DE PRODUCTOS */}
        <div className="mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Descripción</th>
                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Cant.</th>
                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Precio</th>
                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.map((item, index) => {
                const precio = Number(item.precio) || 0;
                const cantidad = Number(item.cantidad) || 0;
                return (
                  <tr key={item.id ?? index} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5 px-2 text-sm font-medium text-slate-800">{item.descripcion}</td>
                    <td className="py-5 px-2 text-sm text-center text-slate-600">{cantidad}</td>
                    <td className="py-5 px-2 text-sm text-right text-slate-600">{formatCurrency(precio)}</td>
                    <td className="py-5 px-2 text-sm text-right font-bold text-slate-800">{formatCurrency(cantidad * precio)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* TOTALES Y TÉRMINOS */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-end gap-10">
          
          <div className="w-full sm:w-1/2 text-slate-500 text-xs leading-relaxed">
            <p className="font-bold text-slate-700 mb-2 uppercase tracking-wider">Términos y Condiciones</p>
            <p>Gracias por confiar en Nutrick. Conserve este documento como comprobante de compra. Las devoluciones o cambios están sujetos a nuestras políticas internas con un plazo máximo de 30 días calendario.</p>
          </div>

          <div className="w-full sm:w-80">
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold text-slate-800">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Envío</span>
                <span className="font-semibold text-slate-800">{formatCurrency(data.envio)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Impuestos</span>
                <span className="font-semibold text-slate-800">{formatCurrency(data.impuesto)}</span>
              </div>
            </div>
            
            <div className="bg-emerald-600 text-white rounded-xl p-5 flex justify-between items-center shadow-md">
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-100">Total</span>
              <span className="text-2xl font-black">{formatCurrency(total)}</span>
            </div>
            <p className="text-right text-[10px] text-slate-400 mt-2 font-medium">Cifras en Pesos Colombianos (COP)</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 text-center border-t border-slate-200 pt-8 print:mt-10">
          <p className="text-sm font-black text-emerald-600 tracking-widest">NUTRICK</p>
          <p className="text-xs text-slate-400 mt-1">Alimentando tu estilo de vida 🌱</p>
        </div>

      </div>
    </div>
  );
});

FacturaTemplate.displayName = "FacturaTemplate";

export default FacturaTemplate;