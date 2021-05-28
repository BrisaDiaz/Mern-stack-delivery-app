import styled  from 'styled-components'
import {Link,useHistory} from 'react-router-dom'
import {ButtonPrimary} from '../Buttons'
import {SectionTitle} from '../menu/Menu'
import AppContext from '../../context/app-context'
import {  useContext } from 'react'
import deleteOrderAPI from '../../API/deleteOrderAPI'
import currentUserAPI from '../../API/currentUserAPI'
import refreshIcone from '../../img/refresh.svg'




const Page = styled.main`
    padding: 65px 15px;
min-height:100vh;
width:100%;
max-width: 1250px;
margin: 0 auto;
text-align:center;
background:${props => props.theme.lightYellow};

`;
export const TableHead = styled.thead`
background-color: ${props => props.theme.black};
color: ${props => props.theme.darckYellow};
& > tr th {
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
    border: 2px solid ${props => props.theme.black};
        box-shadow: ${props => props.theme.lihgtBoxShadow};
        text-transform: capitalize;

&> tbody{
  background:#fff;
}
& > tbody td small {
    margin: 0 5px;
}
& >tbody td {
  padding: 10px 0;
  cursor:pointer;
}
& > tbody tr {
      border-bottom: 1px solid;
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
background-color: ${props => props.theme.black};

}
& >  tbody tr td:first-child:before {
content:"Nº de Pedido";
    color: ${props => props.theme.darckYellow};
}
& >  tbody tr td:nth-child(3):before {
content:"Dirección";
}
& >  tbody tr td:nth-child(2):before {
content:"Fecha";
}
& >  tbody tr td:nth-child(5):before {
content:"Estado";
}
& >  tbody tr td:nth-child(4):before {
content:"Total";
}
& >  tbody tr td:nth-child(6):before {
content:"Acciones";
}
& >tbody tr td:before{
      margin-right: auto;
    font-family: "Oswald", sans-serif;
    font-size: 16px;
    align-self: center;
padding-rigth:5px;
}


}
`

const CancelOrderButton = styled.button`
padding:  8px 5px;
cursor:pointer;
outline:none;
margin: 5px ;
    border-radius: 10px 5px;
border: none;
font-family: "Oswald", sans-serif;
transition:all 0.5s ;
opacity:${((props) => (props.disabled ? "0.4" : "1"))};
&:hover {

background:${((props) => (props.disabled ? "unset" : "#cdc8c8"))};
}
`
const NotFounMessage = styled.div`
padding: 30px 0;
& >h3{
margin-bottom:40px;
}
@media screen and (max-width:450px){
  font-size: 25px;
}
& > ${ButtonPrimary} {
      padding: 15px 30px;
}
`;
const NotFounIcone = styled.h2`
font-size:50px;
`;
export const RefreshButton = styled.div` 
cursor:pointer;
padding:0 10px;
align-items: center;
    border-radius: 5px;
    height: 40px;
      box-shadow: ${props => props.theme.lihgtBoxShadow};
    background:${props => props.theme.black};
    margin-left: auto;
    margin-bottom: 30px;
    width: max-content;
display: flex;
    transform: scale(0.7);
    transition: all 0.3s ease;

&:hover{
  transform:scale(0.75);
}
`


export const RefreshIcone = styled.img`
height: 50%;
cursor:pointer;


`;


export default function MyOrdersPage(){



  const history = useHistory()
  const {currentUser,token,setCurrentUser} = useContext(AppContext)

let userOrders = currentUser?.orders.reverse()


const deleteOrder = (e,id) =>{
 e.stopPropagation();
if (!e.target.disabled ) return deleteOrderAPI({token,id,setCurrentUser})
}
const seeDetails = (orderID) =>{
 return history.push(`/myAccount/myOrders/${orderID}` )
}



  return(
<Page>

  <SectionTitle light>Mis Pedidos</SectionTitle>
  
<RefreshButton onClick={(e) =>currentUserAPI({token,setCurrentUser}) }>
  <RefreshIcone   src={refreshIcone} title='Refrescar Página'/>
  </RefreshButton>

  { (userOrders?.length > 0 )?
<OrdersTable>
  <TableHead>
    <tr>
    <th>Nº de Pedido</th>
         <th>Fecha</th>
        <th>Dirección</th>
            <th>Total</th>
            <th>Estado</th>
            <th >Acciones</th>
            </tr>
  </TableHead>
  <tbody>
    {userOrders?.map(order => 

    <tr key={order?._id} onClick={(e) => seeDetails(order?.orderID)}>
    <td>{order?.orderID}</td>
        <td>
  
          <small>{new Date(order?.states[0].date).toLocaleString()?.split(" ")[0]}</small>
          <br></br>
            <small>{new Date(order?.states[0].date).toLocaleString()?.split(" ")[1]}</small>
</td>
        <td>{order.client[0].address}</td>
        <td>${order?.total}</td>
        <td> <b>{[...order?.states].reverse().find(state => state.confirmed ===true).name}</b></td>

         <td  >
                    <CancelOrderButton disabled={(order?.states[1].confirmed === true) ? true : false} onClick={ (e) => deleteOrder(e,order._id)}>
Cancelar Pedido
                    </CancelOrderButton>
           </td>
        </tr>

    )}

  </tbody>
 
</OrdersTable> 
:
<NotFounMessage>
        <NotFounIcone >👩🏻&zwj;🍳</NotFounIcone>
        <h3>Ningún pedido realizado, tienes hambre?</h3>

      <ButtonPrimary small as={Link} to="/menu">Ver Menú</ButtonPrimary>
    </NotFounMessage>

}


</Page>
  )
}