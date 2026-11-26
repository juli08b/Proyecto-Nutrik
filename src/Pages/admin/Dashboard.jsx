import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { useAuth } from '../../Context/authContext';
import { ROLES } from '../../constants/roles';
import './Dashboard.css';

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

const ventasRecientesBase = [
    {
        id: '#1052',
        cliente: 'Ana Martínez',
        fecha: '25/08/2026',
        total: '$ 180.000',
        montoNum: 180000,
        estado: 'Completado',
        metodoPago: 'Tarjeta Crédito •• 4821',
        ciudad: 'Bogotá',
        guia: 'ENV-98412',
        detalle: '2x Proteína Whey Isolate 1kg — Entrega confirmada.'
    },
    {
        id: '#1051',
        cliente: 'Carlos López',
        fecha: '25/08/2026',
        total: '$ 320.000',
        montoNum: 320000,
        estado: 'Enviado',
        metodoPago: 'PSE / Bancolombia',
        ciudad: 'Medellín',
        guia: 'ENV-98405',
        detalle: '3x Mantequilla de Maní Natural + 1x Multivitamínico Fit.'
    },
    {
        id: '#1050',
        cliente: 'Lucía Gómez',
        fecha: '24/08/2026',
        total: '$ 95.000',
        montoNum: 95000,
        estado: 'Pendiente',
        metodoPago: 'Nequi',
        ciudad: 'Popayán',
        guia: 'PEND-3310',
        detalle: 'Pendiente de confirmación de pago en pasarela.'
    },
    {
        id: '#1049',
        cliente: 'Diego Ruiz',
        fecha: '24/08/2026',
        total: '$ 210.000',
        montoNum: 210000,
        estado: 'Completado',
        metodoPago: 'Tarjeta Débito •• 1190',
        ciudad: 'Cali',
        guia: 'ENV-98388',
        detalle: '4x Agua de Coco Orgánica (pack x6) + envío prioritario.'
    },
    {
        id: '#0812',
        cliente: 'Camila Herrera',
        fecha: '14/05/2020',
        total: '$ 145.000',
        montoNum: 145000,
        estado: 'Completado',
        metodoPago: 'Tarjeta Crédito •• 3309',
        ciudad: 'Popayán',
        guia: 'ENV-2020-0812',
        detalle: 'Registro histórico del 14/05/2020 — 3x Proteína Whey Isolate + 1x Agua de Coco.'
    },
    {
        id: '#0811',
        cliente: 'Javier Mendoza',
        fecha: '14/05/2020',
        total: '$ 78.000',
        montoNum: 78000,
        estado: 'Completado',
        metodoPago: 'PSE / Bancolombia',
        ciudad: 'Cali',
        guia: 'ENV-2020-0811',
        detalle: 'Registro histórico del 14/05/2020 — 2x Mantequilla de Maní Natural + 2x Multivitamínico Fit.'
    },
];

const productosTopBase = [
    {
        nombre: 'Proteína Whey Isolate 1kg',
        categoria: 'Proteínas',
        unidades: '142 unids',
        total: '$ 4.260.000',
        precioUnitario: 30000,
        stockActual: 34,
        margen: '38%',
        rotacion: 'Alta (11.4 unids/día)',
        ventasDia: 14,
    },
    {
        nombre: 'Mantequilla de Maní Natural',
        categoria: 'Snacks',
        unidades: '98 unids',
        total: '$ 1.470.000',
        precioUnitario: 15000,
        stockActual: 12,
        margen: '44%',
        rotacion: 'Media-Alta (8.2 unids/día)',
        ventasDia: 9,
    },
    {
        nombre: 'Multivitamínico Fit',
        categoria: 'Vitaminas',
        unidades: '76 unids',
        total: '$ 1.140.000',
        precioUnitario: 15000,
        stockActual: 58,
        margen: '51%',
        rotacion: 'Media (6.1 unids/día)',
        ventasDia: 7,
    },
    {
        nombre: 'Agua de Coco Orgánica',
        categoria: 'Bebidas',
        unidades: '65 unids',
        total: '$ 520.000',
        precioUnitario: 8000,
        stockActual: 9,
        margen: '35%',
        rotacion: 'Alta en clima cálido',
        ventasDia: 11,
    },
];

// Registros históricos de productos por fecha (incluye 14/05/2020)
const registrosProductosPorFecha = [
    {
        fecha: '14/05/2020',
        producto: 'Proteína Whey Isolate 1kg',
        categoria: 'Proteínas',
        comprador: 'Camila Herrera',
        unidades: 3,
        precioUnitario: 30000,
        stockActual: 34,
        margen: '38%',
    },
    {
        fecha: '14/05/2020',
        producto: 'Agua de Coco Orgánica',
        categoria: 'Bebidas',
        comprador: 'Camila Herrera',
        unidades: 5,
        precioUnitario: 8000,
        stockActual: 9,
        margen: '35%',
    },
    {
        fecha: '14/05/2020',
        producto: 'Mantequilla de Maní Natural',
        categoria: 'Snacks',
        comprador: 'Javier Mendoza',
        unidades: 2,
        precioUnitario: 15000,
        stockActual: 12,
        margen: '44%',
    },
    {
        fecha: '14/05/2020',
        producto: 'Multivitamínico Fit',
        categoria: 'Vitaminas',
        comprador: 'Javier Mendoza',
        unidades: 2,
        precioUnitario: 15000,
        stockActual: 58,
        margen: '51%',
    },
    {
        fecha: '25/08/2026',
        producto: 'Proteína Whey Isolate 1kg',
        categoria: 'Proteínas',
        comprador: 'Ana Martínez',
        unidades: 2,
        precioUnitario: 30000,
        stockActual: 34,
        margen: '38%',
    },
    {
        fecha: '25/08/2026',
        producto: 'Mantequilla de Maní Natural',
        categoria: 'Snacks',
        comprador: 'Carlos López',
        unidades: 3,
        precioUnitario: 15000,
        stockActual: 12,
        margen: '44%',
    },
    {
        fecha: '24/08/2026',
        producto: 'Agua de Coco Orgánica',
        categoria: 'Bebidas',
        comprador: 'Diego Ruiz',
        unidades: 4,
        precioUnitario: 8000,
        stockActual: 9,
        margen: '35%',
    },
];

const formatearCOP = (valor) => `$ ${Number(valor || 0).toLocaleString('es-CO')}`;

// Convierte "DD/MM/YYYY" a "YYYY-MM-DD" para sincronizar con <input type="date" />
const fechaCortaAInputDate = (fechaCorta = '') => {
    const partes = fechaCorta.split('/');
    if (partes.length !== 3) return '';
    const [dd, mm, yyyy] = partes;
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
};

// Convierte "YYYY-MM-DD" a "DD/MM/YYYY"
const inputDateAFechaCorta = (isoDate = '') => {
    const partes = isoDate.split('-');
    if (partes.length !== 3) return '';
    const [yyyy, mm, dd] = partes;
    return `${dd}/${mm}/${yyyy}`;
};

// Botones verdes con Tailwind (aplicados en ambas vistas: Ver todas y Ver reporte)
const claseBotonVerdeSoft = (activo = false) =>
    `inline-flex cursor-pointer items-center justify-center rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-600/30 active:scale-[0.98] sm:text-sm ${
        activo
            ? 'border-green-700 bg-green-700 text-white shadow-2xs hover:bg-green-800'
            : 'border-emerald-200 bg-emerald-50 text-green-800 hover:border-green-700 hover:bg-green-700 hover:text-white'
    }`;

const claseBotonTodosVerde = (activo = false) =>
    `inline-flex cursor-pointer items-center justify-center rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-600/30 active:scale-[0.98] sm:text-sm ${
        activo
            ? 'border-green-700 bg-green-700 text-white shadow-2xs hover:bg-green-800'
            : 'border-emerald-200 bg-emerald-50 text-green-800 hover:border-green-700 hover:bg-green-700 hover:text-white'
    }`;

// Vista compartida por el panel de marketplace y el de administración.
const Dashboard = ({ administracion = false }) => {
    const { user } = useAuth();

    // 'ventas' | 'productos' | null
    const [vistaFantasma, setVistaFantasma] = useState(null);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    // Buscador de fechas y texto compartido (aplica para ventas y productos)
    const [busquedaFechaTexto, setBusquedaFechaTexto] = useState('');
    const [fechaPicker, setFechaPicker] = useState('');

    useEffect(() => {
        if (!vistaFantasma) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setVistaFantasma(null);
                setPedidoSeleccionado(null);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [vistaFantasma]);

    const fechaActivaFiltro = useMemo(() => {
        if (fechaPicker) return inputDateAFechaCorta(fechaPicker).toLowerCase();
        return busquedaFechaTexto.trim().toLowerCase();
    }, [fechaPicker, busquedaFechaTexto]);

    // Filtrado de ventas por fecha (ej. 14/05/2020) o por texto (ej. nombre de persona)
    const ventasFiltradas = useMemo(() => {
        if (!fechaActivaFiltro) return ventasRecientesBase;
        return ventasRecientesBase.filter(
            (v) =>
                v.fecha.toLowerCase().includes(fechaActivaFiltro) ||
                v.cliente.toLowerCase().includes(fechaActivaFiltro) ||
                v.id.toLowerCase().includes(fechaActivaFiltro) ||
                v.ciudad.toLowerCase().includes(fechaActivaFiltro)
        );
    }, [fechaActivaFiltro]);

    const totalVentasFiltradas = useMemo(
        () => ventasFiltradas.reduce((acc, item) => acc + (item.montoNum || 0), 0),
        [ventasFiltradas]
    );

    // Estadísticas de productos filtrables por fecha (ej. 14/05/2020) o "Todos"
    const estadisticasProductos = useMemo(() => {
        const registrosBase = fechaActivaFiltro
            ? registrosProductosPorFecha.filter(
                  (r) =>
                      r.fecha.toLowerCase().includes(fechaActivaFiltro) ||
                      r.producto.toLowerCase().includes(fechaActivaFiltro) ||
                      r.comprador.toLowerCase().includes(fechaActivaFiltro) ||
                      r.categoria.toLowerCase().includes(fechaActivaFiltro)
              )
            : productosTopBase.map((p) => ({
                  fecha: 'Todos los registros',
                  producto: p.nombre,
                  categoria: p.categoria,
                  comprador: 'Varios clientes',
                  unidades: p.ventasDia,
                  precioUnitario: p.precioUnitario,
                  stockActual: p.stockActual,
                  margen: p.margen,
              }));

        const mapa = new Map();
        for (const reg of registrosBase) {
            const actual = mapa.get(reg.producto);
            const ingresoReg = reg.unidades * reg.precioUnitario;
            if (!actual) {
                mapa.set(reg.producto, {
                    nombre: reg.producto,
                    categoria: reg.categoria,
                    fecha: reg.fecha,
                    compradores: [reg.comprador],
                    unidadesPeriodo: reg.unidades,
                    ingresoPeriodo: ingresoReg,
                    stockActual: reg.stockActual,
                    margen: reg.margen,
                });
            } else {
                actual.unidadesPeriodo += reg.unidades;
                actual.ingresoPeriodo += ingresoReg;
                if (!actual.compradores.includes(reg.comprador)) {
                    actual.compradores.push(reg.comprador);
                }
            }
        }

        const agrupados = Array.from(mapa.values());
        const totalUnidades = agrupados.reduce((acc, item) => acc + item.unidadesPeriodo, 0);
        const totalIngresos = agrupados.reduce((acc, item) => acc + item.ingresoPeriodo, 0);

        const items = agrupados
            .map((item) => ({
                ...item,
                participacion: totalUnidades > 0 ? Math.round((item.unidadesPeriodo / totalUnidades) * 100) : 0,
                stockBajo: item.stockActual <= 15,
            }))
            .sort((a, b) => b.unidadesPeriodo - a.unidadesPeriodo);

        return {
            items,
            totalUnidades,
            totalIngresos,
            lider: items[0] || null,
        };
    }, [fechaActivaFiltro]);

    if (!user) return <Navigate to="/login" replace />;
    if (![ROLES.USER, ROLES.ADMIN].includes(user.role)) return <Navigate to="/perfil" replace />;

    const limpiarFiltros = () => {
        setBusquedaFechaTexto('');
        setFechaPicker('');
        setPedidoSeleccionado(null);
    };

    const abrirVistaVentas = () => {
        limpiarFiltros();
        setVistaFantasma('ventas');
    };

    const abrirVistaProductos = () => {
        limpiarFiltros();
        setVistaFantasma('productos');
    };

    const cerrarVistaFantasma = () => {
        setVistaFantasma(null);
        setPedidoSeleccionado(null);
    };

    const handleSeleccionFechaPicker = (valorIso) => {
        setFechaPicker(valorIso);
        setBusquedaFechaTexto(valorIso ? inputDateAFechaCorta(valorIso) : '');
    };

    const handleCambioTextoBusqueda = (valorTexto) => {
        setBusquedaFechaTexto(valorTexto);
        const match = valorTexto.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (match) {
            setFechaPicker(fechaCortaAInputDate(valorTexto.trim()));
        } else if (!valorTexto.trim()) {
            setFechaPicker('');
        }
    };

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
                        <button
                            type="button"
                            className={claseBotonVerdeSoft(false)}
                            onClick={abrirVistaVentas}
                        >
                            Ver todas
                        </button>
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
                                {ventasRecientesBase.slice(0, 4).map((item, index) => (
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
                        <button
                            type="button"
                            className={claseBotonVerdeSoft(false)}
                            onClick={abrirVistaProductos}
                        >
                            Ver reporte
                        </button>
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
                                {productosTopBase.map((prod, index) => (
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

            {/* VISTA FANTASMA CON TAILWIND */}
            {vistaFantasma && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-[2px]"
                    role="dialog"
                    aria-modal="true"
                    onClick={cerrarVistaFantasma}
                >
                    <div
                        className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Encabezado */}
                        <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                                    {vistaFantasma === 'ventas'
                                        ? 'Historial y Buscador de Ventas'
                                        : 'Reporte Estadístico y Buscador de Productos'}
                                </h2>
                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                    Busca por fecha exacta o por persona / producto · Datos de demostración
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={cerrarVistaFantasma}
                                aria-label="Cerrar vista"
                                className={claseBotonVerdeSoft(false) + ' h-9 w-9 !px-0 !py-0'}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Barra común para ambos: "Todos" + búsqueda personalizada y selector de fecha */}
                        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <button
                                    type="button"
                                    onClick={limpiarFiltros}
                                    className={claseBotonTodosVerde(!fechaActivaFiltro)}
                                >
                                    Todos
                                </button>

                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-900 sm:text-sm">
                                    {vistaFantasma === 'ventas' ? (
                                        <>
                                            Subtotal: <strong className="font-bold">{formatearCOP(totalVentasFiltradas)}</strong>
                                        </>
                                    ) : (
                                        <>
                                            {estadisticasProductos.totalUnidades} unids ·{' '}
                                            <strong className="font-bold">
                                                {formatearCOP(estadisticasProductos.totalIngresos)}
                                            </strong>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                                        Búsqueda personalizada
                                    </label>
                                    <input
                                        type="text"
                                        value={busquedaFechaTexto}
                                        onChange={(e) => handleCambioTextoBusqueda(e.target.value)}
                                        placeholder="Búsqueda"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 transition focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600/20 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                                        Selector de fecha
                                    </label>
                                    <input
                                        type="date"
                                        value={fechaPicker}
                                        onChange={(e) => handleSeleccionFechaPicker(e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 transition focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600/20 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vista fantasma: Ventas */}
                        {vistaFantasma === 'ventas' && (
                            <div className="space-y-4">
                                <div className="table-responsive rounded-xl border border-slate-200">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Pedido</th>
                                                <th>Cliente</th>
                                                <th>Fecha</th>
                                                <th>Total</th>
                                                <th>Estado</th>
                                                <th>Detalles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ventasFiltradas.length > 0 ? (
                                                ventasFiltradas.map((item) => {
                                                    const isSelected = pedidoSeleccionado?.id === item.id;
                                                    return (
                                                        <tr
                                                            key={item.id}
                                                            className={isSelected ? 'bg-emerald-50/70' : ''}
                                                        >
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
                                                                    className={claseBotonVerdeSoft(isSelected)}
                                                                    onClick={() =>
                                                                        setPedidoSeleccionado(isSelected ? null : item)
                                                                    }
                                                                >
                                                                    {isSelected ? 'Ocultar' : 'Ver detalle'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className="py-6 text-center text-sm text-slate-500">
                                                        No hay ventas registradas para ese filtro.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {pedidoSeleccionado && (
                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
                                        <h4 className="text-sm font-bold text-slate-900">
                                            Detalle del pedido {pedidoSeleccionado.id}
                                        </h4>
                                        <div className="mt-2.5 grid grid-cols-1 gap-2 text-xs text-slate-700 sm:grid-cols-2 md:grid-cols-3 sm:text-sm">
                                            <div><span className="font-semibold text-slate-900">Cliente:</span> {pedidoSeleccionado.cliente}</div>
                                            <div><span className="font-semibold text-slate-900">Fecha:</span> {pedidoSeleccionado.fecha}</div>
                                            <div><span className="font-semibold text-slate-900">Ciudad:</span> {pedidoSeleccionado.ciudad}</div>
                                            <div><span className="font-semibold text-slate-900">Pago:</span> {pedidoSeleccionado.metodoPago}</div>
                                            <div><span className="font-semibold text-slate-900">Guía / Ref:</span> {pedidoSeleccionado.guia}</div>
                                            <div><span className="font-semibold text-slate-900">Total:</span> {pedidoSeleccionado.total}</div>
                                        </div>
                                        <p className="mt-3 rounded-xl bg-white p-2.5 text-xs text-slate-600 ring-1 ring-emerald-200 sm:text-sm">
                                            {pedidoSeleccionado.detalle}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Vista fantasma: Productos */}
                        {vistaFantasma === 'productos' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                                        <span className="block text-xs text-slate-500">Producto más vendido</span>
                                        <strong className="mt-1 block truncate text-sm font-bold text-slate-900 sm:text-base">
                                            {estadisticasProductos.lider?.nombre || '-'}
                                        </strong>
                                        <small className="text-xs font-medium text-green-700">
                                            {estadisticasProductos.lider?.unidadesPeriodo || 0} unidades
                                        </small>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                                        <span className="block text-xs text-slate-500">Unidades del filtro</span>
                                        <strong className="mt-1 block text-base font-bold text-slate-900">
                                            {estadisticasProductos.totalUnidades} unids
                                        </strong>
                                        <small className="text-xs text-slate-500">
                                            {fechaActivaFiltro ? `Filtro: ${busquedaFechaTexto || fechaActivaFiltro}` : 'Todos'}
                                        </small>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                                        <span className="block text-xs text-slate-500">Ingresos del filtro</span>
                                        <strong className="mt-1 block text-base font-bold text-slate-900">
                                            {formatearCOP(estadisticasProductos.totalIngresos)}
                                        </strong>
                                        <small className="text-xs text-slate-500">Estadística de productos</small>
                                    </div>
                                </div>

                                <div className="table-responsive rounded-xl border border-slate-200">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Vendidos</th>
                                                <th>Participación</th>
                                                <th>Ingreso</th>
                                                <th>Fecha / Cliente / Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {estadisticasProductos.items.length > 0 ? (
                                                estadisticasProductos.items.map((prod) => (
                                                    <tr key={prod.nombre}>
                                                        <td>
                                                            <div className="font-bold text-slate-900">{prod.nombre}</div>
                                                            <small className="text-xs text-slate-500">{prod.categoria}</small>
                                                        </td>
                                                        <td className="font-bold text-slate-900">
                                                            {prod.unidadesPeriodo} unids
                                                        </td>
                                                        <td>
                                                            <div className="flex min-w-[120px] items-center gap-2">
                                                                <span className="w-9 text-xs font-semibold text-slate-700">
                                                                    {prod.participacion}%
                                                                </span>
                                                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                                                    <div
                                                                        className="h-full rounded-full bg-green-700 transition-all duration-300"
                                                                        style={{ width: `${prod.participacion}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="font-medium text-slate-800">
                                                            {formatearCOP(prod.ingresoPeriodo)}
                                                        </td>
                                                        <td>
                                                            <div className="text-xs text-slate-700 sm:text-sm">
                                                                Fecha: <strong>{prod.fecha}</strong> · Stock:{' '}
                                                                <strong>{prod.stockActual}</strong>
                                                            </div>
                                                            <small className="text-xs text-slate-500">
                                                                {prod.compradores.join(', ')} · Margen {prod.margen}
                                                            </small>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="py-6 text-center text-sm text-slate-500">
                                                        No hay estadísticas de productos para ese filtro.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;