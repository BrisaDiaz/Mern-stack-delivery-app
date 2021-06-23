import {   useEffect,useState,useRef } from 'react'


function useNewestProducts(){
  const [isLoading,setIsloading] = useState(false);
 const [latestProducts,setLatestProducts] =useState([])

const ref = useRef(0)

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

let counter = ref.current
   console.log(err)

     if(counter < 6 ){
         fetchLatestProducts()
ref.current += 1

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
export default useNewestProducts