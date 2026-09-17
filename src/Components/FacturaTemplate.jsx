import React from "react";

const FacturaTemplate = React.forwardRef(({ facturaData }, ref) => {
  // Datos por defecto simulando Nutrick (productos saludables)
  const data = facturaData || {
    numero: "F-2026-0089",
    fecha: "17 de Septiembre, 2026",
    vencimento: "24 de Septiembre, 2026",
    cliente: {
      nombre: "Camila Andrés Mosquera",
      documento: "1.085.432.112",
      correo: "camila.mosquera@email.com",
      direccion: "Calle 5 # 10-45, Popayán, Cauca",
    },
    items: [
      {
        id: 1,
        descripcion: "Proteína Whey Orgánica (Sabor Vainilla 1kg)",
        cantidad: 1,
        precio: 125000,
      },
      {
        id: 2,
        descripcion: "Granola Artesanal Sin Azúcar (500g)",
        cantidad: 2,
        precio: 22000,
      },
      {
        id: 3,
        descripcion: "Mantequilla de Maní Natural 100% Pura",
        cantidad: 1,
        precio: 18500,
      },
    ],
    impuesto: 0,
    envio: 8000,
  };

  const subtotal = data.items.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0,
  );
  const total = subtotal + data.envio + data.impuesto;

  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100 my-4 print:shadow-none print:border-none print:p-0 print:m-0 print:w-full"
    >
      {/* Encabezado de la Factura */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white font-black text-xl px-3 py-1.5 rounded-xl tracking-wider">
              NUTRICK
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Vida Saludable
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">NIT: 901.456.789-1</p>
          <p className="text-xs text-gray-500">Popayán, Cauca, Colombia</p>
        </div>
        <div className="text-left sm:text-right">
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            FACTURA DE VENTA
          </h2>
          <p className="text-emerald-600 font-bold text-sm mt-0.5">
            {data.numero}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Fecha de emisión:{" "}
            <span className="font-medium text-gray-700">{data.fecha}</span>
          </p>
          <p className="text-xs text-gray-500">
            Vencimiento:{" "}
            <span className="font-medium text-gray-700">{data.vencimento}</span>
          </p>
        </div>
      </div>

      {/* Información del Cliente */}
      <div className="bg-emerald-50/50 rounded-xl p-4 mb-6 border border-emerald-100/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Facturar a:
          </p>
          <p className="font-bold text-gray-900">{data.cliente.nombre}</p>
          <p className="text-gray-600 text-xs">
            C.C. / NIT: {data.cliente.documento}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Detalles de Entrega:
          </p>
          <p className="text-gray-600 text-xs">{data.cliente.direccion}</p>
          <p className="text-gray-600 text-xs">{data.cliente.correo}</p>
        </div>
      </div>

      {/* Tabla de Productos - 100% Responsiva con Scroll Horizontal en Móviles */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-emerald-600 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <th className="py-3 px-3">Descripción</th>
              <th className="py-3 px-3 text-center">Cant.</th>
              <th className="py-3 px-3 text-right">Precio Unit.</th>
              <th className="py-3 px-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {data.items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-3 text-gray-800 font-medium">
                  {item.descripcion}
                </td>
                <td className="py-3.5 px-3 text-center text-gray-600">
                  {item.cantidad}
                </td>
                <td className="py-3.5 px-3 text-right text-gray-600">
                  ${item.precio.toLocaleString()}
                </td>
                <td className="py-3.5 px-3 text-right font-semibold text-gray-900">
                  ${(item.cantidad * item.precio).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totales y Resumen */}
      <div className="flex flex-col sm:flex-row justify-between items-end border-t border-gray-200 pt-6 gap-6">
        <div className="text-xs text-gray-500 max-w-xs">
          <p className="font-semibold text-gray-700 mb-1">
            Términos y condiciones:
          </p>
          <p>
            Gracias por preferir productos saludables Nutrick. Conserve esta
            factura para cualquier cambio o garantía dentro de los próximos 30
            días.
          </p>
        </div>
        <div className="w-full sm:w-64 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span className="font-medium">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Envío:</span>
            <span className="font-medium">${data.envio.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 border-t border-emerald-200 pt-2 mt-2">
            <span>Total a Pagar:</span>
            <span className="text-emerald-700">
              ${total.toLocaleString()} COP
            </span>
          </div>
        </div>
      </div>

      {/* Pie de página de factura */}
      <div className="mt-12 text-center border-t border-dashed border-gray-200 pt-6 text-xs text-gray-400">
        <p>Nutrick E-commerce • Alimentando tu estilo de vida</p>
      </div>
    </div>
  );
});

export default FacturaTemplate;
