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

 function cartReducer(state,action){

switch (action.type) {

  case ADD_PRODUCT_TO_CART:

        return{
               ...state,
          cartProducts:[...state.cartProducts,action.payload]
        };
case ACTUALIZE_CART:{

  let actualizedCart = state.cartProducts.map( product =>
{
     if(product.info._id === action.payload.id) {
return  ( {info:product.info, quantity: action.payload.quantity})

     } else {

   return   product

}
  }  )

        return{
               ...state,

          cartProducts: actualizedCart
        };
          }
  case DELETE_PRODUCT_OF_CART:{

    let actualizedCart = state.cartProducts.filter(product => product.info._id !== action.payload);
  return{
          ...state,
          cartProducts: actualizedCart
        };
  }
  case EMPTY_CART:
        return{
          ...state,
          cartProducts:[],
        };
  case DELETE_OF_TOTAL_COST:
        return{
                    ...state,
          totalCost: state.totalCost - action.payload
         };
  case ADD_TO_TOTAL_COST:
        return{
            ...state,
          totalCost: state.totalCost + action.payload
         };
  case RESET_TOTAL_COST:
        return{
            ...state,
          totalCost: 0,
        };
case TOGGLE_CART:
        return{
            ...state,
          isCartOpen: !state.isCartOpen,
        };


  default:  return state;

}

}

export default cartReducer
