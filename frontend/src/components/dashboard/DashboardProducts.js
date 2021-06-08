  
import styled  from 'styled-components'
import useDashboardProducts from '../../hooks/useDashboardProducts'
import AppContext from '../../context/app-context'
import {   useContext,Fragment } from 'react'
import SearchBar from '../MenuSearchBar'
import {LoaderSpinner} from './../LoaderSpinner'
import DashboardNav from '../DashboardNav'
import FilterProductsStateOptions from '../FilterProductsStateOptions'
import FilterCategoryOptions from '../FilterCategoryOptions'
import {SectionTitle,ProductsSection,NotFaundMessage,ButtonsWrapper} from '../menu/Menu'
import Item, {CartButton,CartIcon} from '../menu/MenuItem'
import editIcone from '../../img/pencil-alt-solid.svg'
import DeleteIcone from '../../img/trash-alt-regular.svg'

const Title = styled(SectionTitle)`
margin-bottom:40px;
`
const StyledSection = styled.main`
min-height:100vh;
width:100vw;
padding:60px 0;
`
export const FiltersBoard = styled.div`
padding: 30px 15px 0;
    display: flex;
    width: fit-content;
    align-items: center;
 justify-content: flex-start;
flex-wrap: wrap;
& > select {
      margin: 0 10px 10px auto;
   
}
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

  let {populatedCategories,isLoading,page,maxPage,products,setCategory,setTitle,resetQuery,
handleEdit,handleDelete,setPage,setActiveProducts,setProducts} = useDashboardProducts({categories,token,setProductToEdit} )


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
<EditButton  onClick={ () =>handleEdit(product)} >
     <EditIcone src={editIcone} alt="edit"></EditIcone>
   </EditButton>

   <DeleteOfDatabaseButton  onClick={ () =>handleDelete(token,product._id,setProducts)}>
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



