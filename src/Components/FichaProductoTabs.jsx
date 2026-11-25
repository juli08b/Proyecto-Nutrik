import { useState } from 'react';
import './FichaProductoTabs.css';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'additional', label: 'Additional Information' },
  { id: 'review', label: 'Review' },
];

const NUTRITION_LABELS = {
  Porción: 'Serving',
  Calorías: 'Calories',
  Proteína: 'Protein',
  Carbohidratos: 'Carbohydrates',
  Azúcares: 'Sugars',
  'Grasas totales': 'Total fat',
};

const REVIEWS = [
  {
    autor: 'Camila R.',
    estrellas: 5,
    texto:
      'Creamy and fresh, with just the right tang. It works perfectly with fruit and granola for a quick, balanced breakfast.',
  },
  {
    autor: 'Andrés M.',
    estrellas: 4,
    texto:
      'A clean ingredient list and a real protein boost. The 150 g size is ideal for an afternoon snack.',
  },
];

function Estrellas({ valor = 0 }) {
  return (
    <span className="fpt-estrellas" aria-label={`${valor} de 5 estrellas`}>
      {'★★★★★'.split('').map((estrella, i) => (
        <span key={i} className={i < valor ? 'activa' : ''}>
          {estrella}
        </span>
      ))}
    </span>
  );
}

function FichaProductoTabs({ producto }) {
  const [tabActiva, setTabActiva] = useState('description');

  const descripcion = producto.tabs?.descripcion || producto.descripcion;
  const nutricion = producto.tabs?.nutricion || [];
  const ingredientes = producto.tabs?.ingredientes || [];

  const filas = [
    ...nutricion.map((n) => ({
      atributo: NUTRITION_LABELS[n.label] || n.label,
      detalle: n.valor,
    })),
    ...(ingredientes.length
      ? [{ atributo: 'Ingredients', detalle: ingredientes.join(', ') }]
      : []),
  ];

  return (
    <section className="fpt" aria-label="Detalles del producto">
      <div className="fpt-tabs" role="tablist" aria-label="Información del producto">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`fpt-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tabActiva === t.id}
            aria-controls={`fpt-panel-${t.id}`}
            className={`fpt-tab ${tabActiva === t.id ? 'activa' : ''}`}
            onClick={() => setTabActiva(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="fpt-contenido">
        {tabActiva === 'description' && (
          <div
            id="fpt-panel-description"
            role="tabpanel"
            aria-labelledby="fpt-tab-description"
            className="fpt-description"
          >
            <p className="fpt-lead">{descripcion}</p>
            <p>
              Cada lote se elabora con leche entera pasteurizada y cultivos lácticos activos. El
              resultado es una textura espesa y cremosa, con un sabor suave que combina con fruta,
              granola o un toque de miel.
            </p>
            <div className="fpt-highlights">
              <span>Alto en proteína</span>
              <span>Cultivos activos</span>
              <span>Sin azúcares añadidos</span>
            </div>
          </div>
        )}

        {tabActiva === 'additional' && (
          <div
            id="fpt-panel-additional"
            role="tabpanel"
            aria-labelledby="fpt-tab-additional"
            className="fpt-table-wrap"
          >
            <table className="fpt-table">
              <thead>
                <tr>
                  <th scope="col">Attribute</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {filas.length ? (
                  filas.map((fila) => (
                    <tr key={fila.atributo}>
                      <td>{fila.atributo}</td>
                      <td>{fila.detalle}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">Detailed product information is not available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tabActiva === 'review' && (
          <div
            id="fpt-panel-review"
            role="tabpanel"
            aria-labelledby="fpt-tab-review"
            className="fpt-review"
          >
            <div className="fpt-review-summary">
              <strong className="fpt-review-score">
                {producto.rating ? Number(producto.rating).toFixed(1) : '4.8'}
              </strong>
              <div>
                <Estrellas valor={Math.round(producto.rating || 5)} />
                <p>
                  Based on {producto.resenas || 126} customer reviews
                </p>
              </div>
            </div>
            <div className="fpt-review-list">
              {REVIEWS.map((review) => (
                <article className="fpt-review-card" key={review.autor}>
                  <div className="fpt-review-head">
                    <strong>{review.autor}</strong>
                    <Estrellas valor={review.estrellas} />
                  </div>
                  <p>{review.texto}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FichaProductoTabs;
