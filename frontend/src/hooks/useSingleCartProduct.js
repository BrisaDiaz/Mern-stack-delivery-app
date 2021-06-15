import {  useState } from 'react'
import {useStorage} from '../context/useStorage'



export default function useSingleCartProduct(product){
  
const {deleteOfCart, addToTotalCost,deleteOfTotalCost,actualizeCart} = useStorage()

  const deleteOfCartAndTotalCostHandler= (id,cost) =>{
deleteOfTotalCost(cost)
 deleteOfCart(id)

}


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
  return
  }
    return
    
}



return { deleteOfCartAndTotalCostHandler,quantity,increaseQuantityAndActualizeTotalCost,decreaseQuantityAndActualizeTotalCost}

}