async function resetPasswordAPI({
setIsFormLoading,
setServerError,
info,
token,
history,
setIsSingUp
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



        let res = await fetch(`/api/auth/resetPassword/${token}`, setting);
            let  json = await res.json()

      setIsFormLoading(false)

      if(res.status >= 400){
       setServerError(json.message)
       return
      }else{
               setIsSingUp()
               return history.push('/authentication')
      }

 

      
}catch(err){

  console.log(err)


}

}

export default resetPasswordAPI