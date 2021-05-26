import  {useReducer,useEffect} from 'react';
import AppContext from  './app-context';
import appReducer from  './app-reducer';
import {
  SET_IS_LOADING,
  SET_ALL_PRODUCTS,
  SET_ALL_USERS,
  SET_ALL_ORDERS,
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
SET_MENU_SEARCH_QUERY,
SET_ADMIN_SEARCH_QUERY,
SET_MENU_SORT_PREFERENCE,
SET_PRODUCT_STATE_FILTER_PREFERENCE,
SET_FORM_DATA_SUCCESFULLY_SEND
} from './app-actions'







export default  function AppState(props) {



 const productsAPI = async() =>{
    try{

const res = await fetch('/api/products');
  const data = await res.json()


setAllProducts(data)
setIsLoading(false)


    }catch(err){
      productsAPI()

console.log(err)
    }

  }

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


}catch(err){
getCategoriesAPI()

  console.log(err)
}
}  


  
    useEffect( ()=>{
  
productsAPI()
getCategoriesAPI()
  },[])








const initialState =  {
products:[],
users:[],
categories:[],
orders:[],
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
menuSearchQuery:"",
adminSearchQuery:"",
menuSortPreference:"default",
productStateFilterPreference:"default",
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
const setAllProducts = (data) =>{
  dispatch({
    type: SET_ALL_PRODUCTS,
    payload: data
  })
}
const setAllUsers = (data)=>{
  dispatch({
    type: SET_ALL_USERS,
    payload: data
  })
}
const setAllOrders = (data)=>{
  dispatch({
    type: SET_ALL_ORDERS,
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

const setMenuSearchQuery = (query) =>{
dispatch({
  type: SET_MENU_SEARCH_QUERY,
  payload: query
})
}
const setAdminSearchQuery = (query) =>{
dispatch({
  type: SET_ADMIN_SEARCH_QUERY,
  payload: query
})
}
const setMenuSortPreference= (preference) =>{
dispatch({
  type: SET_MENU_SORT_PREFERENCE,
  payload: preference
})
}
const setFilterProductStatePreference= (preference) =>{
dispatch({
  type: SET_PRODUCT_STATE_FILTER_PREFERENCE,
  payload: preference
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
products: state.products,
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
menuSearchQuery:state.menuSearchQuery,
adminSearchQuery: state.adminSearchQuery,
menuSortPreference : state.menuSortPreference,
productStateFilterPreference: state.productStateFilterPreference,
isSuccessfullySend:state.isSuccessfullySend,
setIsLoading,
setToken,
productsAPI,
setAllUsers,
setAllOrders,
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
setMenuSearchQuery,
setAdminSearchQuery,
setMenuSortPreference,
setFilterProductStatePreference,
setIsSuccessfullySend,
    }}>

          {props.children}

    </AppContext.Provider>

    );

    
}

