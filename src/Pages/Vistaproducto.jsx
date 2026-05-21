//import React from 'react'
import './Product.css'

import { useParams } from "react-router-dom";

function Vistaproducto() {

 const { id } = useParams();

   const productos = [

    {
      id: "creatine",
      imagen: "https://i.pinimg.com/736x/4e/1d/3d/4e1d3d2831b01988bbfbcaf7fbdeabda.jpg",
      nombre: "Creatina Monohidratada",
      descripcion:
        "Suplemento ideal para mejorar el rendimiento físico.",
      precio: "$85.000",
    },

    {
      id: "yogur",
      imagen: "https://i.pinimg.com/1200x/04/40/75/044075ff03f913e906dca4efbafc8821.jpg",
      nombre: "Yogur Griego Natural",
      descripcion:
        "Fuente natural de proteína.",
      precio: "$12.000",
    },

    {
      id: "detox",
      imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
      nombre: "Té Verde Detox",
      descripcion:
        "Bebida natural antioxidante.",
      precio: "$18.000",
    },

    {
      id: "omega",
      imagen: "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg",
      nombre: "Omega 3 Fish Oil",
      descripcion:
        "Ayuda a la salud cardiovascular.",
      precio: "$35.000",
    },

    {
      id: "colageno",
      imagen: "https://i.pinimg.com/1200x/bf/0a/6d/bf0a6dc31db1508589493ceec6a6c512.jpg",
      nombre: "Colágeno Hidrolizado",
      descripcion:
        "Ayuda al cuidado de articulaciones.",
      precio: "$79.900",
    },

    {
      id: "chia",
      imagen: "https://i.pinimg.com/736x/28/bf/0c/28bf0ce32dc25e1c1912e23c39653062.jpg",
      nombre: "Semillas de Chía",
      descripcion:
        "Fuente natural de fibra y omega 3.",
      precio: "$14.000",
    },

    {
      id: "coco",
      imagen: "https://i.pinimg.com/736x/29/75/6f/29756f11865e9f4c61fe532cdfe48f39.jpg",
      nombre: "Aceite de Coco Natural",
      descripcion:
        "Ideal para cocinar y recetas saludables.",
      precio: "$24.000",
    },

    {
      id: "maca",
      imagen: "https://i.pinimg.com/736x/fc/fa/c7/fcfac715ba3b58d061d68ecfd143b8ab.jpg",
      nombre: "Maca en Polvo",
      descripcion:
        "Energía natural y vitalidad.",
      precio: "$28.000",
    },

    {
      id: "granola",
      imagen: "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg",
      nombre: "Granola Saludable",
      descripcion:
        "Mezcla nutritiva de avena y semillas.",
      precio: "$16.000",
    },

    {
      id: "frutos",
      imagen: "https://i.pinimg.com/736x/16/ae/4a/16ae4ab7cc204b95ed2cba520eee5f21.jpg",
      nombre: "Mix de Frutos Secos",
      descripcion:
        "Snack saludable rico en proteína.",
      precio: "$22.000",
    },

  ];

  // BUSCA EL PRODUCTO SEGÚN EL ID
  const producto = productos.find(
    (producto) => producto.id === id
  );

  // SI NO EXISTE
  if (!producto) {
    return <h1>Producto no encontrado</h1>;
  }

  return (

    <div className="contenedor-vistas">

      <div className="vista-producto">

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

          <h2 className="precio-producto">
            {producto.precio}
          </h2>

          <button className="btn-carrito">
             Agregar al carrito
          </button>

        </div>

      </div>

    </div>
  );
}

export default Vistaproducto
