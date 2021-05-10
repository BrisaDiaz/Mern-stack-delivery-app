import {useForm} from 'react-hook-form';
import singUpAPI from '../API/singUpAPI'
import {useState} from 'react' 

export default function useSingupForm(setIsSingUp){
const [serverError,setServerError] = useState("")
const [isFormLoading,setIsFormLoading] = useState(false)

    
  const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

 function onSubmit(data,e) {


 e.preventDefault()

singUpAPI({
setServerError,
setIsSingUp,
e,
setIsFormLoading
})


  }
  const redirectToLogin = () =>{
     setIsSingUp();
  }


  return {register,handleSubmit,errors,onSubmit,redirectToLogin,
  serverError,isFormLoading
  } 

  
}