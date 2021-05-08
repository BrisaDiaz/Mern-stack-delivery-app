import styled  from 'styled-components'
import {StyledLink } from '../Header'
import CreateNewProductForm from './CreateNewProductForm'
import {StyledSection} from './DashboardEditProduct'

export const Link = styled(StyledLink)`
font-size:15px;
  margin: 0  5px;

  @media screen and (max-width:990px){
margin: 0 5px;
font-size:15px;
`;
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
             <Link to="/dashboard/myProducts" >Productos </Link>/<Link to="/dashboard/users" >Usuarios</Link>
          </LinksWrapper>
   
<CreateNewProductForm/>
    </StyledSection>

  )
}