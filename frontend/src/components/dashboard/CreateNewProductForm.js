import styled from "styled-components";
import usePostNewProductForm from "../../hooks/usePostNewProductForm";
import { Fragment } from "react";
import { LoaderSpinner } from "./../LoaderSpinner";
import { ErrorMessage } from "../contact/ContactForm";
import trayIcon from "../../img/tray.svg";
import { FormCard, Form, Logo } from "../auth/SignupForm";
import { ButtonPrimary, Button } from "../Buttons";

export const StyledSection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  margin: 0 0 40px;
  background-size: 100% 100%;
`;
export const FormTitle = styled.h2`

text-transform: uppercase;

}
font-size: 25px;

margin-bottom: 20px;
margin-top: -10px;
@media screen and (min-width:760px){

  font-size: 45px;
}
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  margin: 10px auto;
  align-items: center;
  & > input {
    transform: scale(1.5);
    margin: 5px 10px 0;
    cursor: pointer;
  }

  & > small {
    margin-left: 5%;
  }
  & > input[type="file"] {
    width: 50%;
  }
  & > label {
    font-weight: 600;
    font-size: 20px;
  }
`;
export const ThisFormCard = styled(FormCard)`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  box-shadow: none;
`;
export const ThisForm = styled(Form)`
  max-width: 95%;
  width: 95%;
  margin: 0 auto;
  & > input {
    background: #f0f0f0;
  }

  & > input:focus,
  & > textarea:focus {
    outline: 2px solid #ccc;
    outline-style: auto;
  }
`;
export const TextInput = styled.input.attrs((props) => ({
  type: "text",
}))`
  &::placeholder {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 1px;
  }
  background: #f0f0f0;
  border: none;
  border-radius: 5px;
  outline: none;
  margin-bottom: 15px;
  width: 95%;
  padding: 12px 15px;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 450px) {
    & > input {
      transform: scale(0.8);
    }
  }
`;
export const LoadButton = styled(ButtonPrimary)`
  transform: scale(0.9);
`;
export const ResetButton = styled(Button)`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  transform: scale(0.9);
  outline: none;
  border: none;
`;
export const Description = styled.textarea`
  max-width: 90%;
  width: 90%;
  border: none;
  outline: none;
  box-shadow: inset 1px 1px 6px 0px #ccc;
  padding: 12px 10px 12px 20px;
  min-height: 200px;
  max-height: 200px;
  border: none;
  background: #f0f0f0;
  border-radius: 5px;
  &::placeholder {
    font-weight: 500;
    font-size: 17px;
    letter-spacing: 1px;
  }
  @media screen and (max-width: 500px) {
    min-width: 95%;
  }
`;
export const DropZone = styled.input`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  position: relative;
  max-width: 50%;
  min-width: 200px;
  height: 45px;
  display: inline-block;
  margin: 25px auto;
  cursor: pointer;
  outline: none;
  transition: all 0.5s ease;
  &:before {
    background-color: ${(props) => props.theme.black};
    color: white;
    display: flex;
    justify-content: center;
    font-size: 17px;
    font-weight: 600;
    align-items: center;
    border-radius: 3px;
    content: "Seleccionar Imagen";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const OptionList = styled.select`
  color: rgb(0 0 0 / 50%);
  padding: 10px;
  width: 90%;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  margin: 0;
  border: none;
  margin-bottom: 20px;
  background: #f3f3f3;
  box-shadow: ${(props) => props.theme.inputShadow};
  text-transform: capitalize;
  @media screen and (max-width: 500px) {
    min-width: 95%;
  }
`;
export const Option = styled.option`
  &:checked {
    background: #fcba1c;
  }
`;
export function CategoriesOptionsInput({ register, categories, defaultValue }) {
  return (
    <OptionList
      name="category"
      defaultValue={defaultValue || categories[0]}
      ref={register({
        required: "*El campo es requrido",
      })}
    >
      {categories?.map((cat) => (
        <Option key={cat?._id} value={cat?.name}>
          {cat?.name}
        </Option>
      ))}
    </OptionList>
  );
}
export function ProductNameInput({ register, errors, defaultValue }) {
  return (
    <Fragment>
      {errors.name && (
        <ErrorMessage role="alert">{errors.name.message}</ErrorMessage>
      )}

      <TextInput
        style={{ borderColor: errors.productName && "#bf0000" }}
        placeholder="Nombre..."
        data-testid="name"
        defaultValue={defaultValue || ""}
        name="name"
        ref={register({
          required: "*El campo es requrido",
        })}
      />
    </Fragment>
  );
}

export function ProductSizeInput({ register, errors, defaultValue }) {
  return (
    <Fragment>
      {errors.size && (
        <ErrorMessage role="alert">{errors.size.message}</ErrorMessage>
      )}
      <TextInput
        style={{ borderColor: errors.size && "#bf0000" }}
        placeholder="Cantidad/Tamaño..."
        data-testid="size"
        name="size"
        defaultValue={defaultValue || ""}
        ref={register({
          required: "*El campo es requerido",
          pattern: {
            value: /^(?:[0-9]+\s\w+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i,
            message: "*Se require de un valor y unidad",
          },
        })}
      />
    </Fragment>
  );
}

export function ProductDescriptionTextArea({ register, errors, defaultValue }) {
  return (
    <Fragment>
      {errors.description && (
        <ErrorMessage role="alert">{errors.description.message}</ErrorMessage>
      )}
      <Description
        placeholder="Descripción..."
        style={{ borderColor: errors.description && "#bf0000" }}
        defaultValue={defaultValue || ""}
        name="description"
        data-testid="description"
        ref={register({
          required: "*El campo es requerido",
        })}
      ></Description>
    </Fragment>
  );
}
export function ProductPriceInput({ register, errors, defaultValue }) {
  return (
    <Fragment>
      {errors.productPrice && (
        <ErrorMessage role="alert">{errors.productPrice.message}</ErrorMessage>
      )}

      <TextInput
        placeholder="Precio..."
        style={{ borderColor: errors.productPrice && "#bf0000" }}
        name="price"
        data-testid="price"
        defaultValue={defaultValue || ""}
        ref={register({
          required: "*El campo es requerido",
          pattern: {
            value: /\d+/,
            message: "*Se admiten solo números",
          },
        })}
      />
    </Fragment>
  );
}
export function ImageUploader({ register, errors, isNotRequired }) {
  return (
    <Fragment>
      {errors.productImg && (
        <ErrorMessage role="alert">*El Campo es requerido</ErrorMessage>
      )}

      <DropZone
        id="imgInput"
        type="file"
        name="img"
        ref={register({
          required: isNotRequired ? false : true,
        })}
      ></DropZone>
    </Fragment>
  );
}
export function FormButtons() {
  return (
    <ButtonsWrapper>
      <LoadButton as="input" type="submit" value="Cargar" />
      <ResetButton as="input" type="reset" value="Abortar" />
    </ButtonsWrapper>
  );
}
export function ProductState(props) {
  let state = props?.state || false;

  return (
    <CheckboxWrapper>
      <label htmlFor="state">Publicar:</label>
      <input id="state" type="checkbox" defaultChecked={state} name="state" />
    </CheckboxWrapper>
  );
}
export default function UpdateNewProductForm() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    formIsLoading,
    categories,
  } = usePostNewProductForm();

  return (
    <StyledSection>
      <ThisFormCard>
        <Logo src={trayIcon} alt="new-product"></Logo>
        <ThisForm
          id="productsFactory"
          name="productsFactory"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormTitle>Cargar nuevos productos</FormTitle>

          <ProductNameInput register={register} errors={errors} />

          <ProductSizeInput register={register} errors={errors} />

          <ProductPriceInput register={register} errors={errors} />
          <CategoriesOptionsInput
            register={register}
            errors={errors}
            categories={categories}
          />
          <ProductDescriptionTextArea register={register} errors={errors} />

          <ProductState state="checked" />

          <ImageUploader register={register} errors={errors} />
          {formIsLoading && <LoaderSpinner small data-testid="spinner" />}
          <FormButtons />
        </ThisForm>
      </ThisFormCard>
    </StyledSection>
  );
}
