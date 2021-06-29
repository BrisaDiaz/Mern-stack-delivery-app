import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import postOrderAPI from '../API/postOrderAPI'
import {useStorage} from '../context/useStorage'



export default   function  useShoppingCart() {

 const {cartProducts,totalCost,emptyCart,resetTotalCost,isCartOpen,isLogin,currentUser,token,setAllOrders,setIsLoading,toggleCart}  = useStorage()

 let  [isCartLoading,setCartIsLoading] = useState(false)
 
const emptyCartAndResetTotalCost = () =>{
  emptyCart();
  resetTotalCost();
}

const history = useHistory()

const handelOrden = async () =>{
  


 
if(cartProducts.length !== 0){

  if(!isLogin) return history.push("/authentication/login")

  if(currentUser?.profileState !=="complited") return alert('Se require que complete su  perfil en la cuenta para poder realizar la orden')



setCartIsLoading(true)

   postOrderAPI({cartProducts,token,emptyCart,setAllOrders,resetTotalCost,setIsLoading,toggleCart,history,setCartIsLoading})




}

}


  return { emptyCartAndResetTotalCost,handelOrden,totalCost,isCartOpen,cartProducts,isCartLoading} 
}