import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import AppContext from '../../context/AppState'
import Menu from './Menu'


const categories = [{_id:1,name:'pizzas'},{_id:2,name:'burgers'},{_id:3,name:'hot dogs'},{_id:4,name:'empanadas'},{_id:5,name:'burritos'}]

beforeEach(()=> 

render(
<MemoryRouter initialEntries={["/menu"]}>
  <AppContext value={{categories}}>
<Menu/>
  </AppContext>
</MemoryRouter>


))

describe('Menu page',()=>{

it('mounts with correct components', async()=>{

 expect(screen.getByText('Menú')).toBeInTheDocument()
expect(screen.getAllByRole('combobox')).toHaveLength(2)
expect(screen.getAllByRole('searchbox')).toHaveLength(1)
expect(screen.getByTestId('products-skeketom')).toBeInTheDocument()
  })


})