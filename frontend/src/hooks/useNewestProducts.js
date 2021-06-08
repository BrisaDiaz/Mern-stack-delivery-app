import {   useEffect,useState} from 'react'


export default function useNewestProducts(){
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
    for(let i = 0 ; i < 6 ; i++){
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


  return {isLoading,latestProducts}
}