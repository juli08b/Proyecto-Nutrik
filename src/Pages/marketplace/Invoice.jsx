import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logoNutrick from '../../assets/logoNutrick.png';

import './Invoice.css';

const LOGO_NUTRIK_URL = logoNutrick;

// Normaliza caracteres para fuentes estándar PDF (Helvetica / WinAnsi)
const escaparTextoPDF = (texto = '') =>
  String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');

// Detalle de productos por factura (FAC-0001 coincide con la vista de detalle)
const detallesPorFactura = {
  'FAC-0001': {
    id: 'FAC-0001',
    client: 'Juan Pérez',
    date: '22/05/2026',
    status: 'Pagado',
    items: [
      { producto: 'Yogur Griego Natural', cantidad: 'x1', unitario: '$12.000', subtotal: '$12.000' },
      { producto: 'Ensalada Fresh', cantidad: 'x1', unitario: '$15.000', subtotal: '$15.000' },
    ],
    total: '$27.000',
  },
  'FAC-0002': {
    id: 'FAC-0002',
    client: 'Ana López',
    date: '24/08/2026',
    status: 'Pagada',
    items: [
      { producto: 'Proteina Whey Isolate 1kg', cantidad: 'x1', unitario: '$180.000', subtotal: '$180.000' },
      { producto: 'Agua de Coco Organica', cantidad: 'x2', unitario: '$25.000', subtotal: '$50.000' },
    ],
    total: '$ 230.000',
  },
  'FAC-0003': {
    id: 'FAC-0003',
    client: 'Pedro Gómez',
    date: '24/08/2026',
    status: 'Pendiente',
    items: [
      { producto: 'Mantequilla de Mani Natural', cantidad: 'x3', unitario: '$15.000', subtotal: '$45.000' },
      { producto: 'Multivitaminico Fit', cantidad: 'x2', unitario: '$22.000', subtotal: '$44.000' },
    ],
    total: '$ 89.000',
  },
  'FAC-0004': {
    id: 'FAC-0004',
    client: 'María Torres',
    date: '23/08/2026',
    status: 'Pagada',
    items: [
      { producto: 'Ensalada Fresh', cantidad: 'x4', unitario: '$15.000', subtotal: '$60.000' },
      { producto: 'Yogur Griego Natural', cantidad: 'x5', unitario: '$12.000', subtotal: '$60.000' },
    ],
    total: '$ 120.000',
  },
};

// Prepara el logo sobre fondo blanco limpio y lo convierte a JPEG para incrustar en el PDF
const prepararMarcaAguaJPEG = (url) =>
  new Promise((resolve) => {
    if (!url) {
      resolve(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const maxDim = 800;
        const escala = Math.min(1, maxDim / Math.max(img.width || 1, img.height || 1));
        const w = Math.max(1, Math.round(img.width * escala));
        const h = Math.max(1, Math.round(img.height * escala));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const base64 = dataUrl.split(',')[1];
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        resolve({ bytes, width: w, height: h });
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => resolve(null);
    img.src = url;
  });

const concatenarBytes = (chunks) => {
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
};

const crearBlobPDFFactura = async (factura) => {
  const encoder = new TextEncoder();
  const watermark = await prepararMarcaAguaJPEG(LOGO_NUTRIK_URL);

  const ops = [];
  const margenX = 40;
  const anchoUtil = 532; // Mismo ancho que la cabecera y la tabla del PDF

  // 1. Franja superior verde esmeralda
  ops.push('0.016 0.471 0.345 rg');
  ops.push(`${margenX} 725 ${anchoUtil} 42 re f`);

  ops.push('BT');
  ops.push('/F1 15 Tf');
  ops.push('1 1 1 rg');
  ops.push('54 741 Td');
  ops.push(`(Detalle de la Factura: ${escaparTextoPDF(factura.id)}) Tj`);
  ops.push('ET');

  // 2. Tres tarjetas superiores: CLIENTE, FECHA, ESTADO
  const tarjetas = [
    { x: 40, w: 205, titulo: 'CLIENTE', valor: factura.client },
    { x: 255, w: 165, titulo: 'FECHA', valor: factura.date },
    { x: 430, w: 142, titulo: 'ESTADO', valor: factura.status },
  ];

  tarjetas.forEach((t) => {
    ops.push('0.976 0.984 0.980 rg');
    ops.push(`${t.x} 650 ${t.w} 56 re f`);

    ops.push('0.82 0.85 0.84 RG');
    ops.push('0.8 w');
    ops.push(`${t.x} 650 ${t.w} 56 re S`);

    ops.push('BT');
    ops.push('/F1 8 Tf');
    ops.push('0.39 0.45 0.43 rg');
    ops.push(`${t.x + 12} 688 Td`);
    ops.push(`(${escaparTextoPDF(t.titulo)}) Tj`);
    ops.push('ET');

    ops.push('BT');
    ops.push('/F1 11 Tf');
    ops.push(t.titulo === 'ESTADO' ? '0.016 0.471 0.345 rg' : '0.07 0.09 0.12 rg');
    ops.push(`${t.x + 12} 664 Td`);
    ops.push(`(${escaparTextoPDF(t.valor)}) Tj`);
    ops.push('ET');
  });

  // 3. Subtítulo PRODUCTOS COMPRADOS
  ops.push('BT');
  ops.push('/F1 11 Tf');
  ops.push('0.12 0.16 0.15 rg');
  ops.push('40 618 Td');
  ops.push('(PRODUCTOS COMPRADOS) Tj');
  ops.push('ET');

  // 4. Tabla de productos
  const cols = [
    { x: 40, w: 252, alignX: 50, label: 'Producto' },
    { x: 292, w: 70, alignX: 302, label: 'Cant.' },
    { x: 362, w: 105, alignX: 372, label: 'V. Unitario' },
    { x: 467, w: 105, alignX: 477, label: 'Subtotal' },
  ];

  const headerY = 582;
  const rowAlto = 28;
  ops.push('0.925 0.965 0.945 rg');
  ops.push(`${margenX} ${headerY} ${anchoUtil} ${rowAlto} re f`);
  ops.push('0.72 0.78 0.75 RG');
  ops.push('0.8 w');
  ops.push(`${margenX} ${headerY} ${anchoUtil} ${rowAlto} re S`);

  cols.forEach((c) => {
    ops.push('BT');
    ops.push('/F1 9.5 Tf');
    ops.push('0.02 0.35 0.25 rg');
    ops.push(`${c.alignX} ${headerY + 10} Td`);
    ops.push(`(${escaparTextoPDF(c.label)}) Tj`);
    ops.push('ET');
  });

  factura.items.forEach((item, idx) => {
    const rowY = headerY - (idx + 1) * rowAlto;

    ops.push('1 1 1 rg');
    ops.push(`${margenX} ${rowY} ${anchoUtil} ${rowAlto} re f`);
    ops.push('0.82 0.85 0.84 RG');
    ops.push('0.6 w');
    ops.push(`${margenX} ${rowY} ${anchoUtil} ${rowAlto} re S`);

    [292, 362, 467].forEach((vx) => {
      ops.push(`${vx} ${rowY} m ${vx} ${rowY + rowAlto} l S`);
    });

    const valoresFila = [
      { alignX: cols[0].alignX, texto: item.producto, color: '0.07 0.09 0.12 rg' },
      { alignX: cols[1].alignX, texto: item.cantidad, color: '0.25 0.29 0.28 rg' },
      { alignX: cols[2].alignX, texto: item.unitario, color: '0.25 0.29 0.28 rg' },
      { alignX: cols[3].alignX, texto: item.subtotal, color: '0.07 0.09 0.12 rg' },
    ];

    valoresFila.forEach((celda) => {
      ops.push('BT');
      ops.push('/F1 10 Tf');
      ops.push(celda.color);
      ops.push(`${celda.alignX} ${rowY + 10} Td`);
      ops.push(`(${escaparTextoPDF(celda.texto)}) Tj`);
      ops.push('ET');
    });
  });

  // 5. Caja destacada Total a Pagar
  const totalY = headerY - (factura.items.length + 1) * rowAlto - 18;
  ops.push('0.941 0.980 0.957 rg');
  ops.push(`${margenX} ${totalY} ${anchoUtil} 42 re f`);
  ops.push('0.016 0.471 0.345 RG');
  ops.push('1 w');
  ops.push(`${margenX} ${totalY} ${anchoUtil} 42 re S`);

  ops.push('BT');
  ops.push('/F1 12 Tf');
  ops.push('0.07 0.09 0.12 rg');
  ops.push(`54 ${totalY + 15} Td`);
  ops.push('(Total a Pagar:) Tj');
  ops.push('ET');

  ops.push('BT');
  ops.push('/F1 14 Tf');
  ops.push('0.016 0.471 0.345 rg');
  ops.push(`477 ${totalY + 14} Td`);
  ops.push(`(${escaparTextoPDF(factura.total)}) Tj`);
  ops.push('ET');

  // 6. Marca de agua adaptada al ancho útil del PDF y centrada
  if (watermark) {
    const wmAncho = anchoUtil; // 532 pt
    const wmAlto = Math.round((watermark.height / watermark.width) * wmAncho);
    const wmX = margenX;
    const wmY = Math.round(350 - wmAlto / 2);

    ops.push('q');
    ops.push('/GSWatermark gs');
    ops.push(`${wmAncho} 0 0 ${wmAlto} ${wmX} ${wmY} cm`);
    ops.push('/ImWatermark Do');
    ops.push('Q');
  }

  const streamContent = ops.join('\n');
  const streamBytes = encoder.encode(streamContent);

  const xObjectEntry = watermark ? '/XObject << /ImWatermark 6 0 R >>' : '';
  const resourcesDict = `<< /Font << /F1 5 0 R >> /ExtGState << /GSWatermark 7 0 R >> ${xObjectEntry} >>`;

  const obj1 = encoder.encode('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  const obj2 = encoder.encode('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  const obj3 = encoder.encode(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources ${resourcesDict} >>\nendobj\n`
  );
  const obj4 = concatenarBytes([
    encoder.encode(`4 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n`),
    streamBytes,
    encoder.encode('\nendstream\nendobj\n'),
  ]);
  const obj5 = encoder.encode('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
  const obj7 = encoder.encode('7 0 obj\n<< /Type /ExtGState /ca 0.14 /CA 0.14 >>\nendobj\n');

  const objects = [obj1, obj2, obj3, obj4, obj5];

  if (watermark) {
    const obj6 = concatenarBytes([
      encoder.encode(
        `6 0 obj\n<< /Type /XObject /Subtype /Image /Width ${watermark.width} /Height ${watermark.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${watermark.bytes.length} >>\nstream\n`
      ),
      watermark.bytes,
      encoder.encode('\nendstream\nendobj\n'),
    ]);
    objects.push(obj6, obj7);
  } else {
    objects.push(obj7);
  }

  const header = encoder.encode('%PDF-1.4\n');
  const offsets = [0];
  let currentOffset = header.length;

  for (const obj of objects) {
    offsets.push(currentOffset);
    currentOffset += obj.length;
  }

  const xrefStart = currentOffset;
  let xrefStr = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    xrefStr += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }

  const trailerStr = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const finalBytes = concatenarBytes([
    header,
    ...objects,
    encoder.encode(xrefStr),
    encoder.encode(trailerStr),
  ]);

  return new Blob([finalBytes], { type: 'application/pdf' });
};

// Listado de facturas de ejemplo; aún no consulta ni genera facturas en la API.
export default function Invoice() {
  const navigate = useNavigate();
  const location = useLocation();

  const [invoices] = useState([
    { id: 'FAC-0001', client: 'Juan Pérez', date: '25/08/2026', total: '$ 150.000', status: 'Pagada' },
    { id: 'FAC-0002', client: 'Ana López', date: '24/08/2026', total: '$ 230.000', status: 'Pagada' },
    { id: 'FAC-0003', client: 'Pedro Gómez', date: '24/08/2026', total: '$ 89.000', status: 'Pendiente' },
    { id: 'FAC-0004', client: 'María Torres', date: '23/08/2026', total: '$ 120.000', status: 'Pagada' },
  ]);

  const handleDownload = async (inv) => {
    const detalle = detallesPorFactura[inv.id] || {
      id: inv.id,
      client: inv.client,
      date: inv.date,
      status: inv.status,
      items: [{ producto: `Factura ${inv.id}`, cantidad: 'x1', unitario: inv.total, subtotal: inv.total }],
      total: inv.total,
    };

    const blob = await crearBlobPDFFactura(detalle);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const nombreLimpio = String(inv.id).replace(/[^a-zA-Z0-9_-]/g, '');

    link.href = url;
    link.download = `${nombreLimpio || 'factura'}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  return (
    <div className={`invoice-page ${location.pathname.startsWith('/vendedor') ? 'invoice-page-vendedor' : ''}`}>
      <div className="invoice-container">
        <div className="invoice-header">
          <div>
            <h1>Facturación</h1>
            <p>Facturas de ejemplo: esta sección aún no consulta ni genera facturas reales.</p>
          </div>
          <button className="invoice-new-button">
            + Nueva factura
          </button>
        </div>

        <section className="invoice-table-card">
          <div className="invoice-table-scroll">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>N° Factura</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="invoice-actions-heading">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="invoice-id">{inv.id}</td>
                    <td className="invoice-client">{inv.client}</td>
                    <td className="invoice-date">{inv.date}</td>
                    <td className="invoice-total">{inv.total}</td>
                    <td>
                      <span className={`invoice-status ${inv.status === 'Pagada' ? 'paid' : 'pending'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="invoice-actions">
                      <button
                        type="button"
                        className="invoice-action-button view"
                        onClick={() => navigate(`${location.pathname.startsWith('/vendedor') ? '/vendedor' : ''}/facturas/${inv.id}`)}
                      >
                        Ver
                      </button>
                      <button
                        type="button"
                        className="invoice-action-button download"
                        onClick={() => handleDownload(inv)}
                      >
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}