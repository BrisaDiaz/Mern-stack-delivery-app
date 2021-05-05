import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import currentUserAPI from '../API/currentUserAPI'
import usersAPI from '../API/usersAPI'

export default function useSingupForm({setServerError,setIsLoading,token,getUsers,setCurrentUser,setAllUsers,setIsSuccess}){
   const history = useHistory()
    const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

async function onSubmit(data,e) {


 e.preventDefault()
try{
  setIsLoading(true)



  const rolesInputs=[e.target.moderator,e.target.admin,e.target.user]

 const selectRoles = rolesInputs.filter(role => role?.checked === true ).map(role => role?.value)
let roles = (selectRoles.length) > 0 ?  selectRoles : ["user"];


const info ={
name: e.target.userName.value.toLowerCase(),
password:e.target.userPassword.value,
newPassword:e.target.newPassword.value,
number:e.target.userNumber.value,
adress:e.target.userAdress.value.toLowerCase(),
roles,
}


  const id = localStorage.getItem('userId');



     const headers = new Headers();
        headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
     headers.append('x-access-token', token);

        const setting = {
          method: 'PUT',
          headers: headers,
            body: JSON.stringify(info),
        }
        console.log(setting.body)



        let res = await fetch(`http://localhost:7000/api/users/me/${id}`, setting);
            let  json = await res.json()
setIsLoading(false)

         if(res.status === 200) {
        
        usersAPI({token, setAllUsers});
       currentUserAPI({token,setCurrentUser})

         setIsSuccess(true);
         setTimeout(() => {
                    setServerError(false);
                    history.push("/myAccount/myProfile")
         }, 5000);
  
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