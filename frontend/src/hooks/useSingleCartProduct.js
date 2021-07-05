import {  useState } from 'react'
import {useCartStorage} from '../context/cart_context/useCartStorage'


export default function useSingleCartProduct(product){

const {deleteOfCart, addToTotalCost,deleteOfTotalCost,actualizeCart} = useCartStorage()

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