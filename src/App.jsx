import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import SidebarVendedor from './Components/SidebarVendedor';
import { useAuth } from './Context/authContext';
import AsistenteNutrik from './Components/AsistenteNutrik';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Cliente/Login';
import Register from './Pages/Cliente/Register';
import ForgotPassword from './Pages/Cliente/ForgotPassword';
import Perfil from './Pages/Cliente/Perfil';
import MisPedidos from './Pages/Cliente/MisPedidos';
import SeguimientoPedido from './Pages/Cliente/SeguimientoPedido';
import Product from './Pages/Cliente/Product';
import Productview from './Pages/Cliente/Productview';
import About from './Pages/Cliente/About';
import Discount from './Pages/Cliente/Discount';
import Checkout from './Pages/Cliente/Checkout';
import RoleSelection from "./Pages/Inicio/RoleSelection";
import NotFound from './Pages/NotFound';

// Panel de marketplace (la ruta /vendedor se conserva como alias compatible)
import LoginVendedor from './Pages/Vendedor/Login';
import RegisterVendedor from './Pages/Vendedor/Register';
import VendedorLayout from './Components/VendedorLayout';
import PedidosVendedor from './Pages/Vendedor/Pedidos';
import FacturaDetalle from './Pages/Vendedor/FacturaDetalle';
import Dashboard from './Pages/Dashboard/Dashboard';
import Usuarios from './Pages/Dashboard/Usuarios';
import Actividad from './Pages/Dashboard/Actividad';
import AdminLogin from './Pages/Dashboard/AdminLogin';
import SellerProduct from './Pages/Vendedor/SellerProduct';
import ConfiguracionVendedor from './Pages/Vendedor/Configuracion';
import Vistaproducto from './Pages/Productview';
import './index.css';
import './App.css';

// El carrito del CLIENTE es global: el Provider guarda los productos
// y el Panel es el carrito lateral. Lo usan Navbar, el catálogo y Checkout.
// (El panel del VENDEDOR vive en Pages/Vendedor/Pedidos.jsx)
import { CartProvider, CartPanel } from './Pages/Cliente/Cart';

// El catálogo de productos del VENDEDOR es global: el Provider lo comparte
// entre el panel de productos (SellerProduct) y cualquier otra vista.
import ProductProvider from './Context/ProductProvider';

// Importamos el layout específico para las categorías
import CategoriasLayout from './Components/layout/CategoriasLayout';
import Frozen from './Pages/Catalog/Frozen';
import Snacks from './Pages/Catalog/Snacks';
import Category from './Pages/Catalog/Category';
import Invoice from './Pages/Invoice';

function App() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Al cambiar de ruta, subir siempre al inicio de la página.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const { user } = useAuth();
  const pathActual = location.pathname.toLowerCase();
  const esPaginaAuth =
    ['login', 'registro', 'forgot', 'elegir-rol'].some((p) => pathActual.includes(p)) ||
    pathActual === '/nutrik/owner';
  const esAreaVendedor = /^\/(vendedor|mis-productos|admin)(\/|$)/.test(pathActual);
  const mostrarLayout = !esPaginaAuth && !esAreaVendedor;
  const mostrarNavbar = !esPaginaAuth;
  const esCuenta = /^\/(perfil|mis-pedidos|seguimiento|favoritos|vendedor|mis-productos|admin)(\/|$)/.test(pathActual);
  const mostrarSidebar = mostrarNavbar && Boolean(user) && esCuenta;

  useEffect(() => {
    document.body.classList.toggle('con-sidebar', mostrarSidebar);
    return () => document.body.classList.remove('con-sidebar');
  }, [mostrarSidebar]);

  return (
    <ProductProvider>
      <CartProvider>
      
      <CartPanel />

      {/* Solo se muestra si NO estamos en login, registro, selección de roles o vistas de vendedor */}
      {mostrarNavbar && (
        <Navbar menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />
      )}
      {mostrarSidebar && <SidebarVendedor />}

      <Routes>
        <Route path="/" element={<Home setMenuAbierto={setMenuAbierto} />} />
        <Route path="/header" element={<Header />} />
        
        {/* Rutas de autenticación y roles */}
        <Route path="/elegir-rol" element={<RoleSelection />} />
        
        {/* Rutas de Cliente */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Ruta privada sin enlaces públicos: acceso del propietario */}
        <Route path="/nutrik/owner" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/mis-pedidos" element={<MisPedidos />} />
        <Route path="/seguimiento" element={<SeguimientoPedido />} />
        <Route path="/favoritos" element={<main className="cuenta-pendiente"><h1>Favoritos</h1><p>La lista de favoritos aún no está disponible.</p></main>} />
        
        {/* Alias de autenticación heredados; todas las cuentas nuevas son user. */}
        <Route path="/vendedor/login" element={<LoginVendedor />} />
        <Route path="/vendedor/registro" element={<RegisterVendedor />} />

        {/* Panel común de marketplace para user y admin */}
        <Route path="/vendedor" element={<VendedorLayout />}>
          <Route index element={<SellerProduct />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productos" element={<SellerProduct />} />
          <Route path="productos/:id" element={<Vistaproducto />} />
          <Route path="pedidos" element={<PedidosVendedor />} />
          <Route path="facturas" element={<Invoice />} />
          <Route path="facturas/:id" element={<FacturaDetalle />} />
          <Route path="clientes" element={<div className="vendedor-page"><h1>Clientes</h1><p>Próximamente…</p></div>} />
          <Route path="ventas" element={<div className="vendedor-page"><h1>Ventas</h1><p>Próximamente…</p></div>} />
          <Route path="configuracion" element={<ConfiguracionVendedor />} />
        </Route>
        <Route path="/mis-productos" element={<VendedorLayout />}>
          <Route index element={<SellerProduct />} />
          <Route path="ventas" element={<PedidosVendedor />} />
        </Route>
        <Route path="/admin" element={<VendedorLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="actividad" element={<Actividad />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="productos" element={<SellerProduct />} />
          <Route path="pedidos" element={<PedidosVendedor />} />
        </Route>
        
        {/* Rutas anidadas de categorías */}
        <Route path="/catalog" element={<CategoriasLayout />}>
          <Route path="frozen" element={<Frozen />} />
          <Route path="snacks" element={<Snacks />} />
          <Route path="frutas" element={<Category slug="frutas" />} />
          <Route path="aves-pescados" element={<Category slug="aves-pescados" />} />
          <Route path="lacteos-huevos" element={<Category slug="lacteos-huevos" />} />
          <Route path="cereales-granos" element={<Category slug="cereales-granos" />} />
          <Route path="vitaminas" element={<Category slug="vitaminas" />} />
          <Route path="suplementos" element={<Category slug="suplementos" />} />
        </Route>

        <Route path="/nosotros" element={<About />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/descuentos" element={<Discount />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/productos" element={<Product />} />
        <Route path="/Productview/:id" element={<Productview />} />

        {/* Cualquier dirección que no exista cae aquí (en vez de pantalla en blanco) */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Solo se muestra si NO estamos en login, registro, selección de roles o vistas de vendedor */}
      {mostrarLayout && pathActual !== '/perfil' && pathActual !== '/checkout' && <Footer />}

      {/* Asistente Nutrik: avatar flotante con retos, recordatorios y sugerencias */}
      {mostrarLayout && <AsistenteNutrik />}
      
      </CartProvider>
    </ProductProvider>
  );
}

export default App;