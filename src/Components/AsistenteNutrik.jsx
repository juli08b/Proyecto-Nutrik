import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { useProductos } from '../Context/productContext';
import { useCart } from '../Pages/Cliente/Cart';
import {
  buscarProducto,
  productosTienda,
} from '../data/productosData';
import { recetaParaProducto } from '../data/recetasProductos';
// Mascota 3D de NutryBot (SVG local, reemplaza al emoji de la abuela).
import nutriBotClay from '../assets/nutribot-clay.svg';
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

// Los 4 retos salen de lo que el cliente elige antes de empezar su racha.
const RETO_AGUA = {
  id: 'AGUA',
  icono: '💧',
  titulo: 'Tomar 2L de agua',
  detalle: 'Hidratación del día',
};

const TIPOS_RETOS = [
  {
    id: 'dieta',
    icono: '🥗',
    etiqueta: 'Seguir mi dieta',
    detalle: 'Según tu perfil y alergias',
    retos: [
      RETO_AGUA,
      { id: 'COMIDA', icono: '🥗', titulo: '1 comida equilibrada', detalle: 'Verduras + proteína' },
      { id: 'FRUTA', icono: '🍎', titulo: 'Snack sin azúcar', detalle: '2 porciones al día' },
      { id: 'PROTEINA', icono: '🥛', titulo: 'Proteína sin lactosa', detalle: 'Elige opción sin lácteos' },
    ],
  },
  {
    id: 'comer-bien',
    icono: '🍎',
    etiqueta: 'Comer bien',
    detalle: 'Frutas, proteína y recetas',
    retos: [
      RETO_AGUA,
      { id: 'FRUTA', icono: '🍎', titulo: '2 frutas al día', detalle: 'Una en el desayuno' },
      { id: 'PROTEINA', icono: '🥚', titulo: 'Proteína en 3 comidas', detalle: 'Incluye una fuente cada comida' },
      { id: 'RECETA', icono: '🥣', titulo: 'Preparar 1 receta', detalle: 'Idea saludable de NutryBot' },
    ],
  },
  {
    id: 'hidratacion',
    icono: '💧',
    etiqueta: 'Hidratarme más',
    detalle: 'Tomar agua durante el día',
    retos: [
      RETO_AGUA,
      { id: 'VASO_MANANA', icono: '🌅', titulo: 'Vaso al despertar', detalle: 'Empieza hidratado' },
      { id: 'VASO_COMIDA', icono: '🍽️', titulo: 'Vaso antes de cada comida', detalle: '3 veces al día' },
      { id: 'VASO_NOCHE', icono: '🌙', titulo: 'Vaso antes de dormir', detalle: 'Sin excederte' },
    ],
  },
  {
    id: 'energia',
    icono: '💪',
    etiqueta: 'Más energía',
    detalle: 'Hábitos para tu día a día',
    retos: [
      RETO_AGUA,
      { id: 'CAMINAR', icono: '🚶', titulo: 'Caminar 15 minutos', detalle: 'Muévete un poco' },
      { id: 'COMIDA', icono: '🥗', titulo: 'Comida equilibrada', detalle: 'Verduras + proteína' },
      { id: 'DESCANSO', icono: '😴', titulo: 'Dormir 7 horas', detalle: 'Descansa bien' },
    ],
  },
];

// Ajusta los nombres al perfil si el cliente eligió «Seguir mi dieta».
function retosDelPerfil(perfiles, objetivo, base = RETOS_BASE) {
  const claves = perfiles.map((p) => p.clave);
  return base.map((reto) => {
    if (
      reto.id === 'FRUTA' &&
      (claves.includes('azucar') || objetivo?.clave === 'bajar')
    ) {
      return { ...reto, titulo: 'Snack sin azúcar', detalle: '2 porciones al día' };
    }
    if (reto.id === 'PROTEINA' && claves.includes('lactosa')) {
      return {
        ...reto,
        titulo: 'Proteína sin lactosa',
        detalle: 'Incluye proteína en tus comidas',
      };
    }
    return reto;
  });
}

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

// Preguntas que el cliente puede tocar en el chat de Consejos.
const PREGUNTAS_SUGERIDAS = [
  '¿Qué como para bajar de peso?',
  'Dame una receta saludable',
  'Un snack sin azúcar',
  '¿Qué proteína me sirve?',
];

// Quita del catálogo los productos que chocan con el perfil del cliente.
function productosPermitidos(lista, perfiles) {
  return lista.filter((p) => {
    const campo = `${p.nombre} ${p.categoria} ${p.descripcion}`.toLowerCase();
    return !perfiles.some((r) => r.evitar.some((t) => campo.includes(t)));
  });
}

const STORAGE_RETOS = 'nutrik_retos_diarios';
const STORAGE_SEGUIMIENTO = 'nutrik_seguimiento';
const STORAGE_TIPO = 'nutrybot_tipo_retos';
const STORAGE_POS = 'nutrybot_pos_v2';

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

// Posición inicial del avatar: esquina inferior derecha (como antes).
function posicionInicial() {
  const ancho = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const alto = typeof window !== 'undefined' ? window.innerHeight : 800;
  return { x: ancho - 86, y: alto - 30 - 62 };
}

function limitarPosicion(x, y) {
  return {
    x: Math.max(8, Math.min(x, window.innerWidth - 70)),
    y: Math.max(8, Math.min(y, window.innerHeight - 70)),
  };
}

function posicionSegura(x, y) {
  return limitarPosicion(x, y);
}

function cargarPosicionGuardada() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_POS));
    if (
      guardado &&
      typeof guardado.x === 'number' &&
      typeof guardado.y === 'number'
    ) {
      return posicionSegura(guardado.x, guardado.y);
    }
  } catch {
    /* posición vacía o corrupta */
  }
  return null;
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

function cargarSeguimiento() {
  const vacio = { racha: 0, ultimo: '', dias: {} };
  try {
    return JSON.parse(localStorage.getItem(STORAGE_SEGUIMIENTO)) || vacio;
  } catch {
    return vacio;
  }
}

// Marca el día de hoy y suma la racha solo si el anterior fue consecutivo.
function guardarDiaCompleto() {
  const seg = cargarSeguimiento();
  const hoy = hoyISO();
  if (seg.dias[hoy]) return seg;
  const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const actualizado = {
    racha: seg.ultimo === ayer ? seg.racha + 1 : 1,
    ultimo: hoy,
    dias: { ...seg.dias, [hoy]: true },
  };
  localStorage.setItem(STORAGE_SEGUIMIENTO, JSON.stringify(actualizado));
  return actualizado;
}

function AsistenteNutrik() {
  const location = useLocation();
  const { user } = useAuth();
  const { productos } = useProductos();
  const { agregarProducto, setCarritoAbierto } = useCart();

  const [abierto, setAbierto] = useState(false);
  const [tab, setTab] = useState('retos');
  const [mensajes, setMensajes] = useState([
    {
      de: 'bot',
      texto:
        '¡Hola! 👋 Cuéntame qué buscas y te recomiendo comidas, recetas o productos de la tienda.',
    },
  ]);
  const [pregunta, setPregunta] = useState('');
  const [productoComprado, setProductoComprado] = useState(null);
  const [estado, setEstado] = useState(cargarRetosGuardados);
  const [seguimiento, setSeguimiento] = useState(cargarSeguimiento);
  const [tipo, setTipo] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_TIPO) || '';
    } catch {
      return '';
    }
  });
  const [toasts, setToasts] = useState([]);
  const [pulso, setPulso] = useState(false);
  const [pos, setPos] = useState(() => {
    const inicial = posicionInicial();
    return cargarPosicionGuardada() || posicionSegura(inicial.x, inicial.y);
  });

  const idToastRef = useRef(0);
  const panelRef = useRef(null);
  const chatFinRef = useRef(null);
  const idProductoEnRuta = location.pathname.match(/^\/Productview\/([^/]+)/)?.[1];
  const productoVisto = idProductoEnRuta
    ? buscarProducto(decodeURIComponent(idProductoEnRuta))
    : null;
  const productoParaReceta = productoVisto || productoComprado;
  const recetaActual = productoParaReceta
    ? recetaParaProducto(productoParaReceta, user)
    : null;

  // Arrastre del avatar: guardamos el desplazamiento inicial del puntero
  // respecto a la posición del avatar para moverlo suavemente.
  const dragRef = useRef(null);
  const [arrastrando, setArrastrando] = useState(false);

  // Mantener el avatar dentro de la pantalla al redimensionar.
  useEffect(() => {
    const onResize = () => {
      setPos((p) => posicionSegura(p.x, p.y));
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
    const { x, y } = posicionSegura(
      e.clientX - offsetX,
      e.clientY - offsetY
    );

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
  const retos = useMemo(() => {
    const base =
      TIPOS_RETOS.find((t) => t.id === tipo)?.retos || TIPOS_RETOS[0].retos;
    return tipo === 'dieta' ? retosDelPerfil(perfiles, objetivo, base) : base;
  }, [tipo, perfiles, objetivo]);

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
  const sugerencias = useMemo(
    () => productosPermitidos(productos || [], perfiles).slice(0, 4),
    [productos, perfiles]
  );

  // Si la API aún no responde, el chat usa el catálogo local del proyecto.
  const catalogoChat = useMemo(
    () =>
      sugerencias.length
        ? sugerencias
        : productosPermitidos(productosTienda, perfiles),
    [sugerencias, perfiles]
  );

  // Respuestas preparadas: cuando se conecte la IA, aquí irá la llamada al
  // backend. Por ahora solo usa el catálogo, el perfil y las recetas actuales.
  const responderDemo = (texto) => {
    const pregunta = texto.toLowerCase();
    const encontrar = (patron) =>
      catalogoChat
        .filter((p) => patron.test(`${p.nombre} ${p.descripcion}`))
        .slice(0, 2);

    if (/receta|preparar|cocinar/.test(pregunta)) {
      const producto = catalogoChat[0];
      const receta = producto ? recetaParaProducto(producto, user) : null;
      return {
        texto: receta
          ? `Con ${producto.nombre} puedes preparar ${receta.titulo.toLowerCase()} 🥣`
          : 'Aún no hay productos disponibles para armar una receta.',
        productos: receta ? [producto] : [],
        recetaProducto: receta ? producto : null,
      };
    }

    if (/prote[ií]na|m[uú]sculo|fuerza|creatina/.test(pregunta)) {
      const productos = encontrar(/prote[ií]na|creatina|yogur|col[aá]geno/);
      return {
        texto: productos.length
          ? 'Para músculo y fuerza, combina proteína con una comida equilibrada 💪'
          : 'No encontré opciones de proteína en el catálogo.',
        productos,
      };
    }

    if (/snack|az[uú]car|dulce|antoj/.test(pregunta)) {
      const productos = encontrar(
        /granola|ch[ií]a|frutos|snack|barra|galleta|az[uú]car/
      );
      return {
        texto: productos.length
          ? 'Estas opciones sirven para un snack sin azúcar añadida 🌱'
          : 'No encontré snacks sin azúcar en el catálogo.',
        productos,
      };
    }

    if (/bajar|perder|adelgazar|diet/.test(pregunta)) {
      const consejo = consejos[0] || 'Mantén proteína y fibra en cada comida.';
      return {
        texto: `${consejo} Te sirven estas opciones de la tienda 👇`,
        productos: encontrar(
          /granola|ch[ií]a|prote[ií]na|avena|t[eé] verde|omega/
        ),
      };
    }

    if (/defensa|vitamina|resfriado|inmun/.test(pregunta)) {
      return {
        texto: 'Estas opciones aportan nutrientes para tus defensas 🍊',
        productos: encontrar(
          /vitamina|omega|jengibre|t[eé] verde|fruta|naranja/
        ),
      };
    }

    return {
      texto:
        'Solo te ayudo con comidas, recetas y productos de Nutrik. Prueba una de las preguntas de abajo 😊',
      productos: [],
    };
  };

  const enviarPregunta = (texto) => {
    const limpio = texto.trim();
    if (!limpio) return;
    setMensajes((prev) => [
      ...prev,
      { de: 'cliente', texto: limpio },
      { de: 'bot', ...responderDemo(limpio) },
    ]);
    setPregunta('');
  };

  useEffect(() => {
    if (tab === 'sugerencias') {
      chatFinRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [mensajes, tab]);

  const agregarToast = (texto, tipo = 'general') => {
    const id = ++idToastRef.current;
    setToasts((prev) => [...prev, { id, texto, tipo }]);
    setPulso(true);
    setTimeout(() => setPulso(false), 900);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  useEffect(() => {
    const alVerReceta = (event) => {
      const producto = event.detail;
      if (!producto?.id) return;
      setProductoComprado(producto);
      setTab('receta');
      setAbierto(true);
    };
    const alAgregarProducto = (event) => {
      const producto = event.detail;
      if (!producto?.id) return;
      setProductoComprado(producto);
      const receta = recetaParaProducto(producto, user);
      const combinacion = receta.ingredientes
        .filter(
          (ingrediente) =>
            !/producto|porci[oó]n indicada/i.test(ingrediente)
        )
        .join(' y ');
      const texto = `Para ${producto.nombre}: prueba ${receta.titulo.toLowerCase()}${combinacion ? ` con ${combinacion}` : ''}.`;
      const id = ++idToastRef.current;
      setToasts((prev) => [
        ...prev,
        { id, texto, tipo: 'general', productoId: producto.id },
      ]);
      setPulso(true);
      setTimeout(() => setPulso(false), 900);
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 7000);
    };

    window.addEventListener('nutrik:show-product-recipe', alVerReceta);
    window.addEventListener('nutrik:product-added', alAgregarProducto);
    return () => {
      window.removeEventListener('nutrik:show-product-recipe', alVerReceta);
      window.removeEventListener('nutrik:product-added', alAgregarProducto);
    };
  }, [user]);

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

  const elegirTipo = (id) => {
    localStorage.setItem(STORAGE_TIPO, id);
    setTipo(id);
  };

  const cambiarTipo = () => {
    localStorage.removeItem(STORAGE_TIPO);
    setTipo('');
  };

  const toggleReto = (id) => {
    const siguiente = { ...estado, [id]: !estado[id] };
    setEstado(siguiente);
    // Al completar los 3 retos: cuenta la racha y marca el día de la semana.
    if (retos.every((r) => siguiente[r.id]) && !seguimiento.dias[hoyISO()]) {
      setSeguimiento(guardarDiaCompleto());
    }
  };

  const completados = retos.filter((r) => estado[r.id]).length;
  const progreso = Math.round((completados / retos.length) * 100);

  const nombresDias = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const hoy = hoyISO();
  const diasSemana = Array.from({ length: 7 }, (_, i) => {
    const fecha = new Date(Date.parse(hoy) - (6 - i) * 86400000)
      .toISOString()
      .slice(0, 10);
    return {
      fecha,
      etiqueta: nombresDias[new Date(`${fecha}T12:00:00`).getDay()],
      hecho: !!seguimiento.dias[fecha],
    };
  });
  const diasCumplidos = diasSemana.filter((d) => d.hecho).length;
  const adhesion = Math.round((diasCumplidos / 7) * 100);

  const nombreCorto = user
    ? (user.primerNombre || user.nombreCompleto || 'amig@').split(' ')[0]
    : 'invitad@';

  const anchoPanel = Math.min(360, window.innerWidth - 32);
  const panelArriba = pos.y >= window.innerHeight / 2;
  const estiloPanel = {
    left: Math.max(16, Math.min(pos.x + 62 - anchoPanel, window.innerWidth - anchoPanel - 16)),
    width: anchoPanel,
    top: panelArriba ? 'auto' : pos.y + 78,
    bottom: panelArriba ? window.innerHeight - pos.y + 16 : 'auto',
    maxHeight: Math.min(560, panelArriba ? pos.y - 32 : window.innerHeight - pos.y - 94),
  };

  return (
    <>
      {/* Notificaciones flotantes */}
      <div className="nutrik-toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`nutrik-toast ${t.tipo}`}>
            {/* Misma mascota en las notificaciones flotantes */}
            <img
              className="nutrik-toast-avatar"
              src={nutriBotClay}
              alt="NutryBot"
            />
            <div className="nutrik-toast-cuerpo">
              <strong>NutryBot</strong>
              <p>{t.texto}</p>
              {t.productoId && (
                <button
                  type="button"
                  className="nutrik-toast-accion"
                  onClick={() => {
                    setProductoComprado(
                      productosTienda.find((producto) => producto.id === t.productoId) ||
                        productoComprado
                    );
                    setTab('receta');
                    setAbierto(true);
                    setToasts((prev) => prev.filter((toast) => toast.id !== t.id));
                  }}
                >
                  Ver receta
                </button>
              )}
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
          onClick={(event) => {
            if (event.detail === 0) setAbierto((v) => !v);
          }}
          aria-label="Abrir ayuda de Nutrik"
          aria-expanded={abierto}
        >
          {/* Botón flotante: antes era el emoji 👵 dentro del círculo verde */}
          <img
            className="nutrik-avatar-cara"
            src={nutriBotClay}
            alt="Abrir ayuda de Nutrik"
          />
          {user && <span className="nutrik-avatar-badge" />}
        </button>
        {abierto && (
          <div
            className="nutrik-panel"
            style={estiloPanel}
            role="dialog"
            aria-label="NutryBot"
          >
            <header className="nutrik-panel-cabecera">
              {/* Cabecera del panel: misma mascota para no mezclar imágenes */}
              <div className="nutrik-panel-avatar">
                <img src={nutriBotClay} alt="NutryBot" />
              </div>
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

            <a
              className="nutrik-whatsapp"
              href="https://wa.me/573336043098?text=Hola%20Nutrik%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20productos."
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp ↗
            </a>

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
              {productoParaReceta && (
                <button
                  className={tab === 'receta' ? 'activo' : ''}
                  onClick={() => setTab('receta')}
                >
                  🥣 Receta
                </button>
              )}
            </nav>

            <div
              className={`nutrik-panel-cuerpo ${
                tab === 'sugerencias' ? 'nutrik-panel-cuerpo-chat' : ''
              }`}
            >
              {tab === 'retos' &&
                (tipo ? (
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

                  {seguimiento.racha > 0 && (
                    <p className="nutrik-racha">
                      🔥 Racha de {seguimiento.racha}{' '}
                      {seguimiento.racha === 1 ? 'día' : 'días'}
                    </p>
                  )}

                  {(perfiles.length > 0 || objetivo) && (
                    <p className="nutrik-sugerencias-nota">
                      Retos para ti:{' '}
                      {[...perfiles.map((p) => p.etiqueta), objetivo?.etiqueta]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}

                  <ul className="nutrik-retos">
                    {retos.map((reto) => (
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

                  <div className="nutrik-semana">
                    <div className="nutrik-semana-info">
                      <span>📊 Tu dieta esta semana</span>
                      <strong>{adhesion}%</strong>
                    </div>
                    <div className="nutrik-semana-barras">
                      {diasSemana.map((d) => (
                        <div key={d.fecha} className="nutrik-semana-dia">
                          <span className={d.hecho ? 'hecho' : ''} />
                          <small>{d.etiqueta}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="nutrik-sugerencias-nota">
                    {diasCumplidos} de 7 días siguiendo tu dieta
                  </p>

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

                  <button className="nutrik-cambiar" onClick={cambiarTipo}>
                    Cambiar mi objetivo
                  </button>
                  </>
                ) : (
                  <div className="nutrik-elegir">
                    <p>
                      ¡Hola! 👋 Antes de empezar tu racha, dime ¿qué quieres
                      trabajar?
                    </p>
                    <p>Tu respuesta crea tus 4 retos de hoy.</p>
                    {TIPOS_RETOS.map((t) => (
                      <button
                        key={t.id}
                        className="nutrik-opcion"
                        onClick={() => elegirTipo(t.id)}
                      >
                        <span className="nutrik-opcion-icono">{t.icono}</span>
                        <span className="nutrik-opcion-texto">
                          <strong>{t.etiqueta}</strong>
                          <small>{t.detalle}</small>
                        </span>
                        <span>→</span>
                      </button>
                    ))}
                  </div>
                ))}

              {tab === 'sugerencias' && (
                <>
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
                      Cuéntame qué buscas: comidas, recetas o productos de la
                      tienda.
                    </p>
                  )}

                  <div className="nutrik-chat">
                    <div className="nutrik-chat-mensajes">
                      {mensajes.map((m, i) => (
                        <div
                          key={i}
                          className={`nutrik-chat-msj ${
                            m.de === 'cliente' ? 'cliente' : 'bot'
                          }`}
                        >
                          <p>{m.texto}</p>
                          {m.productos?.map((p) => (
                            <div className="nutrik-chat-producto" key={p.id}>
                              <div className="nutrik-chat-media">
                                {p.imagen ? (
                                  <img src={p.imagen} alt={p.nombre} />
                                ) : (
                                  <span>🧴</span>
                                )}
                              </div>
                              <div className="nutrik-chat-info">
                                <Link
                                  to={`/Productview/${p.id}`}
                                  onClick={() => setAbierto(false)}
                                >
                                  {p.nombre}
                                </Link>
                                <small>
                                  {typeof p.categoria === 'object'
                                    ? p.categoria?.nombre || 'Nutrik'
                                    : p.categoria || 'Nutrik'}
                                </small>
                                <span>
                                  ${Number(p.precio || 0).toLocaleString('es-CO')}
                                </span>
                              </div>
                              <button
                                className="nutrik-chat-agregar"
                                onClick={() => {
                                  agregarProducto(p, 1);
                                  setCarritoAbierto(true);
                                }}
                              >
                                + Carrito
                              </button>
                            </div>
                          ))}
                          {m.recetaProducto && (
                            <button
                              className="nutrik-chat-receta"
                              onClick={() => {
                                setProductoComprado(m.recetaProducto);
                                setTab('receta');
                              }}
                            >
                              🥣 Ver receta →
                            </button>
                          )}
                        </div>
                      ))}
                      <div ref={chatFinRef} />
                    </div>

                    <div className="nutrik-chat-chips">
                      {PREGUNTAS_SUGERIDAS.map((p) => (
                        <button key={p} onClick={() => enviarPregunta(p)}>
                          {p}
                        </button>
                      ))}
                    </div>

                    <form
                      className="nutrik-chat-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        enviarPregunta(pregunta);
                      }}
                    >
                      <input
                        value={pregunta}
                        onChange={(e) => setPregunta(e.target.value)}
                        placeholder="Escribe qué buscas..."
                        aria-label="Pregunta para NutryBot"
                      />
                      <button type="submit" aria-label="Enviar pregunta">
                        ➤
                      </button>
                    </form>

                    <p className="nutrik-chat-nota">
                      Respuestas preparadas · sin IA · no reemplaza consejo médico
                    </p>
                  </div>
                </>
              )}

              {tab === 'receta' && productoParaReceta && recetaActual && (
                <section className="nutrik-receta">
                  <p className="nutrik-receta-contexto">
                    Para <strong>{productoParaReceta.nombre}</strong>
                  </p>
                  <h4>{recetaActual.titulo}</h4>
                  <h5>Ingredientes</h5>
                  <ul>
                    {recetaActual.ingredientes.map((ingrediente) => (
                      <li key={ingrediente}>{ingrediente}</li>
                    ))}
                  </ul>
                  <h5>Preparación</h5>
                  <p>{recetaActual.pasos}</p>
                  {recetaActual.aviso.map((aviso) => (
                    <p className="nutrik-receta-aviso" key={aviso}>
                      {aviso}
                    </p>
                  ))}
                  <p className="nutrik-receta-disclaimer">
                    Revisa los ingredientes y advertencias del empaque. No
                    reemplaza el consejo de un profesional de salud.
                  </p>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AsistenteNutrik;
