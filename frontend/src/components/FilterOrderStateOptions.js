
import {Option,OptionList} from './SortProductsOptions'

export default function FilterOrdersStateOptions({setStatePreferece,setPage}){

  const handelChange = (e) =>{
 e.preventDefault()
     setPage(1)
 setStatePreferece(e.target.value)
}

return(
<OptionList name="filterOrdersByState" onChange={(e) =>handelChange(e)}>
<Option value="all" >Todos</Option>
<Option value="finish" >Liquidados</Option>
<Option value="unfinish" >Pendientes</Option>
</OptionList>

);

} 