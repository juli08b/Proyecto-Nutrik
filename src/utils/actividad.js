import { ROLES } from '../constants/roles';

const STORAGE_KEY = 'nutrik_activity_log';
const MAX_EVENTOS = 600;

export const EVENTOS_ACTIVIDAD = Object.freeze({
  login: { etiqueta: 'Inicio de sesión', icono: '↳' },
  registro: { etiqueta: 'Registro', icono: '＋' },
  logout: { etiqueta: 'Cierre de sesión', icono: '↪' },
  vista_producto: { etiqueta: 'Vio un producto', icono: '◉' },
  carrito: { etiqueta: 'Agregó al carrito', icono: '🛒' },
  pedido: { etiqueta: 'Confirmó un pedido', icono: '✓' },
});

function llaveSegura(valor) {
  return !/pass|clave|contrasena|password|token/i.test(String(valor));
}

function limpiarDetalles(detalles) {
  if (!detalles || typeof detalles !== 'object') return {};

  return Object.entries(detalles)
    .filter(([clave, valor]) => llaveSegura(clave) && valor !== undefined && valor !== null && valor !== '')
    .slice(0, 10)
    .reduce((acc, [clave, valor]) => {
      acc[clave] = typeof valor === 'object' ? JSON.stringify(valor) : String(valor);
      return acc;
    }, {});
}

function datosUsuario(usuario) {
  const nombre =
    usuario?.nombreCompleto ||
    [usuario?.primerNombre, usuario?.primerApellido].filter(Boolean).join(' ') ||
    usuario?.email ||
    'Invitado';

  return {
    id: usuario?.id || '',
    nombre,
    email: usuario?.email || 'invitado',
    role: usuario?.role || '',
  };
}

export function obtenerActividades() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

export function registrarActividad({
  tipo = 'evento',
  accion,
  descripcion = '',
  usuario,
  detalles = {},
  ruta,
} = {}) {
  // La actividad del propietario no se registra para no ensuciar el historial.
  if (usuario?.role === ROLES.ADMIN || (!accion && !descripcion)) return null;

  const evento = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    tipo,
    accion: accion || EVENTOS_ACTIVIDAD[tipo]?.etiqueta || 'Actividad',
    descripcion,
    usuario: datosUsuario(usuario),
    detalles: limpiarDetalles(detalles),
    ruta: ruta || (typeof window !== 'undefined' ? window.location.pathname : ''),
    fecha: new Date().toISOString(),
  };

  try {
    const actuales = obtenerActividades();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...actuales, evento].slice(-MAX_EVENTOS))
    );
    window.dispatchEvent(new CustomEvent('nutrik:activity-updated', { detail: evento }));
  } catch {
    // Si localStorage está lleno o bloqueado, la app sigue funcionando.
  }

  return evento;
}

export function limpiarActividades() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('nutrik:activity-updated'));
  } catch {
    // Nada que limpiar.
  }
}

export function resumenActividades(eventos = []) {
  const total = eventos.length;
  const ingresos = eventos.filter((evento) => evento.tipo === 'login').length;
  const usuarios = new Set(
    eventos.map((evento) => evento.usuario?.email).filter(Boolean)
  ).size;
  const productos = eventos.filter((evento) => evento.tipo === 'vista_producto').length;
  const pedidos = eventos.filter((evento) => evento.tipo === 'pedido').length;
  const ultima = total ? eventos[total - 1]?.fecha : null;

  return { total, ingresos, usuarios, productos, pedidos, ultima };
}
