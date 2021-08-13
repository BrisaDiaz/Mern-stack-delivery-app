import { useStorage } from "../context/useStorage";
import { useCartStorage } from "../context/cart_context/useCartStorage";
import logoutAPI from "../API/logoutAPI";
export default function useMyProfile() {
  const { currentUser, setIsAdmin, setIsModerator, setToken, setIsNotLogin } =
    useStorage();
  const { resetTotalCost, emptyCart } = useCartStorage();

  const handleLogout = async () => {
    await logoutAPI();
    emptyCart();
    setIsNotLogin();
    setToken("");
    setIsAdmin(false);
    setIsModerator(false);
    resetTotalCost();
    localStorage.removeItem("userId");
  };
  return { handleLogout, currentUser };
}
