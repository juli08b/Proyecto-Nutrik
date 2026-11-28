import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../Context/authContext'; // Ajusta la ruta si es necesario
import { useProductos } from '../../Context/productContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    BadgeCheck,
    MapPin,
    Mail,
    Users,
    Package,
    Star,
    Search,
    Store,
    Heart,
    SlidersHorizontal,
    Leaf,
    ShoppingBag,
    MessageCircle,
    Sparkles,
    Tag,
    ShieldCheck,
    ShoppingCart,
    CheckCircle2,
    X,
    Award,
    Truck,
} from 'lucide-react';
import './PerfilVendedor.css';

const PRODUCTOS_DEMO = [
    {
        id: 1,
        nombre: 'Proteína Whey Isolate Vainilla',
        presentacion: '900g · 30 servicios',
        categoria: 'Proteínas',
        precio: 85000,
        precioAnterior: null,
        etiqueta: 'Más vendido',
        tipo: 'popular',
        rating: 4.9,
    },
    {
        id: 2,
        nombre: 'Barra de Proteína Cacao & Almendras',
        presentacion: 'Caja x 12 unidades · 20g prot',
        categoria: 'Snacks',
        precio: 6500,
        precioAnterior: null,
        etiqueta: 'Nuevo',
        tipo: 'nuevo',
        rating: 4.7,
    },
    {
        id: 3,
        nombre: 'Vitamina C + Zinc Liposomal',
        presentacion: '60 cápsulas vegetales',
        categoria: 'Vitaminas',
        precio: 35000,
        precioAnterior: 44000,
        etiqueta: '-20% OFF',
        tipo: 'promocion',
        rating: 4.8,
    },
    {
        id: 4,
        nombre: 'Multivitamínico Esencial Diario',
        presentacion: '90 tabletas · Sin azúcar',
        categoria: 'Vitaminas',
        precio: 42000,
        precioAnterior: null,
        etiqueta: '',
        tipo: 'popular',
        rating: 4.6,
    },
    {
        id: 5,
        nombre: 'Proteína Vegana Arveja & Quinua',
        presentacion: '750g · Orgánica',
        categoria: 'Proteínas',
        precio: 72000,
        precioAnterior: null,
        etiqueta: 'Nuevo',
        tipo: 'nuevo',
        rating: 4.9,
    },
    {
        id: 6,
        nombre: 'Mix Energético Frutos Secos & Arándanos',
        presentacion: '250g · 100% Natural',
        categoria: 'Snacks',
        precio: 18000,
        precioAnterior: 22000,
        etiqueta: 'Oferta',
        tipo: 'promocion',
        rating: 4.8,
    },
];

const RESENAS_DEMO = [
    {
        id: 1,
        autor: 'Camila Restrepo',
        fecha: 'Hace 3 días',
        rating: 5,
        producto: 'Proteína Whey Isolate Vainilla',
        comentario: 'Excelente disolución y sabor muy suave, nada empalagoso. Llegó súper rápido en Bogotá.',
    },
    {
        id: 2,
        autor: 'Andrés Felipe Gómez',
        fecha: 'Hace 1 semana',
        rating: 5,
        producto: 'Vitamina C + Zinc Liposomal',
        comentario: 'Productos 100% originales y con buena fecha de vencimiento. Muy buena atención de la tienda.',
    },
    {
        id: 3,
        autor: 'Laura Valentina Ruiz',
        fecha: 'Hace 2 semanas',
        rating: 4,
        producto: 'Barra de Proteína Cacao & Almendras',
        comentario: 'Muy buen snack para después de entrenar, textura agradable y buenos macros.',
    },
];

const TABS = [
    { id: 'inicio', label: 'Vitrina', icon: Store },
    { id: 'productos', label: 'Catálogo', icon: ShoppingBag },
    { id: 'nuevo', label: 'Novedades', icon: Sparkles },
    { id: 'promocion', label: 'Ofertas', icon: Tag },
    { id: 'comentarios', label: 'Reseñas', icon: MessageCircle },
];

const CATEGORIAS = ['Todas', 'Proteínas', 'Vitaminas', 'Snacks'];

const moneda = (valor) =>
    new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(valor);

function Estrellas({ valor = 0, size = 15 }) {
    const llenas = Math.round(valor);
    return (
        <div className="nk-stars-row" aria-label={`${valor} de 5 estrellas`}>
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={i < llenas ? 'nk-star-filled' : ''}
                />
            ))}
        </div>
    );
}

const PerfilVendedor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();
    const { productos } = useProductos();

    const [activeTab, setActiveTab] = useState('inicio');
    const [busqueda, setBusqueda] = useState('');
    const [categoria, setCategoria] = useState('Todas');
    const [orden, setOrden] = useState('recomendados');
    const [siguiendo, setSiguiendo] = useState(false);
    const [favoritos, setFavoritos] = useState([]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }


    const vendedor = {
        id: user.id || id,
        nombre: user.nombreCompleto || `${user.primerNombre || ''} ${user.primerApellido || ''}`.trim() || 'Vendedor Nutrik',
        lema: 'Nutrición limpia, suplementación certificada y bienestar diario.', // Este lo puedes dejar fijo o crear un campo en tu BD
        correo: user.email || 'Sin correo registrado',
        telefono: user.telefono || 'Sin teléfono',
        ubicacion: user.ubicacion || 'Bogotá, Colombia', // Si tienes ciudad en tu BD, úsala aquí
        fechaRegistro: user.fechaRegistro || 'Miembro de Nutrik',
        tiempoRespuesta: 'Responde en menos de 1 hora',
        esVerificado: true,
        foto: user.foto || null,
        seguidores: '3.2K', // Esto podrías traerlo de una BD a futuro
        ventas: '12K',
        rating: 4.8,
        totalResenas: 348,
    };

    // 4. Filtramos los productos: Solo mostramos los que pertenecen a este vendedor
    // (Asumiendo que tu tabla de productos tiene un campo 'vendedorId' o 'usuarioId')
    const productosDelVendedor = productos.filter(p => String(p.vendedorId) === String(vendedor.id));

    const toggleFavorito = (prodId) => {
        setFavoritos((prev) =>
            prev.includes(prodId) ? prev.filter((item) => item !== prodId) : [...prev, prodId]
        );
    };

    const productosVisibles = useMemo(() => {
        // Ahora usamos productosDelVendedor en lugar de PRODUCTOS_DEMO
        let lista = [...productosDelVendedor];

        if (activeTab === 'nuevo') lista = lista.filter((p) => p.tipo === 'nuevo');
        if (activeTab === 'promocion') lista = lista.filter((p) => p.tipo === 'promocion');
        if (categoria !== 'Todas') lista = lista.filter((p) => p.categoria === categoria);

        const texto = busqueda.trim().toLowerCase();
        if (texto) {
            lista = lista.filter(
                (p) =>
                    p.nombre.toLowerCase().includes(texto) ||
                    p.categoria?.toLowerCase().includes(texto)
            );
        }

        if (orden === 'menor') lista.sort((a, b) => a.precio - b.precio);
        if (orden === 'mayor') lista.sort((a, b) => b.precio - a.precio);
        // if (orden === 'rating') lista.sort((a, b) => b.rating - a.rating); // Descomenta si tus productos tienen rating

        return lista;
    }, [productosDelVendedor, activeTab, busqueda, categoria, orden]);

    if (!vendedor) {
        return (
            <div className="nk-state-wrapper">
                <div className="nk-empty-icon-box">
                    <Store size={32} />
                </div>
                <h2 className="nk-state-title">No encontramos esta tienda</h2>
                <p className="nk-state-desc">
                    Es posible que el enlace haya cambiado o la tienda ya no esté disponible en Nutrik.
                </p>
                <button onClick={() => navigate(-1)} className="nk-follow-btn">
                    Explorar otras tiendas
                </button>
            </div>
        );
    }

    const iniciales = vendedor.nombre
        .split(' ')
        .map((nombre) => nombre[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const TarjetaProducto = ({ producto }) => {
        const esFav = favoritos.includes(producto.id);
        const badgeModifier =
            producto.tipo === 'promocion'
                ? 'nk-product-badge--promo'
                : producto.tipo === 'nuevo'
                    ? 'nk-product-badge--new'
                    : 'nk-product-badge--default';

        return (
            <article className="nk-product-card">
                <div>
                    <div className="nk-product-media">
                        <div className="nk-product-placeholder">
                            <Package size={36} strokeWidth={1.75} />
                        </div>

                        {producto.etiqueta && (
                            <span className={`nk-product-badge ${badgeModifier}`}>
                                {producto.etiqueta}
                            </span>
                        )}

                        <button
                            onClick={() => toggleFavorito(producto.id)}
                            aria-label={`Guardar ${producto.nombre}`}
                            className={`nk-fav-btn ${esFav ? 'is-fav' : ''}`}
                        >
                            <Heart size={16} fill={esFav ? 'currentColor' : 'none'} />
                        </button>
                    </div>

                    <div className="nk-product-info">
                        <div className="nk-product-meta">
                            <span className="nk-product-cat">{producto.categoria}</span>
                            <span className="nk-product-rating">
                                <Star size={12} className="nk-star-filled" />
                                {producto.rating}
                            </span>
                        </div>

                        <h3 className="nk-product-title">{producto.nombre}</h3>
                        <p className="nk-product-sub">{producto.presentacion}</p>
                    </div>
                </div>

                <div className="nk-product-footer">
                    <div className="nk-price-row">
                        <span className="nk-price-current">{moneda(producto.precio)}</span>
                        {producto.precioAnterior && (
                            <span className="nk-price-old">{moneda(producto.precioAnterior)}</span>
                        )}
                    </div>

                    <div className="nk-card-actions">
                        <button className="nk-btn-view">Ver</button>
                        <button title="Agregar al carrito" className="nk-btn-add">
                            <ShoppingCart size={15} />
                            Agregar
                        </button>
                    </div>
                </div>
            </article>
        );
    };

    return (
        <main className="nk-store-page">
            <div className="nk-container">
                {/* Navegación superior */}
                <div className="nk-topbar">
                    <button onClick={() => navigate(-1)} className="nk-back-btn">
                        <ArrowLeft size={17} />
                        Volver al marketplace
                    </button>
                    <span className="nk-selection-pill">
                        <Sparkles size={13} /> Selección Nutrik
                    </span>
                </div>

                {/* Hero / Perfil de la tienda */}
                <section className="nk-hero-card">
                    <div className="nk-hero-banner">
                        <Leaf size={180} className="nk-leaf-decor-1" />
                        <Leaf size={140} className="nk-leaf-decor-2" />
                    </div>

                    <div className="nk-hero-body">
                        <div className="nk-hero-header-row">
                            <div className="nk-identity-group">
                                <div className="nk-avatar">
                                    {vendedor.foto ? (
                                        <img src={vendedor.foto} alt={`Logo de ${vendedor.nombre}`} />
                                    ) : (
                                        iniciales
                                    )}
                                </div>

                                <div className="nk-title-block">
                                    <div className="nk-name-row">
                                        <h1 className="nk-store-name">{vendedor.nombre}</h1>
                                        {vendedor.esVerificado && (
                                            <span className="nk-verified-badge">
                                                <BadgeCheck size={14} />
                                                Tienda Verificada
                                            </span>
                                        )}
                                    </div>
                                    <p className="nk-store-motto">{vendedor.lema}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSiguiendo((actual) => !actual)}
                                className={`nk-follow-btn ${siguiendo ? 'is-following' : ''}`}
                            >
                                <Heart size={16} fill={siguiendo ? 'currentColor' : 'none'} />
                                {siguiendo ? 'Siguiendo' : 'Seguir tienda'}
                            </button>
                        </div>

                        {/* Métricas */}
                        <div className="nk-metrics-bar">
                            <div className="nk-metric-item">
                                <div className="nk-metric-icon nk-metric-icon--amber">
                                    <Star size={17} className="nk-star-filled" />
                                </div>
                                <div>
                                    <p className="nk-metric-value">
                                        {vendedor.rating}{' '}
                                        <span className="nk-metric-sub">({vendedor.totalResenas})</span>
                                    </p>
                                    <p className="nk-metric-label">Calificación</p>
                                </div>
                            </div>

                            <div className="nk-metric-item">
                                <div className="nk-metric-icon nk-metric-icon--green">
                                    <Users size={17} />
                                </div>
                                <div>
                                    <p className="nk-metric-value">{vendedor.seguidores}</p>
                                    <p className="nk-metric-label">Seguidores</p>
                                </div>
                            </div>

                            <div className="nk-metric-item">
                                <div className="nk-metric-icon nk-metric-icon--green">
                                    <Package size={17} />
                                </div>
                                <div>
                                    <p className="nk-metric-value">{vendedor.ventas}</p>
                                    <p className="nk-metric-label">Ventas exitosas</p>
                                </div>
                            </div>

                            <div className="nk-location-badge">
                                <MapPin size={16} />
                                <span>{vendedor.ubicacion}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navegación interna sticky */}
                <nav className="nk-tabs-nav">
                    <div className="nk-tabs-list">
                        {TABS.map(({ id: tabId, label, icon: Icon }) => {
                            const activo = activeTab === tabId;
                            return (
                                <button
                                    key={tabId}
                                    onClick={() => setActiveTab(tabId)}
                                    className={`nk-tab-btn ${activo ? 'is-active' : ''}`}
                                >
                                    <Icon size={16} />
                                    {label}
                                    {tabId === 'comentarios' && (
                                        <span className="nk-tab-counter">{vendedor.totalResenas}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* PESTAÑA: VITRINA */}
                {activeTab === 'inicio' && (
                    <div className="nk-vitrina-stack">
                        <section className="nk-promo-banner">
                            <div className="nk-promo-content">
                                <span className="nk-promo-tag">
                                    <Sparkles size={13} /> Selección Nutrik
                                </span>
                                <h2 className="nk-promo-title">
                                    Impulsa tu rendimiento con suplementos 100% limpios
                                </h2>
                                <p className="nk-promo-desc">
                                    Aprovecha hasta 20% de descuento en vitaminas esenciales y envíos rápidos en Bogotá.
                                </p>
                                <button onClick={() => setActiveTab('promocion')} className="nk-promo-cta">
                                    Ver ofertas activas
                                </button>
                            </div>
                            <Leaf size={210} className="nk-promo-leaf" />
                        </section>

                        <section>
                            <div className="nk-section-head">
                                <div>
                                    <p className="nk-eyebrow">Destacados de la tienda</p>
                                    <h2 className="nk-section-title">Favoritos de la comunidad</h2>
                                </div>
                                <button onClick={() => setActiveTab('productos')} className="nk-link-all">
                                    Ver todo el catálogo ({PRODUCTOS_DEMO.length})
                                </button>
                            </div>
                            <div className="nk-grid-4">
                                {PRODUCTOS_DEMO.slice(0, 4).map((producto) => (
                                    <TarjetaProducto key={producto.id} producto={producto} />
                                ))}
                            </div>
                        </section>

                        <section className="nk-trust-grid">
                            <div className="nk-trust-card">
                                <div className="nk-trust-icon">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="nk-trust-title">Registro INVIMA verificado</h3>
                                    <p className="nk-trust-desc">
                                        Todos los suplementos cuentan con certificación sanitaria y lotes vigentes.
                                    </p>
                                </div>
                            </div>
                            <div className="nk-trust-card">
                                <div className="nk-trust-icon">
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <h3 className="nk-trust-title">Envío rápido y atención ágil</h3>
                                    <p className="nk-trust-desc">{vendedor.tiempoRespuesta}.</p>
                                </div>
                            </div>
                            <div className="nk-trust-card">
                                <div className="nk-trust-icon">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h3 className="nk-trust-title">Trayectoria en Nutrik</h3>
                                    <p className="nk-trust-desc">
                                        Miembro activo desde {vendedor.fechaRegistro} con +12,000 entregas exitosas.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* PESTAÑA: RESEÑAS */}
                {activeTab === 'comentarios' && (
                    <section className="nk-reviews-layout">
                        <div className="nk-rating-summary">
                            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                                Opiniones de clientes
                            </h2>
                            <div className="nk-rating-big-row">
                                <span className="nk-rating-number">{vendedor.rating}</span>
                                <div>
                                    <Estrellas valor={vendedor.rating} size={18} />
                                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.76rem', color: '#64748b' }}>
                                        Basado en {vendedor.totalResenas} compras verificadas
                                    </p>
                                </div>
                            </div>

                            <div className="nk-bars-list">
                                {[
                                    { estrellas: 5, porcentaje: '86%' },
                                    { estrellas: 4, porcentaje: '11%' },
                                    { estrellas: 3, porcentaje: '2%' },
                                    { estrellas: 2, porcentaje: '1%' },
                                    { estrellas: 1, porcentaje: '0%' },
                                ].map((fila) => (
                                    <div key={fila.estrellas} className="nk-bar-item">
                                        <span style={{ width: 28 }}>{fila.estrellas} ★</span>
                                        <div className="nk-bar-track">
                                            <div className="nk-bar-fill" style={{ width: fila.porcentaje }} />
                                        </div>
                                        <span style={{ width: 32, textAlign: 'right', color: '#94a3b8' }}>
                                            {fila.porcentaje}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="nk-reviews-list">
                            {RESENAS_DEMO.map((resena) => (
                                <article key={resena.id} className="nk-review-card">
                                    <div className="nk-review-header">
                                        <div className="nk-review-author-box">
                                            <div className="nk-review-avatar">
                                                {resena.autor.trim()[0]}
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>
                                                    {resena.autor}
                                                </p>
                                                <p className="nk-verified-purchase">
                                                    <CheckCircle2 size={13} /> Compra verificada · {resena.producto}
                                                </p>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                                            {resena.fecha}
                                        </span>
                                    </div>

                                    <div style={{ marginTop: '0.75rem' }}>
                                        <Estrellas valor={resena.rating} size={14} />
                                    </div>
                                    <p className="nk-review-comment">{resena.comentario}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* PESTAÑA: CATÁLOGO / NOVEDADES / OFERTAS */}
                {(activeTab === 'productos' || activeTab === 'nuevo' || activeTab === 'promocion') && (
                    <div className="nk-catalog-layout">
                        <aside className="nk-sidebar">
                            <div className="nk-sidebar-header">
                                <SlidersHorizontal size={17} color="#15803d" />
                                <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Filtros</h2>
                            </div>

                            <label className="nk-filter-label">Categorías</label>
                            <div className="nk-cat-list">
                                {CATEGORIAS.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setCategoria(item)}
                                        className={`nk-cat-btn ${categoria === item ? 'is-selected' : ''}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <div className="nk-divider" />
                            <h3 className="nk-filter-label">Contacto directo</h3>
                            <div className="nk-contact-list">
                                <p className="nk-contact-item">
                                    <Mail size={15} color="#15803d" style={{ flexShrink: 0, marginTop: 2 }} />
                                    {vendedor.correo}
                                </p>
                                <p className="nk-contact-item">
                                    <MapPin size={15} color="#15803d" style={{ flexShrink: 0, marginTop: 2 }} />
                                    {vendedor.ubicacion}
                                </p>
                            </div>
                        </aside>

                        <section style={{ minWidth: 0 }}>
                            <div className="nk-mobile-cats">
                                {CATEGORIAS.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setCategoria(item)}
                                        className={`nk-pill-btn ${categoria === item ? 'is-selected' : ''}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <div className="nk-catalog-toolbar">
                                <div>
                                    <p className="nk-eyebrow">Tienda de {vendedor.nombre}</p>
                                    <h2 className="nk-section-title">
                                        {activeTab === 'nuevo'
                                            ? 'Recién llegados'
                                            : activeTab === 'promocion'
                                                ? 'Ofertas especiales'
                                                : 'Catálogo completo'}
                                    </h2>
                                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                                        Mostrando {productosVisibles.length}{' '}
                                        {productosVisibles.length === 1 ? 'producto' : 'productos'}
                                    </p>
                                </div>

                                <div className="nk-controls-row">
                                    <div className="nk-search-box">
                                        <Search size={16} color="#94a3b8" />
                                        <input
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
                                            placeholder="Buscar suplemento, snack..."
                                            className="nk-search-input"
                                        />
                                        {busqueda && (
                                            <button onClick={() => setBusqueda('')} className="nk-clear-search">
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>

                                    <label className="nk-sort-box">
                                        <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Ordenar:</span>
                                        <select
                                            value={orden}
                                            onChange={(e) => setOrden(e.target.value)}
                                            className="nk-sort-select"
                                        >
                                            <option value="recomendados">Relevancia</option>
                                            <option value="rating">Mejor calificados</option>
                                            <option value="menor">Menor precio</option>
                                            <option value="mayor">Mayor precio</option>
                                        </select>
                                    </label>
                                </div>
                            </div>

                            {productosVisibles.length > 0 ? (
                                <div className="nk-grid-3">
                                    {productosVisibles.map((producto) => (
                                        <TarjetaProducto key={producto.id} producto={producto} />
                                    ))}
                                </div>
                            ) : (
                                <div className="nk-no-results">
                                    <div className="nk-empty-icon-box" style={{ margin: '0 auto 0.75rem' }}>
                                        <Search size={24} />
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                                        No encontramos coincidencias
                                    </h3>
                                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.88rem', color: '#64748b' }}>
                                        Intenta con otro término o restablece los filtros activos.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setBusqueda('');
                                            setCategoria('Todas');
                                        }}
                                        className="nk-reset-btn"
                                    >
                                        Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </div>
        </main>
    );
};

export default PerfilVendedor;