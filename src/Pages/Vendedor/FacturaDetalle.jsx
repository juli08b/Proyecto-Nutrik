import { useParams, useNavigate } from 'react-router-dom';

export default function FacturaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100/80 px-4 pb-12 sm:px-6 lg:px-8 pt-40 flex flex-col items-center">
      
      {/* Contenedor central para limitar el ancho */}
      <div className="w-full max-w-4xl">
        
        {/* Botón para volver */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-5 flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          &larr; Volver a Facturas
        </button>

        {/* Tarjeta de detalle */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-5 border-b border-gray-100 pb-3 text-2xl font-bold text-gray-900">
            Detalle de la Factura: <span className="text-emerald-700">{id}</span>
          </h2>
          
          <div className="mb-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div>
              <span className="block text-xs font-semibold uppercase text-gray-500">Cliente</span>
              <span className="text-base font-semibold text-gray-900">Juan Pérez</span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-gray-500">Fecha</span>
              <span className="text-base text-gray-700">22/05/2026</span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-gray-500">Estado</span>
              <span className="mt-1 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Pagado
              </span>
            </div>
          </div>
          
          <h3 className="mb-3 text-base font-bold uppercase tracking-wide text-gray-700">Productos comprados</h3>
          
          <ul className="mb-6 border-t border-gray-100">
            <li className="flex justify-between border-b border-gray-100 py-3 text-sm text-gray-600">
              <span>Yogur Griego Natural (x1)</span>
              <span className="font-semibold text-gray-900">$12.000</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 py-3 text-sm text-gray-600">
              <span>Ensalada Fresh (x1)</span>
              <span className="font-semibold text-gray-900">$15.000</span>
            </li>
          </ul>
          
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <span className="text-base font-bold text-gray-700">Total a Pagar:</span>
            <span className="text-xl font-bold text-emerald-700">$27.000</span>
          </div>
        </div>
      </div>

    </div>
  );
}