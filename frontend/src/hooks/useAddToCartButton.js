import { useState,useEffect } from 'react'

export default   function useAddToCartButton(item,cartProducts,addToCart,addToTotalCost){
 const [isAdded,setIsAdded] =useState(false)
 
  let products =cartProducts.map( product => product.info._id)

useEffect(()=>{

  products.indexOf(item._id) !== -1 ? setIsAdded(true) : setIsAdded(false);
},[products,item])

  const handlerAddToCartAndAddToTotalCost= (product, cost) =>{

  if( products.indexOf(product._id) === -1){
   
addToTotalCost(cost)
addToCart({info: product, quantity: 1})
  }else{
  
  }

}


    return {handlerAddToCartAndAddToTotalCost,isAdded}
  }
