import {useHistory} from 'react-router-dom'
import {useState, useEffect } from 'react'

export default function useDashboardOrders({token,setIsLoading}){

const history = useHistory()

const seeDetails = (orderID) =>{
      setIsLoading(true)
 history.push(`/dashboard/orders/${orderID}` )
}

const resetQuery = () =>{
setPage(1)
setState('all')
}

const handleRefresh = () =>{
  return history.push(`/dashboard/orders`)
}


 let query = new URLSearchParams();
    let sizeLimit = 5



  const [orderID, setOrderID] = useState("")
  const[isLoading,setIsLoadingPage] = useState(false)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [orders, setOrders] = useState(null)
    const [state,setState] =useState('all')
  const [sorting, setSorting] = useState("-createdAt")

   query.append('page',page)
   query.append('limit',sizeLimit)
   query.append('sort',sorting)

  


useEffect(() => {
  const controller = new AbortController()
 const signal = controller.signal
const productsAPI = async () =>{
    setIsLoadingPage(true)
  try{
   if(orderID !==""){ 
      query.append('orderID',orderID)
    }

    if(state !=="all"){
query.append('state',state)
    }

       const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


    const setting = {
          method: 'GET',
          headers: headers,
signal,
        }

     let res = await fetch(`/api/orders?${query}`,setting)
     let json = await res.json()

    setOrders(json.data)

    let total = parseInt(json.total)

     setMaxPage(Math.ceil(total/sizeLimit))



     setIsLoadingPage(false)
  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

     console.log(err)

  }
}
  }

  productsAPI()
   window.scrollTo(0, 0)
     return () =>{
     controller.abort()
   }   
 }, [orderID,state,page,sorting])

     

return {seeDetails,resetQuery,handleRefresh,setOrderID,setSorting,setState,setPage,page,isLoading,maxPage,orders,sorting}


}