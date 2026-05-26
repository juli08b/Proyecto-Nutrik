import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer'; 
import Login from './Pages/Login';
import Register from './Pages/Register';
import Productos from './Pages/Product';
import ProductView from './Pages/ProductView';
import Contact from './Pages/Contact';
import Newproduct from './Pages/Newproduct';
import Cart from './Pages/Cart';
import './index.css';
import './App.css';

import { useState } from 'react'; // Importamos el Hook de estado para manejar el estado del menú en el componente App, que es el padre de Navbar y Home.

// Importamos el layout específico para las categorías, que incluye el Navbar y el Outlet para renderizar los componentes de cada categoría sin perder la estructura del diseño.
import CategoriasLayout from './Components/layout/CategoriasLayout';

// El componente App es el punto de entrada de tu aplicación. Aquí es donde defines las rutas y decides qué componentes mostrar en función de la URL actual.

import Frozen from './Pages/Catalog/Frozen';
import Appetizers from './Pages/Catalog/Appetizers';


function App() {
  const location = useLocation();
  // El Hook de estado se declara en el padre para que Navbar y Home puedan compartirlo
  const [menuAbierto, setMenuAbierto] = useState(false);
  // Condición de Master: Solo es verdadero si estamos en la raíz (Home)
  const esHome = location.pathname === '/';

  return (
    <>
      {/* Solo se muestra el Navbar si esHome es true */}{/* Le pasamos el estado y la función al Navbar */}
      {esHome && <Navbar  menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />}

      <Routes>
        {/* Le pasamos la función a la Home para que pueda abrirlo */}
      <Route path="/" element={<Home setMenuAbierto={setMenuAbierto} />} />
      <Route path="/header" element={<Header />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      
      {/* Aquí anidamos tus productos actuales sin perder tu ruta original */}
       // 2. Tu bloque de rutas (anidadas bajo 'catalog')
      <Route path="/catalog" element={<CategoriasLayout />}>
      <Route index element={<Catalog />} />       {/* Carga /catalog */}
      <Route path="frozen" element={<Frozen />} />   {/* Carga /catalog/frozen */}
      <Route path="appetizers" element={<Appetizers />} /> {/* Carga /catalog/appetizers */}
      </Route>

      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/productview/:id" element={<ProductView />} />
      <Route path="/newproduct" element={<Newproduct />} />


        
      </Routes>

      {/* Solo se muestra el Footer si esHome es true */}
      {esHome && <Footer />}
    </>
  );
}

export default App;
