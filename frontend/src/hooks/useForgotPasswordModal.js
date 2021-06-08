import {useState} from 'react'
import {useForm} from 'react-hook-form'
import forgotPasswordAPI from './../API/forgotPasswordAPI'


export default function useForgotPasswordModal({setIsModalOpened}){
const [isFormLoading,setIsFormLoading]= useState(false)
const [serverError, setServerError] = useState("")

  const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

 async function onSubmit(data,e) {
    
const info ={
email:e.target.userEmail.value,
}

await forgotPasswordAPI({
setServerError,
info,
setIsFormLoading,

})
setIsModalOpened(false)

  }

  return {isFormLoading,serverError,register, handleSubmit,onSubmit, errors}


}