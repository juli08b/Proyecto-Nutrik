import axios from 'axios';

export const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

// Lee el token guardado al iniciar sesión
function obtenerToken() {
  return localStorage.getItem('token');
}

function mensajeDeError(data, status) {
  if (data?.errors) return Object.values(data.errors).flat().join(' ');
  return data?.message || `Error ${status}`;
}

// ---------------------------------------------------------------------------
// fetch
// ---------------------------------------------------------------------------
export async function fetchApi(path, { method = 'GET', body } = {}) {
  const token = obtenerToken();

  const respuesta = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
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
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Agrega el token a cada petición
apiAxios.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
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
