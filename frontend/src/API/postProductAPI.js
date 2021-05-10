 
  async function postProductAPI({token,e,productsAPI,setIsSuccessfullySend}){

      const formData = new FormData()
let active =  e.target.state.checked ? true : false ;

        formData.append('img', e.target.img?.files[0])
        formData.append('name', e.target.name.value)
        formData.append('category', e.target.category.value)
        formData.append('size', e.target.size.value)
        formData.append('description', e.target.description.value)
        formData.append('price', e.target.price.value)
        formData.append('active', active)
      
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
       
        if(res.status >= 200  || res.status < 300  ){
  setIsSuccessfullySend(true)
e.target.reset()
 
await productsAPI()

        setTimeout(() => {
   setIsSuccessfullySend(false)

            }, 2000);
      }     
      
} catch (err) {

        console.log(err)
      }
  }

 

export default postProductAPI

