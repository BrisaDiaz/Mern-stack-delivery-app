 
  async function postProductAPI({token,e,formData,productsAPI,setIsSuccessfullySend}){

      
      
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
       
        if(res.status === 201 ){
  setIsSuccessfullySend(true)
e.target.reset()
 
await productsAPI()

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

