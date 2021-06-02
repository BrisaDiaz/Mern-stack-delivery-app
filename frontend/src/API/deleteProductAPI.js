async function deleteProductAPI(token,id,setProducts){

     const headers = new Headers();
        headers.append('Accept', 'application/json');
     headers.append('Authorization', `Bearer ${token}`);


        const setting = {
          method: 'DELETE',
          headers: headers,

        }

const deleteConfirmation = window.confirm('El producto será eliminado de la base de datos ¿Esta seguro? ');

if(deleteConfirmation){

try {
      

  
  
  let res = await fetch(`/api/products/${id}`, setting);


        if(res.status  === 204 ) {

          let productsFetch = await fetch('/api/products?page=1&limit=6')
          let {data} = await productsFetch.json()
          setProducts(data)
        }
       
   
        if(res.status === 403) return   alert('Se require rol de Administrador') 

      } catch (err) {

        console.log(err)
      }

}else{
  return
}
  

  }

  


export default deleteProductAPI