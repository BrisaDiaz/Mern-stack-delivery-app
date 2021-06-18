
import React from 'react';
import { render,  screen,act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HeroSlider from './HeroSlider'
import {MemoryRouter} from 'react-router-dom'


it('renders all controlls and inizialize in slilde one', ()=>{
  render(
    <MemoryRouter initialEntries={["/"]}>
<HeroSlider/>
    </MemoryRouter>

    )
  

     expect(screen.getByTestId('dot1')).toBeInTheDocument()
    expect(screen.getByTestId('dot2')).toBeInTheDocument()
    expect(screen.getByTestId('dot3')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
       expect(screen.getByRole('link')).toBeInTheDocument()
        expect(screen.getByTestId('prevButton')).toBeInTheDocument()
       expect(screen.getByTestId('nextButton')).toBeInTheDocument()

       expect(screen.getByTestId('nextButton')).toBeInTheDocument()
       expect(screen.getByTestId('slider1' )).toHaveStyle('display:block')
          expect(screen.getByTestId('dot1' )).toHaveStyle('background:#fff')
})


it('renders correct slider when click prev and next controls', async()=>{

  render(
    <MemoryRouter initialEntries={["/"]}>
<HeroSlider/>
    </MemoryRouter>

    )

  const nextControl = screen.getByTestId('nextButton' )
    const pervControl = screen.getByTestId('prevButton' )

       expect(screen.getByTestId('slider1' )).toHaveStyle('display:block')
       
  
     await act( async()=> userEvent.click(nextControl))

        expect(screen.getByTestId('slider1' )).toHaveStyle('display:none')
         expect(screen.getByTestId('slider2' )).toHaveStyle('display:block')

     await act( async()=> userEvent.click(pervControl))

        expect(screen.getByTestId('slider2' )).toHaveStyle('display:none')
         expect(screen.getByTestId('slider1' )).toHaveStyle('display:block')
       

})

it('renders first slider again when is in the last slider and make click on next button', async()=>{

  render(
    <MemoryRouter initialEntries={["/"]}>
<HeroSlider/>
    </MemoryRouter>

    )

  const nextControl = screen.getByTestId('nextButton' )


       expect(screen.getByTestId('slider1' )).toHaveStyle('display:block')
       
  
     await act( async()=> userEvent.click(nextControl))
     
             expect(screen.getByTestId('slider1' )).toHaveStyle('display:none')
     expect(screen.getByTestId('slider2' )).toHaveStyle('display:block')

   await act( async()=> userEvent.click(nextControl))
   
      expect(screen.getByTestId('slider2' )).toHaveStyle('display:none')
    expect(screen.getByTestId('slider3' )).toHaveStyle('display:block')
 

     await act( async()=> userEvent.click(nextControl))

        expect(screen.queryByTestId('slider3' )).toHaveStyle('display:none')
         expect(screen.getByTestId('slider1' )).toHaveStyle('display:block')

})
