

async function deleteOrderAPI({token,id}){

     const headers = new Headers();
        headers.append('Accept', 'application/json');
     headers.append('Authorization', `Bearer ${token}`);


        const setting = {
          method: 'DELETE',
          headers: headers,

        }


try {

        let res = await fetch( `/api/orders/${id}`, setting);
        let json = await res.json()
         if(res!== 204){
           console.log( json.message)
         }

      } catch (err) { console.log(err)}



}





  


export default deleteOrderAPI