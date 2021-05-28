import styled  from 'styled-components'
import useMenuProductsDispayer from '../../hooks/useMenuProductsDispayer'
import useMenuSorter from '../../hooks/useMenuSorter'
import AppContext from '../../context/app-context'
import {   useContext } from 'react'
import SearchBar from '../SearchBar'
import SortProductsOptions from '../SortProductsOptions'
import Item  from './MenuItem'


const StyledMenu= styled.main`
min-height:100vh;
width:100vw;
padding: 65px 15px 15px 15px;
margin:0;

margin-bottom:20px;
text-aling:center;

`;
export const SectionTitle= styled.h2`
text-align:center;
text-transform: uppercase;
color:${(props) =>(props.light ? "#fff" : "#fcba1c")};
 text-shadow: ${props => props.theme.darckTextShadow};
`;
const MenuWrapper= styled.section`
display:flex;
flex-wrap: wrap;
padding-bottom: 20px ;
   margin-left: -6px;
width:100%;

`;
const CategoryTitle = styled.h4 `
    text-align: center;
    line-height: 15px;
    color: #fcba1c;
    font-size: 28px;
    margin: 10px 5px;
 text-shadow: ${props => props.theme.darckTextShadow};
    text-transform: capitalize;
&:before {
  content:".";
}
`
const SearchBarWrapper = styled.div`
width:100vw;
margin-bottom: 20px;
`;
const CategoryWrapper = styled.article`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: ${props => props.theme.darckRed};
    justify-content: center;
    margin-bottom: 20px;

    padding:  20px 15px;
    box-shadow: inset 0 0 20px 0 #1111118c;
`;
export const ProductsSection = styled.div`
display:flex;
flex-flow:row wrap;
padding:0 ;
 justify-content:center;
 justify-content:center;
width: 95%;
    gap: 15px;
margin:0 auto;

`;
export const NotFaundMessage = styled.h4`
margin-top: 20px;

`;


export default function Menu() {

    const {products,menuSortPreference,isLoading}  = useContext(AppContext);
    let {menuSearchQuery}  = useContext(AppContext);
const activeProducts = products.filter(product=> product.active === true ) 
  const getCategorysFilter = activeProducts.map(product => product.category);
  const categorys=[ ...new Set(getCategorysFilter)];

  const {toDisplayProducts} =useMenuProductsDispayer(menuSearchQuery,activeProducts)


 let {sortProducts} = useMenuSorter(menuSortPreference,toDisplayProducts)



  return(
  isLoading ? null :   

  <StyledMenu>

    <SectionTitle>Menú</SectionTitle>


<MenuWrapper>



<CategoryWrapper >
  {categorys?.map((category, index) =>
   <CategoryTitle key={index}>{category}</CategoryTitle>
)}
</CategoryWrapper >


<SearchBarWrapper>

  <SearchBar/>
</SearchBarWrapper>

<SortProductsOptions/>


  <ProductsSection >

    {   sortProducts?.length !== 0 ?
       sortProducts?.map(product =>

<Item key={product._id } item={product}/>)
 :
  <NotFaundMessage>No se han encontrado coincidencias, intenta de nuevo!!</NotFaundMessage>
  }

    
    </ProductsSection>


</MenuWrapper>


    
</StyledMenu>
  
);
}
  