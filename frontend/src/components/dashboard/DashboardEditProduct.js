import styled  from 'styled-components'
import EditProductForm from './EditProductForm'
import {GoBackLink} from '../product_details/ProductDetails'
import { LinksWrapper} from './DashboardNewProduct'
export const StyledSection = styled.main`

padding: 60px 15px;
    margin-left: -20px;
    min-height:100vh;
width:100vw;
`
const DashboardEditProduct = () =>{
  return(
     <StyledSection>
         <LinksWrapper>
    <GoBackLink to="/dashboard/myProducts" >Regresar</GoBackLink>
          </LinksWrapper>
       <EditProductForm/>
     </StyledSection>
  );
}

export default  DashboardEditProduct