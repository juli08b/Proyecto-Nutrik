<<<<<<< HEAD
import { Routes, Route, useLocation } from 'react-router-dom';
=======
import { Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> origin/juliana
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer'; 
import Login from './Pages/Login';
import Register from './Pages/Register';
import Productos from './Pages/Product';
import ProductView from './Pages/ProductView';
import Contact from './Pages/Contact';
import './index.css';
import './App.css';

function App() {
  const location = useLocation();

  // Condición de Master: Solo es verdadero si estamos en la raíz (Home)
  const esHome = location.pathname === '/';

  return (
<<<<<<< HEAD
    <>
      {/* Solo se muestra el Navbar si esHome es true */}
      {esHome && <Navbar />}
=======
    <Routes>
      {/* Redirige la raíz directamente a registro para que lo veas de una */}
      <Route path="/" element={<Navigate to="/register" />} />
>>>>>>> origin/juliana

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/header" element={<Header />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Registro" element={<Register />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product-view" element={<ProductView />} />

<<<<<<< HEAD
        
      </Routes>

      {/* Solo se muestra el Footer si esHome es true */}
      {esHome && <Footer />}
    </>
=======
      {/* 🔒 Rutas CON layout normal */}
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <Routes>
              {/* Cambiado temporalmente para que Home no sea la principal */}
              <Route path="/home" element={<Home />} />
              <Route path="/header" element={<Header />} />
            </Routes>
            <Footer />
          </>
        }
      />
    </Routes>
>>>>>>> origin/juliana
  );
}

export default App;
