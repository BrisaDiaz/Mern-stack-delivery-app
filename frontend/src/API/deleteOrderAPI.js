

import currentUserAPI from './currentUserAPI'

async function deleteOrderAPI({token,id,setCurrentUser}){

     const headers = new Headers();
        headers.append('Accept', 'application/json');
     headers.append('Authorization', `Bearer ${token}`);


        const setting = {
          method: 'DELETE',
          headers: headers,

        }

const deleteConfirmation = window.confirm('¿Esta seguro de querer cancelar su pedido? ');

if(deleteConfirmation){

try {

        let res = await fetch( `/api/orders/${id}`, setting);


         if(res.status  ===204 ){

   await currentUserAPI({setCurrentUser,token})
    return 

    }


      } catch (err) { console.log(err)}



}




return
  }

  


export default deleteOrderAPI