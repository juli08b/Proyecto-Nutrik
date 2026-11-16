import { useParams, useNavigate } from 'react-router-dom';
import '../../App.css';
import '../Invoice.css';

//sirve para exportar 
export default function FacturaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="invoice-page invoice-detail-page invoice-page-vendedor">
      <div className="invoice-container invoice-detail-container">
        <button className="invoice-back-button" onClick={() => navigate(-1)}>
          &larr; Volver a Facturas
        </button>

        <section className="invoice-detail-card">
          <h2>
            Detalle de la Factura: <span style={{ color: '#047857' }}>{id}</span>
          </h2>
          
          <div className="invoice-detail-meta">
            <div>
              <span>Cliente</span>
              <strong>Juan Pérez</strong>
            </div>
            <div>
              <span>Fecha</span>
              <strong>22/05/2026</strong>
            </div>
            <div>
              <span>Estado</span>
              <strong className="invoice-status paid">
                Pagado
              </strong>
            </div>
          </div>
          
          <h3 className="invoice-products-title">Productos comprados</h3>
          
          <ul className="invoice-products-list">
            <li>
              <span>Yogur Griego Natural (x1)</span>
              <strong>$12.000</strong>
            </li>
            <li>
              <span>Ensalada Fresh (x1)</span>
              <strong>$15.000</strong>
            </li>
          </ul>
          
          <div className="invoice-detail-total">
            <span>Total a Pagar:</span>
            <strong>$27.000</strong>
          </div>
        </section>
      </div>
    </div>
  );
}