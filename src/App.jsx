import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer'; 

// Páginas navegables
import Login from './Pages/Login';
import Register from './Pages/Register';

import './index.css';

function App() {
  return (
    <>
      {/* 
          Colocamos Navbar aquí si quieres que aparezca en TODAS las páginas.
          Si el Login NO debe tener Navbar, entonces usamos la estructura de abajo.
      */}
      <Navbar />

      <Routes>
        {/* Ruta principal: Home */}
        <Route path="/" element={<Home />} />

        {/* Otras rutas de componentes o páginas */}
        <Route path="/header" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Puedes agregar aquí las rutas de tus compañeros conforme las fusiones */}
        {/* <Route path="/carrito" element={<Cart />} /> */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
