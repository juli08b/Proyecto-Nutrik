//import React from 'react'
import './Product.css'


function Vistaproducto() {


 const categorias = [

  // ================= CONGELADOS =================

  {
    titulo: "❄️ Congelados",

    productos: [

      {
        id: "helado-fitness",
        nombre: "Helado Fitness",
        imagen: "https://i.pinimg.com/736x/16/ae/4a/16ae4ab7cc204b95ed2cba520eee5f21.jpg",
        descripcion: "Helado bajo en azúcar y alto en proteína.",
        precio: "$18.000"
      },

      {
        id: "vegetales-congelados",
        nombre: "Vegetales Congelados",
        imagen: "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg",
        descripcion: "Mix de vegetales naturales congelados.",
        precio: "$14.000"
      },

      {
        id: "frutas-congeladas",
        nombre: "Frutas Congeladas",
        imagen: "https://i.pinimg.com/1200x/04/40/75/044075ff03f913e906dca4efbafc8821.jpg",
        descripcion: "Frutas naturales listas para smoothies.",
        precio: "$20.000"
      },

      {
        id: "paletas-naturales",
        nombre: "Paletas Naturales",
        imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
        descripcion: "Paletas refrescantes sin azúcar añadida.",
        precio: "$9.000"
      },

      {
        id: "mix-tropical",
        nombre: "Mix Tropical Frozen",
        imagen: "https://i.pinimg.com/736x/29/75/6f/29756f11865e9f4c61fe532cdfe48f39.jpg",
        descripcion: "Combinación de frutas tropicales.",
        precio: "$22.000"
      },

    ],
  },



  // ================= SNACKS =================

  {
    titulo: "🥜 Snacks",

    productos: [

      {
        id: "frutos-secos",
        nombre: "Mix de Frutos Secos",
        imagen: "https://i.pinimg.com/736x/16/ae/4a/16ae4ab7cc204b95ed2cba520eee5f21.jpg",
        descripcion: "Snack saludable rico en proteína.",
        precio: "$22.000"
      },

      {
        id: "granola",
        nombre: "Granola Saludable",
        imagen: "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg",
        descripcion: "Mezcla nutritiva de avena y semillas.",
        precio: "$16.000"
      },

      {
        id: "barra-proteica",
        nombre: "Barra Proteica",
        imagen: "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg",
        descripcion: "Barra energética alta en proteína.",
        precio: "$8.000"
      },

      {
        id: "chips-saludables",
        nombre: "Chips Saludables",
        imagen: "https://i.pinimg.com/736x/16/ae/4a/16ae4ab7cc204b95ed2cba520eee5f21.jpg",
        descripcion: "Chips horneados bajos en grasa.",
        precio: "$10.000"
      },

      {
        id: "galletas-integrales",
        nombre: "Galletas Integrales",
        imagen: "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg",
        descripcion: "Galletas hechas con harina integral.",
        precio: "$12.000"
      },

    ],
  },



  // ================= FRUTAS =================

  {
    titulo: "🍎 Frutas",

    productos: [

      {
        id: "manzana",
        nombre: "Manzana Roja",
        imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
        descripcion: "Fruta fresca y natural.",
        precio: "$5.000"
      },

      {
        id: "banano",
        nombre: "Banano Orgánico",
        imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
        descripcion: "Banano cultivado naturalmente.",
        precio: "$4.000"
      },

      {
        id: "fresas",
        nombre: "Fresas Naturales",
        imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
        descripcion: "Fresas frescas y dulces.",
        precio: "$9.000"
      },

      {
        id: "arandanos",
        nombre: "Arándanos",
        imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
        descripcion: "Ricos en antioxidantes.",
        precio: "$13.000"
      },

      {
        id: "pina",
        nombre: "Piña Dulce",
        imagen: "https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg",
        descripcion: "Piña tropical natural.",
        precio: "$7.000"
      },

    ],
  },



  // ================= VITAMINAS =================

  {
    titulo: "💊 Vitaminas y Bienestar",

    productos: [

      {
        id: "omega3",
        nombre: "Omega 3",
        imagen: "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg",
        descripcion: "Apoya la salud cardiovascular.",
        precio: "$35.000"
      },

      {
        id: "colageno",
        nombre: "Colágeno Hidrolizado",
        imagen: "https://i.pinimg.com/1200x/bf/0a/6d/bf0a6dc31db1508589493ceec6a6c512.jpg",
        descripcion: "Ayuda al cuidado de piel y cabello.",
        precio: "$79.900"
      },

      {
        id: "vitamina-c",
        nombre: "Vitamina C",
        imagen: "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg",
        descripcion: "Fortalece el sistema inmune.",
        precio: "$25.000"
      },

      {
        id: "magnesio",
        nombre: "Magnesio",
        imagen: "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg",
        descripcion: "Apoya músculos y energía.",
        precio: "$30.000"
      },

      {
        id: "zinc",
        nombre: "Zinc",
        imagen: "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg",
        descripcion: "Mineral esencial para el cuerpo.",
        precio: "$28.000"
      },

    ],
  },

];

  return (
     <div>

      {categorias.map((categoria, index) => (

        <div key={index}>

          <h1 className="titulo-categoria">
            {categoria.titulo}
          </h1>

          <div className="contenedor-vistas">

            {categoria.productos.map((producto) => (

              <div
                className="vista-producto"
                key={producto.id}
              >

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

        </div>

      ))}

    </div>
  )
}

export default Vistaproducto
