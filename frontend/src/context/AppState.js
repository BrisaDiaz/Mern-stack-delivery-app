import  {useReducer,useEffect} from 'react';
import AppContext from  './app-context';
import appReducer from  './app-reducer';
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
SET_IS_SING_UP_FALSE,
SET_IS_LOGIN_TRUE,
SET_IS_LOGIN_FALSE,
SET_IS_ADMIN,
SET_IS_MODERATOR,
SET_MENU_SEARCH_QUERY,
SET_ADMIN_SEARCH_QUERY,
SET_MENU_SORT_PREFERENCE,
SET_PRODUCT_STATE_FILTER_PREFERENCE

} from './app-actions'







export default  function AppState(props) {
  
   const getProducts = async() =>{
    try{

const res = await fetch('/api/products');
  const data = await res.json()


setAllProducts(data)
setIsLoading(false)
    }catch(err){
      getProducts()

    }

  }


  async function deleteProduct(token,id){
     const headers = new Headers();
        headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


        const setting = {
          method: 'DELETE',
          headers: headers,

        }

const deleteConfirmation = window.confirm('El producto será eliminado de la base de datos ¿Esta seguro? ');

if(deleteConfirmation){
try {
        let res = await fetch("/api/products/"+id, setting);
  
getProducts()
      } catch (err) {

        console.log(err)
      }

}else{
  return
}
  

  }

  async function updateProduct(
    token,
    e,
    id,
    nameValue,
categoryValue,
sizeValue,
descriptionValue,
priceValue){
     const formData = new FormData()
      let active =  e.target.state.checked ? true : false ;


          formData.append('img',e.target.img.files[0])
        formData.append('name', nameValue)
        formData.append('category', categoryValue)
        formData.append('size', sizeValue)
        formData.append('description', descriptionValue)
        formData.append('price', priceValue)
        formData.append('active', active)

       
   
      
        const headers = new Headers();
        headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


        const setting = {
          method: 'PUT',
          headers: headers,
          body: formData,
        }

let url =`/api/products/${id}`
  try {
        let res = await fetch(url , setting);
      console.log(res)
      getProducts()

      } catch (err) {

        console.log(err)
      }
  }
  async function createNewProduct(token,e){
      const formData = new FormData()
let active =  e.target.state.checked ? true : false ;

        formData.append('img', e.target.img?.files[0])
        formData.append('name', e.target.name.value)
        formData.append('category', e.target.category.value)
        formData.append('size', e.target.size.value)
        formData.append('description', e.target.description.value)
        formData.append('price', e.target.price.value)
        formData.append('active', active)
      
       const headers = new Headers();
        headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);

console.log(token)
        const setting = {
          method: 'POST',
                  body: formData,
          headers: headers,

        }


  try {
        let res = await fetch("/api/products", setting);
        let json =  await res.json()

        if(res.status === 200){
getProducts()
e.target.reset()
        }     
      
      } catch (err) {

        console.log(err)
      }
  }

 

  
  
    useEffect( ()=>{
  
getProducts()

  },[ ])








const initialState =  {
products:[],
users:[],
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
const addToCart = (product) =>{
    dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload : product,
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
  return (

    <AppContext.Provider 
    value= {{
isLoading: state.isLoading,
products: state.products,
users: state.users,
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
createNewProduct,
setIsLoading,
setToken,
getProducts,
setAllUsers,
setCurrentUser,
updateProduct,
emptyCart,
setProductToEdit,
addToCart,
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
deleteProduct,
setMenuSearchQuery,
setAdminSearchQuery,
setMenuSortPreference,
setFilterProductStatePreference
    }}>

          {props.children}

    </AppContext.Provider>

    );

    
}

