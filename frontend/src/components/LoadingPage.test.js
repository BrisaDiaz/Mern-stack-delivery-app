
import React from 'react';
import { render,  screen} from '@testing-library/react'
import LoadingPage from './LoadingPage'
import AppContext from '../context/AppState'


it('renders when app is loading', ()=>{

render(
<AppContext value={{isLoading:true}}>
  <LoadingPage/>
</AppContext>
);

expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument()

})

