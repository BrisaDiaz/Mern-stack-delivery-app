import {  useState } from 'react'
export default function useCartProductQuantityCounter(addToTotalCost ,deleteOfTotalCost,cost){

  const [quantity,setquantity] = useState(1)

   

const increaseQuantityAndActualizeTotalCost = () =>{
   setquantity(quantity +1)

        addToTotalCost(cost);

}

const decreaseQuantityAndActualizeTotalCost = () =>{
  if( quantity !== 1){
     deleteOfTotalCost(cost);
setquantity(quantity -1)
       

       
  }else{
    return
    
  }
}

  return{quantity,increaseQuantityAndActualizeTotalCost,decreaseQuantityAndActualizeTotalCost}
 }
