import React, { useRef } from "react";
import FacturaTemplate from "../../Components/FacturaTemplate";

export default function FacturaView() {
  const facturaRef = useRef();

  // Función nativa para activar la ventana de impresión (Aspecto exacto para Descargar PDF)
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Barra superior con controles (Esta barra NO saldrá en el PDF impreso gracias a las clases print:hidden) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 print:hidden">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            Vista Previa de Factura
          </h1>
          <p className="text-xs text-gray-500">
            Genera y descarga el comprobante de venta en formato PDF.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Volver
          </button>
          <button
            onClick={handlePrintPDF}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-sm transition-all transform active:scale-95"
          >
            {/* Ícono SVG de descarga/impresión */}
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Componente de la Factura */}
      <FacturaTemplate ref={facturaRef} />

      {/* Estilos globales específicos para el modo impresión / PDF */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
