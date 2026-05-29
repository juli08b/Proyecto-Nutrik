import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const productos = [
  {
    id: 1,
    nombre: "Silk - almendra sin azúcar",
    imagen: "https://i.pinimg.com/1200x/59/7a/da/597ada481273c9ecc7b001456412b3c4.jpg",
    ruta: "/vistaproducto/silk-almendra",
  },
  {
    id: 2,
    nombre: "yogurt smoothie",
    imagen: "https://i.pinimg.com/736x/98/f5/df/98f5dff3ee7d44b0d7df193a046eb42e.jpg",
    ruta: "/vistaproducto/yogurt-smoothie",
  },
  {
    id: 3,
    nombre: "Sandía Fresca",
    imagen: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
    ruta: "/vistaproducto/sandia",
  },
  {
    id: 4,
    nombre: "Batido Energético",
    imagen: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=800&auto=format&fit=crop",
    ruta: "/vistaproducto/batido",
  },
  {
    id: 5,
    nombre: "Milkaut yogurt",
    imagen: "https://i.pinimg.com/736x/c0/0a/71/c00a71ead8fa8dac1cefdcc2467e8f72.jpg",
    ruta: "/vistaproducto/milkaut-yogurt",
  },
  {
    id: 6,
    nombre: "Especias Naturales",
    imagen: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=800&auto=format&fit=crop",
    ruta: "/vistaproducto/especias",
  },
  {
    id: 7,
    nombre: "Arroz Blanco Integral",
    imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
    ruta: "/vistaproducto/arroz",
  },
  {
    id: 8,
    nombre: "Tostadas Sanísimo Horneadas",
    imagen: "https://i.pinimg.com/1200x/f9/e1/3f/f9e13fec1d60672de852b1cb6a33514c.jpg",
    ruta: "/vistaproducto/tostadas",
  },
  {
    id: 9,
    nombre: "Aceite de Oliva Extra",
    imagen: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop",
    ruta: "/vistaproducto/aceite-oliva",
  },
  {
    id: 10,
    nombre: "Yogur con Fresas",
    imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
    ruta: "/vistaproducto/yogur",
  },
];

function Newproduct() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="productos-section">
      <div className="productos-header">
        <h1 className="titulo-productos">Explora lo Nuevo</h1>
        <p>
           Descubre nuestra selección de superalimentos y productos 100% 
           naturales para potenciar tu bienestar diario.
        </p>
      </div>

      <div className="productos-grid">
        {productos.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-img"
            />
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <Link to={producto.ruta}>
                <button className="btn-producto">Ver producto</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Newproduct;