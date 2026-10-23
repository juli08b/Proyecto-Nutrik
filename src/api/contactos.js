import { fetchApi } from './client';

export const listarContactos = () => fetchApi('/contactos');

export const enviarContacto = (datos) =>
  fetchApi('/contactos', {
    method: 'POST',
    body: {
      Nombre: datos.nombre,
      Email: datos.email,
      Tipo_solicitud: datos.tipo_solicitud,
      Asunto: datos.asunto,
      Mensaje: datos.mensaje,
    },
  });
