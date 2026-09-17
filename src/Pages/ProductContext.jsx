import React, { createContext, useState, useContext } from 'react';
import { listaProductos as datosIniciales } from '../Pages/Product';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState(datosIniciales);

  // Obtener productos de un vendedor específico
  const getProductosPorVendedor = (vendedorId) => {
    return productos.filter(p => p.vendedorId === vendedorId);
  };

  // Agregar nuevo producto con estado 'Activo' por defecto
  const agregarProducto = (nuevoProducto) => {
    const productoConId = {
      ...nuevoProducto,
      id: Date.now().toString(),
      estado: nuevoProducto.estado || 'Activo',
      rating: 5.0,
      reviews: 0
    };
    setProductos(prev => [...prev, productoConId]);
  };

  // Editar producto existente
  const actualizarProducto = (id, datosActualizados) => {
    setProductos(prev =>
      prev.map(p => (String(p.id) === String(id) ? { ...p, ...datosActualizados } : p))
    );
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        getProductosPorVendedor,
        agregarProducto,
        actualizarProducto,
        eliminarProducto
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductos = () => useContext(ProductContext);