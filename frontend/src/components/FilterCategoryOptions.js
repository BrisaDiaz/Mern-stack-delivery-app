
import {Option,OptionList} from './SortProductsOptions'

export default function FilerCategoryOptions({categories,setCategoryPreferece,defaultValue}){

  const handelChange = (e) =>{
 e.preventDefault()
 setCategoryPreferece(e.target.value)
}

return(
<OptionList value={defaultValue} name="filterProductsByCategory" onChange={(e) =>handelChange(e)}>

<Option value="all" >Todas las categorías</Option
>
{categories?.map( category =>

  <Option value={category.name} key={category._id} >{category.name}</Option>

  )}


</OptionList>

);

}