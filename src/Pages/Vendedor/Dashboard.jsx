import { Link, Navigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../../assets/logoNutrick.png';
import { useAuth } from '../../Context/authContext';

const DashboardVendedor = () => {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/elegir-rol" replace />;
  if (user.role !== 'vendedor') return <Navigate to="/perfil" replace />;

  return (
    <div className="dashboard-pagina">
      <div className="dashboard-tarjeta">
        <img src={logo} alt="Logo Nutrik" className="dashboard-logo" />
        <h1>Panel del Vendedor</h1>
        <p className="dashboard-saludo">
          Bienvenido, <strong>{user.nombreNegocio}</strong> 🏪
        </p>

        {user.foto ? (
          <img src={user.foto} alt="Logo del negocio" className="dashboard-negocio-logo" />
        ) : null}

        <ul className="dashboard-datos">
          <li><span>Correo del negocio:</span> {user.email}</li>
          <li><span>Teléfono:</span> {user.telefono || '—'}</li>
          <li><span>Ciudad:</span> {user.ciudad || '—'}</li>
          <li><span>Dirección:</span> {user.direccion || '—'}</li>
          <li><span>NIT:</span> {user.nit || '—'}</li>
          <li><span>Tipo de productos:</span> {user.tipoProductos || '—'}</li>
          {user.descripcion ? (
            <li><span>Descripción:</span> {user.descripcion}</li>
          ) : null}
        </ul>

        <div className="dashboard-aviso">
          Este panel está en construcción. Tu equipo de desarrollo está creando
          las herramientas de venta (productos, pedidos, inventario) aquí mismo.
        </div>

        <div className="dashboard-acciones">
          <Link to="/" className="dashboard-boton ir-tienda">Ver la tienda</Link>
          <button className="dashboard-boton salir" onClick={logout}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardVendedor;