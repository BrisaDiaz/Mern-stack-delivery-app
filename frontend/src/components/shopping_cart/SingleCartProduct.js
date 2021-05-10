
import styled  from 'styled-components'
import useCartProductQuantityCounter from '../../hooks/useCartProductQuantityCounter'
import useCartProductDeleteButton from '../../hooks/useCartProductDeleteButton'
import DeleteIcone from '../../img/trash-alt-regular.svg'
import {  useContext } from 'react'
import AppContext from '../../context/app-context'

const StyledSingleCartProduct= styled.li`
display :flex;
flex-flow:column;
list-style:none;
padding: 10px 5px 10px;

`;
const ProductHeader= styled.div`
padding: 0 5px;
display :flex;
align-items:center;

`;
const ProductInfo = styled.div`
display :flex;
flex-flow:column;
margin: 0 5px;
`
const PoductName = styled.h4`
font-size: 25px;
line-height:25px;

margin: 0;
margin-bottom:5px;

letter-spacing:0;
`;
const Price = styled.small `
margin: 0 5px;

font-weight:600;
&:before{
  content:"$";
}
`
const TotalPrice = styled.h4`
margin:0;
margin-left:  10px;
color:#fcba1c;
&:before{
  content:"$";
}
`
const IncreaseButton = styled.button`
margin: 0 2px;
padding: 0 5px;
background:#e83c2e;
outline:none;
border:none;
border-radius: 4px;
font-weight:600;
cursor:pointer;
transform:scale(0.8);
font-size:20px;
color:#fff;
transition: all 0.3s ease;
box-shadow: 0 0 3px #e83c2e;
&:hover{
opacity:0.8;
}
`;
const DeleteProductButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
min-width:35px;
min-height:30px;
transform:scale(0.65);
border-radius:50%;
cursor:pointer;
background: #e83c2e;
margin-bottom: 10px;
margin-left:5px;
box-shadow:0 0 5px #e83c2e;
transition:all 0.5s ease;



&:hover{
  transform:rotate(90deg);
    transform :scale(0.8);
}


`;
const DeleteProductIcone = styled.img`
width:30px;
transform:scale(0.6);
`
const DecreaseButton = styled(IncreaseButton)`
background: #e83c2e;
padding: 0 7px;
`;
const Counter = styled.div`
displey:flex;
flex-flow:column;
min-width:85px;
margin-left: auto;
`;
const ProductControls = styled.div`
margin-left: auto;
margin-top: 15px;
position:relative:
right:0;

`;
const Quantity = styled.span`
background: rgba(250,250,250,0.8);
padding:1px 8px;
border: 1px solid rgba(0,0,0,0.8);
border-radius: 5px;
`
export default function SingleCartProduct({ThisProduct}) {


 const {deleteOfCart, addToTotalCost,deleteOfTotalCost}  = useContext(AppContext);

const {quantity,increaseQuantityAndActualizeTotalCost,decreaseQuantityAndActualizeTotalCost} = useCartProductQuantityCounter(addToTotalCost ,deleteOfTotalCost,ThisProduct.price)

const {deleteOfCartAndTotalCostHandler} = useCartProductDeleteButton(deleteOfCart,deleteOfTotalCost)






  return(
   
  <StyledSingleCartProduct >

       <ProductHeader>
             <DeleteProductButton onClick={ ()=> 
              deleteOfCartAndTotalCostHandler(ThisProduct._id,quantity*ThisProduct.price)}>
               <DeleteProductIcone src={DeleteIcone} alt="delete-of-cart"/>
                </DeleteProductButton>
<ProductInfo>  
  <PoductName>{ThisProduct.name}  </PoductName>   <Price >{ThisProduct.price} x {ThisProduct.size}</Price>
  </ProductInfo>
    <ProductControls>
                    <Counter>
              
             <DecreaseButton onClick={() => decreaseQuantityAndActualizeTotalCost()}>-</DecreaseButton>
             <Quantity>{quantity}</Quantity>
             <IncreaseButton onClick={() =>increaseQuantityAndActualizeTotalCost()}>+
             </IncreaseButton>
      </Counter>
             <TotalPrice>{quantity*ThisProduct.price }</TotalPrice>
       </ProductControls>
    </ProductHeader>
       
  
 
 
  </StyledSingleCartProduct>
)
}