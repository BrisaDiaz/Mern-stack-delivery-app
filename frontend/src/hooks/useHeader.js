import {  useState } from 'react'

export default function useHeader({setIsSingUp,setIsNotSingup}){

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

return {handelNavClick, closeNav, handleLogin, handleSingUp,navIsOpened}

}