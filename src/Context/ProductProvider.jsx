import { useEffect, useState } from 'react';
import { ProductContext } from './productContext';
import {
  listarProductos,
  crearProducto,
  actualizarProducto as actualizarProductoApi,
  eliminarProducto as eliminarProductoApi,
  listarCategorias,
  crearCategoria,
} from '../api/productos';

// Convierte un producto de Laravel (tabla productos) al formato que usa React.
function desdeApi(p) {
  return {
    id: p.Id_producto,
    nombre: p.Nombre_producto,
    precio: Number(p.Precio),
    categoria: p.categoria?.Nombre_categoria ?? '',
    estado: p.Estado ?? 'Activo',
    stock: p.Stock ?? 0,
    imagen: p.Imagen ?? '',
    descripcion: p.Descripcion ?? '',
    vendedorId: p.Vendedor ?? '',
  };
}

// Convierte lo que llena el formulario de React al formato de Laravel.
async function aApi(datos, vendedorId, categorias) {
  const texto = (datos.categoria || '').trim();
  let Id_categoria = null;

  if (texto) {
    const existente = categorias.find(
      (c) => c.Nombre_categoria.toLowerCase() === texto.toLowerCase()
    );

    if (existente) {
      Id_categoria = existente.Id_categoria;
    } else {
      // Si la categoría no existe todavía, la creamos en Laravel.
      const nueva = await crearCategoria({
        Nombre_categoria: texto.slice(0, 50),
        Tipo_producto: 'General',
      });
      Id_categoria = nueva.data.Id_categoria;
    }
  }

  return {
    Nombre_producto: datos.nombre,
    Precio: datos.precio,
    Id_categoria,
    Descripcion: datos.descripcion || null,
    Stock: datos.stock ?? 0,
    Imagen: datos.imagen || null,
    Estado: datos.estado || 'Activo',
    Vendedor: vendedorId,
  };
}

function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = async () => {
    const [prods, cats] = await Promise.all([
      listarProductos(),
      listarCategorias(),
    ]);
    setProductos(prods.map(desdeApi));
    setCategorias(cats);
  };

  // Al abrir la app, traemos los datos desde Laravel/MySQL.
  useEffect(() => {
    let activo = true;
    (async () => {
      try {
        const [prods, cats] = await Promise.all([
          listarProductos(),
          listarCategorias(),
        ]);
        if (!activo) return;
        setProductos(prods.map(desdeApi));
        setCategorias(cats);
      } catch (e) {
        if (activo) setError(e.message);
      } finally {
        if (activo) setCargando(false);
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  const getProductosPorVendedor = (vendedorId) =>
    productos.filter((producto) => producto.vendedorId === vendedorId);

  const agregarProducto = async (nuevoProducto) => {
    try {
      await crearProducto(
        await aApi(nuevoProducto, nuevoProducto.vendedorId, categorias)
      );
      await recargar();
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const actualizarProducto = async (id, cambios) => {
    try {
      const actual = productos.find((p) => String(p.id) === String(id));
      const vendedorId = cambios.vendedorId ?? actual?.vendedorId;
      await actualizarProductoApi(id, await aApi(cambios, vendedorId, categorias));
      await recargar();
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await eliminarProductoApi(id);
      await recargar();
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        categorias,
        cargando,
        error,
        getProductosPorVendedor,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
        recargar,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
