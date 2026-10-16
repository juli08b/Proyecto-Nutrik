import React, { useState } from "react";
import { useProductos } from "../Pages/ProductContext";
import EditProduct from "./EditProduct";

function RegisteredProducts() {
  const { productos, eliminarProducto } = useProductos();
  const [productoAEditar, setProductoAEditar] = useState(null);

  // 1. SI HAY PRODUCTO A EDITAR: Renderiza ÚNICAMENTE la pantalla de edición
  if (productoAEditar) {
    return (
      <EditProduct
        producto={productoAEditar}
        onVolver={() => setProductoAEditar(null)}
      />
    );
  }

  // 2. SI NO HAY PRODUCTO A EDITAR: Renderiza ÚNICAMENTE la tabla
  return (
    <div className="registered-products-container">
      <h2>Mis Productos Registrados</h2>

      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>
                <img src={prod.imagen} alt={prod.nombre} width="40" height="40" />
              </td>
              <td>{prod.nombre}</td>
              <td>{prod.precio}</td>
              <td>{prod.stock}</td>
              <td>
                <button
                  className="btn-editar"
                  onClick={() => setProductoAEditar(prod)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarProducto(prod.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegisteredProducts;