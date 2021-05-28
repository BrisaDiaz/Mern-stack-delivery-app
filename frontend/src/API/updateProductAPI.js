 async function updateProductAPI(
{    token,
    formData,
    id,
    nameValue,
categoryValue,
sizeValue,
descriptionValue,
priceValue,
setIsSuccessfullySend,
productsAPI,
history,

}
){
     

      
      
        const headers = new Headers();
        headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


        const setting = {
          method: 'PUT',
          headers: headers,
          body: formData,
        }

let url =`/api/products/${id}`
  try {
        let res = await fetch(url , setting);


      if(res.status === 200){
         
           setIsSuccessfullySend(true)
 await productsAPI()
      }
   setTimeout(() => {
  setIsSuccessfullySend(false)
  return history.push('/dashboard/myProducts')
}, 2000);

      if(res.status === 403) return   alert('Se require rol de Administrador') 
      } catch (err) {

        console.log(err)
      }
  }

export default updateProductAPI