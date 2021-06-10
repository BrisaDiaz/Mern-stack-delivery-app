
import React from 'react';
import { render,  screen,fireEvent } from '@testing-library/react'
import SortOrdersOptions from './SortOrdersOptions'




it('display all sort options  with correct value', ()=>{
const setSortPreferece = jest.fn()
render(<SortOrdersOptions setSortPreferece={setSortPreferece}/>)

expect(screen.getByText('Más recientes')).toHaveValue('-createdAt')
expect(screen.getByText('Más antiguos')).toHaveValue('createdAt')
expect(screen.getByText('Menor Monto')).toHaveValue('total')
expect(screen.getByText('Mayor Monto')).toHaveValue('-total')



})

it('to have -createdAt as default value',()=>{
const setSortPreferece = jest.fn();

  render(<SortOrdersOptions  setSortPreferece={setSortPreferece}/>)

 expect(screen.getByRole('combobox')).toHaveDisplayValue('Más recientes')

})

it('triggers setSortPreferece function passing the correct value on change',()=>{

const setSortPreferece = jest.fn();

render(<SortOrdersOptions  setSortPreferece={setSortPreferece}/>)

fireEvent.change(screen.getByRole('combobox'), {
  target: {
    value:'-total'
  },
})
 expect(setSortPreferece.mock.calls.length).toBe(1)

 expect(screen.getByRole('combobox')).toHaveDisplayValue('Mayor Monto')

 fireEvent.change(screen.getByRole('combobox'), {
  target: {
    value:'-createdAt'
  },
})
 expect(setSortPreferece.mock.calls.length).toBe(2)

 expect(screen.getByRole('combobox')).toHaveDisplayValue('Más recientes')

})