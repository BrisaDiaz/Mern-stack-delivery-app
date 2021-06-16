import {  useState } from 'react'
import {useStorage} from '../context/useStorage'

export default function useHeader(){
const { numberOfProductsInCart, isLogin,toggleCart,isAdmin,isModerator}  = useStorage()

  const [navIsOpened, setNavIsOpened ]= useState(false)



const handelNavClick = () =>{
setNavIsOpened(!navIsOpened)
}

const closeNav = ( ) =>{
  setNavIsOpened(false)
}




return {handelNavClick, closeNav,navIsOpened,numberOfProductsInCart, isLogin,toggleCart,isAdmin,isModerator}

}