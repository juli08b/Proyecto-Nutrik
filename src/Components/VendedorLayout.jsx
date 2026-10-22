import { Outlet } from 'react-router-dom';
import SidebarVendedor from './SidebarVendedor';
import HeaderVendedor from './HeaderVendedor';

const VendedorLayout = () => {
  return (
    <div className="vendedor-layout">
      <SidebarVendedor />
      <main className="vendedor-main">
        <HeaderVendedor />
        <div className="vendedor-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendedorLayout;