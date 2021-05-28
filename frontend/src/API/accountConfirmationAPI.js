const accountConfirmationAPI = async ({setIsSuccessfullySend,setIsRequesLoading,history}) =>{

setIsRequesLoading(true)

  const info = {id: localStorage.getItem('toConfirmUser')}

  const headers = new Headers();
        headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

            const setting = {
          method: 'POST',
                 headers: headers,
                  body: JSON.stringify(info),
   

        }

  try{
  
  
let res  = await fetch("/api/auth/confirmation",setting)

setIsRequesLoading(false)

if(res.status === 200) {
  setIsSuccessfullySend(true)
  localStorage.removeItem('toConfirmUser');
  setTimeout(() => {
    setIsSuccessfullySend(false)
    history.push('/menu')
  }, 3000);
}
if(res.status === 500) alert("Error en el servidor, vuelva a interntar")


  }catch(err){
    console.log(err)


  }

}

 export default accountConfirmationAPI