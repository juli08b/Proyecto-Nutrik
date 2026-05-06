import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer'; 
import Login from './Pages/Login';
import Register from './Pages/Register';
import './index.css';

function App() {
  // Obtenemos la ubicación actual (la URL)
  const location = useLocation();

  // Definimos en qué rutas NO queremos que aparezca el Navbar o el Footer
  // Por ejemplo: login y Registro (
  const ocultarLayout = location.pathname === '/login' || location.pathname === '/Registro';

  return (
    <>
      {/* Solo se muestra el Navbar si NO estamos en login o registro */}
      {!ocultarLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registro" element={<Register />} />
      </Routes>

      {/* También podemos ocultar el Footer en esas páginas si quieres que el Login sea pantalla completa */}
      {!ocultarLayout && <Footer />}
    </>
  );
}

export default App;
