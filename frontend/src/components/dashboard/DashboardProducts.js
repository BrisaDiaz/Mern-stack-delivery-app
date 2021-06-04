  
import styled  from 'styled-components'
import {useHistory} from 'react-router-dom'
import {LoaderSpinner} from './../LoaderSpinner'
import {ButtonsWrapper} from '../menu/Menu'
import AppContext from '../../context/app-context'
import {   useContext,useEffect,useState,Fragment } from 'react'
import SearchBar from '../MenuSearchBar'
import deleteProductAPI from '../../API/deleteProductAPI'
import DashboardNav from '../DashboardNav'
import FilterProductsStateOptions from '../FilterProductsStateOptions'
import FilterCategoryOptions from '../FilterCategoryOptions'
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
      padding: 40px 0 0;
    display: flex;
    width: fit-content;
    align-items: center;
 justify-content: flex-start;
flex-wrap: wrap;
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


  
    let {categories,token,setProductToEdit}  = useContext(AppContext);

 let populatedCategories = categories?.filter(category => category?.quantity > 0)

 let query = new URLSearchParams();
    let sizeLimit = 6

 
  const [category, setCategory] = useState("all")
  const[isLoading,setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    let [products, setProducts] = useState(null)
    let [activeProducts,setActiveProducts] =useState('all')
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
      if (category !== "all") {
        query.append('category', category)
      }

    if(activeProducts !== "all"){
query.append('active',activeProducts)
    }
     let res = await fetch(`/api/products?${query}`,{signal,})
     let json = await res.json()

    setProducts(json.data)

    let total = parseInt(json.total)

     setMaxPage(Math.ceil(total/sizeLimit))



     setIsLoading(false)
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
 }, [title,activeProducts,page,category])


     
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
  <FilterCategoryOptions categories={populatedCategories} setCategoryPreferece={setCategory} setPage={setPage} />

<FilterProductsStateOptions setPage={setPage} setStatePreferece={setActiveProducts} />

</FiltersBoard>

<StyledProductsSection>

  {   ( (products)   &&  products?.length === 0) ?
  
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



