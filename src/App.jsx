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
import ProductView from './Pages/Cliente/Productview';
import Contact from './Pages/Cliente/Contact';
import Newproduct from './Pages/Cliente/Newproduct';
import Discount from './Pages/Cliente/Discount';
import Cart from './Pages/Cliente/Cart';
import Checkout from './Pages/Cliente/Checkout';
import RoleSelection from './Pages/Inicio/RoleSelection';
import NotFound from './Pages/NotFound';
import LoginVendedor from './Pages/Vendedor/Login';
import RegisterVendedor from './Pages/Vendedor/Register';
import VendedorLayout from './Components/VendedorLayout';
import PedidosVendedor from './Pages/Vendedor/Pedidos';
import Dashboard from './Pages/Dashboard/Dashboard';
import Productos from './Pages/Product';
import Vistaproducto from './Pages/Productview';
import Invoice from './Pages/Invoice';
import Client from './Pages/Client';
import FacturaView from './Pages/Vendedor/FacturaView';

import './index.css';
import './App.css';

import { CartProvider, CartPanel } from './Pages/Cliente/Cart';

import CategoriasLayout from './Components/layout/CategoriasLayout';
import Frozen from './Pages/Catalog/Frozen';
import Snacks from './Pages/Catalog/Snacks';

function App() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const pathActual = location.pathname.toLowerCase();
  const mostrarLayout = !pathActual.includes('login') &&
                        !pathActual.includes('registro') &&
                        !pathActual.includes('forgot') &&
                        !pathActual.includes('elegir-rol') &&
                        !pathActual.includes('vendedor');

  return (
    <CartProvider>
      <CartPanel />

      {mostrarLayout && (
        <Navbar menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />
      )}

      <Routes>
        <Route path="/" element={<Home setMenuAbierto={setMenuAbierto} />} />
        <Route path="/header" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/elegir-rol" element={<RoleSelection />} />
        <Route path="/perfil" element={<Perfil />} />

        <Route path="/vendedor/login" element={<LoginVendedor />} />
        <Route path="/vendedor/registro" element={<RegisterVendedor />} />
        <Route path="/vendedor" element={<VendedorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productos" element={<Productos rutaBase="/vendedor/productos" />} />
          <Route path="productos/:id" element={<Vistaproducto />} />
          <Route path="pedidos" element={<PedidosVendedor />} />
          <Route path="facturas" element={<div className="vendedor-page"><h1>Facturas</h1><p>Próximamente...</p></div>} />
          <Route path="clientes" element={<div className="vendedor-page"><h1>Clientes</h1><p>Próximamente...</p></div>} />
          <Route path="ventas" element={<div className="vendedor-page"><h1>Ventas</h1><p>Próximamente...</p></div>} />
          <Route path="configuracion" element={<div className="vendedor-page"><h1>Configuración</h1><p>Próximamente...</p></div>} />
        </Route>

        <Route path="/catalog" element={<CategoriasLayout />}>
          <Route path="frozen" element={<Frozen />} />
          <Route path="snacks" element={<Snacks />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/descuentos" element={<Discount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/productos" element={<Product />} />
        <Route path="/productview/:id" element={<ProductView />} />
        <Route path="/newproduct" element={<Newproduct />} />
        <Route path="/FacturaView" element={<FacturaView />} />
        <Route path="/FacturaDetalle" element={<Invoice />} />
        <Route path="/clientes" element={<Client />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {mostrarLayout && <Footer />}
    </CartProvider>
  );
}

export default App;
