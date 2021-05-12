
const contactAPI = async (formData) =>{

  const headers = new Headers();
        headers.append('Accept', 'application/json');

            const setting = {
          method: 'POST',
                  body: formData,
          headers: headers,

        }

  try{
  
    let res  = await fetch('/api/contact',setting)
    let json = await res.Json()

    console.log(json.message)



  }catch(err){
    console.log(err)
  }

}

 export default contactAPI