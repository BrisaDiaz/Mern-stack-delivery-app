import styled  from 'styled-components'
import EditProductForm from './EditProductForm'

import {Link , LinksWrapper} from './DashboardNewProduct'
export const StyledSection = styled.main`
    margin-left: -6px;
padding-top:60px;
min-height:100vh;
width:100vw;
`
const DashboardEditProduct = () =>{
  return(
     <StyledSection>
         <LinksWrapper>
    <Link to="/dashboard/myProducts" >Regresar</Link>
          </LinksWrapper>
       <EditProductForm/>
     </StyledSection>
  );
}

export default  DashboardEditProduct