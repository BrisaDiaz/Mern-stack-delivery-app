import {useForm} from 'react-hook-form'
import contactAPI from '../API/contactAPI.js'

export default function useContactForm(){
 const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});
 function onSubmit(data,e) {
    e.preventDefault()
    
const formData = new FormData()
      formData.append('userName',data.userName)
     formData.append( 'userEmail',data.userEmail)
     formData.append( 'userMessage',data.userMessage)
    formData.append( 'subject',data.subject)

    contactAPI(formData)
     
}

  return {register,handleSubmit,errors,onSubmit}
}