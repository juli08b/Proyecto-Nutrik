import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Cliente/Login';
import Register from './Pages/Cliente/Register';
import ForgotPassword from './Pages/Cliente/ForgotPassword';
import Perfil from './Pages/Cliente/Perfil';
import Product from './Pages/Cliente/Product';
import Productview from './Pages/Cliente/Productview';
import Contact from './Pages/Cliente/Contact';
import Newproduct from './Pages/Cliente/Newproduct';
import Discount from './Pages/Cliente/Discount';
import Checkout from './Pages/Cliente/Checkout';
import RoleSelection from "./Pages/Inicio/RoleSelection";

// Vistas de Vendedor
import LoginVendedor from './Pages/Vendedor/Login';
import RegisterVendedor from './Pages/Vendedor/Register';
import VendedorLayout from './Components/VendedorLayout';

// Dashboard de Yilmer (solo visible para vendedores)
import Dashboard from './Pages/Dashboard/Dashboard';
import Productos from './Pages/Product';
import Vistaproducto from './Pages/Productview';
import './index.css';
import './App.css';

// Importamos el Provider y el Panel desde tu archivo Cart.jsx
import { CartProvider, CartPanel } from './Pages/Cliente/Cart';

// Importamos el layout específico para las categorías
import CategoriasLayout from './Components/layout/CategoriasLayout';
import Frozen from './Pages/Catalog/Frozen';
import Snacks from './Pages/Catalog/Snacks';

function App() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // CORRECCIÓN: Usamos .toLowerCase() y verificamos si la ruta incluye login, registro, elegir rol o vendedor para ocultar layout principal
  const pathActual = location.pathname.toLowerCase();
  const mostrarLayout = !pathActual.includes('login') && 
                        !pathActual.includes('registro') && 
                        !pathActual.includes('forgot') && 
                        !pathActual.includes('elegir-rol') && 
                        !pathActual.includes('vendedor');

  return (
    <CartProvider>
      
      <CartPanel />

      {/* Solo se muestra si NO estamos en login, registro, selección de roles o vistas de vendedor */}
      {mostrarLayout && (
        <Navbar menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />
      )}

      <Routes>
        <Route path="/" element={<Home setMenuAbierto={setMenuAbierto} />} />
        <Route path="/header" element={<Header />} />
        
        {/* Rutas de autenticación y roles */}
        <Route path="/elegir-rol" element={<RoleSelection />} />
        
        {/* Rutas de Cliente */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Rutas de Vendedor (login y registro sin sidebar) */}
        <Route path="/vendedor/login" element={<LoginVendedor />} />
        <Route path="/vendedor/registro" element={<RegisterVendedor />} />

        {/* Rutas de Vendedor protegidas (con sidebar) */}
        <Route path="/vendedor" element={<VendedorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productos" element={<Productos rutaBase="/vendedor/productos" />} />
          <Route path="productos/:id" element={<Vistaproducto />} />
          <Route path="pedidos" element={<div className="vendedor-page"><h1>Pedidos</h1><p>Próximamente…</p></div>} />
          <Route path="facturas" element={<div className="vendedor-page"><h1>Facturas</h1><p>Próximamente…</p></div>} />
          <Route path="clientes" element={<div className="vendedor-page"><h1>Clientes</h1><p>Próximamente…</p></div>} />
          <Route path="ventas" element={<div className="vendedor-page"><h1>Ventas</h1><p>Próximamente…</p></div>} />
          <Route path="configuracion" element={<div className="vendedor-page"><h1>Configuración</h1><p>Próximamente…</p></div>} />
        </Route>
        
        {/* Rutas anidadas de categorías */}
        <Route path="/catalog" element={<CategoriasLayout />}>
          <Route path="frozen" element={<Frozen />} />
          <Route path="snacks" element={<Snacks />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<CartPanel />} />
        <Route path="/productos" element={<Product />} />
        <Route path="/Productview/:id" element={<Productview />} />
        <Route path="/newproduct" element={<Newproduct />} />
      </Routes>

      {/* Solo se muestra si NO estamos en login, registro, selección de roles o vistas de vendedor */}
      {mostrarLayout && <Footer />}
      
    </CartProvider>
  );
}

export default App;