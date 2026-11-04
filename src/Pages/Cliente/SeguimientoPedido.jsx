import React, { useState } from 'react';
import OrderStatus from '../../Components/OrderStatus';
import { useAuth } from '../../Context/authContext';
import { Link } from 'react-router-dom';

const SeguimientoPedido = () => {
  const { user } = useAuth();
  
  // Aquí deberías hacer una petición a tu API para obtener el estado real del pedido
  // Por ahora, usaremos un estado de ejemplo:
  const [estadoPedido, setEstadoPedido] = useState('preparacion'); 

  if (!user) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '50vh' }}>
        <h2 style={{ color: '#2C5E3B', marginBottom: '20px' }}>Inicia sesión para seguir tu pedido</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>Debes estar registrado y haber realizado una compra para ver el estado de tu pedido.</p>
        <Link to="/elegir-rol" style={{
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '10px 25px', 
            borderRadius: '5px', 
            textDecoration: 'none',
            fontWeight: 'bold'
        }}>
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', minHeight: '60vh' }}>
      
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '30px 40px', 
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
        border: '1px solid #eaeaea'
      }}>
        <h2 style={{ color: '#2C5E3B', textAlign: 'center', marginBottom: '10px', fontSize: '24px' }}>
          📦 Seguimiento de tu pedido
        </h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '16px', marginBottom: '30px' }}>
          <strong>Pedido #1023</strong> - Tiempo estimado de entrega: 25 min
        </p>
        
        <OrderStatus currentState={estadoPedido} />
      </div>
    </div>
  );
};

export default SeguimientoPedido;