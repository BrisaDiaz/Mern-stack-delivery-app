import React from 'react';
import '@testing-library/jest-dom'
import { render,  screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
 import ProductsSection from './ProductsSection'
import AppContext from '../../context/AppState'

const addToCart = jest.fn()
const addToTotalCost = jest.fn()

const contextValue ={
  cartProduct:[],
  addToCart,
addToTotalCost
}
const products = [ 
  { _id:15,
    name:'pizza california',
    category:'pizzas',
    size:'35 cm',
    price: 500,
   },
     { _id:47,
    name:'pizza muzzarella',
    category:'pizzas',
    size:'35 cm',
    price: 500,
       img:'https://cloudinariurltoproductimage'
   },
     { _id:45,
    name:'cheeseburger',
    category:'hamburguesas',
    size:'500gr',
    price: 500,
    img:'https://cloudinariurltoproductimage'
   },
     { _id:50,
    name:'chilli dog',
    category:'hot dog',
    size:'500 gr',
    price: 500,
       img:'https://cloudinariurltoproductimage'
   },
  { _id:60,
    name:'doble bacon burger',
    category:'hamburguesas',
    size:'500gr',
    price: 500,
    img:'https://cloudinariurltoproductimage'
   },
   
]
 describe('ProductsSection render' , ()=>{

  it('renders not faund message after not getting match search results', () =>{
    render(
      
 <MemoryRouter initialEntries={["/menu"]}>
         <AppContext value={contextValue}>
<ProductsSection isLoading={false} products={[]} />
</AppContext>
    </MemoryRouter>


    )
    expect(screen.getByText('No se han encontrado coincidencias, intenta de nuevo!!')).toBeInTheDocument()
  })

  it('renders products  of  the match search result', () =>{

    render(
       <MemoryRouter initialEntries={["/menu"]}>
            <AppContext value={contextValue}>
<ProductsSection isLoading={false} products={products} />
</AppContext>
    </MemoryRouter>

    )

    expect(screen.queryByText('No se han encontrado coincidencias, intenta de nuevo!!')).not.toBeInTheDocument()

 expect(screen.getAllByRole('article')).toHaveLength(products.length)

  })
 })

 