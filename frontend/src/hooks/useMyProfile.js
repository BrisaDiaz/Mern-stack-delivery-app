import {useStorage} from '../context/useStorage'


export default function useMyProfile(){

  const {currentUser,setIsAdmin,setToken,setIsNotLogin,emptyCart,resetTotalCost}  = useStorage()


const handleLogout = () =>{
emptyCart()
setIsNotLogin() ;
setToken("");
 setIsAdmin(false);
 resetTotalCost()
localStorage.removeItem('userId');

}
  return {handleLogout,currentUser}
}