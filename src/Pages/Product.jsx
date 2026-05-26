//import React from 'react'
import "./product.css";
import { Link } from "react-router-dom";



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
            className="img-producto" src="https://i.pinimg.com/736x/4e/1d/3d/4e1d3d2831b01988bbfbcaf7fbdeabda.jpg" alt="creatine"
          />

          <h3>Creatina en Polvo </h3>

          <Link to="/Vistaproducto/creatine">
              <button className="btn-producto">
                 Ver producto
              </button>
          </Link>
            

        </div>

        {/* Producto 2 */}
        <div className="card-producto">

          <img
            className="img-producto" src="https://i.pinimg.com/1200x/04/40/75/044075ff03f913e906dca4efbafc8821.jpg" alt="yogur" />

          <h3>Yogur Griego Natural</h3>

          <Link to="/Vistaproducto/yogur">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>

        {/* Producto 3 */}
        <div className="card-producto">

          <img className="img-producto" src="https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg" alt="detox"  />

          <h3>té detox</h3>

          <Link to="/Vistaproducto/detox">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
        <div className="card-producto">
          <img src= "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg" alt="omega3" className="img-producto"  />

          <h3>omega 3</h3>
          <Link to="/Vistaproducto/omega">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>

        <div className="card-producto">
          <img src= "https://i.pinimg.com/1200x/bf/0a/6d/bf0a6dc31db1508589493ceec6a6c512.jpg" alt="colageno" className="img-producto"  />

          <h3>colageno</h3>

          <Link to="/Vistaproducto/colageno">
            <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
        <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/28/bf/0c/28bf0ce32dc25e1c1912e23c39653062.jpg" alt="chia" className="img-producto"  />

          <h3>Semillas de Chía</h3>
            <Link to="/Vistaproducto/chia">
              <button className="btn-producto">
                Ver producto
              </button>
           </Link>

        </div>
        <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/29/75/6f/29756f11865e9f4c61fe532cdfe48f39.jpg" alt="aceite de coco" className="img-producto"  />

          <h3>aceite de coco</h3>

          <Link to="/Vistaproducto/coco">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
        <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/fc/fa/c7/fcfac715ba3b58d061d68ecfd143b8ab.jpg" alt="maca" className="img-producto"  />

          <h3>Maca en Polvo</h3>

          <Link to="/Vistaproducto/maca">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
         <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg" alt="granola" className="img-producto"  />

          <h3>Granola</h3>

          <Link to="/Vistaproducto/granola">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
         <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/16/ae/4a/16ae4ab7cc204b95ed2cba520eee5f21.jpg" alt="frutos" className="img-producto"  />

          <h3>Mix de Frutos Secoss</h3>

          <Link to="/Vistaproducto/frutos">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Productos
