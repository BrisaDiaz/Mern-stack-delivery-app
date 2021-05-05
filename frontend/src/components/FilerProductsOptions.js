
import {useContext} from 'react'
import AppContext from '../context/app-context'

import {Option,OptionList} from './SortProductsOptions'
export default function FilerProductsOptions(){
  const {setFilterProductStatePreference} = useContext(AppContext);
  const setSortPreferece = (e) =>{

  setFilterProductStatePreference(e.target.value)
 
  }
return(
<OptionList name="filterProductsByState" onChange={setSortPreferece}>
<Option value="default" >Todos</Option>
<Option value="active">Activos</Option>
<Option value="inactive">Inactivos</Option>

</OptionList>

);

} 