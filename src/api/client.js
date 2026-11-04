import axios from 'axios';

// URL base de la API de Laravel. Se puede cambiar sin tocar el código
// editando el archivo .env de este proyecto (VITE_API_URL).
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Convierte el error de Laravel (422 validation, 404, etc.) en un texto legible.
function mensajeDeError(data, status) {
  if (data?.errors) return Object.values(data.errors).flat().join(' ');
  return data?.message || `Error ${status}`;
}

// ---------------------------------------------------------------------------
// Opción 1: fetch (nativo de JavaScript, no requiere instalar nada)
// ---------------------------------------------------------------------------
export async function fetchApi(path, { method = 'GET', body } = {}) {
  const respuesta = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    throw new Error(mensajeDeError(data, respuesta.status));
  }

  return data;
}

// ---------------------------------------------------------------------------
// Opción 2: axios (instalado con: npm install axios)
// ---------------------------------------------------------------------------
export const apiAxios = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiAxios.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const data = error.response?.data;
    return Promise.reject(
      new Error(mensajeDeError(data, error.response?.status))
    );
  }
);
