
import {Fragment} from 'react'
import {useParams} from 'react-router-dom'
import AdminOrderStateChart from './AdminOrderStateChart'
import AppContext from '../../context/app-context'
import {   useContext,useEffect,useState} from 'react'
import {GoBackLink} from '../product_details/ProductDetails'
import {Page,CenterTitle,DetailTable,ClientInfo} from '../account/OrderDetails'



export default function OrderDetails(){
let {orderID}=  useParams()

const {setIsLoading,token,isLoading} = useContext(AppContext)

 const [thisOrder,setThisOrder] = useState({})
const [isRefreshing,setIsRefreshing] = useState(false)


 useEffect(()=>{

    window.scrollTo(0, 0)
  const controller = new AbortController()
 const signal = controller.signal

  const fechOrder= async () =>{
  try{

     const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


    const setting = {
          method: 'GET',
          headers: headers,
signal,
        }

     let res = await fetch(`/api/orders/${orderID}`,setting)
     let json = await res.json()

    setThisOrder(json.data)

     setIsLoading(false)

  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

     console.log(err)
    for(let i = 0; i < 6 ;i++){
    fechOrder()

        }
 
  }
}
  }

  fechOrder()
 
  return () =>{
     controller.abort()
   }   
   
 },[orderID,isRefreshing])

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