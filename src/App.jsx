import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Productos from './Pages/Product';
import Vistaproducto from './Pages/Vistaproducto';
import './index.css';

function App() {
  return (
    <>
      {/* El Navbar siempre se verá porque está fuera de Routes */}
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/productos" element={< Productos/>} />
        <Route path="/vistaproducto" element={<Vistaproducto />} />
      </Routes>

      <Footer />

    </>
    
  );
}

export default App;
