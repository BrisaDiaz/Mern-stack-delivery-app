import {useState} from 'react' 
import {useParams,useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import resetPasswordAPI from '../API/resetPasswordAPI'

export default function useResetPassword(){
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

  return {isFormLoading,serverError,register, handleSubmit,onSubmit, errors}


}