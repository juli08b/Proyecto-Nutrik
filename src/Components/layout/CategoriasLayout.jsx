import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const CategoriasLayout = () => {
  return (
    <div className="layout-container">
      {/* El Navbar siempre se mostrará arriba */}
      <Navbar />
        

      <main className="main-content-wrapper">
        <Outlet /> {/* El Outlet renderizará el componente específico de cada ruta */}
      </main>
      
      {/* Opcional: Footer si lo tienes */}
    </div>
  );
};

export default CategoriasLayout;