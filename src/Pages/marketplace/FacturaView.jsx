import { useRef } from "react";
import logoPequeno from "../../assets/logoNutrick.png";
import { useLocation, useNavigate } from "react-router-dom";
import FacturaTemplate from "../../Components/FacturaTemplate";

export default function FacturaView() {
  const facturaRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePrintPDF = () => {
    window.print();
  };

  const datosRecibidos = location.state
    ? {
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
            precio: location.state.total,
          },
        ],
        impuesto: 0,
        envio: 0,
      }
    : null;

  return (
    <div
      className="factura-view min-h-screen bg-slate-100/80 px-4 pb-16 sm:px-6 lg:px-8 print:bg-white print:p-0 flex flex-col items-center"
      style={{ paddingTop: "160px" }}
    >
      {/* Tarjeta de controles superior con más espacio interno (padding y gaps) */}
      <div className="relative z-10 mx-auto mb-8 w-full max-w-6xl print:hidden">
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Logo y Títulos con separación holgada */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 overflow-hidden p-1.5 shadow-inner">
              <img
                src={logoPequeno}
                alt="Nutrik"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
                Vista previa de factura
              </h1>
              <p className="text-xs text-slate-500 sm:text-sm">
                Revisa el comprobante antes de descargarlo.
              </p>
            </div>
          </div>

          {/* Botones con padding interno más cómodo */}
          <div className="flex w-full gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-800 sm:flex-none shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Volver
            </button>

            <button
              type="button"
              onClick={handlePrintPDF}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.98] sm:flex-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                />
              </svg>
              Descargar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Template de la Factura */}
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
