import styled  from 'styled-components'
import AppContext from '../../context/app-context'
import {   useContext } from 'react'
import {Link} from 'react-router-dom'
import {StyledSection} from '../dashboard/DashboardEditProduct'
import FormImg from '../../img/user-circle-solid.svg'
export const Section = styled(StyledSection)`
display:flex;
justify-content:center;
align-items: center;
padding:15px;
padding-top:60px;
    margin-left: -6px;
`;
const UserCard =styled.article`
margin:0 auto;
display:flex;
height:max-content;
flex-wrap:wrap;
min-height: 250px;
border: 1px solid #000;
`;
const CardImg = styled.div`
    background: #f0f0f0;
    min-height: 100%;
    padding:10px 0;
display:flex;
flex:1 1 150px;
width:100%;
align-items:center;
justify-content:center;
`;
const Img = styled.img` 
width:120px;
`;
const CardInfo = styled.div` 
    box-shadow: 0 0 8px #ded9d9;
max-width: 500px;
padding:15px;
min-height: 250px;
flex:1 1 400px;
`;
const UserInfo = styled.p` 
margin: 5px 0;
text-transform:toCamelCase;
`;
const InfoLabel = styled.b`
color:#fcba1c;
`;
const EditButton = styled(Link)`
padding:5px 8px;
cursor:pointer;
text-decoration:none;
    border-radius: 5px;
font-weight:600;

    margin-left: 80%;
    border: none;
    background: #000;
       color:#fff;
    transition:all 0.3s easy;
    &:hover{
      transform:scale(1.1);
          background: #fdd87f;
          color:#000;
    }
`
const LogoutButton = styled.button`
padding: 4px 8px;
    padding-top: 0;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    border: none;
    font-family: "Oswald",sans-serif;
    font-size: 19px;
    margin: 10px 40%;
    background: #e83c2e;
    color: #fff;
`;
function MyProfileInfo() {

  const {currentUser,setIsAdmin,setToken,setIsNotLogin} = useContext(AppContext)
const handleLogout = () =>{

setIsNotLogin() ;
setToken("");
 setIsAdmin(false);
localStorage.removeItem('userId');

}


  return (
    <Section>
      <UserCard>
        <CardImg><Img src={FormImg} alt="user"/></CardImg>
 <CardInfo>
   <EditButton to="/myAccount/editProfile">Editar</EditButton>
      <UserInfo><InfoLabel>Nombre: </InfoLabel>{currentUser.name}</UserInfo>
      <UserInfo><InfoLabel>Email: </InfoLabel>{currentUser.email}</UserInfo>

      {/* <h4>Información requerida para realizar pedidos:</h4> */}

 <small>Permitenos contactarnos inmediatamente ante cualquier duda o inprevisto.</small>
          <UserInfo><InfoLabel>Teléfono: </InfoLabel>{currentUser.number || null }</UserInfo>
               <small>Su orden será enviada a la dirección suministrada.</small>
              <UserInfo><InfoLabel>Dirección: </InfoLabel>{currentUser.adress || null }</UserInfo>

             <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </CardInfo>
      </UserCard>


    </Section>
   
  )
}

export default MyProfileInfo
