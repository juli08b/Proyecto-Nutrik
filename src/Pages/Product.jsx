//import React from 'react'
import "./product.css"

const Productos = () => {
  return (
    <div className="contenedor"> 
        <h2 className="titulo2prod" >Todos Nuestros Productos</h2> 
        <h2 className="titulo2prod" >Nuestros Productos Saludables</h2> 
      <div className="contenedorproductos"> 
        <div className="contenedorproducto" > 
          <div>
            <img className=" img-producto" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" /> 
          <h3>Ensalada Fresh</h3> 
          <p>Alimentación balanceada con ingredientes naturales.</p>
          <p className="precio" >$ 25.000</p> 
          </div>
          <div>
            <button className="botonesproductos1">COMPRAR 🛒</button> 
          </div>
        </div > 
        <div className="contenedorproductos" > 
          <div className="contenedorproducto" >
            <div>
              <img className=" img-producto" src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400" />  
          
          
              <h3>Mix de Frutas</h3> 
              <p>Ricas en vitaminas y antioxidantes.</p> 
             <p>$ 28.000</p>
           </div>
              <div>
                <button className="botonesproductos2" >COMPRAR 🛒</button> 
              </div> 
          </div>        
       </div> 
        <div className="contenedorproductos" > 
          <div className="contenedorproducto" >
            <div>
               <img className=" img-producto" src="https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400" /> 
          <h3>Jugo Detox</h3> 
          <p>Refrescante y saludable para tu cuerpo.</p> 
          <p>$ 15.000</p> 
           </div>
              <div>
                <button className="botonesproductos2" >COMPRAR 🛒</button> 
              </div> 
          </div>        
       </div> 
      </div> 
    </div>
  )
}

export default Productos
