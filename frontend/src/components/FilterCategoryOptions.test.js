
import React from 'react';
import { render,  screen,fireEvent } from '@testing-library/react'
import FilterCategoryOptions from './FilterCategoryOptions'


const categories =[{name:'burgers',_id:1},{name:'pizzas',_id:2},{name:'hot dogs',_id:3}],
setCategoryPreferece =jest.fn();

beforeEach(() => render( <FilterCategoryOptions  setCategoryPreferece={setCategoryPreferece} categories={categories}/>) )


it('has "all categorys" as a default value', ()=>{

  expect(screen.getByText('Todas las categorías')).toHaveValue('all')
   
   expect(screen.getByRole('combobox')).toHaveDisplayValue('Todas las categorías')

} )

it('display all categories options with correct value', ()=>{

  expect(screen.getByText('burgers')).toHaveValue('burgers')
   expect(screen.getByText('pizzas')).toHaveValue('pizzas')
   expect(screen.getByText('hot dogs')).toHaveValue('hot dogs')

} )

it('trigger setter function with the correct value and set page', ()=>{

fireEvent.change(screen.getByRole('combobox'), {
  target: {
    value:'pizzas'
  },
})
 expect(setCategoryPreferece.mock.calls.length).toBe(1)


 expect(screen.getByRole('combobox')).toHaveDisplayValue('pizzas')

fireEvent.change(screen.getByRole('combobox'), {
  target: {
    value:'burgers'
  },
})

 expect(setCategoryPreferece.mock.calls.length).toBe(2)

 
 expect(screen.getByRole('combobox')).toHaveDisplayValue('burgers')
  

} )