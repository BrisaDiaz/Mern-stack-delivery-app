import { useEffect,useState} from 'react'
import {useParams,useLocation} from 'react-router-dom'

export default function useProductDetails({cartProducts,setIsLoading}){
let location = useLocation()
let search = new URLSearchParams(location.search);

let goBackPath = search.get("from");

const [isLoaded,setIsLoaded] = useState(false)
 const [thisProductInfo,setThisProductInf] = useState({})
 const {productId}=  useParams()


 useEffect(()=>{

    setIsLoading(true)

  const controller = new AbortController()
 const signal = controller.signal

  const fechProducts = async () =>{
  try{

     let res = await fetch(`/api/products/${productId}`,{signal,})
     let json = await res.json()

    setThisProductInf(json.data)
     setIsLoading(false)

  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

     console.log(err)
    for(let i = 0; i < 6 ;i++){
    fechProducts()

        }

 
  }
}
  }
  fechProducts()
 
  return () =>{
     controller.abort()
   }   
   
 },[productId])

 
let isInShoppingCart = cartProducts.find(product => product.info._id === thisProductInfo?._id) ? true : false

return{ isInShoppingCart,isLoaded,thisProductInfo,goBackPath,setIsLoaded}

}