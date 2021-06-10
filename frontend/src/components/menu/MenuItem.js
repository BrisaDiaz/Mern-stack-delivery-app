import styled  from 'styled-components'
import useAddToCartButton from '../../hooks/useAddToCartButton'
import AppContext from '../../context/app-context'
import { useState, useContext} from 'react'
import {useHistory,useLocation} from 'react-router-dom';
import shoopingCartIcon from '../../img/shopping-cart-solid.svg';
import defaultImage from '../../img/default-image.png';


const Item = styled.figure `
display:flex;
box-sizing:border-box;
border-radius:5px;
position:relative;

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
const ProductLink =styled.h3`
text-decoration:none;
margin-bottom:2px;
  color: #272727;
letter-spasing:0;
cursor:pointer;
line-height:35px;
text-transform:capitalize ;
transition: all 0.5s;
  font-family: "Oswald", sans-serif;
  font-size: 25px;
&:hover {
      color: color: rgb(0 0 0 / 50%);

}
`

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
    background-image: ${props => props.isLoaded ? 'none' : `url(${defaultImage})`};
    background-repeat: no-repeat;
    background-size: auto 100%;
    backface-visibility: hidden;
    background-position: center;
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
export default function MenuItem({props}){
  let history = useHistory()
 let location = useLocation()
  const item = props.item;
  const [isLoaded,setIsLoaded] = useState(false)
  const {cartProducts,addToCart,addToTotalCost}  = useContext(AppContext);
const {handlerAddToCartAndAddToTotalCost,isAdded} = useAddToCartButton(item,cartProducts,addToCart,addToTotalCost)

let isInDashboard = location.pathname === "/dashboard/myProducts"? true : false ;

const handleRedirect = (id) =>{
  return  history.push({
  pathname: '/menu/'+id,
  search: '?from='+location.pathname,

})
}





  return(
  <Item key={item._id}>

<ImgContainer isLoaded={isLoaded}> 

<Img src={item?.img} onLoad={()=> setIsLoaded(true)} alt={item.name}></Img>



</ImgContainer>

      <ProductLink onClick={ () => handleRedirect(item._id)}>{item.name}</ProductLink>  
   <Figcaption><Price >{item.price}</Price> <Size>{item.size}  </Size>  </Figcaption> 
        
        { ( isInDashboard) ?
          props.children
         :
         <CartButton isAdded={isAdded}
       onClick={ () => {handlerAddToCartAndAddToTotalCost(item,parseInt(item.price))}}><CartIcon style={{  position:'absolute'}} src={shoopingCartIcon} alt="add-to-cart"/></CartButton>
      }
   
      
   </Item>
   );
}
