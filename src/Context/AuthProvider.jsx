import { useState } from 'react';
import { AuthContext } from './authContext';

const STORAGE_USERS = 'nutrik_users';
const STORAGE_SESSION = 'nutrik_session';

const DEMO_ACCOUNTS = [
  {
    id: 'juliana@nutrik.com',
    role: 'cliente',
    primerNombre: 'Juliana',
    segundoNombre: '',
    primerApellido: 'Gómez',
    segundoApellido: 'Ríos',
    email: 'juliana@nutrik.com',
    password: 'juliana123',
    telefono: '',
    fechaNacimiento: '',
    genero: 'femenino',
    estatura: '1.62',
    peso: '58 kg',
    actividad: 'activo',
    objetivo: 'perder',
    alergia: '',
    dieta: '',
    restricciones: '',
    foto: null,
  },
  {
    id: 'tienda@nutrik.com',
    role: 'vendedor',
    nombreNegocio: 'Tienda Nutrik',
    nit: '901234567-8',
    email: 'tienda@nutrik.com',
    password: 'tienda123',
    telefono: '3001234567',
    direccion: 'Calle 10 # 5-12, Bogotá',
    ciudad: 'Bogotá',
    tipoProductos: 'Suplementos y snacks saludables',
    descripcion: 'Vendemos productos sanos para una vida equilibrada.',
    foto: null,
  },
];

function cargarUsuarios() {
  try {
    const guardados = JSON.parse(localStorage.getItem(STORAGE_USERS));
    if (Array.isArray(guardados) && guardados.length > 0) return guardados;
  } catch {
    /* localStorage vacío o corrupto: usamos los demo */
  }
  return DEMO_ACCOUNTS;
}

function usuarioDeSesion() {
  const emailSesion = localStorage.getItem(STORAGE_SESSION);
  if (emailSesion) {
    const encontrado = cargarUsuarios().find((u) => u.email === emailSesion);
    if (encontrado) {
      const copia = { ...encontrado };
      delete copia.password;
      return copia;
    }
  }
  return null;
}

function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => cargarUsuarios());
  const [user, setUser] = useState(() => usuarioDeSesion());

  const persistirUsuarios = (nuevaLista) => {
    setUsers(nuevaLista);
    localStorage.setItem(STORAGE_USERS, JSON.stringify(nuevaLista));
  };

  const guardarSesion = (cuenta) => {
    const copia = { ...cuenta };
    delete copia.password;
    setUser(copia);
    localStorage.setItem(STORAGE_SESSION, cuenta.email);
  };

  const login = (email, password) => {
    const cuenta = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!cuenta) return { ok: false, error: 'No existe una cuenta con ese correo.' };
    if (cuenta.password !== password) return { ok: false, error: 'Contraseña incorrecta.' };
    guardarSesion(cuenta);
    return { ok: true, user: { ...cuenta } };
  };

  const register = (role, data) => {
    const email = data.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === email)) {
      return { ok: false, error: 'Ya existe una cuenta con ese correo.' };
    }
    const nueva = { id: email, role, ...data, email, foto: null };
    persistirUsuarios([...users, nueva]);
    guardarSesion(nueva);
    return { ok: true, user: { ...nueva } };
  };

  const updateProfile = (cambios) => {
    const lista = users.map((u) =>
      u.email === user.email ? { ...u, ...cambios, foto: cambios.foto ?? u.foto } : u
    );
    persistirUsuarios(lista);
    setUser((prev) => ({ ...prev, ...cambios }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;