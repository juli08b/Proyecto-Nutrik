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
            className="img-producto" src="https://i.pinimg.com/736x/4e/1d/3d/4e1d3d2831b01988bbfbcaf7fbdeabda.jpg" alt=""
          />

          <h3>Creatina en Polvo </h3>

          <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>
            

        </div>

        {/* Producto 2 */}
        <div className="card-producto">

          <img
            className="img-producto" src="https://i.pinimg.com/1200x/04/40/75/044075ff03f913e906dca4efbafc8821.jpg" alt="" />

          <h3>Yogurt Griego</h3>

            <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>

        {/* Producto 3 */}
        <div className="card-producto">

          <img className="img-producto" src="https://i.pinimg.com/736x/76/0c/30/760c30841b4c4e0313ff087ef2dcc749.jpg" alt="Detox"  />

          <h3>té Detox</h3>

          <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
        <div className="card-producto">
          <img src= "https://i.pinimg.com/1200x/20/85/55/208555e7cad61284b90054f29ccc0fa3.jpg" alt="omega3" className="img-producto"  />

          <h3>omega 3</h3>
          <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>

        <div className="card-producto">
          <img src= "https://i.pinimg.com/1200x/bf/0a/6d/bf0a6dc31db1508589493ceec6a6c512.jpg" alt="omega3" className="img-producto"  />

          <h3>Colágeno Hidrolizado</h3>

          <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
        <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/28/bf/0c/28bf0ce32dc25e1c1912e23c39653062.jpg" alt="omega3" className="img-producto"  />

          <h3>Semillas de Chía</h3>
            <button className="btn-producto">
              Ver producto
            </button>

        </div>
        <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/29/75/6f/29756f11865e9f4c61fe532cdfe48f39.jpg" alt="aceite" className="img-producto"  />

          <h3>Aceite de Coco Natural</h3>

          <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
        <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/fc/fa/c7/fcfac715ba3b58d061d68ecfd143b8ab.jpg" alt="aceite" className="img-producto"  />

          <h3>Maca en Polvo</h3>

          <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
         <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/5f/73/9f/5f739fea40825911401e65067a51c169.jpg" alt="aceite" className="img-producto"  />

          <h3>Granola</h3>

          <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
         <div className="card-producto">
          <img src= "https://i.pinimg.com/736x/16/ae/4a/16ae4ab7cc204b95ed2cba520eee5f21.jpg" alt="aceite" className="img-producto"  />

          <h3>Frutos Secos</h3>

          <Link to="/vistaproducto">
          <button className="btn-producto">Ver producto </button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Productos
