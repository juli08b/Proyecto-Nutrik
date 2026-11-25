import React from "react";
import "./Factura.css";

// Cambia esta importación por la ruta real de tu Navbar
// import Navbar from "../components/Navbar";

const Factura = () => {
  const factura = {
    numero: "F-#1052",
    fecha: "25/08/2026",
    vencimiento: "25/08/2026",
    cliente: "Josman Changó",
    nit: "No registrado",
    producto: "Producto Nutrick",
    cantidad: 1,
    precio: 0,
    envio: 0,
    impuestos: 0,
  };

  const subtotal = factura.cantidad * factura.precio;
  const total = subtotal + factura.envio + factura.impuestos;

  return (
    <div className="factura-page">
      {/* Navbar */}
      {/* <Navbar /> */}

      <main className="factura-container">
        {/* Header de navegación */}
        <div className="factura-topbar">
          <div className="breadcrumb">
            <span className="breadcrumb-muted">Facturación</span>
            <span className="breadcrumb-separator">/</span>
            <span>Vista previa</span>
          </div>

          <div className="topbar-actions">
            <button className="btn btn-light">
              <span className="icon">←</span>
              Volver
            </button>

            <button className="btn btn-primary">
              <span className="icon">↓</span>
              Descargar PDF
            </button>
          </div>
        </div>

        {/* Contenedor principal */}
        <section className="invoice-card">

          {/* Encabezado de factura */}
          <header className="invoice-header">
            <div className="brand-section">
              <div className="brand-logo">
                <span>N</span>
              </div>

              <div>
                <h1>NUTRICK</h1>
                <p className="brand-tag">SALUD</p>
                <p className="brand-description">
                  Tu aliado para una vida saludable
                </p>
                <span className="brand-nit">
                  NIT: 901.456.789-1
                </span>
              </div>
            </div>

            <div className="invoice-header-right">
              <span className="invoice-label">
                FACTURA DE VENTA
              </span>

              <strong>{factura.numero}</strong>

              <div className="status-badge">
                <span className="status-dot"></span>
                Pagada
                <span className="status-divider">·</span>
                Venta online
              </div>
            </div>
          </header>

          {/* Información superior */}
          <div className="invoice-info-grid">

            {/* Cliente */}
            <article className="info-card">
              <div className="info-card-header">
                <div className="info-icon">
                  <span>♙</span>
                </div>

                <div>
                  <span className="section-label">CLIENTE</span>
                  <h3>Información del cliente</h3>
                </div>
              </div>

              <div className="client-content">
                <h2>{factura.cliente}</h2>

                <div className="client-data">
                  <div>
                    <span className="data-label">CC / NIT</span>
                    <span>{factura.nit}</span>
                  </div>

                  <div className="client-status">
                    <span>✉</span>
                    No registrado
                  </div>

                  <div className="client-status">
                    <span>⌖</span>
                    No registrado
                  </div>
                </div>
              </div>
            </article>

            {/* Detalles */}
            <article className="info-card">
              <div className="info-card-header">
                <div className="info-icon">
                  <span>▣</span>
                </div>

                <div>
                  <span className="section-label">DETALLES</span>
                  <h3>Información de la factura</h3>
                </div>
              </div>

              <div className="invoice-details">
                <div className="detail-row">
                  <span>Número</span>
                  <strong>{factura.numero}</strong>
                </div>

                <div className="detail-row">
                  <span>Fecha de emisión</span>
                  <strong>{factura.fecha}</strong>
                </div>

                <div className="detail-row">
                  <span>Vencimiento</span>
                  <strong>{factura.vencimiento}</strong>
                </div>
              </div>
            </article>
          </div>

          {/* Productos */}
          <section className="products-section">
            <div className="products-title">
              <div>
                <span className="section-label">DETALLE DE COMPRA</span>
                <h2>Productos</h2>
              </div>

              <div className="products-count">
                <span></span>
                1 unidad
              </div>
            </div>

            <div className="products-table">

              {/* Encabezado */}
              <div className="table-head">
                <span>PRODUCTO</span>
                <span>CANTIDAD</span>
                <span>PRECIO UNITARIO</span>
                <span>TOTAL</span>
              </div>

              {/* Producto */}
              <div className="product-row">

                <div className="product-info">
                  <div className="product-icon">
                    ◇
                  </div>

                  <div>
                    <strong>Compra registrada en sistema</strong>
                    <span>{factura.producto}</span>
                  </div>
                </div>

                <div className="quantity">
                  <span>{factura.cantidad}</span>
                </div>

                <div className="price">
                  ${factura.precio.toLocaleString("es-CO")}
                </div>

                <div className="price total-price">
                  ${subtotal.toLocaleString("es-CO")}
                </div>

              </div>
            </div>
          </section>

          {/* Parte inferior */}
          <div className="invoice-bottom">

            {/* Términos */}
            <section className="terms-card">
              <div className="terms-icon">
                ⓘ
              </div>

              <div>
                <h3>Términos y condiciones</h3>

                <p>
                  Gracias por preferir productos saludables Nutrick.
                  Conserve esta factura como comprobante de su compra.
                  Los cambios o garantías se aplican dentro de los
                  próximos 30 días según nuestras políticas.
                </p>
              </div>
            </section>

            {/* Resumen */}
            <aside className="payment-summary">
              <div className="summary-header">
                RESUMEN DE PAGO
              </div>

              <div className="summary-row">
                <span>Total parcial</span>
                <strong>
                  ${subtotal.toLocaleString("es-CO")}
                </strong>
              </div>

              <div className="summary-row">
                <span>Envío</span>
                <strong>
                  ${factura.envio.toLocaleString("es-CO")}
                </strong>
              </div>

              <div className="summary-row">
                <span>Impuestos</span>
                <strong>
                  ${factura.impuestos.toLocaleString("es-CO")}
                </strong>
              </div>

              <div className="summary-total">
                <div>
                  <span>TOTAL A PAGAR</span>
                  <strong>
                    ${total.toLocaleString("es-CO")}
                  </strong>
                </div>

                <div className="paid-icon">
                  ✓
                </div>
              </div>

              <div className="currency">
                Valor expresado en pesos colombianos (COP)
              </div>
            </aside>
          </div>

          {/* Footer */}
          <footer className="invoice-footer">
            <div className="footer-brand">
              <span></span>
              NUTRICK
              <span></span>
            </div>

            <p>Alimentando tu estilo de vida 🌱</p>

            <small>Gracias por confiar en nosotros.</small>
          </footer>

        </section>
      </main>
    </div>
  );
};

export default Factura;
