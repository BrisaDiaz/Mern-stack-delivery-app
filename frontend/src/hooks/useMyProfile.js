import { useStorage } from "../context/useStorage";
import { useCartStorage } from "../context/cart_context/useCartStorage";

export default function useMyProfile() {
  const { currentUser, setIsAdmin, setIsModerator, setToken, setIsNotLogin } =
    useStorage();
  const { resetTotalCost, emptyCart } = useCartStorage();

  const handleLogout = () => {
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
