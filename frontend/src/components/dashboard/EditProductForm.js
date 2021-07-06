import styled  from 'styled-components'
import useEditProductForm from '../../hooks/useEditProductForm'
import {LoaderSpinner} from './../LoaderSpinner'
import {Logo} from '../auth/SingupForm'
import {ThisFormCard, ThisForm,ProductDescriptionTextArea,ProductSizeInput,ProductPriceInput,CategoriesOptionsInput,ProductNameInput,ImageUploader,FormButtons,  StyledSection,FormTitle,
ProductState,} from './CreateNewProductForm'
import editIcone from '../../img/pencil-edit-form.svg'


const EditIcone = styled(Logo)`
transform:scale(0.75);
`


export default function UpdateNewProductForm() {

const {categories,register ,handleSubmit, errors, onSubmit,productToEdit,formIsLoading
} = useEditProductForm()

  return(
    <StyledSection>

      <ThisFormCard>
        <EditIcone src = {editIcone} alt="new-product"></EditIcone>
        <ThisForm enctype="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
             <FormTitle>Editar {productToEdit?.name}</FormTitle>



  <ProductNameInput register={register} errors={errors} defaultValue={productToEdit.name}/>

<ProductSizeInput register={register} errors={errors} defaultValue={productToEdit.size} />

<ProductPriceInput register={register} errors={errors} defaultValue={productToEdit.price} />

  <CategoriesOptionsInput register={register} errors={errors} categories={categories} defaultValue={productToEdit.category}/>

<ProductDescriptionTextArea  defaultValue={productToEdit.description} register={register} errors={errors}  />



      <ImageUploader  register={register} errors={errors} isNotRequired />
<ProductState state={productToEdit?.active ? "checked" : false } />

   {formIsLoading  &&  <LoaderSpinner small /> }

     <FormButtons/>


        </ThisForm>
      </ThisFormCard>
    </StyledSection>
  );
}