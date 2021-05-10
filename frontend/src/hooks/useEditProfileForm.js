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

uploadProfileAPI({
  setFormIsLoading,
setIsSuccessfullySend,
setServerError,
e,
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