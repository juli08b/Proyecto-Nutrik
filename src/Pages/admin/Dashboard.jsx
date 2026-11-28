import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { useAuth } from '../../Context/authContext';
import { ROLES } from '../../constants/roles';
import { listarPedidos } from '../../api/pedidos';
import { listarProductos } from '../../api/productos';
import { listarUsuarios } from '../../api/usuarios';
import './Dashboard.css';
import './AdminManagement.css';

// Gráficos, indicadores y tablas usan datos de demostración, no métricas de la API.
const dataVentasDia = [
    { fecha: '19/08', venta: 720 },
    { fecha: '20/08', venta: 580 },
    { fecha: '21/08', venta: 640 },
    { fecha: '22/08', venta: 520 },
    { fecha: '23/08', venta: 710 },
    { fecha: '24/08', venta: 610 },
    { fecha: '25/08', venta: 380 },
    { fecha: '26/08', venta: 730 },
    { fecha: '27/08', venta: 700 },
    { fecha: '28/08', venta: 880 },
];

const dataCategorias = [
    { name: 'Proteínas', value: 40, color: '#2e7d32' },
    { name: 'Snacks', value: 25, color: '#3a72a2' },
    { name: 'Vitaminas', value: 20, color: '#f5b025' },
    { name: 'Bebidas', value: 15, color: '#82c384' },
];

const ventasRecientes = [
    { id: '#1052', cliente: 'Ana Martínez', fecha: '25/08/2026', total: '$ 180.000', estado: 'Completado' },
    { id: '#1051', cliente: 'Carlos López', fecha: '25/08/2026', total: '$ 320.000', estado: 'Enviado' },
    { id: '#1050', cliente: 'Lucía Gómez', fecha: '24/08/2026', total: '$ 95.000', estado: 'Pendiente' },
    { id: '#1049', cliente: 'Diego Ruiz', fecha: '24/08/2026', total: '$ 210.000', estado: 'Completado' },
];

const productosTop = [
    { nombre: 'Proteína Whey Isolate 1kg', categoria: 'Proteínas', unidades: '142 unids', total: '$ 4.260.000' },
    { nombre: 'Mantequilla de Maní Natural', categoria: 'Snacks', unidades: '98 unids', total: '$ 1.470.000' },
    { nombre: 'Multivitamínico Fit', categoria: 'Vitaminas', unidades: '76 unids', total: '$ 1.140.000' },
    { nombre: 'Agua de Coco Orgánica', categoria: 'Bebidas', unidades: '65 unids', total: '$ 520.000' },
];

const ACCESOS_ADMIN = [
    { to: '/admin/usuarios', titulo: 'Usuarios', detalle: 'Revisa cuentas y estados.' },
    { to: '/admin/productos', titulo: 'Productos', detalle: 'Supervisa publicaciones del marketplace.' },
    { to: '/admin/categorias', titulo: 'Categorías', detalle: 'Organiza el catálogo de Nutrik.' },
    { to: '/admin/pedidos', titulo: 'Pedidos', detalle: 'Consulta pedidos y sus detalles.' },
];

const moneda = (valor) => new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
}).format(Number(valor) || 0);

function listarDesde(respuesta) {
    if (Array.isArray(respuesta)) return respuesta;
    return Array.isArray(respuesta?.data) ? respuesta.data : [];
}

function fechaPedido(pedido) {
    const fecha = pedido.created_at || pedido.Fecha_salida;
    if (!fecha) return '—';
    const valor = new Date(fecha);
    return Number.isNaN(valor.getTime())
        ? '—'
        : valor.toLocaleDateString('es-CO');
}

function nombreCliente(pedido) {
    const usuario = pedido.usuario;
    const nombre = [
        usuario?.NombreUno_usuario,
        usuario?.NombreDos_usuario,
        usuario?.ApellidoDos_usuario,
        usuario?.SegundoApellido,
    ].filter(Boolean).join(' ');
    return nombre || usuario?.Email || `Usuario ${pedido.Id_usuario ?? '—'}`;
}

function AdminDashboard() {
    const { user } = useAuth();
    const [resumen, setResumen] = useState({
        usuarios: [],
        productos: [],
        pedidos: [],
    });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.role !== ROLES.ADMIN) return undefined;
        let vigente = true;

        Promise.all([listarUsuarios(), listarProductos(), listarPedidos()])
            .then(([usuarios, productos, pedidos]) => {
                if (!vigente) return;
                setResumen({
                    usuarios: listarDesde(usuarios),
                    productos: listarDesde(productos),
                    pedidos: listarDesde(pedidos),
                });
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

    const usuariosActivos = resumen.usuarios.filter((usuario) => usuario.estado === 'activo').length;
    const productosActivos = resumen.productos.filter(
        (producto) => String(producto.Estado || 'Activo').toLowerCase() === 'activo'
    ).length;
    const valorPedidos = resumen.pedidos.reduce(
        (total, pedido) => total + (Number(pedido.Total_pedido) || 0),
        0
    );
    const pedidosRecientes = [...resumen.pedidos]
        .sort((a, b) => new Date(b.created_at || b.Fecha_salida || 0) - new Date(a.created_at || a.Fecha_salida || 0))
        .slice(0, 5);

    return (
        <div className="dashboard-container admin-dashboard">
            <header className="dashboard-header">
                <div>
                    <p className="actividad-eyebrow">Acceso privado</p>
                    <h1>Centro de Administración</h1>
                    <p>Resumen actualizado directamente desde Laravel.</p>
                </div>
            </header>

            {error && <p role="alert" className="admin-error">{error}</p>}

            <section className="kpi-grid" aria-label="Resumen del sitio">
                <article className="kpi-card">
                    <span>Usuarios</span>
                    <h2>{cargando ? '…' : error ? '—' : resumen.usuarios.length}</h2>
                    <small>{error ? 'No disponible' : `${usuariosActivos} cuentas activas`}</small>
                </article>
                <article className="kpi-card">
                    <span>Productos publicados</span>
                    <h2>{cargando ? '…' : error ? '—' : productosActivos}</h2>
                    <small>{error ? 'No disponible' : `${resumen.productos.length} en el catálogo`}</small>
                </article>
                <article className="kpi-card">
                    <span>Pedidos registrados</span>
                    <h2>{cargando ? '…' : error ? '—' : resumen.pedidos.length}</h2>
                    <small>{error ? 'No disponible' : 'Consultados desde Laravel'}</small>
                </article>
                <article className="kpi-card">
                    <span>Valor total de pedidos</span>
                    <h2>{cargando ? '…' : error ? '—' : moneda(valorPedidos)}</h2>
                    <small>{error ? 'No disponible' : 'Suma registrada, sin descontar cancelaciones'}</small>
                </article>
            </section>

            <section className="admin-accesos" aria-label="Secciones de administración">
                {ACCESOS_ADMIN.map((acceso) => (
                    <Link className="admin-acceso" to={acceso.to} key={acceso.to}>
                        <strong>{acceso.titulo}</strong>
                        <span>{acceso.detalle}</span>
                        <span className="admin-acceso-abrir">Abrir sección →</span>
                    </Link>
                ))}
            </section>

            <section className="table-card admin-recientes">
                <div className="table-header">
                    <h3>Pedidos recientes</h3>
                    <Link className="btn-link" to="/admin/pedidos">Ver todos</Link>
                </div>
                {cargando ? (
                    <p role="status">Cargando datos desde Laravel…</p>
                ) : error ? (
                    <p role="status">No se pudieron cargar los pedidos.</p>
                ) : (
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pedido</th>
                                    <th>Cliente</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosRecientes.length ? pedidosRecientes.map((pedido) => (
                                    <tr key={pedido.Id_pedido}>
                                        <td className="font-bold">{pedido.Numero_pedido || `#${pedido.Id_pedido}`}</td>
                                        <td>{nombreCliente(pedido)}</td>
                                        <td>{fechaPedido(pedido)}</td>
                                        <td>{moneda(pedido.Total_pedido)}</td>
                                        <td>{pedido.Estado || 'Sin estado'}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5">Aún no hay pedidos registrados.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
            <p className="admin-dashboard-nota">
                Las métricas se obtienen de las cuentas, productos y pedidos guardados en Laravel. La suma de pedidos incluye todos sus estados.
            </p>
        </div>
    );
}

// Vista compartida por el panel de marketplace y el de administración.
const Dashboard = ({ administracion = false }) => {
    const { user } = useAuth();
    if (administracion) return <AdminDashboard />;

    if (!user) return <Navigate to="/login" replace />;
    if (![ROLES.USER, ROLES.ADMIN].includes(user.role)) return <Navigate to="/perfil" replace />;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>{administracion ? 'Panel de Administración' : 'Panel de Marketplace'}</h1>
                    <p>{administracion ? 'Resumen de administración' : 'Resumen de ventas y productos'}</p>
                    <p>Datos de demostración: estas cifras no reflejan la actividad real.</p>
                </div>
                <div className="date-filter">01/08/2024 - 25/08/2024</div>
            </header>

            {/* Tarjetas KPI */}
            <section className="kpi-grid">
                <div className="kpi-card">
                    <span>Ventas totales</span>
                    <h2>$ 8.450.000</h2>
                    <small className="trend positive">▲ 12.5% vs último mes</small>
                </div>
                <div className="kpi-card">
                    <span>Pedidos</span>
                    <h2>152</h2>
                    <small className="trend positive">▲ 8.2% vs último mes</small>
                </div>
                <div className="kpi-card">
                    <span>Clientes</span>
                    <h2>89</h2>
                    <small className="trend positive">▲ 15.3% vs último mes</small>
                </div>
                <div className="kpi-card">
                    <span>Productos</span>
                    <h2>120</h2>
                    <small className="trend positive">▲ 5.1% vs último mes</small>
                </div>
            </section>

            {/* Gráficos */}
            <section className="charts-grid">
                <div className="chart-card">
                    <h3>Ventas por día</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={dataVentasDia}>
                                <XAxis dataKey="fecha" stroke="#888" fontSize={12} />
                                <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `$${v}k`} />
                                <Tooltip formatter={(value) => [`$${value}.000`, 'Ventas']} />
                                <Line
                                    type="monotone"
                                    dataKey="venta"
                                    stroke="#2e7d32"
                                    strokeWidth={2}
                                    dot={{ fill: '#2e7d32', r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>



                <div className="chart-card">
                    <h3>Ventas por categoría</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={dataCategorias}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                >
                                    {dataCategorias.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(val) => [`${val}%`, 'Porcentaje']} />
                                <Legend layout="vertical" align="right" verticalAlign="middle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
            <section className="tables-grid">
                {/* Tabla Ventas Recientes */}
                <div className="table-card">
                    <div className="table-header">
                        <h3>Ventas recientes</h3>
                        <button className="btn-link">Ver todas</button>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pedido</th>
                                    <th>Cliente</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ventasRecientes.map((item, index) => (
                                    <tr key={index}>
                                        <td className="font-bold">{item.id}</td>
                                        <td>{item.cliente}</td>
                                        <td>{item.fecha}</td>
                                        <td>{item.total}</td>
                                        <td>
                                            <span className={`status-badge ${item.estado.toLowerCase()}`}>
                                                {item.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabla Productos Más Vendidos */}
                <div className="table-card">
                    <div className="table-header">
                        <h3>Productos más vendidos</h3>
                        <button className="btn-link">Ver reporte</button>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Vendidos</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosTop.map((prod, index) => (
                                    <tr key={index}>
                                        <td className="font-bold">{prod.nombre}</td>
                                        <td><span className="category-tag">{prod.categoria}</span></td>
                                        <td>{prod.unidades}</td>
                                        <td>{prod.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;