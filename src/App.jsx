import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import SidebarVendedor from './Components/SidebarVendedor';
import { useAuth } from './Context/authContext';
import { ROLES } from './constants/roles';
import AsistenteNutrik from './Components/AsistenteNutrik';
import Home from './Pages/public/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import ForgotPassword from './Pages/auth/ForgotPassword';
import Perfil from './Pages/account/Perfil';
import MisPedidos from './Pages/account/MisPedidos';
import SeguimientoPedido from './Pages/account/SeguimientoPedido';
import Product from './Pages/catalog/Product';
import Productview from './Pages/catalog/Productview';
import About from './Pages/public/About';
import Discount from './Pages/public/Discount';
import Checkout from './Pages/checkout/Checkout';
import NotFound from './Pages/NotFound';

// Vistas por rol
import MarketplaceLayout from './layouts/MarketplaceLayout';
import PedidosVendedor from './Pages/marketplace/Pedidos';
import FacturaDetalle from './Pages/marketplace/FacturaDetalle';
import Dashboard from './Pages/admin/Dashboard';
import Usuarios from './Pages/admin/Usuarios';
import Actividad from './Pages/admin/Actividad';
import AdminLayout from './Pages/admin/AdminLayout';
import AdminCategorias from './Pages/admin/AdminCategorias';
import AdminPedidos from './Pages/admin/AdminPedidos';
import SellerProduct from './Pages/marketplace/SellerProduct';
import ConfiguracionVendedor from './Pages/marketplace/Configuracion';
import Vistaproducto from './Pages/marketplace/Productview';
import './index.css';
import './App.css';

// El carrito del CLIENTE es global: el Provider guarda los productos
// y el Panel es el carrito lateral. Lo usan Navbar, el catálogo y Checkout.
import { CartProvider, CartPanel } from './Pages/checkout/Cart';

// El catálogo de productos del VENDEDOR es global: el Provider lo comparte
// entre el panel de productos (SellerProduct) y cualquier otra vista.
import ProductProvider from './Context/ProductProvider';

// Importamos el layout específico para las categorías
import CatalogLayout from './layouts/CatalogLayout';
import Frozen from './Pages/catalog/Frozen';
import Snacks from './Pages/catalog/Snacks';
import Category from './Pages/catalog/Category';
import Invoice from './Pages/marketplace/Invoice';

function App() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Al cambiar de ruta, subir siempre al inicio de la página.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const { user } = useAuth();
  const pathActual = location.pathname.toLowerCase();
  const esRutaAdmin = /^\/admin(\/|$)/.test(pathActual);
  // La ruta determina qué elementos compartidos se muestran alrededor de la vista.
  const esPaginaAuth =
    ['login', 'registro', 'forgot', 'elegir-rol'].some((p) => pathActual.includes(p)) ||
    pathActual === '/nutrik/owner';
  const esAreaVendedor = /^\/(vendedor|mis-productos|admin)(\/|$)/.test(pathActual);
  const mostrarLayout = !esPaginaAuth && !esAreaVendedor;
  const mostrarNavbar = !esPaginaAuth;
  const esCuenta = /^\/(perfil|mis-pedidos|seguimiento|favoritos|vendedor|mis-productos|admin)(\/|$)/.test(pathActual);
  const mostrarSidebar = mostrarNavbar && Boolean(user) && esCuenta
    && !esRutaAdmin && user.role !== ROLES.ADMIN;

  useEffect(() => {
    document.body.classList.toggle('con-sidebar', mostrarSidebar);
    return () => document.body.classList.remove('con-sidebar');
  }, [mostrarSidebar]);

  if (esRutaAdmin || user?.role === ROLES.ADMIN) {
    return (
      <ProductProvider>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard administracion />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="productos" element={<SellerProduct administracion />} />
            <Route path="categorias" element={<AdminCategorias />} />
            <Route path="pedidos" element={<AdminPedidos />} />
            <Route path="actividad" element={<Actividad />} />
            <Route path="*" element={<section><h1>Sección no encontrada</h1></section>} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </ProductProvider>
    );
  }

  return (
    <ProductProvider>
      <CartProvider>
      
      <CartPanel />

      {/* La barra superior también se muestra en las áreas de cuenta y marketplace. */}
      {mostrarNavbar && (
        <Navbar menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} mostrarSidebar={mostrarSidebar} />
      )}
      {mostrarSidebar && <SidebarVendedor />}

      <Routes>
        <Route path="/" element={<Home setMenuAbierto={setMenuAbierto} />} />
        <Route path="/header" element={<Header />} />
        
        {/* Acceso público unificado */}
        <Route path="/elegir-rol" element={<Navigate to="/login" replace />} />
        
        {/* Rutas de Cliente */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/nutrik/owner" element={<Navigate to="/login" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/mis-pedidos" element={<MisPedidos />} />
        <Route path="/seguimiento" element={<SeguimientoPedido />} />
        <Route path="/favoritos" element={<main className="cuenta-pendiente"><h1>Favoritos</h1><p>La lista de favoritos aún no está disponible.</p></main>} />
        
        {/* Alias heredados: redirigen al acceso público único. */}
        <Route path="/vendedor/login" element={<Navigate to="/login" replace />} />
        <Route path="/vendedor/registro" element={<Navigate to="/registro" replace />} />

        {/* Panel común de marketplace para user y admin */}
        <Route path="/vendedor" element={<MarketplaceLayout />}>
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
        <Route path="/mis-productos" element={<MarketplaceLayout />}>
          <Route index element={<SellerProduct />} />
          <Route path="ventas" element={<PedidosVendedor />} />
        </Route>
        
        {/* Rutas anidadas de categorías */}
        <Route path="/catalog" element={<CatalogLayout />}>
          <Route path="frozen" element={<Frozen />} />
          <Route path="snacks" element={<Snacks />} />
          <Route path="lacteos-huevos" element={<Category slug="lacteos-huevos" />} />
          <Route path="cereales-granos" element={<Category slug="cereales-granos" />} />
          <Route path="vitaminas" element={<Category slug="vitaminas" />} />
          <Route path="suplementos" element={<Category slug="suplementos" />} />
          <Route path="frutos-secos-semillas" element={<Category slug="frutos-secos-semillas" />} />
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
      {mostrarLayout &&
        pathActual !== '/perfil' &&
        pathActual !== '/checkout' &&
        pathActual !== '/nosotros' &&
        <Footer />}

      {/* Asistente Nutrik: avatar flotante con retos, recordatorios y sugerencias */}
      {mostrarLayout && <AsistenteNutrik />}
      
      </CartProvider>
    </ProductProvider>
  );
}

export default App;