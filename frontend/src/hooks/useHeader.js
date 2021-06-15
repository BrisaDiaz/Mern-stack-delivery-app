import {  useState } from 'react'
import {useStorage} from '../context/useStorage'

export default function useHeader(){
const { numberOfProductsInCart, isLogin,toggleCart,setIsSingUp,setIsNotSingup,isAdmin,isModerator}  = useStorage()

  const [navIsOpened, setNavIsOpened ]= useState(false)



const handelNavClick = () =>{
setNavIsOpened(!navIsOpened)
}

const closeNav = ( ) =>{
  setNavIsOpened(false)
}


const handleLogin = () =>{
  closeNav();
setIsSingUp() ;
  }

  const handleSingUp= () =>{
  closeNav();
setIsNotSingup() ;
  }

return {handelNavClick, closeNav, handleLogin, handleSingUp,navIsOpened,numberOfProductsInCart, isLogin,toggleCart,isAdmin,isModerator}

}