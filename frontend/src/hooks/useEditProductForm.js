import  updateProductAPI from '../API/updateProductAPI'
import {useForm} from 'react-hook-form'
import {  useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';

export default function useEditProductForm({
token,
productToEdit,
productsAPI,
setIsSuccessfullySend
}){
        const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

   const history = useHistory()

const [nameValue, setNameValue] = useState(productToEdit.name)
const [categoryValue, setCategoryValue] = useState(productToEdit.category)
const [priceValue, setPriceValue] = useState(productToEdit.price)
const [sizeValue, setSizeValue] = useState(productToEdit.size )
const [descriptionValue, setDescriptionValue] = useState(productToEdit.description )

let id= productToEdit._id


useEffect(() => {
 setNameValue (productToEdit.name)
setCategoryValue (productToEdit.category)
 setPriceValue (productToEdit.price)
setSizeValue (productToEdit.size )
setDescriptionValue(productToEdit.description)

}, [productToEdit])
 
 function onSubmit(data,e) {

  e.preventDefault()

   const formData = new FormData()
      let active =  e.target.state.checked ? true : false ;


          formData.append('img',e.target.img.files[0])
        formData.append('name', nameValue)
        formData.append('category', categoryValue)
        formData.append('size', sizeValue)
        formData.append('description', descriptionValue)
        formData.append('price', priceValue)
        formData.append('active', active)

updateProductAPI({
    token,
    formData,
    id,
    nameValue,
categoryValue,
sizeValue,
descriptionValue,
priceValue,
setIsSuccessfullySend,
productsAPI,
history
})

  }

return { 
  register ,
  handleSubmit, 
  errors, 
  onSubmit,
setNameValue,
setCategoryValue,
setPriceValue,
setSizeValue,
setDescriptionValue,
nameValue,
categoryValue,
priceValue,
sizeValue,
descriptionValue,

}

}
