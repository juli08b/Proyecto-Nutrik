import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../App.css';

//sirve para exportar 
export default function FacturaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Botón para volver */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', marginBottom: '20px' }}
        >
          &larr; Volver a Facturas
        </button>

        {/* Tarjeta de detalle */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginTop: 0, marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
            Detalle de la Factura: <span style={{ color: '#047857' }}>{id}</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px', fontSize: '14px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600' }}>Cliente</span>
              <span style={{ fontWeight: '600', color: '#111827', fontSize: '15px' }}>Juan Pérez</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600' }}>Fecha</span>
              <span style={{ color: '#374151', fontSize: '15px' }}>22/05/2026</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600' }}>Estado</span>
              <span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-block', marginTop: '4px' }}>
                Pagado
              </span>
            </div>
          </div>
          
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Productos comprados</h3>
          
          <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 24px 0', borderTop: '1px solid #f3f4f6' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#4b5563' }}>
              <span>Yogur Griego Natural (x1)</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>$12.000</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#4b5563' }}>
              <span>Ensalada Fresh (x1)</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>$15.000</span>
            </li>
          </ul>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151' }}>Total a Pagar:</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#047857' }}>$27.000</span>
          </div>
        </div>

      </div>
    </div>
  );
}