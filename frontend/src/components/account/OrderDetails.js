import styled  from 'styled-components'
import {useParams} from 'react-router-dom'
import AppContext from '../../context/app-context'
import {   useContext } from 'react'

export const Page = styled.main`
    padding: 60px 15px;
min-height:100vh;
width:100%;
max-width: 1250px;
margin: 0 auto;
text-transform: capitalize;

@media screen and (max-width: 440px){
  & > h3 {
    font-size: 20px;
}
& > h3 span{
  display:block;
}
}
`;
export const CenterTitle = styled.h3`
    text-align: center;
    margin-top: 20px;
`;
 export const DetailTable = styled.table`
width:90%;
max-width:900px;
margin: 0 auto;
    border-spacing: 15px;
    border-collapse: collapse;
    border: 2px solid #171717;
        text-transform: capitalize;
&> thead ,tfoot{
  background-color: #171717;
color: #fcba1c;

}
&>  tfoot td h4{
margin: 10px 0;
text-align:center;
}

& >tfoot td h4 span{
  margin-right:5px;
  color: #f3f3f3;
}
& >  thead th {
     padding: 10px 5px;
       font-family: "Oswald", sans-serif;
       font-size:19px;
}     
& >  tbody tr td {
   padding: 10px ;
          text-align: center;
}   
@media screen and (max-width: 400px){
      border-spacing: 0;
          width: 100%;
  & >  thead th {
  
       font-size:16px;
}    
 & >  tbody{
  font-size: 12px;
}
}
`;
export const ClientInfo = styled.div`
margin: 0 auto;
max-width:900px;
    display: flex;
    gap: 15px;
    justify-content: space-between;
    flex-wrap: wrap;
}
`;
export const Process = styled.div`
margin:20px auto;
padding:15px;
gap:15px;
  width:100%;
max-width:max-content;
min-height: 30px;
  background-color: #171717;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
      border-radius: 10px;
@media screen and(max-width:600px){

  max-width:280px;


}
`
export const ProcessInfo = styled.div`
color: #fcba1c;
display:flex;
text-align:center;
& > h4 {
  margin: 0;
}
    align-items: center;
    flex-direction: column;
`

function UserOrderStateChart ({states}){

  return(

   <Process>
{states?.map(state =>
  
     <ProcessInfo  key ={state?.date}>
           <h4>{state?.name}</h4>
           <small>{new Date(state?.date).toLocaleString()?.split(" ")[0]}</small>
            <small>{new Date(state?.date).toLocaleString()?.split(" ")[1]}</small>
         </ProcessInfo>
  
  )}

   </Process>    
  );
}


export default function OrderDetails(){
 let { orderID } = useParams()
const {currentUser} = useContext(AppContext)
console.log(parseInt(orderID))
let userOrders = currentUser?.orders
 let thisOrder =  userOrders.find( order => order.orderID  === parseInt(orderID) ) 







  return(
<Page>
  <CenterTitle>Nº de Pedido:<span>{orderID}</span></CenterTitle>


<UserOrderStateChart  
states={thisOrder?.states?.filter(state => state?.confirmed === true)}
/>





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
       <tr key ={productInf._id}>
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