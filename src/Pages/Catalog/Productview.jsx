import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../checkout/Cart';
import { useAuth } from '../../Context/authContext';
import { registrarActividad } from '../../utils/actividad';
import { useProductos } from '../../Context/productContext';
import {
  buscarProducto,
  productosTienda,
  precioFinal,
  formatearPrecio,
  descuentoActivo,
} from '../../data/productosData';
import FichaProductoTabs from '../../Components/FichaProductoTabs';
import { ShieldCheck, Truck, RotateCcw, ShoppingCart, Star, Sparkles } from 'lucide-react';

function tipoProducto(producto) {
  const texto = `${producto.nombre} ${producto.descripcion}`.toLowerCase();
  if (/proteina|protein|whey|suero/.test(texto)) return 'proteina';
  if (/creatina|colageno|omega|maca/.test(texto)) return 'bienestar';
  if (/yogur|bebida|leche|te verde|detox/.test(texto)) return 'bebida';
  return 'snack';
}

function Estrellas({ valor = 0 }) {
  const llenas = Math.round(valor);
  return (
    <div className="flex items-center gap-0.5 text-gray-200" aria-label={`${valor} de 5 estrellas`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < llenas ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent'}
        />
      ))}
    </div>
  );
}

function ProductviewContent({ producto }) {
  const { agregarProducto, setCarritoAbierto } = useCart();
  const { user } = useAuth(); // <-- TRAEMOS AL USUARIO AQUÍ
  const vistaRegistrada = useRef(false);

  useEffect(() => {
    if (vistaRegistrada.current || !user) return;
    vistaRegistrada.current = true;

    registrarActividad({
      tipo: 'vista_producto',
      accion: 'Vio un producto',
      descripcion: `Consultó la ficha de ${producto.nombre}`,
      usuario: user,
      detalles: {
        producto: producto.nombre,
        categoria: producto.categoria?.nombre || '',
      },
    });
  }, [producto.nombre, producto.categoria, user]);

  const presentaciones = useMemo(
    () => (producto.presentaciones?.length ? producto.presentaciones : null),
    [producto.presentaciones]
  );
  const [presentacionId, setPresentacionId] = useState(presentaciones?.[0]?.id ?? null);
  const [cantidad, setCantidad] = useState(1);

  const presentacionActiva = useMemo(() => {
    if (!presentaciones) return null;
    return presentaciones.find((p) => p.id === presentacionId) || presentaciones[0];
  }, [presentaciones, presentacionId]);

  const precioBase = presentacionActiva?.precio ?? producto.precio;
  const productoPrecio = { ...producto, precio: precioBase };
  const tieneDescuento = descuentoActivo(productoPrecio);
  const precio = precioFinal(productoPrecio);

  const itemSeleccionado = () => ({
    ...producto,
    id: presentacionActiva ? `${producto.id}-${presentacionActiva.id}` : producto.id,
    productoId: producto.id,
    nombre: presentacionActiva
      ? `${producto.nombre} (${presentacionActiva.label})`
      : producto.nombre,
    precio,
    presentacion: presentacionActiva?.label,
  });

  const manejarAgregar = () => {
    agregarProducto(itemSeleccionado(), cantidad);
    setCarritoAbierto(true);
  };

  const preguntarAlBot = () => {
    window.dispatchEvent(
      new CustomEvent('nutrik:show-product-recipe', { detail: producto })
    );
  };

  const productosRelacionados = productosTienda
    .filter((otro) => otro.id !== producto.id)
    .sort(
      (a, b) =>
        Number(tipoProducto(b) === tipoProducto(producto)) -
        Number(tipoProducto(a) === tipoProducto(producto))
    )
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50/50">

      {/* Breadcrumb sutil */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 px-2" aria-label="Ruta de navegación">
        <Link to="/" className="hover:text-green-700 transition-colors">Inicio</Link>
        <span className="text-gray-300">/</span>
        <Link to={producto.categoria ? `/catalog/${producto.categoria.slug}` : '/productos'} className="hover:text-green-700 transition-colors">
          {producto.categoria?.nombre || 'Productos'}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium truncate">{producto.nombre}</span>
      </nav>

      {/* Tarjeta Principal */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row mb-12">

        {/* Imagen del Producto */}
        <div className="w-full lg:w-1/2 bg-gray-50/50 flex items-center justify-center p-10 relative min-h-[400px]">
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-green-800 shadow-sm border border-green-100 flex items-center gap-1.5">
            <Sparkles size={14} /> Selección Nutrik
          </div>

          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full max-w-md h-auto object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-500 ease-out"
          />

          {tieneDescuento && (
            <div className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-md animate-pulse">
              -{producto.descuento}% OFF
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">

          {/* Etiquetas */}
          <div className="flex gap-2 mb-3">
            {producto.etiqueta === 'nuevo' && (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Recién llegado
              </span>
            )}
            {producto.etiqueta === 'descuento' && tieneDescuento && (
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Oferta especial
              </span>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
            {producto.nombre}
          </h1>

          {/* Rating */}
          {producto.rating && (
            <div className="flex items-center gap-2 mb-4">
              <Estrellas valor={producto.rating} />
              <span className="text-sm font-bold text-gray-700">{producto.rating}</span>
              <span className="text-sm text-gray-400">({producto.resenas} opiniones)</span>
            </div>
          )}

          <p className="text-gray-500 text-base leading-relaxed mb-6">
            {producto.descripcion}
          </p>

          {/* Precio */}
          <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            {tieneDescuento && (
              <p className="text-sm text-gray-400 line-through mb-1">
                Precio regular: ${formatearPrecio(productoPrecio.precio)}
              </p>
            )}
            <div className="flex items-end gap-3">
              <h2 className="text-4xl font-black text-green-800 tracking-tight">
                ${formatearPrecio(precio)}
              </h2>
              {tieneDescuento && (
                <span className="bg-green-100 text-green-800 text-sm font-bold px-2 py-1 rounded-md mb-1">
                  Ahorras ${formatearPrecio(productoPrecio.precio - precio)}
                </span>
              )}
            </div>
            <p className="text-xs text-green-700 font-medium mt-2 flex items-center gap-1">
              <ShieldCheck size={14} /> Disponible en el catálogo Nutrik
            </p>
          </div>

          {/* Presentaciones */}
          {presentaciones && (
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-800 mb-3">Selecciona presentación:</p>
              <div className="flex flex-wrap gap-2">
                {presentaciones.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPresentacionId(p.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${presentacionActiva?.id === p.id
                      ? 'bg-green-50 border-green-600 text-green-800 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad y Bot */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors text-xl font-medium"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-gray-800 text-lg">{cantidad}</span>
              <button
                onClick={() => setCantidad((c) => c + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors text-xl font-medium"
              >
                +
              </button>
            </div>

            <button
              onClick={preguntarAlBot}
              className="flex-1 py-3 px-4 bg-green-50 text-green-800 text-sm font-bold rounded-xl border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> Pregúntale a Nutribot
            </button>
          </div>

          {/* Botón de Carrito */}
          <button
            onClick={manejarAgregar}
            className="w-full py-4 bg-green-800 text-white text-lg font-bold rounded-2xl shadow-xl shadow-green-800/20 hover:bg-green-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 mb-8"
          >
            <ShoppingCart className="w-6 h-6" />
            Agregar al carrito
          </button>

          {/* ==========================================
              BLOQUE DEL VENDEDOR
              ========================================== */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-900 font-bold text-lg border-2 border-white shadow-sm">
                {/* Tomamos la inicial del vendedorNombre del producto, o si no, la del usuario logueado */}
                {(producto.vendedorNombre || user?.primerNombre || 'Y').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Vendido por</p>

                {/* Aquí está la magia: Si el producto trae vendedorNombre, lo usa. Si no, usa el nombre del user logueado */}
                <p className="font-bold text-gray-900">
                  {producto.vendedorNombre || user?.nombreCompleto || `${user?.primerNombre || ''} ${user?.primerApellido || ''}`.trim() || 'Vendedor Nutrik'}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-green-600 font-semibold mt-0.5">
                  <ShieldCheck size={12} /> Vendedor Verificado
                </div>
              </div>
            </div>
            <Link
              to={`/vendedor/${producto.vendedorId || user?.id || 1}`}
              className="px-4 py-2 bg-white text-green-800 font-bold text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Ver perfil
            </Link>
          </div>

          {/* Beneficios */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <div className="p-1.5 bg-green-50 rounded-lg"><Truck size={18} className="text-green-600" /></div> Envío rápido
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <div className="p-1.5 bg-green-50 rounded-lg"><RotateCcw size={18} className="text-green-600" /></div> Devolución fácil
            </div>
          </div>

        </div>
      </div>

      {/* Tabs y Relacionados */}
      <div className="mt-16">
        <FichaProductoTabs producto={producto} />

        <section className="mt-20">
          <div className="flex items-end justify-between mb-8 px-2">
            <div>
              <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1">Completa tu compra</p>
              <h2 className="text-3xl font-extrabold text-gray-900">También te puede gustar</h2>
            </div>
            <Link to="/productos" className="hidden md:block text-sm font-bold text-green-700 hover:text-green-900 border-b-2 border-transparent hover:border-green-700 transition-colors pb-1">
              Ver todo el catálogo
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosRelacionados.map((otro) => (
              <div key={otro.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative bg-gray-50 aspect-square flex items-center justify-center p-6 overflow-hidden">
                  {descuentoActivo(otro) && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                      -{otro.descuento}% OFF
                    </div>
                  )}
                  <img
                    src={otro.imagen}
                    alt={otro.nombre}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{otro.nombre}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">{otro.descripcion}</p>

                  <div className="flex items-center gap-2 mb-4">
                    {descuentoActivo(otro) && (
                      <span className="text-xs text-gray-400 line-through">${formatearPrecio(otro.precio)}</span>
                    )}
                    <span className="text-xl font-black text-green-800">${formatearPrecio(precioFinal(otro))}</span>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link to={`/Productview/${otro.id}`} className="flex-1 text-center py-2.5 bg-gray-50 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
                      Ver
                    </Link>
                    <button
                      onClick={() => {
                        agregarProducto({ ...otro, precio: precioFinal(otro) });
                        setCarritoAbierto(true);
                      }}
                      className="flex-1 py-2.5 bg-green-800 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md shadow-green-800/10"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Productview() {
  const { id } = useParams();
  const { productos } = useProductos();

  const productoApi = productos.find((item) => String(item.id) === String(id));
  const producto = buscarProducto(id) || productoApi;

  if (!producto) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Producto no encontrado</h1>
      </div>
    );
  }

  return <ProductviewContent key={producto.id} producto={producto} />;
}

export default Productview;