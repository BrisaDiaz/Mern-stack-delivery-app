import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom';
import usersAPI from '../API/usersAPI'
import currentUserAPI from '../API/currentUserAPI'
export default  function useLoginForm({setIsLogin,setIsNotSingup,setIsAdmin,setToken,setServerError, setCurrentUser,setIsLoading,setAllUsers,token}){
const history =useHistory();
  const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

  async function onSubmit(data,e) {

    e.preventDefault()
  try {
setIsLoading(true)

const info ={
email:e.target.userEmail.value,
password:e.target.userPassword.value
}

    const headers = new Headers();
        headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
   


       

        const setting = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(info),
        }



        let res = await fetch("http://localhost:7000/api/auth/login", setting);
       let json = await res.json()
    setIsLoading(false)
     
      if(res.status === 200) {
              setServerError("")
            setIsLogin()
        
       const {token,roles,user} = json
         setToken(token) ;

        localStorage.setItem('userId',user._id);
        
         currentUserAPI({setCurrentUser,token})

           for (let i = 0; i < roles.length ; i ++){
     if ( roles[i].name.includes('admin') || roles[i].name.includes('moderator')) {
         setIsAdmin(true)
             usersAPI({setAllUsers,token})
             return history.push("/dashboard/users")
      }

           }
        return history.push("/menu")
      
    }
 if(res.status === 500) {
   console.log(json)
   setServerError('Error interno, vuelva a interntar')
return
 }else{
  const {message} = json
        console.log(message)
   
     setServerError(message)

 }
    
     

         
       
}catch(err){

  console.log(err)
}


    
 
  }
const redirectToSingUp = () =>{
setIsNotSingup()
  }
 
  return {register, handleSubmit, errors, onSubmit ,redirectToSingUp} 
     }