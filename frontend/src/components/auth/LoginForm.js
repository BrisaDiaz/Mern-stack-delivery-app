import useLoginForm from '../../hooks/useLoginForm'
import {LoaderSpinner} from './../LoaderSpinner'
import {ButtonPrimary} from '../Buttons'
import burgerIcon from '../../img/burger-icon.png'

import {FormCard,Logo,Form,FormLink, UserEmailInput,UserPasswordInput,ErrorServerMessage} from './SingupForm'

export default function SinginForm({setIsModalOpened}){


     
     const {register, handleSubmit, errors, onSubmit ,redirectToSingUp,
      serverError,isFormLoading} =  useLoginForm()


  return(
    <FormCard>
             <Logo src={burgerIcon} alt="LogoBrand"></Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>

<UserEmailInput  errors={errors} register={register} name="userEmail" />
    <UserPasswordInput name="userPassword" placeholder="Tu contraseña..."  errors={errors} register={register}/>
        

         <ErrorServerMessage>{serverError}</ErrorServerMessage>
     


            <FormLink onClick={redirectToSingUp}>¿Todavía no tienes una cuenta? <b>Sing Up</b> </FormLink>
            <FormLink onClick={() => setIsModalOpened(true)}>Olvidaste tu contraseña?</FormLink>
 <ButtonPrimary as="input" type="submit" value="Login"/>
    {isFormLoading && <LoaderSpinner small />}
      </Form>
      
    </FormCard>
  );
}