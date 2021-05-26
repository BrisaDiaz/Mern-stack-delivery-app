import {useState} from 'react'
 import updateCategoryNameAPI from '../API/updateCategoryNameAPI'
import deleteCategoryAPI  from '../API/deleteCategoryAPI'
import createCategoryAPI from '../API/createCategoryAPI'
export default function useCategoriesForms({categories,setIsSuccessfullySend,token,setAllCategories}){
    
 const [editingCategory,setEditingCategory] = useState('categoria')
   const [isRenameFormLoading, setIsRenameFormLoading] = useState(false)
      const [isCreateFormLoading, setIsCreateFormLoading] = useState(false)
 let categorySelectId = categories?.find(category => category.name === editingCategory )?._id

const handleDelete = (e) =>{
  e.preventDefault()
 e.stopPropagation()
 const confirmation =window.confirm('Al eliminar la categoría se eliminarn todos los productos de la misma, está deguro?')

if(confirmation) {
  deleteCategoryAPI({categorySelectId,token,setAllCategories})
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
createCategoryAPI({token,info,setAllCategories,setIsCreateFormLoading,setIsSuccessfullySend})

}
  return {handleRenameSubmit,handleCreateSubmit,setEditingCategory,editingCategory,
handleDelete,isRenameFormLoading,isCreateFormLoading} 
  
}