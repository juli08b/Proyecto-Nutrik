import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { useProductos } from '../Context/productContext';
import './AsistenteNutrik.css';

// ---------------------------------------------------------------
// Datos base de los retos diarios del asistente.
// En el futuro estas metas vendrán de la tabla `retos_usuarios`
// (campo tipo_reto: AGUA / PROTEINA / FRUTA / ...) vía Laravel.
// ---------------------------------------------------------------
const RETOS_BASE = [
  {
    id: 'AGUA',
    icono: '💧',
    titulo: 'Tomar 2L de agua',
    detalle: 'Hidratación del día',
  },
  {
    id: 'FRUTA',
    icono: '🍎',
    titulo: 'Consumir fruta',
    detalle: 'Al menos 2 porciones',
  },
  {
    id: 'PROTEINA',
    icono: '🥚',
    titulo: 'Meta de proteína',
    detalle: 'Incluir proteína en tus comidas',
  },
];

// Mensajes que dispara NutryBot como recordatorios/consejos flotantes.
const RECORDATORIOS = [
  { texto: '¡Hora de hidratarse! 💧', tipo: 'agua' },
  { texto: 'No olvides tu proteína del día 💪', tipo: 'proteina' },
  { texto: 'Un buen hábito hoy es una mejor salud mañana 🌿', tipo: 'general' },
  { texto: 'Recuerda completar tus retos diarios ✅', tipo: 'general' },
  { texto: 'Cuida tu estómago: come despacio y sin prisa 🍵', tipo: 'general' },
];

// NutryBot es un CONSEJERO personalizado, no un vendedor. Según el perfil
// del usuario (dieta, alergias, enfermedades, objetivo) devuelve:
//   - etiqueta: chip que ve el usuario
//   - consejos: recomendaciones en tono de ayuda (no de venta)
//   - evitar: palabras que delatan un producto que NO le conviene
const PERFILES_MAPA = [
  {
    clave: 'vegetariano',
    etiqueta: 'Vegetariano',
    sinonimos: ['vegetarian'],
    evitar: [],
    consejos: [
      'Combina legumbres con cereales para completar proteínas de calidad.',
      'Incluye huevo y lácteos si los consumes, y suplementos de hierro/B12 como apoyo.',
    ],
  },
  {
    clave: 'vegano',
    etiqueta: 'Vegano',
    sinonimos: ['vegan'],
    evitar: [],
    consejos: [
      'Vigila la vitamina B12, hierro y omega-3: suelen requerir suplementación.',
      'Aprovecha proteína vegetal (soya, quinoa, garbanzo) en cada comida.',
    ],
  },
  {
    clave: 'gluten',
    etiqueta: 'Sin gluten',
    sinonimos: ['gluten', 'celiac'],
    evitar: ['trigo', 'gluten', 'pan', 'harina', 'pasta', 'galleta'],
    consejos: [
      'Revisa etiquetas: busca el sello "sin gluten" en cada producto.',
      'Prefiere opciones naturales de origen certificado para evitar contaminación cruzada.',
    ],
  },
  {
    clave: 'lactosa',
    etiqueta: 'Sin lactosa',
    sinonimos: ['lactosa'],
    evitar: ['lactosa', 'leche', 'queso', 'yogur', 'crema'],
    consejos: [
      'Prefiere proteínas de origen vegetal o aislados sin lactosa.',
      'Asegura tu calcio con opciones fortificadas o suplementos.',
    ],
  },
  {
    clave: 'gastritis',
    etiqueta: 'Estómago sensible',
    sinonimos: ['gastritis', 'colon', 'acidez', 'reflujo', 'ulcera', 'úlcera'],
    evitar: ['picante', 'frito', 'fritura', 'gaseosa', 'picantes'],
    consejos: [
      'Evita comidas muy condimentadas y elige fórmulas suaves para tu estómago.',
      'Come en porciones pequeñas y frecuentes para no irritar la mucosa.',
    ],
  },
  {
    clave: 'azucar',
    etiqueta: 'Bajo en azúcar',
    sinonimos: ['diabetes', 'azucar', 'azúcar', 'glucosa', 'insulina'],
    evitar: ['azucar', 'azúcar', 'caramelo', 'dulce', 'gaseosa', 'jarabe'],
    consejos: [
      'Elige productos sin azúcar añadida o con edulcorantes aptos.',
      'Prioriza carbohidratos de bajo índice glucémico.',
    ],
  },
];

// Consejos según el objetivo declarado (subir o bajar de peso).
const CONSEJOS_OBJETIVO = [
  {
    clave: 'subir',
    sinonimos: ['subir', 'aumentar', 'ganar', 'masa', 'volumen'],
    etiqueta: 'Ganar peso/masa',
    consejos: [
      'Prioriza proteína de calidad y un ligero superávit calórico diario.',
      'Reparte las comidas en 5-6 tomas para sumar calorías con facilidad.',
    ],
  },
  {
    clave: 'bajar',
    sinonimos: ['bajar', 'perder', 'adelgazar', 'reducir', 'deficit', 'déficit'],
    etiqueta: 'Bajar de peso',
    consejos: [
      'Mantén alta la proteína para preservar músculo en déficit calórico.',
      'Suma fibra y agua para controlar el apetito de forma saludable.',
    ],
  },
  {
    clave: 'mantener',
    sinonimos: ['mantener', 'tonificar', 'definir'],
    etiqueta: 'Mantener/tonificar',
    consejos: [
      'Equilibra proteína y carbohidratos según tu nivel de actividad.',
      'La constancia importa más que la intensidad: pequeños hábitos diarios.',
    ],
  },
];

const STORAGE_RETOS = 'nutrik_retos_diarios';
const STORAGE_POS = 'nutrybot_pos';

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

// Posición inicial del avatar: esquina inferior derecha (como antes).
function posicionInicial() {
  const ancho = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const alto = typeof window !== 'undefined' ? window.innerHeight : 800;
  return { x: ancho - 86, y: alto - 30 - 62 };
}

function cargarPosicionGuardada() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_POS));
    if (
      guardado &&
      typeof guardado.x === 'number' &&
      typeof guardado.y === 'number'
    ) {
      return evitarWhatsApp(guardado.x, guardado.y);
    }
  } catch {
    /* posición vacía o corrupta */
  }
  return null;
}

// Zona ocupada por el botón de WhatsApp (esquina inferior derecha).
// Si NutryBot entra ahí, se empuja fuera para que nunca se solapen.
function evitarWhatsApp(x, y) {
  const waAncho = 60; // ancho aproximado del botón flotante
  const waLeft = window.innerWidth - (24 + waAncho + 12); // right + ancho + margen
  const waBottom = 104; // bottom del botón de WhatsApp
  const waTop = window.innerHeight - waBottom - 12;
  if (x + 62 > waLeft && y + 62 > waTop) {
    const distArriba = y + 62 - waTop;
    const distIzquierda = x + 62 - waLeft;
    if (distIzquierda < distArriba) return { x: waLeft - 62, y };
    return { x, y: waTop - 62 };
  }
  return { x, y };
}

// Detecta qué perfiles/preferencias están activos según el usuario.
function detectarPerfiles(user) {
  const texto = [
    user?.alergia,
    user?.dieta,
    user?.restricciones,
    user?.objetivo,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (!texto) return [];

  return PERFILES_MAPA.filter((r) => r.sinonimos.some((s) => texto.includes(s)));
}

// Detecta el objetivo de peso (subir/bajar/mantener) del usuario.
function detectarObjetivo(user) {
  const texto = [user?.objetivo, user?.dieta, user?.restricciones]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (!texto) return null;

  return (
    CONSEJOS_OBJETIVO.find((o) => o.sinonimos.some((s) => texto.includes(s))) ||
    null
  );
}

function cargarRetosGuardados() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_RETOS));
    if (guardado && guardado.fecha === hoyISO()) {
      return guardado.estado || {};
    }
  } catch {
    /* estado vacío o corrupto */
  }
  return {};
}

function AsistenteNutrik() {
  const { user } = useAuth();
  const { productos } = useProductos();

  const [abierto, setAbierto] = useState(false);
  const [tab, setTab] = useState('retos');
  const [estado, setEstado] = useState(cargarRetosGuardados);
  const [toasts, setToasts] = useState([]);
  const [pulso, setPulso] = useState(false);
  const [pos, setPos] = useState(() => cargarPosicionGuardada() || posicionInicial());

  const idToastRef = useRef(0);
  const panelRef = useRef(null);

  // Arrastre del avatar: guardamos el desplazamiento inicial del puntero
  // respecto a la posición del avatar para moverlo suavemente.
  const dragRef = useRef(null);
  const [arrastrando, setArrastrando] = useState(false);

  // Mantener el avatar dentro de la pantalla al redimensionar.
  useEffect(() => {
    const onResize = () => {
      setPos((p) => {
        const x = Math.min(p.x, window.innerWidth - 62 - 8);
        const y = Math.min(p.y, window.innerHeight - 62 - 8);
        return evitarWhatsApp(x, y);
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Guardar la posición elegida por el usuario.
  useEffect(() => {
    localStorage.setItem(STORAGE_POS, JSON.stringify(pos));
  }, [pos]);

  const onPointerDown = (e) => {
    // Solo con botón principal y sobre el avatar (no sobre el panel).
    dragRef.current = {
      offsetX: e.clientX - pos.x,
      offsetY: e.clientY - pos.y,
      movido: false,
    };
    setArrastrando(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const { offsetX, offsetY } = dragRef.current;
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    // Limitar a los bordes de la ventana (con un pequeño margen).
    x = Math.max(8, Math.min(x, window.innerWidth - 62 - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - 62 - 8));

    // Nunca dejar NutryBot encima del botón de WhatsApp.
    ({ x, y } = evitarWhatsApp(x, y));

    if (Math.abs(x - pos.x) > 2 || Math.abs(y - pos.y) > 2) {
      dragRef.current.movido = true;
    }
    setPos({ x, y });
  };

  const onPointerUp = (e) => {
    if (dragRef.current) {
      // Si no hubo movimiento real, lo tratamos como clic para abrir.
      if (!dragRef.current.movido) {
        setAbierto((v) => !v);
      }
      dragRef.current = null;
    }
    setArrastrando(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  // Persistencia local (por día). Cuando exista backend, aquí irá el
  // POST/PUT a Laravel sobre la tabla `retos_usuarios`.
  useEffect(() => {
    localStorage.setItem(
      STORAGE_RETOS,
      JSON.stringify({ fecha: hoyISO(), estado })
    );
  }, [estado]);

  const perfiles = useMemo(() => detectarPerfiles(user), [user]);
  const objetivo = useMemo(() => detectarObjetivo(user), [user]);

  // Consejos personalizados (dieta, alergias, enfermedades y objetivo).
  // NutryBot aconseja, no vende: son recomendaciones de hábitos.
  const consejos = useMemo(() => {
    const lista = [];
    perfiles.forEach((p) => lista.push(...p.consejos));
    if (objetivo) lista.push(...objetivo.consejos);
    return lista.slice(0, 5);
  }, [perfiles, objetivo]);

  // Productos (suplementos, no perecederos) que NO le hacen daño según sus
  // restricciones. Si no hay restricciones, se muestran los más recientes.
  const sugerencias = useMemo(() => {
    const lista = productos || [];
    const sugeridos = lista.filter((p) => {
      const campo = `${p.nombre} ${p.categoria} ${p.descripcion}`.toLowerCase();
      return !perfiles.some((r) => r.evitar.some((t) => campo.includes(t)));
    });
    return sugeridos.slice(0, 4);
  }, [productos, perfiles]);

  const agregarToast = (texto, tipo = 'general') => {
    const id = ++idToastRef.current;
    setToasts((prev) => [...prev, { id, texto, tipo }]);
    setPulso(true);
    setTimeout(() => setPulso(false), 900);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  // Recordatorios automáticos al iniciar sesión (solo clientes con sesión).
  useEffect(() => {
    if (!user) return;
    const inicial = setTimeout(() => {
      const msg = RECORDATORIOS[Math.floor(Math.random() * RECORDATORIOS.length)];
      agregarToast(msg.texto, msg.tipo);
    }, 3500);
    return () => clearTimeout(inicial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Cerrar el panel al hacer clic fuera.
  useEffect(() => {
    if (!abierto) return;
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [abierto]);

  const toggleReto = (id) =>
    setEstado((prev) => ({ ...prev, [id]: !prev[id] }));

  const completados = RETOS_BASE.filter((r) => estado[r.id]).length;
  const progreso = Math.round((completados / RETOS_BASE.length) * 100);

  const nombreCorto = user
    ? (user.primerNombre || user.nombreCompleto || 'amig@').split(' ')[0]
    : 'invitad@';

  // Si el avatar está pegado a la izquierda, el panel se abre hacia la
  // derecha para no salirse de la pantalla.
  const panelDerecha =
    typeof window !== 'undefined' && pos.x < 380;

  return (
    <>
      {/* Notificaciones flotantes */}
      <div className="nutrik-toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`nutrik-toast ${t.tipo}`}>
            <span className="nutrik-toast-avatar">👵</span>
            <div className="nutrik-toast-cuerpo">
              <strong>NutryBot</strong>
              <p>{t.texto}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Avatar + panel (el contenedor se posiciona según `pos`, arrastrable) */}
      <div
        className="nutrik-asistente"
        ref={panelRef}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <button
          type="button"
          className={`nutrik-avatar ${pulso ? 'pulso' : ''} ${arrastrando ? 'arrastrando' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          aria-label="Abrir NutryBot"
          aria-expanded={abierto}
        >
          <span className="nutrik-avatar-cara">👵</span>
          {user && <span className="nutrik-avatar-badge" />}
        </button>
        {abierto && (
          <div
            className={`nutrik-panel ${panelDerecha ? 'hacia-derecha' : ''}`}
            role="dialog"
            aria-label="NutryBot"
          >
            <header className="nutrik-panel-cabecera">
              <div className="nutrik-panel-avatar">👵</div>
              <div>
                <h3>NutryBot</h3>
                <p>Hola, {nombreCorto} 👋 ¿te ayudo hoy?</p>
              </div>
              <button
                className="nutrik-panel-cerrar"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar NutryBot"
              >
                ✕
              </button>
            </header>

            <nav className="nutrik-tabs">
              <button
                className={tab === 'retos' ? 'activo' : ''}
                onClick={() => setTab('retos')}
              >
                🎯 Retos
              </button>
              <button
                className={tab === 'sugerencias' ? 'activo' : ''}
                onClick={() => setTab('sugerencias')}
              >
                💡 Consejos
              </button>
            </nav>

            <div className="nutrik-panel-cuerpo">
              {tab === 'retos' && (
                <>
                  <div className="nutrik-progreso">
                    <div className="nutrik-progreso-info">
                      <span>Progreso de hoy</span>
                      <strong>{progreso}%</strong>
                    </div>
                    <div className="nutrik-progreso-barra">
                      <span style={{ width: `${progreso}%` }} />
                    </div>
                  </div>

                  <ul className="nutrik-retos">
                    {RETOS_BASE.map((reto) => (
                      <li
                        key={reto.id}
                        className={`nutrik-reto ${estado[reto.id] ? 'hecho' : ''}`}
                      >
                        <span className="nutrik-reto-icono">{reto.icono}</span>
                        <div className="nutrik-reto-texto">
                          <strong>{reto.titulo}</strong>
                          <small>{reto.detalle}</small>
                        </div>
                        <button
                          className="nutrik-reto-boton"
                          onClick={() => toggleReto(reto.id)}
                        >
                          {estado[reto.id] ? '✔ Hecho' : 'Marcar'}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="nutrik-simular"
                    onClick={() => {
                      const msg =
                        RECORDATORIOS[Math.floor(Math.random() * RECORDATORIOS.length)];
                      agregarToast(msg.texto, msg.tipo);
                    }}
                  >
                    🔔 Simular notificación
                  </button>
                </>
              )}

              {tab === 'sugerencias' && (
                <>
                  {/* Consejos personalizados (NutryBot aconseja, no vende) */}
                  {perfiles.length > 0 || objetivo ? (
                    <p className="nutrik-sugerencias-nota">
                      Consejos según tu perfil:{' '}
                      {objetivo && (
                        <span className="nutrik-chip">{objetivo.etiqueta}</span>
                      )}
                      {perfiles.map((r) => (
                        <span key={r.clave} className="nutrik-chip">
                          {r.etiqueta}
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p className="nutrik-sugerencias-nota">
                      Completa tus alergias, dieta y objetivo en tu perfil para
                      recibir consejos personalizados.
                    </p>
                  )}

                  {consejos.length > 0 && (
                    <ul className="nutrik-consejos">
                      {consejos.map((c, i) => (
                        <li key={i} className="nutrik-consejo">
                          <span className="nutrik-consejo-icono">💡</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <h4 className="nutrik-subtitulo">Productos que te ayudan</h4>
                  <p className="nutrik-sugerencias-nota">
                    Suplementos y productos de salud que no incluyen tus
                    restricciones.
                  </p>

                  <div className="nutrik-sugerencias">
                    {sugerencias.length === 0 && (
                      <p className="nutrik-vacio">
                        Aún no hay productos disponibles.
                      </p>
                    )}
                    {sugerencias.map((p) => (
                      <Link
                        key={p.id}
                        className="nutrik-sugerencia"
                        to={`/Productview/${p.id}`}
                        onClick={() => setAbierto(false)}
                      >
                        <div className="nutrik-sugerencia-media">
                          {p.imagen ? (
                            <img src={p.imagen} alt={p.nombre} />
                          ) : (
                            <span>🧴</span>
                          )}
                        </div>
                        <div className="nutrik-sugerencia-info">
                          <strong>{p.nombre}</strong>
                          <small>{p.categoria || 'Nutrik'}</small>
                          <span className="nutrik-sugerencia-precio">
                            ${Number(p.precio || 0).toLocaleString('es-CO')}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AsistenteNutrik;
