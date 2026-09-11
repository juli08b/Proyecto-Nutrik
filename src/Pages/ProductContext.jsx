import React, { createContext, useState, useContext } from 'react';
import { listaProductos as datosIniciales } from '../Pages/Product';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState(datosIniciales);

  // Filtrar solo los productos del vendedor actual
  const getProductosPorVendedor = (vendedorId) => {
    return productos.filter(p => p.vendedorId === vendedorId);
  };

  // Crear producto
  const agregarProducto = (nuevoProducto) => {
    const productoConId = {
      ...nuevoProducto,
      id: Date.now().toString(),
      rating: 5.0,
      reviews: 0
    };
    setProductos(prev => [...prev, productoConId]);
  };

  // Editar producto
  const actualizarProducto = (id, datosActualizados) => {
    setProductos(prev =>
      prev.map(p => (p.id === id ? { ...p, ...datosActualizados } : p))
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