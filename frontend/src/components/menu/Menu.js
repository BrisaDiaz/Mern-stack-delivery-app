import styled from 'styled-components'
import { LoaderSpinner } from './../LoaderSpinner'
import AppContext from '../../context/app-context'
import { useContext, useEffect, useState } from 'react'
import SearchBar from '../MenuSearchBar'
import SortProductsOptions from '../SortProductsOptions'
import FilterCategoryOptions from '../FilterCategoryOptions'
import Item from './MenuItem'


const StyledMenu = styled.main`
min-height:100vh;
width:100vw;
padding: 65px 15px 20px;
margin:0;
margin-bottom:20px;
text-aling:center;

`;
export const SectionTitle = styled.h2`
text-align:center;
text-transform: uppercase;
color:${(props) => (props.light ? "#fff" : "#fcba1c")};
 text-shadow: ${props => props.theme.darckTextShadow};
`;
const MenuWrapper = styled.section`
display:flex;
flex-wrap: wrap;
padding-bottom: 20px ;
   margin-left: -6px;
width:100%;

`;
const CategoryTitle = styled.h4`
    text-align: center;
    line-height: 15px;
    color: #fcba1c;
    font-size: 28px;
    margin: 10px 5px;
 text-shadow: ${props => props.theme.darckTextShadow};
    text-transform: capitalize;
&:before {
  content:".";
}
`
const SearchBarWrapper = styled.div`
width:100vw;
margin-bottom: 20px;
`;
const CategoryWrapper = styled.article`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: ${props => props.theme.darckRed};
    justify-content: center;
    margin-bottom: 20px;

    padding:  20px 15px;
    box-shadow: inset 0 0 20px 0 #1111118c;
`;
export const ProductsSection = styled.div`
    width: 100%;
    gap: 30px;
    display: grid;
    padding: 0 15px 30px;
    grid-template-columns: repeat( auto-fit,minmax(250px,300px) );
    max-width: 1000px;
    margin: 0 auto;
justify-content: center;
`;
export const NotFaundMessage = styled.h4`
margin-top: 20px;
`;

export const ButtonsWrapper = styled.div`
display:flex;
justify-content:center;
width:100%;
gap:15px;
&> button{
  padding: 5px 10px 6px;
  cursor:pointer;
  background:${props => props.theme.black};
    color:${props => props.theme.darckYellow};
box-shadow:${props => props.theme.ligthBoxShadow};
    border:transparent;
    outline:transparent;
    fornt-size:20px;
    font-family:oswald;
    lettter-spacing: 1px;
    border: 2px solid ${props => props.theme.darckYellow};
}
@media screen and (min-width:500px){
  &> button{
    transform:scale(1.1);
  }
}
`;

const FiltersBoard = styled.div`
    flex-wrap: wrap;
    padding: 20px 15px 10px;
    display: flex;
    align-items: center;
`;

export default function Menu() {



  const { categories } = useContext(AppContext);
  let populatedCategories = categories?.filter(category => category?.quantity > 0)

  let query = new URLSearchParams();
  let sizeLimit = 6
  let activeProducts = true
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  let [products, setProducts] = useState(null)
  const [category, setCategory] = useState("all")
  const [sorting, setSorting] = useState("-createdAt")
  const [title, setTitle] = useState("")

  query.append('active', activeProducts)
  query.append('sort', sorting)
  query.append('page', page)
  query.append('limit', sizeLimit)

  useEffect(() => {
    setPage(1)
  }, [sorting])


  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    setIsLoading(true)
    const fechProducts = async () => {

      if (title !== "") {
        query.append('title', title)
      }
      if (category !== "all") {
        query.append('category', category)
      }
      try {

        let res = await fetch(`/api/products?${query}`, { signal, })
        let json = await res.json()

        setProducts(json.data)

        let total = parseInt(json.total)

        setMaxPage(Math.ceil(total / sizeLimit))



        setIsLoading(false)
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch Canseled: caught abort')
        } else {

          console.log(err)
          


        }
      }
    }
    fechProducts()
    window.scrollTo(0, 0)
    return () => {
      controller.abort()
    }
  }, [title, sorting,page,category])



  const resetQuery = () => {
    setPage(1)
    setSorting('-createdAt')
  }


  return (


    <StyledMenu>

      <SectionTitle>Menú</SectionTitle>


      <MenuWrapper>



        <CategoryWrapper >
          {populatedCategories?.map((category, index) =>

            <CategoryTitle key={index}>{category.name}</CategoryTitle>

          )}
        </CategoryWrapper >


        <SearchBarWrapper>

          <SearchBar setSearch={setTitle} resetQuery={resetQuery} />
        </SearchBarWrapper>
        <FiltersBoard>
          <FilterCategoryOptions categories={populatedCategories} setCategoryPreferece={setCategory} setPage={setPage} />
          <SortProductsOptions setSortPreferece={setSorting} sortPreference={sorting} />
        </FiltersBoard>

        <ProductsSection >

          {   ( (products)   &&  products?.length === 0) ?
            <NotFaundMessage>No se han encontrado coincidencias, intenta de nuevo!!</NotFaundMessage>
            :
            products?.map(product =>

              <Item key={product._id} item={product} />)


          }


        </ProductsSection>


      </MenuWrapper>

      {isLoading ? <LoaderSpinner small /> :
        <ButtonsWrapper>
          {
            (page > 1) ? <button onClick={(e) => setPage(page - 1)} >
              Prev</button> : null
          }
          {
            (page < maxPage) ? <button onClick={(e) => setPage(page + 1)} >
              Next</button> : null
          }
        </ButtonsWrapper>
      }
    </StyledMenu>

  );
}
