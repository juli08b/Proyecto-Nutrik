import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { useProductos } from "../../Context/productContext";
import { formatearPrecio } from "../../data/productosData";
import "./seller-product.css";

const FORM_VACIO = {
  nombre: "",
  categoria: "",
  estado: "Activo",
  precio: "",
  stock: "",
  imagen: "",
  descripcion: "",
};

const SellerProduct = () => {
  const { user } = useAuth();
  const {
    categorias,
    error,
    getProductosPorVendedor,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
  } = useProductos();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [editId, setEditId] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [form, setForm] = useState(FORM_VACIO);

  if (!user) return <Navigate to="/elegir-rol" replace />;
  if (user.role !== "vendedor") return <Navigate to="/perfil" replace />;

  const vendedorId = user.id || user.email;
  const misProductos = getProductosPorVendedor(vendedorId);

  const productosFiltrados = misProductos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());
    const coincideCategoria =
      categoriaFiltro === "" || producto.categoria === categoriaFiltro;
    return coincideNombre && coincideCategoria;
  });

  const abrirCrear = () => {
    setEditId(null);
    setForm(FORM_VACIO);
    setModalAbierto(true);
  };

  const abrirEditar = (producto) => {
    setEditId(producto.id);
    setForm({
      nombre: producto.nombre || "",
      categoria: producto.categoria || "",
      estado: producto.estado || "Activo",
      precio: producto.precio ?? "",
      stock: producto.stock ?? "",
      imagen: producto.imagen || "",
      descripcion: producto.descripcion || "",
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEditId(null);
  };

  const cambiarCampo = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      estado: form.estado,
      precio: Number(form.precio) || 0,
      stock: Number(form.stock) || 0,
      imagen: form.imagen.trim(),
      descripcion: form.descripcion.trim(),
    };

    try {
      if (editId) {
        await actualizarProducto(editId, datos);
      } else {
        await agregarProducto({ ...datos, vendedorId });
      }
      cerrarModal();
    } catch (err) {
      window.alert(err.message);
    }
  };

  const confirmarEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await eliminarProducto(id);
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <div className="seller-product">
      <div className="gestion-container">
        {error && (
          <p
            role="alert"
            style={{
              background: "#fde2e2",
              color: "#9b1c1c",
              padding: "10px 14px",
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            {error}
          </p>
        )}
        <div className="gestion-header">
          <div>
            <h1 className="gestion-titulo">Productos</h1>
            <p className="gestion-subtitulo">
              Administra los productos de tu tienda
            </p>
          </div>
          <button className="btn-nuevo-producto" onClick={abrirCrear}>
            + Nuevo producto
          </button>
        </div>

        <div className="controles-tabla">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="input-busqueda"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <select
            className="select-filtro"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option
                key={categoria.Id_categoria}
                value={categoria.Nombre_categoria}
              >
                {categoria.Nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="tabla-contenedor">
          <table className="gestion-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th className="th-acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <tr key={producto.id}>
                    <td className="col-producto">
                      {producto.imagen ? (
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="img-tabla"
                        />
                      ) : (
                        <div className="img-tabla img-tabla-vacia">📦</div>
                      )}
                      <span>{producto.nombre}</span>
                    </td>
                    <td>{producto.categoria}</td>
                    <td>${formatearPrecio(producto.precio)}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <span
                        className={`badge-estado ${
                          producto.estado === "Inactivo" ? "inactivo" : "activo"
                        }`}
                      >
                        {producto.estado || "Activo"}
                      </span>
                    </td>
                    <td className="acciones-td">
                      <button
                        className="btn-icon"
                        title="Editar"
                        onClick={() => abrirEditar(producto)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon btn-eliminar"
                        title="Eliminar"
                        onClick={() => confirmarEliminar(producto.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="sin-resultados">
                    No se encontraron productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? "Editar Producto" : "Nuevo Producto"}</h3>
              <button
                className="btn-cerrar"
                title="Cerrar"
                onClick={cerrarModal}
              >
                ✕
              </button>
            </div>

            <form className="gestion-form" onSubmit={guardarProducto}>
              <input
                name="nombre"
                className="gestion-input"
                placeholder="Nombre del producto"
                value={form.nombre}
                onChange={cambiarCampo}
                required
              />

              <div className="form-row">
                <select
                  name="categoria"
                  className="gestion-input"
                  value={form.categoria}
                  onChange={cambiarCampo}
                  required
                >
                  <option value="">Seleccionar Categoría</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.Id_categoria}
                      value={categoria.Nombre_categoria}
                    >
                      {categoria.Nombre_categoria}
                    </option>
                  ))}
                </select>

                <select
                  name="estado"
                  className="gestion-input"
                  value={form.estado}
                  onChange={cambiarCampo}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div className="form-row">
                <input
                  name="precio"
                  type="number"
                  min="0"
                  className="gestion-input"
                  placeholder="Precio ($)"
                  value={form.precio}
                  onChange={cambiarCampo}
                  required
                />

                <input
                  name="stock"
                  type="number"
                  min="0"
                  className="gestion-input"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={cambiarCampo}
                  required
                />
              </div>

              <input
                name="imagen"
                className="gestion-input"
                placeholder="URL de la Imagen"
                value={form.imagen}
                onChange={cambiarCampo}
              />

              <textarea
                name="descripcion"
                className="gestion-input gestion-textarea"
                placeholder="Descripción"
                rows="3"
                value={form.descripcion}
                onChange={cambiarCampo}
              />

              <div className="modal-acciones">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  {editId ? "Guardar Cambios" : "Crear Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProduct;
