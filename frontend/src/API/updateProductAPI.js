 import getCategoriesAPI from './getCategoriesAPI'
 
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
setFormIsLoading,
history,
setAllCategories
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
       setFormIsLoading(false)

      if(res.status === 200){

       await getCategoriesAPI(setAllCategories)

           setIsSuccessfullySend(true)
          setTimeout(() => {
           setIsSuccessfullySend(false)
        return history.push('/dashboard/myProducts')
}, 2000);
      }
 


      if(res.status === 403) return   alert('Se require rol de Administrador') 
      } catch (err) {

        console.log(err)
      }
  }

export default updateProductAPI