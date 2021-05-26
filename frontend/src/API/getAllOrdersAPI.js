async function getAllOrdersAPI({setAllOrders,token,setIsLoading}){

        const headers = new Headers();
        headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


    const setting = {
          method: 'GET',
          headers: headers,

        }
    try{

const res = await fetch(`/api/orders`,setting);
  const {data} = await res.json()

 setAllOrders(data)
 setIsLoading(false) 


    }catch(err){

      console.log(err)
    }

  };
  export default getAllOrdersAPI