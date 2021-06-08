import {useForm} from 'react-hook-form'
import newsletterSubscribtionAPI from '../API/newsletterSubscribtionAPI'

export default function useNewsletterForm({setIsSuccessfullySend,isLogin}){
      const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

  function onSubmit(data,e) {

  e.preventDefault()

   const info =  {email: e.target.userEmail.value}

    isLogin ? 
    newsletterSubscribtionAPI({info,setIsSuccessfullySend})
: alert('Para poder subscribirse es necesario que inicie seción')
  }

  return {register,handleSubmit,errors,onSubmit}
}