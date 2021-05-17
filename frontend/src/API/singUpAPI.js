

async function singUpAPI({
setIsFormLoading,
setServerError,
setIsSingUp,
history,
info
}){
try{
  setIsFormLoading(true)


  



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

         if(res.status === 201 || 302) {
      setServerError("")

       setIsSingUp()

        const {redirect} = json 
  
 setTimeout(() => {
       return history.push(redirect)
  }, 1000);
      }

       if(res.status === 500) {

   setServerError('Error en el servidor, vuelva a interntar')
return
 }
 
  const {message} = json
   
      setServerError(message)
      
}catch(err){

  console.log(err)


}

}

export default singUpAPI