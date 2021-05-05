import { useState,useEffect } from 'react'

export default   function useAddToCartButton(item,cartProducts,addToCart,addToTotalCost){
 const [isAdded,setIsAdded] =useState(false)

useEffect(()=>{
  cartProducts.indexOf(item) !== -1 ? setIsAdded(true) : setIsAdded(false);
},[cartProducts,item])

  const handlerAddToCartAndAddToTotalCost= (product, cost) =>{
  if( cartProducts.indexOf(product) === -1){
   
addToTotalCost(cost)
addToCart(product)
  }else{
  
  }

}


    return {handlerAddToCartAndAddToTotalCost,isAdded}
  }
