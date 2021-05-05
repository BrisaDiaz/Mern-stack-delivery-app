
export default function useCloseSession(setIsNotLogin,closeNav){
  const handleLogout = () =>{
  setIsNotLogin() 
  closeNav()
}

return {handleLogout}
}