function normalizar(texto = '') {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function recetaParaProducto(producto, user) {
  const perfil = normalizar(
    [user?.alergia, user?.dieta, user?.restricciones, user?.objetivo]
      .filter(Boolean)
      .join(' ')
  );
  const nombre = normalizar(`${producto.nombre} ${producto.descripcion}`);
  const tieneGastritis =
    /gastritis|reflujo|acidez|ulcera|colon sensible/.test(perfil);
  const sinLactosa = /lactosa|intolerancia a la leche/.test(perfil);
  const vegano = /vegano|vegan/.test(perfil);
  const alergiaLeche = /alergia.{0,15}(leche|lacteos)|alergia a la leche/.test(
    perfil
  );
  let receta;

  if (/yogur|yogurt/.test(nombre)) {
    receta = {
      titulo: 'Bowl cremoso con fruta',
      ingredientes: [
        producto.nombre,
        '½ banano maduro',
        '2 cucharadas de avena',
      ],
      pasos: 'Sirve el yogur y agrega el banano en rodajas y la avena.',
    };
  } else if (/chia/.test(nombre)) {
    receta = {
      titulo: 'Pudín sencillo de chía',
      ingredientes: [
        '2 cucharadas de chía',
        vegano || sinLactosa ? '1 taza de bebida vegetal o agua' : '1 taza de leche',
        '½ banano maduro',
      ],
      pasos:
        'Mezcla la chía con el líquido, refrigera al menos 2 horas y añade el banano antes de servir.',
    };
  } else if (/proteina|protein|whey|suero/.test(nombre)) {
    receta = {
      titulo: 'Batido de proteína',
      ingredientes: [
        '1 porción del producto según su etiqueta',
        tieneGastritis
          ? '250 ml de agua'
          : vegano || sinLactosa
            ? '250 ml de agua o bebida vegetal'
            : '250 ml de agua o leche',
        ...(!tieneGastritis ? ['½ banano maduro, opcional'] : []),
      ],
      pasos: 'Licúa o agita hasta integrar. Sigue la porción indicada en el empaque.',
    };
  } else if (/creatina/.test(nombre)) {
    receta = {
      titulo: 'Creatina disuelta en agua',
      ingredientes: ['1 porción indicada en el empaque', '1 vaso de agua'],
      pasos: 'Disuelve y consume siguiendo las instrucciones del fabricante.',
    };
  } else if (/colageno|colagen/.test(nombre)) {
    receta = {
      titulo: 'Bebida sencilla de colágeno',
      ingredientes: ['1 porción según el empaque', '1 vaso de agua'],
      pasos: 'Mezcla hasta disolver. También puedes incorporarlo a una preparación compatible con la etiqueta.',
    };
  } else if (/te verde|detox/.test(nombre)) {
    receta = {
      titulo: 'Infusión suave',
      ingredientes: ['1 porción del té según su etiqueta', '1 taza de agua caliente'],
      pasos: 'Prepara con el tiempo y la temperatura recomendados en el empaque.',
    };
  } else if (/granola|avena/.test(nombre)) {
    receta = {
      titulo: 'Granola con fruta',
      ingredientes: [
        '½ taza de granola',
        vegano || sinLactosa ? 'Bebida vegetal' : 'Yogur o bebida vegetal',
        '½ banano maduro',
      ],
      pasos: 'Sirve la granola con la bebida elegida y el banano en rodajas.',
    };
  } else if (/barra|galleta|snack|frutos secos/.test(nombre)) {
    receta = {
      titulo: 'Snack con fruta',
      ingredientes: [producto.nombre, '1 banano maduro o una fruta que toleres'],
      pasos: 'Acompaña el producto con fruta fresca y agua.',
    };
  } else {
    receta = {
      titulo: 'Combinación sencilla',
      ingredientes: [producto.nombre, 'Agua y una fruta que toleres'],
      pasos: 'Combina una porción del producto con fruta fresca. Revisa primero las instrucciones del empaque.',
    };
  }

  const aviso = [];
  if (tieneGastritis) {
    aviso.push(/proteina|protein|whey|suero/.test(nombre)
      ? 'Como indicaste gastritis o reflujo, este batido se prepara con agua y sin cítricos. La tolerancia varía; si te causa molestias, no lo consumas y consulta a un profesional de salud.'
      : 'Como indicaste gastritis o reflujo, revisa los ingredientes y evita los que te causen molestias. La tolerancia varía; consulta a un profesional de salud si tienes dudas.'
    );
  }
  if (user?.alergia) {
    aviso.push(
      `Tu perfil indica alergia a ${user.alergia}. Revisa ingredientes y advertencias de contaminación cruzada en el empaque antes de consumir; esta sugerencia no verifica alérgenos.`
    );
  } else if (alergiaLeche || sinLactosa) {
    aviso.push(
      'Revisa la etiqueta para confirmar que el producto sea adecuado para tu restricción.'
    );
  }
  if (vegano && /yogur|yogurt|whey|suero|colageno/.test(nombre)) {
    aviso.push(
      'El producto podría ser de origen animal. Verifica sus ingredientes y elige una alternativa vegetal si corresponde a tu dieta.'
    );
  }

  return { ...receta, aviso };
}
