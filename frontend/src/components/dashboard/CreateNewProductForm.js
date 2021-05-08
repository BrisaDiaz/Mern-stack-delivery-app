import styled  from 'styled-components'
import {useForm} from 'react-hook-form'
import AppContext from '../../context/app-context'
import {Fragment ,useContext} from 'react'
import {ErrorMessage} from '../auth/SingupForm'
import trayIcon from '../../img/tray.svg';

import {
  FormCard,
Form,
Logo
} from '../auth/SingupForm'
import {ButtonPrimary,Button} from '../Buttons'


 export const StyledSection = styled.section`
position:relative;
z-index:1;
min-height:100vh;
width:100vw;
margin-top:40px;
background-size: 100%  100%;
`;
export const FormTitle= styled.h2`
color: #ffa500;
text-transform: uppercase;
    text-shadow: 3px 0 2px #000000a1;
font-size: 25px;

margin-bottom: 20px;
margin-top: -10px;
@media screen and (min-width:760px){

  font-size: 45px;
}
`;

const CheckboxWrapper = styled.div`
display:flex;
margin: 10px auto;
align-items:center;
&> input{
transform: scale(1.5);
    margin: 0 10px;
    cursor: pointer;
}
& > small {
  margin-left: 5%;
}
& > input[type="file"]{
  width:50%;
}
& > label{
font-weight:600;
font-size:20px;
}
`;
export const ThisFormCard = styled(FormCard)`
width:100vw;
margin-top:-20px;
background:#fff;
box-shadow:none;
`
export const  ThisForm = styled(Form)`
max-width:90%;
width:90%;
& > input {
  background :#f0f0f0;

}
`
 export const TextInput= styled.input.attrs(props => ({
  type: 'text',


}))`

  &::placeholder {
   font-weight: 500;
   font-size: 17px;

   letter-spacing: 1px;

  }
background:#f0f0f0;
  border:none;
  border-radius:5px;
  outline:none;
    margin-bottom:15px;
  width:95%;
padding: 12px 10px 12px 20px;

`;
export const ButtonsWrapper = styled.div`
display:flex;
trasform:${(props) => (props.small ? "scale(0.8)" : "scale(1)")};

`;
export const LoadButton = styled(ButtonPrimary)`
margin: 0 5px;
transform:scale(0.9);
`

export const ResetButton = styled(Button)
`
  box-shadow: 0 0 4px rgba(0,0,0,0.5);
transform:scale(0.9);
margin: 0 5px;
outline:none;
border:none;
`
 export const Description =styled.textarea`

width:90%;
  border:none;
  outline:none;
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
padding: 12px 10px 12px 20px;
height: 200px;
border:none;
background:#f0f0f0;
border-radius: 5px;
  &::placeholder {
   font-weight: 500;
   font-size: 17px;

   letter-spacing: 1px;

  }
`
 export const DropZone = styled.input`
  box-shadow: 0 0 4px rgba(0,0,0,0.5);
  position:relative;
max-width: 50%;
  height: 45px;
  display: inline-block; 
  margin:25px auto;
  cursor:pointer;
  outline:none;
transition: all 0.5s ease;
  &:before{
     background-color: #000000;
  color: white;
  display: flex;            
  justify-content: center;
  font-size:17px;
  font-weight:600;
  align-items: center;
  border-radius: 3px;
  content: 'Seleccionar Imagen'; 
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; 
  
  }
    &:hover{
      transform:scale(1.1);
    }
  `;
export function ProductNameInput({register,errors}){

  return(
    <Fragment>
        {errors.name && <ErrorMessage  role="alert">{errors.name.message}</ErrorMessage>}

 <TextInput 
 style={{ borderColor: errors.productName && "#bf0000" }  }
          placeholder="Nombre..."
 
                       name="name"
          ref={register({
             required: '*El campo es requrido',
    
          })}
          />
              

    </Fragment>
             
  )
}

export function ProductCategoryInput({register,errors}){

  return(
    <Fragment>
            {errors.category && <ErrorMessage  role="alert">{errors.category.message}</ErrorMessage>}
                 <TextInput
                  style={{ borderColor: errors.category && "#bf0000" }  }
                    placeholder="Categoría..."
                    name="category"
         
          ref={register({
       required: '*El campo es requrido',
    
          })}
         />
              

    </Fragment>
             
  )
}

export function ProductSizeInput({register,errors}){

  return(
    <Fragment>
          {errors.size && <ErrorMessage  role="alert">{errors.size.message}</ErrorMessage>}
          <TextInput 
           style={{ borderColor: errors.size && "#bf0000" }  }
          placeholder="Cantidad/Tamaño..."
                      name="size"
                
          ref={register({
              required:'*El campo es requerido' ,
             pattern:{
               value: /^(?:[0-9]+\s\w+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i,
              message:'*Se require de un valor y unidad'
             }
          })}
          />

    </Fragment>
             
  )
}

export function ProductDescriptionTextArea({register,errors}){

  return(
    <Fragment>
           {errors.description && <ErrorMessage  role="alert">{errors.description.message}</ErrorMessage>}
      <Description 
      placeholder="Descripción..."
       style={{ borderColor: errors.description && "#bf0000" }  }
          
                      name="description"
                
          ref={register({
              required:'*El campo es requerido' ,
          
          })}
      >

      </Description>
    </Fragment>
  );

}
export function ProductPriceInput({register,errors}){

  return(
    <Fragment>
         {errors.productPrice && <ErrorMessage  role="alert">{errors.productPrice.message}</ErrorMessage>}
    
   
             <TextInput placeholder="Precio..."
           style={{ borderColor: errors.productPrice && "#bf0000" }  }
                 name="price"
                  ref={register({ 
                    required:'*El campo es requerido' ,
                  pattern:{
               value:  /\d+/,
               message:'*Se admiten solo números'
               }
                  })}

      
          
          
          />

    </Fragment>
             
  )
}
 export function ImageUploader({register,errors}){




  return(
    <Fragment>
      {errors.productImg && <ErrorMessage  role="alert">*El Campo es requerido</ErrorMessage>}

          <DropZone id="imgInput" type="file" name="img"    ref={register({
             required: true,
              
          })}></DropZone>

    </Fragment>
             
  )
}
export function FormButtons(){
    return(
          <ButtonsWrapper >
<LoadButton as="input" type="submit" value="Cargar"/>
<ResetButton as="input" type="reset" value="Abortar"/>
          </ButtonsWrapper>
    )
  }
export function ProductState(){
    return(
          <CheckboxWrapper >
<label for="state">Publicar:</label>
<input
id="state" type="checkbox" name="state"></input>
          </CheckboxWrapper>
    )
  }
export default function UpdateNewProductForm() {
    const {createNewProduct,token}  = useContext(AppContext);
 const { register, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur",
});
    
 const onSubmit = async (data,e) =>{

        e.preventDefault()
        createNewProduct(token,e)
      

  }
  
 
  return(
    <StyledSection>
   
      <ThisFormCard>
  <Logo src = {trayIcon} alt="new-product"></Logo>
        <ThisForm enctype="multipart/form-data"  method="post" onSubmit={handleSubmit(onSubmit)}>
             <FormTitle>Cargar nuevos productos</FormTitle>
                   
  <ProductNameInput register={register} errors={errors}/>
            
         <ProductCategoryInput register={register} errors={errors}/>

         
<ProductSizeInput register={register} errors={errors}/>
                
<ProductPriceInput register={register} errors={errors}/>
<ProductDescriptionTextArea register={register} errors={errors}  />

<ProductState/>
  


      <ImageUploader  register={register} errors={errors}/>     

 <FormButtons/>
      

        </ThisForm>
      </ThisFormCard>
    </StyledSection>
  );
}