import {useState,useEffect} from 'react'
import {useStorage} from '../context/useStorage'
 import updateCategoryNameAPI from '../API/updateCategoryNameAPI'
import deleteCategoryAPI  from '../API/deleteCategoryAPI'
import createCategoryAPI from '../API/createCategoryAPI'


 
export default function useCategoriesForms(){

   const {categories,setIsSuccessfullySend,token,setAllCategories} = useStorage()

 const [editingCategory,setEditingCategory] = useState('categoria')
   const [isRenameFormLoading, setIsRenameFormLoading] = useState(false)
      const [isCreateFormLoading, setIsCreateFormLoading] = useState(false)

  const [categorySelectId,setCategorySelectId] = useState('')


useEffect(()=>{

let categoryId = categories?.find(category => category.name === editingCategory )?._id

setCategorySelectId(categoryId)

},[editingCategory,categories])




const handleDelete =async (e) =>{
  e.preventDefault()
 e.stopPropagation()
 const confirmation =window.confirm('Al eliminar la categoría se eliminarn todos los productos de la misma, está deguro?')

if(confirmation) {
  await deleteCategoryAPI({categorySelectId,token,setAllCategories})
  setEditingCategory('category')
  return
}

}


const handleRenameSubmit = (e) =>{
 e.preventDefault()
 e.stopPropagation()

   const info ={
categoryNewName : e.target.categoryNewName.value.trim()
   }

  updateCategoryNameAPI({categorySelectId,info,setIsRenameFormLoading,setIsSuccessfullySend,token,setAllCategories})
setEditingCategory('category')
}
const handleCreateSubmit = (e) =>{
e.preventDefault()
 e.stopPropagation()
const info = {
  category: e.target.newCategory.value.trim()
}
createCategoryAPI({token,info,setAllCategories,setIsCreateFormLoading,setIsSuccessfullySend,e})

}
  return {handleRenameSubmit,handleCreateSubmit,setEditingCategory,editingCategory,
handleDelete,isRenameFormLoading,isCreateFormLoading,categories} 
  
}