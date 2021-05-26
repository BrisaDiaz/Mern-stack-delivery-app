import {useHistory} from 'react-router-dom'
import postOrderAPI from '../API/postOrderAPI'



export default   function  useShoppingCart({  emptyCart,resetTotalCost,isLogin,cartProducts,currentUser,setCurrentUser,token,setAllOrders,setIsLoading,toggleCart}) {

 

 
const emptyCartAndResetTotalCost = () =>{
  emptyCart();
  resetTotalCost();
}
const history = useHistory()
const handelOrden = () =>{
  


 
if(cartProducts.length !== 0){

  if(!isLogin) return history.push("/authentication")

  if(currentUser?.profileState !=="complited") return alert('Se require que complete su  perfil en la cuenta para poder realizar la orden')


  const confirmation = window.confirm(`El pedido será automáticamente enviado a ${currentUser?.address}, desea proseguir con el pedido?`)



if (confirmation){

  postOrderAPI({cartProducts,token,emptyCart,setAllOrders,resetTotalCost,setCurrentUser,setIsLoading,toggleCart})


return

  }

}







}


  return {emptyCartAndResetTotalCost ,handelOrden}
}