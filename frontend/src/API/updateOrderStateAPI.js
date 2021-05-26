
import getAllOrdersAPI from './getAllOrdersAPI'


export default async function updateOrderState({token,orderId,stateName,setAllOrders}){

try{


    const headers = new Headers();
        headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


       

        const setting = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({state:stateName}),
        }
        


        await fetch(`/api/orders/${orderId}`, setting);
   
          await  getAllOrdersAPI({setAllOrders,token})


 
}catch(err){

  console.log(err)


}




}