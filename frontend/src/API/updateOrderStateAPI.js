



export default async function updateOrderState({token,orderId,stateName,setIsLoading,history}){

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

       setIsLoading(false)


       return  
       }


 
}catch(err){

  console.log(err)


}




}