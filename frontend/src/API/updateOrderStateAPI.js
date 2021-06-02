
import getAllOrdersAPI from './getAllOrdersAPI'


export default async function updateOrderState({token,orderId,stateName,setAllOrders,setIsLoading}){

try{
setIsLoading(true)

    const headers = new Headers();
        headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


       

        const setting = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({state:stateName}),
        }
        


       let res =  await fetch(`/api/orders/${orderId}`, setting);
   
       if(res.status === 200){
          await  getAllOrdersAPI({setAllOrders,token,setIsLoading})
       }

              


 
}catch(err){

  console.log(err)


}




}