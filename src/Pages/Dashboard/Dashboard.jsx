// import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import './Dashboard.css';

// Datos de prueba basados en tu boceto
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
    { id: '#1052', cliente: 'Ana Martínez', fecha: '25/08/2026', total: '$ 180.000', estado: 'Completado', factura: 'ver factura' },
    { id: '#1051', cliente: 'Carlos López', fecha: '25/08/2026', total: '$ 320.000', estado: 'Enviado', factura: 'ver factura' },
    { id: '#1050', cliente: 'Lucía Gómez', fecha: '24/08/2026', total: '$ 95.000', estado: 'Pendiente', factura: 'ver factura' },
    { id: '#1049', cliente: 'Diego Ruiz', fecha: '24/08/2026', total: '$ 210.000', estado: 'Completado', factura: 'ver factura' },
];

const productosTop = [
    { nombre: 'Proteína Whey Isolate 1kg', categoria: 'Proteínas', unidades: '142 unids', total: '$ 4.260.000' },
    { nombre: 'Mantequilla de Maní Natural', categoria: 'Snacks', unidades: '98 unids', total: '$ 1.470.000' },
    { nombre: 'Multivitamínico Fit', categoria: 'Vitaminas', unidades: '76 unids', total: '$ 1.140.000' },
    { nombre: 'Agua de Coco Orgánica', categoria: 'Bebidas', unidades: '65 unids', total: '$ 520.000' },
];

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Panel de Vendedor</h1>
                    <p>Resumen general de tu tienda</p>
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
                                    <th>Factura</th>


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
                                        <td>
                                            <button
                                                type="button"
                                                className="factura-badge"
                                                onClick={() => {
                                                    // Aquí podrás agregar la redirección a la ruta futura
                                                    // ej: navigate(`/facturas/${item.factura}`)
                                                }}
                                            >
                                                {item.factura}
                                            </button>
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