import axios from 'axios';

export const API_URL =
  import.meta.env.VITE_API_URL || '/api/v1';

function leerCookie(nombre) {
  const cookie = document.cookie
    .split('; ')
    .find((parte) => parte.startsWith(`${nombre}=`));
  return cookie ? decodeURIComponent(cookie.slice(nombre.length + 1)) : '';
}

function urlCookieCsrf() {
  const api = new URL(API_URL, window.location.origin);
  const base = api.pathname.replace(/\/api\/v1\/?$/, '').replace(/\/+$/, '');
  return new URL(`${base}/sanctum/csrf-cookie`, api.origin).toString();
}

const METODOS_SEGUROS = new Set(['GET', 'HEAD', 'OPTIONS']);

async function obtenerTokenCsrf() {
  let token = leerCookie('XSRF-TOKEN');
  if (!token) {
    const respuesta = await fetch(urlCookieCsrf(), {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
    if (!respuesta.ok) {
      throw new Error('No se pudo preparar la sesión segura con Laravel.');
    }
    token = leerCookie('XSRF-TOKEN');
  }
  if (!token) {
    throw new Error('Laravel no entregó la protección CSRF requerida.');
  }
  return token;
}

function mensajeDeError(data, status) {
  if (data?.errors) return Object.values(data.errors).flat().join(' ');
  return data?.message || `Error ${status}`;
}

// ---------------------------------------------------------------------------
// fetch
// ---------------------------------------------------------------------------
export async function fetchApi(path, { method = 'GET', body } = {}) {
  const metodo = method.toUpperCase();
  const csrf = METODOS_SEGUROS.has(metodo) ? '' : await obtenerTokenCsrf();

  const respuesta = await fetch(`${API_URL}${path}`, {
    method: metodo,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(csrf && { 'X-XSRF-TOKEN': csrf }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const error = new Error(mensajeDeError(data, respuesta.status));
    error.status = respuesta.status;
    throw error;
  }

  return data;
}

// ---------------------------------------------------------------------------
// axios
// ---------------------------------------------------------------------------
export const apiAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiAxios.interceptors.request.use(async (config) => {
  const metodo = (config.method || 'GET').toUpperCase();
  if (!METODOS_SEGUROS.has(metodo)) {
    const csrf = await obtenerTokenCsrf();
    config.headers['X-XSRF-TOKEN'] = csrf;
  }
  return config;
});

apiAxios.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const data = error.response?.data;
    const nuevo = new Error(mensajeDeError(data, error.response?.status));
    nuevo.status = error.response?.status;
    return Promise.reject(nuevo);
  }
);
