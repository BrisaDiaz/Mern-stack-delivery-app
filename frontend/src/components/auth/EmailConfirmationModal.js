import styled from "styled-components";
import { LoaderSpinner } from "../LoaderSpinner";
import useEmailConfirmationModal from "../../hooks/useEmailConfirmationModal";

const Page = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  padding-top: 58px;
`;
const MessageCard = styled.article`
  margin: 30px 0;
  width: 450px;
  background: #171717;
  padding: 20px;
  color: white;
  padding-bottom: 25px;
  justify-self: center;
  border: 3px solid #fcba1c;
  box-shadow: 1px 1px 17px #1111112b;
  display: flex;
  flex-direction: column;
  & > h4 {
    text-align: center;
    font-size: 22px;
    color: #fcba1c;
  }
  & > button {
    justify-self: center;
    padding: 8px;
    margin: 20px auto;
    outline: none;
    font-family: "Oswald", sans-serif;
    font-size: 16px;
    border-radius: 5px;
    border: 2px solid #111111a8;
    background: #fcba1c;
    box-shadow: inset 0 0 6px #272727a6;
    cursor: pointer;
    transition: all 0.6s;

    &:hover {
      transform: scale(1.05);
    }
  }
  & > span {
    font-size: 50px;
    text-align: center;
    text-shadow: 0 0 50px #fcba1c;
    margin-bottom: 20px;
  }
  & > ${LoaderSpinner} {
    margin: 0 auto;
    margin-top: 20px;
  }
`;
export default function EmailConfirmationModal() {
  const { isRequestLoading, sendConfirmationEmail } = useEmailConfirmationModal;

  return (
    <Page>
      <MessageCard>
        <span>📬</span>
        <h4>Tu cuenta necesita ser verificada</h4>
        <p>
          Para poder gestionar su cuenta en la aplicación es necesario que
          verifique su correo electronico. Al precionar el siguiente botón, un
          mensaje le será enviado a su email con un link de verificación válido
          por 24hs.
        </p>
        {isRequestLoading && <LoaderSpinner small />}
        <button onClick={() => sendConfirmationEmail()}>Enviar Correo</button>
      </MessageCard>
    </Page>
  );
}
