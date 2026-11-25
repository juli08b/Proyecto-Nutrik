import { Outlet } from 'react-router-dom';

const VendedorLayout = () => {
  return (
    <div className="vendedor-layout">
      <main className="vendedor-main">
        <div className="vendedor-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendedorLayout;