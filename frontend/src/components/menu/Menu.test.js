import React from 'react';
import { render,  screen,act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppContext from '../../context/app-context'
import { MemoryRouter,Route } from "react-router-dom";
import Menu from './Menu'


const mockChildComponent = jest.fn();

jest.mock( './MenuItem', () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});




describe('Menu with considences on search',()=>{



const categories = [{_id:1,name:'lomitos',quantity:1},{_id:2,name:'hamburguesas',quantity:2},{_id:4,name:'acompañantes',quantity:3},{_id:5,name:'empanadas',quantity:1}]

 const products = [
{     _id:14,
  name:'lomito de ternera',
  price:650,
  category:'lomitos',
    size:'800 gr',
},
{    
 _id:16,
  name:'papas fritas',
   price:350,
  category:'acompañantes',
    size:'500 gr',
},
{     _id:17,
  name:'coca cola',
  price:150,
  category:'bebidas',
    size:'500 ml',
},
{     _id:18,
  name:'empanadas arabes',
  price:350,
  category:'empanadas',
    size:'6 unid',
},
{     _id:19,
  name:'nuggets',
  price:350,
  category:'acompañantes',
    size:'500 gr',
},
{    
 _id:20,
  name:'doble burger',
  price:500,
  category:'hamburguesas',
    size:'700 gr',
}
 ]

  let originalFecth;

beforeEach(()=>{
global.fetch = jest.fn( ()=> Promise.resolve({
  json: () => Promise.resolve({
    data: [...products],
    total:20
  })
})
)

})
afterEach(()=>{
originalFecth = global.fetch 

})

it('pass props correctly to the chield component' ,  async()=>{

 await act(async ()=> 

render(
  <MemoryRouter initialEntries={['/menu']}>
      <Route  path="/menu"  >
            <AppContext.Provider value={{categories}}>
                <Menu open item={products}/>
                
            </AppContext.Provider>
   </Route>
</MemoryRouter>
        )
  )

expect(screen.queryByText('No se han encontrado coincidencias, intenta de nuevo!!')).not.toBeInTheDocument()




expect(mockChildComponent.mock.calls.length).toBeGreaterThan(1)
})

it('pagination controls worcks correctly',async()=>{
 await act(async ()=> 

render(
  <MemoryRouter initialEntries={['/menu']}>
      <Route  path="/menu"  >
            <AppContext.Provider value={{categories}}>
                <Menu open item={products}/>
                
            </AppContext.Provider>
   </Route>
</MemoryRouter>
        )
  )

  expect(screen.getByRole('button',{name:'Next >>'})).toBeInTheDocument()
   expect(screen.queryByRole('button',{name:'<< Prev'})).not.toBeInTheDocument()
 await act(async ()=>  userEvent.click(screen.getByRole('button',{name:'Next >>'})) )


   expect(screen.queryByRole('button',{name:'<< Prev'})).toBeInTheDocument()
  expect(screen.getByRole('button',{name:'Next >>'})).toBeInTheDocument()

    await act(async ()=>  userEvent.click(screen.getByRole('button',{name:'<< Prev'})) )

  expect(screen.getByRole('button',{name:'Next >>'})).toBeInTheDocument()
}, 10000)


})



describe('Menu when there are not coinsidences on search',()=>{


  let originalFecth;

beforeEach(()=>{
global.fetch = jest.fn( ()=> Promise.resolve({
  json: () => Promise.resolve({
    data:[],
    total:0
  })
})
)

})
afterEach(()=>{
originalFecth = global.fetch 

})

it('display not considences on search message' ,  async()=>{

 await act(async ()=> 

render(
  <MemoryRouter initialEntries={['/menu']}>
      <Route  path="/menu"  >
            <AppContext.Provider value={{categories:[]}}>
                <Menu/>
                
            </AppContext.Provider>
   </Route>
</MemoryRouter>
        
        )
  )

expect(screen.getByText('No se han encontrado coincidencias, intenta de nuevo!!')).toBeInTheDocument()
  expect(screen.queryByRole('button',{name:'Next>>'})).not.toBeInTheDocument()

})

it('display all categories  with products availables' ,  async()=>{


const categories = [{_id:1,name:'pizzas',quantity:4},{_id:2,name:'hamburguesas',quantity:2},{_id:3,name:'hot dogs',quantity:0}]


 await act(async ()=> 
 
render(
       <MemoryRouter initialEntries={['/menu']}>
      <Route  path="/menu"  >
            <AppContext.Provider value={{categories}}>
                <Menu/>
                
            </AppContext.Provider>
   </Route>
</MemoryRouter>
        

        )
  )

expect(screen.getAllByText('pizzas').length).toBeGreaterThanOrEqual(1)
expect(screen.getAllByText('hamburguesas').length).toBeGreaterThanOrEqual(1)
expect(screen.queryByText('hot dogs')).not.toBeInTheDocument()
})




})





