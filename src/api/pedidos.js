import { fetchApi } from './client';

export const listarPedidos = () => fetchApi('/pedidos');

export const listarDetalles = () => fetchApi('/detalle-compras');

export const crearPedido = (pedido) =>
  fetchApi('/pedidos', { method: 'POST', body: pedido });

export const crearDetalle = (detalle) =>
  fetchApi('/detalle-compras', { method: 'POST', body: detalle });

export const eliminarPedido = (id) =>
  fetchApi(`/pedidos/${id}`, { method: 'DELETE' });

// Id numérico de la tabla productos. No se infiere por nombre.
export function idProductoDeItem(item) {
  const bruto = item?.Id_producto ?? item?.idProducto ?? item?.id;
  const id = Number(bruto);
  if (!Number.isInteger(id) || id <= 0) {
    const nombre = item?.nombre || item?.Nombre_producto || 'Un producto';
    throw new Error(
      `"${nombre}" no tiene un id de producto de la base de datos.`
    );
  }
  return id;
}

function lineaDeDetalle(item) {
  const precio = Number(item.precio ?? item.Precio_unitario);
  const cantidad = Number(item.cantidad ?? item.Cantidad);

  if (!Number.isFinite(precio) || precio < 0) {
    throw new Error('Hay un producto con precio inválido.');
  }
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    throw new Error('Hay un producto con cantidad inválida.');
  }

  return {
    Id_producto: idProductoDeItem(item),
    Precio_unitario: precio,
    Cantidad: cantidad,
    Subtotal: precio * cantidad,
  };
}

export async function crearPedidoConDetalles({ pedido, items }) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('El pedido no tiene productos.');
  }

  // Se resuelven todas las líneas antes de crear el pedido.
  // Si falta un id, no se inserta nada en pedidos ni en detalle_compras.
  const lineas = items.map(lineaDeDetalle);

  const guardado = await crearPedido(pedido);
  const idPedido = guardado?.data?.Id_pedido ?? guardado?.Id_pedido;
  if (!idPedido) {
    throw new Error('El servidor no devolvió el id del pedido.');
  }

  for (const linea of lineas) {
    await crearDetalle({
      Id_pedido: idPedido,
      Id_producto: linea.Id_producto,
      Precio_unitario: linea.Precio_unitario,
      Subtotal: linea.Subtotal,
      Cantidad: linea.Cantidad,
    });
  }

  return { idPedido, data: guardado.data ?? guardado };
}
