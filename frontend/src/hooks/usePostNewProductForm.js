import {useForm} from 'react-hook-form'
import postProductAPI from '../API/postProductAPI'


export default function usePostNewProductForm({
  token,
setIsSuccessfullySend,
productsAPI
} ){


const { register, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur",
});
    
 const onSubmit =  (data,e) =>{

        e.preventDefault()
const formData = new FormData()
let active =  e.target.state.checked ? true : false ;

        formData.append('img', e.target.img?.files[0])
        formData.append('name', e.target.name.value)
        formData.append('category', e.target.category.value)
        formData.append('size', e.target.size.value)
        formData.append('description', e.target.description.value)
        formData.append('price', e.target.price.value)
        formData.append('active', active)
        
        postProductAPI({token,e,formData,productsAPI,setIsSuccessfullySend})


  }
return {register,handleSubmit,errors,onSubmit }
}