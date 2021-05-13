import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {useState} from 'react' 
import uploadProfileAPI from '../API/uploadProfileAPI'

export default function useEditProfileForm({token,setCurrentUser,setAllUsers,setIsSuccessfullySend,isAdmin}){
  
  const [serverError,setServerError] = useState("");
const [formIsLoading,setFormIsLoading] = useState(false);

   const history = useHistory()

    const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

 function onSubmit(data,e) {

 e.preventDefault()

 
const name =  e?.target?.userName?.value?.toLowerCase(),
address = e.target.userAddress?.value?.toLowerCase();

const info ={
name,
password:e?.target?.userPassword?.value,
newPassword:e?.target?.userNewPassword?.value,
number:e.target.userNumber?.value,
address,

}
uploadProfileAPI({
  setFormIsLoading,
setIsSuccessfullySend,
setServerError,
info,
isAdmin,
setAllUsers,
token,
setCurrentUser,
history,
})


  }
  


  return {
    register,
    handleSubmit,
    errors,
    onSubmit ,
    serverError,
formIsLoading
} 

  
}