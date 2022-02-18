import { useHistory } from "react-router-dom";
import { useState } from "react";
import postOrderAPI from "../API/postOrderAPI";
import { useStorage } from "../context/useStorage";
import { useCartStorage } from "../context/cart_context/useCartStorage";

export default function useShoppingCart() {
  const { isLogin, currentUser, token, setIsLoading } = useStorage();
  const {
    cartProducts,
    totalCost,
    emptyCart,
    resetTotalCost,
    isCartOpen,
    toggleCart,
  } = useCartStorage();

  let [isCartLoading, setCartIsLoading] = useState(false);

  const emptyCartAndResetTotalCost = () => {
    emptyCart();
    resetTotalCost();
  };

  const history = useHistory();

  const handelOrder = async () => {
    if (cartProducts.length !== 0) {
      if (!isLogin) return history.push("/authentication/login");

      if (currentUser?.profileState !== "completed")
        return alert(
          "Se require que complete su  perfil en la cuenta para poder realizar la orden"
        );

      const orderSpecifications = cartProducts.map((product) => ({
        productId: product.info._id,
        quantity: product.quantity,
      }));
      setCartIsLoading(true);

      postOrderAPI({
        orderSpecifications,
        token,
        emptyCart,
        resetTotalCost,
        setIsLoading,
        toggleCart,
        history,
        setCartIsLoading,
      });
    }
  };

  return {
    emptyCartAndResetTotalCost,
    handelOrder,
    totalCost,
    isCartOpen,
    cartProducts,
    isCartLoading,
  };
}
