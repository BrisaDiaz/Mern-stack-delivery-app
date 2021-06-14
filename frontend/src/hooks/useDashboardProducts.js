import {useHistory} from 'react-router-dom'
import { useEffect,useState } from 'react'
import deleteProductAPI from '../API/deleteProductAPI'

export default function useDashboarProducts({categories,token,setProductToEdit}){

  
 let populatedCategories = categories?.filter(category => category?.quantity > 0)

 let query = new URLSearchParams();
    let sizeLimit = 6

 
  const [category, setCategory] = useState("all")
  const[isLoading,setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    let [products, setProducts] = useState(null)
    let [activeProducts,setActiveProducts] =useState('all')
   const [title,setTitle] =useState("")

   query.append('page',page)
   query.append('limit',sizeLimit)


  


useEffect(() => {
  const controller = new AbortController()
 const signal = controller.signal
const productsAPI = async () =>{
    setIsLoading(true)
  try{
   if(title !== ""){ 
      query.append('title',title)
    }
      if (category !== "all") {
        query.append('category', category)
      }

    if(activeProducts !== "all"){
query.append('active',activeProducts)
    }
     let res = await fetch(`/api/products?${query}`,{signal,})
     let json = await res.json()

    setProducts(json.data)

    let total = parseInt(json.total)

     setMaxPage(Math.ceil(total/sizeLimit))



     setIsLoading(false)
  }catch(err){
    if(err.name === 'AbortError'){
   console.log('Fetch Canseled: caught abort')
 }else{

     console.log(err)

  }
}
  }

  productsAPI()
   window.scrollTo(0, 0)
     return () =>{
     controller.abort()
   }   
 }, [title,activeProducts,page,category])


     
const resetQuery = () =>{
setPage(1)
setActiveProducts('all')
}

const history = useHistory()


  const handleEdit = (product) =>{
  
setProductToEdit(product);

 return history.push("/dashboard/editProduct")
  }
const handleDelete = async(token,id,setProducts) =>{
await deleteProductAPI(token,id,setProducts)

}
  return {populatedCategories,isLoading,page,maxPage,products,setCategory,setTitle,resetQuery,
handleEdit,handleDelete,setPage,setActiveProducts,setProducts}


}