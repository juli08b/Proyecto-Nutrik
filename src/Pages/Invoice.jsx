import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../App.css';

export default function Invoice() {
  // Inicializamos la navegación
  const navigate = useNavigate();

  const [invoices] = useState([
    { id: 'FAC-0001', client: 'Juan Pérez', date: '25/08/2026', total: '$ 150.000', status: 'Pagada' },
    { id: 'FAC-0002', client: 'Ana López', date: '24/08/2026', total: '$ 230.000', status: 'Pagada' },
    { id: 'FAC-0003', client: 'Pedro Gómez', date: '24/08/2026', total: '$ 89.000', status: 'Pendiente' },
    { id: 'FAC-0004', client: 'María Torres', date: '23/08/2026', total: '$ 120.000', status: 'Pagada' },
  ]);

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Cabecera con título y botón de nueva factura */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Facturación</h1>
            <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>Gestiona y crea tus facturas de forma rápida y ordenada.</p>
          </div>
          <button 
            style={{ backgroundColor: '#047857', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            + Nueva factura
          </button>
        </div>

        {/* Tabla de Facturas */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>N° Factura</th>
                  <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Cliente</th>
                  <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Fecha</th>
                  <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Total</th>
                  <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Estado</th>
                  <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151', textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>{inv.id}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{inv.client}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>{inv.date}</td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: 'bold', color: '#047857' }}>{inv.total}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        backgroundColor: inv.status === 'Pagada' ? '#d1fae5' : '#fef3c7', 
                        color: inv.status === 'Pagada' ? '#065f46' : '#92400e', 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: '600' 
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      {/* Aquí agregamos el evento onClick al botón de Ver */}
                      <button 
                        onClick={() => navigate(`/facturas/${inv.id}`)}
                        style={{ background: '#eff6ff', color: '#1d4ed8', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginRight: '8px' }}
                      >
                        Ver
                      </button>
                      <button style={{ background: '#f3f4f6', color: '#374151', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}