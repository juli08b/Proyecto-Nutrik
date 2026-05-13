import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer'; 

// 👇 importa tus páginas
import Login from './Pages/Login';
import Register from './Pages/Register';

import './index.css';

function App() {
  return (
    <Routes>
      {/* Redirige la raíz directamente a registro para que lo veas de una */}
      <Route path="/" element={<Navigate to="/register" />} />

      {/* 🔓 Rutas SIN Navbar ni Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
  );
}

export default App;
