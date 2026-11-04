import React from 'react';

const OrderStatus = ({ currentState }) => {
  const steps = [
    { id: 'recibido', label: 'Recibido', icon: '📝' },
    { id: 'preparacion', label: 'En Preparación', icon: '👨‍🍳' },
    { id: 'camino', label: 'En Camino', icon: '🚚' },
    { id: 'entregado', label: 'Entregado', icon: '✅' }
  ];

  const currentIndex = steps.findIndex(step => step.id === currentState);

  return (
    <div style={{ width: '100%', padding: '30px 20px', marginTop: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative' 
      }}>
        
        {/* Línea conectora gris de fondo */}
        <div style={{
          position: 'absolute', 
          top: '30%', 
          left: '10%', 
          right: '10%',
          height: '6px', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '5px',
          zIndex: 0
        }}>
           {/* Línea conectora verde de progreso */}
           <div style={{
             height: '100%', 
             backgroundColor: '#4CAF50',
             borderRadius: '5px',
             width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%`,
             transition: 'width 0.5s ease-in-out'
           }} />
        </div>

        {/* Mapeo de los círculos con los íconos */}
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          
          return (
            <div key={step.id} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              zIndex: 1, 
              width: '25%' 
            }}>
              <div style={{
                width: isActive ? '50px' : '40px', 
                height: isActive ? '50px' : '40px', 
                borderRadius: '50%',
                backgroundColor: isCompleted ? '#4CAF50' : '#f5f5f5',
                border: isCompleted ? '3px solid #4CAF50' : '3px solid #ccc',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: isCompleted ? 'white' : '#666',
                fontSize: isActive ? '24px' : '18px',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 4px 10px rgba(76, 175, 80, 0.4)' : 'none'
              }}>
                {step.icon}
              </div>
              <span style={{ 
                marginTop: '12px', 
                fontSize: '14px', 
                textAlign: 'center',
                color: isActive ? '#2C5E3B' : (isCompleted ? '#4CAF50' : '#757575'),
                fontWeight: isActive ? 'bold' : (isCompleted ? '600' : 'normal')
              }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;