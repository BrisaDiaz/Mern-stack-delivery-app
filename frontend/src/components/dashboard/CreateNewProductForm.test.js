import React from 'react';
import { render,  screen,act,fireEvent } from '@testing-library/react'
import AppContext from '../../context/app-context'
import CreateNewProductForm from './CreateNewProductForm'
import userEvent from '@testing-library/user-event'

const setIsSuccessfullySend= jest.fn(),
productsAPI= jest.fn();

let formIsLoading;
const categories = [{_id:1,name:'lomitos',quantity:1},{_id:2,name:'hamburguesas',quantity:2},{_id:4,name:'acompañantes',quantity:3},{_id:5,name:'empanadas',quantity:1}]



beforeEach(()=>
render(
  <AppContext.Provider value={{categories,token:'tokenString',setIsSuccessfullySend,productsAPI,formIsLoading}}>

                <CreateNewProductForm/>
                
            </AppContext.Provider>

)
)
describe('form', ()=>{
 
it('displays all chieldrens correctly', ()=>{

expect(screen.getAllByRole('textbox')).toHaveLength(4)
expect(screen.getByRole('combobox')).toBeInTheDocument()
expect(screen.getByRole('checkbox')).toBeInTheDocument()
expect(screen.getAllByRole('button')).toHaveLength(2)
expect(screen.getAllByRole('option')).toHaveLength(4)
expect(screen.getByRole('heading')).toBeInTheDocument()
})

it('dose not submit if all fields are not complited', async()=>{

await act(async() =>  userEvent.click(screen.getByRole('button',{name:'Cargar'}))) 
  expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()

})

it('render require message if field is focus but  is left empty', async()=>{

    await act(async ()=>fireEvent.focus(screen.getByTestId('name')) )
    await act(async ()=>fireEvent.focus(screen.getByTestId('size')) )
      await act(async ()=>fireEvent.focus(screen.getByTestId('price')) )
     await act(async ()=>fireEvent.focus(screen.getByTestId('description')))
  await act(async ()=>fireEvent.blur(screen.getByTestId('name')) )
    await act(async ()=>fireEvent.blur(screen.getByTestId('size')) )
      await act(async ()=>fireEvent.blur(screen.getByTestId('price')) )
     await act(async ()=>fireEvent.blur(screen.getByTestId('description')))

 await expect(screen.getAllByRole('alert')).toHaveLength(4)


})

it('render customs messages on errror', async()=>{
     await act(async ()=>fireEvent.focus(screen.getByTestId('price')))
   await act(async ()=> fireEvent.input(screen.getByTestId('price'),{
    target: { value: 'some string' }
  }) )

 await  expect(screen.getByTestId('price')).toHaveValue('some string')
   await act(async ()=>fireEvent.blur(screen.getByTestId('price')) )

 await expect(screen.getByText('*Se admiten solo números',{ecxact:false})).toBeInTheDocument()


})

})