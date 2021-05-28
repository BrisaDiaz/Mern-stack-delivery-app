import styled  from 'styled-components'
import {useContext ,Fragment} from 'react' 
import AppContext from '../../context/app-context'
import useSingupForm from '../../hooks/useSingupForm'
import {ButtonPrimary} from '../Buttons'
import burgerIcon from '../../img/burger-icon.png'
import {NameInput , EmailInput} from '../contact/ContactForm';
import {LoaderSpinner} from './../LoaderSpinner'

export const FormCard =  styled.article`
  box-shadow: 0 0 4px rgba(0,0,0,0.5);

margin: 30px auto;
border-radius:10px;
width: 100%;
    max-width: 400px;
display:flex;
flex-flow:column;
align-items:center;
text-align:center;
min-heght:600px;
background: rgb(252,175,1);
    background: linear-gradient(
218deg
, rgb(252 175 1 / 60%) 0%, rgb(255 165 0 / 58%) 100%);
box-box-shadow: 2px 2px 6px #000;

@media screen and  (max-width:400px){
 width: 100%;

}
`;
export const Logo = styled.img`
width:120px;
margin-bottom:20px;
height:auto;
`;
export const Form = styled.form`
width:90%;
margin-left: -10px;
padding-bottom:25px;
display:flex;
margin:0 auto;
flex-flow:column;
align-items:center;
& > input {
      width: 90%;
     margin-bottom:15px;
      border:none;
    box-shadow: ${props => props.theme.inputShadow};
}
& > input[type="submit"] {
    box-shadow: none;
}

& >${LoaderSpinner}{
  margin-bottom: 10px;
}

@media screen and  (max-width:500px){
width: 90%;
& > input {
      width: 95%;
  
}
}
`;
export const PaswordInput = styled(NameInput).attrs( props => ({
  type: 'password',
  required:true

}))`

    
`;
export const ErrorMessage = styled.small`
color:#bf0000;
margin:-10px auto 4px 5%;
    display: block;
`;
export const ErrorServerMessage = styled(ErrorMessage)`
text-align:center;
font-size:20px;
margin: 5px 0;
`
const LoginLink = styled.a`
margin-bottom: 20px;
cursor:pointer;
transition:all 0.5s esea;
&:hover{
  color:#fff;
}
`;
export function UserNameInput({register,errors}){

  return(
    <Fragment>
       {errors.userName && <ErrorMessage>{errors.userName.message }</ErrorMessage>}
    <  NameInput 
        placeholder='Tu Nombre...'
          name="userName"
          ref={register({
               required: '*El campo es requrido',
              pattern:{
                        value: /^[A-Za-zñÑáÁéÉíÍóÓúÚÜü]+$/
,
                         message:"*Nombre no valido"
                      }
            
          })}
                 style={{ borderColor: errors.userName&& "#bf0000" }}
          />
    </Fragment>
  );
}
export function UserLastNameInput({register,errors}){

  return(
    <Fragment>
       {errors.userLastName && <ErrorMessage>{errors.userLastName.message }</ErrorMessage>}
    <  NameInput 
        placeholder='Tu Apellido ...'
          name="userLastName"
          ref={register({
               required: '*El campo es requrido',
              pattern:{
                        value: /^[A-Za-zñÑáÁéÉíÍóÓúÚÜü]+$/
,
                         message:"*Nombre no valido"
                      }
            
          })}
                 style={{ borderColor: errors.userLastName && "#bf0000" }}
          />
    </Fragment>
  );
}
export function UserEmailInput({register,errors}){

  return(
    <Fragment>
                    {errors.userEmail && <ErrorMessage>{errors.userEmail.message}</ErrorMessage>}
          <EmailInput 
          name="userEmail"
          ref={register({
                     required: '*El campo es requrido',
                
                      pattern:{
                        value:/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
                             message:"*Email no valido"
                      }
          })}
           style={{ borderColor: errors.userEmail && "#bf0000" }  }
          />
    </Fragment>
  );
}
 export function UserPasswordInput({register,errors,placeholder,}){

  return(
    <Fragment>
       {errors.userPassword && <ErrorMessage  role="alert">{errors.userPassword.message}</ErrorMessage>}

<PaswordInput
placeholder={placeholder}
name ='userPassword'  
          ref={register({
                  required: '*El campo es requrido' ,
                     minLength: {
            value: 5,
            message: "*El largo mínimo es de 5 carácteres"
          } 
          })}
           style={{ borderColor: errors.userPassword && "#bf0000" }}/>
    </Fragment>
  );
}
export function UserNewPasswordInput({register,errors,placeholder,}){
 

  return(
    <Fragment>
       {errors.userNewPassword && <ErrorMessage  role="alert">{errors.userNewPassword.message}</ErrorMessage>}

<PaswordInput
placeholder={placeholder}


 name='userNewPassword'
          ref={register({
             required:  '*El campo es requrido' ,
                     minLength: {
            value: 5,
            message: "*El largo mínimo es de 5 carácteres"
          } 
          })}
           style={{ borderColor: errors.userNewPassword && "#bf0000" }}/>

    </Fragment>
  );
}
export default function SingupForm(){

    const {setIsSingUp} = useContext(AppContext);

   const {register,handleSubmit,errors,onSubmit,redirectToLogin,isFormLoading,serverError} = useSingupForm(setIsSingUp)
  return(
    <FormCard>
             <Logo src={burgerIcon} alt="LogoBrand"></Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
     
     <UserNameInput  errors={errors} register={register}/>
          <UserLastNameInput  errors={errors} register={register}/>
     <UserEmailInput  errors={errors} register={register}/>
     <UserPasswordInput  errors={errors} register={register} placeholder="Tu contraseña..."  />
      
   {isFormLoading ?  <LoaderSpinner small /> :

         <ErrorServerMessage>{serverError}</ErrorServerMessage>
          }    
 
           <LoginLink onClick={redirectToLogin}>¿Ya tienes una cuenta? <b>Login</b> </LoginLink>
 <ButtonPrimary as="input" type="submit" value="Sing Up"/>
      </Form>
    </FormCard>
  );
}
