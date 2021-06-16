import {useStorage} from '../context/useStorage'


export default function useMyProfile(){

  const {currentUser,setIsAdmin,setIsModerator,setToken,setIsNotLogin,emptyCart,resetTotalCost}  = useStorage()


const handleLogout = () =>{
emptyCart()
setIsNotLogin() ;
setToken("");
 setIsAdmin(false);
  setIsModerator(false);
 resetTotalCost()
localStorage.removeItem('userId');

}
  return {handleLogout,currentUser}
}