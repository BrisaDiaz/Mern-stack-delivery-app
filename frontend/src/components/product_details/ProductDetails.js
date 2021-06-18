import styled, {keyframes}  from 'styled-components'
import useProductDetails from '../../hooks/useProductDetails'
import {StyledLink } from '../Header'
import defaultImage from '../../img/default-image.png';
import AddToCartButton from '../AddToCartButton'

export const bounceLeft = keyframes `
  0% { left:15px;}
  50% { left:20px;}
   100% { left:15px;}
`
export const GoBackLink = styled(StyledLink)`
position:absolute;
left:15px;
margin: 0 ;
font-size:15px;
padding: 10px 0;
z-index:800;
  animation: ${bounceLeft} 1.2s linear infinite;
&:before{
  content : "<-- ";
  margin-right:3px;
}
`;
const ProductDetails = styled.section`
    width: 90vw;
    padding: 60px 15px 20px;
    margin: 0px auto;
    display: flex;
  height: 100%;
max-height: 800px;
    flex-direction: column;
    justify-content: flex-start;
@media screen and (min-width:550px){
 width:70vw;
}
@media screen and (min-width:850px){
width: 70vw;
}

@media screen and (min-width:1200px){

    height: 100%;
    max-height: 800px;
}
& >button {
transform:scale(0.8);
margin-top:-45px;
margin-bottom:10px;
@media screen and (min-width:600px){
margin-top:-50px;
transform:scale(1);
}
`
const PrductImg = styled.img`
position:relative;
left:50%;
transform:translate(-50%, 0);
   height: 100%;
    max-width: 90%;
    max-height: 250px;
@media screen and (min-width:500px){
 max-height: 350px;
max-width: 350px;
}
`;
const ImageWrapper =styled.div`
padding-top:40px;
    min-height: 300px;
  background-image: ${props => props.isLoaded ? 'none' : `url(${defaultImage})`};
      background-repeat: no-repeat;
    background-size: 100% auto;
    backface-visibility: hidden;
    background-position: center;
   @media screen and (min-width:400px){
background-size: auto 100%;
    }
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



const Deltail = styled.dd`
line-height:25px;
text-transform:capitalize ;
`;
const Leyend= styled.dt`
color: ${props => props.theme.darckYellow};
line-height:25px;
text-transform:capitalize ;
    float: left;
`;
const Description = styled(Deltail)`
text-transform:none;

` 
function ProductDetailsPage(){




const {isInShoppingCart,isLoaded,thisProductInfo,goBackPath,setIsLoaded,isLoading} = 
useProductDetails()



  return(
(isLoading) ? null : 
<ProductDetails >
    
             <GoBackLink to={goBackPath} > Regresar</GoBackLink>
<ImageWrapper  isLoaded={isLoaded}>
  <PrductImg src={thisProductInfo?.img}  alt={thisProductInfo?.name} onLoad={()=> setIsLoaded(true)} />
  </ImageWrapper>
    <Line/>
  <Name>{thisProductInfo?.name}</Name>
  {(!isInShoppingCart) ? 
   <AddToCartButton thisProductInfo={thisProductInfo}/>
        : null
}
    <Line/>
    <dl>
    <Leyend>Categoría:</Leyend> <Deltail>{thisProductInfo?.category}</Deltail>
<Leyend>Porción:</Leyend> <Deltail>{thisProductInfo?.size}</Deltail>
<Leyend>Precio:</Leyend> <Deltail>${thisProductInfo?.price}</Deltail>
 <Leyend>Descripción:</Leyend> <Description>{thisProductInfo?.description}</Description>
    </dl>
  
</ProductDetails>
  );
}

export default ProductDetailsPage