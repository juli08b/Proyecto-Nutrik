import { useState } from 'react';
import { AuthContext } from './authContext';
import {
  actualizarUsuario,
  desdeApi,
  iniciarSesion,
  registrarUsuario,
  restablecerContrasena,
  verificarCorreo,
} from '../api/usuarios';

const STORAGE_SESSION = 'nutrik_session_user';

function usuarioGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_SESSION));
    if (guardado && guardado.email) return guardado;
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

  const login = async (email, password) => {
    try {
      const res = await iniciarSesion(email.trim(), password);
      const usuario = guardarSesion(res.data);
      return { ok: true, user: usuario };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const register = async (role, data) => {
    try {
      const res = await registrarUsuario(role, data);
      const usuario = guardarSesion(res.data);
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
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION);
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
