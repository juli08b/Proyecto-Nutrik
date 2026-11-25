import './OrderStatus.css';

const steps = [
  { id: 'recibido', label: 'Pedido recibido', description: 'Registramos tu compra', icon: '✓' },
  { id: 'preparacion', label: 'En preparación', description: 'Estamos alistando tus productos', icon: '▤' },
  { id: 'camino', label: 'En camino', description: 'Tu pedido va hacia ti', icon: '↗' },
  { id: 'entregado', label: 'Entregado', description: '¡Disfruta tu compra!', icon: '⌂' },
];

const estadoPorEtapa = {
  pendiente: 0,
  recibido: 0,
  confirmado: 0,
  confirmada: 0,
  preparacion: 1,
  preparando: 1,
  procesando: 1,
  en_preparacion: 1,
  enviado: 2,
  en_camino: 2,
  camino: 2,
  despachado: 2,
  entregado: 3,
  completado: 3,
  completed: 3,
};

function OrderStatus({ currentState }) {
  const estado = String(currentState || 'pendiente')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(' ', '_');
  const stage = estadoPorEtapa[estado] ?? 0;

  return (
    <ol
      className="order-status"
      aria-label={`Seguimiento del pedido: ${steps[stage].label}`}
    >
      {steps.map((step, index) => {
        const complete = index < stage;
        const active = index === stage;
        return (
          <li
            className={`order-status-step${complete ? ' complete' : ''}${active ? ' active' : ''}`}
            key={step.id}
            aria-current={active ? 'step' : undefined}
          >
            <span className="order-status-node" aria-hidden="true">
              {complete ? '✓' : step.icon}
            </span>
            <span className="order-status-copy">
              <strong>{step.label}</strong>
              <small>{step.description}</small>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default OrderStatus;
