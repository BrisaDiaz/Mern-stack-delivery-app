 async function updateProductAPI(
{    token,
    e,
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
     const formData = new FormData()
      let active =  e.target.state.checked ? true : false ;


          formData.append('img',e.target.img.files[0])
        formData.append('name', nameValue)
        formData.append('category', categoryValue)
        formData.append('size', sizeValue)
        formData.append('description', descriptionValue)
        formData.append('price', priceValue)
        formData.append('active', active)

       
   
      
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

      } catch (err) {

        console.log(err)
      }
  }

export default updateProductAPI