  
import styled  from 'styled-components'
import {useHistory} from 'react-router-dom'
import AppContext from '../../context/app-context'
import DeleteProductAPI from '../../API/DeleteProductAPI'
import useMenuProductsDispayer from '../../hooks/useMenuProductsDispayer'
import FilerProductsOptions from '../FilerProductsOptions'
import {   useContext , Fragment} from 'react'
import useProductStateFilter from '../../hooks/useProductStateFilter'
import {Link , LinksWrapper} from './DashboardNewProduct'
import {SectionTitle,ProductsSection,NotFaundMessage} from '../menu/Menu'
import Item, {CartButton,CartIcon} from '../menu/MenuItem'
import SearchBar from '../SearchBar'
import editIcone from '../../img/pencil-alt-solid.svg'
import DeleteIcone from '../../img/trash-alt-regular.svg'

const Title = styled(SectionTitle)`
margin-bottom:40px;
`
const StyledSection = styled.main`
min-height:100vh;
width:100vw;

padding-top:60px;
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

`;
const DeleteOfDatabaseButton = styled(EditButton)`
margin:0;
background: #e83c2e;
margin-top:-50px;
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

    let {adminSearchQuery,products,productsAPI,token,setProductToEdit,productStateFilterPreference}  = useContext(AppContext);
  const {toDisplayProducts} =useMenuProductsDispayer(adminSearchQuery,products)

   let { FilteredProducts} =useProductStateFilter(productStateFilterPreference,toDisplayProducts)

const history = useHistory()


  const handelEdit = (product) =>{
  

setProductToEdit(product);

 return history.push("/dashboard/editProduct")
  }


  return(
<StyledSection>

    <LinksWrapper>
    <Link to="/dashboard/newProduct" >Nuevo Producto</Link>/<Link to="/dashboard/users" >Usuarios</Link>
          </LinksWrapper>

<Title>mis productos</Title>



<SearchBar/>
<FiltersBoard>
<FilerProductsOptions/>
</FiltersBoard>

<StyledProductsSection>

  {   FilteredProducts.length !== 0 ?
  
FilteredProducts.map( product => 
 <Fragment key={product._id+"abc"}>
 <Item  key={product._id} item={product}>
   <Fragment>
<EditButton  onClick={ () =>handelEdit(product)} >
     <EditIcone src={editIcone} alt="edit"></EditIcone>
   </EditButton>

   <DeleteOfDatabaseButton  onClick={ () =>DeleteProductAPI(productsAPI,token,product._id)}>
   <TrashIcone src={DeleteIcone} alt="delete"/>
   </DeleteOfDatabaseButton>
   </Fragment>
   
   </Item>
    
 </Fragment>
  )
       :
  <NotFaundMessage>No se han encontrado coincidencias, intenta de nuevo!!</NotFaundMessage>
}
</StyledProductsSection>
</StyledSection>
  )
}



