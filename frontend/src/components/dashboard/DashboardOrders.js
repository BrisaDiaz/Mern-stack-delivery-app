import styled  from 'styled-components'
import {useHistory} from 'react-router-dom'
import DashboardNav from '../DashboardNav'
import AppContext from '../../context/app-context'
import {   useContext,useState, useEffect } from 'react'
import refreshIcone from '../../img/refresh.svg'
import SearchBar from '../MenuSearchBar'
import {RefreshButton,RefreshIcone} from '../account/MyOrdersPage'
import {LoaderSpinner} from './../LoaderSpinner'
import {ButtonsWrapper,NotFaundMessage,SectionTitle} from '../menu/Menu'
import {FiltersBoard} from './DashboardProducts'
import FilterOrderStateOptions from './../FilterOrderStateOptions'
import SortOrdersOptions from './../SortOrdersOptions'

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
const {token,setIsLoading} = useContext(AppContext)

const seeDetails = (orderID) =>{
      setIsLoading(true)
 history.push(`/dashboard/orders/${orderID}` )
}

 let query = new URLSearchParams();
    let sizeLimit = 5



  const [orderID, setOrderID] = useState("")
  const[isLoading,setIsLoadingPage] = useState(false)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [orders, setOrders] = useState(null)
    const [state,setState] =useState('all')
  const [sorting, setSorting] = useState("-createdAt")

   query.append('page',page)
   query.append('limit',sizeLimit)
   query.append('sort',sorting)

  


useEffect(() => {
  const controller = new AbortController()
 const signal = controller.signal
const productsAPI = async () =>{
    setIsLoadingPage(true)
  try{
   if(orderID !==""){ 
      query.append('orderID',orderID)
    }

    if(state !=="all"){
query.append('state',state)
    }

       const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


    const setting = {
          method: 'GET',
          headers: headers,
signal,
        }

     let res = await fetch(`/api/orders?${query}`,setting)
     let json = await res.json()

    setOrders(json.data)

    let total = parseInt(json.total)

     setMaxPage(Math.ceil(total/sizeLimit))



     setIsLoadingPage(false)
  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

     console.log(err)

  }
}
  }

  productsAPI()
   window.scrollTo(0, 0)
     return () =>{
     controller.abort()
   }   
 }, [orderID,state,page,sorting])

     
const resetQuery = () =>{
setPage(1)
setState('all')
}

  const handleRefresh = () =>{
  return history.push(`/dashboard/orders`)
}

  return(
<Page>
     <DashboardNav/>
     <SectionTitle>Pedidos</SectionTitle>
     <RefreshButton onClick={(e) =>handleRefresh()}>
  <RefreshIcone src={refreshIcone} title='Refrescar Página'/>
  </RefreshButton>
<SearchBar placeholder='Número de orden...' setSearch={setOrderID} resetQuery={resetQuery}/>
<FiltersBoard>
          <FilterOrderStateOptions setPage={setPage} setStatePreferece={setState}/>
          <SortOrdersOptions setSortPreferece={setSorting} sortPreference={sorting} />
        </FiltersBoard>

  {   ( (orders)   &&  orders?.length === 0) ?
  
  <NotFaundMessage>No se han encontrado coincidencias, intenta de nuevo!!</NotFaundMessage>

  :
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
 
</OrdersTable> }

{isLoading ? <LoaderSpinner small/> : 
<ButtonsWrapper>
{
(page > 1) ?  <button onClick={(e) => setPage(page -1)} >
Prev</button> : null
}
{
(page < maxPage) ?  <button onClick={(e) => setPage(page + 1)} >
Next</button> : null
}
</ButtonsWrapper>
}
</Page>
  )
}