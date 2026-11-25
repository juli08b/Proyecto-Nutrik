import { Outlet } from 'react-router-dom';

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