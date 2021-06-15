import  {useReducer,useEffect} from 'react';
import AppContext from  './app-context';
import appReducer from  './app-reducer';



import {
  SET_IS_LOADING,
  SET_ALL_USERS,
  SET_ALL_CATEGORIES,
  SET_CURRENT_USER,
  SET_TOKEN,
  SET_PRODUCT_TO_EDIT,
  TOGGLE_CART,
ADD_TO_TOTAL_COST,
DELETE_OF_TOTAL_COST,
ADD_PRODUCT_TO_CART,
ACTUALIZE_CART,
DELETE_PRODUCT_OF_CART,
EMPTY_CART,
RESET_TOTAL_COST,
SET_IS_SING_UP_TRUE,
SET_IS_SING_UP_FALSE,
SET_IS_LOGIN_TRUE,
SET_IS_LOGIN_FALSE,
SET_IS_ADMIN,
SET_IS_MODERATOR,
SET_FORM_DATA_SUCCESFULLY_SEND
} from './app-actions'







export default  function AppState(props) {



  const getCategoriesAPI = async () => {

   const headers = new Headers();
        headers.append('Accept', 'application/json');
     

    const setting = {
          method: 'GET',
          headers: headers,

        }
try{
let res =  await fetch('/api/categories',setting)
let  json= await res.json()

const {data} = json

setAllCategories(data)
setIsLoading(false)

}catch(err){
getCategoriesAPI()

  console.log(err)
}
}  


  
    useEffect( ()=>{
getCategoriesAPI()
  },[])







const initialState =  {
users:[],
categories:[],
currentUser: {},
token:"",
isLoading:true,
cartProducts:[],
productToEdit:{},
totalCost:0,
isCartOpen:false,
isSingUp:false,
isLogin:false,
isAdmin:false,
isModerator:false,
isSuccessfullySend: false,
}

const [state, dispatch] = useReducer(appReducer, initialState)

const numberOfProductsInCart = state.cartProducts.length;


const setIsLoading=(bulean)=>{
  dispatch({
    type:SET_IS_LOADING,
    payload:bulean,
  })
}

const setAllUsers = (data)=>{
  dispatch({
    type: SET_ALL_USERS,
    payload: data
  })
}

 const setAllCategories = (data) =>{
  dispatch({
    type:SET_ALL_CATEGORIES,
    payload: data
  })
}
const setCurrentUser = (data)=>{
  dispatch({
    type: SET_CURRENT_USER,
    payload: data
  })
}
const setToken = (token) =>{
  dispatch({
    type: SET_TOKEN,
    payload: token,
  })
}
const addToCart = (productInf) =>{
    dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload : productInf,
  })
}
const actualizeCart = (productInf) =>{
    dispatch({
    type: ACTUALIZE_CART,
    payload : productInf,
  })
}
const setProductToEdit= (product) =>{
dispatch({
  type: SET_PRODUCT_TO_EDIT,
  payload: product,
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
const setIsSingUp = () =>{
  dispatch({
    type: SET_IS_SING_UP_TRUE,
  })
}
const setIsNotSingup = () =>{
   dispatch({
    type: SET_IS_SING_UP_FALSE,
  })
}
const setIsLogin= () =>{
  dispatch({
    type: SET_IS_LOGIN_TRUE
  })
}
const setIsNotLogin= () =>{
  dispatch({
    type: SET_IS_LOGIN_FALSE
  })
}
const setIsAdmin = (bulean) =>{
  dispatch({
type: SET_IS_ADMIN,
payload:bulean
  })
  
}
const setIsModerator = (bulean) =>{
  dispatch({
type: SET_IS_MODERATOR,
payload:bulean
  })
  
}

const setIsSuccessfullySend = (bulean) =>{
  dispatch({
type:SET_FORM_DATA_SUCCESFULLY_SEND,
payload: bulean,
  })
}
  return (

    <AppContext.Provider 
    value= {{
isLoading: state.isLoading,
users: state.users,
orders:state.orders,
categories: state.categories,
currentUser: state.currentUser,
token:state.token,
productToEdit:state.productToEdit,
cartProducts: state.cartProducts,
totalCost:state.totalCost,
numberOfProductsInCart,
isCartOpen:state.isCartOpen,
isSingUp:state.isSingUp,
isLogin:state.isLogin,
isAdmin: state.isAdmin,
isModerator: state.isModerator,
isSuccessfullySend:state.isSuccessfullySend,
setIsLoading,
setToken,
setAllUsers,
setCurrentUser,
emptyCart,
setAllCategories,
setProductToEdit,
addToCart,
actualizeCart,
deleteOfCart,
addToTotalCost,
deleteOfTotalCost,
resetTotalCost,
toggleCart,
setIsSingUp,
setIsNotSingup,
setIsLogin,
setIsNotLogin,
setIsAdmin,
setIsModerator,
setIsSuccessfullySend,
    }}>

          {props.children}

    </AppContext.Provider>

    );

    
}

