import React from 'react';
import { render,  screen ,act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppContext from '../../context/app-context'
import CartContext from '../../context/cart_context/cart-context'
import ShoppingCart from './ShoppingCart'
import login from '../../mocks/login'
import cartProducts from '../../mocks/cartProducts'

const appContextValue ={
isLogin:true,
currentUser:login.user,
setIsLoading:jest.fn()
}

 it('render total const correctly', ()=>{

   render(
<AppContext.Provider value={appContextValue}>
            <CartContext.Provider value={{ cartProducts:[],totalCost:0}}>

                <ShoppingCart />
            </CartContext.Provider>
</AppContext.Provider>
        )

      expect(screen.getByText(/total:/i)).toHaveTextContent(/0$/i)
            expect(screen.getByRole('list')).toBeEmptyDOMElement()
 })


 it('display all the products on cart with correct total cost', ()=>{

   render(
     <AppContext.Provider value={appContextValue}>
            <CartContext.Provider value={{cartProducts,totalCost:1600}}>
                <ShoppingCart />
            </CartContext.Provider>
            </AppContext.Provider>
        )
      expect(screen.getAllByRole('listitem')).toHaveLength(2)
      expect(screen.getByText(/total:/i)).toHaveTextContent(/1600$/i)
 })

 it('trigger reset total cost and empty cart function on click empty button', async ()=>{

      const cartProducts =[{info:{name:'burger',price:500},quantity:1} ,{info:{name:'pizza',price:550},quantity:2}],

    emptyCart=  jest.fn(),
    resetTotalCost=  jest.fn();

render(
       <AppContext.Provider value={appContextValue}>
            <CartContext.Provider value={{cartProducts,totalCost:1600,emptyCart,resetTotalCost}}>
                <ShoppingCart />
            </CartContext.Provider>
            </AppContext.Provider>
        )

          expect(screen.getAllByRole('listitem')).toHaveLength(2)
      expect(screen.getByText(/total:/i)).toHaveTextContent(/1600$/i)

const emptyCartButton = screen.getByRole('button', {
  name: /vaciar carrito/i})

await  act(async() =>userEvent.click(emptyCartButton))

 expect(emptyCart.mock.calls.length).toBe(1)
  expect(resetTotalCost.mock.calls.length).toBe(1)



       expect( await screen.findByText(/total:/i)).toHaveTextContent(/0$/i)



 })