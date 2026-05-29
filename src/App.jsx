import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer'; 
import Login from './Pages/Login';
import Register from './Pages/Register';
import Product from './Pages/Product';
import ProductView from './Pages/ProductView';
import Contact from './Pages/Contact';
import Newproduct from './Pages/Newproduct';
import Discount from './Pages/Discount';
import Cart from './Pages/Cart';
import './index.css';
import './App.css';

// Importamos el Provider y el Panel desde tu archivo Cart.jsx
import { CartProvider, CartPanel } from './Pages/Cart';

// Importamos el layout específico para las categorías
import CategoriasLayout from './Components/layout/CategoriasLayout';
import Frozen from './Pages/Catalog/Frozen';
import Snacks from './Pages/Catalog/Snacks';

function App() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // CORRECCIÓN: Usamos .toLowerCase() y verificamos si la ruta incluye login o registro
  // Esto evita fallos por barras diagonales o mayúsculas
  const pathActual = location.pathname.toLowerCase();
  const mostrarLayout = !pathActual.includes('login') && !pathActual.includes('registro');

  return (
    <CartProvider>
      
      <CartPanel />

      {/* Solo se muestra si NO estamos en login o registro */}
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
      </Routes>

      {/* Solo se muestra si NO estamos en login o registro */}
      {mostrarLayout && <Footer />}
      
    </CartProvider>
  );
}

export default App;
