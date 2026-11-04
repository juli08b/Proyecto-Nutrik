import React, { useState } from 'react';
import OrderStatus from '../../Components/OrderStatus';

const MisPedidos = () => {
  // Estos datos luego los reemplazarás con los que vengan de tu API/Base de datos
  const [pedidos] = useState([
    { id: '1023', fecha: '28 Oct 2026', estado: 'camino', total: 45000, productos: '2x Aceite de Coco, 1x Creatina' },
    { id: '0984', fecha: '15 Oct 2026', estado: 'entregado', total: 12000, productos: '1x Yogur Griego' }
  ]);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
      <h2 style={{ color: '#2C5E3B', marginBottom: '20px' }}>Mis Pedidos</h2>
      
      {pedidos.map(pedido => (
        <div key={pedido.id} style={{ 
          border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', 
          marginBottom: '20px', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px', marginBottom: '15px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '16px' }}>Pedido #{pedido.id}</strong>
              <span style={{ fontSize: '14px', color: '#666' }}>{pedido.fecha}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong style={{ display: 'block', fontSize: '16px', color: '#2C5E3B' }}>${pedido.total.toLocaleString()}</strong>
              <span style={{ fontSize: '13px', color: '#666' }}>{pedido.productos}</span>
            </div>
          </div>
          
          <OrderStatus currentState={pedido.estado} />
        </div>
      ))}
    </div>
  );
};

export default MisPedidos;