import { useEffect, useState} from 'react'
import {useHistory,useLocation} from 'react-router-dom'
import {useStorage} from '../context/useStorage'



export default function useMenu(){
const history = useHistory()
const location = useLocation()
    const {categories} = useStorage()

 let populatedCategories = categories?.filter(category => category?.quantity > 0)


  let sizeLimit = 6
  let activeProducts = true

  const [oldQuery, setOldQuery] = useState( new URLSearchParams(location.search))
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(oldQuery.get('page') || 1)
  const [maxPage, setMaxPage] = useState(1)
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(oldQuery.get('category') || "all")
  const [sorting, setSorting] = useState(oldQuery.get('sort')||"-createdAt")
  const [title, setTitle] = useState(oldQuery.get('title')|| "")
const [isFirstRender, setIsFirstRender] = useState(true)

 let query ;

if(isFirstRender){
query = new URLSearchParams(oldQuery.toString())

}else{
 query = new URLSearchParams() ;
  query.append('active', activeProducts)
  query.append('sort', sorting)
  query.append('page', page)
  query.append('limit', sizeLimit)

}








  useEffect(() => {

   if (category !== "all") {
        query.append('category', category)
      }
 if (title !== "") {
      query.append('title', title)
    setSorting('-createdAt')
    setCategory('all')
      }

       setPage(1)
  }, [sorting,category,title])


  useEffect(() => {

    const controller = new AbortController()
    const signal = controller.signal
    setIsLoading(true)

    const fechProducts = async () => {

      try {

        let res = await fetch(`/api/products?${query}`, { signal, })
        let json = await res.json()

        setProducts(json.data)

        let total = parseInt(json.total)

        setMaxPage(Math.ceil(total / sizeLimit))




document.querySelector('body').scrollTo(0,100)
        setIsLoading(false)
        setIsFirstRender(false)


 return history.push(`/menu?${query}`)

      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch Canseled: caught abort')
        } else {

          console.log(err)

        }
      }
    }
    fechProducts()

    return () => {

      controller.abort()

    }
  }, [title,sorting,page,category])




return {isLoading, maxPage, products,populatedCategories,page,setPage,  setCategory, setSorting,setTitle,isFirstRender,sorting,category,title}

}