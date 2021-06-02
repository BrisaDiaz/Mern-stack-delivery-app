
import {Option,OptionList} from './SortProductsOptions'

export default function FilerProductsOptions({setStatePreferece}){

return(
<OptionList name="filterProductsByState" onChange={(e) => setStatePreferece(e.target.value)}>
<Option value="all" >Todos</Option>
<Option value="active" >Activos</Option>
<Option value="inactive" >Inactivos</Option>

</OptionList>

);

} 