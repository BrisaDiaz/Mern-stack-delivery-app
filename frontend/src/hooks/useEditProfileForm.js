import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import currentUserAPI from '../API/currentUserAPI'
import usersAPI from '../API/usersAPI'

export default function useEditProfileForm({setServerError,setIsLoading,token,setCurrentUser,setAllUsers,setIsSuccess}){
   const history = useHistory()
    const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

async function onSubmit(data,e) {


 e.preventDefault()
try{
  setIsLoading(true)




const name =  e?.target?.userName?.value?.toLowerCase(),
adress = e.target.userAdress?.value?.toLowerCase();

const info ={
name,
password:e?.target?.userPassword?.value,
newPassword:e?.target?.userNewPassword?.value,
number:e.target.userNumber?.value,
adress,

}


  const id = localStorage.getItem('userId');



     const headers = new Headers();
        headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);

        const setting = {
          method: 'PUT',
          headers: headers,
            body: JSON.stringify(info),
        }



        let res = await fetch(`/api/users/me/${id}`, setting);
            let  json = await res.json()

setIsLoading(false)

         if(res.status === 200) {
        


       currentUserAPI({token,setCurrentUser})

         setIsSuccess(true);
         setTimeout(() => {
                    setServerError(false);
                    history.push("/myAccount/myProfile")
         }, 3000);
  
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
  


  return {register,handleSubmit,errors,onSubmit} 

  
}