import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
// import SidebarVendedor from "./Components/SidebarVendedor"; // ❌ Ya no se usa aquí
import { useAuth } from "./Context/authContext";
import AsistenteNutrik from "./Components/AsistenteNutrik";
import Home from "./Pages/public/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import Perfil from "./Pages/account/Perfil";
import MisPedidos from "./Pages/account/MisPedidos";
import SeguimientoPedido from "./Pages/account/SeguimientoPedido";
import Product from "./Pages/catalog/Product";
import Productview from "./Pages/catalog/Productview";
import About from "./Pages/public/About";
import Discount from "./Pages/public/Discount";
import Checkout from "./Pages/checkout/Checkout";
import NotFound from "./Pages/NotFound";

// Vistas por rol
import MarketplaceLayout from "./layouts/MarketplaceLayout";
import PedidosVendedor from "./Pages/marketplace/Pedidos";
import FacturaDetalle from "./Pages/marketplace/FacturaDetalle";
import Dashboard from "./Pages/admin/Dashboard";
import Usuarios from "./Pages/admin/Usuarios";
import Actividad from "./Pages/admin/Actividad";
import AdminLogin from "./Pages/admin/AdminLogin";
import SellerProduct from "./Pages/marketplace/SellerProduct";
import ConfiguracionVendedor from "./Pages/marketplace/Configuracion";
import Vistaproducto from "./Pages/marketplace/Productview";
import "./index.css";
import "./App.css";

import { CartProvider, CartPanel } from "./Pages/checkout/Cart";
import ProductProvider from "./Context/ProductProvider";

import CatalogLayout from "./layouts/CatalogLayout";
import Frozen from "./Pages/catalog/Frozen";
import Snacks from "./Pages/catalog/Snacks";
import Category from "./Pages/catalog/Category";
import Invoice from "./Pages/marketplace/Invoice";

function App() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const { user } = useAuth();
  const pathActual = location.pathname.toLowerCase();

  const esPaginaAuth =
    ["login", "registro", "forgot", "elegir-rol"].some((p) =>
      pathActual.includes(p),
    ) || pathActual === "/nutrik/owner";

  const esAreaVendedor = /^\/(vendedor|mis-productos|admin)(\/|$)/.test(
    pathActual,
  );

  const mostrarLayout = !esPaginaAuth && !esAreaVendedor;

  // ✅ CORRECCIÓN 1: El Navbar global NO se muestra en área de vendedor (el Layout lo pone)
  const esAreaCuenta =
    /^\/(perfil|mis-pedidos|seguimiento|favoritos)(\/|$)/.test(pathActual);
  const mostrarNavbar = !esPaginaAuth && !esAreaVendedor && !esAreaCuenta;

  return (
    <ProductProvider>
      <CartProvider>
        <CartPanel />

        {/* ✅ CORRECCIÓN 2: El Navbar ahora se oculta en las rutas de vendedor/admin */}
        {mostrarNavbar && (
          <Navbar menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />
        )}

        {/* ❌ ELIMINADO: {mostrarSidebar && <SidebarVendedor />} */}

        <Routes>
          <Route path="/" element={<Home setMenuAbierto={setMenuAbierto} />} />
          <Route path="/header" element={<Header />} />

          <Route
            path="/elegir-rol"
            element={<Navigate to="/login" replace />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/nutrik/owner" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<MarketplaceLayout />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/mis-pedidos" element={<MisPedidos />} />
            <Route path="/seguimiento" element={<SeguimientoPedido />} />
            <Route
              path="/favoritos"
              element={
                <main className="cuenta-pendiente">
                  <h1>Favoritos</h1>
                  <p>La lista de favoritos aún no está disponible.</p>
                </main>
              }
            />
          </Route>

          <Route
            path="/vendedor/login"
            element={<Navigate to="/login" replace />}
          />
          <Route
            path="/vendedor/registro"
            element={<Navigate to="/registro" replace />}
          />

          {/* ✅ Las rutas de vendedor/admin usan MarketplaceLayout (que ya incluye Navbar + Sidebar) */}
          <Route path="/vendedor" element={<MarketplaceLayout />}>
            <Route index element={<SellerProduct />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="productos" element={<SellerProduct />} />
            <Route path="productos/:id" element={<Vistaproducto />} />
            <Route path="pedidos" element={<PedidosVendedor />} />
            <Route path="facturas" element={<Invoice />} />
            <Route path="facturas/:id" element={<FacturaDetalle />} />

            <Route
              path="clientes"
              element={
                <div className="vendedor-page">
                  <h1>Clientes</h1>
                  <p>Próximamente…</p>
                </div>
              }
            />
            <Route
              path="ventas"
              element={
                <div className="vendedor-page">
                  <h1>Ventas</h1>
                  <p>Próximamente…</p>
                </div>
              }
            />
            <Route path="configuracion" element={<ConfiguracionVendedor />} />
          </Route>
          <Route path="/mis-productos" element={<MarketplaceLayout />}>
            <Route index element={<SellerProduct />} />
            <Route path="ventas" element={<PedidosVendedor />} />
          </Route>
          <Route path="/admin" element={<MarketplaceLayout />}>
            <Route index element={<Dashboard administracion />} />
            <Route path="actividad" element={<Actividad />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route
              path="productos"
              element={<SellerProduct administracion />}
            />
            <Route path="pedidos" element={<PedidosVendedor />} />
          </Route>

          <Route path="/catalog" element={<CatalogLayout />}>
            <Route path="frozen" element={<Frozen />} />
            <Route path="snacks" element={<Snacks />} />
            <Route path="frutas" element={<Category slug="frutas" />} />
            <Route
              path="aves-pescados"
              element={<Category slug="aves-pescados" />}
            />
            <Route
              path="lacteos-huevos"
              element={<Category slug="lacteos-huevos" />}
            />
            <Route
              path="cereales-granos"
              element={<Category slug="cereales-granos" />}
            />
            <Route path="vitaminas" element={<Category slug="vitaminas" />} />
            <Route
              path="suplementos"
              element={<Category slug="suplementos" />}
            />
          </Route>

          <Route path="/nosotros" element={<About />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/descuentos" element={<Discount />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productos" element={<Product />} />
          <Route path="/Productview/:id" element={<Productview />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        {mostrarLayout &&
          pathActual !== "/perfil" &&
          pathActual !== "/checkout" &&
          pathActual !== "/nosotros" && <Footer />}

        {mostrarLayout && <AsistenteNutrik />}
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
