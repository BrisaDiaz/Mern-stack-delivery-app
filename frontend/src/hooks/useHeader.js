import {  useState } from 'react'
import {useStorage} from '../context/useStorage'
import {useCartStorage} from '../context/cart_context/useCartStorage'
export default function useHeader(){
const {  isLogin,isAdmin,isModerator}  = useStorage()
const { toggleCart,numberOfProductsInCart} =useCartStorage()
  const [navIsOpened, setNavIsOpened ]= useState(false)


const handelNavClick = () =>{
setNavIsOpened(!navIsOpened)
}

const closeNav = ( ) =>{
  setNavIsOpened(false)
}




return {handelNavClick, closeNav,navIsOpened,numberOfProductsInCart, isLogin,toggleCart,isAdmin,isModerator}

}