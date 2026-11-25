import { Outlet } from 'react-router-dom';

// Contenedor común para las rutas anidadas de categorías.
const CategoriasLayout = () => {
  return (
    <div className="layout-container">
      <main className="main-content-wrapper">
        <Outlet />
      </main>
    </div>
  );
};

export default CategoriasLayout;