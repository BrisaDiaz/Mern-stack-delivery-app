
import React from 'react';
import { render,  screen,fireEvent } from '@testing-library/react'
import FilterProductsStateOptions from './FilterProductsStateOptions'

const setStatePreferece =jest.fn();
beforeEach(() => render(<FilterProductsStateOptions setStatePreferece={setStatePreferece}

/> ) )

it('has "all" as a default value', ()=>{

    
  expect(screen.getByText('Todos')).toHaveValue('all')
  
   expect(screen.getByRole('combobox')).toHaveDisplayValue('Todos')

} )

it('display all products states options with correct value', ()=>{

  expect(screen.getByText('Activos')).toHaveValue('active')
   expect(screen.getByText('Inactivos')).toHaveValue('inactive')



} )


it('trigger setter function with the correct value and set page', ()=>{

fireEvent.change(screen.getByRole('combobox'), {
  target: {
    value:'inactive'
  },
})
 expect(setStatePreferece.mock.calls.length).toBe(1)

 expect(screen.getByRole('combobox')).toHaveDisplayValue('Inactivos')

fireEvent.change(screen.getByRole('combobox'), {
  target: {
    value:'active'
  },
})

 expect(setStatePreferece.mock.calls.length).toBe(2)

 
 expect(screen.getByRole('combobox')).toHaveDisplayValue('Activos')
  
})