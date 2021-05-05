

export default function useMenuProductsDispayer(menuSearchQuery,products){

  let queryExistenceCheck = () =>{
if(menuSearchQuery.length !== 0){

 return  products.filter((product ) =>  productsFilter(product)) 

}else{
  return  products
}
}

const productsFilter = (product) =>{
 if (
      product.name.toLowerCase().trim().includes(menuSearchQuery.toLowerCase().trim()) ||
    product.category.toLowerCase().trim().includes(menuSearchQuery.toLowerCase().trim())
    
    ){  return product }
}

let toDisplayProducts = queryExistenceCheck();

  return{toDisplayProducts}
}