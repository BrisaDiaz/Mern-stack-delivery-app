  
import styled  from 'styled-components'
import useDashboardProducts from '../../hooks/useDashboardProducts'
import ProductsSectionSkeletom from '../ProductsSectionSkeletom'
import {  Fragment } from 'react'
import SearchBar from '../MenuSearchBar'
import {LoaderSpinner} from './../LoaderSpinner'
import {NotFaundMessage,ProductsSection} from '../menu/ProductsSection'
import DashboardNav from '../DashboardNav'
import FilterProductsStateOptions from '../FilterProductsStateOptions'
import FilterCategoryOptions from '../FilterCategoryOptions'
import {SectionTitle} from '../menu/Menu'
import Item from '../menu/MenuItem'
import {CartButton,CartIcon} from '../AddToCartButton'
import PaginationButtons from '../PaginationButtons'
import editIcone from '../../img/pencil-alt-solid.svg'
import DeleteIcone from '../../img/trash-alt-regular.svg'
import { withError } from './../withError'

const Title = styled(SectionTitle)`
margin-bottom:40px;
`
const StyledSection = styled.section`
min-height:100vh;
width:100vw;
padding:60px 0;
  &:before{
    display: ${props => props.isLoading ? 'block' : 'none'};
      position:absolute;
      content:" ";
      top:0;
      left:0;
    right:0;
    bottom:0;
    background:#ffffff57;
    z-index:400;
    }
       & >${LoaderSpinner} {
  position: fixed;
    top: 50%;
    left: 50%;
    z-index: 500;
    margin: -60px 0  0 -60px ;
 
}
`
export const FiltersBoard = styled.div`
margin: 30px 15px 0;
    display: flex;
    width: fit-content;
    align-items: center;
 justify-content: flex-start;
flex-wrap: wrap;
& > select {
      margin: 0 10px 10px 0;
   
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
const Icone = styled(CartIcon)`
transform:scale(1.2);
`;

const StyledProductsSection = styled(ProductsSection)`
margin: 20px auto;
`;


 function DashboardProducts(){

  


  let {populatedCategories,isLoading,page,maxPage,products,setCategory,setTitle,
handleEdit,handleDelete,setPage,setActiveProducts,isFirstRender} = useDashboardProducts( )


  return(
<StyledSection>

    <DashboardNav/>
<Title>mis productos</Title>



<SearchBar setSearch={setTitle} />
<FiltersBoard>
  <FilterCategoryOptions categories={populatedCategories} setCategoryPreferece={setCategory}  />

<FilterProductsStateOptions  setStatePreferece={setActiveProducts} />

</FiltersBoard>

  {isLoading  && <LoaderSpinner />}

{(isLoading  && isFirstRender) ?  <ProductsSectionSkeletom/> : null}


  {   ( (!isLoading)   &&  products?.length === 0) ?
  
  <NotFaundMessage>No se han encontrado coincidencias, intenta de nuevo!!</NotFaundMessage>

  :
<StyledProductsSection isLoading={isLoading}>

{products?.map( product => 
 <Fragment key={product._id+"abc"}>
 <Item  key={product._id} item={product}>
   <Fragment>
<EditButton  onClick={ () => handleEdit(product)} >
     <Icone src={editIcone} alt="edit"/>
</EditButton>
   <DeleteOfDatabaseButton  onClick={ () =>handleDelete(product._id)}>
   <Icone src={DeleteIcone} alt="delete"/>
   </DeleteOfDatabaseButton>
   </Fragment>
   
   </Item>
    
 </Fragment>
  ) }

</StyledProductsSection>

 }
<PaginationButtons setPage={setPage} page={page} maxPage={maxPage} />

</StyledSection>
  )
}

export default withError(DashboardProducts)

