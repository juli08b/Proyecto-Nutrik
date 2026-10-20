import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';
import './Invoice.css';

export default function Invoice() {
  // Inicializamos la navegación
  const navigate = useNavigate();
  const location = useLocation();

  const [invoices] = useState([
    { id: 'FAC-0001', client: 'Juan Pérez', date: '25/08/2026', total: '$ 150.000', status: 'Pagada' },
    { id: 'FAC-0002', client: 'Ana López', date: '24/08/2026', total: '$ 230.000', status: 'Pagada' },
    { id: 'FAC-0003', client: 'Pedro Gómez', date: '24/08/2026', total: '$ 89.000', status: 'Pendiente' },
    { id: 'FAC-0004', client: 'María Torres', date: '23/08/2026', total: '$ 120.000', status: 'Pagada' },
  ]);

  return (
    <div className={`invoice-page ${location.pathname.startsWith('/vendedor') ? 'invoice-page-vendedor' : ''}`}>
      <div className="invoice-container">
        <div className="invoice-header">
          <div>
            <h1>Facturación</h1>
            <p>Gestiona y crea tus facturas de forma rápida y ordenada.</p>
          </div>
          <button className="invoice-new-button">
            + Nueva factura
          </button>
        </div>

        <section className="invoice-table-card">
          <div className="invoice-table-scroll">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>N° Factura</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="invoice-actions-heading">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="invoice-id">{inv.id}</td>
                    <td className="invoice-client">{inv.client}</td>
                    <td className="invoice-date">{inv.date}</td>
                    <td className="invoice-total">{inv.total}</td>
                    <td>
                      <span className={`invoice-status ${inv.status === 'Pagada' ? 'paid' : 'pending'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="invoice-actions">
                      <button
                        className="invoice-action-button view"
                        onClick={() => navigate(`${location.pathname.startsWith('/vendedor') ? '/vendedor' : ''}/facturas/${inv.id}`)}
                      >
                        Ver
                      </button>
                      <button className="invoice-action-button download">
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}