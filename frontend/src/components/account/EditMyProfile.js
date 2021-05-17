import styled from 'styled-components'
import {StyledSection} from '../dashboard/DashboardEditProduct'
import {useContext,Fragment} from 'react' 
import AppContext from '../../context/app-context'
import useEditProfileForm from '../../hooks/useEditProfileForm'
import {LoaderSpinner} from './../LoaderSpinner'
import {UserNameInput,UserPasswordInput,UserNewPasswordInput,ErrorServerMessage,ErrorMessage} from '../auth/SingupForm'
import {FormButtons } from '../dashboard/CreateNewProductForm'

import {NameInput } from '../contact/ContactForm';
import {GoBackLink} from '../product_details/ProductDetails'
import userEditIcone from '../../img/user-edit-solid.svg'


const EditProfileForm = styled.form`

  max-width:400px;
  width:100%;
      padding: 50px 30px;
    border-radius: 10px;
    background: #fff;
margin: 50px auto;
display:flex;
flex-flow:column;
align-items:center;
& > input {
  border:none;
  background: #f0f0f0;
}
  `
const FormIcone = styled.img`
width:120px;
margin: 0 auto;
margin-bottom:20px;
margin-top:-20px;
`


function CellphoneInput({errors,placeholder,register}) {
  
  return(
<Fragment>
    {errors.userNumber && <ErrorMessage  role="alert">{errors.userNumber.message}</ErrorMessage>}

<NameInput
placeholder={placeholder}
 name="userNumber"
          ref={register({
              required: '*El campo es requrido',
                  minLength: {
            value: 9,
            message: "*Teléfono Invalido"
                                      },
           maxLength: {
            value: 10,
            message: "*Teléfono Invalido"
                                      },                                      
                     pattern: {
            value: /[0-9]/,
            message: "*Solo se aceptan carácteres"
          } 
          })}
           style={{ borderColor: errors.userNumber && "#bf0000" }}/>
</Fragment>
  )
} 
function AdressInput({errors,name,placeholder,register}) {
  
  return(
<Fragment>
    {errors.userAdress && <ErrorMessage  role="alert">{errors.userAddress.message}</ErrorMessage>}

<NameInput
placeholder={placeholder}
 name="userAddress" 
          ref={register({

            
                      required: '*El campo es requrido (Ej: Calle 548, Barrio ,Córdoba)',
          
                        
          })}
           style={{ borderColor: errors.userAddress && "#bf0000" }}/>
</Fragment>
  )
} 
export default function EditMyProfile() {
  


const {token,setCurrentUser,setAllUsers,isAdmin,setIsSuccessfullySend} = useContext(AppContext);

   const { 
 register,handleSubmit,errors,onSubmit ,serverError,formIsLoading
} = useEditProfileForm(
  {token,setCurrentUser,setAllUsers,setIsSuccessfullySend,isAdmin})

  return(
<StyledSection>

  
    <GoBackLink to="/myAccount/myProfile" >Regresar</GoBackLink>
  

  <EditProfileForm onSubmit={handleSubmit(onSubmit)}>

    <FormIcone src={userEditIcone} alt="edit-profile"/>
<UserNameInput  errors={errors} register={register}/>
   
     <UserPasswordInput  errors={errors} register={register} name="userPassword" placeholder="Tu contraseña..."/>
     <UserNewPasswordInput  errors={errors} register={register} name="newPassword" placeholder="Nueva contraseña..."/>
      
               <CellphoneInput  errors={errors} register={register}  placeholder="Tu telèfono..."/>

         <AdressInput  errors={errors} register={register} placeholder="Tu Dirección..."/>

     

       
   {formIsLoading ?  <LoaderSpinner /> :

         <ErrorServerMessage>{serverError}</ErrorServerMessage>
      
  }
  
          <FormButtons />
  </EditProfileForm>

</StyledSection>

  );

  
}
