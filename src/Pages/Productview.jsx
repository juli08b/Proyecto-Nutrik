//import React from 'react'
import './Product.css'
import creatine from "../assets/creatine.svg";
import yogur from "../assets/yogur.svg";
import detox from "../assets/detox.svg";
import omega from "../assets/omega3.svg";
import colageno from "../assets/colageno.svg";
import chia from "../assets/chia.svg";
import coco from "../assets/coco.svg";
import maca from "../assets/maca.svg";
import granola from "../assets/granola.svg";
import frutos from "../assets/frutos.svg";

function Productview() {

  const productos = [
    {
      imagen: creatine,
      nombre: "Creatina Monohidratada",
      descripcion:
        "Suplemento ideal para mejorar el rendimiento físico, la fuerza y la recuperación muscular.",
      precio: "$85.000",
    },

    {
      imagen: yogur,
      nombre: "Yogur Griego Natural",
      descripcion:
        "Fuente natural de proteína y probióticos para una alimentación saludable.",
      precio: "$12.000",
    },

    {
      imagen: detox,
      nombre: "Té Verde Detox",
      descripcion:
        "Bebida natural antioxidante ideal para complementar hábitos saludables.",
      precio: "$18.000",
    },

    {
      imagen: omega,
      nombre: "Omega 3 Fish Oil",
      descripcion:
        "Rico en ácidos grasos esenciales para apoyar la salud cardiovascular.",
      precio: "$35.000",
    },

    {
      imagen: colageno,
      nombre: "Colágeno Hidrolizado",
      descripcion:
        "Ayuda al cuidado de articulaciones, piel y cabello.",
      precio: "$79.900",
    },

    {
      imagen: chia,
      nombre: "Semillas de Chía",
      descripcion:
        "Fuente natural de fibra, omega 3 y antioxidantes.",
      precio: "$14.000",
    },

    {
      imagen: coco,
      nombre: "Aceite de Coco Natural",
      descripcion:
        "Aceite natural prensado en frío ideal para cocinar y recetas saludables.",
      precio: "$24.000",
    },

    {
      imagen: maca,
      nombre: "Maca en Polvo",
      descripcion:
        "Suplemento natural energizante rico en nutrientes.",
      precio: "$28.000",
    },

    {
      imagen: granola,
      nombre: "Granola Saludable",
      descripcion:
        "Mezcla nutritiva de avena, semillas y frutos secos.",
      precio: "$16.000",
    },

    {
      imagen: frutos,
      nombre: "Mix de Frutos Secos",
      descripcion:
        "Snack saludable rico en proteína y grasas saludables.",
      precio: "$22.000",
    },
  ];

  return (
    <div className="contenedor-vistas">

      {productos.map((producto, jsx) => (
        <div className="vista-producto" key={jsx}>

          <div className="imagen-producto">
            <img
              src={producto.imagen}
              alt={producto.nombre}
            />
          </div>

          <div className="info-producto">

            <h1>{producto.nombre}</h1>

            <p className="descripcion-producto">
              {producto.descripcion}
            </p>

            <hr />

            <h2 className="precio-producto">
              {producto.precio}
            </h2>

          </div>

        </div>
      ))}

    </div>
  )
}

export default Productview
