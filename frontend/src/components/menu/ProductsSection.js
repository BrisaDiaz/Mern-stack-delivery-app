import styled from "styled-components";
import Item from "./MenuItem";
import AddToCartButton from "../AddToCartButton";

export const ProductsSection = styled.div`
  &:before {
    display: ${(props) => (props.isLoading ? "block" : "none")};
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff57;
    z-index: 400;
  }
  width: 100%;
  gap: 30px;
  display: grid;
  padding: 0 15px 30px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
`;
export const NotFoundMessage = styled.h4`
display:block;
width:100%;
margin 20px 0;
text-align:center;
padding: 0 10px;
`;

export default function ProductsSectionComponent({ isLoading, products }) {
  return (
    <ProductsSection>
      {!isLoading && products?.length === 0 ? (
        <NotFoundMessage>
          No se han encontrado coincidencias, intenta de nuevo!!
        </NotFoundMessage>
      ) : (
        products?.map((product) => (
          <Item data-testid="productItem" key={product._id} item={product}>
            <AddToCartButton thisProductInfo={product} />
          </Item>
        ))
      )}
    </ProductsSection>
  );
}
