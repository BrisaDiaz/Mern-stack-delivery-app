import usersAPI from './usersAPI'
import currentUserAPI from './currentUserAPI'

async function loginAPI({
info,
setIsLoading,
setServerError,
setIsLogin,
setToken,
setIsAdmin,
history,
setCurrentUser,
setAllUsers,
setIsFormLoading,
setIsModerator,

}){
try {
setIsFormLoading(true)



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
         let {message} = json
    setIsFormLoading(false)
     
      if(res.status === 200) {
              setServerError("")
    
        setIsLoading(true)
       const {token,roles,user} = json
         setToken(token) ;

        localStorage.setItem('userId',user._id);
        
      await   currentUserAPI({setCurrentUser,token})

        setIsLogin()
        

             
     if ( roles[0].name === 'admin') {
         setIsAdmin(true)

        
        await usersAPI({setAllUsers,token})
 
setIsLoading(false)

           return  history.push("/dashboard/orders")
      }
     if(roles[0].name === 'moderator'){
      setIsModerator(true)
      setIsLoading(false)
       return history.push("/dashboard/myProducts")
       
      }
setIsLoading(false)
   return history.push("/menu")

     }
   
      
    

if(res.status === 302){

    let {redirect,id} = json

  localStorage.setItem('toConfirmUser', id)
  

  setTimeout(() => {

   return history.push(redirect)
  }, 1000);


}


   
     setServerError(message)

       
}catch(err){

  console.log(err)

}

}
export default loginAPI