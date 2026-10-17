import { useState } from "react"

export default function ProductQuantityManage() {

   let price=1500

   const [quantity,setQuantity]=useState(0);

  


   const addQuantity=()=>setQuantity(privVal=>privVal+1)

   const removeProduct=()=>setQuantity(priv=>priv-1)

   const addProduct = function(){
    addQuantity()
    console.log(quantity,'quantity',total,'total');
    
  }



  let total=quantity* price
   
  
    return (
        <>
         <h1>Product Quantity manager</h1>

            <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={"https://static.vecteezy.com/system/resources/thumbnails/016/283/763/small/cricket-bat-cartoon-style-vector.jpg"} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">MRF Bat</h5>
                <div>
                    <button onClick={addProduct}>Add</button> &nbsp;
                    <button disabled={quantity==0} onClick={removeProduct}>Remove</button>
                </div>

                <div style={{margin:"10px"}}>
                    <p>Price : {price} rs</p>
                    <p>Quantity : {quantity}</p>
                    <p>Total : {total}</p>
                </div>
               
            </div>
            </div>
        </>
    )

}