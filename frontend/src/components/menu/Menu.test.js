import '@testing-library/jest-dom'
import react from  'react'
import { render, screen } from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import AppContext from '../../context/AppState'
import Menu from './Menu'







it('mounts with correct components', async()=>{
 await render(
<MemoryRouter initialEntries={["/menu"]}>
  <AppContext value={{categories:[]}}>
<Menu/>
  </AppContext>
</MemoryRouter>

 )
 await expect(screen.getByText('Menú')).toBeInTheDocument()
await expect(screen.getAllByRole('combobox')).toHaveLength(2)
 await expect(screen.getAllByRole('searchbox')).toHaveLength(1)
await expect(screen.getByTestId('products-skeketom')).toBeInTheDocument()
  })


