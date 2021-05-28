import currentUserAPI from './currentUserAPI'
import usersAPI from './usersAPI'

async function UploadProfileAPI({
  setFormIsLoading,
setIsSuccessfullySend,
setServerError,
info,
isAdmin,
setAllUsers,
token,
setCurrentUser,
history,
}){
  try{
  setFormIsLoading(true)
   setServerError("");






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
        

         (isAdmin) && await usersAPI({token,setAllUsers})

       await currentUserAPI({token,setCurrentUser})

         setIsSuccessfullySend(true);
         setTimeout(() => {

                  setIsSuccessfullySend(false)

                    history.push("/myAccount/myProfile")
         }, 3000);

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