async function forgotPasswordAPI({
setIsFormLoading,
setServerError,
info,
setIsModalOpen
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



        let res = await fetch("/api/auth/forgotPassword", setting);
            let  json = await res.json()

      setIsFormLoading(false)
  

      if(res.status >= 400){
      setServerError(json.message)
      return
      }
  
      setIsModalOpen(false)
 return

      
}catch(err){

  console.log(err)


}

}

export default forgotPasswordAPI