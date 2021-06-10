import React from 'react';
import { render,  screen,fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuSearchBar from './MenuSearchBar'


const  setSearch = jest.fn(),
resetQuery = jest.fn()



it('display default placeholder text correctly', ()=>{
  
render(<MenuSearchBar setSearch={setSearch}
resetQuery={resetQuery} />)

   expect(screen.getByRole('searchbox').placeholder).toEqual('Buscar...')

})


it('display placeholder pass by props correctly', ()=>{
  
render(<MenuSearchBar setSearch={setSearch}
resetQuery={resetQuery}  placeholder='Buscar por orderID...'/>)

   expect(screen.getByRole('searchbox').placeholder).toEqual('Buscar por orderID...')

})

it('trigger setSearch and resetQuery function on form submit and  setSearch on clear input', ()=>{
  
render(<MenuSearchBar setSearch={setSearch}
resetQuery={resetQuery}  />)


 userEvent.type(screen.getByRole('searchbox'), 'pizza muzzarella')
 fireEvent.submit(screen.getByRole('searchbox'))

 expect(setSearch.mock.calls.length).toBe(1)
 expect(resetQuery.mock.calls.length).toBe(1)

 expect(screen.getByRole('searchbox')).toHaveValue('pizza muzzarella')

   userEvent.clear(screen.getByRole('searchbox'))

    expect(setSearch.mock.calls.length).toBe(2)


userEvent.type(screen.getByRole('searchbox'), 'chilli hot dog')
 fireEvent.submit(screen.getByRole('searchbox'))

 expect(setSearch.mock.calls.length).toBe(3)
 expect(resetQuery.mock.calls.length).toBe(2)

 expect(screen.getByRole('searchbox')).toHaveValue('chilli hot dog')

})



