import {useForm} from 'react-hook-form';
import singUpAPI from '../API/singUpAPI'
import {useState} from 'react' 
import {useHistory} from 'react-router-dom'




export default function useSingupForm(){


const [serverError,setServerError] = useState("")
const [isFormLoading,setIsFormLoading] = useState(false)

    
  const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

const history = useHistory()

async function onSubmit(data,e) {

 e.preventDefault()

const info ={
name: e.target.userName.value.toLowerCase(),
lastName: e.target.userLastName.value.toLowerCase(),
email:e.target.userEmail.value,
password:e.target.userPassword.value
}

await singUpAPI({
setServerError,
info,
history,
setIsFormLoading
})


  }


  return {register,handleSubmit,errors,onSubmit,
  serverError,isFormLoading
  } 

  
}