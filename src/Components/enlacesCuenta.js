export function enlacesCuenta(modo) {
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
        { to: '/seguimiento', texto: 'Mis compras', icono: 'compras' },
        { to: '/favoritos', texto: 'Favoritos', icono: 'favoritos' },
        { to: '/perfil', texto: 'Mi perfil', icono: 'perfil' },
      ];
}
