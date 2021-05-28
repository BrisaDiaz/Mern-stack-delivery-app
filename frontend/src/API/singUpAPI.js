

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

        const {redirect,id} = json 

       localStorage.setItem('toConfirmUser', id)

 setTimeout(() => {
       return history.push(redirect)
  }, 1000);
      }

       if(res.status === 400) {
  const {message} = json
   console.log(message)
      setServerError(message)
return
 }
 

      
}catch(err){

  console.log(err)


}

}

export default singUpAPI