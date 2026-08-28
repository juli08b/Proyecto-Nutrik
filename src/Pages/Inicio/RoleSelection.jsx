import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoNutrick.png";

const RoleSelection = () => {
  return (
    <div style={{ justifyContent: "center", alignItems: "center", display: "flex", height: "100vh", backgroundColor: "#f4f6f0" }}>
      <div style={{ textAlign: "center", background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", maxWidth: "500px", width: "100%" }}>
        <img src={logo} alt="Logo Nutrik" style={{ width: "100px", marginBottom: "20px" }} />
        <h2 style={{ color: "#386641", marginBottom: "10px" }}>¿Cómo deseas ingresar a Nutrik?</h2>
        <p style={{ color: "#666", marginBottom: "30px" }}>Elige tu tipo de cuenta para continuar</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link 
            to="/login" 
            style={{ padding: "15px", backgroundColor: "#386641", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "bold" }}
          >
            🛒 Quiero Comprar (Cliente)
          </Link>

          <Link 
            to="/registro" 
            style={{ padding: "15px", backgroundColor: "#6a994e", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "bold" }}
          >
            🏪 Quiero Vender (Vendedor)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;