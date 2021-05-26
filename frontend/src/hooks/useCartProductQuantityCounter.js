import {  useState } from 'react'
export default function useCartProductQuantityCounter({addToTotalCost ,deleteOfTotalCost,product,actualizeCart}){

  const [quantity,setquantity] = useState(1)


  

const increaseQuantityAndActualizeTotalCost = () =>{
  actualizeCart({id:product.info._id, quantity:quantity+1})
   setquantity(quantity +1)

  addToTotalCost(product.info.price);



}

const decreaseQuantityAndActualizeTotalCost = () =>{
  if( quantity !== 1){
     deleteOfTotalCost(product.info.price);
            actualizeCart({id:product.info._id, quantity: quantity-1})
setquantity(quantity -1)


  }else{
    return
    
  }
}

  return{quantity,increaseQuantityAndActualizeTotalCost,decreaseQuantityAndActualizeTotalCost}
 }
