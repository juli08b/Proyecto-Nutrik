import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Product from './Pages/Product';
import ProductView from './Pages/Productview';
import Contact from './Pages/Contact';
import Discount from './Pages/Discount';
import RegisteredProducts from "./Pages/RegisteredProducts";
import EditProduct from "./Pages/EditProduct";
import Cart from './Pages/Cart';
import './index.css';
import './App.css';

// 1. Importamos el proveedor de productos
import { ProductProvider } from './Pages/ProductContext';

// 2. Importamos el gestor con el nuevo nombre
import { GestionProductos } from './Pages/GestionProductos';

// Importamos el Provider y el Panel desde tu archivo Cart.jsx
import { CartProvider, CartPanel } from './Pages/Cart';

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
    // ProductProvider va afuera de todo para que la lista de productos esté disponible en TODAS las rutas
    <ProductProvider>
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

          {/* Tu ruta declarada exactamente igual que las demás */}
          <Route path="/newproduct" element={<GestionProductos />} />

          <Route path="/mis-productos" element={<RegisteredProducts />} />
          <Route path="/editar-producto/:id" element={<EditProduct />} />
        </Routes>

        {/* Solo se muestra si NO estamos en login o registro */}
        {mostrarLayout && <Footer />}

      </CartProvider>
    </ProductProvider>
  );
}

export default App;