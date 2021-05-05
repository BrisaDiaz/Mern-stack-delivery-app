import styled  from 'styled-components'
import useLoginForm from '../../hooks/useLoginForm'
import {useContext,useState} from 'react' 
import AppContext from '../../context/app-context'
import loadingSvg from '../../img/spinning-circles.svg'
import {ButtonPrimary} from '../Buttons'
import burgerIcon from '../../img/burger-icon.png'

import {FormCard,Logo,Form,  UserEmailInput,UserPasswordInput,ErrorServerMessage} from './SingupForm'

const SingUpLink = styled.a`
margin-bottom: 20px;
cursor:pointer;
transition:all 0.5s esea;
&:hover{
  color:#fff;
}`
export default function SinginForm(){
const [serverError,setServerError] = useState("")
const [isLoading,setIsLoading] = useState(false)
     const {setIsLogin,setIsNotSingup,setIsAdmin,setToken,getUsers,setAllUsers,setCurrentUser,token} = useContext(AppContext);
     const {register, handleSubmit, errors, onSubmit ,redirectToSingUp} = 
      useLoginForm({setIsLogin,setIsNotSingup,setIsAdmin,setToken,setServerError, getUsers,setIsLoading,setAllUsers,setCurrentUser,token})



  return(
    <FormCard>
             <Logo src={burgerIcon} alt="LogoBrand"></Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>

<UserEmailInput  errors={errors} register={register} name="userEmail" />
    <UserPasswordInput name="userPassword" placeholder="Tu contraseña..."  errors={errors} register={register}/>
           {isLoading ?  <img src={loadingSvg} alt="loading..."/> :

         <ErrorServerMessage>{serverError}</ErrorServerMessage>
          }    


            <SingUpLink onClick={redirectToSingUp}>¿Todavía no tienes una cuenta? <b>Sing Up</b> </SingUpLink>
 <ButtonPrimary as="input" type="submit" value="Login"/>
      </Form>
      
    </FormCard>
  );
}