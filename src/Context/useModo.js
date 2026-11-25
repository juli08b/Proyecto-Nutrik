import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

const CLAVE = 'nutrik_modo';
const EVENTO = 'nutrik-modo';

export const RUTA_INICIO = { comprador: '/', vendedor: '/vendedor/dashboard' };

const esRutaVendedor = (path) =>
  /^\/(vendedor|mis-productos|admin)(\/|$)/i.test(path) &&
  !/\/(login|registro)$/i.test(path);

const esCuentaComprador = (path) =>
  /^\/(perfil|mis-pedidos|seguimiento|favoritos)(\/|$)/i.test(path);

const suscribir = (cb) => {
  window.addEventListener(EVENTO, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENTO, cb);
    window.removeEventListener('storage', cb);
  };
};

const leer = () => localStorage.getItem(CLAVE) || 'comprador';

// Modo activo (comprador | vendedor). Las rutas del panel fuerzan modo vendedor.
export function useModo() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const guardado = useSyncExternalStore(suscribir, leer, () => 'comprador');
  const modo = esRutaVendedor(pathname) ? 'vendedor' : esCuentaComprador(pathname) ? 'comprador' : guardado;

  useEffect(() => {
    const modoRuta = esRutaVendedor(pathname) ? 'vendedor' : esCuentaComprador(pathname) ? 'comprador' : null;
    if (user && modoRuta && leer() !== modoRuta) {
      localStorage.setItem(CLAVE, modoRuta);
      window.dispatchEvent(new Event(EVENTO));
    }
  }, [pathname, user]);

  const cambiarModo = useCallback(
    (nuevo) => {
      localStorage.setItem(CLAVE, nuevo);
      window.dispatchEvent(new Event(EVENTO));
      navigate(RUTA_INICIO[nuevo]);
    },
    [navigate]
  );

  return { modo, cambiarModo };
}
