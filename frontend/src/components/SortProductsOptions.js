import styled  from 'styled-components'


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
box-shadow:  1px 1px 6px 0px #ccc;
    text-transform: capitalize;
    margin: 0 20px 20px auto;

`
export const Option = styled.option`
&:checked{
   background: #fcba1c;
}
`
export default function SortProductsOptions({setSortPreferece,defaultValue}){


return(
<OptionList name="sortProductBy" value={defaultValue} onChange={(e) => setSortPreferece(e.target.value)}>
<Option value="-createdAt" >Más recientes</Option>
<Option value="createdAt" >Más antiguos</Option>
<Option value="price" >Menor precio</Option>
<Option value="-price" >Mayor precio</Option>
<Option value="-sold" >Populares</Option>

</OptionList>

);

}