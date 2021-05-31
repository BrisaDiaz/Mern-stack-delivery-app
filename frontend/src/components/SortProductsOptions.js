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
box-shadow: inset 1px 1px 6px 0px #ccc;
    text-transform: capitalize;
    margin: 0 20px 20px auto;

`
export const Option = styled.option`
&:checked{
   background: #fcba1c;
}
`
export default function SortProductsOptions({setSortPreferece,sortPreference}){


return(
<OptionList name="sortProductBy" onChange={(e) => setSortPreferece(e.target.value)}>
<Option value="default" selected={sortPreference === 'default' ? true : false }>Ordenar por</Option>
<Option value="minPrice" selected={sortPreference ==="minPrice"  ? true : false }>Menor precio</Option>
<Option value="maxPrice" selected={sortPreference === "maxPrice" ? true : false }>Mayor precio</Option>
<Option value="A-Z" selected={sortPreference === "A-Z" ? true : false }>A - Z</Option>
<Option value="Z-A" selected={sortPreference ==="Z-A" ? true : false }>Z - A</Option>
</OptionList>

);

} 