import styled  from 'styled-components'
import useNewestProducts from '../../hooks/useNewestProducts'
import Item  from '../menu/MenuItem'
import {SectionTitle,ProductsSection} from '../menu/Menu'
import {LoaderSpinner} from './../LoaderSpinner'

const StyledNewestProducts= styled.section`
width:100vw;
text-aling:center;
min-height:400px;
`
const ProductsWrapper=styled(ProductsSection) `
height:100%;
align-items:center;
margin-bottom: 30px;
`;

export default function NewestProducts(){


const {isLoading,latestProducts} = useNewestProducts()

  return(


   
   <StyledNewestProducts>
  <SectionTitle>Últimas Novedades</SectionTitle>

{    
(isLoading )? <LoaderSpinner small/>
  :
  <ProductsWrapper>
    {latestProducts.map( product => {
 
 return <Item key={product._id} item={product}></Item>
    }
    
      )}
 
  </ProductsWrapper>
}
</StyledNewestProducts>



  );
}