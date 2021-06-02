 
  async function postProductAPI({token,e,formData,setIsSuccessfullySend,setFormIsLoading}){

      
       const headers = new Headers();
       
        headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


        const setting = {
          method: 'POST',
            body: formData,
          headers: headers,

        }

        
  try {

     let res = await fetch("/api/products", setting);
       setFormIsLoading(false)
        if(res.status === 201 ){
  setIsSuccessfullySend(true)
e.target.reset()
 
        setTimeout(() => {
   setIsSuccessfullySend(false)

            }, 2000);
            return
      }     
      
} catch (err) {

        console.log(err)
      }
  }

 

export default postProductAPI

