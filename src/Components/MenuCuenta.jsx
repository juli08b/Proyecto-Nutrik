import { Link } from 'react-router-dom';
import { enlacesCuenta, seccionesCuenta } from './enlacesCuenta';

const iconos = {
  compras: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  favoritos: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  perfil: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  productos: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v9l9 5 9-5V8M12 13v9" /></>,
  ventas: <><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-7" /></>,
  estadisticas: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  facturas: <><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" /><path d="M9 8h6M9 12h6" /></>,
  compradores: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" /></>,
  configuracion: <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="7" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
  administracion: <><path d="m12 3 8 3v6c0 5-3 8-8 9-5-1-8-4-8-9V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  salir: <><path d="M10 17v3H4V4h6v3M14 8l4 4-4 4M8 12h10" /></>,
};

export function IconoCuenta({ nombre }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconos[nombre]}
    </svg>
  );
}

export function EnlacesCuenta({ user, onNavigate }) {
  const secciones = seccionesCuenta(user);

  return (
    <>
      {secciones.map(({ modo, titulo }) => (
        <div key={modo} className="nav-cuenta-grupo">
          <span className="nav-cuenta-titulo">{titulo}</span>
          {enlacesCuenta(modo).map(({ to, texto, icono }) => (
            <Link key={to} to={to} onClick={onNavigate}>
              <IconoCuenta nombre={icono} /> {texto}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}
