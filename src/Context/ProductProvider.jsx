import { useState } from 'react';
import { ProductContext } from './productContext';

const STORAGE_PRODUCTOS = 'nutrik_productos';

// Productos de ejemplo para la tienda demo (tienda@nutrik.com).
// Sirven como catálogo inicial del vendedor; luego se editan desde el panel.
const DEMO_VENDEDOR_ID = 'tienda@nutrik.com';

const PRODUCTOS_DEMO = [
  {
    id: 'creatine',
    vendedorId: DEMO_VENDEDOR_ID,
    nombre: 'Creatina Monohidratada 100% Pura',
    categoria: 'SUPLEMENTOS',
    precio: 85000,
    stock: 12,
    estado: 'Activo',
    imagen:
      'https://i.pinimg.com/736x/4e/1d/3d/4e1d3d2831b01988bbfbcaf7fbdeabda.jpg',
    descripcion:
      'Potencia tu fuerza muscular, acelera la recuperación y mejora el rendimiento atlético.',
  },
  {
    id: 'yogur',
    vendedorId: DEMO_VENDEDOR_ID,
    nombre: 'Yogur Griego Natural Artesanal',
    categoria: 'LÁCTEOS / PROTEÍNA',
    precio: 12000,
    stock: 8,
    estado: 'Activo',
    imagen:
      'https://i.pinimg.com/1200x/04/40/75/044075ff03f913e906dca4efbafc8821.jpg',
    descripcion: 'Fuente natural de proteína sin azúcar añadida ni conservantes.',
  },
  {
    id: 'detox',
    vendedorId: DEMO_VENDEDOR_ID,
    nombre: 'Té Verde Detox & Antiox Ultra Blend',
    categoria: 'INFUSIONES',
    precio: 18000,
    stock: 20,
    estado: 'Activo',
    imagen:
      'https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg',
    descripcion:
      'Bebida natural antioxidante para desintoxicar tu organismo diariamente.',
  },
  {
    id: 'omega',
    vendedorId: DEMO_VENDEDOR_ID,
    nombre: 'Omega 3 Fish Oil Concentrate',
    categoria: 'SALUD / VITAMINAS',
    precio: 35000,
    stock: 15,
    estado: 'Activo',
    imagen:
      'https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg',
    descripcion: 'Ayuda a la salud cardiovascular y al funcionamiento cerebral.',
  },
  {
    id: 'colageno',
    vendedorId: DEMO_VENDEDOR_ID,
    nombre: 'Colágeno Hidrolizado Avanzado',
    categoria: 'SUPLEMENTOS',
    precio: 79900,
    stock: 10,
    estado: 'Inactivo',
    imagen:
      'https://i.pinimg.com/1200x/bf/0a/6d/bf0a6dc31db1508589493ceec6a6c512.jpg',
    descripcion: 'Ayuda al cuidado de articulaciones, piel, cabello y uñas.',
  },
];

function cargarProductos() {
  try {
    const guardados = JSON.parse(localStorage.getItem(STORAGE_PRODUCTOS));
    if (Array.isArray(guardados)) return guardados;
  } catch {
    /* localStorage vacío o corrupto: usamos los productos demo */
  }
  return PRODUCTOS_DEMO;
}

function ProductProvider({ children }) {
  const [productos, setProductos] = useState(() => cargarProductos());

  const persistir = (lista) => {
    setProductos(lista);
    localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(lista));
  };

  const getProductosPorVendedor = (vendedorId) =>
    productos.filter((producto) => producto.vendedorId === vendedorId);

  const agregarProducto = (nuevoProducto) => {
    const producto = {
      ...nuevoProducto,
      id: nuevoProducto.id || `prod_${Date.now()}`,
      estado: nuevoProducto.estado || 'Activo',
    };
    persistir([...productos, producto]);
  };

  const actualizarProducto = (id, cambios) => {
    persistir(
      productos.map((producto) =>
        String(producto.id) === String(id) ? { ...producto, ...cambios } : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    persistir(productos.filter((producto) => String(producto.id) !== String(id)));
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        getProductosPorVendedor,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
