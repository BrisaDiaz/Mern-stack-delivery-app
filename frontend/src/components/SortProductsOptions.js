import styled  from 'styled-components'
import {useContext} from 'react'
import AppContext from '../context/app-context'


export const OptionList = styled.select`
    color: rgb(0 0 0 / 50%);
    padding: 7px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    margin: 0;
    border: none;
    margin-bottom: 20px;
    background: #fff;
box-shadow: inset 1px 1px 6px 0px #ccc;
    text-transform: capitalize;
    margin: 0 20px 20px auto;

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