import React from 'react';
import { render,  screen ,act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from "react-router-dom";
import AppContext from '../../context/app-context'
import ShoppingCart from './ShoppingCart'




 it('render total const correctly', ()=>{

   render(
            <AppContext.Provider value={{ cartProducts:[],totalCost:0}}>
                <ShoppingCart />
            </AppContext.Provider>
        )
       
      expect(screen.getByText(/total:/i)).toHaveTextContent(/0$/i)
            expect(screen.getByRole('list')).toBeEmptyDOMElement()
 })


 it('display all the products on cart with correct total cost', ()=>{

   const cartProducts =[{info:{name:'burger',price:500},quantity:1} ,{info:{name:'pizza',price:550},quantity:2}]

   render(
            <AppContext.Provider value={{cartProducts,totalCost:1600}}>
                <ShoppingCart />
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
            <AppContext.Provider value={{cartProducts,totalCost:1600,emptyCart,resetTotalCost}}>
                <ShoppingCart />
            </AppContext.Provider>
        )

          expect(screen.getAllByRole('listitem')).toHaveLength(2)
      expect(screen.getByText(/total:/i)).toHaveTextContent(/1600$/i)

const emptyCartButton = screen.getByRole('button', {
  name: /vaciar carrito/i})

 userEvent.click(emptyCartButton)


 expect(emptyCart.mock.calls.length).toBe(1)
  expect(resetTotalCost.mock.calls.length).toBe(1)




 })