import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

export const listaProductos = [
  {
    id: "creatine",
    imagen: "https://i.pinimg.com/736x/4e/1d/3d/4e1d3d2831b01988bbfbcaf7fbdeabda.jpg",
    nombre: "Creatina Monohidratada 100% Pura",
    categoria: "SUPLEMENTOS",
    badge: "MÁS VENDIDO",
    rating: 4.9,
    reviews: 328,
    precioAnterior: "$110.000",
    precio: "$85.000",
    descuento: "23% OFF",
    stock: 12,
    descripcion: "Potencia tu fuerza muscular, acelera la recuperación y mejora el rendimiento atlético."
  },
  {
    id: "yogur",
    imagen: "https://i.pinimg.com/1200x/04/40/75/044075ff03f913e906dca4efbafc8821.jpg",
    nombre: "Yogur Griego Natural Artesanal",
    categoria: "LÁCTEOS / PROTEÍNA",
    badge: "20% OFF",
    rating: 4.8,
    reviews: 142,
    precioAnterior: "$15.000",
    precio: "$12.000",
    descuento: "20% OFF",
    stock: 8,
    descripcion: "Fuente natural de proteína sin azúcar añadida ni conservantes."
  },
  {
    id: "detox",
    imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
    nombre: "Té Verde Detox & Antiox Ultra Blend",
    categoria: "INFUSIONES",
    badge: "23% OFF",
    rating: 4.7,
    reviews: 95,
    precioAnterior: "$24.000",
    precio: "$18.000",
    descuento: "23% OFF",
    stock: 20,
    descripcion: "Bebida natural antioxidante para desintoxicar tu organismo diariamente."
  },
  {
    id: "omega",
    imagen: "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg",
    nombre: "Omega 3 Fish Oil Concentrate",
    categoria: "SALUD / VITAMINAS",
    badge: "DESTACADO",
    rating: 4.9,
    reviews: 110,
    precioAnterior: "$45.000",
    precio: "$35.000",
    descuento: "22% OFF",
    stock: 15,
    descripcion: "Ayuda a la salud cardiovascular y al funcionamiento cerebral."
  },
  {
    id: "colageno",
    imagen: "https://i.pinimg.com/1200x/bf/0a/6d/bf0a6dc31db1508589493ceec6a6c512.jpg",
    nombre: "Colágeno Hidrolizado Avanzado",
    categoria: "SUPLEMENTOS",
    badge: "",
    rating: 4.6,
    reviews: 84,
    precioAnterior: "$95.000",
    precio: "$79.900",
    descuento: "15% OFF",
    stock: 10,
    descripcion: "Ayuda al cuidado de articulaciones, piel, cabello y uñas."
  },
  {
    id: "chia",
    imagen: "https://i.pinimg.com/736x/28/bf/0c/28bf0ce32dc25e1c1912e23c39653062.jpg",
    nombre: "Semillas de Chía Orgánicas",
    categoria: "SUPERFOODS",
    badge: "ORGÁNICO",
    rating: 4.8,
    reviews: 62,
    precioAnterior: "$18.000",
    precio: "$14.000",
    descuento: "22% OFF",
    stock: 25,
    descripcion: "Fuente natural de fibra, proteína y ácidos grasos omega 3."
  },
  {
    id: "coco",
    imagen: "https://i.pinimg.com/736x/29/75/6f/29756f11865e9f4c61fe532cdfe48f39.jpg",
    nombre: "Aceite de Coco Natural Extra Virgen",
    categoria: "ACEITES / SALUD",
    badge: "",
    rating: 4.9,
    reviews: 175,
    precioAnterior: "$30.000",
    precio: "$24.000",
    descuento: "20% OFF",
    stock: 18,
    descripcion: "Ideal para cocinar saludable y uso cosmético natural."
  },
  {
    id: "maca",
    imagen: "https://i.pinimg.com/736x/fc/fa/c7/fcfac715ba3b58d061d68ecfd143b8ab.jpg",
    nombre: "Maca Andina en Polvo",
    categoria: "SUPERFOODS",
    badge: "POPULAR",
    rating: 4.7,
    reviews: 53,
    precioAnterior: "$34.000",
    precio: "$28.000",
    descuento: "17% OFF",
    stock: 14,
    descripcion: "Energía natural, vitalidad y equilibrio hormonal."
  },
  {
    id: "granola",
    imagen: "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg",
    nombre: "Granola Saludable Artesanal",
    categoria: "SNACKS",
    badge: "",
    rating: 4.8,
    reviews: 91,
    precioAnterior: "$20.000",
    precio: "$16.000",
    descuento: "20% OFF",
    stock: 30,
    descripcion: "Mezcla nutritiva de avena, frutos secos y semillas."
  },
  {
    id: "frutos",
    imagen: "https://i.pinimg.com/736x/16/ae/4a/16ae4ab7cc204b95ed2cba520eee5f21.jpg",
    nombre: "Mix de Frutos Secos Premium",
    categoria: "SNACKS",
    badge: "TOP RATED",
    rating: 5.0,
    reviews: 210,
    precioAnterior: "$28.000",
    precio: "$22.000",
    descuento: "21% OFF",
    stock: 22,
    descripcion: "Snack saludable rico en proteína y grasas buenas."
  }
];

const Product = () => {
  return (
    <div className="productos-section">
      <div className="productos-header">
        <h1 className="titulo-productos">Productos Nutritivos</h1>
        <p className="subtitulo-productos">
          Descubre nuestra selección científicamente formulada para elevar tu energía y salud diaria.
        </p>
      </div>

      <div className="contenedor-productos">
        {listaProductos.map((p) => (
          <div key={p.id} className="card-producto">
            {p.badge && <span className="badge-tag">{p.badge}</span>}
            <button className="btn-favorito">♥</button>
            
            <div className="contenedor-img-card">
              <img className="img-producto" src={p.imagen} alt={p.nombre} />
            </div>

            <div className="producto-info">
              <span className="categoria-tag">{p.categoria}</span>
              <h3 className="titulo-card">{p.nombre}</h3>

              <div className="rating-box">
                <span className="estrellas">★</span>
                <span className="score">{p.rating}</span>
                <span className="reviews">({p.reviews})</span>
              </div>

              <div className="precio-container">
                {p.precioAnterior && <span className="precio-anterior">{p.precioAnterior}</span>}
                <span className="precio-actual">{p.precio}</span>
              </div>

              {/* Redirección directa sin errores */}
              <Link to={`/productview/${p.id}`} className="btn-producto">
                Ver más →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;