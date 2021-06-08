
import useDashboarOrderDetails from '../../hooks/useDashboarOrderDetails'
import {useParams} from 'react-router-dom'
import AdminOrderStateChart from './AdminOrderStateChart'
import AppContext from '../../context/app-context'
import {Fragment,useContext,useEffect,useState} from 'react'
import {GoBackLink} from '../product_details/ProductDetails'
import {Page,CenterTitle,DetailTable,ClientInfo} from '../account/OrderDetails'



export default function OrderDetails(){

const {setIsLoading,token,isLoading} = useContext(AppContext)
 const {thisOrder,isRefreshing,setIsRefreshing} = useDashboarOrderDetails({setIsLoading,token})

 
  return(
    
<Page>
{(isLoading) ? null 
:
 <Fragment>
    <GoBackLink to="/dashboard/orders" >Regresar</GoBackLink>

  <CenterTitle>Nº ID:<span>{thisOrder?.orderID}</span></CenterTitle>

<AdminOrderStateChart  
states={thisOrder?.states}
orderId={thisOrder?._id}
makeRefresh={setIsRefreshing}
refreshState={isRefreshing}
/>


      <hr></hr>
   <CenterTitle>Detalles de envio</CenterTitle>

    <ClientInfo>
      <p><b>Destinatario:</b>{thisOrder?.client[0]?.name}</p>
    <p><b>Dirrección:</b>{thisOrder?.client[0]?.address}</p>
       <p><b>Teléfono:</b>{thisOrder?.client[0]?.number}</p>
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
     <tr>
     <td colSpan="4">
       <h4><span>Total:</span>${thisOrder?.total}</h4>
       </td>
       </tr>
   </tfoot>
 </DetailTable>
 </Fragment>
}
</Page>

     
  );
}