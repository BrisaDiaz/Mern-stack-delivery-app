import styled  from 'styled-components'
import shoopingCartIcon from '../img/shopping-cart-solid.svg';

export const CartButton = styled.button`
margin-left:auto;
margin-top:auto;
box-shadow: ${props=> props.theme.lightBoxShadow};
padding:20px 0;
width:50px;
display:flex;
justify-content:center;
align-items:center;
background: ${(props) => props.isAdded  ? props.theme.darckYellow :  props.theme.black}  ;
outline:none;
border:none;
border-radius: 4px;
font-weight:600;
cursor:pointer;
font-size:20px;
color:#fff;
transition: all 0.3s ease;
&:hover{

  background:${props => props.theme.darckYellow};
}`
export const CartIcon = styled.img`
width:20px;
height:20px;
transition: all 05s ease;

`;
export default function AddToCartButton({isAdded,onClick}){

  return(
           <CartButton isAdded={isAdded} onClick={ ()=> onClick()}>
         <CartIcon style={{  position:'absolute'}} src={shoopingCartIcon} alt="add-to-cart"/>
       </CartButton>
  );
}