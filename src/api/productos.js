import { apiAxios, fetchApi } from './client';

// ---------------------------------------------------------------------------
// Productos y categorías usando fetch
// ---------------------------------------------------------------------------
export const listarProductos = () => fetchApi('/productos');

export const crearProducto = (producto) =>
  fetchApi('/productos', { method: 'POST', body: producto });

export const actualizarProducto = (id, producto) =>
  fetchApi(`/productos/${id}`, { method: 'PUT', body: producto });

export const eliminarProducto = (id) =>
  fetchApi(`/productos/${id}`, { method: 'DELETE' });

export const listarCategorias = () => fetchApi('/categorias');

export const crearCategoria = (categoria) =>
  fetchApi('/categorias', { method: 'POST', body: categoria });

// ---------------------------------------------------------------------------
// Lo mismo pero con axios (por si prefieres esta forma)
// ---------------------------------------------------------------------------
export const productosAxios = {
  listar: async () => (await apiAxios.get('/productos')).data,
  crear: async (producto) => (await apiAxios.post('/productos', producto)).data,
  actualizar: async (id, producto) =>
    (await apiAxios.put(`/productos/${id}`, producto)).data,
  eliminar: async (id) => (await apiAxios.delete(`/productos/${id}`)).data,
  listarCategorias: async () => (await apiAxios.get('/categorias')).data,
  crearCategoria: async (categoria) =>
    (await apiAxios.post('/categorias', categoria)).data,
};
