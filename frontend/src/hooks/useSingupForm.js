import {useForm} from 'react-hook-form';


export default function useSingupForm(setIsSingUp,setServerError,setIsLoading){

    const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

async function onSubmit(data,e) {


 e.preventDefault()
try{
  setIsLoading(true)
const info ={
name: e.target.userName.value.toLowerCase(),
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



        let res = await fetch("/api/auth/singUp", setting);
            let  json = await res.json()
setIsLoading(false)

         if(res.status === 200) {
      setServerError("")

       setIsSingUp()
      
      }

       if(res.status === 500) {
   console.log(json)
   setServerError('Error interno, vuelva a interntar')
return
 }
 
  const {message} = json
        console.log(message)
      setServerError(message)
      
}catch(err){

  console.log(err)
}



  }
  const redirectToLogin = () =>{
     setIsSingUp();
  }


  return {register,handleSubmit,errors,onSubmit,redirectToLogin} 

  
}