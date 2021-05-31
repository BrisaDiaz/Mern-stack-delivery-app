
import {useContext} from 'react'
import AppContext from '../context/app-context'

import {Option,OptionList} from './SortProductsOptions'
export default function FilerProductsOptions(){
  const {setFilterProductStatePreference ,productStateFilterPreference} = useContext(AppContext);
  console.log(productStateFilterPreference)
  const setSortPreferece = (e) =>{

  setFilterProductStatePreference(e.target.value)
 
  }
return(
<OptionList name="filterProductsByState" onChange={setSortPreferece}>
<Option value="default" selected = {productStateFilterPreference === 'default' ? true :false} >Todos</Option>
<Option value="active" selected = {productStateFilterPreference === 'active' ? true :false} >Activos</Option>
<Option value="inactive"  selected = {productStateFilterPreference === 'inactive' ? true :false} >Inactivos</Option>

</OptionList>

);

} 