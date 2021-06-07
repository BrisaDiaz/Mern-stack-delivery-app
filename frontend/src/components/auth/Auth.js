import styled  from 'styled-components'
import SingupForm from './SingupForm'
import LoginForm from './LoginForm'
import {useContext,useState} from 'react' 
import AppContext from '../../context/app-context'
import ForgotPasswordModal from './ForgotPasswordModal'
import background from '../../img/sing-up-background.jpg'

const StyledInitSession = styled.main`
    min-height: 100vh;
background : url(${background}) no-repeat right top ;
display: flex;
justify-content:center;
align-items: center;
width:100vw;
padding:15px;
padding-top:60px;
text-aling:center;

`;
export default function Sing() {
 
    const {isSingUp} = useContext(AppContext);

 const [isModalOpened,setIsModalOpened]=useState(false)


  return(
  <StyledInitSession>

    { isSingUp ?
    <LoginForm setIsModalOpened={setIsModalOpened} /> :
    <SingupForm/ >  }

<ForgotPasswordModal  setIsModalOpened={setIsModalOpened}  isModalOpened={isModalOpened}/>
  </StyledInitSession>


)
}
