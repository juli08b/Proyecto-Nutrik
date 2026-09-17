import React, { useState } from 'react';
import { useProductos } from '../Pages/ProductContext';
import './Product.css'; 

export const GestionProductos = () => {
  const idVendedorActual = "vendor_123";
  const { getProductosPorVendedor, agregarProducto, actualizarProducto, eliminarProducto } = useProductos();
  const misProductos = getProductosPorVendedor(idVendedorActual);

  // Estados para Modal, Búsqueda y Filtros
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    estado: 'Activo',
    imagen: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenCrear = () => {
    setEditId(null);
    setForm({ nombre: '', categoria: '', precio: '', stock: '', estado: 'Activo', imagen: '', descripcion: '' });
    setMostrarModal(true);
  };

  const handleCargarEdicion = (prod) => {
    setEditId(prod.id);
    setForm({
      nombre: prod.nombre,
      categoria: prod.categoria,
      precio: prod.precio,
      stock: prod.stock,
      estado: prod.estado || 'Activo',
      imagen: prod.imagen,
      descripcion: prod.descripcion
    });
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      actualizarProducto(editId, form);
    } else {
      agregarProducto({ ...form, vendedorId: idVendedorActual });
    }
    handleCerrarModal();
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      eliminarProducto(id);
    }
  };

  // Filtrado dinámico por búsqueda y categoría
  const productosFiltrados = misProductos.filter(prod => {
    const coincideNombre = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro === '' || prod.categoria === categoriaFiltro;
    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="gestion-container">
      {/* 1. HEADER DE LA SECCIÓN */}
      <div className="gestion-header">
        <div>
          <h2 className="gestion-titulo">Productos</h2>
          <p className="gestion-subtitulo">Administra los productos de tu tienda</p>
        </div>
        <button className="btn-nuevo-producto" onClick={handleOpenCrear}>
          + Nuevo producto
        </button>
      </div>

      {/* 2. BARRA DE FILTROS Y BÚSQUEDA */}
      <div className="controles-tabla">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar producto..." 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)} 
            className="input-busqueda"
          />
        </div>

        <select 
          value={categoriaFiltro} 
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="select-filtro"
        >
          <option value="">Todas las categorías</option>
          <option value="SUPLEMENTOS">SUPLEMENTOS</option>
          <option value="LACTEOS / PROTEÍNA">LACTEOS / PROTEÍNA</option>
          <option value="SNACKS">SNACKS</option>
        </select>
      </div>

      {/* 3. TABLA DE PRODUCTOS */}
      <div className="tabla-contenedor">
        <table className="gestion-tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(prod => (
                <tr key={prod.id}>
                  <td className="col-producto">
                    <img src={prod.imagen} alt={prod.nombre} className="img-tabla" />
                    <span>{prod.nombre}</span>
                  </td>
                  <td>{prod.categoria}</td>
                  <td>${prod.precio}</td>
                  <td>{prod.stock}</td>
                  <td>
                    <span className={`badge-estado ${prod.estado === 'Inactivo' ? 'inactivo' : 'activo'}`}>
                      {prod.estado || 'Activo'}
                    </span>
                  </td>
                  <td className="acciones-td">
                    <button onClick={() => handleCargarEdicion(prod)} className="btn-icon" title="Editar">
                      ✏️
                    </button>
                    <button onClick={() => handleEliminar(prod.id)} className="btn-icon btn-eliminar" title="Eliminar">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="sin-resultados">No se encontraron productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. MODAL FLOTANTE (CREAR / EDITAR) */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <div className="modal-header">
              <h3>{editId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
              <button className="btn-cerrar" onClick={handleCerrarModal}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <input 
                name="nombre" 
                placeholder="Nombre del producto" 
                value={form.nombre} 
                onChange={handleChange} 
                required 
                className="gestion-input"
              />

              <div className="form-row">
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

                <select 
                  name="estado" 
                  value={form.estado} 
                  onChange={handleChange} 
                  className="gestion-input"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div className="form-row">
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
              </div>

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
                className="gestion-input gestion-textarea"
              />

              <div className="modal-acciones">
                <button type="button" onClick={handleCerrarModal} className="btn-cancelar">
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  {editId ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};