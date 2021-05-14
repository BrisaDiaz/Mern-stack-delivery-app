
const contactAPI = async (formData) =>{

  const headers = new Headers();
        headers.append('Accept', 'application/json');

            const setting = {
          method: 'POST',
                  body: formData,
          headers: headers,

        }

  try{
  
  
let res  = await fetch("/api/contact",setting)
if(res.status === 200){

  let {message} = res.json()
      console.log(message)
}


return res

  }catch(err){
    console.log("There was a problem submitting contact form")
    console.log(err)
  }

}

 export default contactAPI