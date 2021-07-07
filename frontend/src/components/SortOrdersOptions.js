
import {Option,OptionList} from './SortProductsOptions'

export default function SortOrdersOptions({setSortPreferece,defaultValue}){


return(
<OptionList  defaultValue={defaultValue} name="sortProductBy" onChange={(e) => setSortPreferece(e.target.value)}>
<Option value="-createdAt" >Más recientes</Option>
<Option value="createdAt" >Más antiguos</Option>
<Option value="total" >Menor Monto</Option>
<Option value="-total">Mayor Monto</Option>

</OptionList>

);

}