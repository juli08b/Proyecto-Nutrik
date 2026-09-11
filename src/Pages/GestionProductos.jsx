// src/Pages/GestionProductos.jsx
import React, { useState } from 'react';
import { useProductos } from '../Pages/ProductContext';

// 🔴 IMPORTACIÓN DEL CSS
import './Product.css'; 

export const GestionProductos = () => {
  const idVendedorActual = "vendor_123";
  const { getProductosPorVendedor, agregarProducto, actualizarProducto, eliminarProducto } = useProductos();
  const misProductos = getProductosPorVendedor(idVendedorActual);

  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    imagen: '',
    descripcion: ''
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      actualizarProducto(editId, form);
      setEditId(null);
    } else {
      agregarProducto({ ...form, vendedorId: idVendedorActual });
    }
    setForm({ nombre: '', categoria: '', precio: '', stock: '', imagen: '', descripcion: '' });
  };

  const handleCargarEdicion = (prod) => {
    setEditId(prod.id);
    setForm({
      nombre: prod.nombre,
      categoria: prod.categoria,
      precio: prod.precio,
      stock: prod.stock,
      imagen: prod.imagen,
      descripcion: prod.descripcion
    });
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">
        {editId ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h2>

      <form onSubmit={handleSubmit} className="gestion-form">
        <input 
          name="nombre" 
          placeholder="Nombre del producto" 
          value={form.nombre} 
          onChange={handleChange} 
          required 
          className="gestion-input"
        />
        
        <select 
          name="categoria" 
          value={form.categoria} 
          onChange={handleChange} 
          required 
          className="gestion-input"
        >
          <option value="">Seleccionar Categoría</option>
          <option value="SUPLEMENTOS">SUPLEMENTOS</option>
          <option value="LACTEOS / PROTEÍNA">LACTEOS / PROTEÍNA</option>
          <option value="SNACKS">SNACKS</option>
        </select>

        <input 
          name="precio" 
          placeholder="Precio ($)" 
          value={form.precio} 
          onChange={handleChange} 
          required 
          className="gestion-input"
        />
        
        <input 
          type="number" 
          name="stock" 
          placeholder="Stock" 
          value={form.stock} 
          onChange={handleChange} 
          required 
          className="gestion-input"
        />
        
        <input 
          name="imagen" 
          placeholder="URL de la Imagen" 
          value={form.imagen} 
          onChange={handleChange} 
          required 
          className="gestion-input"
        />
        
        <textarea 
          name="descripcion" 
          placeholder="Descripción" 
          value={form.descripcion} 
          onChange={handleChange} 
          rows="3" 
          required 
          className="gestion-input gestion-textarea"
        />

        <button type="submit" className="btn-guardar">
          {editId ? 'Guardar Cambios' : 'Agregar Producto'}
        </button>
      </form>

      <h2 className="gestion-titulo">Mis Productos Registrados</h2>

      <div className="tabla-contenedor">
        <table className="gestion-tabla">
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
            {misProductos.map(prod => (
              <tr key={prod.id}>
                <td>
                  <img src={prod.imagen} alt={prod.nombre} className="img-tabla" />
                </td>
                <td>{prod.nombre}</td>
                <td>{prod.precio}</td>
                <td>{prod.stock}</td>
                <td className="acciones-td">
                  <button 
                    onClick={() => handleCargarEdicion(prod)} 
                    className="btn-editar"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => eliminarProducto(prod.id)} 
                    className="btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};