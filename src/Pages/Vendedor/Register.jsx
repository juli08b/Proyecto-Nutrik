import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Register.css';
import logo from '../../assets/logoNutrick.png';
import { useAuth } from '../../Context/authContext';

const RegisterVendedor = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    nombreNegocio: '',
    nit: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    tipoProductos: '',
    descripcion: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    if (!form.nombreNegocio || !form.email || !form.telefono || !form.password) {
      setError('Completa los campos obligatorios de tu tienda.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }
    if (form.password.length < 8) {
      setError('La contraseña debe tener mínimo 8 caracteres.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const res = register('vendedor', { ...form, password: form.password });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setExito(true);
    setTimeout(() => navigate('/vendedor/dashboard'), 1200);
  };

  return (
    <div className="vendedor-main">
      <div className="vendedor-header">
        <div className="vendedor-logo-circle">
          <Link to="/">
            <img src={logo} alt="Logo Nutrik" className="vendedor-logo" />
          </Link>
        </div>
        <div className="vendedor-header-text">
          <h1>Registra tu tienda</h1>
          <p>Forma parte de Nutrik y vende a miles de clientes 🏪</p>
        </div>
      </div>

      <div className="vendedor-form-container">
        <div className="vendedor-card">
          <h2 className="vendedor-title">Datos de tu negocio</h2>

          {error && <div className="form-error">{error}</div>}
          {exito && <div className="form-ok">¡Tienda creada! Redirigiendo a tu panel...</div>}

          <form className="vendedor-form" onSubmit={enviar}>
            <div className="field-group">
              <label className="field-label">Nombre del negocio / tienda *</label>
              <input type="text" name="nombreNegocio" placeholder="Ej: Tienda Nutrik S.A.S" value={form.nombreNegocio} onChange={cambiar} required />
            </div>

            <div className="field-group">
              <label className="field-label">NIT o documento empresarial</label>
              <input type="text" name="nit" placeholder="Ej: 901234567-8" value={form.nit} onChange={cambiar} />
            </div>

            <div className="field-group">
              <label className="field-label">Correo del negocio *</label>
              <input type="email" name="email" placeholder="ventas@tutienda.com" value={form.email} onChange={cambiar} required />
            </div>

            <div className="field-group">
              <label className="field-label">Teléfono de contacto *</label>
              <input type="tel" name="telefono" placeholder="300 123 4567" value={form.telefono} onChange={cambiar} required />
            </div>

            <div className="field-group">
              <label className="field-label">Dirección</label>
              <input type="text" name="direccion" placeholder="Calle 10 # 5-12" value={form.direccion} onChange={cambiar} />
            </div>

            <div className="field-group">
              <label className="field-label">Ciudad</label>
              <input type="text" name="ciudad" placeholder="Bogotá" value={form.ciudad} onChange={cambiar} />
            </div>

            <div className="field-group">
              <label className="field-label">Tipo de productos que vendes *</label>
              <select className="select-custom" name="tipoProductos" value={form.tipoProductos} onChange={cambiar} required>
                <option value="" disabled>Selecciona una categoría</option>
                <option value="suplementos">Suplementos en polvo</option>
                <option value="snacks">Snacks saludables</option>
                <option value="congelados">Congelados</option>
                <option value="frutas">Frutas y verduras</option>
                <option value="lacteos">Lácteos y huevos</option>
                <option value="granos">Cereales y granos</option>
                <option value="vitaminas">Vitaminas y bienestar</option>
                <option value="variedad">Variedad de productos</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Descripción del negocio</label>
              <textarea
                name="descripcion"
                className="textarea-custom"
                rows="2"
                placeholder="Cuéntanos qué hace especial a tu tienda..."
                value={form.descripcion}
                onChange={cambiar}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Contraseña del negocio * (mín. 8 caracteres)</label>
              <input type="password" name="password" placeholder="Crea una contraseña segura" value={form.password} onChange={cambiar} maxLength="32" required />
            </div>

            <div className="field-group">
              <label className="field-label">Confirmar contraseña *</label>
              <input type="password" name="confirmPassword" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={cambiar} maxLength="32" required />
            </div>

            <button type="submit" className="vendedor-submit">Registrar mi tienda 🚀</button>
          </form>

          <p className="vendedor-link">
            ¿Ya tienes tienda registrada? <Link to="/vendedor/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterVendedor;