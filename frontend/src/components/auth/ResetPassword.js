import styled  from 'styled-components'
import {useState,useEffect} from 'react' 
import {useParams,useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import resetPasswordAPI from '../../API/resetPasswordAPI'
import {ButtonPrimary} from '../Buttons'
import {LoaderSpinner} from '../LoaderSpinner'

import pizzaBackgroun from'../../img/pizza-background.jpg'
import {FormCard, Form,UserPasswordInput,ErrorServerMessage} from './SingupForm'


const StyledInitSession = styled.main`
    min-height: 100vh;
background: url(${pizzaBackgroun}) center bottom ;
    background-size: cover;
display: flex;
justify-content:center;
align-items: center;
width:100vw;
padding:15px;
padding-top:60px;
text-aling:center;
& > article form {
  padding-top:25px;
}
& > article form h3 {
  font-size:25px;
      line-height: 35px;
}
& > article form h2 {
  font-size:45px;
}
// @media screen and (min-width:500px){
//   & > article form h3 {
//   font-size:30px;
// }
}
`;


export default function ForgotPassword(){
  let {token} = useParams()
const history = useHistory()


const [isFormLoading,setIsFormLoading]= useState(false)
const [serverError, setServerError] = useState("")




  

  const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

 async function onSubmit(data,e) {

const newPassword =e.target.userPassword.value,
confirmPassword = e.target.confirmPassword.value

if(newPassword!== confirmPassword ) return  setServerError("Passwords dosen't match")
setIsFormLoading(true)
const info ={
newPassword,
confirmPassword,
}

await resetPasswordAPI({
  setIsFormLoading,
setServerError,
info,
token,
history
  })
}
  return(

        <StyledInitSession>
<FormCard>
<Form onSubmit={handleSubmit(onSubmit)}>
  <h2>🔑</h2>
<h3>Establecer nueva contraseña</h3> 
<UserPasswordInput  register={register} errors={errors} placeholder='Nueva contraseña...'/>
<UserPasswordInput  register={register} errors={errors} name='confirmPassword' placeholder='Confirnmar contraseña...'/>
  <ErrorServerMessage >{serverError}</ErrorServerMessage >
      


 <ButtonPrimary as="input" type="submit" value="Enviar"/>
      {(isFormLoading) && <LoaderSpinner small /> }
</Form>
</FormCard>
        </StyledInitSession>
  )
}