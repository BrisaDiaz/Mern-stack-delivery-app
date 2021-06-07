import useLoginForm from '../../hooks/useLoginForm'
import {useContext} from 'react' 
import AppContext from '../../context/app-context'
import {LoaderSpinner} from './../LoaderSpinner'
import {ButtonPrimary} from '../Buttons'
import burgerIcon from '../../img/burger-icon.png'

import {FormCard,Logo,Form,FormLink, UserEmailInput,UserPasswordInput,ErrorServerMessage} from './SingupForm'

export default function SinginForm({setIsModalOpened}){


     const {setIsLogin,setIsNotSingup,setIsAdmin,setToken,getUsers,setAllUsers,setCurrentUser,token,setIsLoading,setAllOrders,setIsModerator} = useContext(AppContext);
     
     const {register, handleSubmit, errors, onSubmit ,redirectToSingUp,
      serverError,isFormLoading} = 
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


            <FormLink onClick={redirectToSingUp}>¿Todavía no tienes una cuenta? <b>Sing Up</b> </FormLink>
            <FormLink onClick={() => setIsModalOpened(true)}>Olvidaste tu contraseña?</FormLink>
 <ButtonPrimary as="input" type="submit" value="Login"/>
      </Form>
      
    </FormCard>
  );
}