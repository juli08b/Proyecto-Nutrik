import { useState } from "react";
import { useCart } from "./Cart";
import "./product.css";

const productosData = [
  {
    id: 1,
    nombre: "Ensalada Fresh",
    descripcion: "Alimentación balanceada con ingredientes naturales.",
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    precio: 25000,
  },
  {
    id: 2,
    nombre: "Mix de Frutas",
    descripcion: "Ricas en vitaminas y antioxidantes.",
    imagen: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
    precio: 28000,
  },
  {
    id: 3,
    nombre: "Jugo Detox",
    descripcion: "Refrescante y saludable para tu cuerpo.",
    imagen: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400",
    precio: 15000,
  },
];

const Productos = () => {
  const { agregar, setAbierto } = useCart();
  const [agregados, setAgregados] = useState({});

  const handleComprar = (producto) => {
    agregar(producto);
    setAgregados((prev) => ({ ...prev, [producto.id]: true }));
    setTimeout(() => {
      setAgregados((prev) => ({ ...prev, [producto.id]: false }));
    }, 400);
  };
  return (
    <div className="contenedor">
      <h2 className="titulo2prod">Todos Nuestros Productos</h2>
      <h2 className="titulo2prod">Nuestros Productos Saludables</h2>
      <div className="contenedorproductos">
        {productosData.map((producto) => (
          <div className="contenedorproducto" key={producto.id}>
            <div>
              <img className="img-producto" src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p className="precio">$ {producto.precio.toLocaleString()}</p>
            </div>
            <div>
              <button
                className="botonesproductos1"
                onClick={() => handleComprar(producto)}
              >
                {agregados[producto.id] ? "✓ Agregado" : "Agregar al carrito"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;