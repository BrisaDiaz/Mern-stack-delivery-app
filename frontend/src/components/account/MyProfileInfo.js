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
    box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 50%);
`;
const CardImg = styled.div`
    background: #fecb0021;
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

max-width: 500px;
padding:15px;
min-height: 250px;
flex:1 1 400px;
`;
const UserInfo = styled.p` 
margin: 5px 0;
text-transform:capitalize;
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
    transition:all 0.3s ease;
    &:hover{
      transform:scale(1.2);
          background: #fdd87f;
          color:#000;
              box-shadow: inset 0 0 8px 2px #ffa500;
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
        transition:all 0.5s ease;
    &:hover{

          box-shadow: inset 0 0 8px 2px #9c0101;
    }
`;
function MyProfileInfo() {

  const {currentUser,setIsAdmin,setToken,setIsNotLogin,emptyCart} = useContext(AppContext)

  
const handleLogout = () =>{
emptyCart()
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


 <small>Permitenos contactarnos inmediatamente ante cualquier duda o inprevisto.</small>
          <UserInfo><InfoLabel>Teléfono: </InfoLabel>{currentUser.number || null }</UserInfo>
               <small>Su orden será enviada a la dirección suministrada.</small>
              <UserInfo><InfoLabel>Dirección: </InfoLabel>{currentUser.address || null }</UserInfo>

             <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </CardInfo>
      </UserCard>


    </Section>
   
  )
}

export default MyProfileInfo
