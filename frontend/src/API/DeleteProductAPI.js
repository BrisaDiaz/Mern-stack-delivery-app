async function DeleteProductAPI(productsAPI,token,id){

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


        if(res.status  ===204 ) return await productsAPI()
  
        if(res.status === 403) return   alert('Se require rol de Administrador') 

      } catch (err) {

        console.log(err)
      }

}else{
  return
}
  

  }

  


export default DeleteProductAPI