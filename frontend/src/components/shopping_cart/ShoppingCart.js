import styled  from 'styled-components';
import SingleCartProduct from './SingleCartProduct';
import useShoppingCart from '../../hooks/useShoppingCart'
import {useContext} from 'react';
import AppContext from '../../context/app-context'
import {ButtonPrimary} from '../Buttons';

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
    box-shadow: -2px 2px 8px #00000024;

  `;
  const CartHeader = styled.div`
  text-align:center;
  color: #ffa500;
  `
  const CartTitle = styled.h2`
  text-shadow: 1px 1px 0px #000;
  padding-top: 20px ;
  `;
  const CartProductsList = styled.ul `
   list-style:none;
overflow-y:scroll;
  min-height:max-content;
  max-height:160px;

  `
    const DeleteAllButton = styled(ButtonPrimary)`
        box-shadow: none;
position:relative;
padding:10px;
color:#000;
margin: 10px 0;
border-radius:15px;
background:transparent;
border:2px solid #ffa500;
&:hover{
  background:#ffa500;
}
  `;
      const MakeOrdenButton = styled(DeleteAllButton)`

margin: 10px 15px 0 0;
transition: all 0.5s ease;
background:#ffa500;
&:hover{
  transform:scale(1.08);
}
  `;
      const CartResume = styled.div`
margin:10px 0;
padding: 0 15px 25px 15px;
display:flex;
flex-flow:column;
align-items:center;

  `;



export default  function ShooppingCart(props) {

const {totalCost,emptyCart,resetTotalCost,isCartOpen,isLogin}  = useContext(AppContext);
let {cartProducts} = useContext(AppContext);
const {emptyCartAndResetTotalCost,handelOrden} = useShoppingCart(
  emptyCart,resetTotalCost,isLogin,cartProducts)




  return(

    <StyledCart isCartOpen={isCartOpen}>
      <CartHeader>
             <CartTitle>Mi carrito</CartTitle>
      </CartHeader>
      
      <CartProductsList>
            {cartProducts.map( (product)=>  

      
       
           <SingleCartProduct 
         key={product._id}
           ThisProduct={product}>  
      
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