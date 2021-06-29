import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardOrders from "./DashboardOrders";
import userEvent from '@testing-library/user-event'
import {MemoryRouter} from 'react-router-dom'
import AppContext from '../../context/AppState'
import orders from '../../mocks/orders'
import { act } from 'react-dom/test-utils';

const token = 'dsflkgalñsdfgklñadfkglkaldfkglñadfkglkadflgdfg'
const setIsLoading = jest.fn(),
setNotification = jest.fn();

window.HTMLElement.prototype.scrollTo = function() {};


describe("orders fetch", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                data:orders,
                tota:orders.length
            })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('Should display data fetched and table head correctly', async () => {


  await act(async() =>
    render(
          <MemoryRouter initialEntries={["/dashboard/orders"]}>
  <AppContext value={{token,setIsLoading}}>
<DashboardOrders setNotification={setNotification}/>
  </AppContext>
</MemoryRouter>

        )
  )   

      expect(screen.getByText('Pedidos')).toBeInTheDocument()
  expect(screen.getAllByRole('row')).toHaveLength(orders.length+1)
  expect(screen.getByText(orders[0].orderID)).toBeInTheDocument()
    expect(screen.getByText('$'+orders[0].total)).toBeInTheDocument()
  expect(screen.getAllByText([...orders[0]?.states].reverse().find(state => state.confirmed ===true).name).length).toBeGreaterThan(0)
    expect(screen.getAllByText(new Date(orders[0].states[0].date).toLocaleString().split(" ")[0]).length).toBeGreaterThan(0)
   expect(screen.getByText(new Date(orders[0].states[0].date).toLocaleString().split(" ")[1])).toBeInTheDocument()

    });

    it('clouse  orders  notifications when page  make fetch request', async()=>{

  await act(async() =>
    render(
          <MemoryRouter initialEntries={["/dashboard/orders"]}>
  <AppContext value={{token,setIsLoading}}>
<DashboardOrders setNotification={setNotification}/>
  </AppContext>
</MemoryRouter>

        )
  )   

     expect(setNotification.mock.calls.length).toBe(1)
     
      const refreshButton = screen.getByTestId('refresh-button')

      await act(async()=> userEvent.click(refreshButton))

      expect(setNotification.mock.calls.length).toBe(2)
    })
});