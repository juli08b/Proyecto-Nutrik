import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

// Layout y Componentes Base
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';

// Vistas de Cliente
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
import NotFound from './Pages/NotFound';

// Vistas de Gestión y Vendedor
import RegisteredProducts from './Pages/RegisteredProducts';
import { GestionProductos } from './Pages/GestionProductos'; // <-- Vista con el botón + Nuevo producto
import LoginVendedor from './Pages/Vendedor/Login';
import RegisterVendedor from './Pages/Vendedor/Register';
import VendedorLayout from './Components/VendedorLayout';
import PedidosVendedor from './Pages/Vendedor/Pedidos';
import Dashboard from './Pages/Dashboard/Dashboard';

// Contextos Globales
import { CartProvider, CartPanel } from './Pages/Cliente/Cart';
import { ProductProvider } from './Pages/ProductContext'; // <-- Importamos el Provider de Productos

// Layouts de Categorías
import CategoriasLayout from './Components/layout/CategoriasLayout';
import Frozen from './Pages/Catalog/Frozen';
import Snacks from './Pages/Catalog/Snacks';

import './index.css';
import './App.css';

function App() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Verificamos si la ruta oculta el Navbar/Footer del cliente
  const pathActual = location.pathname.toLowerCase();
  const mostrarLayout = !pathActual.includes('login') && 
                        !pathActual.includes('registro') && 
                        !pathActual.includes('forgot') && 
                        !pathActual.includes('elegir-rol') && 
                        !pathActual.includes('vendedor');

  return (
    <ProductProvider>
      <CartProvider>
        <CartPanel />

        {/* Navbar del Cliente */}
        {mostrarLayout && (
          <Navbar menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />
        )}

        <Routes>
          {/* Inicio */}
          <Route path="/" element={<Home setMenuAbierto={setMenuAbierto} />} />
          <Route path="/header" element={<Header />} />
          <Route path="/elegir-rol" element={<RoleSelection />} />
          
          {/* Cliente Autenticación y Perfil */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/perfil" element={<Perfil />} />
          
          {/* Catálogo Público de Cliente */}
          <Route path="/productos" element={<Product />} />
          <Route path="/productview/:id" element={<Productview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/descuentos" element={<Discount />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/newproduct" element={<Newproduct />} />

          {/* RUTA DE GESTIÓN / REGISTRO DE PRODUCTOS */}
          <Route path="/admin/productos" element={<GestionProductos />} />

          {/* Rutas de Categorías */}
          <Route path="/catalog" element={<CategoriasLayout />}>
            <Route path="frozen" element={<Frozen />} />
            <Route path="snacks" element={<Snacks />} />
          </Route>

          {/* Vendedor (Sin Sidebar) */}
          <Route path="/vendedor/login" element={<LoginVendedor />} />
          <Route path="/vendedor/registro" element={<RegisterVendedor />} />

          {/* Vendedor Protegido (Con Sidebar) */}
          <Route path="/vendedor" element={<VendedorLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="productos" element={<GestionProductos />} />
            <Route path="productos/:id" element={<Productview />} />
            <Route path="productos/registrados" element={<RegisteredProducts />} />
            <Route path="pedidos" element={<PedidosVendedor />} />
            <Route path="facturas" element={<div className="vendedor-page"><h1>Facturas</h1><p>Próximamente…</p></div>} />
            <Route path="clientes" element={<div className="vendedor-page"><h1>Clientes</h1><p>Próximamente…</p></div>} />
            <Route path="ventas" element={<div className="vendedor-page"><h1>Ventas</h1><p>Próximamente…</p></div>} />
            <Route path="configuracion" element={<div className="vendedor-page"><h1>Configuración</h1><p>Próximamente…</p></div>} />
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer del Cliente */}
        {mostrarLayout && <Footer />}
      </CartProvider>
    </ProductProvider>
  );
}

export default App;