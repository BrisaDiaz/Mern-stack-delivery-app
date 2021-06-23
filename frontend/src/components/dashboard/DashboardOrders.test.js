import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardOrders from "./DashboardOrders";
import {MemoryRouter} from 'react-router-dom'
import AppContext from '../../context/AppState'
import orders from '../../mocks/orders'
import { act } from 'react-dom/test-utils';

const token = 'dsflkgalñsdfgklñadfkglkaldfkglñadfkglkadflgdfg'
const setIsLoading = jest.fn()

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
<DashboardOrders/>
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
});