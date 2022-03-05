import styled from "styled-components";
import useDashboardOrders from "../../hooks/useDashboardOrders";
import DashboardNav from "../DashboardNav";
import refreshIcon from "../../img/refresh.svg";
import SearchBar from "../MenuSearchBar";
import {
  RefreshButton,
  RefreshIcon,
  TableWrapper,
} from "../account/UserOrdersPage";
import { LoaderSpinner } from "./../LoaderSpinner";
import { NotFoundMessage } from "../menu/ProductsSection";
import SectionTitle  from "../SectionTitle";
import { FiltersBoard } from "./DashboardProducts";
import FilterOrderStateOptions from "./../FilterOrderStateOptions";
import SortOrdersOptions from "./../SortOrdersOptions";
import PaginationButtons from "../PaginationButtons";
import OrdersTableSkeleton from "../OrdersTableSkeleton";

export const Page = styled.section`
  padding: 60px 05px;
  min-height: 100vh;
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  text-align: center;
  &:before {
    display: ${(props) => (props.isLoading ? "block" : "none")};
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff57;
    z-index: 400;
  }
  & > ${LoaderSpinner} {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 500;
    margin: -60px 0 0 -60px;
  }
  & > ${NotFoundMessage} {
    padding: 0 5px;
  }
  & > ${FiltersBoard} {
    margin: 30px 5px 0;
  }
`;
export const TableHead = styled.thead`
  background-color: #171717;
  color: #fcba1c;
  & > tr th {
    padding: 10px 0;
    font-family: "Oswald", sans-serif;
    font-size: 19px;
  }
`;
export const OrdersTable = styled.table`
  width: 900px;
  margin: 20px auto 0;
  border-spacing: 10px;
  border-collapse: collapse;
  border: 2px solid #171717;
  text-transform: capitalize;

  & > tbody {
    background: #fff;
  }

  & > tbody tr td {
    padding: 10px 0;
    cursor: pointer;
  }
  & > tbody tr {
    border-bottom: 1px solid;
  }
  & > tbody tr td small {
    margin-left: 5px;
  }
`;

export default function DashboardOrders({ closeNotification }) {
  const {
    seeDetails,
    handleRefresh,
    setOrderID,
    setSorting,
    setPage,
    setState,
    page,
    isLoading,
    maxPage,
    orders,
    sorting,
    isFirstRender,
    orderID,
    state,
  } = useDashboardOrders({ closeNotification });

  return (
    <Page isLoading={isLoading}>
      <DashboardNav />
      <SectionTitle>Pedidos</SectionTitle>

      <SearchBar
        defaultValue={orderID}
        placeholder="Número de orden..."
        setSearch={setOrderID}
      />
      <FiltersBoard>
        <FilterOrderStateOptions
          defaultValue={state}
          setPage={setPage}
          setStatePreferece={setState}
        />
        <SortOrdersOptions
          defaultValue={sorting}
          setSortPreferece={setSorting}
        />
      </FiltersBoard>

      <RefreshButton
        data-testid="refresh-button"
        onClick={() => handleRefresh()}
      >
        <RefreshIcon src={refreshIcon} title="Refrescar Página" />
      </RefreshButton>
      {isLoading ? <LoaderSpinner /> : null}

      {isLoading && isFirstRender && <OrdersTableSkeleton />}

      {!isLoading && !isFirstRender && orders?.length === 0 && (
        <NotFoundMessage>
          No se han encontrado coincidencias, intenta de nuevo!!
        </NotFoundMessage>
      )}

      {orders?.length !== 0 && (
        <TableWrapper>
          <OrdersTable>
            <TableHead>
              <tr>
                <th>Nº de Pedido</th>
                <th>Fecha</th>
                <th>Dirección</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </TableHead>
            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order?.orderID}
                  onClick={(e) => seeDetails(order?._id)}
                >
                  <td>{order?.orderID}</td>
                  <td>
                    <span>
                      {
                        new Date(order.states[0].date)
                          .toLocaleString()
                          .split(" ")[0]
                      }
                    </span>
                    <br></br>
                    <span>
                      {
                        new Date(order.states[0].date)
                          .toLocaleString()
                          .split(" ")[1]
                      }
                    </span>
                  </td>
                  <td>{order?.client[0].address}</td>
                  <td>${order?.total}</td>
                  <td>
                    {" "}
                    <b>
                      {
                        [...order?.states]
                          .reverse()
                          .find((state) => state.confirmed === true).name
                      }
                    </b>
                  </td>
                </tr>
              ))}
            </tbody>
          </OrdersTable>
        </TableWrapper>
      )}

      <PaginationButtons setPage={setPage} page={page} maxPage={maxPage} />
    </Page>
  );
}
