import styled  from 'styled-components'
import {StyledSection} from '../dashboard/DashboardEditProduct'
import {useContext,useState,Fragment} from 'react' 
import AppContext from '../../context/app-context'
import useEditProfileForm from '../../hooks/useEditProfileForm'
import loadingSvg from '../../img/spinning-circles.svg'
import {UserNameInput,UserPasswordInput,UserNewPasswordInput,ErrorServerMessage,ErrorMessage} from '../auth/SingupForm'
import {FormButtons } from '../dashboard/CreateNewProductForm'
import {RolesLabel,RolesInputs} from '../dashboard/EditUserModal'
import {NameInput } from '../contact/ContactForm';
import {Link , LinksWrapper} from '../dashboard/DashboardNewProduct'
import userEditIcone from '../../img/user-edit-solid.svg'
import correctIcone from '../../img/check-circle-solid.svg'

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
const CorrectlySendedIcone = styled.div`
width:150px;
height:150px;
position:absolute;
z-index:1000;
top:50%;
left:50%;
transform:translate(-50%,0);
background:#fff;
border-radius:50%;
`; 
const OkIcone = styled(FormIcone)`
width:160px;
margin: -5px -15px 0 0;
    box-shadow: 0 0 5px;
    border-radius: 50%;
`
const InnerLink = styled.a`
color: #e83c2e;
`;
function CellphoneInput({errors,placeholder,register}) {
  
  return(
<Fragment>
    {errors.userNumber && <ErrorMessage  role="alert">{errors.userNumber.message}</ErrorMessage>}

<NameInput
placeholder={placeholder}
 name="userNumber"
          ref={register({
  
                  minLength: {
            value: 9,
            message: "*Teléfono Invalido (9 dígitos min)"
                                      },
                     pattern: {
            value: /[0-9]/,
            message: "*Solo se aceptan carácteres"
          } 
          })}
           style={{ borderColor: errors.userPassword && "#bf0000" }}/>
</Fragment>
  )
} 
function AdressInput({errors,name,placeholder,register}) {
  
  return(
<Fragment>
    {errors.userAdress && <ErrorMessage  role="alert">{errors.userAdress.message}</ErrorMessage>}

<NameInput
placeholder={placeholder}
 name="userAdress" 
          ref={register({
        
                  minLength: {
            value: 5,
            message: "*Dirección no valida"
                                      },
          })}
           style={{ borderColor: errors.userPassword && "#bf0000" }}/>
</Fragment>
  )
} 
export default function EditMyProfile() {
  
  const [serverError,setServerError] = useState("");
const [isLoading,setIsLoading] = useState(false);
const [isSuccess,setIsSuccess] = useState(false);
const {token,getUsers,isAdmin,setCurrentUser,setAllUsers} = useContext(AppContext);

   const {register,handleSubmit,errors,onSubmit} = useEditProfileForm({setServerError,setIsLoading,token,getUsers,setCurrentUser,setAllUsers,setIsSuccess})

  return(
<StyledSection>

           <LinksWrapper>
    <Link to="/myAccount/myProfile" >Regresar</Link>
          </LinksWrapper>

  <EditProfileForm onSubmit={handleSubmit(onSubmit)}>

    <FormIcone src={userEditIcone} alt="edit-profile"/>
<UserNameInput  errors={errors} register={register}/>
   
     <UserPasswordInput  errors={errors} register={register} name="userPassword" placeholder="Tu contraseña..."/>
     <UserNewPasswordInput  errors={errors} register={register} name="newPassword" placeholder="Nueva contraseña..."/>
      
               <CellphoneInput  errors={errors} register={register}  placeholder="Tu telèfono..."/>

         <AdressInput  errors={errors} register={register} placeholder="Tu Dirección..."/>
            <InnerLink href ="#!">Por favor verifique que esté dentro de las zonas de envio disponibles.</InnerLink>
     
     {isAdmin && 
     <Fragment>
       <RolesLabel>Selecciónar Roles:</RolesLabel>
                              <RolesInputs/>
</Fragment> }
       
   {isLoading ?  <img src={loadingSvg} alt="loading..."/> :

         <ErrorServerMessage>{serverError}</ErrorServerMessage>
          }   
          {isSuccess &&  <CorrectlySendedIcone><OkIcone src={correctIcone} alt="uploaded"/></CorrectlySendedIcone>
          } 
   
          <FormButtons />
  </EditProfileForm>

</StyledSection>

  );

  
}
