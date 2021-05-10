import currentUserAPI from './currentUserAPI'
import usersAPI from './usersAPI'

async function UploadProfileAPI({
  setFormIsLoading,
setIsSuccessfullySend,
setServerError,
e,
isAdmin,
setAllUsers,
token,
setCurrentUser,
history,
}){
  try{
  setFormIsLoading(true)
   setServerError("");



const name =  e?.target?.userName?.value?.toLowerCase(),
address = e.target.userAddress?.value?.toLowerCase();

const info ={
name,
password:e?.target?.userPassword?.value,
newPassword:e?.target?.userNewPassword?.value,
number:e.target.userNumber?.value,
address,

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

setFormIsLoading(false)

         if(res.status === 200) {
        

         (isAdmin) && usersAPI({token,setAllUsers})

       currentUserAPI({token,setCurrentUser})

         setIsSuccessfullySend(true);
         setTimeout(() => {

                  setIsSuccessfullySend(false)

                    history.push("/myAccount/myProfile")
         }, 3000);

     return
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

export default UploadProfileAPI