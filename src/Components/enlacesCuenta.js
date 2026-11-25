import { ROLES } from '../constants/roles';

// El administrador tiene una sección independiente; el usuario reúne compra y venta.
export function seccionesCuenta(user) {
  return user?.role === ROLES.ADMIN
    ? [{ modo: 'administracion', titulo: 'Administración' }, { modo: 'comprador', titulo: 'Mi cuenta' }]
    : [{ modo: 'comprador', titulo: 'Mis compras' }, { modo: 'vendedor', titulo: 'Mis ventas' }];
}

export function enlacesCuenta(modo) {
  if (modo === 'administracion') {
    return [
      { to: '/admin', texto: 'Panel de administración', icono: 'administracion' },
      { to: '/admin/usuarios', texto: 'Administrar usuarios', icono: 'compradores' },
      { to: '/admin/productos', texto: 'Supervisar productos', icono: 'productos' },
      { to: '/admin/pedidos', texto: 'Supervisar pedidos', icono: 'ventas' },
      { to: '/admin/actividad', texto: 'Actividad', icono: 'estadisticas' },
    ];
  }

  return modo === 'vendedor'
    ? [
        { to: '/vendedor/productos', texto: 'Mis productos', icono: 'productos' },
        { to: '/vendedor/pedidos', texto: 'Mis ventas', icono: 'ventas' },
        { to: '/vendedor/dashboard', texto: 'Estadísticas', icono: 'estadisticas' },
        { to: '/vendedor/facturas', texto: 'Facturas', icono: 'facturas' },
        { to: '/vendedor/clientes', texto: 'Compradores', icono: 'compradores' },
        { to: '/vendedor/configuracion', texto: 'Configuración de tienda', icono: 'configuracion' },
      ]
    : [
        { to: '/mis-pedidos', texto: 'Seguimiento de pedidos', icono: 'compras' },
        { to: '/favoritos', texto: 'Favoritos', icono: 'favoritos' },
        { to: '/perfil', texto: 'Mi perfil', icono: 'perfil' },
      ];
}
