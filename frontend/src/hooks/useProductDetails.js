import { useEffect,useState} from 'react'
import {useParams,useLocation,useHistory} from 'react-router-dom'
import {useStorage} from '../context/useStorage'
import {useCartStorage} from '../context/cart_context/useCartStorage'


export default function useProductDetails(){

  const {setIsLoading,isLoading} = useStorage()
    const {cartProducts} = useCartStorage()

let location = useLocation()
let history = useHistory()
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

   if(res.status === 404) {
            setIsLoading(false)
      return history.push('/notFound')
     }
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

return{ isInShoppingCart,isLoaded,thisProductInfo,goBackPath,setIsLoaded,isLoading}

}