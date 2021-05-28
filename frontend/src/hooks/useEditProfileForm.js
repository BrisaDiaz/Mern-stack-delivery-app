import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {useState} from 'react' 
import upldateProfileAPI from '../API/upldateProfileAPI'

export default function useEditProfileForm({token,setCurrentUser,setAllUsers,setIsSuccessfullySend,isAdmin}){
  
  const [serverError,setServerError] = useState("");
    const [isChangingPassword,setIsChangingPassword] = useState(false);
const [formIsLoading,setFormIsLoading] = useState(false);

   const history = useHistory()

    const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

 function onSubmit(data,e) {

 e.preventDefault()

 
const name =  e?.target?.userName?.value?.toLowerCase(),
 lastName =  e?.target?.userName?.value?.toLowerCase(),
city = e.target.userCityAddress?.value?.toLowerCase(),
street = e.target.userStreetAddress?.value?.toLowerCase();

const info ={
name,
lastName,
password:e?.target?.userPassword?.value || undefined,
newPassword:e?.target?.userNewPassword?.value || undefined,
number:e.target.userNumber?.value,
city,
street,
streetNumber: e.target.userStreetNumber?.value
}
upldateProfileAPI({
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
formIsLoading,
isChangingPassword,
setIsChangingPassword
} 

  
}