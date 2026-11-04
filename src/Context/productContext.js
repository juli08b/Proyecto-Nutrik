import { createContext, useContext } from 'react';

const ProductContext = createContext(null);

function useProductos() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProductos debe usarse dentro de <ProductProvider>');
  return ctx;
}

export { ProductContext, useProductos };
