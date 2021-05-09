import styled  from 'styled-components'
import {useForm} from 'react-hook-form'
import {  useContext, useState,useEffect} from 'react'
import AppContext from '../../context/app-context'

import {ErrorMessage} from '../auth/SingupForm'
import {Logo} from '../auth/SingupForm'
import {ThisFormCard, ThisForm} from './CreateNewProductForm'
import 
{
  Description,
  StyledSection,
  FormTitle,
  TextInput,
ButtonsWrapper,
LoadButton,
ProductState,
ResetButton,
DropZone
} from './CreateNewProductForm'
import editIcone from '../../img/pencil-edit-form.svg'


const EditIcone = styled(Logo)` 
transform:scale(0.75);
`


export default function UpdateNewProductForm() {

    const {updateProduct,token,productToEdit,setIsSuccessfullySend}  = useContext(AppContext);
      const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

let [nameValue, setNameValue] = useState(productToEdit.name)
let [categoryValue, setCategoryValue] = useState(productToEdit.category)
let [priceValue, setPriceValue] = useState(productToEdit.price)
let [sizeValue, setSizeValue] = useState(productToEdit.size )
let [descriptionValue, setDescriptionValue] = useState(productToEdit.description )
let id= productToEdit._id
useEffect(() => {
 setNameValue (productToEdit.name)
setCategoryValue (productToEdit.category)
 setPriceValue (productToEdit.price)
setSizeValue (productToEdit.size )
setDescriptionValue(productToEdit.description)

}, [productToEdit])
 
async function onSubmit(data,e) {


  e.preventDefault()
    updateProduct(
  {    token,
      e,
    id,
    nameValue,
categoryValue,
sizeValue,
descriptionValue,
priceValue,
setIsSuccessfullySend
}
)

  }
 
  return(
    <StyledSection>
   
      <ThisFormCard>
        <EditIcone src = {editIcone} alt="new-product"></EditIcone>
        <ThisForm enctype="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
             <FormTitle>Editar {productToEdit.name}</FormTitle>

               {errors.productName && <ErrorMessage  role="alert">*El campo es obligario</ErrorMessage>}

 <TextInput 
 style={{ borderColor: errors.productName && "#bf0000" }  }
          placeholder="Nombre..."
                value={nameValue }
                onChange={(e)=>setNameValue(e.target.value)}
                       name="productName"
          ref={register({
             required: false,
               defaultValues : {nameValue},

          })}
          />
              
            
         {errors.productCategory && <ErrorMessage  role="alert">*El campo es obligario</ErrorMessage>}
                 <TextInput
                  style={{ borderColor: errors.productCategory && "#bf0000" }  }
                    placeholder="Categoría..."
                    name="productCategory"
         value={categoryValue}
                onChange={(e)=>setCategoryValue(e.target.value)}
          ref={register({
             required: false,
           defaultValues : {categoryValue},
          })}
         />
              
         
    {errors.size && <ErrorMessage  role="alert">*Se requiere la unidad de medida</ErrorMessage>}

          <TextInput 
           style={{ borderColor: errors.productSize && "#bf0000" }  }
           defaultValue={sizeValue}
           onChange={(e) => setSizeValue(e.target.value)}
          placeholder="Cantidad/Tamaño..."
                      name="size"
                
          ref={register({
             required: false,
             defaultValues : {sizeValue},
             pattern:{
               value: /^(?:[0-9]+\s\w+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i,

             }
          })}
          />
                
  
           {errors.productPrice && <ErrorMessage  role="alert">*Solo se admiten números</ErrorMessage>}
          <TextInput placeholder="Precio..."
           style={{ borderColor: errors.productPrice && "#bf0000" }  }
                      name="productPrice"
             value={priceValue}
           onChange={(e) => setPriceValue(e.target.value)}
          ref={register({
             required: false,
              defaultValues : {priceValue},
             pattern:{
               value: [0-9],

             }
          })}
          
          />
 {errors.description && <ErrorMessage  role="alert">{errors.description.message}</ErrorMessage>}
      <Description 
      placeholder="Descripción..."
       style={{ borderColor: errors.description && "#bf0000" }  }
                 value={descriptionValue }
                      name="description"
                   onChange={(e) => setDescriptionValue(e.target.value)}
          ref={register({
              required:'*El campo es requerido' ,
             defaultValues:{descriptionValue }
          })}
      >

      </Description>
          <DropZone type="file" name="img"   

          ref={register({
             required: false,
              
          })}></DropZone>  

<ProductState state={productToEdit.active ? "checked" : null } />
         <ButtonsWrapper>
<LoadButton as="input" type="submit" value="Cargar"/>
<ResetButton as="input" type="reset" value="Abortar"/>
          </ButtonsWrapper>
      

        </ThisForm>
      </ThisFormCard>
    </StyledSection>
  );
}