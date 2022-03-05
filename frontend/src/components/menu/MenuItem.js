import styled from "styled-components";
import { useState } from "react";
import defaultImage from "../../img/default-image.png";

const Item = styled.article`
  display: flex;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;

  min-width: 250px;
  height: 300px;
  flex-flow: column;
  over-flow: hidden;
  padding: 20px;
  border: 1px solid #00000026;
  box-shadow: 1px 1px 5px #00000057;
`;
const Description = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;
const ProductLink = styled.h3`
text-decoration:none;
margin-bottom:2px;
  color: #272727;
letter-spacing:0;

line-height:35px;
text-transform:capitalize ;
transition: all 0.5s;
  font-family: "Oswald", sans-serif;
  font-size: 25px;
&:hover {
      color: color: rgb(0 0 0 / 50%);
}
`;

const Size = styled.small`
  align-self: flex-start;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
  margin: 8px 10px 0;
`;
const Price = styled.h4`
  align-self: end;
  color: #fcba1c;
  margin: 0;
  &:before {
    content: "$";
  }
`;

const ImgContainer = styled.div`
  height: 150px;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px #ccc;
  background-image: ${(props) =>
    props.isLoaded ? "none" : `url(${defaultImage})`};
  background-repeat: no-repeat;
  background-size: auto 100%;
  backface-visibility: hidden;
  background-position: center;
`;
const Img = styled.img`
  transition: all 0.5s ease;
  height: 100%;
  &:hover {
    transform: scale(0.8);
  }
`;
function MenuItem(props) {
  const item = props.item;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Item data-testid="productItem" key={item._id}>
      <ImgContainer isLoaded={isLoaded}>
        <Img
          src={item?.img}
          onLoad={() => setIsLoaded(true)}
          alt={item.description}
        ></Img>
      </ImgContainer>

      <ProductLink>{item.name}</ProductLink>
      <Description>
        <Price>{item.price}</Price> <Size>{item.size} </Size>{" "}
      </Description>

      {props.children}
    </Item>
  );
}

export default MenuItem;
