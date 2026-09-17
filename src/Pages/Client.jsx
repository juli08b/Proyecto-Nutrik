import React, { useState } from 'react';
import '../App.css';

export default function Client() {
  const [clientes] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      correo: 'juan.perez@email.com',
      numPedidos: 3,
      totalComprado: '$ 150.000',
      historial: [
        { idPedido: '#001', fecha: '25/08/2026', total: '$ 50.000', estado: 'Pagada' },
        { idPedido: '#004', fecha: '20/07/2026', total: '$ 60.000', estado: 'Pagada' },
        { idPedido: '#009', fecha: '05/06/2026', total: '$ 40.000', estado: 'Pagada' }
      ]
    },
    {
      id: 2,
      nombre: 'Ana López',
      correo: 'ana.lopez@email.com',
      numPedidos: 2,
      totalComprado: '$ 310.000',
      historial: [
        { idPedido: '#002', fecha: '24/08/2026', total: '$ 230.000', estado: 'Pagada' },
        { idPedido: '#006', fecha: '12/07/2026', total: '$ 80.000', estado: 'Pagada' }
      ]
    },
    {
      id: 3,
      nombre: 'Pedro Gómez',
      correo: 'pedro.gomez@email.com',
      numPedidos: 1,
      totalComprado: '$ 89.000',
      historial: [
        { idPedido: '#003', fecha: '24/08/2026', total: '$ 89.000', estado: 'Pendiente' }
      ]
    }
  ]);

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Título de la sección */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Clientes y Configuración</h1>
          <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>Visualiza los clientes que han comprado, sus pedidos y su historial detallado.</p>
        </div>

        {/* Contenedor principal en dos columnas si hay cliente seleccionado */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Tabla de clientes */}
          <div style={{ flex: clienteSeleccionado ? '2 1 600px' : '1 1 100%', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Nombre</th>
                    <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Correo Electrónico</th>
                    <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151', textAlign: 'center' }}>Nº Pedidos</th>
                    <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Total Comprado</th>
                    <th style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#374151', textAlign: 'center' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>{cliente.nombre}</td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>{cliente.correo}</td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#1f2937', textAlign: 'center' }}>{cliente.numPedidos}</td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: 'bold', color: '#047857' }}>{cliente.totalComprado}</td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => setClienteSeleccionado(cliente)}
                          style={{ backgroundColor: '#047857', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel lateral de información detallada */}
          {clienteSeleccionado && (
            <div style={{ flex: '1 1 320px', backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #d1fae5', height: 'fit-content' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Información Detallada</h3>
                <button
                  onClick={() => setClienteSeleccionado(null)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', fontWeight: 'bold', color: '#9ca3af', cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>

              <div style={{ marginBottom: '16px', fontSize: '14px' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600' }}>Cliente</span>
                <span style={{ fontWeight: '600', color: '#111827' }}>{clienteSeleccionado.nombre}</span>
              </div>
              <div style={{ marginBottom: '16px', fontSize: '14px' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600' }}>Correo</span>
                <span style={{ color: '#374151' }}>{clienteSeleccionado.correo}</span>
              </div>
              <div style={{ marginBottom: '20px', fontSize: '14px' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600' }}>Total Acumulado</span>
                <span style={{ fontWeight: 'bold', color: '#047857' }}>{clienteSeleccionado.totalComprado}</span>
              </div>

              <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>Historial de Compras</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
                {clienteSeleccionado.historial.map((pedido, index) => (
                  <div key={index} style={{ backgroundColor: '#f9fafb', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#1f2937' }}>
                      <span>{pedido.idPedido}</span>
                      <span style={{ color: '#047857' }}>{pedido.total}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                      <span>{pedido.fecha}</span>
                      <span style={{ backgroundColor: pedido.estado === 'Pagada' ? '#d1fae5' : '#fef3c7', color: pedido.estado === 'Pagada' ? '#065f46' : '#92400e', padding: '2px 8px', borderRadius: '12px', fontWeight: '500' }}>
                        {pedido.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}