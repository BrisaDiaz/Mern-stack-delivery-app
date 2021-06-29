import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {useState} from 'react' 
import {useStorage} from '../context/useStorage'
import upldateProfileAPI from '../API/upldateProfileAPI'



export default function useEditProfileForm(){
  
  const {token,setCurrentUser,setAllUsers,isAdmin,setIsSuccessfullySend,currentUser} = useStorage()
  
  const [serverError,setServerError] = useState("");
    const [isChangingPassword,setIsChangingPassword] = useState(false);
const [formIsLoading,setFormIsLoading] = useState(false);

const defaultsValues = {
  name:currentUser.name.split(' ')[0],
  lastName:currentUser.name.split(' ')[1],
  street:currentUser.address.split(',')[0].split(' ').slice(0,-1).join(' '),
  streetNumber:currentUser.address.split(',')[0].split(' ').splice(-1) ,
  number: currentUser.number,
city:currentUser.address.split(',')[1].trim(),
}

   const history = useHistory()

    const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

async function onSubmit(data,e) {

 e.preventDefault()

 
const name =  e?.target?.userName?.value?.toLowerCase(),
 lastName =  e?.target?.userLastName?.value?.toLowerCase(),
city = e.target.userCityAddress?.value?.toLowerCase(),
street = e.target.userStreetAddress?.value?.toLowerCase();

const info ={
name,
lastName,
password:e?.target?.userPassword?.value || null,
newPassword:e?.target?.userNewPassword?.value || null,
number:e.target.userNumber?.value,
city,
street,
streetNumber: e.target.userStreetNumber?.value
}
 await upldateProfileAPI({
  setFormIsLoading,
setIsSuccessfullySend,
setServerError,
info,
isAdmin,
setAllUsers,
token,
history,
})


  }
  


  return {
    register,
    handleSubmit,
    errors,
    onSubmit ,
    serverError,
    setCurrentUser,
formIsLoading,
defaultsValues,
isChangingPassword,
setIsChangingPassword
} 

  
}