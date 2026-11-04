import { fetchApi } from './client';
import { crearCategoria, crearProducto, listarCategorias, listarProductos } from './productos';

export const listarPedidos = () => fetchApi('/pedidos');

export const listarDetalles = () => fetchApi('/detalle-compras');

export const crearPedido = (pedido) =>
  fetchApi('/pedidos', { method: 'POST', body: pedido });

export const crearDetalle = (detalle) =>
  fetchApi('/detalle-compras', { method: 'POST', body: detalle });

export const eliminarPedido = (id) =>
  fetchApi(`/pedidos/${id}`, { method: 'DELETE' });

// Busca (o crea) el producto de la BD que corresponde a un ítem del carrito.
// La vitrina usa un catálogo propio con ids de texto, por eso se empareja por nombre.
async function asegurarProducto(item, productos, categorias) {
  const nombre = (item.nombre || item.Nombre_producto || 'Producto').trim();
  const existente = productos.find(
    (p) => p.Nombre_producto?.toLowerCase() === nombre.toLowerCase()
  );
  if (existente) return existente.Id_producto;

  let idCategoria = categorias[0]?.Id_categoria;
  if (!idCategoria) {
    const nueva = await crearCategoria({
      Nombre_categoria: 'General',
      Tipo_producto: 'General',
      Descripccion: 'Categoría creada automáticamente desde la tienda.',
    });
    idCategoria = nueva.data.Id_categoria;
    categorias.push(nueva.data);
  }

  const creado = await crearProducto({
    Nombre_producto: nombre,
    Precio: Number(item.precio ?? item.Precio_unitario ?? 0),
    Id_categoria: idCategoria,
    Descripcion: item.descripcion || null,
    Stock: 0,
    Imagen: item.imagen || null,
    Estado: 'Activo',
    Vendedor: 'tienda@nutrik.com',
  });

  const producto = creado.data;
  productos.push(producto);
  return producto.Id_producto;
}

export async function crearPedidoConDetalles({ pedido, items }) {
  const guardado = await crearPedido(pedido);
  const idPedido = guardado.data.Id_pedido;

  const [productos, categorias] = await Promise.all([
    listarProductos(),
    listarCategorias(),
  ]);
  const listaProductos = Array.isArray(productos) ? productos : [];
  const listaCategorias = Array.isArray(categorias) ? categorias : [];

  for (const item of items) {
    const idProducto = await asegurarProducto(item, listaProductos, listaCategorias);
    await crearDetalle({
      Id_pedido: idPedido,
      Id_producto: idProducto,
      Precio_unitario: Number(item.precio),
      Subtotal: Number(item.precio) * Number(item.cantidad),
      Cantidad: Number(item.cantidad),
    });
  }

  return { idPedido, data: guardado.data };
}
