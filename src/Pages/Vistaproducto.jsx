//import React from 'react'
import './Product.css'

const Vistaproducto = () => {
  return (
      <div>
        <div className="vista-producto">

      {/* Imagen */}
      <div className="imagen-producto">
        <img src= "https://i.pinimg.com/736x/4e/1d/3d/4e1d3d2831b01988bbfbcaf7fbdeabda.jpg"  alt="Omega 3" />
      </div>

      {/* Información */}
      <div className="info-producto">

        <h1>Omega 3 Fish Oil 2400mg</h1>

        <p className="descripcion-producto">
          Suplemento alimenticio rico en ácidos grasos esenciales
          para apoyar la salud cardiovascular y el bienestar general.
        </p>

        <hr />

        <h2 className="precio-producto">$35.000</h2>

        <p className="precio-extra">
          Producto natural y saludable
        </p>

        {/* Cantidad y botones */}
        <div className="acciones-producto">

          <div className="cantidad">
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>

          <button className="btn-carrito">
            Añadir al carrito
          </button>

          <button className="btn-comprar">
            Comprar ahora
          </button>

        </div>
      </div>
    </div>
      </div>
  )
}

export default Vistaproducto
