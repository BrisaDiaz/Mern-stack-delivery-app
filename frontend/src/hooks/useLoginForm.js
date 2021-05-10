import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom';
import loginAPI from '../API/loginAPI'
import {useState} from 'react' 

export default  function useLoginForm({setIsLogin,setIsNotSingup,setIsAdmin,setToken, setCurrentUser,setAllUsers,token,setIsModerator,setIsLoading}){

  const [isFormLoading, setIsFormLoading] = useState(false)
const [serverError, setServerError] = useState("")

const history =useHistory();
  const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

  async function onSubmit(data,e) {

    e.preventDefault()
    loginAPI({
      e,
setIsLoading,
setServerError,
setIsLogin,
setToken,
setIsAdmin,
history,
setCurrentUser,
setAllUsers,
setIsFormLoading,
setIsModerator
    })
  


    
 
  }
const redirectToSingUp = () =>{
setIsNotSingup()
  }
 
  return {register, handleSubmit, errors, onSubmit ,redirectToSingUp,isFormLoading,
serverError} 
     }