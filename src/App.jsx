import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'; {/*que lo agrege ----------*/} 
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';

import './App.css';

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);{/*-----*/ }

  return (
    <>
      {/* El Navbar siempre se verá porque está fuera de Routes */}
      <Navbar menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />{/*-----*/ } 

      <Routes>
        <Route path="/" element={<Home setMenuAbierto={setMenuAbierto} />} />{/*-----*/ }
        <Route path="/header" element={<Header />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
