import styled  from 'styled-components'
import {useHistory} from 'react-router-dom'
import {SectionTitle} from '../menu/Menu'
import DashboardNav from '../DashboardNav'
import AppContext from '../../context/app-context'
import {   useContext } from 'react'
import getAllOrdersAPI from '../../API/getAllOrdersAPI'
import refreshIcone from '../../img/refresh.svg'

import {RefreshButton,RefreshIcone} from '../account/MyOrdersPage'

export const Page = styled.main`
    padding: 60px 15px;
min-height:100vh;
width:100%;
max-width: 1250px;
margin: 0 auto;
text-align:center;

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

width:90%;
max-width:900px;
margin: 0 auto;
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
  padding: 0  5px ;

}
@media screen and (max-width: 750px){

    max-width: 350px;

  & > ${TableHead}{
  display: none;
  max-width: 300px;
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
    color: #fcba1c;
}
& >  tbody tr td:nth-child(2):before {
content:"Dirección";
}
& >  tbody tr td:nth-child(3):before {
content:"Fecha";
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
export default function DashboardOrders(){
  const history = useHistory()

const seeDetails = (orderID) =>{
 history.push(`/dashboard/orders/${orderID}` )
}

const {orders,setAllOrders,token,setIsLoading} = useContext(AppContext)

  return(
<Page>
     <DashboardNav/>
     <SectionTitle>Pedidos</SectionTitle>
     <RefreshButton onClick={(e) =>getAllOrdersAPI({setAllOrders,token,setIsLoading}) }>
  <RefreshIcone src={refreshIcone} title='Refrescar Página'/>
  </RefreshButton>



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
{orders?.reverse().map(order => 
    <tr key={order?.orderID}   onClick={ (e) => seeDetails(order?.orderID)}>
    <td>{order?.orderID}</td>
        <td>
          <small>{new Date(order.states[0].date).toLocaleString().split(" ")[0]}</small>
              <br></br>
            <small>{new Date(order.states[0].date).toLocaleString().split(" ")[1]}</small>
</td>
        <td>{order?.client[0].address}</td>
        <td>${order?.total}</td>
        <td> <b>{[...order?.states].reverse().find(state => state.confirmed ===true).name}</b></td>

</tr>
  
  
  )}
      
  </tbody>
 
</OrdersTable> 

</Page>
  )
}