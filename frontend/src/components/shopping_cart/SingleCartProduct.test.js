import React from 'react';
import { render,  screen,act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppContext from '../../context/app-context'
import SingleCartProduct from './SingleCartProduct'
import CartContext from '../../context/cart_context/cart-context'

let deleteOfCart = jest.fn(),
 deleteOfTotalCost= jest.fn(),
  addToTotalCost  = jest.fn(),
actualizeCart= jest.fn()

  let product  = {
 info:{
name:'hot dog',
price:350,
size:'400 gr'
 },
 quantity: 1
  }

 it('render product info correctly', ()=>{


   render(
            <CartContext.Provider value={{deleteOfCart,deleteOfTotalCost}}>
                <SingleCartProduct product={product}/>
            </CartContext.Provider>
        )

   expect(screen.getByText('hot dog')).toBeInTheDocument()
  expect(screen.getByText('350 x 400 gr')).toBeInTheDocument()
  expect(screen.getByTestId('quantity')).toHaveTextContent('1')


 })


 it('trigger deleteOfCart function when click on delete button', ()=>{

   render(
       <AppContext.Provider value={{isLoading:false}}>
            <CartContext.Provider value={{deleteOfCart,deleteOfTotalCost}}>
                <SingleCartProduct product={product}/>
            </CartContext.Provider>
            </AppContext.Provider>
        )

userEvent.click(screen.getByTestId('deleteProduct'))

 expect(deleteOfCart.mock.calls.length).toBe(1)
 expect(deleteOfTotalCost.mock.calls.length).toBe(1)



 })

  it('display correct quantity while clicking increment and decrement', ()=>{

  render(
           <AppContext.Provider value={{isLogin:true}}>
         <CartContext.Provider value={{deleteOfCart,deleteOfTotalCost,addToTotalCost,actualizeCart}}>
                <SingleCartProduct product={product}/>
            </CartContext.Provider>
            </AppContext.Provider>
        )

        const increaseButton= screen.getByRole('button', {
  name: '+'})
       const decreaseButton= screen.getByRole('button', {
  name: /-/})


  expect(screen.getByTestId('quantity')).toHaveTextContent('1')

 userEvent.click(increaseButton)
 userEvent.click(increaseButton)

 expect(addToTotalCost.mock.calls.length).toBe(2)
expect(actualizeCart.mock.calls.length).toBe(2)


  expect(screen.getByTestId('quantity')).toHaveTextContent('3')

 userEvent.click(decreaseButton)

  expect(deleteOfTotalCost.mock.calls.length).toBe(1)
     expect(actualizeCart.mock.calls.length).toBe(3)

  expect(screen.getByTestId('quantity')).toHaveTextContent('2')

   userEvent.click(decreaseButton)

  expect(deleteOfTotalCost.mock.calls.length).toBe(2)
     expect(actualizeCart.mock.calls.length).toBe(4)

       expect(screen.getByTestId('quantity')).toHaveTextContent('1')

          userEvent.click(decreaseButton)

  expect(deleteOfTotalCost.mock.calls.length).toBe(2)
     expect(actualizeCart.mock.calls.length).toBe(4)

  })







