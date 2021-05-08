
export default function useProductStateFilter (filerPreference,products){

const productsFilter = () =>{

    
  if( filerPreference === "default"){
         return products
       }


       if(filerPreference === "active"){

  return  products.filter(product => product.active === true )
      }
    

    if(filerPreference === "inactive"){
        return  products.filter(product => product.active === false )
}
  

  }
   let FilteredProducts = productsFilter()

    return { FilteredProducts}
}