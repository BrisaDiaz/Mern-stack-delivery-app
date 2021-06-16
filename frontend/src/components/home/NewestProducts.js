import styled  from 'styled-components'
import useNewestProducts from '../../hooks/useNewestProducts'
import Item  from '../menu/MenuItem'
import {SectionTitle,ProductsSection} from '../menu/Menu'
import AddToCartButton from '../AddToCartButton'
import ProductsSectionSkeletom from '../ProductsSectionSkeletom'
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

 function NewestProducts(){


const {isLoading,latestProducts} = useNewestProducts()

  return(


   
   <StyledNewestProducts>
  <SectionTitle>Últimas Novedades</SectionTitle>

{    
(isLoading )? <ProductsSectionSkeletom/>
  :
  <ProductsWrapper>
    {latestProducts.map( product => {
 
 return <Item key={product._id} item={product}>
                  <AddToCartButton thisProductInfo={product}/>
   
 </Item>
    }
    
      )}
 
  </ProductsWrapper>
}
</StyledNewestProducts>



  );
}

export default NewestProducts