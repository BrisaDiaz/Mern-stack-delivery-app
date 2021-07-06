import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom';
import {useStorage} from '../context/useStorage'
import loginAPI from '../API/loginAPI'
import {useState} from 'react'



export default  function useLoginForm(){

const {setIsLogin,setIsAdmin,setToken, setCurrentUser,setAllUsers,setIsModerator,setIsLoading,setAllOrders} = useStorage()


  const [isFormLoading, setIsFormLoading] = useState(false)
const [serverError, setServerError] = useState("")

const history =useHistory();
  const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

  async function onSubmit(data,e) {

const info ={
email:data.userEmail,
password:data.userPassword
}
    e.preventDefault()
await loginAPI({
      info,
setIsLoading,
setServerError,
setIsLogin,
setToken,
setIsAdmin,
history,
setCurrentUser,
setAllUsers,
setAllOrders,
setIsFormLoading,
setIsModerator
    })






  }


  return {register, handleSubmit, errors, onSubmit ,isFormLoading,serverError}

     }