import styled  from 'styled-components'
import Item  from '../menu/MenuItem'
import {SectionTitle,
ProductsSection} from '../menu/Menu'

import AppContext from '../../context/app-context'
import {   useContext } from 'react'

const StyledNewestProducts= styled.section`
min-height:100vh;
width:100vw;
text-aling:center;
`
const ProductsWrapper=styled(ProductsSection) `
height:100%;
align-items:center;
`;

export default function NewestProducts(){

  const {products,isLoading}  = useContext(AppContext);
const activeProducts = products.filter(product=> product.active === true ) 
const LatestProducts = activeProducts.slice(-4)

  return(

  isLoading ? null :   
   
   <StyledNewestProducts>
  <SectionTitle>Últimas Novedades</SectionTitle>
  <ProductsWrapper>
    {LatestProducts.map( product => {
 
 return <Item key={product._id} item={product}></Item>
    }
    
      )}
 
  </ProductsWrapper>

</StyledNewestProducts>



  );
}