import styled  from 'styled-components'
import useLoginForm from '../../hooks/useLoginForm'
import {useContext} from 'react' 
import AppContext from '../../context/app-context'
import {LoaderSpinner} from './../LoaderSpinner'
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


     const {setIsLogin,setIsNotSingup,setIsAdmin,setToken,getUsers,setAllUsers,setCurrentUser,token,setIsLoading,setAllOrders,setIsModerator} = useContext(AppContext);
     
     const {register, handleSubmit, errors, onSubmit ,redirectToSingUp,
      serverError,isFormLoading
    } = 
      useLoginForm({setIsLogin,setIsLoading,setIsNotSingup,setIsAdmin,setToken, getUsers,setAllUsers,setCurrentUser,token,setAllOrders,setIsModerator})


  return(
    <FormCard>
             <Logo src={burgerIcon} alt="LogoBrand"></Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>

<UserEmailInput  errors={errors} register={register} name="userEmail" />
    <UserPasswordInput name="userPassword" placeholder="Tu contraseña..."  errors={errors} register={register}/>
           {isFormLoading ?   <LoaderSpinner small />  :

         <ErrorServerMessage>{serverError}</ErrorServerMessage>
          }    


            <SingUpLink onClick={redirectToSingUp}>¿Todavía no tienes una cuenta? <b>Sing Up</b> </SingUpLink>
 <ButtonPrimary as="input" type="submit" value="Login"/>
      </Form>
      
    </FormCard>
  );
}