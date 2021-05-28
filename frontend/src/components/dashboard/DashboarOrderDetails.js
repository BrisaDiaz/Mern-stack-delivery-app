import styled  from 'styled-components'
import {useParams} from 'react-router-dom'
import updateOrderStateAPI from '../../API/updateOrderStateAPI'
import AppContext from '../../context/app-context'
import {   useContext } from 'react'
import {GoBackLink} from '../product_details/ProductDetails'
import {Page,CenterTitle,DetailTable,Process,ProcessInfo,ClientInfo} from '../account/OrderDetails'

const ConfirmationButton = styled.button`
    cursor: pointer;
    padding: 4px 5px 5px;
    margin-top: 5px;
    outline: none;
    border: none;
    border-radius: 5px;
    background: #fcba1c;
    color: white;
    font-family: 'Oswald';
    transition: all 0.3s ease;
    opacity: ${(props) =>(props.disabled ? "0.5" : "1")};
    &:hover{
      background:#fcaf01;
    }
}
`

function AdminOrderStateChart ({states,orderId}){

 const {setAllOrders,token} = useContext(AppContext)

  let nextStep = states?.find(state => state?.confirmed === false)

const handleConfirmation = (e,stateName) =>{

if(!e.target.disabled) return updateOrderStateAPI({token,orderId,stateName,setAllOrders})

return
}

  return(

   <Process>
{states?.map( (state,index ) =>

    (state?.confirmed) ?
  
     <ProcessInfo  key ={index}>
           <h4>{state.name}</h4>
           <small>{new Date(state?.date).toLocaleString()?.split(" ")[0]}</small>
            <small>{new Date(state?.date).toLocaleString()?.split(" ")[1]}</small>
         </ProcessInfo>
  :
       <ProcessInfo  key ={index}>
           <h4>{state?.name}</h4>
           <ConfirmationButton disabled={state !== nextStep && true} onClick={(e) =>{
             handleConfirmation(e,state?.name)
           }} >Confirmar</ConfirmationButton>
         </ProcessInfo>
  
  
  
  
  )}

   </Process>    
  );
}

export default function OrderDetails(){
let {orderID}=  useParams()
const {orders} = useContext(AppContext)
 let thisOrder = orders.find( order => order.orderID === parseInt(orderID) ) 

  return(
<Page>

    <GoBackLink to="/dashboard/orders" >Regresar</GoBackLink>

  <CenterTitle>Nº de Pedido:<span>{orderID}</span></CenterTitle>

<AdminOrderStateChart  
states={thisOrder?.states}
orderId={thisOrder?._id}
/>



   <CenterTitle>Detalles de envio</CenterTitle>

    <ClientInfo>
      <p><b>Destinatario:</b>{thisOrder?.client[0].name}</p>
    <p><b>Dirrección:</b>{thisOrder?.client[0].address}</p>
       <p><b>Teléfono:</b>{thisOrder?.client[0].number}</p>
      </ClientInfo>
      <br></br>
          <hr></hr>
           <CenterTitle>Detalles del pedido</CenterTitle>
 <DetailTable>
   <thead>
     <th>Producto</th>
          <th>Precio</th>
               <th>Unidades</th>
                <th>Total</th>
   </thead>
   <tbody>
     {thisOrder?.description?.map( productInf =>
       <tr key ={productInf?._id}>
       <td>
       <b>{productInf?.product?.name}</b>
       </td>
       <td>
 ${productInf?.product?.price}
       </td>
       <td>
  {productInf?.quantity}
       </td>
         <td>
  ${productInf?.total}
       </td>
     </tr>
      
      
      )}
    
   </tbody>
   <tfoot>
     <td colSpan="4">
       <h4><span>Total:</span>${thisOrder?.total}</h4>
       </td>
   </tfoot>
 </DetailTable>
</Page>

  );
}