import styled  from 'styled-components';
import SingleCartProduct from './SingleCartProduct';
import useShoppingCart from '../../hooks/useShoppingCart'
import {useContext} from 'react';
import AppContext from '../../context/app-context'

  const StyledCart = styled.article`
  position:fixed;

z-index:1000;
  right:0;
  top:58px;
  width: 300px;
  min-height:max-content;
  max-height:100vh;
  max-width:100vh;
right: ${(props) =>(props.isCartOpen === true  ? "0" : "-100vw")};

transition: all 0.5s ;

  margin: 0 auto;
  background:#fff;
    border-radius: 0 0 15px 15px;
    box-shadow: :${props => props.theme.lightBoxShadow};

  `;
  const CartHeader = styled.div`
  text-align:center;
  color: #ffa500;
  `
  const CartTitle = styled.h2`
  text-shadow: ${props => props.theme.lightTextShadow};
  padding-top: 10px ;
    margin-bottom: 10px ;
color: #fcba1c;
  `;
  const CartProductsList = styled.ul `
   list-style:none;
overflow-y:scroll;
  min-height:max-content;
  max-height:160px;

  `
    const DeleteAllButton = styled.button`
    position: relative;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
    color: #fff;
    border: none;
    margin: 10px 0;
    border-radius: 15px;
    background:${props => props.theme.black};
    box-shadow: inset 0 0 13px 0 #0000006e;
    font-family: "Oswald",sans-serif;
    font-size: 19px;
    transition: all 0.5s ease;
    &:hover{
  transform:scale(1.04);
}
  `;
      const MakeOrdenButton = styled(DeleteAllButton)`
margin: 10px 15px 0 0;
background:${props => props.theme.darckYellow};
    color: :${props => props.theme.black};
  `;
      const CartResume = styled.div`
margin:10px 0;
padding: 0 15px 25px 15px;
display:flex;
flex-flow:column;
align-items:center;

  `;



export default   function ShooppingCart() {

let {cartProducts,totalCost,emptyCart,resetTotalCost,isCartOpen,isLogin,currentUser,setCurrentUser,token,setAllOrders,setIsLoading,toggleCart}  = useContext(AppContext)

const {emptyCartAndResetTotalCost,handelOrden} = useShoppingCart(
{  emptyCart,resetTotalCost,isLogin,cartProducts,currentUser,setCurrentUser,token,setAllOrders,setIsLoading,toggleCart})


  return(

    <StyledCart isCartOpen={isCartOpen}>
      <CartHeader>
             <CartTitle>Mi carrito</CartTitle>
      </CartHeader>
      
      <CartProductsList>
            {cartProducts.map( (product)=>  

      
       
           <SingleCartProduct 
         key={product.info._id}
          product={product}>  
      
      </SingleCartProduct>
         
          )}
</CartProductsList>
<CartResume>
       <h2>Total: ${totalCost}</h2>
              <MakeOrdenButton onClick={handelOrden}>Ordenar</MakeOrdenButton>
              <DeleteAllButton onClick={emptyCartAndResetTotalCost} >Vaciar Carrito</DeleteAllButton>
</CartResume>
        
  </StyledCart>

  );



}