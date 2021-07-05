import { useState,useEffect } from 'react'
import {useCartStorage} from '../context/cart_context/useCartStorage'



export default   function useAddToCartButton(item){

  const {cartProducts,addToCart,addToTotalCost} = useCartStorage()

 const [isAdded,setIsAdded] =useState(false)

  let products =cartProducts.map( product => product.info._id)

useEffect(()=>{

  products.indexOf(item._id) !== -1 ? setIsAdded(true) : setIsAdded(false);
},[products,item])

  const handlerAddToCartAndAddToTotalCost= (product, cost) =>{

  if(!isAdded){

addToTotalCost(cost)
addToCart({info: product, quantity: 1})

return
  }

return
}


    return {handlerAddToCartAndAddToTotalCost,isAdded}
  }
