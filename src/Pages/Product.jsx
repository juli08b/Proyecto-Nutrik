//import React from 'react'
import "./product.css";


import omega3 from "../assets/omega3.svg";


const Productos = () => {
  return (
    <div className="productos-section">

      <h1 className="titulo-productos">
        Todos Nuestros Productos
      </h1>

      <h2 className="subtitulo-productos">
        Nuestros Productos Saludables
      </h2>

      <div className="contenedor-productos">

        {/* Producto 1 */}
        <div className="card-producto">

          <img
            className="img-producto"
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
            alt="Ensalada"
          />

          <h3>Ensalada Fresh</h3>

          <p className="descripcion">
            Alimentación balanceada con ingredientes naturales.
          </p>

          <p className="precio">$ 25.000</p>

          
            <button className="btn-producto">
              Ver producto
            </button>

        </div>

        {/* Producto 2 */}
        <div className="card-producto">

          <img
            className="img-producto"
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400"
            alt="Frutas"
          />

          <h3>Mix de Frutas</h3>

          <p className="descripcion">
            Ricas en vitaminas y antioxidantes.
          </p>

          <p className="precio">$ 28.000</p>

            <button className="btn-producto">
              Ver producto
            </button>

        </div>

        {/* Producto 3 */}
        <div className="card-producto">

          <img
            className="img-producto"
            src="https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400"
            alt="Detox"
          />

          <h3>Jugo Detox</h3>

          <p className="descripcion">
            Refrescante y saludable para tu cuerpo.
          </p>

          <p className="precio">$ 15.000</p>

            <button className="btn-producto">
              Ver producto
            </button>

        </div>
        <div className="card-producto">
          <img className="img-producto"  src={omega3} alt="omega3" />
        </div>

      </div>
    </div>
  )
}

export default Productos
