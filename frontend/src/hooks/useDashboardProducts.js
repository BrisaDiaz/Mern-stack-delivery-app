import {useHistory,useLocation} from 'react-router-dom'
import { useEffect,useState } from 'react'
import {useStorage} from '../context/useStorage'
import deleteProductAPI from '../API/deleteProductAPI'


export default function useDashboarProducts(){
const history = useHistory()
const location = useLocation()

const {categories,token,setProductToEdit}= useStorage()
  
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
const [isFirstRender, setIsFirstRender] = useState(true)

   query.append('page',page)
   query.append('limit',sizeLimit)


  


useEffect(() => {
  const controller = new AbortController()
 const signal = controller.signal
const productsAPI = async () =>{
    setIsLoading(true)
  try{

   if( isFirstRender && location.search !==""){

        query=location.search.split('?')[1]

        setIsFirstRender(false)
      }

   if(title !==""){ 
      query.append('title',title)
      setPage(1)
setActiveProducts('all')
setCategory('all')
    }

      if (category !== "all") {
        query.append('category', category)
        setPage(1)
      }

    if(activeProducts !== "all"){

query.append('active',activeProducts)
setPage(1)
    }
     let res = await fetch(`/api/products?${query}`,{signal,})
     let json = await res.json()

    setProducts(json.data)

    let total = parseInt(json.total)

     setMaxPage(Math.ceil(total/sizeLimit))

  history.push(`/dashboard/myProducts?${query}`)
document.querySelector('body').scrollTo(0,100)

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
 
     return () =>{
     controller.abort()
   }   
 }, [title,activeProducts,page,category,sizeLimit])


     




  const handleEdit = (product) =>{
  console.log(product)
setProductToEdit(product);

 return history.push("/dashboard/editProduct")
  }

const handleDelete = async(id) =>{
await deleteProductAPI(token,id,setProducts)

}
  return {populatedCategories,isLoading,page,maxPage,products,setCategory,setTitle,
handleEdit,handleDelete,setPage,setActiveProducts,setProducts}


}