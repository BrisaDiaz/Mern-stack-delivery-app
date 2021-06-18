
import {Option,OptionList} from './SortProductsOptions'

export default function FilterProductsStateOptions({setStatePreferece}){

  const handelChange = (e) =>{
 e.preventDefault()

 setStatePreferece(e.target.value)
}

return(
<OptionList name="filterProductsByState" onChange={(e) =>handelChange(e)}>
<Option value="all" >Todos</Option>
<Option value="active" >Activos</Option>
<Option value="inactive" >Inactivos</Option>
</OptionList>

);

} 