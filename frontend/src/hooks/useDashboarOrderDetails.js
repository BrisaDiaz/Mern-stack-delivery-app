import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'

export default function useDashboarOrderDetails({setIsLoading,token}){
  
let {orderID}=  useParams()


 const [thisOrder,setThisOrder] = useState({})
const [isRefreshing,setIsRefreshing] = useState(false)


 useEffect(()=>{


  const controller = new AbortController()
 const signal = controller.signal

  const fechOrder= async () =>{
  try{

     const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


    const setting = {
          method: 'GET',
          headers: headers,
signal,
        }

     let res = await fetch(`/api/orders/${orderID}`,setting)
     let json = await res.json()

    setThisOrder(json.data)

     setIsLoading(false)

  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

     console.log(err)
    for(let i = 0; i < 6 ;i++){
    fechOrder()

        }
 
  }
}
  }

  fechOrder()

   window.scrollTo(0, 0)
  return () =>{
     controller.abort()
   }   
   
 },[orderID,isRefreshing])


return {thisOrder,isRefreshing,setIsRefreshing}

}