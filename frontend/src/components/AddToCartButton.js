import styled from "styled-components";
import useAddToCartButton from "../hooks/useAddToCartButton";
import shoppingCartIcon from "../img/shopping-cart-solid.svg";

export const CartButton = styled.button`
  position: relative;
  margin-left: auto;
  margin-top: auto;
  box-shadow: ${(props) => props.theme.lightBoxShadow};
  padding: 20px 0;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isAdded ? props.theme.darkYellow : props.theme.black};
  outline: none;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  transition: all 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.darkYellow};
  }
`;
export const CartIcon = styled.img`
  width: 20px;
  height: 20px;
  transition: all 05s ease;
`;
export default function AddToCartButton({ thisProductInfo }) {
  const { handlerAddToCartAndAddToTotalCost, isAdded } =
    useAddToCartButton(thisProductInfo);

  return (
    <CartButton
      isAdded={isAdded}
      onClick={() =>
        handlerAddToCartAndAddToTotalCost(
          thisProductInfo,
          parseInt(thisProductInfo?.price)
        )
      }
    >
      <CartIcon
        style={{ position: "absolute" }}
        src={shoppingCartIcon}
        alt="add-to-cart"
      />
    </CartButton>
  );
}
