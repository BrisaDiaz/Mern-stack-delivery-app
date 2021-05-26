import styled  from 'styled-components'
import {  useContext} from 'react'
import AppContext from '../../context/app-context'
import useEditProductForm from '../../hooks/useEditProductForm'
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
DropZone,
OptionList,
Option
} from './CreateNewProductForm'
import editIcone from '../../img/pencil-edit-form.svg'


const EditIcone = styled(Logo)` 
transform:scale(0.75);
`


export default function UpdateNewProductForm() {

    const {productsAPI,token,productToEdit,setIsSuccessfullySend,categories}  = useContext(AppContext);
const {register ,handleSubmit, errors, onSubmit,setNameValue,setCategoryValue,setPriceValue,setSizeValue,setDescriptionValue,nameValue,categoryValue,
priceValue,sizeValue,descriptionValue
} = useEditProductForm({token,
productToEdit,
productsAPI,
setIsSuccessfullySend})
 
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


    {errors.category && <ErrorMessage  role="alert">{errors.category.message}</ErrorMessage>}
<OptionList 
name="category"
    style={{ borderColor: errors.category && "#bf0000" }  }
                  
         onChange = {(e) => setCategoryValue(e.target.value)}
          ref={register({
       required: '*El campo es requrido',
    
          })}
>
  {categories?.map(cat =>

<Option key={cat?._id } value={cat?.name}  

selected = {categoryValue?.toLowerCase() === cat?.name ? true : false}


>{cat?.name}</Option>

  )}

</OptionList>

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