import React from 'react';
import '@testing-library/jest-dom'
import { render,  screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
 import ProductsSection from './ProductsSection'
import AppContext from '../../context/AppState'
import products from '../../mocks/products'





let addToCart = jest.fn()
let addToTotalCost = jest.fn()

 describe('ProductsSection render' , ()=>{

  it('renders not faund message after not getting match search results', () =>{
    render(
      
 <MemoryRouter initialEntries={["/menu"]}>
         <AppContext value={{
  cartProduct:[],
addToCart,
addToTotalCost
}}>
<ProductsSection isLoading={false} products={[]} />
</AppContext>
    </MemoryRouter>


    )
    expect(screen.getByText('No se han encontrado coincidencias, intenta de nuevo!!')).toBeInTheDocument()
  })

  it('renders products  of  the match search result', () =>{

    render(
       <MemoryRouter initialEntries={["/menu"]}>
            <AppContext value={{
  cartProduct:[],
addToCart,
addToTotalCost
}}>
<ProductsSection isLoading={false} products={products.data} />
</AppContext>
    </MemoryRouter>

    )

    expect(screen.queryByText('No se han encontrado coincidencias, intenta de nuevo!!')).not.toBeInTheDocument()

 expect(screen.getAllByRole('article')).toHaveLength(products.data.length)



  })
 })

 