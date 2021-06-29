import {useHistory,useLocation} from 'react-router-dom'
import {useState, useEffect } from 'react'
import {useStorage} from '../context/useStorage'


export default function useDashboardOrders({setNotification}){
const history = useHistory()
const location = useLocation()


  
const {token,setIsLoading} = useStorage()


const seeDetails = (orderID) =>{
      setIsLoading(true)
 history.push(`/dashboard/orders/${orderID}` )
}





  let query = new URLSearchParams();

    let sizeLimit = 5



  const [orderID, setOrderID] = useState("")
  const[isLoading,setIsLoadingPage] = useState(false)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [orders, setOrders] = useState([])
    const [state,setState] =useState('all')
  const [sorting, setSorting] = useState("-createdAt")
const [isFirstRender, setIsFirstRender] = useState(true)
let [refreshCount,setRefreshCount] = useState(0)
   
   query.append('page',page)
   query.append('limit',sizeLimit)
   query.append('sort',sorting)








useEffect(() => {

if(orderID !==""){ 

query.append('orderID',orderID)

setPage(1)
setState('all')
     
    }
  
},[orderID])

useEffect(() => {

if(state !=="all"){
query.append('state',state)
    }
  
},[state])

useEffect(() => {
    setNotification(0)
  const controller = new AbortController()
 const signal = controller.signal

  if( isFirstRender && location.search !==""){

     query=location.search.split('?')[1]
      

      }

const ordersAPI = async () =>{
    setIsLoadingPage(true)

  try{


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

  history.push(`/dashboard/orders?${query}`)

document.querySelector('body').scrollTo(0,60)
        setIsFirstRender(false)
     setIsLoadingPage(false)
 
  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

     console.log(err)

  }
}
  }

  ordersAPI()


     return () =>{
     controller.abort()
   }   
 }, [orderID,state,page,sorting,refreshCount])




 const handleRefresh = () =>{
setRefreshCount(Date.now())
setPage(1)
setSorting('-createdAt')
setState('all')
}


return {seeDetails,handleRefresh,setOrderID,setSorting,setState,setPage,page,isLoading,maxPage,orders,sorting,isFirstRender}


}