import styled  from 'styled-components'
import AppContext from '../../context/app-context'
import {  useContext} from 'react'
import {useParams} from 'react-router-dom'
import {CartButton,CartIcon} from '../menu/MenuItem'
import shoopingCartIcon from '../../img/shopping-cart-solid.svg';
import useAddToCartButton from '../../hooks/useAddToCartButton'
const ProductDetails = styled.main`
width:90vw;
    min-height: calc(100vh - 58px);
padding: 20px 15px;
padding-top:58px;
margin:0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
@media screen and (min-width:550px){
 width:70vw;
}
@media screen and (min-width:850px){
 width:50vw;
}
`
const PrductImg = styled.img`
position:relative;
left:50%;
transform:translate(-50%, 0);
max-width:500px;
width:100%;
`;
const Name =styled.h2`
    margin: 10px 0 ;
letter-spasing:0;
line-height:35px;
max-width:200px;
font-size:30px;
text-transform:capitalize ;
@media screen and (min-width:600px){
  font-size:35px;
  margin-bottom: 20px;
  max-width:100%;
}
`
const Line = styled.div`

width:100%;
height:1px;
background:#fcaf01;
margin:5px auto;
`
;
const ThisCartButton =styled(CartButton)`
transform:scale(0.8);
margin-top:-45px;
margin-bottom:10px;
@media screen and (min-width:600px){
margin-top:-50px;
transform:scale(1);
}

`;
const Deltail = styled.p`
line-height:25px;
text-transform:capitalize ;
& > b {
      color: rgb(252 175 1);
          margin-right: 5px;

}
`;
const Description = styled(Deltail)`
text-transform:none;

` 
export default function ProductDetailsPage(){
    const {products,cartProducts,addToCart,addToTotalCost}  = useContext(AppContext);
 const {productId}=  useParams()
 const thisProductInfo = products.find(product => product._id === productId )

const {handlerAddToCartAndAddToTotalCost,isAdded} = useAddToCartButton(thisProductInfo,cartProducts,addToCart,addToTotalCost)
  return(
<ProductDetails>
  <PrductImg src={process.env.PUBLIC_URL +'/uploads/'+thisProductInfo.img}  alt={thisProductInfo.name}/>
    <Line/>
  <Name>{thisProductInfo.name}</Name><ThisCartButton isAdded={isAdded}
       onClick={ () => {handlerAddToCartAndAddToTotalCost(thisProductInfo,parseInt(thisProductInfo.price))}}><CartIcon style={{  position:'absolute'}} src={shoopingCartIcon} alt="add-to-cart"/></ThisCartButton>

    <Line/>
     <Deltail><b>Categoría:</b>{thisProductInfo.category}</Deltail>
   <Deltail><b>Porción:</b>{thisProductInfo.size}</Deltail>
   <Deltail><b>Precio:</b>${thisProductInfo.price}</Deltail>
  <Description><b>Ingredientes:</b>{thisProductInfo.description}</Description>
    
  
</ProductDetails>
  );
}