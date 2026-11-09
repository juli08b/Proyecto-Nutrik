import './Product.css';
import { Link, useParams } from "react-router-dom";
import { useCart } from './Cart';
import { useAuth } from '../../Context/authContext';
import {
  buscarProducto,
  productosTienda,
  precioFinal,
  formatearPrecio,
  descuentoActivo,
} from '../../data/productosData';
import { recetaParaProducto } from '../../data/recetasProductos';
import imagenReceta from '../../assets/comida.jpg';

function tipoProducto(producto) {
  const texto = `${producto.nombre} ${producto.descripcion}`.toLowerCase();
  if (/proteina|protein|whey|suero/.test(texto)) return 'proteina';
  if (/creatina|colageno|omega|maca/.test(texto)) return 'bienestar';
  if (/yogur|bebida|leche|te verde|detox/.test(texto)) return 'bebida';
  return 'snack';
}

function Productview() {
  const { id } = useParams();
  const { agregarProducto, setCarritoAbierto } = useCart();
  const { user } = useAuth();

  const producto = buscarProducto(id);

  if (!producto) {
    return <h1 className="producto-no-encontrado">Producto no encontrado</h1>;
  }

  const manejarAgregar = () => {
    agregarProducto({ ...producto, precio: precioFinal(producto) });
    setCarritoAbierto(true);
  };

  const preguntarAlBot = () => {
    window.dispatchEvent(
      new CustomEvent('nutrik:show-product-recipe', { detail: producto })
    );
  };

  const tieneDescuento = descuentoActivo(producto);
  const receta = recetaParaProducto(producto, user);
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
      <div className="vista-producto">
        <div className="imagen-producto">
          <div className="producto-imagen-etiqueta">Nutrik · selección saludable</div>
          <img src={producto.imagen} alt={producto.nombre} />
          {tieneDescuento && (
            <div className="desc-badge firma-badge">
              -{producto.descuento}% OFF
            </div>
          )}
        </div>

        <div className="info-producto">
          {producto.etiqueta === "nuevo" && (
            <span className="producto-tag-nuevo">✨ Recién llegado</span>
          )}
          {producto.etiqueta === "descuento" && tieneDescuento && (
            <span className="producto-tag-nuevo descuento">🔥 Oferta especial</span>
          )}

          <h1>{producto.nombre}</h1>

          <p className="descripcion-producto">{producto.descripcion}</p>

          <p className="producto-detalle-disponibilidad">
            <span aria-hidden="true">✓</span> Disponible en el catálogo Nutrik
          </p>

          {tieneDescuento && (
            <p className="precio-original-producto">
              Antes: ${formatearPrecio(producto.precio)}
            </p>
          )}

          <div className="producto-detalle-precio">
            <h2 className="precio-producto">
              ${formatearPrecio(precioFinal(producto))}
            </h2>
            {tieneDescuento && (
              <span className="producto-detalle-descuento">
                Ahorras ${formatearPrecio(producto.precio - precioFinal(producto))}
              </span>
            )}
          </div>

          <div className="acciones-producto">
            <button className="btn-carrito" onClick={manejarAgregar}>
              🛒 Agregar al carrito
            </button>
          </div>
          <button className="producto-preguntar-bot" onClick={preguntarAlBot}>
            👵 Pregúntale a Nutribot cómo prepararlo
          </button>
        </div>
      </div>

      <div className="producto-secciones">
        <section className="producto-receta" aria-labelledby="producto-receta-titulo">
          <div className="producto-receta-detalle">
            <div className="producto-receta-texto">
              <p className="producto-receta-etiqueta">
                ✦ Nutribot te recomienda con {producto.nombre}
              </p>
              <h2 id="producto-receta-titulo">{receta.titulo}</h2>
              <div className="producto-receta-meta">
                <span>◷ Preparación sencilla</span>
                <span>
                  ✦ {user ? 'Adaptada a tu perfil' : 'Fácil de adaptar a tu gusto'}
                </span>
              </div>
              <div className="producto-receta-contenido">
                <article className="producto-receta-bloque">
                  <div className="producto-receta-bloque-cabecera">
                    <span className="producto-receta-bloque-icono" aria-hidden="true">♧</span>
                    <div>
                      <h3>Ingredientes</h3>
                      <small>{receta.ingredientes.length} elementos</small>
                    </div>
                  </div>
                  <ul className="producto-receta-ingredientes">
                    {receta.ingredientes.map((ingrediente) => (
                      <li key={ingrediente}>{ingrediente}</li>
                    ))}
                  </ul>
                </article>
                <article className="producto-receta-bloque">
                  <div className="producto-receta-bloque-cabecera">
                    <span className="producto-receta-bloque-icono" aria-hidden="true">↗</span>
                    <div>
                      <h3>Preparación</h3>
                      <small>Un paso sencillo</small>
                    </div>
                  </div>
                  <div className="producto-receta-paso">
                    <span aria-hidden="true">1</span>
                    <p className="producto-receta-pasos">{receta.pasos}</p>
                  </div>
                  {receta.aviso.map((aviso) => (
                    <p className="producto-receta-aviso" key={aviso}>
                      {aviso}
                    </p>
                  ))}
                  <p className="producto-receta-disclaimer">
                    Revisa la etiqueta. Esta sugerencia no reemplaza la
                    orientación de un profesional de salud.
                  </p>
                </article>
              </div>
              <button className="producto-receta-boton" onClick={preguntarAlBot}>
                ✦ Ver receta completa con Nutribot <span aria-hidden="true">→</span>
              </button>
            </div>
            <aside className="producto-receta-visual">
              <img src={imagenReceta} alt="Ingredientes frescos para una receta saludable" />
              <div className="producto-receta-visual-info">
                <span>Una idea rica y sencilla</span>
                <strong>Preparada a tu manera</strong>
                <small>Personalizada por Nutribot</small>
              </div>
            </aside>
          </div>
        </section>

        <section
          className="productos-relacionados"
          aria-labelledby="productos-relacionados-titulo"
        >
          <div className="productos-relacionados-cabecera">
            <div>
              <p className="producto-receta-etiqueta">Completa tu compra</p>
              <h2 id="productos-relacionados-titulo">
                También te puede gustar
              </h2>
            </div>
            <Link to="/productos">Ver todo el catálogo →</Link>
          </div>
          <div className="productos-relacionados-grid">
            {productosRelacionados.map((otro) => (
              <article className="producto-relacionado" key={otro.id}>
                <div className="producto-relacionado-media">
                  <Link
                    className="producto-relacionado-imagen"
                    to={`/Productview/${otro.id}`}
                    aria-label={`Ver ${otro.nombre}`}
                  >
                    <img src={otro.imagen} alt={otro.nombre} loading="lazy" />
                  </Link>
                  {descuentoActivo(otro) && (
                    <span className="producto-relacionado-descuento">
                      -{otro.descuento}% OFF
                    </span>
                  )}
                </div>
                <div className="producto-relacionado-info">
                  <h3>{otro.nombre}</h3>
                  <p>{otro.descripcion}</p>
                  <div className="producto-relacionado-pie">
                    <div className="producto-relacionado-precio">
                      {descuentoActivo(otro) && (
                        <del>${formatearPrecio(otro.precio)}</del>
                      )}
                      <strong>${formatearPrecio(precioFinal(otro))}</strong>
                    </div>
                    <Link to={`/Productview/${otro.id}`}>Ver producto <span aria-hidden="true">→</span></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Productview;