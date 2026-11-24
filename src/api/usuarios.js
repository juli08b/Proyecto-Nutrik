import { fetchApi } from './client';
import {
  ESTADOS_USUARIO,
  normalizarEstado,
  normalizarRol,
  ROLES,
} from '../constants/roles';

// Traduce los campos que usa React a las columnas de la tabla usuarios_sistemas.
const CAMPOS = {
  primerNombre: 'NombreUno_usuario',
  segundoNombre: 'NombreDos_usuario',
  primerApellido: 'ApellidoDos_usuario',
  segundoApellido: 'SegundoApellido',
  email: 'Email',
  telefono: 'Telefono',
  fechaNacimiento: 'Fecha_nacimiento',
  estado: 'Estado_usuario',
  genero: 'Genero',
  estatura: 'Estatura',
  peso: 'Peso',
  actividad: 'Actividad',
  objetivo: 'Objetivo',
  alergia: 'Alergia',
  dieta: 'Dieta',
  restricciones: 'Restricciones',
  nombreNegocio: 'NombreNegocio',
  nit: 'Nit',
  direccion: 'Direccion',
  ciudad: 'Ciudad',
  tipoProductos: 'TipoProductos',
  descripcion: 'DescripcionNegocio',
  foto: 'Foto',
  fotoPosicion: 'FotoPosicion',
};

export function aApi(datos) {
  const api = {};
  Object.entries(CAMPOS).forEach(([campoReact, columna]) => {
    if (datos[campoReact] !== undefined) {
      api[columna] = datos[campoReact] === '' ? null : datos[campoReact];
    }
  });
  if (datos.estado !== undefined) {
    api.estado = datos.estado === '' ? null : datos.estado;
  }
  if (datos.password) api.Contrasena = datos.password;
  return api;
}

export function desdeApi(usuario) {
  if (!usuario) return null;
  const role = normalizarRol(usuario.role || usuario.Rol || usuario.Tipo_usuario);
  const estado = normalizarEstado(
    usuario.estado || usuario.Estado_usuario || usuario.status
  );
  return {
    id: usuario.Id_usuario,
    role,
    tipoUsuario: role,
    estado,
    primerNombre: usuario.NombreUno_usuario || '',
    segundoNombre: usuario.NombreDos_usuario || '',
    primerApellido: usuario.ApellidoDos_usuario || '',
    segundoApellido: usuario.SegundoApellido || '',
    nombreCompleto: [
      usuario.NombreUno_usuario,
      usuario.NombreDos_usuario,
      usuario.ApellidoDos_usuario,
      usuario.SegundoApellido,
    ]
      .filter(Boolean)
      .join(' '),
    email: usuario.Email,
    telefono: usuario.Telefono || '',
    fechaNacimiento: usuario.Fecha_nacimiento || '',
    genero: usuario.Genero || '',
    estatura: usuario.Estatura || '',
    peso: usuario.Peso || '',
    actividad: usuario.Actividad || '',
    objetivo: usuario.Objetivo || '',
    alergia: usuario.Alergia || '',
    dieta: usuario.Dieta || '',
    restricciones: usuario.Restricciones || '',
    nombreNegocio: usuario.NombreNegocio || '',
    nit: usuario.Nit || '',
    direccion: usuario.Direccion || '',
    ciudad: usuario.Ciudad || '',
    tipoProductos: usuario.TipoProductos || '',
    descripcion: usuario.DescripcionNegocio || '',
    foto: usuario.Foto || null,
    fotoPosicion: usuario.FotoPosicion || '',
  };
}

export const iniciarSesion = (Email, Contrasena) =>
  fetchApi('/usuarios/login', { method: 'POST', body: { Email, Contrasena } });

/** Login privado: usa la tabla users de Laravel, nunca credenciales en el bundle. */
export const iniciarSesionAdmin = (email, password) =>
  fetchApi('/login', { method: 'POST', body: { email, password } });

/** Convierte el usuario devuelto por /login al shape que usa el frontend. */
export function desdeApiAdmin(usuario) {
  if (!usuario) return null;
  const role = normalizarRol(usuario.role || usuario.Rol || usuario.Tipo_usuario || ROLES.ADMIN);
  return {
    id: usuario.id ?? usuario.Id_usuario ?? 'admin-nutrik',
    role,
    tipoUsuario: role,
    estado: ESTADOS_USUARIO.ACTIVO,
    nombreCompleto: usuario.name || usuario.NombreUno_usuario || 'Administrador Nutrik',
    email: usuario.email || usuario.Email || '',
  };
}

export function registrarUsuario(_role, datos) {
  const body = {
    ...aApi(datos),
    Tipo_usuario: ROLES.USER,
    role: ROLES.USER,
    Estado_usuario: ESTADOS_USUARIO.ACTIVO,
    estado: ESTADOS_USUARIO.ACTIVO,
  };

  body.NombreUno_usuario = datos.primerNombre || datos.nombreNegocio;
  body.ApellidoDos_usuario = datos.primerApellido || '';

  return fetchApi('/usuarios', { method: 'POST', body });
}

export const actualizarUsuario = (id, datos) =>
  fetchApi(`/usuarios/${id}`, { method: 'PUT', body: aApi(datos) });

export const listarUsuarios = async () => {
  const respuesta = await fetchApi('/usuarios');
  const lista = Array.isArray(respuesta) ? respuesta : respuesta.data;
  return Array.isArray(lista) ? lista.map(desdeApi) : [];
};

export const actualizarEstadoUsuario = (id, estado) =>
  fetchApi(`/usuarios/${id}`, {
    method: 'PUT',
    body: { estado, Estado_usuario: estado },
  });

export const verificarCorreo = (Email) =>
  fetchApi('/usuarios/verificar', { method: 'POST', body: { Email } });

export const restablecerContrasena = (Email, Contrasena) =>
  fetchApi('/usuarios/restablecer', {
    method: 'POST',
    body: { Email, Contrasena },
  });
