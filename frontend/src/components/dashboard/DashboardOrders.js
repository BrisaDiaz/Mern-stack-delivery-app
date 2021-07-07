import styled  from 'styled-components'
import useDashboardOrders from '../../hooks/useDashboardOrders'
import DashboardNav from '../DashboardNav'
import refreshIcone from '../../img/refresh.svg'
import SearchBar from '../MenuSearchBar'
import {RefreshButton,RefreshIcone} from '../account/UserOrdersPage'
import {LoaderSpinner} from './../LoaderSpinner'
import {NotFaundMessage} from '../menu/ProductsSection'
import {SectionTitle} from '../menu/Menu'
import {FiltersBoard} from './DashboardProducts'
import FilterOrderStateOptions from './../FilterOrderStateOptions'
import SortOrdersOptions from './../SortOrdersOptions'
import PaginationButtons from '../PaginationButtons'
import OrdersTableSkeletom from '../OrdersTableSkeletom'

export const Page = styled.section`
    padding: 60px 05px;
min-height:100vh;
width:100%;
max-width: 1250px;
margin: 0 auto;
text-align:center;
  &:before{
    display: ${props => props.isLoading ? 'block' : 'none'};
      position:absolute;
      content:" ";
      top:0;
      left:0;
    right:0;
    bottom:0;
    background:#ffffff57;
    z-index:400;
    }
       & >${LoaderSpinner} {
  position: fixed;
    top: 50%;
    left: 50%;
    z-index: 500;
    margin: -60px 0  0 -60px ;

}
& > ${NotFaundMessage} {
  padding: 0 5px;
}
& > ${FiltersBoard} {
 margin: 30px 5px 0;
}

`;
export const TableHead = styled.thead`
background-color: #171717;
color: #fcba1c;
& >tr th {
   padding: 10px 0;
       font-family: "Oswald", sans-serif;
       font-size:19px;
}
`;
export const OrdersTable = styled.table`
    width: 100%;
max-width:900px;
margin: 20px auto 40px;
    border-spacing: 10px;
    border-collapse: collapse;
    border: 2px solid #171717;
        text-transform: capitalize;

&> tbody{
  background:#fff;
}

& >tbody tr td {
  padding: 10px 0;
  cursor:pointer;

}
& >tbody tr {

  border-bottom: 1px solid ;
}
& >tbody tr td small {
  margin-left:   5px ;

}
@media screen and (max-width: 750px){

    max-width: 400px;

  & > ${TableHead}{
  display: none;
  max-width: 400px;
}
& tbody tr {
display: flex;
  flex-direction: column;
}
& >  tbody tr td {
      display: flex;
    padding: 5px 15px;
    text-align: right;
}
& >  tbody tr td:first-child {
  color:#fff;
  padding: 10px 15px;
background-color: #171717;
}
& >  tbody tr td:first-child:before {
content:"Nº de Pedido";
    color: ${props => props.theme.darckYellow};
}
& >  tbody tr td:nth-child(2):before {
content:"Fecha";
}
& >  tbody tr td:nth-child(3):before {
content:"Dirección";
}
& >  tbody tr td:nth-child(5):before {
content:"Estado";
}
& >  tbody tr td:nth-child(4):before {
content:"Total";
}
& >tbody tr td:before{
      margin-right: auto;
    font-family: "Oswald", sans-serif;
    font-size: 16px;
    align-self: center;

}


}
`

export default function DashboardOrders({setNotification}){




const {seeDetails,handleRefresh,setOrderID,setSorting,setPage,setState,page,isLoading,maxPage,orders,sorting,isFirstRender,orderID,state} = useDashboardOrders({setNotification})


  return(
<Page  isLoading={isLoading}>
     <DashboardNav/>
     <SectionTitle>Pedidos</SectionTitle>

<SearchBar defaultValue={orderID} placeholder='Número de orden...' setSearch={setOrderID} />
<FiltersBoard>
          <FilterOrderStateOptions defaultValue={state}  setPage={setPage} setStatePreferece={setState}/>
          <SortOrdersOptions defaultValue={sorting}  setSortPreferece={setSorting}  />
        </FiltersBoard>

  <RefreshButton data-testid="refresh-button" onClick={ () => handleRefresh()}>
  <RefreshIcone src={refreshIcone} title='Refrescar Página'/>
  </RefreshButton>
  {isLoading ? <LoaderSpinner /> :  null }

  {( (isLoading) && (isFirstRender))  &&  <OrdersTableSkeletom/>}

  { ( (!isLoading) && (!isFirstRender)  &&  orders?.length === 0) &&
  <NotFaundMessage>No se han encontrado coincidencias, intenta de nuevo!!</NotFaundMessage>
  }

  {  (orders?.length !== 0) &&
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
{orders?.map(order =>
    <tr key={order?.orderID}   onClick={ (e) => seeDetails(order?._id)}>
    <td>{order?.orderID}</td>
        <td>
          <span>{new Date(order.states[0].date).toLocaleString().split(" ")[0]}</span>
              <br></br>
            <span>{new Date(order.states[0].date).toLocaleString().split(" ")[1]}</span>
</td>
        <td>{order?.client[0].address}</td>
        <td>${order?.total}</td>
        <td> <b>{[...order?.states].reverse().find(state => state.confirmed ===true).name}</b></td>

</tr>


  )}

  </tbody>

</OrdersTable> }

<PaginationButtons setPage={setPage} page={page} maxPage={maxPage} />

</Page>

  )
}