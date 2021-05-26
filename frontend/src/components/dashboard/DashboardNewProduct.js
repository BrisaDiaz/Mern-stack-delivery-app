import styled  from 'styled-components'
import CreateNewProductForm from './CreateNewProductForm'
import {StyledSection} from './DashboardEditProduct'
import {GoBackLink} from '../product_details/ProductDetails'


export const LinksWrapper =styled.div`
display:flex;
margin:5px 0;
margin-left:15px;

width:max-content;
`;
export default function DashboardNewProduct(){
  return(
    <StyledSection>
          <LinksWrapper>
             <GoBackLink to="/dashboard/myProducts" >Regresar </GoBackLink>
          </LinksWrapper>
   
<CreateNewProductForm/>
    </StyledSection>

  )
}