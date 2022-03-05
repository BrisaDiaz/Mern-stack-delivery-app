import { useStorage } from "../context/useStorage";
import { useCartStorage } from "../context/cart_context/useCartStorage";
import logoutAPI from "../API/logoutAPI";
export default function useMyProfile() {
  const { currentUser, setIsAdmin, setIsModerator, setToken, setIsNotLogin } =
    useStorage();
  const { resetTotalCost, emptyCart } = useCartStorage();
  const onSuccess = () => {
    emptyCart();
    setIsNotLogin();
    setToken("");
    setIsAdmin(false);
    setIsModerator(false);
    resetTotalCost();
  };
  const onError = () => {
    window.alert(
      "Lo siento, hubo un error en el servidor y la sesion no pudo cerrarse"
    );
  };
  const handleLogout = async () => {
    await logoutAPI(onSuccess, onError);
  };
  return { handleLogout, currentUser };
}
