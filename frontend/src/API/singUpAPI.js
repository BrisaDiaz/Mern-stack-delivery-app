

async function singUpAPI({
setIsFormLoading,
setServerError,
setIsSingUp,
e
}){
try{
  setIsFormLoading(true)
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
setIsFormLoading(false)

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

export default singUpAPI