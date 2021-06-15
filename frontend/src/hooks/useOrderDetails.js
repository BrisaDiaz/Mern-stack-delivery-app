import {useStorage} from '../context/useStorage'
import {useParams} from 'react-router-dom'


export default function useOrderDetails(params) {
  
   let { orderID } = useParams()
  const {currentUser} =  useStorage()


let userOrders = currentUser?.orders
 let thisOrder =  userOrders.find( order => order.orderID  === parseInt(orderID) ) 



  return {thisOrder,orderID}
} 