import {
  SET_IS_LOADING,
  SET_ALL_PRODUCTS,
  SET_ALL_USERS,
  SET_CURRENT_USER,
  SET_TOKEN,
  SET_PRODUCT_TO_EDIT,
  TOGGLE_CART,
ADD_TO_TOTAL_COST,
DELETE_OF_TOTAL_COST,
ADD_PRODUCT_TO_CART,
DELETE_PRODUCT_OF_CART,
EMPTY_CART,
RESET_TOTAL_COST,
SET_IS_SING_UP_TRUE,
SET_IS_LOGIN_TRUE,
SET_IS_SING_UP_FALSE,
SET_IS_LOGIN_FALSE,
SET_IS_ADMIN,
SET_IS_MODERATOR,
SET_MENU_SEARCH_QUERY,
SET_ADMIN_SEARCH_QUERY,
SET_MENU_SORT_PREFERENCE,
SET_PRODUCT_STATE_FILTER_PREFERENCE
} from './app-actions'

 function appReducer(state,action){

switch (action.type) {
  
   case SET_IS_LOADING:
        return{ 
          ...state,
          isLoading: action.payload
        };
  case SET_ALL_PRODUCTS:
        return{ 
          ...state,
          products: action.payload
        };
  case SET_ALL_USERS:
        return{ 
          ...state,
          users: action.payload
        };
    case SET_CURRENT_USER:
        return{ 
          ...state,
          currentUser: action.payload
        };
    case SET_TOKEN:
        return{ 
          ...state,
          token: action.payload
        };

   case SET_PRODUCT_TO_EDIT:
  
        return{ 
       
          ...state,
          productToEdit: action.payload,

          };
      
  case ADD_PRODUCT_TO_CART:
        return{ 
               ...state,
          cartProducts:[...state.cartProducts,action.payload]
        };
  case DELETE_PRODUCT_OF_CART:{
    let actualizedCart = state.cartProducts.filter(product => product._id !== action.payload);
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
case SET_IS_SING_UP_FALSE:
        return{ 
            ...state,
          isSingUp: false,
        };
case SET_IS_SING_UP_TRUE:
        return{ 
            ...state,
          isSingUp: true,
        };
 case SET_IS_LOGIN_TRUE:
        return{ 
            ...state,
                isLogin: true,
        };
case SET_IS_ADMIN:
        return{ 
            ...state,
                isAdmin: action.payload,
        };
case SET_IS_MODERATOR:
        return{ 
            ...state,
                isModerator: action.payload,
        };

case SET_IS_LOGIN_FALSE:
        return{ 
            ...state,
          isLogin: false,
        }; 
case SET_MENU_SEARCH_QUERY:

        return{
            ...state,
          menuSearchQuery:action.payload
         };
case SET_ADMIN_SEARCH_QUERY:

        return{
            ...state,
          adminSearchQuery:action.payload
         };
case SET_MENU_SORT_PREFERENCE:
        return{
            ...state,
          menuSortPreference:action.payload
         };
case SET_PRODUCT_STATE_FILTER_PREFERENCE:
        return{
            ...state,
          productStateFilterPreference:action.payload
         };         
  default:  return state;

}

}

export default appReducer