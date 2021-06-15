
import styled  from 'styled-components'
import useSingleCartProduct from '../../hooks/useSingleCartProduct'
import DeleteIcone from '../../img/trash-alt-regular.svg'


const StyledSingleCartProduct= styled.li`
display :flex;
flex-flow:column;
list-style:none;
padding: 10px 5px 0;

`;
const ProductHeader= styled.div`
padding: 0 5px;
display :flex;
align-items:center;
    align-items: flex-start;
`;
const ProductInfo = styled.div`
display :flex;
flex-flow:column;
margin: 0 5px;
`
const PoductName = styled.h4`
font-size: 25px;
line-height:30px;

margin: 0;
margin-bottom:5px;

letter-spacing:0;
`;
const Price = styled.small `
margin-left: 0;
font-weight:600;
&:before{
  content:"$";
}
`
const TotalPrice = styled.h4`
margin:0;
margin-left:  10px;
    text-align: left;
color:${props => props.theme.darckYellow};
&:before{
  content:"$";
}
`
const IncreaseButton = styled.button`
margin: 0 2px;
padding: 0 5px;
background:${props => props.theme.orange};
outline:none;
border:none;
border-radius: 4px;
font-weight:600;
cursor:pointer;
transform:scale(0.8);
font-size:20px;
color:#fff;
transition: all 0.3s ease;
box-shadow: :${props => props.theme.lightBoxShadow};
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
transform:scale(0.55);
border-radius:50%;
cursor:pointer;
background: ${props => props.theme.orange};
margin-top: 5px;
margin-left:5px;
box-shadow:inset 0 0 4px rgb(0 0 0 / 50%);
transition:all 0.5s ease;



&:hover{
  transform:rotate(90deg);
    transform :scale(0.65);
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
margin-top: -8px;
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
export default function SingleCartProduct({product}) {


const  { deleteOfCartAndTotalCostHandler,quantity,increaseQuantityAndActualizeTotalCost,decreaseQuantityAndActualizeTotalCost}= useSingleCartProduct(product)


  return(
   
  <StyledSingleCartProduct >

       <ProductHeader>
             <DeleteProductButton data-testid='deleteProduct' onClick={ ()=> 
              deleteOfCartAndTotalCostHandler(product.info._id,quantity*product.info.price)}>
               <DeleteProductIcone src={DeleteIcone} alt="delete-of-cart"/>
                </DeleteProductButton>
<ProductInfo>  
  <PoductName>{product.info.name}  </PoductName>   <Price >{product.info.price} x {product.info.size}</Price>
  </ProductInfo>
    <ProductControls>
                    <Counter>
              
             <DecreaseButton onClick={() => decreaseQuantityAndActualizeTotalCost()}>-</DecreaseButton>
             <Quantity data-testid='quantity'>{quantity}</Quantity>
             <IncreaseButton onClick={() =>increaseQuantityAndActualizeTotalCost()}>+
             </IncreaseButton>
      </Counter>
             <TotalPrice >{quantity*product.info.price }</TotalPrice>
       </ProductControls>
    </ProductHeader>
       
  
 
 
  </StyledSingleCartProduct>
)
}