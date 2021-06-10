import React from 'react';
import { render,  screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SeeMoreButton from './SeeMoreButton'


const trigger = jest.fn()
beforeEach(() => render( <SeeMoreButton trigger={trigger}/>) )

it('inizialize with text contet = +', () =>{

  expect(screen.getByRole('button').textContent).toBe('+')

})

it('trigger callback function "trigger"  on click', () =>{

userEvent.click(screen.getByRole('button'))
userEvent.click(screen.getByRole('button'))
userEvent.click(screen.getByRole('button'))

expect(trigger.mock.calls.length).toBe(3)

})

it('toggle text value of button on click between "+" and "x"', () =>{

    expect(screen.getByRole('button').textContent).toBe('+')

userEvent.click(screen.getByRole('button'))

  expect(screen.getByRole('button').textContent).toBe('x')

userEvent.click(screen.getByRole('button'))

  expect(screen.getByRole('button').textContent).toBe('+')

userEvent.click(screen.getByRole('button'))

  expect(screen.getByRole('button').textContent).toBe('x')

})