import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  listarCategorias,
} from '../../api/productos';
import { ROLES } from '../../constants/roles';
import './AdminManagement.css';

const FORMULARIO_VACIO = {
  Nombre_categoria: '',
  Tipo_producto: '',
  Descripccion: '',
};

function listaDesde(respuesta) {
  if (Array.isArray(respuesta)) return respuesta;
  return Array.isArray(respuesta?.data) ? respuesta.data : [];
}

export default function AdminCategorias() {
  const { user } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role !== ROLES.ADMIN) return undefined;
    let vigente = true;

    listarCategorias()
      .then((respuesta) => {
        if (vigente) setCategorias(listaDesde(respuesta));
      })
      .catch((e) => {
        if (vigente) setError(e.message);
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [user?.role]);

  if (!user) return <Navigate to="/nutrik/owner" replace />;
  if (user.role !== ROLES.ADMIN) return <Navigate to="/" replace />;

  const limpiarFormulario = () => {
    setFormulario(FORMULARIO_VACIO);
    setCategoriaEditada(null);
  };

  const guardar = async (evento) => {
    evento.preventDefault();
    setGuardando(true);
    setError('');

    try {
      const datos = {
        Nombre_categoria: formulario.Nombre_categoria.trim(),
        Tipo_producto: formulario.Tipo_producto.trim(),
        Descripccion: formulario.Descripccion.trim() || null,
      };
      if (categoriaEditada) {
        await actualizarCategoria(categoriaEditada, datos);
      } else {
        await crearCategoria(datos);
      }
      const respuesta = await listarCategorias();
      setCategorias(listaDesde(respuesta));
      limpiarFormulario();
    } catch (e) {
      setError(e.message);
    } finally {
      setGuardando(false);
    }
  };

  const editar = (categoria) => {
    setCategoriaEditada(categoria.Id_categoria);
    setFormulario({
      Nombre_categoria: categoria.Nombre_categoria || '',
      Tipo_producto: categoria.Tipo_producto || '',
      Descripccion: categoria.Descripccion || '',
    });
    setError('');
  };

  const eliminar = async (categoria) => {
    if (!window.confirm(`¿Eliminar la categoría "${categoria.Nombre_categoria}"?`)) return;
    setError('');
    try {
      await eliminarCategoria(categoria.Id_categoria);
      setCategorias((actuales) =>
        actuales.filter((item) => item.Id_categoria !== categoria.Id_categoria)
      );
      if (categoriaEditada === categoria.Id_categoria) limpiarFormulario();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="admin-management">
      <header className="actividad-header">
        <div>
          <p className="actividad-eyebrow">Catálogo</p>
          <h1>Administrar categorías</h1>
          <p>Los cambios se guardan en las categorías existentes de Laravel.</p>
        </div>
      </header>

      {error && <p role="alert" className="admin-error">{error}</p>}

      <div className="admin-management-grid">
        <form className="actividad-panel admin-form" onSubmit={guardar}>
          <h2>{categoriaEditada ? 'Editar categoría' : 'Nueva categoría'}</h2>
          <label>
            Nombre
            <input
              required
              maxLength={50}
              value={formulario.Nombre_categoria}
              onChange={(e) => setFormulario({ ...formulario, Nombre_categoria: e.target.value })}
            />
          </label>
          <label>
            Tipo de producto
            <input
              required
              maxLength={50}
              value={formulario.Tipo_producto}
              onChange={(e) => setFormulario({ ...formulario, Tipo_producto: e.target.value })}
            />
          </label>
          <label>
            Descripción
            <textarea
              maxLength={400}
              rows={4}
              value={formulario.Descripccion}
              onChange={(e) => setFormulario({ ...formulario, Descripccion: e.target.value })}
            />
          </label>
          <div className="admin-form-acciones">
            <button type="submit" className="actividad-btn" disabled={guardando}>
              {guardando ? 'Guardando…' : categoriaEditada ? 'Guardar cambios' : 'Crear categoría'}
            </button>
            {categoriaEditada && (
              <button type="button" className="actividad-btn" onClick={limpiarFormulario}>
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        <section className="actividad-panel admin-listado">
          <div className="table-header">
            <h2>Categorías ({categorias.length})</h2>
          </div>
          {cargando ? (
            <p role="status">Cargando categorías…</p>
          ) : categorias.length ? (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr><th>Nombre</th><th>Tipo</th><th>Descripción</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <tr key={categoria.Id_categoria}>
                      <td>{categoria.Nombre_categoria}</td>
                      <td>{categoria.Tipo_producto}</td>
                      <td>{categoria.Descripccion || '—'}</td>
                      <td className="admin-tabla-acciones">
                        <button type="button" className="actividad-btn" onClick={() => editar(categoria)}>
                          Editar
                        </button>
                        <button type="button" className="actividad-btn peligro" onClick={() => eliminar(categoria)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : error ? (
            <p>No se pudieron cargar las categorías.</p>
          ) : (
            <p>No hay categorías registradas.</p>
          )}
        </section>
      </div>
    </section>
  );
}
