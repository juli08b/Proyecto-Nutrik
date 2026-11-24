import { useState } from 'react';
import { AuthContext } from './authContext';
import {
  actualizarUsuario,
  desdeApi,
  desdeApiAdmin,
  iniciarSesion,
  iniciarSesionAdmin,
  registrarUsuario,
  restablecerContrasena,
  verificarCorreo,
} from '../api/usuarios';
import {
  normalizarEstado,
  normalizarRol,
  puedeIniciarSesion,
  ROLES,
} from '../constants/roles';
import { registrarActividad } from '../utils/actividad';

const STORAGE_SESSION = 'nutrik_session_user';

function usuarioGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_SESSION));
    if (guardado && guardado.email) {
      return {
        ...guardado,
        role: normalizarRol(guardado.role || guardado.tipoUsuario),
        estado: normalizarEstado(guardado.estado),
      };
    }
  } catch {
    /* sesión vacía o corrupta */
  }
  return null;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => usuarioGuardado());

  const guardarSesion = (usuarioApi) => {
    const mapped = desdeApi(usuarioApi);
    setUser(mapped);
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(mapped));
    return mapped;
  };

  const guardarSesionDirecta = (usuario) => {
    setUser(usuario);
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(usuario));
    return usuario;
  };

const login = async (email, password, opciones = {}) => {
  const correo = String(email || '').trim();

  // Acceso reservado al propietario: lo valida Laravel, nunca el bundle React.
  if (opciones.soloAdmin) {
    try {
      const res = await iniciarSesionAdmin(correo, password);
      const usuarioApi = res?.data?.user ?? res?.user;
      if (normalizarRol(usuarioApi?.role) !== ROLES.ADMIN) {
        return { ok: false, error: 'Las credenciales no corresponden a una cuenta privada.' };
      }
      const tokenAdmin = res?.data?.token ?? res?.token;
      if (tokenAdmin) localStorage.setItem('token', tokenAdmin);
      const admin = guardarSesionDirecta(desdeApiAdmin(usuarioApi));
      registrarActividad({
        tipo: 'login',
        accion: 'Inicio de sesión administrativo',
        descripcion: `${admin.nombreCompleto || admin.email} inició sesión`,
        usuario: admin,
        detalles: { correo: admin.email },
      });
      return { ok: true, user: admin };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  try {
    const res = await iniciarSesion(correo, password);
    if (res.token) localStorage.setItem('token', res.token);   // <- nuevo
    const usuario = guardarSesion(res.data);
    if (!puedeIniciarSesion(usuario)) {
      setUser(null);
      localStorage.removeItem(STORAGE_SESSION);
      localStorage.removeItem('token');
      return {
        ok: false,
        error: 'Esta cuenta está bloqueada. Comunícate con el administrador.',
      };
    }

    // Las cuentas administrativas no se aceptan desde el login público.
    if (usuario.role === ROLES.ADMIN && !opciones.soloAdmin) {
      setUser(null);
      localStorage.removeItem(STORAGE_SESSION);
      localStorage.removeItem('token');
      return { ok: false, error: 'Credenciales inválidas.' };
    }

    registrarActividad({
      tipo: 'login',
      accion: 'Inicio de sesión',
      descripcion: `${usuario.nombreCompleto || usuario.email} inició sesión`,
      usuario,
      detalles: { correo: usuario.email },
    });

    return { ok: true, user: usuario };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

  const register = async (role, data) => {
    try {
      const res = await registrarUsuario(role, data);
      const usuario = guardarSesion(res.data);
      registrarActividad({
        tipo: 'registro',
        accion: 'Registro de cuenta',
        descripcion: `${usuario.nombreCompleto || usuario.email} creó una cuenta`,
        usuario,
        detalles: { correo: usuario.email, rol: usuario.role },
      });
      return { ok: true, user: usuario };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const updateProfile = async (cambios) => {
    if (!user?.id) return { ok: false, error: 'No hay una sesión activa.' };
    try {
      const res = await actualizarUsuario(user.id, cambios);
      guardarSesion(res.data);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const logout = () => {
    registrarActividad({
      tipo: 'logout',
      accion: 'Cierre de sesión',
      descripcion: `${user?.nombreCompleto || user?.email || 'Usuario'} cerró la sesión`,
      usuario: user,
      detalles: { correo: user?.email },
    });
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION);
    localStorage.removeItem('token');   // <- nuevo
    localStorage.removeItem('nutrik_modo');
    window.dispatchEvent(new Event('nutrik-modo'));
  };

  const existeCuenta = async (email) => {
    const correo = (email || '').trim().toLowerCase();
    if (!correo) return { ok: false, error: 'Ingresa tu correo electrónico.' };
    try {
      const res = await verificarCorreo(correo);
      if (!res.existe) {
        return { ok: false, error: 'No existe ninguna cuenta con ese correo.' };
      }
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const resetPassword = async (email, nuevaPassword) => {
    const correo = (email || '').trim().toLowerCase();
    if (!nuevaPassword || nuevaPassword.length < 8) {
      return { ok: false, error: 'La contraseña debe tener mínimo 8 caracteres.' };
    }
    try {
      await restablecerContrasena(correo, nuevaPassword);
      setUser(null);
      localStorage.removeItem(STORAGE_SESSION);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, updateProfile, logout, existeCuenta, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
