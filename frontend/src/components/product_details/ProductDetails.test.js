import React from 'react';

import { render,  screen,act } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import AppContext from '../../context/app-context'
import ProductDetails from './ProductDetails'



const addToCart=jest.fn(),
addToTotalCost=jest.fn(),
setIsLoading=jest.fn();



let productInfo = {
  _id:15,
  name:'lomito de ternera',
  category:'lomitos',
  price:650,
  size:'700 gr',
  description:'lomito description content'
}




 it('renders nothing when still loading', ()=>{
  
const {container} =  render(
<MemoryRouter initialEntries={['/menu/productDetails/15?from=/menu']}>
            <AppContext.Provider value={{addToCart,addToTotalCost,setIsLoading,isLoading:true,cartProducts:[]}}>
                <ProductDetails/>
            </AppContext.Provider>

            </MemoryRouter> )

  expect(container).toBeEmptyDOMElement()

 })


 it('renders when loading is false', ()=>{
 const {container} = render(
<MemoryRouter initialEntries={['/menu/productDetails/15?from=/menu']}>
            <AppContext.Provider value={{addToCart,addToTotalCost,setIsLoading,isLoading:false,cartProducts:[]}}>
                <ProductDetails/>
            </AppContext.Provider>

            </MemoryRouter>
        )

  expect(container).not.toBeEmptyDOMElement()

 })

 describe('component after fetch', ()=>{

   let originalFecth;

beforeEach(()=>{
global.fetch = jest.fn( ()=> Promise.resolve({
  json: () => Promise.resolve({
    data:productInfo
  })
})
)

})

afterEach(()=>{
originalFecth = global.fetch 

})

it('renders product info correctly', async()=>{

  await act(async ()=> 
render(
<MemoryRouter initialEntries={['/menu/productDetails/15?from=/menu']}>
            <AppContext.Provider value={{addToCart,addToTotalCost,setIsLoading,isLoading:false,cartProducts:[]}}>
                <ProductDetails/>
            </AppContext.Provider>

            </MemoryRouter>
        )
  )

 await expect(screen.getByText('lomito de ternera')).toBeInTheDocument()
 await expect(screen.getByText('$650')).toBeInTheDocument()
  await expect(screen.getByText('lomitos')).toBeInTheDocument()
   await expect(screen.getByText('700 gr')).toBeInTheDocument()
  await expect(screen.getByText('lomito description content')).toBeInTheDocument()


})

it('renders add to cart button if product is not already in cart', async()=>{

  await act(async ()=> 
render(
<MemoryRouter initialEntries={['/menu/productDetails/15?from=/menu']}>
            <AppContext.Provider value={{addToCart,addToTotalCost,setIsLoading,isLoading:false,cartProducts:[]}}>
                <ProductDetails/>
            </AppContext.Provider>

            </MemoryRouter>
        )
  )

 await expect(screen.getByRole('button')).toBeInTheDocument()
  userEvent.click(screen.getByRole('button'))

  expect(addToCart.mock.calls.length).toBe(1)
  expect(addToTotalCost.mock.calls.length).toBe(1)




})

it('dose not renders add to cart button if product is already in cart', async()=>{

  const cartProducts = [
  {
    info:{
      _id:15,
       name:'lomito de ternera',
    },
    quantity:1
  },
    {
    info:{
      _id:11,
       name:'pizza',
    },
    quantity:1
  }

]
  await act(async ()=> 
render(
<MemoryRouter initialEntries={['/menu/productDetails/15?from=/menu']}>
            <AppContext.Provider value={{addToCart,addToTotalCost,setIsLoading,isLoading:false,cartProducts:cartProducts }}>
                <ProductDetails/>
            </AppContext.Provider>

            </MemoryRouter>
        )
  )

  expect(screen.queryByRole('button')).not.toBeInTheDocument()

})


})


