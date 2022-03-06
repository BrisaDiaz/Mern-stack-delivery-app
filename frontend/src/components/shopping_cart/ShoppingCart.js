import styled from "styled-components";

import SingleCartProduct from "./SingleCartProduct";
import useShoppingCart from "../../hooks/useShoppingCart";
import { LoaderSpinner } from "./../LoaderSpinner";

const StyledCart = styled.aside`
  position: fixed;
  z-index: 1000;
  right: 0;
  top: 58px;
  width: 300px;
  min-height: max-content;
  max-height: 100vh;
  max-width: 100vh;
  right: ${(props) => (props.isCartOpen === true ? "0" : "-100vw")};
  transition: all 0.5s;
  margin: 0 auto;
  padding: 10px 0 16px;
  background: #fff;
  border-radius: 0 0 15px 15px;
  box-shadow: 1px 3px 5px #00000057;
`;
const CartHeader = styled.div`
  text-align: center;
  color: #ffa500;
`;
const CartTitle = styled.h2`
  text-shadow: ${(props) => props.theme.lightTextShadow};

  margin-bottom: 10px;
  color: ${(props) => props.theme.darkYellow};
  font-size: 40px;
`;
const CartProductsList = styled.ul`
  list-style: none;
  overflow-y: scroll;
  min-height: max-content;
  max-height: 160px;
  padding-bottom: 1rem;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;
const DeleteAllButton = styled.button`
  position: relative;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
  color: #fff;
  border: none;
  margin: 10px 0;
  border-radius: 15px;
  background: ${(props) => props.theme.black};
  box-shadow: inset 0 0 13px 0 #0000006e;
  font-family: "Oswald", sans-serif;
  font-size: 19px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.04);
  }
`;
const MakeOrderButton = styled(DeleteAllButton)`
margin: 10px 15px 0 0;
background:${(props) => props.theme.darkYellow};
    color: :${(props) => props.theme.black};
  `;
const CartResume = styled.div`
  margin: 10px 0;
  padding: 0 15px 0 15px;
  display: flex;
  gap: 10px;
  flex-flow: column;
  align-items: center;
  & > * {
    margin: 0;
  }
`;

export default function ShoppingCart() {
  const {
    emptyCartAndResetTotalCost,
    handelOrder,
    totalCost,
    isCartOpen,
    cartProducts,
    isCartLoading,
  } = useShoppingCart();

  return (
    <StyledCart isCartOpen={isCartOpen}>
      <CartHeader>
        <CartTitle>Mi carrito</CartTitle>
      </CartHeader>

      {cartProducts?.length > 0 ? (
        <CartProductsList>
          {cartProducts.map((product, index) => (
            <SingleCartProduct
              key={index}
              product={product}
            ></SingleCartProduct>
          ))}
        </CartProductsList>
      ) : null}

      <CartResume>
        <h2>Total: ${totalCost}</h2>

        {isCartLoading ? (
          <LoaderSpinner data-testid="spinner" small />
        ) : (
          <>
            <MakeOrderButton onClick={handelOrder}>Ordenar</MakeOrderButton>

            <DeleteAllButton onClick={emptyCartAndResetTotalCost}>
              Vaciar Carrito
            </DeleteAllButton>
          </>
        )}
      </CartResume>
    </StyledCart>
  );
}
