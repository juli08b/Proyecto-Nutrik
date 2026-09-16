import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer'; 

// Importaciones desde la carpeta Cliente
import Login from './Pages/Cliente/Login';
import Register from './Pages/Cliente/Register';
import Product from './Pages/Cliente/Product';
import ProductView from './Pages/Cliente/Productview';
import Contact from './Pages/Cliente/Contact';
import Newproduct from './Pages/Cliente/Newproduct';
import Discount from './Pages/Cliente/Discount';
import Cart from './Pages/Cliente/Cart';

// Importamos las páginas fuera de cliente
import Invoice from './Pages/Invoice';
import Client from './Pages/Client';

import './index.css';
import './App.css';

// Importamos el Provider y el Panel desde el archivo Cart en Cliente
import { CartProvider, CartPanel } from './Pages/Cliente/Cart';

// Importamos el layout específico para las categorías
import CategoriasLayout from './Components/layout/CategoriasLayout';
import Frozen from './Pages/Catalog/Frozen';
import Snacks from './Pages/Catalog/Snacks';

function App() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const pathActual = location.pathname.toLowerCase();
  const mostrarLayout = !pathActual.includes('login') && !pathActual.includes('registro');

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
        
        {/* Rutas anidadas de categorías */}
        <Route path="/catalog" element={<CategoriasLayout />}>
          <Route path="frozen" element={<Frozen />} />
          <Route path="snacks" element={<Snacks />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productos" element={<Product />} />
        <Route path="/productview/:id" element={<ProductView />} />
        <Route path="/newproduct" element={<Newproduct />} />

        {/* Rutas de Facturación y Clientes */}
        <Route path="/facturas" element={<Invoice />} />
        <Route path="/clientes" element={<Client />} />
      </Routes>

      {mostrarLayout && <Footer />}
      
    </CartProvider>
  );
}

export default App;