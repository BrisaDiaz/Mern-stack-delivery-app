
export default function useMenuSorter (menuSortPreference,toDisplayProducts){

const productsSorter = () =>{
       let sortBy=menuSortPreference;
    
  if( sortBy === "default"){
         return toDisplayProducts
       }
       if(sortBy === "minPrice"){
      return  toDisplayProducts.sort((a , b) => a.price - b.price )
}
    if(sortBy === "maxPrice"){
     return  toDisplayProducts.sort((a , b) => b.price - a.price )
}
   if(sortBy === "A-Z"){
     return  toDisplayProducts.sort((a , b) =>a.name.toLowerCase().localeCompare(b.name.toLowerCase()  ) )
}
  if(sortBy === "Z-A"){
   return  toDisplayProducts.sort((a , b) =>a.name.toLowerCase().localeCompare(b.name.toLowerCase())).reverse()
}
}
 let sortProducts = productsSorter()

    return { sortProducts}
  }