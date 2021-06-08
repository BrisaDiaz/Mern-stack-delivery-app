import {useHistory} from 'react-router-dom'
import {  useState,useEffect} from 'react'
import deleteOrderAPI from '../API/deleteOrderAPI'
import currentUserAPI from '../API/currentUserAPI'

export default function useMyOrdersPage({currentUser,token,setCurrentUser,setIsLoading}){
  const history = useHistory()

     
    let limit = 5
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
     const [orders,setOrders] = useState([])

let userOrders =[...currentUser?.orders].sort((a, b)=>{
    return    b.createdAt -a.createdAt
});
useEffect(() => {
setMaxPage(Math.ceil(userOrders.length/limit))

 setOrders(userOrders.splice( (page-1)*limit  , ((page-1)*limit)+limit))

},[page,limit,currentUser])


const deleteOrder = (e,id) =>{
 e.stopPropagation();
if (!e.target.disabled ) return deleteOrderAPI({token,id,setCurrentUser})
}
const seeDetails = (orderID) =>{
 return history.push(`/myAccount/myOrders/${orderID}` )
}

const handelRefresh = () =>{
  setIsLoading(true)
  currentUserAPI({token,setCurrentUser})

}
useEffect(()=>{
 setIsLoading(false)
},[currentUser])

return {page,setPage,maxPage,orders,deleteOrder,seeDetails,handelRefresh}
}