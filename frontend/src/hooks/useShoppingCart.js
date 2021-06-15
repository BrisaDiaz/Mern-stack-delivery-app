import {useHistory} from 'react-router-dom'
import postOrderAPI from '../API/postOrderAPI'
import {useStorage} from '../context/useStorage'



export default   function  useShoppingCart() {

 const {cartProducts,totalCost,emptyCart,resetTotalCost,isCartOpen,isLogin,currentUser,setCurrentUser,token,setAllOrders,setIsLoading,toggleCart}  = useStorage()

 
const emptyCartAndResetTotalCost = () =>{
  emptyCart();
  resetTotalCost();
}

const history = useHistory()

const handelOrden = () =>{
  


 
if(cartProducts.length !== 0){

  if(!isLogin) return history.push("/authentication")

  if(currentUser?.profileState !=="complited") return alert('Se require que complete su  perfil en la cuenta para poder realizar la orden')




   postOrderAPI({cartProducts,token,emptyCart,setAllOrders,resetTotalCost,setCurrentUser,setIsLoading,toggleCart,history})




}

}


  return { emptyCartAndResetTotalCost,handelOrden,totalCost,isCartOpen,cartProducts} 
}