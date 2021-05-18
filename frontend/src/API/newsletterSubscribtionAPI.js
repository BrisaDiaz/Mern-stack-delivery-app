const newsletterSubscribtionAPI = async ({email,setIsSuccessfullySend}) =>{

  const info =  {email: email}

  const headers = new Headers();
        headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

            const setting = {
          method: 'POST',
                 headers: headers,
                  body: JSON.stringify(info),
   

        }

  try{
  
  
let res  = await fetch("/api/newsletter",setting)


if(res.status === 200) {
  setIsSuccessfullySend(true)

  setTimeout(() => {
    setIsSuccessfullySend(false)

  }, 3000);
}
if(res.status === 500) alert("Error en el servidor, vuelva a interntar")

  }catch(err){

    console.log(err)


  }

}

 export default newsletterSubscribtionAPI