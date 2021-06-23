import MyProfile from './MyProfile'
import React from 'react';
import { render,  screen,act,fireEvent} from '@testing-library/react'
import AppContext from '../../context/app-context'
import {MemoryRouter} from 'react-router-dom'
import login from '../../mocks/login'



 jest.useFakeTimers();
const currentUser = login.user
const setIsAdmin = jest.fn(),
setIsModerator = jest.fn(),
setToken = jest.fn(),
setIsNotLogin = jest.fn(),
emptyCart = jest.fn(),
resetTotalCost = jest.fn();
 const value = {currentUser,setIsAdmin,setIsModerator,setToken,setIsNotLogin,emptyCart,resetTotalCost} 

describe('Mi frofile component',()=>{
 
beforeEach(()=> 

  render(
      <MemoryRouter initialEntries={['/myAccount','/myAccount/myProfile']}>
            <AppContext.Provider value={value}>
  <MyProfile/>
  </AppContext.Provider>
    </MemoryRouter>

) )

it('display user info correctly',()=>{
expect(screen.getByText(currentUser.name,{exact:false})).toBeInTheDocument()
expect(screen.getByText(currentUser.email,{exact:false})).toBeInTheDocument()
expect(screen.getByText(currentUser.number,{exact:false})).toBeInTheDocument()
expect(screen.getByText(currentUser.address,{exact:false})).toBeInTheDocument()

})

it('logout and clean state when click on logout button',async()=>{

  await  act(async()=>fireEvent.click(screen.getByText('logout',{exact:false})) )

  expect(setIsNotLogin.mock.calls.length).toBe(1)
 expect(setToken.mock.calls.length).toBe(1)
 expect(setIsAdmin.mock.calls.length).toBe(1)
  expect(setIsModerator.mock.calls.length).toBe(1)
  expect(emptyCart.mock.calls.length).toBe(1)
  expect(resetTotalCost.mock.calls.length).toBe(1)

})


  })