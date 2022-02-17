import styled from "styled-components";
import useResetPassword from "../../hooks/useResetPassword";
import { ButtonPrimary } from "../Buttons";
import { LoaderSpinner } from "../LoaderSpinner";
import pizzaBackgroun from "../../img/pizza-background.jpg";
import {
  FormCard,
  Form,
  UserPasswordInput,
  ErrorServerMessage,
} from "./SignupForm";

const StyledInitSession = styled.main`
    min-height: 100vh;
background: url(${pizzaBackgroun}) center bottom ;
    background-size: cover;
display: flex;
justify-content:center;
align-items: center;
width:100vw;
padding:15px;
padding-top:60px;
text-aling:center;
& > article form {
  padding-top:25px;
}
& > article form h3 {
  font-size:25px;
      line-height: 35px;
}
& > article form h2 {
  font-size:45px;
}
// @media screen and (min-width:500px){
//   & > article form h3 {
//   font-size:30px;
// }
}
`;

export default function ForgotPassword() {
  const {
    isFormLoading,
    serverError,
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = useResetPassword();
  return (
    <StyledInitSession>
      <FormCard>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>🔑</h2>
          <h3>Establecer nueva contraseña</h3>
          <UserPasswordInput
            register={register}
            errors={errors}
            placeholder="Nueva contraseña..."
          />
          <UserPasswordInput
            register={register}
            errors={errors}
            name="confirmPassword"
            placeholder="Confirnmar contraseña..."
          />
          <ErrorServerMessage>{serverError}</ErrorServerMessage>

          <ButtonPrimary as="input" type="submit" value="Enviar" />
          {isFormLoading && <LoaderSpinner small />}
        </Form>
      </FormCard>
    </StyledInitSession>
  );
}
