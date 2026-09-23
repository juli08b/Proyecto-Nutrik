import { useRef } from "react";
import logoPequeno from "../../assets/logoNutrick.png";
// 1. IMPORTA useLocation y useNavigate de react-router-dom
import { useLocation, useNavigate } from "react-router-dom";
import FacturaTemplate from "../../Components/FacturaTemplate";

export default function FacturaView() {
  const facturaRef = useRef(null);
  const location = useLocation(); // 2. ATRAPA LOS DATOS AQUÍ
  const navigate = useNavigate();

  const handlePrintPDF = () => {
    window.print();
  };

  // 3. ADAPTAMOS LOS DATOS que llegaron del botón al formato que exige FacturaTemplate
  // Si entramos directo sin pulsar el botón (location.state es null), esto será null y usará los de prueba
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
        descripcion: "Compra registrada en sistema", // Puedes mandar los productos reales desde el botón luego
        cantidad: 1,
        precio: location.state.total,
      }
    ],
    impuesto: 0,
    envio: 0,
  } : null;

  return (
    <div
      className="factura-view min-h-screen bg-slate-100/80 px-4 pb-12 sm:px-6 lg:px-8 print:bg-white print:p-0 flex flex-col items-center"
      style={{ paddingTop: '160px' }}
    >
      <div className="relative z-10 mx-auto mb-6 w-full max-w-6xl print:hidden">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              {/* Ícono */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <img src={logoPequeno} alt="Nutrik" width={150} height={90} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 14l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 sm:text-lg">Vista previa de factura</h1>
              <p className="text-xs text-slate-500 sm:text-sm">Revisa el comprobante antes de descargarlo.</p>
            </div>
          </div>

          <div className="flex w-full gap-4 sm:w-auto">
            <button
              type="button"
              onClick={() => navigate(-1)} // Mejoramos el botón volver usando react-router-dom
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-800 sm:flex-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </button>

            <button
              type="button"
              onClick={handlePrintPDF}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.98] sm:flex-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
              Descargar PDF
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-0 mx-auto w-full max-w-6xl">
        <FacturaTemplate ref={facturaRef} facturaData={datosRecibidos} />
      </div>
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          html, body { background: white !important; width: 100% !important; height: 100% !important; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          header, nav, .navegacion, .sidebar, .overlay, footer, .print\\:hidden { display: none !important; }
          .factura-view { padding: 0 !important; background: white !important; }
        }
      `}</style>
    </div>
  );
}