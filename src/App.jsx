import { Routes, Route } from 'react-router-dom';
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
              <Route path="/" element={<Home />} />
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
