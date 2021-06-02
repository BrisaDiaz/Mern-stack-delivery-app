  
import styled  from 'styled-components'
import {useHistory} from 'react-router-dom'
import {LoaderSpinner} from './../LoaderSpinner'
import {ButtonsWrapper} from '../menu/Menu'
import AppContext from '../../context/app-context'
import {   useContext,useEffect,useState,Fragment } from 'react'
import SearchBar from '../MenuSearchBar'
import deleteProductAPI from '../../API/deleteProductAPI'
import DashboardNav from '../DashboardNav'
import FilerProductsOptions from '../FilerProductsOptions'
import {SectionTitle,ProductsSection,NotFaundMessage} from '../menu/Menu'
import Item, {CartButton,CartIcon} from '../menu/MenuItem'
import editIcone from '../../img/pencil-alt-solid.svg'
import DeleteIcone from '../../img/trash-alt-regular.svg'

const Title = styled(SectionTitle)`
margin-bottom:40px;
`
const StyledSection = styled.main`
min-height:100vh;
width:100vw;
padding:60px 15px;
`
const FiltersBoard = styled.div`
    padding: 0 20px;
    padding-top: 40px;
    display: flex;
    align-items: center;
`;
const EditButton = styled(CartButton)`
    height: 50px;
background:  #3f51b5 ;
transform: scale(0.7);
`;
const DeleteOfDatabaseButton = styled(EditButton)`
margin:0;
background: #e83c2e;
margin-top:-50px;
    background: #e83c2e;
    margin-top: -50px;
    margin-left: auto;
    margin-right: 50px;
`
const EditIcone = styled(CartIcon)`
transform:scale(1.2);
`;
const TrashIcone = styled(EditIcone)`

`
const StyledProductsSection = styled(ProductsSection)`
margin: 20px auto;
`;


 export default function DashboardProducts(){

  let fetchCounter = 0
    let {token,setProductToEdit}  = useContext(AppContext);

 let query = new URLSearchParams();
    let sizeLimit = 6

  const[isLoading,setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [products, setProducts] = useState([])
    const [activeProducts,setActiveProducts] =useState(null)
   const [title,setTitle] =useState("")

   query.append('page',page)
   query.append('limit',sizeLimit)


  


useEffect(() => {
  const controller = new AbortController()
 const signal = controller.signal
const productsAPI = async () =>{
    setIsLoading(true)
  try{
   if(title !== ""){ 
      query.append('title',title)
    }
    if(activeProducts !== "all" && activeProducts !== null){
query.append('active',activeProducts)
    }
     let res = await fetch(`/api/products?${query}`,{signal,})
     let json = await res.json()

    setProducts(json.data)

    let total = parseInt(json.total)

     setMaxPage(Math.ceil(total/sizeLimit))

     fetchCounter+=1

     setIsLoading(false)
  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

     console.log(err)
    for(let i = 0; i < 6 ;i++){
    productsAPI()

        }

  }
}
  }

  productsAPI()
   window.scrollTo(0, 0)
     return () =>{
     controller.abort()
   }   
 }, [title,activeProducts,page])


const resetQuery = () =>{
setPage(1)
setActiveProducts(null)
}

const history = useHistory()


  const handelEdit = (product) =>{
  

setProductToEdit(product);

 return history.push("/dashboard/editProduct")
  }


  return(
<StyledSection>

    <DashboardNav/>
<Title>mis productos</Title>



<SearchBar setSearch={setTitle} resetQuery={resetQuery}/>
<FiltersBoard>
<FilerProductsOptions setStatePreferece={setActiveProducts} />
</FiltersBoard>

<StyledProductsSection>

  {   ( products?.length === 0 && fetchCounter > 1) ?
  
  <NotFaundMessage>No se han encontrado coincidencias, intenta de nuevo!!</NotFaundMessage>

  :
products?.map( product => 
 <Fragment key={product._id+"abc"}>
 <Item  key={product._id} item={product}>
   <Fragment>
<EditButton  onClick={ () =>handelEdit(product)} >
     <EditIcone src={editIcone} alt="edit"></EditIcone>
   </EditButton>

   <DeleteOfDatabaseButton  onClick={ () =>deleteProductAPI(token,product._id,setProducts)}>
   <TrashIcone src={DeleteIcone} alt="delete"/>
   </DeleteOfDatabaseButton>
   </Fragment>
   
   </Item>
    
 </Fragment>
  )
       
  
}
</StyledProductsSection>

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
</StyledSection>
  )
}



