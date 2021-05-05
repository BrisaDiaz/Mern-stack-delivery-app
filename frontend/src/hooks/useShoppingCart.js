import {useHistory} from 'react-router-dom'
export default function useShoppingCart(emptyCart,resetTotalCost,isLogin,cartProducts) {
const emptyCartAndResetTotalCost = () =>{
  emptyCart();
  resetTotalCost();
}
const history = useHistory()
const handelOrden = () =>{
  
  if(cartProducts.length !== 0){
isLogin ? alert("orden enviada") : history.push("/authentication")

  }else{
    return
  }
}
return {emptyCartAndResetTotalCost,handelOrden}
}
