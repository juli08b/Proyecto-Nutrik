import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer'; 
import Login from './Pages/Cliente/Login';
import Register from './Pages/Cliente/Register';
import Product from './Pages/Cliente/Product';
import Productview from './Pages/Cliente/Productview';
import Contact from './Pages/Cliente/Contact';
import Newproduct from './Pages/Cliente/Newproduct';
import Discount from './Pages/Cliente/Discount';
// El componente de panel y el proveedor del carrito se importan más abajo
import RoleSelection from "./Pages/Inicio/RoleSelection";

// Importamos las vistas para Vendedor (puedes crear estos archivos en su respectiva carpeta cuando los necesites)
// import LoginVendedor from './Pages/Inicio/LoginVendedor';
// import RegisterVendedor from './Pages/Inicio/RegisterVendedor';
// import VendorDashboard from './Pages/Inicio/VendorDashboard';

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
        
        {/* Rutas de Vendedor (Preparadas para cuando crees los componentes) */}
        {/* <Route path="/vendedor/login" element={<LoginVendedor />} /> */}
        {/* <Route path="/vendedor/registro" element={<RegisterVendedor />} /> */}
        {/* <Route path="/vendedor/dashboard" element={<VendorDashboard />} /> */}
        
        {/* Rutas anidadas de categorías */}
        <Route path="/catalog" element={<CategoriasLayout />}>
          <Route path="frozen" element={<Frozen />} />
          <Route path="snacks" element={<Snacks />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/discount" element={<Discount />} />
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
