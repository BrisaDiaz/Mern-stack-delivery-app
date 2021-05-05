import {useForm} from 'react-hook-form'

export default function useContactForm(){
 const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});
 function onSubmit(data,e) {
    e.preventDefault()
    console.log(data);
    
       alert("your message has been send")
}

  return {register,handleSubmit,errors,onSubmit}
}