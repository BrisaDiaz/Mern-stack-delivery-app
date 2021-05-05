
export default   function useSearchProductBar(
  setSearchQuery){
const searcFilter = (e) =>{
  e.preventDefault();
  setSearchQuery(e.target.productsFilterQuery.value)
}
const resetFilter = (e) =>{
  if( e.target.value.trim().length === 0){
    setSearchQuery("")
  }else{
return
  }
}

return {searcFilter, resetFilter}
      
      
      }