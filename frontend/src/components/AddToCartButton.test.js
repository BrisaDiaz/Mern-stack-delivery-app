
import React from 'react';
import '@testing-library/jest-dom'
import { render,  screen,act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddToCartButton from './AddToCartButton'
import CartContext from './../context/cart_context/cart-context'



const cartProducts=[
  {
  info:{
    _id:15,
    name:'pizza',
  },
  quantity: 2
}
]
const addedItem = {_id:15, name:'pizza'};
const notAddedItem = {_id:18, name:'burger',price:500};
const addToTotalCost = jest.fn()
const addToCart = jest.fn()



it('has yellow background when product is already in cart',() =>{

  render(
    <CartContext.Provider value={{cartProducts,addToTotalCost,addToCart}} >
      <AddToCartButton thisProductInfo={addedItem}/>
    </CartContext.Provider>
  )

  expect(screen.getByRole('button')).toHaveStyle('background:','#fcaf01')

})



it('has black background when product is not in cart',() =>{

render(
    <CartContext.Provider value={{cartProducts,addToTotalCost,addToCart}} >
      <AddToCartButton thisProductInfo={notAddedItem}/>
    </CartContext.Provider>
  )

  expect(screen.getByRole('button')).toHaveStyle('background:','#272727')

})

it('adds product to cart and add the price to total cost on click', async() =>{


  render(
    <CartContext.Provider value={{cartProducts,addToTotalCost,addToCart}} >
      <AddToCartButton thisProductInfo={notAddedItem}>
      </AddToCartButton>
    </CartContext.Provider>
  )

    expect(screen.getByRole('button')).toHaveStyle('background:','#272727')

await act(async()=>userEvent.click(screen.getByRole('button')) )

  expect(screen.getByRole('button')).toHaveStyle('background:','#fcaf01')




})

