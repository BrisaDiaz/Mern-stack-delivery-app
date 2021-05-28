import styled  from 'styled-components'
import useAddToCartButton from '../../hooks/useAddToCartButton'
import AppContext from '../../context/app-context'
import {  useContext} from 'react'
import {Link} from 'react-router-dom';
import shoopingCartIcon from '../../img/shopping-cart-solid.svg';

const Item = styled.figure `
display:flex;
box-sizing:border-box;
border-radius:5px;
position:relative;
    max-width: 250px;
    min-width: 250px;
height:350px;
flex-flow:column;

over-flow:hidden;
padding:20px;
border: 1px solid #00000026;
box-shadow: 1px 1px 5px #00000057;
`
const Figcaption =styled.div`
display:flex;
align-items:center;
padding-bottom:5px;
`;
const Name =styled.h3`
margin-bottom:0;
letter-spasing:0;
line-height:35px;
text-transform:capitalize ;
transition: all 0.5s;

&:hover {
      color: color: rgb(0 0 0 / 50%);

}
`
const ProductLink = styled(Link)`
text-decoration:none;
margin-bottom:2px;
  color: #272727;
`;
const Size = styled.small`
align-self: flex-start;
    color: rgba(0,0,0,0.8);
    font-weight: 600;
    margin: 10px;
    margin-top: 8px;
`;
const Price = styled.h4 `
    align-self: end;
    color: #fcba1c;
    margin:0;
&:before{
  content:"$";
}
`
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
}

`;
const ImgContainer = styled.div`
height:150px;
width:100%;
overflow:hidden;
positon:relative;
display:flex;
justify-content:center;
margin-bottom:10px;
border-radius:5px;
box-shadow: 0 1px 3px #ccc;
`;
const Img = styled.img`
transition:all 0.5s ease;
height:100%;
&:hover{
  transform:scale(0.8);
}
`;
export const CartIcon = styled.img`
width:20px;
height:20px;
transition: all 05s ease;

`;
export default function MenuItem(props){
  const item = props.item;
  const {cartProducts,addToCart,addToTotalCost}  = useContext(AppContext);
const {handlerAddToCartAndAddToTotalCost,isAdded} = useAddToCartButton(item,cartProducts,addToCart,addToTotalCost)







  return(
  <Item key={item._id}>

<ImgContainer> 

<Img src={item?.img} alt={item.name}></Img>



</ImgContainer>

      <ProductLink to={`/menu/${item._id}`}><Name>{item.name}</Name></ProductLink>  
   <Figcaption><Price >   {item.price}</Price> <Size>{item.size}  </Size>  </Figcaption> 
        
        {  window.location.pathname === "/dashboard/myProducts" ?
          props.children
         :
         <CartButton isAdded={isAdded}
       onClick={ () => {handlerAddToCartAndAddToTotalCost(item,parseInt(item.price))}}><CartIcon style={{  position:'absolute'}} src={shoopingCartIcon} alt="add-to-cart"/></CartButton>
      }
   
      
   </Item>
   );
}
