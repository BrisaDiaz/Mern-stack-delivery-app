import {useReducer} from 'react'
import CartContext from  './cart-context';
import cartReducer from  './cart-reducer';



import {

  TOGGLE_CART,
ADD_TO_TOTAL_COST,
DELETE_OF_TOTAL_COST,
ADD_PRODUCT_TO_CART,
ACTUALIZE_CART,
DELETE_PRODUCT_OF_CART,
EMPTY_CART,
RESET_TOTAL_COST,
} from './cart-actions'







export default  function CartState(props) {





const initialState =  {
cartProducts:[],
totalCost:0,
isCartOpen:false,
}

const [state, dispatch] = useReducer(cartReducer, initialState)

const numberOfProductsInCart = state.cartProducts.length;


const addToCart = (productInf) =>{
    dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: productInf,
  })
}
const actualizeCart = (productInf) =>{
    dispatch({
    type: ACTUALIZE_CART,
    payload : productInf,
  })
}

const deleteOfCart = (id) =>{
    dispatch({
      type: DELETE_PRODUCT_OF_CART,
    payload : id,
  })
}
const addToTotalCost =(productCosts) =>{
  dispatch({
    type: ADD_TO_TOTAL_COST,
    payload: productCosts,
  })
}
const deleteOfTotalCost =(productCosts) =>{
  dispatch({
    type: DELETE_OF_TOTAL_COST,
    payload: productCosts,
  })
}
const resetTotalCost = () =>{
    dispatch({
      type: RESET_TOTAL_COST
  })
}
const emptyCart = () =>{
    dispatch({
      type: EMPTY_CART
  })
}
const toggleCart = () =>{

dispatch ({
   type: TOGGLE_CART
})
}



  return (

    <CartContext.Provider
    value= {{
cartProducts: state.cartProducts,
totalCost:state.totalCost,
numberOfProductsInCart,
isCartOpen:state.isCartOpen,
emptyCart,
addToCart,
actualizeCart,
deleteOfCart,
addToTotalCost,
deleteOfTotalCost,
resetTotalCost,
toggleCart,
    }}>

          {props.children}

    </CartContext.Provider>

    );


}
