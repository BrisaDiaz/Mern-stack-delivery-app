import styled from "styled-components";
import { withError } from "./../withError";
import useMyProfile from "../../hooks/useMyProfile";
import { Link } from "react-router-dom";

import FormImg from "../../img/user-circle-solid.svg";

export const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  min-height: 100vh;
  width: 100vw;
  padding: 60px 15px 40px;
`;
const UserCard = styled.article`
  margin: 30px auto;
  display: flex;
  height: max-content;
  flex-wrap: wrap;
  min-height: 250px;

  box-shadow: ${(props) => props.theme.lightBoxShadow};
`;
const CardImg = styled.div`
  min-height: 100%;

  padding: 10px 0;
  display: flex;
  flex: 1 1 150px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  width: 120px;
`;
const CardInfo = styled.div`
  color: #fff;
  padding: 15px;

  flex: 1 1 400px;
  background: ${(props) => props.theme.black};
`;
const UserInfo = styled.dd`
  margin: 5px 0;
  text-transform: capitalize;
`;

const EditButton = styled(Link)`
  padding: 5px 8px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  margin-left: 80%;
  border: none;
  background: #fff;
  color: ${(props) => props.theme.black};
  transition: all 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.gray};
  }
`;
const LogoutButton = styled.button`
  padding: 4px 8px;
  padding-top: 0;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: "Oswald", sans-serif;
  font-size: 19px;
  margin: 10px 40%;
  background: ${(props) => props.theme.orange};
  color: #fff;
  transition: all 0.5s ease;
  &:hover {
    background: #ef4537;
  }
`;
function MyProfile() {
  const { handleLogout, currentUser } = useMyProfile();

  return (
    <Section>
      <UserCard>
        <CardImg>
          <Img src={FormImg} alt="user" />
        </CardImg>
        <CardInfo>
          <EditButton to="/myAccount/editProfile">Editar</EditButton>
          <dl>
            <dt>Nombre: </dt> <UserInfo>{currentUser.name}</UserInfo>
            <dt>Email: </dt>
            <UserInfo>{currentUser.email}</UserInfo>
            <dt>Teléfono: </dt>
            <UserInfo>
              {currentUser.number || "Ningún númrero subministrado"}
            </UserInfo>
            <dt>Dirección: </dt>
            <UserInfo>
              {currentUser.address || "Ningúna dirección subministrada"}
            </UserInfo>
          </dl>
          <br />
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </CardInfo>
      </UserCard>
    </Section>
  );
}

export default withError(MyProfile);
