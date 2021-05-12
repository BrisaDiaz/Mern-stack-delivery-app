
import React, { Component } from 'react';
import '@testing-library/jest-dom'
import {fireEvent, render} from '@testing-library/react';
import SeeMoreButton from './SeeMoreButton'

const Button = render(<SeeMoreButton />)

test("Button is mounted", () =>{
  expect(Button).toBeInTheDocument()
})

test("Button contains initial value of  +", () =>{

expect(Button.textContent).toBe('+')

fireEvent.click(Button)

expect(Button.textContent).toBe('x')

fireEvent.click(Button)

expect(Button.textContent).toBe('+')
})


test("Button text conten alternate of + to x on click", () =>{
expect(Button.textContent).toBe('+')

fireEvent.click(Button)

expect(Button.textContent).toBe('x')

fireEvent.click(Button)

expect(Button.textContent).toBe('+')

fireEvent.click(Button)

expect(Button.textContent).toBe('x')

})

test("expect Button to have a toggle prop", () =>{

expect(Button).prop('toggle')


})