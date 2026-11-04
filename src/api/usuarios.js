import { fetchApi } from './client';

// Traduce los campos que usa React a las columnas de la tabla usuarios_sistemas.
const CAMPOS = {
  primerNombre: 'NombreUno_usuario',
  segundoNombre: 'NombreDos_usuario',
  primerApellido: 'ApellidoDos_usuario',
  segundoApellido: 'SegundoApellido',
  email: 'Email',
  telefono: 'Telefono',
  fechaNacimiento: 'Fecha_nacimiento',
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
  if (datos.password) api.Contrasena = datos.password;
  return api;
}

export function desdeApi(usuario) {
  if (!usuario) return null;
  const esVendedor = usuario.Tipo_usuario === 'vendedor';
  return {
    id: usuario.Id_usuario,
    role: esVendedor ? 'vendedor' : 'cliente',
    tipoUsuario: usuario.Tipo_usuario,
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

export function registrarUsuario(role, datos) {
  const body = {
    ...aApi(datos),
    Tipo_usuario: role === 'vendedor' ? 'vendedor' : 'cliente',
  };

  if (role === 'vendedor') {
    body.NombreUno_usuario = datos.nombreNegocio;
    body.ApellidoDos_usuario = 'Vendedor';
  } else {
    body.NombreUno_usuario = datos.primerNombre;
    body.ApellidoDos_usuario = datos.primerApellido;
  }

  return fetchApi('/usuarios', { method: 'POST', body });
}

export const actualizarUsuario = (id, datos) =>
  fetchApi(`/usuarios/${id}`, { method: 'PUT', body: aApi(datos) });

export const verificarCorreo = (Email) =>
  fetchApi('/usuarios/verificar', { method: 'POST', body: { Email } });

export const restablecerContrasena = (Email, Contrasena) =>
  fetchApi('/usuarios/restablecer', {
    method: 'POST',
    body: { Email, Contrasena },
  });
