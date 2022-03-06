import styled from "styled-components";
import { withError } from "./../withError";
import { Fragment } from "react";
import useEditProfileForm from "../../hooks/useEditProfileForm";
import { LoaderSpinner } from "./../LoaderSpinner";
import { ErrorMessage } from "../contact/ContactForm";
import {
  UserNameInput,
  UserLastNameInput,
  UserPasswordInput,
  UserNewPasswordInput,
  ErrorServerMessage,
} from "../auth/SignupForm";
import {
  OptionList,
  Option,
  CheckboxWrapper,
} from "../dashboard/CreateNewProductForm";
import { FormButtons } from "../dashboard/CreateNewProductForm";
import { TextInput } from "../contact/ContactForm";
import GoBackLink from "../GoBackLink";
import userEditIcon from "../../img/user-edit-solid.svg";

const EditProfilePage = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 60px 0px;
`;
const EditProfileForm = styled.form`
  max-width: 400px;
  width: 100%;
  padding: 10px 25px 40px;
  border-radius: 10px;
  background: #fff;
  margin: 50px auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  & > input {
    border: none;
    background: #f0f0f0;
  }
  & > label {
    margin: 0 auto 20px;
  }

  & > ${OptionList} {
    min-width: 100%;
  }

  & > input:focus {
    outline: 2px solid #ccc;
    outline-style: auto;
  }
`;

const InputWrapper = styled.div`
  margin-top: -15px;
  & > label {
    font-size: 16px;
  }
`;
const FormIcon = styled.img`
  width: 120px;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: -20px;
`;
const GoToProfileLink = styled(GoBackLink)`
  margin-left: 15px;
  &:before {
    content: "<-- ";
    margin-right: 3px;
  }
`;

function NewPasswordCheckbox({ setIsChangingPassword, value }) {
  return (
    <CheckboxWrapper>
      <label htmlFor="newPasswordCheckbox">Cambiar contraseña:</label>
      <input
        onChange={(e) => {
          setIsChangingPassword(!value);
        }}
        id="newPasswordCheckbox"
        type="checkbox"
        name="newPasswordCheckbox"
      />
    </CheckboxWrapper>
  );
}
function CellphoneInput({ register, errors, placeholder, defaultValue }) {
  return (
    <Fragment>
      {errors.userNumber && (
        <ErrorMessage role="alert">{errors.userNumber.message}</ErrorMessage>
      )}

      <TextInput
        placeholder={placeholder}
        name="userNumber"
        type="text"
        defaultValue={defaultValue || ""}
        ref={register({
          required: "*El campo es requrido",
          minLength: {
            value: 9,
            message: "*Teléfono Invalido",
          },
          maxLength: {
            value: 10,
            message: "*Teléfono Invalido",
          },
          pattern: {
            value: /[0-9]/,
            message: "*Solo se aceptan números",
          },
        })}
        style={{ borderColor: errors.userNumber && "#bf0000" }}
      />
    </Fragment>
  );
}
function CityAddressOptions({ register, defaultValue }) {
  return (
    <OptionList
      name="userCityAddress"
      defaultValue={defaultValue}
      ref={register({
        required: "*El campo es requrido",
      })}
    >
      <Option value="Córdoba">Córdoba</Option>
      <Option value="Buenos Aires">Buenos Aires</Option>
    </OptionList>
  );
}
function StreetAddressInput({ errors, placeholder, register, defaultValue }) {
  return (
    <Fragment>
      {errors.userStreetAddress && (
        <ErrorMessage role="alert">
          {errors.userStreetAddress.message}
        </ErrorMessage>
      )}

      <TextInput
        placeholder={placeholder}
        name="userStreetAddress"
        defaultValue={defaultValue || ""}
        ref={register({
          required: "*El campo es requrido",
        })}
        style={{ borderColor: errors.userStreetAddress && "#bf0000" }}
      />
    </Fragment>
  );
}
function StreetNumberInput({ errors, placeholder, register, defaultValue }) {
  return (
    <Fragment>
      {errors.userStreetNumber && (
        <ErrorMessage role="alert">
          {errors.userStreetNumber.message}
        </ErrorMessage>
      )}

      <TextInput
        placeholder={placeholder}
        name="userStreetNumber"
        defaultValue={defaultValue || ""}
        ref={register({
          required: "*El campo es requrido",

          maxLength: {
            value: 4,
            message: "*Número Invalido",
          },
          pattern: {
            value: /[0-9]/,
            message: "*Solo se aceptan números",
          },
        })}
        style={{ borderColor: errors.userStreetNumber && "#bf0000" }}
      />
    </Fragment>
  );
}

function EditMyProfile() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    serverError,
    formIsLoading,
    isChangingPassword,
    setIsChangingPassword,
    defaultsValues,
  } = useEditProfileForm();

  return (
    <EditProfilePage>
      <GoToProfileLink to="/myAccount/myProfile">Regresar</GoToProfileLink>

      <EditProfileForm onSubmit={handleSubmit(onSubmit)} novalidate>
        <FormIcon src={userEditIcon} alt="edit-profile" />
        <UserNameInput
          errors={errors}
          register={register}
          defaultValue={defaultsValues.name}
        />
        <UserLastNameInput
          errors={errors}
          register={register}
          defaultValue={defaultsValues.lastName}
        />

        <CellphoneInput
          defaultValue={defaultsValues.number}
          errors={errors}
          register={register}
          placeholder="Tu telèfono..."
        />

        <CityAddressOptions
          register={register}
          defaultValue={defaultsValues.city}
        />

        <StreetAddressInput
          errors={errors}
          register={register}
          placeholder="Calle..."
          defaultValue={defaultsValues.street}
        />

        <StreetNumberInput
          errors={errors}
          register={register}
          placeholder="Número de puerta..."
          defaultValue={defaultsValues.streetNumber}
        />
        <InputWrapper>
          <NewPasswordCheckbox
            setIsChangingPassword={setIsChangingPassword}
            value={isChangingPassword}
          />
        </InputWrapper>

        {isChangingPassword ? (
          <>
            <UserPasswordInput
              errors={errors}
              register={register}
              name="userPassword"
              placeholder="Tu contraseña..."
            />
            <UserNewPasswordInput
              errors={errors}
              register={register}
              name="newPassword"
              placeholder="Nueva contraseña..."
            />
          </>
        ) : null}

        {formIsLoading ? (
          <LoaderSpinner small />
        ) : (
          <ErrorServerMessage>{serverError}</ErrorServerMessage>
        )}
        <br />
        <FormButtons small />
      </EditProfileForm>
    </EditProfilePage>
  );
}

export default withError(EditMyProfile);
