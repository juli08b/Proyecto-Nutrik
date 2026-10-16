import React, { useState, useEffect } from "react";
import { useProductos } from "../Pages/ProductContext";
import './product.css'

const EditProduct = ({ producto, onVolver }) => {
  const { actualizarProducto } = useProductos();

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: 0,
    categoria: "",
    descripcion: "",
    imagen: "",
  });

  useEffect(() => {
    if (producto) setFormData(producto);
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarProducto(producto.id, formData);
    onVolver(); // Cierra el formulario y vuelve a la vista de la tabla
  };

  return (
    <div className="subpagina-editar-contenedor">
      <button type="button" className="btn-volver" onClick={onVolver}>
        ← Volver a la lista
      </button>

      <form onSubmit={handleSubmit} className="form-editar">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={formData.nombre || ""}
          onChange={handleChange}
          required
        />

        <select
          name="categoria"
          value={formData.categoria || ""}
          onChange={handleChange}
        >
          <option value="">Seleccionar Categoría</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Suplementos">Suplementos</option>
          <option value="Alimentos">Alimentos</option>
        </select>

        <input
          type="text"
          name="precio"
          placeholder="Precio (ej. $18.000)"
          value={formData.precio || ""}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock || 0}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={formData.imagen || ""}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Descripción breve..."
          value={formData.descripcion || ""}
          onChange={handleChange}
          rows="3"
        />

        <button type="submit" className="btn-guardar-principal">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProduct;