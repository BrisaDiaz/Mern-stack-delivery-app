import React from 'react';
import { render,  screen } from '@testing-library/react'
import AppContext from '../../context/app-context'
import { MemoryRouter,Route } from "react-router-dom";
import MenuItem from './MenuItem'


const item = {    
 _id:20,
  name:'doble burger',
  price:500,
  category:'hamburguesas',
    size:'700 gr',
}



describe('menu item', ()=>{

  it('renders info correctly',() =>{

   render( 
     <MemoryRouter initialEntries={['/menu']}>
      <Route  path="/menu"  >
            <AppContext.Provider value={{cartProducts:[]}}>
                <MenuItem  item={item}/>
                
            </AppContext.Provider>
   </Route>
</MemoryRouter>)

expect(screen.getByText('doble burger')).toBeInTheDocument()
expect(screen.getByText('500')).toBeInTheDocument()
expect(screen.getByText('700 gr')).toBeInTheDocument()

    
  })
it('renders add to cart button when is in menu',() =>{

render( 
     <MemoryRouter initialEntries={['/menu']}>
      <Route  path="/menu"  >
            <AppContext.Provider value={{cartProducts:[]}}>
                <MenuItem  item={item} children={[<button key='2' />,<button key='3'/>]}/>
  
            </AppContext.Provider>
   </Route>
</MemoryRouter>)

expect(screen.getByAltText('add-to-cart')).toBeInTheDocument()

expect(screen.getAllByRole('button')).toHaveLength(1)

    
  })

  it('renders delete and edit item button when is in dashboard',() =>{

render( 
     <MemoryRouter initialEntries={['/dashboard/myProducts']}>
      <Route  path="/dashboard/myProducts"  >
            <AppContext.Provider value={{cartProducts:[]}}>
                <MenuItem  item={item} children={[<button key='2' />,<button key='3'/>]}>
    
                </MenuItem>
            </AppContext.Provider>
   </Route>
</MemoryRouter>)

expect(screen.getAllByRole('button')).toHaveLength(2)
expect(screen.queryByAltText('add-to-cart')).not.toBeInTheDocument()

    
  })

})