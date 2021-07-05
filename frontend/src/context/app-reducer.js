import {
  SET_IS_LOADING,
  SET_ALL_USERS,
  SET_ALL_CATEGORIES,
  SET_CURRENT_USER,
  SET_TOKEN,
  SET_PRODUCT_TO_EDIT,
SET_IS_LOGIN_TRUE,
SET_IS_LOGIN_FALSE,
SET_IS_ADMIN,
SET_IS_MODERATOR,
SET_FORM_DATA_SUCCESFULLY_SEND
} from './app-actions'

 function appReducer(state,action){

switch (action.type) {

   case SET_IS_LOADING:
        return{
          ...state,
          isLoading: action.payload
        };
  case SET_ALL_USERS:
        return{
          ...state,
          users: action.payload
        };
  case SET_ALL_CATEGORIES:
        return{
          ...state,
          categories: action.payload
        };
    case SET_CURRENT_USER:
        return{
          ...state,
          currentUser: action.payload
        };
    case SET_TOKEN:
        return{
          ...state,
          token:action.payload,
        };

   case SET_PRODUCT_TO_EDIT:

        return{

          ...state,
          productToEdit: action.payload,

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
case SET_FORM_DATA_SUCCESFULLY_SEND:
        return{
            ...state,
          isSuccessfullySend:action.payload
         };
  default:  return state;

}

}

export default appReducer