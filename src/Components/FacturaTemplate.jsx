import React from "react";
import logoPequeno from "../assets/logoNutrick.png";

const DEFAULT_FACTURA = {
  numero: "F-2026-0089",
  fecha: "17 de Septiembre, 2026",
  vencimento: "24 de Septiembre, 2026",

  cliente: {
    nombre: "Camila Andrés Mosquera",
    documento: "1.085.432.112",
    correo: "camila.mosquera@email.com",
    direccion: "Calle 5 # 10-45, Popayán, Cauca",
  },

  items: [
    {
      id: 1,
      descripcion: "Proteína Whey Orgánica (Sabor Vainilla 1kg)",
      cantidad: 1,
      precio: 125000,
    },
    {
      id: 2,
      descripcion: "Granola Artesanal Sin Azúcar (500g)",
      cantidad: 2,
      precio: 22000,
    },
    {
      id: 3,
      descripcion: "Mantequilla de Maní Natural 100% Pura",
      cantidad: 1,
      precio: 18500,
    },
  ],

  impuesto: 0,
  envio: 8000,
};

const FacturaTemplate = React.forwardRef(({ facturaData }, ref) => {
  /*
   * Fusionamos los datos recibidos con los datos por defecto.
   * Esto evita errores si llega un objeto parcialmente completo.
   */
  const data = {
    ...DEFAULT_FACTURA,
    ...facturaData,

    cliente: {
      ...DEFAULT_FACTURA.cliente,
      ...(facturaData?.cliente || {}),
    },

    items:
      Array.isArray(facturaData?.items) && facturaData.items.length > 0
        ? facturaData.items
        : DEFAULT_FACTURA.items,

    impuesto: Number(facturaData?.impuesto ?? DEFAULT_FACTURA.impuesto),
    envio: Number(facturaData?.envio ?? DEFAULT_FACTURA.envio),
  };

  /*
   * Cálculos
   */
  const subtotal = data.items.reduce((acumulado, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.precio) || 0;

    return acumulado + cantidad * precio;
  }, 0);

  const total = subtotal + data.envio + data.impuesto;

  /*
   * Formato de moneda colombiana
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  /*
   * Cantidad total de unidades
   */
  const totalUnidades = data.items.reduce(
    (total, item) => total + (Number(item.cantidad) || 0),
    0,
  );

  return (
    <div
      ref={ref}
      className="
        mx-auto
        w-full
        max-w-6xl
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-xl
        shadow-slate-200/60

        print:max-w-none
        print:overflow-visible
        print:rounded-none
        print:border-0
        print:shadow-none
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="relative isolate overflow-hidden bg-emerald-700 px-5 py-7 sm:px-8 sm:py-8 print:rounded-none">
        {/* Decoraciones */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            -top-28
            h-72
            w-72
            rounded-full
            bg-emerald-500/20
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-40
            right-10
            h-80
            w-80
            rounded-full
            bg-emerald-950/20
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-full
            w-px
            bg-white/5
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-7
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* =================================================
              LOGO + EMPRESA
          ================================================== */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                bg-white
                p-2
                shadow-lg
                shadow-emerald-950/20
                sm:h-[72px]
                sm:w-[72px]
              "
            >
              <img
                src={logoPequeno}
                alt="Logo Nutrick"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Información */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1
                  className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  NUTRICK
                </h1>

                <span
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/10
                    px-2.5
                    py-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-emerald-100
                  "
                >
                  Salud
                </span>
              </div>

              <div className="mt-1.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />

                <p className="text-xs font-medium text-emerald-100 sm:text-sm">
                  Tu aliado para una vida saludable
                </p>
              </div>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-1
                  text-[11px]
                  text-emerald-100
                "
              >
                <span>
                  NIT:{" "}
                  <strong className="font-bold text-white">
                    901.456.789-1
                  </strong>
                </span>

                <span
                  aria-hidden="true"
                  className="hidden h-3 w-px bg-white/20 sm:block"
                />

                <span>Popayán, Cauca, Colombia</span>
              </div>
            </div>
          </div>

          {/* =================================================
              INFORMACIÓN DE FACTURA
          ================================================== */}
          <div className="md:text-right">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-emerald-200
              "
            >
              Factura de venta
            </p>

            <p
              className="
                mt-1
                text-2xl
                font-black
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              {data.numero}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/15
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-white
                  backdrop-blur-sm
                "
              >
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Pagada
              </span>

              <span
                className="
                  rounded-full
                  bg-white/10
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-emerald-50
                "
              >
                Venta online
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}
      <div className="p-5 sm:p-8">
        {/* =================================================
            CLIENTE + DATOS FACTURA
        ================================================== */}
        <div className="grid gap-5 md:grid-cols-2 print:break-inside-avoid">
          {/* CLIENTE */}
          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50/70
              p-5
            "
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-100
                  text-emerald-700
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Cliente
                </p>

                <h2 className="text-sm font-bold text-slate-800">
                  Información del cliente
                </h2>
              </div>
            </div>

            <p className="text-base font-bold text-slate-900">
              {data.cliente.nombre}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span
                className="
                  rounded-md
                  bg-slate-200
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  text-slate-600
                "
              >
                C.C. / NIT
              </span>

              <span className="text-xs text-slate-600">
                {data.cliente.documento}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Correo */}
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="break-all">{data.cliente.correo}</span>
              </div>

              {/* Dirección */}
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span>{data.cliente.direccion}</span>
              </div>
            </div>
          </section>

          {/* INFORMACIÓN FACTURA */}
          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50/70
              p-5
            "
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-100
                  text-emerald-700
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Detalles
                </p>

                <h2 className="text-sm font-bold text-slate-800">
                  Información de la factura
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-xs text-slate-400">Número</span>

                <span className="text-right text-sm font-bold text-slate-700">
                  {data.numero}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-xs text-slate-400">Fecha de emisión</span>

                <span className="text-right text-sm font-semibold text-slate-700">
                  {data.fecha}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">Vencimiento</span>

                <span className="text-right text-sm font-semibold text-slate-700">
                  {data.vencimento}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* =================================================
            PRODUCTOS
        ================================================== */}
        <section className="mt-9 print:break-inside-avoid">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Detalle de compra
              </p>

              <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900">
                Productos
              </h2>
            </div>

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                bg-slate-100
                px-3
                py-1.5
                sm:flex
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold text-slate-500">
                {totalUnidades} {totalUnidades === 1 ? "unidad" : "unidades"}
              </span>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 print:overflow-visible">
            <div className="overflow-x-auto print:overflow-visible">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <th className="px-5 py-4 text-left">Producto</th>

                    <th className="whitespace-nowrap px-5 py-4 text-center">
                      Cantidad
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-right">
                      Precio unitario
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-right">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {data.items.length > 0 ? (
                    data.items.map((item, index) => {
                      const cantidad = Number(item.cantidad) || 0;
                      const precio = Number(item.precio) || 0;
                      const totalItem = cantidad * precio;

                      return (
                        <tr
                          key={item.id ?? index}
                          className="
                            group
                            break-inside-avoid
                            transition-colors
                            hover:bg-emerald-50/30
                          "
                        >
                          {/* Producto */}
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-3">
                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-emerald-50
                                  text-emerald-600
                                  group-hover:bg-emerald-100
                                "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                  />
                                </svg>
                              </div>

                              <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-800">
                                  {item.descripcion}
                                </p>

                                <p className="mt-1 text-[11px] text-slate-400">
                                  Producto Nutrick
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Cantidad */}
                          <td className="px-5 py-5 text-center">
                            <span
                              className="
                                inline-flex
                                min-w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-slate-100
                                px-2.5
                                py-1.5
                                text-xs
                                font-bold
                                text-slate-600
                              "
                            >
                              {cantidad}
                            </span>
                          </td>

                          {/* Precio */}
                          <td className="whitespace-nowrap px-5 py-5 text-right text-sm text-slate-500">
                            {formatCurrency(precio)}
                          </td>

                          {/* Total */}
                          <td className="whitespace-nowrap px-5 py-5 text-right">
                            <span className="text-sm font-bold text-slate-800">
                              {formatCurrency(totalItem)}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-10 text-center text-sm text-slate-400"
                      >
                        No hay productos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =================================================
            RESUMEN + TÉRMINOS
        ================================================== */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px] print:break-inside-avoid">
          {/* TÉRMINOS */}
          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50/60
              p-5
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-100
                  text-emerald-700
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Términos y condiciones
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Gracias por preferir productos saludables Nutrick. Conserve
                  esta factura como comprobante de su compra. Los cambios o
                  garantías aplican dentro de los próximos 30 días según
                  nuestras políticas.
                </p>
              </div>
            </div>
          </section>

          {/* RESUMEN */}
          <section
            className="
              overflow-hidden
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50/50
            "
          >
            <div className="p-5">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-700">
                Resumen de pago
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-500">Subtotal</span>

                  <span className="font-semibold text-slate-700">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-500">Envío</span>

                  <span className="font-semibold text-slate-700">
                    {formatCurrency(data.envio)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-500">Impuestos</span>

                  <span className="font-semibold text-slate-700">
                    {formatCurrency(data.impuesto)}
                  </span>
                </div>
              </div>
            </div>

            {/* TOTAL */}
            <div className="border-t border-emerald-200 bg-emerald-600 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                    Total a pagar
                  </p>

                  <p className="mt-1 text-2xl font-black tracking-tight text-white">
                    {formatCurrency(total)}
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    text-white
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
                Valor expresado en pesos colombianos (COP)
              </div>
            </div>
          </section>
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}
        <footer className="mt-10 border-t border-dashed border-slate-200 pt-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-emerald-200" />

            <span className="text-xs font-semibold text-emerald-600">
              NUTRICK
            </span>

            <span className="h-px w-8 bg-emerald-200" />
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Alimentando tu estilo de vida 🌱
          </p>

          <p className="mt-1 text-[10px] text-slate-300">
            Gracias por confiar en nosotros.
          </p>
        </footer>
      </div>
    </div>
  );
});

FacturaTemplate.displayName = "FacturaTemplate";

export default FacturaTemplate;
