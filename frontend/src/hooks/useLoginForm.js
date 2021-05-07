import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom';
import usersAPI from '../API/usersAPI'
import currentUserAPI from '../API/currentUserAPI'
export default  function useLoginForm({setIsLogin,setIsNotSingup,setIsAdmin,setToken,setServerError, setCurrentUser,setIsLoading,setAllUsers,token,setIsModerator}){
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
            body: JSON.stringify(info),
          headers: headers,
        
        }



        let res = await fetch("/api/auth/login", setting);
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
             
     if ( roles[i].name.includes('admin')) {
         setIsAdmin(true)
             usersAPI({setAllUsers,token})
          return history.push("/dashboard/users")
      }
     else if(roles[i].name.includes('moderator')){
      setIsModerator(true)
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