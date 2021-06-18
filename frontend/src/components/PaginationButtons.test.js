import React from 'react';
import { render,  screen,act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PaginationButtons from './PaginationButtons'



const setPage = jest.fn()


it('renders renders bouth buttons correctly', async()=> {

render(
    <PaginationButtons setPage={setPage} page={2} maxPage={3}/>
  )
  
  expect(screen.getAllByRole('button')).toHaveLength(2)

})

it('dose not render prev button when is in first page', ()=>{

render(
  <PaginationButtons setPage={setPage} page={1} maxPage={3}/>
)

   expect(  screen.queryByRole('button',{name:'<< Prev'})).not.toBeInTheDocument()

})

it('dose not render next button when is in last page', ()=>{

render(
  <PaginationButtons setPage={setPage} page={3} maxPage={3}/>
)

   expect(  screen.queryByRole('button',{name:'Next >>'})).not.toBeInTheDocument()

})

it('calls set page on click', async()=> {

render(
    <PaginationButtons  setPage={setPage} page={2} maxPage={3}/>
  )
  const next = screen.getByRole('button',{name:'Next >>'})
 const prev = screen.getByRole('button',{name:'<< Prev'})

 await act(async() => userEvent.click(prev))

 await expect(setPage.mock.calls.length).toBe(1)
 

 await act(async() => userEvent.click(next))
  await act(async() => userEvent.click(next))

 await expect(setPage.mock.calls.length).toBe(3)


})