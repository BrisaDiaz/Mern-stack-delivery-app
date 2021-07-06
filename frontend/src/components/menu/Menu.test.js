import '@testing-library/jest-dom'
import { render, screen,act ,cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import AppContext from '../../context/AppState'
import CartContext from '../../context/cart_context/cart-context'
import Menu from './Menu'
import products from '../../mocks/products'
import categories from '../../mocks/categories'



window.HTMLElement.prototype.scrollTo = function() {};

describe('menu fetch', ()=> {
   let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(products)
        }));
    });



    afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
    global.fetch = originalFetch;
  cleanup();

})

it('display all components and fetch data components', async()=>{

 await act(async()=>render(
<MemoryRouter initialEntries={["/menu"]}>
  <AppContext value={{categories}}>
<CartContext.Provider value={{cartProducts:[]}}>
<Menu/>
</CartContext.Provider>
  </AppContext>
</MemoryRouter>

 ))

expect(screen.getByText('Menú')).toBeInTheDocument()
expect(screen.getAllByRole('combobox')).toHaveLength(2)
 expect(screen.getAllByRole('searchbox')).toHaveLength(1)



 expect(screen.queryByTestId('products-skeketom')).not.toBeInTheDocument()

  products.data.forEach((product) => {

 expect(screen.getByText(product.name)).toBeInTheDocument() ;


 })


  })

  })


