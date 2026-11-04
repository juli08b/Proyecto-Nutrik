import { fetchApi } from './client';

export const listarCarrito = () => fetchApi('/carrito');

export const agregarItemCarrito = (item) =>
  fetchApi('/carrito', {
    method: 'POST',
    body: {
      Id_producto: item.Id_producto ?? null,
      Nombre_producto: item.Nombre_producto ?? null,
      Precio_unitario: item.Precio_unitario ?? null,
      Imagen: item.Imagen ?? null,
      Cantidad: item.Cantidad,
      Total: item.Total,
      Id_usuario: item.Id_usuario,
    },
  });

export const eliminarItemCarrito = (id) =>
  fetchApi(`/carrito/${id}`, { method: 'DELETE' });

export async function vaciarCarrito(usuarioId) {
  const items = await listarCarrito();
  const propios = (Array.isArray(items) ? items : []).filter(
    (item) => Number(item.Id_usuario) === Number(usuarioId)
  );
  await Promise.all(propios.map((item) => eliminarItemCarrito(item.Id_carrite)));
}
