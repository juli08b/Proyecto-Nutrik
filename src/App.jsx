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

function App() {
  const location = useLocation();

  // Condición de Master: Solo es verdadero si estamos en la raíz (Home)
  const esHome = location.pathname === '/';

  return (
    <>
      {/* Solo se muestra el Navbar si esHome es true */}
      {esHome && <Navbar />}

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/header" element={<Header />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Registro" element={<Register />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product-view" element={<ProductView />} />
      <Route path="/newproduct" element={<Newproduct />} />

        
      </Routes>

      {/* Solo se muestra el Footer si esHome es true */}
      {esHome && <Footer />}
    </>
  );
}

export default App;
