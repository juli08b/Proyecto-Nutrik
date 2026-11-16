import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FacturaTemplate from "../../Components/FacturaTemplate";

export default function FacturaView() {
  const facturaRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePrintPDF = () => window.print();

  const parsearTotal = (valor) => {
    if (!valor) return 0;
    const numeroLimpio = valor.toString().replace(/[^0-9]/g, '');
    const resultado = Number(numeroLimpio);
    return isNaN(resultado) ? 0 : resultado;
  };

  // En tu FacturaView.jsx (asegúrate de importar useEffect arriba)
  useEffect(() => {
    if (location.state && location.state.autoImprimir) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [location.state]);
  const datosRecibidos = location.state ? {
    numero: `F-${location.state.numero}`,
    fecha: location.state.fecha,
    vencimento: location.state.fecha,
    cliente: {
      nombre: location.state.cliente,
      documento: "Por definir",
      correo: "No registrado",
      direccion: "No registrada",
    },
    items: [
      {
        id: 1,
        descripcion: "Compra registrada en sistema",
        cantidad: 1,
        precio: parsearTotal(location.state.total),
      }
    ],
    impuesto: 0,
    envio: 0,
  } : null;

  return (
    <div className="min-h-screen bg-slate-100 pt-[120px] pb-16 px-4 print:bg-white print:p-0 flex flex-col items-center">

      {/* Contenedor estricto para mantener el ancho de la factura */}
      <div className="w-full max-w-4xl flex flex-col gap-6 print:gap-0">

        {/* Barra de herramientas superior */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
          <div>
            <h1 className="text-slate-800 font-bold text-lg">Vista previa del documento</h1>
            <p className="text-xs text-slate-500">Revisa la factura antes de imprimir o guardar.</p>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Volver
            </button>
            <button
              onClick={handlePrintPDF}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-colors"
            >
              Descargar PDF
            </button>
          </div>
        </div>

        {/* Factura Renderizada */}
        <div className="w-full">
          <FacturaTemplate ref={facturaRef} facturaData={datosRecibidos} />
        </div>

      </div>

      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 10mm; }
          html, body { 
            background-color: white !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
          }
          header, nav, .navegacion, .sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
}