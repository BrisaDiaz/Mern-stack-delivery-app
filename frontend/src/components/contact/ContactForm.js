import styled from "styled-components";
import useContactForm from "../../hooks/useContactForm";
import SocilasMenu from "../SocialsMenu";
import { ButtonPrimary } from "../Buttons";
import phoneIcon from "../../img/phone-alt-solid.svg";
import emaIlcon from "../../img/envelope-regular.svg";

import { Link, Icon, ListItem, List } from "../Footer";

const StyledContact = styled.article`
box-sizing:border-box:
max-width:100%;
padding:20px 0;
display:flex;
flex-wrap:wrap;
& > * {
padding:10px  15px;
height:100%;
}
`;
const FormSection = styled.div`
  width: 100%;
  flex: 1 1 450px;

  @media screen and (min-width: 550px) {
    padding: 10px 32px;
  }
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  & > small {
    margin: -10px auto 4px 0;
  }
  @media screen and (max-width: 550px) {
    & > ${ButtonPrimary} {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  flex: 1 0 1;
  min-height: 460px;
  width: 40%;
  @media screen and (max-width: 750px) {
    width: 100%;
    padding: 0 25px;
    min-height: 350px;
  }
`;
export const TextInput = styled.input`
  &::placeholder {
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 16px;
  }
  border: none;
  border-radius: 5px;
  outline: transparent;
  border: 2px solid #171717;
  margin-bottom: 15px;
  width: 100%;
  padding: 12px 15px;
`;

const Textarea = styled.textarea`
  &::resizer {
    display: none;
  }
  &::placeholder {
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 16px;
  }
  border: none;
  border-radius: 5px;
  outline: transparent;
  border: 2px solid #171717;
  margin-bottom: 15px;
  padding: 10px 15px;
  min-height: 250px;
  max-height: 250px;
  margin-bottom: 25px;
  min-width: 100%;
  max-width: 100%;
`;
export const ErrorMessage = styled.small`
  color: #bf0000;
  margin: -10px auto 4px 5%;
  display: block;
`;
const ContactTitle = styled.h2`
  @media screen and (min-width: 750px) {
    margin-top: -40px;
  }
`;
const ContactLink = styled(Link)`
  color: #000;
`;

export default function ContactForm() {
  const { register, handleSubmit, errors, onSubmit } = useContactForm();

  return (
    <StyledContact>
      <FormSection>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errors.userName && (
            <ErrorMessage>{errors.userName.message}</ErrorMessage>
          )}
          <TextInput
            type="text"
            placeholder="Tu Nombre Completo..."
            name="userName"
            ref={register({
              required: "*El campo es requrido",

              pattern: {
                value: /^[A-Za-zñÑáÁéÉíÍóÓúÚÜü\s\w]+$/,
                message: "*Nombre no valido",
              },
            })}
            style={{ borderColor: errors.userName && "#bf0000" }}
          />
          {errors.userEmail && (
            <ErrorMessage>{errors.userEmail.message}</ErrorMessage>
          )}
          <TextInput
            type="email"
            placeholder="Tu email..."
            name="userEmail"
            ref={register({
              required: "*El campo es requrido",

              pattern: {
                value:
                  /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
                meassage: "*Email no valido",
              },
            })}
            style={{ borderColor: errors.userEmail && "#bf0000" }}
          />
          {errors.subject && (
            <ErrorMessage>{errors.subject.message}</ErrorMessage>
          )}

          <TextInput
            type="text"
            placeholder="Asunto..."
            name="subject"
            ref={register({
              required: "*El campo es requrido",
            })}
            style={{ borderColor: errors.subject && "#bf0000" }}
          />
          {errors.userMessage && (
            <ErrorMessage>{errors.userMessage.message}</ErrorMessage>
          )}
          <Textarea
            placeholder="Tu mensaje..."
            name="userMessage"
            ref={register({
              required: "*El campo es requerido",
              maxLength: {
                value: 255,
                message: "*Tu mensaje no debe exceder los 255 carácteres",
              },
            })}
            style={{ borderColor: errors.userMessage && "#bf0000" }}
          />
          <ButtonPrimary as="input" type="submit" value="Enviar mensaje" />
        </Form>
      </FormSection>
      <InfoSection>
        <ContactTitle>Contactenos</ContactTitle>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla accumsan
          metus. Ipsum dolor sit amet, consectetur adipiscing elit nulla
          accumsan.
        </p>
        <List>
          <ListItem>
            <Icon>
              <img src={phoneIcon} alt="phone"></img>
            </Icon>{" "}
            <ContactLink>+66 396 847 2637</ContactLink>
          </ListItem>
          <ListItem>
            <Icon>
              <img src={emaIlcon} alt="email"></img>
            </Icon>{" "}
            <ContactLink>Hello@Burger.Com</ContactLink>
          </ListItem>
        </List>
        <SocilasMenu />
      </InfoSection>
    </StyledContact>
  );
}
