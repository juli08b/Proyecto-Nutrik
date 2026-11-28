import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import {
  actualizarUsuario,
  cerrarSesion,
  desdeApi,
  iniciarSesion,
  obtenerUsuarioActual,
  registrarUsuario,
  restablecerContrasena,
  verificarCorreo,
} from '../api/usuarios';
import {
  puedeIniciarSesion,
  ROLES,
} from '../constants/roles';
import { registrarActividad } from '../utils/actividad';

const STORAGE_SESSION = 'nutrik_session_user';

function usuarioDeSesion(respuesta) {
  const datos = respuesta?.data;
  if (datos?.user?.Id_usuario == null || typeof datos.es_administrador !== 'boolean') {
    throw new Error('Laravel devolvió una identidad no reconocida.');
  }
  return desdeApi({ ...datos.user, es_administrador: datos.es_administrador });
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [sessionError, setSessionError] = useState('');

  useEffect(() => {
    let vigente = true;

    const validarSesion = async () => {
      localStorage.removeItem('token');

      try {
        const usuario = usuarioDeSesion(await obtenerUsuarioActual());

        if (!puedeIniciarSesion(usuario)) {
          throw new Error('La cuenta no está activa.');
        }
        if (!vigente) return;
        setUser(usuario);
        localStorage.setItem(STORAGE_SESSION, JSON.stringify(usuario));
      } catch (error) {
        if (!vigente) return;

        setUser(null);
        localStorage.removeItem(STORAGE_SESSION);
        if (![401, 403].includes(error.status)) {
          setSessionError('No se pudo validar la sesión con Laravel. Inicia sesión de nuevo.');
        }
      } finally {
        if (vigente) setAuthReady(true);
      }
    };

    validarSesion();

    return () => {
      vigente = false;
    };
  }, []);

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

  const login = async (email, password) => {
    const correo = String(email || '').trim();

    try {
      const usuario = usuarioDeSesion(await iniciarSesion(correo, password));
      if (!usuario || !puedeIniciarSesion(usuario)) {
        return {
          ok: false,
          error: 'Esta cuenta no está activa. Comunícate con el administrador.',
        };
      }

      const usuarioGuardado = guardarSesionDirecta(usuario);
      setSessionError('');
      registrarActividad({
        tipo: 'login',
        accion: usuario.role === ROLES.ADMIN ? 'Inicio de sesión administrativo' : 'Inicio de sesión',
        descripcion: `${usuarioGuardado.nombreCompleto || usuarioGuardado.email} inició sesión`,
        usuario: usuarioGuardado,
        detalles: { correo: usuarioGuardado.email },
      });
      return { ok: true, user: usuarioGuardado };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const register = async (role, data) => {
    try {
      await registrarUsuario(role, data);
      const correo = data.email || data.Email;
      const contrasena = data.password || data.Contrasena;
      const res = await iniciarSesion(correo, contrasena);
      const usuario = guardarSesionDirecta(usuarioDeSesion(res));
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

  const logout = async () => {
    try {
      await cerrarSesion();
    } catch (error) {
      if (error.status !== 401) return { ok: false, error: error.message };
    }
    registrarActividad({
      tipo: 'logout',
      accion: 'Cierre de sesión',
      descripcion: `${user?.nombreCompleto || user?.email || 'Usuario'} cerró la sesión`,
      usuario: user,
      detalles: { correo: user?.email },
    });
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION);
    localStorage.removeItem('token');
    localStorage.removeItem('nutrik_modo');
    window.dispatchEvent(new Event('nutrik-modo'));
    return { ok: true };
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
      {!authReady ? (
        <div role="status" aria-live="polite">Validando sesión con Laravel…</div>
      ) : (
        <>
          {sessionError && <div role="alert">{sessionError}</div>}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
