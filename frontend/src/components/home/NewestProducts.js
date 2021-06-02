import styled  from 'styled-components'
import {   useEffect,useState} from 'react'
import Item  from '../menu/MenuItem'
import {SectionTitle,
ProductsSection} from '../menu/Menu'
import {LoaderSpinner} from './../LoaderSpinner'

const StyledNewestProducts= styled.section`
width:100vw;
text-aling:center;
`
const ProductsWrapper=styled(ProductsSection) `
height:100%;
align-items:center;
margin-bottom: 30px;
`;

export default function NewestProducts(){

 
  const [isLoading,setIsloading] = useState(false);
 const [latestProducts,setLatestProducts] =useState([])

  useEffect(()=>{
let controller = new AbortController()
 const signal = controller.signal
    const fetchLatestProducts = async () =>{
      setIsloading(true)
      try{
 let res = await fetch('api/products?active=true&sort=-createdAt&page=1&limit=6',{signal,})
let json = await res.json()

setLatestProducts([...json.data])
setIsloading(false)
      }catch(err){
 if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

   console.log(err)
    for(let i = 0; i < 6 ; i++){
          fetchLatestProducts()

        }
       

      }
       }
    }
   fetchLatestProducts()

   return () =>{
     controller.abort()
   }   
  },[])

  return(


   
   <StyledNewestProducts>
  <SectionTitle>Últimas Novedades</SectionTitle>

{    
(isLoading )? <LoaderSpinner small/>
  :
  <ProductsWrapper>
    {latestProducts.map( product => {
 
 return <Item key={product._id} item={product}></Item>
    }
    
      )}
 
  </ProductsWrapper>
}
</StyledNewestProducts>



  );
}