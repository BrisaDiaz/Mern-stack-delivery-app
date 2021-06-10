
import {Option,OptionList} from './SortProductsOptions'

export default function FilerCategoryOptions({categories,setCategoryPreferece,setPage}){

  const handelChange = (e) =>{
 e.preventDefault()
     setPage(1)
 setCategoryPreferece(e.target.value)
}

return(
<OptionList name="filterProductsByCategory" onChange={(e) =>handelChange(e)}>

<Option value="all" >Todas las categorías</Option
>
{categories?.map( category => 
  
  <Option value={category.name} key={category._id} >{category.name}</Option>
  
  )}


</OptionList>

);

} 