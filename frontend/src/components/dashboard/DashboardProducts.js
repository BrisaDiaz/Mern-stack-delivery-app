  
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
import Item from '../menu/MenuItem'
import {CartButton,CartIcon} from '../AddToCartButton'
import editIcone from '../../img/pencil-alt-solid.svg'
import DeleteIcone from '../../img/trash-alt-regular.svg'

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
const Icone = styled(CartIcon)`
transform:scale(1.2);
`;

const StyledProductsSection = styled(ProductsSection)`
margin: 20px auto;
`;


 export default function DashboardProducts(){

  


  let {populatedCategories,isLoading,page,maxPage,products,setCategory,setTitle,resetQuery,
handleEdit,handleDelete,setPage,setActiveProducts} = useDashboardProducts( )


  return(
<StyledSection>

    <DashboardNav/>
<Title>mis productos</Title>



<SearchBar setSearch={setTitle} resetQuery={resetQuery}/>
<FiltersBoard>
  <FilterCategoryOptions categories={populatedCategories} setCategoryPreferece={setCategory} setPage={setPage} />

<FilterProductsStateOptions setPage={setPage} setStatePreferece={setActiveProducts} />

</FiltersBoard>
  {isLoading ? <LoaderSpinner /> :  null }
  
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

<ButtonsWrapper>
{
(page > 1) ?  <button onClick={(e) => setPage(page -1)} >
{'<< '}Prev</button> : null
}
{
(page < maxPage) ?  <button onClick={(e) => setPage(page + 1)} >
Next{' >>'}</button> : null
}
</ButtonsWrapper>

</StyledSection>
  )
}



