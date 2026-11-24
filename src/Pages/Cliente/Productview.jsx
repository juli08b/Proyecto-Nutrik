import './Product.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from './Cart';
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
    <span className="producto-rating-estrellas" aria-label={`${valor} de 5 estrellas`}>
      {'★★★★★'.split('').map((s, i) => (
        <span key={i} className={i < llenas ? 'activa' : ''}>{s}</span>
      ))}
    </span>
  );
}

function ProductviewContent({ producto }) {
  const { agregarProducto, setCarritoAbierto } = useCart();
  const { user } = useAuth();
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
    <div className="contenedor-vistas">
      <nav className="producto-breadcrumb" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <Link to={producto.categoria ? `/catalog/${producto.categoria.slug}` : '/productos'}>
          {producto.categoria?.nombre || 'Productos'}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="actual">{producto.nombre}</span>
      </nav>

      <div className="vista-producto vista-producto--detalle">
        <div className="imagen-producto">
          <div className="producto-imagen-etiqueta">Nutrik · selección saludable</div>
          <img src={producto.imagen} alt={producto.nombre} />
          {tieneDescuento && (
            <div className="desc-badge firma-badge">-{producto.descuento}% OFF</div>
          )}
        </div>

        <div className="info-producto">
          {producto.etiqueta === 'nuevo' && (
            <span className="producto-tag-nuevo">Recién llegado</span>
          )}
          {producto.etiqueta === 'descuento' && tieneDescuento && (
            <span className="producto-tag-nuevo descuento">Oferta especial</span>
          )}

          <h1>{producto.nombre}</h1>

          {producto.rating ? (
            <div className="producto-rating" aria-label={`Calificación ${producto.rating}`}>
              <Estrellas valor={producto.rating} />
              <strong>{producto.rating}</strong>
              <span>· {producto.resenas} opiniones</span>
            </div>
          ) : null}

          <p className="descripcion-producto">{producto.descripcion}</p>

          <p className="producto-detalle-disponibilidad">
            <span aria-hidden="true">✓</span> Disponible en el catálogo Nutrik
          </p>

          {tieneDescuento && (
            <p className="precio-original-producto">
              Antes: ${formatearPrecio(productoPrecio.precio)}
            </p>
          )}

          <div className="producto-detalle-precio">
            <h2 className="precio-producto">${formatearPrecio(precio)}</h2>
            {tieneDescuento && (
              <span className="producto-detalle-descuento">
                Ahorras ${formatearPrecio(productoPrecio.precio - precio)}
              </span>
            )}
          </div>

          {presentaciones ? (
            <div className="producto-presentaciones">
              <p className="producto-selector-label">Presentación</p>
              <div className="producto-presentaciones-opciones" role="radiogroup" aria-label="Presentación">
                {presentaciones.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={presentacionActiva?.id === p.id}
                    className={`producto-presentacion ${presentacionActiva?.id === p.id ? 'activa' : ''}`}
                    onClick={() => setPresentacionId(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="producto-compra-fila">
            <div className="producto-cantidad" aria-label="Cantidad">
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span>{cantidad}</span>
              <button
                type="button"
                onClick={() => setCantidad((c) => c + 1)}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <button className="producto-preguntar-bot producto-preguntar-bot--inline" onClick={preguntarAlBot}>
              Pregúntale a Nutribot
            </button>
          </div>

          <div className="acciones-producto">
            <button className="btn-carrito" onClick={manejarAgregar}>
              Agregar al carrito
            </button>
          </div>

          <p className="producto-envio-nota">
            {producto.envio || 'Envío disponible · Consulta condiciones en el checkout'}
          </p>
        </div>
      </div>

      <div className="producto-secciones">
        <FichaProductoTabs producto={producto} />

        <section className="productos-relacionados" aria-labelledby="productos-relacionados-titulo">
          <div className="productos-relacionados-cabecera">
            <div>
              <p className="producto-receta-etiqueta">Completa tu compra</p>
              <h2 id="productos-relacionados-titulo">También te puede gustar</h2>
            </div>
            <Link to="/productos">Ver todo el catálogo</Link>
          </div>
          <div className="productos-relacionados-grid">
            {productosRelacionados.map((otro) => (
              <div className="card-producto" key={otro.id}>
                {descuentoActivo(otro) ? (
                  <div className="producto-badge descuento">-{otro.descuento}% OFF</div>
                ) : null}
                <img className="img-producto" src={otro.imagen} alt={otro.nombre} loading="lazy" />
                <div className="producto-cuerpo">
                  <h3>{otro.nombre}</h3>
                  <p className="producto-descripcion">{otro.descripcion}</p>
                  <div className="producto-precios">
                    {descuentoActivo(otro) && (
                      <span className="producto-precio-original">${formatearPrecio(otro.precio)}</span>
                    )}
                    <span className="producto-precio">${formatearPrecio(precioFinal(otro))}</span>
                  </div>
                  <div className="producto-acciones">
                    <Link to={`/Productview/${otro.id}`} className="btn-ver">Ver producto</Link>
                    <button
                      className="btn-agregar"
                      onClick={() => {
                        agregarProducto({ ...otro, precio: precioFinal(otro) });
                        setCarritoAbierto(true);
                      }}
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
    return <h1 className="producto-no-encontrado">Producto no encontrado</h1>;
  }

  return <ProductviewContent key={producto.id} producto={producto} />;
}

export default Productview;
