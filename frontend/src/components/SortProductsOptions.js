import styled  from 'styled-components'
import {useContext} from 'react'
import AppContext from '../context/app-context'


export const OptionList = styled.select`
padding:5px;
border-radius:5px;
outline:none;
cursor:pointer;
margin:0 20px 20px auto;
      background: #eaeaea;
    border: none;

    box-shadow: 0 0 3px 1px rgb(0 0 0 / 50%);
`
export const Option = styled.option`
&:checked{
   background: #fcba1c;
}
`
export default function SortProductsOptions(){
  const {setMenuSortPreference} = useContext(AppContext);
  const setSortPreferece = (e) =>{

  setMenuSortPreference(e.target.value)
 
  }
return(
<OptionList name="sortProductBy" onChange={setSortPreferece}>
<Option value="default" disable>Ordenar por</Option>
<Option value="minPrice">Menor precio</Option>
<Option value="maxPrice">Mayor precio</Option>
<Option value="A-Z">A - Z</Option>
<Option value="Z-A">Z - A</Option>
</OptionList>

);

} 