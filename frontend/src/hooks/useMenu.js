import { useEffect, useState } from 'react'
import {useStorage} from '../context/useStorage'



export default function useMenu(){

    const {categories} = useStorage()
    
 let populatedCategories = categories?.filter(category => category?.quantity > 0)

  let query = new URLSearchParams();
  let sizeLimit = 6
  let activeProducts = true
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  let [products, setProducts] = useState([])
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


document.querySelector('body').scrollTo(0,100)
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
 
    return () => {
      controller.abort()
    }
  }, [title,sorting,page,category])


  const resetQuery = () => {
    setPage(1)
    setSorting('-createdAt')
    setCategory('all')
  }


return {isLoading, maxPage, products,populatedCategories,page,setPage,  setCategory, setSorting,setTitle,resetQuery}

}