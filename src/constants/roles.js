export const ROLES = {
  ADMIN: 'administrador',
  USER: 'usuario',
};

export const ESTADOS_USUARIO = {
  ACTIVO: 'activo',
  SUSPENDIDO: 'suspendido',
  BLOQUEADO: 'bloqueado',
};

const LEGACY_ROLES = {
  cliente: ROLES.USER,
  vendedor: ROLES.USER,
  user: ROLES.USER,
  usuario: ROLES.USER,
  admin: ROLES.ADMIN,
  administrador: ROLES.ADMIN,
};

export function normalizarRol(valor) {
  return LEGACY_ROLES[String(valor || '').trim().toLowerCase()] || ROLES.USER;
}

export function normalizarEstado(valor) {
  const estado = String(valor || ESTADOS_USUARIO.ACTIVO).trim().toLowerCase();
  return Object.values(ESTADOS_USUARIO).includes(estado)
    ? estado
    : ESTADOS_USUARIO.ACTIVO;
}

export function esAdministrador(usuario) {
  return normalizarRol(usuario?.role || usuario?.Rol || usuario?.Tipo_usuario) === ROLES.ADMIN;
}

export function puedeVender(usuario) {
  return Boolean(usuario) &&
    (esAdministrador(usuario) || normalizarEstado(usuario.estado) === ESTADOS_USUARIO.ACTIVO);
}

export function puedeIniciarSesion(usuario) {
  return normalizarEstado(usuario?.estado) !== ESTADOS_USUARIO.BLOQUEADO;
}
