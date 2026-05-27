import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Newproduct.css"; // Importo mis estilos específicos para esta página

// Definición de mi array de objetos de productos para renderizarlos dinámicamente
const productos = [
  {
    id: 1,
    nombre: "Silk - almendra sin azúcar",
    imagen: "https://i.pinimg.com/1200x/59/7a/da/597ada481273c9ecc7b001456412b3c4.jpg",
    ruta: "/vistaproducto/silk-almendra", // Ruta dinámica para cuando le den clic a "Ver producto"
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
  // Uso este useEffect para mejorar la experiencia de usuario (UX).
  // Al entrar a la página de productos, fuerza al navegador a subir al tope (0,0) 
  // para que no aparezca scrolleado a la mitad si venías de otra sección larga.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Contenedor principal de toda la sección de la página
    <section className="productos-section">
      
      {/* Bloque del encabezado: Título, línea decorativa y subtítulo */}
      <div className="productos-header">
        <h1 className="titulo-productos">Productos Saludables</h1>
        <div className="linea-titulo"></div> {/* Línea decorativa verde olivo */}
        <p className="subtitulo-productos">
          Descubre nuestra selección de superalimentos y productos 100% 
          naturales para potenciar tu bienestar diario.
        </p>
      </div>

      {/* Grilla principal que envuelve todas las tarjetas mapeadas */}
      <div className="contenedor-productos">
        {/* Recorro mi array de productos usando .map para renderizar cada uno dinámicamente */}
        {productos.map((producto) => (
          // Tarjeta individual del producto. Le pongo el "key" obligatorio de React con el id único
          <div className="card-producto" key={producto.id}>
            <img
              src={producto.imagen}
              alt={producto.nombre} // Alt adaptado al nombre para accesibilidad y SEO
              className="img-producto"
            />
            {/* Contenedor de la información escrita y el botón */}
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              {/* Link de React Router para redirigir a la subvista sin recargar la página */}
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