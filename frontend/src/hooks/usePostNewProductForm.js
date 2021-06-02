import {useForm} from 'react-hook-form'
import {useState} from 'react'
import postProductAPI from '../API/postProductAPI'


export default function usePostNewProductForm({
  token,
setIsSuccessfullySend
} ){

  const [formIsLoading,setFormIsLoading] = useState(false);

const { register, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur",
});
    
 const onSubmit =  (data,e) =>{
setFormIsLoading(true)
        e.preventDefault()

const formData = new FormData()
let active =  e.target.state.checked ? true : false ;
let price =parseInt(e.target.price.value)
        formData.append('img', e.target.img?.files[0])
        formData.append('name', e.target.name.value)
        formData.append('category', e.target.category.value)
        formData.append('size', e.target.size.value)
        formData.append('description', e.target.description.value)
        formData.append('price', price)
        formData.append('active', active)


        postProductAPI({token,e,formData,setIsSuccessfullySend,setFormIsLoading})


  }
return {register,handleSubmit,errors,onSubmit,formIsLoading }
}